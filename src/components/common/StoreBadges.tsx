import { clsx as cx } from 'clsx';
import { site } from '../../data/site';
import './StoreBadges.css';

export interface StoreBadgesProps {
  variant?: 'light' | 'dark';
  /**
   * `icon` is Play only, 44x44, no label: the narrow header, where a labelled
   * badge does not fit beside the wordmark and the burger. Every other size
   * renders whichever stores have a URL.
   */
  size?: 'icon' | 'sm' | 'md' | 'lg';
  className?: string;
}

export default function StoreBadges(props: StoreBadgesProps) {
  const { variant = 'dark', size, className } = props;

  const isLight = variant === 'light';
  const badgeSize = size ?? (isLight ? 'lg' : 'md');

  /** currentColor SVG paths — no external assets, no Icon.astro dependency. */
  const PLAY_PATH =
    'M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19 0 .5-.25.92-.59 1.19l-2.27 1.31-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z';

  const APPLE_PATH =
    'M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.207-2.98.804-.94 2.142-1.64 3.157-1.68.03.13.14.29.14.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.335-1.36-3.348-2.7-1.293-1.72-2.353-4.42-2.353-6.98 0-4.28 2.845-6.54 5.685-6.54 1.517 0 2.784.94 3.685.94.875 0 2.303-1.03 3.994-1.03.673 0 3.079.06 4.61 2.36-.13.08-2.716 1.61-2.716 4.65 0 3.61 3.207 4.9 3.207 4.94z';

  return (
    <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 w-fit ${className ?? ''}`}>
      {isLight ? (
        <>
          {/* Large Light Badge (CTA section) */}
          {badgeSize === 'lg' && (
            <a
              href={site.playUrl}
              rel="noopener noreferrer"
              className="store-badge inline-flex w-fit min-w-[220px] cursor-pointer items-center gap-3 rounded-2xl border border-white/15 bg-white/12 px-6 py-3.5 text-white hover:border-glass-border-hover hover:bg-white/18 focus-visible:focus-ring"
            >
              <svg className="h-8 w-8 shrink-0 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d={PLAY_PATH} />
              </svg>
              <div className="text-left">
                <div className="text-xs leading-none text-text-secondary">Get it on</div>
                <div className="text-lg leading-tight font-semibold text-text-primary">Google Play</div>
              </div>
            </a>
          )}
          {/* Medium Light Badge */}
          {badgeSize === 'md' && (
            <a
              href={site.playUrl}
              rel="noopener noreferrer"
              className="store-badge inline-flex w-fit cursor-pointer items-center gap-2.5 rounded-xl border border-white/15 bg-white/12 px-4 py-2.5 text-white hover:border-glass-border-hover hover:bg-white/18 focus-visible:focus-ring"
            >
              <svg className="h-6 w-6 shrink-0 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d={PLAY_PATH} />
              </svg>
              <div className="text-left">
                <div className="text-[11px] leading-none text-text-secondary">Get it on</div>
                <div className="text-sm leading-tight font-semibold text-text-primary">Google Play</div>
              </div>
            </a>
          )}
          {/*
          Icon Light Badge (narrow header). Below 640px the header shipped NO
          store link at all: the labelled badge was `hidden sm:inline-flex` and
          the only route to Play was behind the burger. On a 7,796px page the
          primary action then appeared at y=390 and not again until y=7,100.
          Same chassis as the small badge, square, and 44x44 so it clears the
          tap-target floor with room over.
        */}
          {badgeSize === 'icon' && (
            <a
              href={site.playUrl}
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
              className="store-badge inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-gold/35 bg-gold/10 text-white hover:border-gold/60 hover:bg-gold/20 focus-visible:focus-ring"
            >
              <svg className="h-5 w-5 shrink-0 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d={PLAY_PATH} />
              </svg>
            </a>
          )}
          {/* Small Light Badge (Header) */}
          {badgeSize === 'sm' && (
            <a
              href={site.playUrl}
              rel="noopener noreferrer"
              className="store-badge inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-gold/35 bg-gold/10 px-3 py-1.5 text-white hover:border-gold/60 hover:bg-gold/20 focus-visible:focus-ring"
            >
              <svg
                className="h-[18px] w-[18px] shrink-0 text-gold"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d={PLAY_PATH} />
              </svg>
              <div className="text-left leading-none">
                <div className="text-[11px] font-medium text-gold/90 tracking-wider uppercase">Get it on</div>
                <div className="text-xs font-semibold text-white mt-0.5 whitespace-nowrap">Google Play</div>
              </div>
            </a>
          )}
          {badgeSize !== 'icon' && site.appStoreUrl && (
            <a
              href={site.appStoreUrl}
              rel="noopener noreferrer"
              className={cx([
                'store-badge inline-flex w-fit cursor-pointer items-center text-white focus-visible:focus-ring',
                badgeSize === 'lg' &&
                  'min-w-[220px] gap-3 rounded-2xl border border-white/15 bg-white/12 px-6 py-3.5 hover:border-glass-border-hover hover:bg-white/18',
                badgeSize === 'md' &&
                  'gap-2.5 rounded-xl border border-white/15 bg-white/12 px-4 py-2.5 hover:border-glass-border-hover hover:bg-white/18',
                badgeSize === 'sm' &&
                  'gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 hover:border-glass-border-hover hover:bg-white/15',
              ])}
            >
              <svg
                className={
                  badgeSize === 'lg'
                    ? 'h-8 w-8 shrink-0 text-gold'
                    : badgeSize === 'md'
                      ? 'h-6 w-6 shrink-0 text-gold'
                      : 'h-[18px] w-[18px] shrink-0 text-gold'
                }
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d={APPLE_PATH} />
              </svg>
              <div className="text-left leading-none">
                <div
                  className={
                    badgeSize === 'lg'
                      ? 'text-xs text-text-secondary'
                      : badgeSize === 'md'
                        ? 'text-[11px] text-text-secondary'
                        : 'text-[11px] text-text-secondary uppercase tracking-wider'
                  }
                >
                  Download on the
                </div>
                <div
                  className={
                    badgeSize === 'lg'
                      ? 'text-lg font-semibold mt-0.5 text-text-primary'
                      : badgeSize === 'md'
                        ? 'text-sm font-semibold mt-0.5 text-text-primary'
                        : 'text-xs font-semibold text-white mt-0.5 whitespace-nowrap'
                  }
                >
                  App Store
                </div>
              </div>
            </a>
          )}
          {badgeSize !== 'icon' && site.apkUrl && (
            <a
              href={site.apkUrl}
              rel="noopener noreferrer"
              className={cx([
                'store-badge inline-flex w-fit cursor-pointer items-center justify-center border border-white/15 text-white/80 hover:border-glass-border-hover hover:bg-white/[0.06] hover:text-white focus-visible:focus-ring',
                badgeSize === 'lg' && 'min-w-[220px] gap-2 rounded-2xl px-6 py-3.5',
                badgeSize === 'md' && 'gap-2 rounded-xl px-4 py-2.5',
                badgeSize === 'sm' && 'gap-1.5 rounded-xl px-3 py-1.5 text-xs',
              ])}
            >
              <span className="font-medium text-sm">Direct APK</span>{' '}
              <svg
                className="h-[18px] w-[18px] shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 12h14.5m0 0-5.5-5.5m5.5 5.5-5.5 5.5" />
              </svg>
            </a>
          )}
        </>
      ) : (
        <>
          {/* Dark Badges */}
          <a
            href={site.playUrl}
            rel="noopener noreferrer"
            className={cx([
              'store-badge inline-flex w-fit cursor-pointer items-center border border-border-subtle bg-white/8 hover:border-glass-border-hover hover:bg-white/12 focus-visible:focus-ring',
              badgeSize === 'lg' && 'gap-3 rounded-2xl px-6 py-3.5',
              badgeSize === 'md' && 'gap-2 rounded-xl px-4 py-2.5',
              badgeSize === 'sm' && 'gap-2 rounded-xl px-3 py-1.5',
            ])}
          >
            <svg
              className={
                badgeSize === 'lg'
                  ? 'h-8 w-8 text-white shrink-0'
                  : badgeSize === 'md'
                    ? 'h-6 w-6 text-white shrink-0'
                    : 'h-[18px] w-[18px] text-white shrink-0'
              }
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d={PLAY_PATH} />
            </svg>
            <div className="text-left leading-none">
              <div
                className={
                  badgeSize === 'lg'
                    ? 'text-xs text-text-secondary'
                    : badgeSize === 'md'
                      ? 'text-[11px] text-text-secondary'
                      : 'text-[11px] text-text-secondary uppercase tracking-wider'
                }
              >
                Get it on
              </div>
              <div
                className={
                  badgeSize === 'lg'
                    ? 'text-lg font-semibold text-white mt-0.5'
                    : badgeSize === 'md'
                      ? 'text-sm font-semibold text-white mt-0.5'
                      : 'text-xs font-semibold text-white mt-0.5 whitespace-nowrap'
                }
              >
                Google Play
              </div>
            </div>
          </a>{' '}
          {site.appStoreUrl && (
            <a
              href={site.appStoreUrl}
              rel="noopener noreferrer"
              className={cx([
                'store-badge inline-flex w-fit cursor-pointer items-center border border-border-subtle bg-white/8 hover:border-glass-border-hover hover:bg-white/12 focus-visible:focus-ring',
                badgeSize === 'lg' && 'gap-3 rounded-2xl px-6 py-3.5',
                badgeSize === 'md' && 'gap-2 rounded-xl px-4 py-2.5',
                badgeSize === 'sm' && 'gap-2 rounded-xl px-3 py-1.5',
              ])}
            >
              <svg
                className={
                  badgeSize === 'lg'
                    ? 'h-8 w-8 text-white shrink-0'
                    : badgeSize === 'md'
                      ? 'h-6 w-6 text-white shrink-0'
                      : 'h-[18px] w-[18px] text-white shrink-0'
                }
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d={APPLE_PATH} />
              </svg>
              <div className="text-left leading-none">
                <div
                  className={
                    badgeSize === 'lg'
                      ? 'text-xs text-text-secondary'
                      : badgeSize === 'md'
                        ? 'text-[11px] text-text-secondary'
                        : 'text-[11px] text-text-secondary uppercase tracking-wider'
                  }
                >
                  Download on the
                </div>
                <div
                  className={
                    badgeSize === 'lg'
                      ? 'text-lg font-semibold text-white mt-0.5'
                      : badgeSize === 'md'
                        ? 'text-sm font-semibold text-white mt-0.5'
                        : 'text-xs font-semibold text-white mt-0.5 whitespace-nowrap'
                  }
                >
                  App Store
                </div>
              </div>
            </a>
          )}
          {site.apkUrl && (
            <a
              href={site.apkUrl}
              rel="noopener noreferrer"
              className={cx([
                'store-badge inline-flex w-fit cursor-pointer items-center border border-border-subtle text-text-secondary hover:border-glass-border-hover hover:bg-white/[0.06] hover:text-white focus-visible:focus-ring',
                badgeSize === 'lg' && 'gap-2 rounded-2xl px-6 py-3.5',
                badgeSize === 'md' && 'gap-2 rounded-xl px-4 py-2.5',
                badgeSize === 'sm' && 'gap-1.5 rounded-xl px-3 py-1.5 text-xs',
              ])}
            >
              <span className="text-sm font-medium">Direct APK</span>{' '}
              <svg
                className="h-[18px] w-[18px] shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 12h14.5m0 0-5.5-5.5m5.5 5.5-5.5 5.5" />
              </svg>
            </a>
          )}
        </>
      )}
    </div>
  );
}
