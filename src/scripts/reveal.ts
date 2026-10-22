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

/* The longest duration + delay of an element's transitions, in ms. */
function transitionEnd(element: Element): number {
  const cs = getComputedStyle(element);
  const ms = (v: string) => v.split(",").map((t) => parseFloat(t) * (t.trim().endsWith("ms") ? 1 : 1000));
  const durations = ms(cs.transitionDuration);
  const delays = ms(cs.transitionDelay);
  return Math.max(0, ...durations.map((d, i) => d + (delays[i % delays.length] || 0)));
}

/* Once the entrance has played, hand the element back its own transitions
   (animations.css, `.is-settled`). A timer rather than transitionend: a
   transition that has nothing to animate never fires the event. */
function settle(element: Element): void {
  window.setTimeout(() => element.classList.add("is-settled"), transitionEnd(element) + 50);
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
    reveals.forEach((element) => element.classList.add("is-visible"));
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

  /*
    The rail's screen-swap observer is gone with the rail: each beat is now its own
    band showing its own screen at full size, so there is nothing left to swap.
    Only the reveal observer above survives, and it is used by every route.
  */
}
