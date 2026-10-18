import { useEffect, useRef, useState } from 'react';
import { navLinks, featureRoutes, featureName } from '@site/data/navigation';
import { Container } from './Container';
import { StoreBadges } from './StoreBadges';
import { MobileMenu } from './MobileMenu';
import { Logo } from './Logo';
import { FeatureMark, type FeatureMarkName } from '../feature/FeatureMark';
import { cx, t, isActive, resolveHref, withBase, scope } from '../lib/site';

export interface HeaderProps {
  /** Current route: drives the active link's gold underline. Default "/". */
  currentPath?: string;
  /** `fixed` pins it to the viewport top like the site; `static` keeps it in flow (mockups, cards). */
  position?: 'fixed' | 'static';
  /** Start with the Features panel open (desktop). */
  defaultFeaturesOpen?: boolean;
  /** Start with the phone menu open (below lg). */
  defaultMenuOpen?: boolean;
}

const S = scope('qmpwvs2w');
const navLabel = (label: string) => t(`nav.${label.toLowerCase()}` as never);

/**
 * The site header: 64px (80px from lg) near-opaque graphite bar with the mark
 * and wordmark, centred nav with a Features mega-panel (eight feature routes
 * with their marks), the Google Play badge, and a burger that opens MobileMenu
 * below lg. Place it once at the top of every page.
 */
