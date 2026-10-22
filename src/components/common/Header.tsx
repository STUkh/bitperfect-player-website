import { clsx as cx } from 'clsx';
import Container from './Container';
import StoreBadges from './StoreBadges';
import MobileMenu from './MobileMenu';
import Logo from './Logo';
import { navLinks } from '../../data/navigation';
import { isActive, resolveHref, withBase } from '../../utils/nav';
import { useBehaviour } from '../behaviour';
import { setupMobileMenu } from './MobileMenu.client';
import './Header.css';

export interface HeaderProps {
  /** The current page's path, which marks its nav link active. */
  pathname?: string;
}

/**
 * The fixed site header: mark and wordmark, the nav (inline from `lg`, behind the
 * burger below it), and the Play badge. Renders the mobile menu panel after
 * itself. The burger's behaviour is `setupMobileMenu`; on the site
 * `Header.astro` mounts it, in React `useBehaviour` does.
 */
export default function Header({ pathname = '/' }: HeaderProps) {
  const toggleRef = useBehaviour<HTMLButtonElement>(setupMobileMenu);

  return (
    <>
      <header
        id="site-header"
        className="fixed top-0 right-0 left-0 z-50 border-b border-border-subtle/40 bg-surface-base/80 backdrop-blur-md transition-colors duration-200"
      >
        <Container>
          <nav className="flex h-16 items-center justify-between lg:h-20" aria-label="Main Navigation">
            {/* Logo. The -mx/-my pair cancels the padding, so the hover wash gets
          room to breathe without moving the wordmark by a pixel. */}
            <a
              href={withBase('/')}
              className="group -mx-2 -my-1 flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1 transition-colors duration-[var(--d-ui)] ease-ui hover:bg-white/[0.045] active:bg-white/[0.07] focus-visible:focus-ring"
            >
              <Logo size="md" />{' '}
              {/* The wordmark must never wrap to two lines beside a 32px mark: on a
            360-390px viewport "Bitperfect Player" did exactly that. Below `sm`
            only the distinctive half of the name is shown; the mark plus
            "Bitperfect" still identifies the product, and the full name stays in
            the logo's alt text and the page title for assistive tech. */}
              <span className="text-body-sm font-bold whitespace-nowrap text-text-primary sm:text-body-lg">
                Bitperfect<span className="hidden sm:inline"> Player</span>
              </span>
            </a>
            {/* Desktop Nav (center) */}
            <div className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <a
                    href={resolveHref(link.href, pathname)}
                    className={cx([
                      'nav-link cursor-pointer rounded px-1.5 py-0.5 text-sm font-medium transition-colors duration-[var(--d-ui)] ease-ui focus-visible:focus-ring',
                      active
                        ? 'nav-link-active text-text-primary'
                        : 'text-text-secondary hover:text-text-primary active:text-gold',
                    ])}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* Labelled from 640px up; icon-only below it, where the wordmark and
            the burger leave no room for a label. Never nothing. */}
              <StoreBadges size="icon" className="sm:hidden" />
              <StoreBadges size="sm" className="hidden sm:inline-flex" />{' '}
              {/* Mobile Menu Button. 44x44: it measured 40x34, and it is the ONLY
            navigation affordance below 1024px, so it was the smallest target on
            the site carrying the most weight. The bars are unchanged; the box
            around them grew. */}
              <button
                ref={toggleRef}
                id="mobile-menu-toggle"
                className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg text-text-primary transition-colors duration-[var(--d-ui)] ease-ui hover:bg-white/[0.055] active:bg-white/[0.09] focus-visible:focus-ring lg:hidden"
                aria-label="Toggle navigation menu"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span
                  className="block h-0.5 w-6 origin-center bg-text-primary transition-all duration-300"
                  data-burger=""
                />{' '}
                <span className="block h-0.5 w-6 bg-text-primary transition-all duration-300" data-burger="" />{' '}
                <span
                  className="block h-0.5 w-4 origin-center bg-text-primary transition-all duration-300"
                  data-burger=""
                />
              </button>
            </div>
          </nav>
        </Container>
      </header>
      <MobileMenu pathname={pathname} />
    </>
  );
}
