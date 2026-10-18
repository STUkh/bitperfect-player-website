import { site } from '@site/data/site';
import { cn, t, scope } from '../lib/site';

export interface StoreBadgesProps {
  /** Kept for parity with the site; both variants render the glass badge on graphite. */
  variant?: 'light' | 'dark';
  /** `icon` = Play glyph only, 44x44 (narrow header). Otherwise a labelled badge per store with a URL. */
  size?: 'icon' | 'sm' | 'md' | 'lg';
  className?: string;
  /** Store URLs. Default to the site's: Google Play only today. */
  playUrl?: string;
  appStoreUrl?: string | null;
  apkUrl?: string | null;
}

const PLAY_PATH =
  'M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19 0 .5-.25.92-.59 1.19l-2.27 1.31-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z';
const APPLE_PATH =
  'M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.207-2.98.804-.94 2.142-1.64 3.157-1.68.03.13.14.29.14.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.335-1.36-3.348-2.7-1.293-1.72-2.353-4.42-2.353-6.98 0-4.28 2.845-6.54 5.685-6.54 1.517 0 2.784.94 3.685.94.875 0 2.303-1.03 3.994-1.03.673 0 3.079.06 4.61 2.36-.13.08-2.716 1.61-2.716 4.65 0 3.61 3.207 4.9 3.207 4.94z';

const S = scope('kz5l6cv5');
const chassis =
  'store-badge btn-secondary-glow inline-flex w-fit cursor-pointer items-center justify-center border border-border-subtle bg-white/[0.06] hover:border-glass-border-hover hover:bg-white/[0.10] active:bg-white/[0.04] focus-visible:focus-ring';

/**
 * Store badges: glass pills with the store glyph and a two-line label
 * ("Get it on / Google Play"). The product is Android-only, so by default only
 * the Google Play badge renders. Use on graphite.
 */
export function StoreBadges({
  variant = 'dark',
  size,
  className,
  playUrl = site.playUrl,
  appStoreUrl = site.appStoreUrl,
  apkUrl = site.apkUrl,
}: StoreBadgesProps) {
  const badgeSize = size ?? (variant === 'light' ? 'lg' : 'md');
  const pad = {
    lg: 'gap-3.5 rounded-full px-6 py-3 text-white',
    md: 'gap-3 rounded-full px-5 py-2.5 text-white',
    sm: 'gap-2.5 rounded-full px-4 py-2 text-white',
  } as const;
  const glyph = badgeSize === 'lg' ? 'h-6 w-6 text-white shrink-0' : badgeSize === 'md' ? 'h-5 w-5 text-white shrink-0' : 'h-4 w-4 text-white shrink-0';
  const label = badgeSize === 'lg' ? 'text-base font-semibold text-white mt-0.5 whitespace-nowrap' : badgeSize === 'md' ? 'text-sm font-semibold text-white mt-0.5 whitespace-nowrap' : 'text-xs font-semibold text-white mt-0.5 whitespace-nowrap';

  const labelled = (href: string, path: string, top: string, bottom: string) => (
    <a href={href} rel="noopener noreferrer" className={cn(chassis, badgeSize !== 'icon' && pad[badgeSize])} {...S}>
      <svg className={glyph} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...S}>
        <path d={path} {...S} />
      </svg>
      <div className="text-left leading-none" {...S}>
        <div className="text-device-label font-medium uppercase tracking-wider text-text-secondary" {...S}>{top}</div>
        <div className={label} {...S}>{bottom}</div>
      </div>
    </a>
  );

  return (
    <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 w-fit ${className ?? ''}`} {...S}>
      {badgeSize === 'icon' ? (
        <a
          href={playUrl}
          rel="noopener noreferrer"
          aria-label={t('store.get_it_on_play')}
          className="store-badge btn-secondary-glow inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-subtle bg-white/[0.06] hover:border-glass-border-hover hover:bg-white/[0.10] active:bg-white/[0.04] text-white focus-visible:focus-ring"
          {...S}
        >
          <svg className="h-5 w-5 shrink-0 text-text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...S}>
            <path d={PLAY_PATH} {...S} />
          </svg>
        </a>
      ) : (
        labelled(playUrl, PLAY_PATH, t('store.get_it_on'), t('store.google_play'))
      )}
      {badgeSize !== 'icon' && appStoreUrl && labelled(appStoreUrl, APPLE_PATH, t('store.download_on'), t('store.app_store'))}
      {badgeSize !== 'icon' && apkUrl && (
        <a
          href={apkUrl}
          rel="noopener noreferrer"
          className={cn(
            chassis,
            'text-text-secondary hover:text-white',
            badgeSize === 'lg' && 'gap-2.5 rounded-full px-6 py-3',
            badgeSize === 'md' && 'gap-2 rounded-full px-5 py-2.5',
            badgeSize === 'sm' && 'gap-1.5 rounded-full px-4 py-2 text-xs',
          )}
          {...S}
        >
          <span className="text-sm font-medium" {...S}>{t('store.direct_apk')}</span>
          <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...S}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 12h14.5m0 0-5.5-5.5m5.5 5.5-5.5 5.5" {...S} />
          </svg>
        </a>
      )}
    </div>
  );
}
