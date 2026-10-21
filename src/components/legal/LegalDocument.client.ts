/**
 * Collapse the section index on phones, open it from 1024px up.
 *
 * `open` is a boolean attribute, so no media query can override it: it has to be
 * removed. On the site this exact logic runs from an inline script in
 * `LegalDocument.astro`, immediately after the element has been parsed, so the
 * panel is never painted expanded and then snapped shut; an imported module
 * would run too late for that. Keep the two in step. The listener keeps the two
 * states honest across a rotation or a resize, and it cannot fight the user on
 * desktop, where `.legal-toc-summary` is `pointer-events: none` and there is
 * nothing to toggle. `root` is the `.legal-grid`.
 */
export function setupTocDisclosure(root: HTMLElement) {
  const details = root.querySelector<HTMLDetailsElement>('.legal-toc-details');
  if (!details) return;
  const desktop = window.matchMedia('(min-width: 1024px)');
  const sync = () => {
    details.open = desktop.matches;
  };
  sync();
  desktop.addEventListener('change', sync);
  return () => desktop.removeEventListener('change', sync);
}

/**
 * Marks the index link of the section being read: whichever `h2` of the rendered
 * markdown crosses the band near the top of the viewport. `root` is the
 * `.legal-grid`; the returned function stops observing.
 */
export function setupTocHighlighting(root: HTMLElement) {
  const links = root.querySelectorAll<HTMLAnchorElement>('.legal-toc-link');
  const sections = Array.from(root.querySelectorAll<HTMLElement>('.md-content h2[id]'));
  if (!links.length || !sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    },
    { rootMargin: '-10% 0px -75% 0px' },
  );

  sections.forEach((s) => observer.observe(s));
  return () => observer.disconnect();
}

/** Both behaviours, for `useBehaviour` in React. */
export function setupLegalDocument(root: HTMLElement) {
  const cleanups = [setupTocDisclosure(root), setupTocHighlighting(root)];
  return () => cleanups.forEach((cleanup) => cleanup?.());
}
