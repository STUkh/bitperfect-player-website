/**
 * Progressive enhancement only. Native <details name="faq-accordion"> already
 * restricts each group to one open panel in current browsers (Chrome 120+,
 * Firefox 130+, Safari 17.2+) with zero script and full keyboard/AT support.
 * This closes sibling panels for browsers that don't implement that grouping
 * yet. It is additive and idempotent — the FAQ is fully readable and
 * operable with this script disabled or absent.
 */
document.querySelectorAll<HTMLDetailsElement>('details[name]').forEach((details) => {
  details.addEventListener('toggle', () => {
    if (!details.open) return;
    const name = details.getAttribute('name');
    document
      .querySelectorAll<HTMLDetailsElement>(`details[name="${name}"]`)
      .forEach((sibling) => {
        if (sibling !== details) sibling.open = false;
      });
  });
});
