import { navLinks, featureRoutes, featureName } from '@site/data/navigation';
import { site } from '@site/data/site';
import { Button } from './Button';
import { cx, t, isActive, resolveHref, withBase, scope } from '../lib/site';

export interface MobileMenuProps {
  /** Whether the full-screen panel is shown. Header drives this from its burger. */
  open?: boolean;
  /** Current route, for the active link's gold rule. Default "/". */
  currentPath?: string;
  /** `fixed` covers the viewport like the site; `static` lays it out in flow (cards, mockups). */
  position?: 'fixed' | 'static';
  /** Called when a link is chosen, so the owner can close the panel. */
  onNavigate?: () => void;
  /** Hidden from lg up, like the site (default). Set false to show it at any width, e.g. in a phone mockup on a wide canvas. */
  hideOnDesktop?: boolean;
}

const S = scope('fvncwbpm');
const navLabel = (label: string) => t(`nav.${label.toLowerCase()}` as never);

/**
 * The phone navigation panel (below lg): large links on graphite, the eight
 * feature routes indented on a hairline, and a full-width Play action. The
 * burger in Header is its only toggle; it has no close button of its own.
 */
export function MobileMenu({ open = false, currentPath = '/', position = 'fixed', onNavigate, hideOnDesktop = true }: MobileMenuProps) {
  return (
    <div
      id="mobile-menu"
      className={cx(
        'z-40 flex flex-col bg-surface-base transition-opacity duration-200',
        hideOnDesktop && 'lg:hidden',
        position === 'fixed' ? 'fixed inset-0' : 'relative min-h-[640px]',
        open ? 'opacity-100 pointer-events-auto' : 'pointer-events-none invisible opacity-0',
      )}
      aria-hidden={open ? undefined : true}
      {...((open ? {} : { inert: '' }) as object)}
      {...S}
    >
      <div className={cx('relative flex min-w-0 flex-1 flex-col overflow-y-auto px-6 pb-8', position === 'fixed' ? 'pt-24' : 'pt-8')} {...S}>
        <nav className="flex flex-col gap-3" aria-label={t('nav.aria_mobile')} {...S}>
          {navLinks.map((link) => {
            const active = isActive(currentPath, link.href);
            return (
              <div key={link.href} className="contents">
                <a
                  href={resolveHref(link.href, currentPath)}
                  onClick={onNavigate}
                  className={cx(
                    'mobile-nav-link inline-flex min-h-11 cursor-pointer items-center rounded-chip py-1.5 text-2xl font-semibold focus-visible:focus-ring',
                    active ? 'mobile-nav-link-active text-text-primary' : 'text-text-secondary hover:text-text-primary active:text-gold',
                  )}
                  aria-current={active ? 'page' : undefined}
                  {...S}
                >
                  {navLabel(link.label)}
                </a>
                {link.href === '/features' && (
                  <ul className="-mt-1 mb-2 grid grid-cols-1 gap-0.5 border-l border-border-subtle pl-4 min-[420px]:grid-cols-2" role="list" {...S}>
                    {featureRoutes.map((r) => (
                      <li key={r.slug} {...S}>
                        <a
                          href={withBase(`/features/${r.slug}`)}
                          onClick={onNavigate}
                          className="flex min-h-11 cursor-pointer items-center rounded-chip text-small text-text-tertiary transition-colors duration-[var(--d-ui)] ease-ui hover:text-text-primary active:text-gold focus-visible:focus-ring"
                          {...S}
                        >
                          {featureName(r.slug, 'en')}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
        <div className="mt-10 border-t border-border-subtle pt-8" {...S}>
          <Button href={site.playUrl} rel="noopener noreferrer" variant="primary" size="lg" className="w-full max-w-[420px] gap-2 px-5 text-center">
            <svg className="h-[22px] w-[22px] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7.5 4.75 19 12 7.5 19.25Z" />
            </svg>
            {t('hero.cta_play')}
          </Button>
        </div>
      </div>
    </div>
  );
}
