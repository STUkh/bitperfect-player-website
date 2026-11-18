/**
 * The site's entrance motion: reveal `.r-*` elements as they come into view.
 *
 * This was `feature-rail.ts` and was called from the two feature routes only,
 * which is how the HOME page came to carry twelve `.r-fade`/`.r-rise` elements
 * whose animation had never once played. The reveal CSS hides on `html.js` and
 * un-hides on `.is-visible`; the home page set neither, so its hero, pricing
 * card, CTA, privacy band, statement band and features teaser all sat in their
 * resting state permanently — visible, and completely inert.
 *
 * It is wired in `ContentLayout` now, which every route carrying a reveal goes
 * through, so there is one call site instead of one per page and a new page
 * cannot forget it.
 */
import { onArrive } from "./in-view";

/* Once all entrance transitions have finished across every property and child
   element (e.g. FeatureLinkCard has opacity 900ms, transform 1200ms, and child
   feature-art-img transform 1400ms), hand the element back its own resting/hover
   transitions (animations.css, `.is-settled`).
   
   Tracking all transitions ensures .is-settled is never applied prematurely,
   which would truncate in-flight transform tails and drop compositor will-change
   layers before motion resolves. */
function settle(element: Element): void {
  let settled = false;
  let timer: number | undefined;

  const mark = () => {
    if (settled) return;
    settled = true;
    if (timer !== undefined) window.clearTimeout(timer);
    element.classList.add("is-settled");
    cleanup();
  };

  let cleanup = () => {};

  if (typeof element.getAnimations === "function") {
    const getSubtreeAnims = () => element.getAnimations({ subtree: true });
    const runTracking = (animations: Animation[]) => {
      let maxDuration = 0;
      for (const a of animations) {
        const timing = a.effect?.getTiming();
        if (timing) {
          const delay = typeof timing.delay === "number" ? timing.delay : 0;
          const duration = typeof timing.duration === "number" ? timing.duration : 0;
          const total = delay + duration;
          if (total > maxDuration) maxDuration = total;
        }
      }
      // Safety timeout: calculated longest animation tail + 300ms buffer, minimum 2000ms
      timer = window.setTimeout(mark, Math.max(2000, maxDuration + 300));
      Promise.all(animations.map((a) => a.finished.catch(() => {}))).then(() => {
        mark();
      });
    };

    let anims = getSubtreeAnims();
    if (anims.length > 0) {
      runTracking(anims);
      return;
    }

    // In case transitions are scheduled on the next style flush
    requestAnimationFrame(() => {
      if (settled) return;
      anims = getSubtreeAnims();
      if (anims.length > 0) {
        runTracking(anims);
      } else {
        mark();
      }
    });
    return;
  }

  // Spec-compliant event-based fallback for environments without getAnimations
  const activeTransitions = new Set<string>();
  let hasStarted = false;

  const getTransitionKey = (e: TransitionEvent) =>
    `${e.target === element ? "self" : (e.target as Element).className || "child"}:${e.propertyName}`;

  const onRun = (e: Event) => {
    const te = e as TransitionEvent;
    hasStarted = true;
    activeTransitions.add(getTransitionKey(te));
  };

  const onEndOrCancel = (e: Event) => {
    const te = e as TransitionEvent;
    activeTransitions.delete(getTransitionKey(te));
    if (hasStarted && activeTransitions.size === 0) {
      mark();
    }
  };

  element.addEventListener("transitionrun", onRun, { passive: true });
  element.addEventListener("transitionend", onEndOrCancel, { passive: true });
  element.addEventListener("transitioncancel", onEndOrCancel, { passive: true });

  cleanup = () => {
    element.removeEventListener("transitionrun", onRun);
    element.removeEventListener("transitionend", onEndOrCancel);
    element.removeEventListener("transitioncancel", onEndOrCancel);
  };

  /* Safety fallback for the longest staggered card transform (1400ms + 640ms delay). */
  timer = window.setTimeout(mark, 2500);

  requestAnimationFrame(() => {
    if (!hasStarted && activeTransitions.size === 0) {
      mark();
    }
  });
}

/**
 * Anticipatory image pre-decoding via IntersectionObserver:
 * Decodes images asynchronously off the main thread shortly before they scroll into view,
 * eliminating rasterization hitches during fast scrolls.
 *
 * Web standards & performance compliance:
 * 1. Does NOT mutate `img.loading = "eager"`. Native lazy loading and network prioritization
 *    are fully preserved. Deep offscreen images never waste mobile data or battery.
 * 2. Avoids the WebKit bug where `decode()` hangs indefinitely on offscreen `loading="lazy"` images.
 * 3. Respects `navigator.connection.saveData`.
 * 4. Protects LCP by leaving initial page load network bandwidth unconstrained.
 */
function predecodeImages(): () => void {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return () => {};
  }

  // Respect user's Data Saver preference
  const nav = navigator as unknown as { connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) {
    return () => {};
  }

  const decodeImg = (img: HTMLImageElement) => {
    if (typeof img.decode === "function") {
      img.decode().catch(() => {});
    }
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          io.unobserve(img);

          if (img.complete) {
            decodeImg(img);
          } else {
            img.addEventListener("load", () => decodeImg(img), { once: true });
            img.addEventListener("error", () => {}, { once: true });
          }
        }
      }
    },
    {
      rootMargin: "600px 0px 600px 0px",
    },
  );

  const images = document.querySelectorAll<HTMLImageElement>("img");
  images.forEach((img) => io.observe(img));

  return () => io.disconnect();
}
export function initFeatureMotion(): void {
  if (typeof window === "undefined") return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const reveals = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".r-fade, .r-rise, .r-rise-lg, .r-mask, .r-rule",
    ),
  );

  if (reducedMotion || !("IntersectionObserver" in window)) {
    // Neutralise the hidden state, not just the transition: killing only the
    // transition leaves a reduced-motion visitor on a permanently blank page.
    reveals.forEach((element) => {
      element.classList.add("is-visible");
      element.classList.add("is-settled");
    });
  } else {
    /* A third of the element (or of the screen, for a tall one) has to be in view
       above the bottom tenth: at 15% a card was rising before the reader reached it. */
    onArrive(reveals, (element) => {
      element.classList.add("is-visible");
      settle(element);
    }, {
      share: 0.35,
      margin: 0.1,
    });
  }

    predecodeImages();

  /*
    The rail's screen-swap observer is gone with the rail: each beat is now its own
    band showing its own screen at full size, so there is nothing left to swap.
    Only the reveal observer above survives, and it is used by every route.
  */
}
