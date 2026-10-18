import { iconStroke } from '@site/utils/icon';
import { scope } from '../lib/site';

export type IconName =
  | 'sig-bitperfect' | 'sig-resampled' | 'sig-lossy' | 'sig-enhanced'
  | 'node-file' | 'node-decode' | 'node-engine' | 'node-usb' | 'node-dac'
  | 'eq' | 'cast' | 'sparkle' | 'shield' | 'plug' | 'cable' | 'library' | 'download' | 'phone' | 'waveform' | 'android'
  | 'bullet' | 'chevron' | 'arrow' | 'play' | 'external';

export interface IconProps {
  /** Glyph: `sig-*` signal-path status marks (app status only, never decoration), `node-*` chain nodes, feature marks, or utilities (bullet, chevron, arrow, play, external). */
  name: IconName;
  /** Pixel size (or a CSS length); the stroke weight is derived from it. Default 20. */
  size?: number | string;
  className?: string;
  /** Escape hatch. Leave unset so the size-derived weight applies. */
  stroke?: number;
}

const S = scope('patnjmll');

/**
 * The authored icon set: one 24px geometry, round caps, currentColor, with the
 * stroke weight derived from the size so a 15px chip glyph and a 36px identity
 * mark read at the same optical weight. Colour it with a text class on the
 * parent; the `sig-*` marks always pair with their signal colour.
 */
