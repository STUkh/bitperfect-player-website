import { clsx as cx } from 'clsx';
import { navLinks } from '../../data/navigation';
import PlayCta from './PlayCta';
import { isActive, resolveHref } from '../../utils/nav';
import './MobileMenu.css';

export interface MobileMenuProps {
  pathname?: string;
}

/** The full-screen nav panel Header renders; its burger opens it. Not exported to the design system. */
export default function MobileMenu(props: MobileMenuProps) {
  const { pathname = '/' } = props;

  return (
    <div
      id="mobile-menu"
      className="pointer-events-none invisible fixed inset-0 z-40 flex flex-col bg-surface-base opacity-0 transition-opacity duration-200 lg:hidden"
      aria-hidden="true"
      inert=""
    >
      <div className="relative flex min-w-0 flex-1 flex-col overflow-y-auto px-6 pt-24 pb-8">
        {/*
      There is no close button in this panel, and that is the fix rather than the
      omission.

      One lived here at `top-6 right-6` — 326,24 40x40 — under the header's burger
      toggle at 326,10 44x44. The header is `z-50` and this panel is `z-40`, so the
      burger sat ON TOP of it and swallowed every pointer event aimed at the ✕; the
      control could not be clicked, only tabbed to. The burger is already the close
      control: it animates into an ✕ when the panel opens, it is the thing a user
      actually hits, and it is painted over the spot where the duplicate stood. What
      was left underneath was a second focusable "Close menu" that a screen reader
      announced twice and a mouse could never reach.

      It also carried `href="#"`, and the script's close handler is bound to every
      `<a>` in this panel without calling `preventDefault`, so on the one input
      method that did reach it — the keyboard — dismissing the menu pushed a history
      entry and threw the reader back to the top of the page.

      Dismissal is: the burger, or Escape. Both are bound below.
    */}
        {/* Main nav links */}
        <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <a
                href={resolveHref(link.href, pathname)}
                className={cx([
                  'mobile-nav-link cursor-pointer rounded-chip text-2xl font-semibold focus-visible:focus-ring',
                  active
                    ? 'mobile-nav-link-active text-text-primary'
                    : 'text-text-secondary hover:text-text-primary active:text-gold',
                ])}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        {/* CTA */}
        <div className="mt-10 border-t border-border-subtle pt-8">
          {/* `size="lg"` brings px-9. A full-width button needs none of it, and at
          320px the 72px of horizontal padding pushed the panel 7px past the
          viewport, giving the whole page a horizontal scrollbar. */}
          <PlayCta label="Get it on Google Play" size="lg" className="w-full px-5 text-center" />
        </div>
      </div>
    </div>
  );
}
