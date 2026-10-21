/**
 * The catalog's editorial tabs filter its cards by category: the clicked tab
 * takes the gold underline, and every card outside its category is hidden.
 * `root` is the catalog section; the returned function unbinds the tabs.
 */
export function setupCatalogFilter(root: HTMLElement) {
  const filterButtons = root.querySelectorAll<HTMLButtonElement>('.catalog-filter-btn');
  const cards = root.querySelectorAll<HTMLElement>('.catalog-card');

  const onClick = (btn: HTMLButtonElement) => () => {
    const filter = btn.getAttribute('data-filter');
    if (!filter) return;

    // Toggle active style
    filterButtons.forEach((b) => {
      b.classList.remove('active-filter', 'border-gold', 'text-gold');
      b.classList.add('border-transparent', 'text-text-secondary');
    });
    btn.classList.add('active-filter', 'border-gold', 'text-gold');
    btn.classList.remove('border-transparent', 'text-text-secondary');
    // Filter cards
    cards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category');
      if (filter === 'all' || cardCategory === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  const handlers = Array.from(filterButtons, (btn) => {
    const handler = onClick(btn);
    btn.addEventListener('click', handler);
    return () => btn.removeEventListener('click', handler);
  });
  return () => handlers.forEach((unbind) => unbind());
}