export function Icon({ name, size = 20, className = '', stroke }: IconProps) {
  const box = typeof size === 'number' ? size : Number.parseFloat(size);
  const strokeWidth = stroke ?? iconStroke(box);
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...S}
    >
      {name === 'sig-bitperfect' && (
        <>
          <circle cx="12" cy="12" r="9" {...S} />
          <circle cx="12" cy="12" r="4.25" fill="currentColor" stroke="none" {...S} />
        </>
      )}
      {name === 'sig-resampled' && (
        <>
          <circle cx="12" cy="12" r="9" {...S} />
          <path d="M12 3a9 9 0 0 0 0 18Z" fill="currentColor" stroke="none" {...S} />
        </>
      )}
      {name === 'sig-lossy' && <circle cx="12" cy="12" r="9" {...S} />}
      {name === 'sig-enhanced' && (
        <>
          <circle cx="12" cy="12" r="9" {...S} />
          <path d="M12 7.25 13.3 10.7 16.75 12 13.3 13.3 12 16.75 10.7 13.3 7.25 12 10.7 10.7Z" fill="currentColor" stroke="none" {...S} />
        </>
      )}

      {name === 'node-file' && (
        <>
          <path d="M13.5 3H6.75A1.75 1.75 0 0 0 5 4.75v14.5A1.75 1.75 0 0 0 6.75 21h10.5A1.75 1.75 0 0 0 19 19.25V8.5Z" {...S} />
          <path d="M13.5 3v5.5H19" {...S} />
        </>
      )}
      {name === 'node-decode' && (
        <>
          <rect x="3.75" y="7.5" width="16.5" height="9" rx="1.75" {...S} />
          <path d="M7.25 11v2M10.5 9.75v4.5M13.75 10.5v3M17 11.25v1.5" {...S} />
        </>
      )}
      {name === 'node-engine' && (
        <>
          <rect x="4.5" y="4.5" width="15" height="15" rx="2" {...S} />
          <rect x="9" y="9" width="6" height="6" rx="1" {...S} />
          <path d="M9 1.75v2.75M15 1.75v2.75M9 19.5v2.75M15 19.5v2.75M1.75 9H4.5M1.75 15H4.5M19.5 9h2.75M19.5 15h2.75" {...S} />
        </>
      )}
      {name === 'node-usb' && (
        <>
          <rect x="5.5" y="8" width="13" height="8" rx="2.5" {...S} />
          <path d="M9.5 12h5" {...S} />
          <path d="M2 12h3.5M18.5 12H22" {...S} />
        </>
      )}
      {name === 'node-dac' && (
        <>
          <rect x="2.75" y="7" width="18.5" height="10" rx="2" {...S} />
          <circle cx="7.75" cy="12" r="2" {...S} />
          <path d="M13 10h5.25M13 14h5.25" {...S} />
        </>
      )}

      {name === 'eq' && (
        <>
          <path d="M6 20V14M6 10V4M12 20v-9M12 7V4M18 20v-4M18 12V4" {...S} />
          <path d="M3.75 14h4.5M9.75 7h4.5M15.75 12h4.5" {...S} />
        </>
      )}
      {name === 'cast' && (
        <>
          <path d="M2.75 20.25h.01M2.75 16.5a3.75 3.75 0 0 1 3.75 3.75M2.75 12.5a7.75 7.75 0 0 1 7.75 7.75" {...S} />
          <path d="M8 4.75h11.5a1.75 1.75 0 0 1 1.75 1.75v11a1.75 1.75 0 0 1-1.75 1.75H15" {...S} />
        </>
      )}
      {name === 'sparkle' && (
        <>
          <path d="M12 3.25 13.9 9.1 19.75 11 13.9 12.9 12 18.75 10.1 12.9 4.25 11 10.1 9.1Z" {...S} />
          <path d="M18.5 3v3M20 4.5h-3" {...S} />
        </>
      )}
      {name === 'shield' && (
        <>
          <path d="M12 2.75 4.75 5.5v6c0 4.4 2.95 8.35 7.25 9.75 4.3-1.4 7.25-5.35 7.25-9.75v-6Z" {...S} />
          <path d="m9 11.75 2.25 2.25 4-4.25" {...S} />
        </>
      )}
      {name === 'plug' && (
        <>
          <path d="M9 2.75v5.5M15 2.75v5.5" {...S} />
          <path d="M6.5 8.25h11v3.25a5.5 5.5 0 0 1-11 0Z" {...S} />
          <path d="M12 17v4.25" {...S} />
        </>
      )}
      {name === 'cable' && (
        <>
          <path d="M2.75 12h3.5" {...S} />
          <rect x="6.25" y="9" width="4" height="6" rx="1.25" {...S} />
          <path d="M10.25 12h3.5" {...S} />
          <rect x="13.75" y="9" width="4" height="6" rx="1.25" {...S} />
          <path d="M17.75 12h3.5" {...S} />
        </>
      )}
      {name === 'library' && (
        <>
          <path d="M4.75 8.5 12 4.75l7.25 3.75L12 12.25Z" {...S} />
          <path d="M4.75 12.75 12 16.5l7.25-3.75" {...S} />
          <path d="M4.75 17 12 20.75 19.25 17" {...S} />
        </>
      )}
      {name === 'download' && (
        <>
          <path d="M12 3.5v10.75" {...S} />
          <path d="m7.75 10.5 4.25 4.25 4.25-4.25" {...S} />
          <path d="M4.75 16.75v2.5a1.75 1.75 0 0 0 1.75 1.75h11a1.75 1.75 0 0 0 1.75-1.75v-2.5" {...S} />
        </>
      )}
      {name === 'phone' && (
        <>
          <rect x="7" y="2.75" width="10" height="18.5" rx="2.25" {...S} />
          <path d="M10.25 18.25h3.5" {...S} />
        </>
      )}
      {name === 'waveform' && <path d="M2.75 12h2.5l2-6 3 13 3-17 3 14 2-4h3" {...S} />}
      {name === 'android' && (
        <>
          <path d="M4.75 10.75h14.5v6.5a1.75 1.75 0 0 1-1.75 1.75H6.5a1.75 1.75 0 0 1-1.75-1.75Z" {...S} />
          <path d="M4.75 10.75a7.25 7.25 0 0 1 14.5 0" {...S} />
          <path d="m7.25 5.25-1.5-2.5M16.75 5.25l1.5-2.5" {...S} />
          <path d="M9.25 8h.01M14.75 8h.01" {...S} />
        </>
      )}
      {name === 'bullet' && <path d="M6.5 12h11" {...S} />}
      {name === 'chevron' && <path d="m6 9.5 6 6 6-6" {...S} />}
      {name === 'arrow' && <path d="M4.75 12h14.5m0 0-5.5-5.5m5.5 5.5-5.5 5.5" {...S} />}
      {name === 'play' && <path d="M7.5 4.75 19 12 7.5 19.25Z" fill="currentColor" stroke="none" {...S} />}
      {name === 'external' && (
        <>
          <path d="M13.75 4.75h5.5v5.5" {...S} />
          <path d="m19.25 4.75-7.5 7.5" {...S} />
          <path d="M18 14.5v4.75H4.75V6h4.75" {...S} />
        </>
      )}
    </svg>
  );
}