export function Header({ currentPath = '/', position = 'fixed', defaultFeaturesOpen = false, defaultMenuOpen = false }: HeaderProps) {
  const [ddOpen, setDdOpen] = useState(defaultFeaturesOpen);
  const [menuOpen, setMenuOpen] = useState(defaultMenuOpen);
  const dd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const down = (e: PointerEvent) => { if (dd.current && !dd.current.contains(e.target as Node)) setDdOpen(false); };
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { setDdOpen(false); setMenuOpen(false); } };
    document.addEventListener('pointerdown', down);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', down); document.removeEventListener('keydown', key); };
  }, []);

  const hover = (open: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) setDdOpen(open);
  };
  const featuresActive = isActive(currentPath, '/features') || currentPath.includes('/features/');
  const featureItems = featureRoutes.map((r) => ({
    slug: r.slug,
    name: featureName(r.slug, 'en'),
    tagline: t(`feature.${r.slug}.tagline` as never),
    href: withBase(`/features/${r.slug}`),
  }));

  return (
    <>
      <header
        id="site-header"
        className={cx(position === 'fixed' ? 'fixed top-0 right-0 left-0' : 'relative', 'z-50 border-b border-border-subtle/40')}
        {...S}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between lg:h-20" aria-label={t('nav.aria_main')} {...S}>
            <a href={withBase('/')} className="group flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg py-1.5 focus-visible:focus-ring" {...S}>
              <Logo size="md" />
              <span className="text-body-sm font-bold whitespace-nowrap text-text-primary sm:text-body-lg" {...S}>
                Bitperfect<span className="hidden sm:inline" {...S}> Player</span>
              </span>
            </a>

            <div className="hidden items-center gap-8 lg:flex" {...S}>
              {navLinks.map((link) => {
                const active = isActive(currentPath, link.href);
                if (link.href === '/features') {
                  return (
                    <div
                      key={link.href}
                      ref={dd}
                      className="nav-dd"
                      data-nav-dd=""
                      {...(ddOpen ? { 'data-open': '' } : {})}
                      onPointerEnter={hover(true)}
                      onPointerLeave={hover(false)}
                      {...S}
                    >
                      <button
                        type="button"
                        onClick={() => setDdOpen(!ddOpen)}
                        className={cx(
                          'nav-link nav-dd-trigger inline-flex cursor-pointer items-center gap-1 rounded px-1.5 py-0.5 text-sm font-medium transition-colors duration-[var(--d-ui)] ease-ui focus-visible:focus-ring',
                          featuresActive ? 'nav-link-active text-text-primary' : 'text-text-secondary hover:text-text-primary',
                        )}
                        aria-expanded={ddOpen}
                        aria-controls="nav-features-panel"
                        aria-label={t('nav.features_menu')}
                        {...S}
                      >
                        {navLabel(link.label)}
                        <svg className="nav-dd-chevron h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...S}>
                          <path d="m6 9 6 6 6-6" {...S} />
                        </svg>
                      </button>
                      <div id="nav-features-panel" className="nav-dd-panel" {...S}>
                        <div className="nav-dd-card" {...S}>
                          <ul className="grid grid-cols-2 gap-1" role="list" {...S}>
                            {featureItems.map((f) => {
                              const current = currentPath.includes(`/features/${f.slug}`);
                              return (
                                <li key={f.slug} {...S}>
                                  <a href={f.href} className={cx('nav-dd-item focus-visible:focus-ring', current && 'is-current')} aria-current={current ? 'page' : undefined} {...S}>
                                    <span className="nav-dd-mark" {...S}>
                                      <FeatureMark name={f.slug as FeatureMarkName} size={22} />
                                    </span>
                                    <span className="min-w-0" {...S}>
                                      <span className="block text-small font-semibold text-text-primary" {...S}>{f.name}</span>
                                      <span className="mt-0.5 block text-caption leading-snug text-text-tertiary" {...S}>{f.tagline}</span>
                                    </span>
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                          <div className="nav-dd-foot" {...S}>
                            {[
                              ['/features', t('nav.features_all'), t('nav.features_all_desc')],
                              ['/features/catalog', t('nav.features_catalog'), t('nav.features_catalog_desc')],
                            ].map(([href, title, desc]) => (
                              <a key={href} href={withBase(href)} className="nav-dd-foot-link focus-visible:focus-ring" {...S}>
                                <span {...S}>
                                  <span className="block text-small font-semibold text-text-primary" {...S}>{title}</span>
                                  <span className="block text-caption text-text-tertiary" {...S}>{desc}</span>
                                </span>
                                <FeatureMark name="arrow-right" size={16} className="nav-dd-arrow" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <a
                    key={link.href}
                    href={resolveHref(link.href, currentPath)}
                    className={cx(
                      'nav-link cursor-pointer rounded px-1.5 py-0.5 text-sm font-medium transition-colors duration-[var(--d-ui)] ease-ui focus-visible:focus-ring',
                      active ? 'nav-link-active text-text-primary' : 'text-text-secondary hover:text-text-primary active:text-gold',
                    )}
                    aria-current={active ? 'page' : undefined}
                    {...S}
                  >
                    {navLabel(link.label)}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-3" {...S}>
              <StoreBadges variant="dark" size="icon" className="sm:hidden" />
              <StoreBadges variant="dark" size="md" className="hidden sm:inline-flex" />
              <button
                type="button"
                id="mobile-menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg text-text-primary transition-colors duration-[var(--d-ui)] ease-ui hover:bg-white/[0.055] active:bg-white/[0.09] focus-visible:focus-ring lg:hidden"
                aria-label={t('nav.aria_toggle')}
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
                {...S}
              >
                <span className={cx('block h-0.5 w-6 origin-center bg-text-primary transition-[transform,opacity] duration-300', menuOpen && 'rotate-45 translate-y-[8px]')} id="burger-top" {...S} />
                <span className={cx('block h-0.5 w-6 bg-text-primary transition-[transform,opacity] duration-300', menuOpen && 'opacity-0')} id="burger-mid" {...S} />
                <span className={cx('block h-0.5 w-4 origin-center bg-text-primary transition-[transform,opacity] duration-300', menuOpen && '-rotate-45 -translate-y-[8px] w-6')} id="burger-bot" {...S} />
              </button>
            </div>
          </nav>
        </Container>
      </header>
      <MobileMenu open={menuOpen} currentPath={currentPath} position={position} onNavigate={() => setMenuOpen(false)} />
    </>
  );
}
