import { prefetch } from 'astro:prefetch';

/**
 * Prefetch for touch screens, where there is no hover to start one. Chromium already
 * prerenders on touch (the speculation rules in BaseLayout); this covers Safari on a
 * phone, which ignores those rules and never sees Astro's hover prefetch.
 *
 * Two triggers, both through Astro's `prefetch()`, which fetches the HTML once per
 * URL and skips itself under Save-Data or on a 2G connection:
 *   - a finger lands on an internal link: fetch now, ahead of the `click`;
 *   - an internal link has been on screen for a moment: fetch it when the main thread
 *     is idle, so the likely next page (the cards, the pager, the closing link) is
 *     already in the cache when it is tapped.
 * Only on devices without hover; a mouse keeps the hover prefetch.
 */
export function setupTouchPrefetch() {
  if (!window.matchMedia('(hover: none)').matches) return;

  const internal = (a: HTMLAnchorElement) =>
    a.origin === location.origin &&
    a.pathname !== location.pathname &&
    !a.hasAttribute('download') &&
    a.target !== '_blank' &&
    !a.relList.contains('external');

  document.addEventListener(
    'touchstart',
    (event) => {
      const a = (event.target as Element | null)?.closest?.('a[href]');
      if (a instanceof HTMLAnchorElement && internal(a)) prefetch(a.href, { ignoreSlowConnection: true });
    },
    { passive: true, capture: true },
  );

  if (!('IntersectionObserver' in window)) return;
  const idle = window.requestIdleCallback ?? ((fn: () => void) => setTimeout(fn, 200));
  const timers = new Map<Element, number>();
  /* On screen for 600ms: a link scrolled past in a flick is not a candidate. */
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const a = entry.target as HTMLAnchorElement;
      if (entry.isIntersecting) {
        timers.set(a, window.setTimeout(() => {
          observer.unobserve(a);
          timers.delete(a);
          idle(() => prefetch(a.href));
        }, 600));
      } else {
        clearTimeout(timers.get(a));
        timers.delete(a);
      }
    }
  });
  for (const a of document.querySelectorAll<HTMLAnchorElement>('main a[href]')) {
    if (internal(a)) observer.observe(a);
  }
}
