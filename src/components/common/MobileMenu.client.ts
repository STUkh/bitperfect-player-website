/**
 * The burger in the header opens and closes the mobile menu panel it names in
 * `aria-controls`. Dismissal is the burger, a link in the panel, or Escape.
 * `root` is the burger; the returned function unbinds everything.
 */
export function setupMobileMenu(toggle: HTMLElement) {
  const menu = document.getElementById(toggle.getAttribute('aria-controls') ?? '');
  if (!menu) return;
  const [burgerTop, burgerMid, burgerBot] = toggle.querySelectorAll<HTMLElement>('[data-burger]');
  const menuLinks = menu.querySelectorAll<HTMLAnchorElement>('a');
  let isOpen = false;

  function openMenu() {
    isOpen = true;
    menu!.classList.remove('opacity-0', 'pointer-events-none', 'invisible');
    menu!.classList.add('opacity-100', 'pointer-events-auto');
    menu!.removeAttribute('aria-hidden');
    menu!.removeAttribute('inert');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    burgerTop?.classList.add('rotate-45', 'translate-y-[8px]');
    burgerMid?.classList.add('opacity-0');
    burgerBot?.classList.add('-rotate-45', '-translate-y-[8px]', 'w-6');

    // Move focus into the menu so keyboard users land somewhere useful.
    menuLinks[0]?.focus();
  }

  function closeMenu(returnFocus = false) {
    isOpen = false;
    menu!.classList.remove('opacity-100', 'pointer-events-auto');
    menu!.classList.add('opacity-0', 'pointer-events-none', 'invisible');
    menu!.setAttribute('aria-hidden', 'true');
    menu!.setAttribute('inert', '');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    burgerTop?.classList.remove('rotate-45', 'translate-y-[8px]');
    burgerMid?.classList.remove('opacity-0');
    burgerBot?.classList.remove('-rotate-45', '-translate-y-[8px]', 'w-6');

    if (returnFocus) toggle.focus();
  }

  const onToggle = () => (isOpen ? closeMenu() : openMenu());
  const onLink = () => closeMenu();
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) closeMenu(true);
  };

  toggle.addEventListener('click', onToggle);
  menuLinks.forEach((link) => link.addEventListener('click', onLink));
  document.addEventListener('keydown', onKey);
  return () => {
    if (isOpen) closeMenu();
    toggle.removeEventListener('click', onToggle);
    menuLinks.forEach((link) => link.removeEventListener('click', onLink));
    document.removeEventListener('keydown', onKey);
  };
}
