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
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    reveals.forEach((element) => revealObserver.observe(element));
  }

  /*
    The rail's screen-swap observer is gone with the rail: each beat is now its own
    band showing its own screen at full size, so there is nothing left to swap.
    Only the reveal observer above survives, and it is used by every route.
  */
}
