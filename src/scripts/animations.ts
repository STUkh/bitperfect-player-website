/**
 * Animation Coordinator
 * Attaches progressive reveal observers only when motion is enabled.
 * Preserves no-JS content visibility and reduced motion preferences.
 */

if (typeof window !== 'undefined') {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-animate]'));
  const routeVisuals = Array.from(document.querySelectorAll<HTMLElement>('[data-route-visual]'));

  if (reducedMotion || !('IntersectionObserver' in window)) {
    // Immediate full visibility
    revealTargets.forEach((element) => element.classList.add('is-visible'));
    routeVisuals.forEach((element) => element.classList.add('is-route-live'));
  } else {
    document.documentElement.classList.add('js-animations');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    revealTargets.forEach((element) => revealObserver.observe(element));

    const routeObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-route-live');
          routeObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );

    routeVisuals.forEach((element) => routeObserver.observe(element));
  }

  if (window.location.hash) {
    requestAnimationFrame(() => {
      try {
        const target = document.querySelector(window.location.hash);
        target?.scrollIntoView({ block: 'start' });
      } catch {
        // Safe fallback on invalid hash selectors
      }
    });
  }
}
