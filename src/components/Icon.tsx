import { iconStroke } from "../utils/icon";
import type { ClassProps } from "./class-props";
import "./Icon.css";

export interface IconProps extends ClassProps {
  /** Glyph name: `sig-*` signal-path status marks (app status only, never decoration), `node-*` chain nodes, feature marks, utilities (bullet, chevron, arrow, play, external) and the social marks (telegram, tiktok, instagram, x). */
  name: string;
  /** Pixel size (or a CSS length); the stroke weight is derived from it. Default 20. */
  size?: number | string;
  /** Escape hatch. Leave unset so the size-derived weight applies. */
  stroke?: number;
}

/** The social marks are Phosphor Light glyphs, drawn on a 256 grid and filled. */
const PHOSPHOR = ["telegram", "tiktok", "instagram", "x"];

/**
 * Authored icon set. One geometry system: 24x24 box, round caps, 9px nominal
 * radius for every circular form so the signal-path marks read as one family at
 * any size.
 *
 * Stroke is never passed by hand: `iconStroke` derives it from the size so the
 * rendered weight stays optically level from a 15px chip glyph to a 36px
 * identity mark. See `src/utils/icon.ts`.
 *
 * The `sig-*` icons are the app's signal-path status vocabulary
 * (Color.kt / AGENTS.md) redrawn as vectors. The app pairs every status colour
 * with a mark for colourblind accessibility; the site inherits that rule.
 */
export default function Icon({ name, size = 20, stroke, className = "" }: IconProps) {
  const box = typeof size === "number" ? size : Number.parseFloat(size);
  const strokeWidth = stroke ?? iconStroke(box);
  const isPhosphor = PHOSPHOR.includes(name);
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox={isPhosphor ? "0 0 256 256" : "0 0 24 24"}
      fill="none"
      stroke={isPhosphor ? "none" : "currentColor"}
      strokeWidth={isPhosphor ? 0 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >

        {/* ── Signal-path status marks ─────────────────────────────────────── */}
        {name === 'sig-bitperfect' && (
          <>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="4.25" fill="currentColor" stroke="none" />
          </>
        )}
        {/*
          No `sig-lossless` and no `sig-hires`. Both were drawn here and neither was ever
          asked for, because neither can be: `src/data/colors.ts` records them as tokens
          the app declares in `Color.kt` and never maps in `signalQualityColor()`, so the
          app has no such runtime state and the site must never show one. A glyph for a
          state that cannot occur is an invitation to render it.
        */}
        {name === 'sig-resampled' && (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 0 0 0 18Z" fill="currentColor" stroke="none" />
          </>
        )}
        {name === 'sig-lossy' && <circle cx="12" cy="12" r="9" />}
        {name === 'sig-enhanced' && (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7.25 13.3 10.7 16.75 12 13.3 13.3 12 16.75 10.7 13.3 7.25 12 10.7 10.7Z" fill="currentColor" stroke="none" />
          </>
        )}

        {/* ── Chain nodes ──────────────────────────────────────────────────── */}
        {name === 'node-file' && (
          <>
            <path d="M13.5 3H6.75A1.75 1.75 0 0 0 5 4.75v14.5A1.75 1.75 0 0 0 6.75 21h10.5A1.75 1.75 0 0 0 19 19.25V8.5Z" />
            <path d="M13.5 3v5.5H19" />
          </>
        )}
        {name === 'node-decode' && (
          <>
            <rect x="3.75" y="7.5" width="16.5" height="9" rx="1.75" />
            <path d="M7.25 11v2M10.5 9.75v4.5M13.75 10.5v3M17 11.25v1.5" />
          </>
        )}
        {name === 'node-engine' && (
          <>
            <rect x="4.5" y="4.5" width="15" height="15" rx="2" />
            <rect x="9" y="9" width="6" height="6" rx="1" />
            <path d="M9 1.75v2.75M15 1.75v2.75M9 19.5v2.75M15 19.5v2.75M1.75 9H4.5M1.75 15H4.5M19.5 9h2.75M19.5 15h2.75" />
          </>
        )}
        {name === 'node-usb' && (
          <>
            <rect x="5.5" y="8" width="13" height="8" rx="2.5" />
            <path d="M9.5 12h5" />
            <path d="M2 12h3.5M18.5 12H22" />
          </>
        )}
        {name === 'node-dac' && (
          <>
            <rect x="2.75" y="7" width="18.5" height="10" rx="2" />
            <circle cx="7.75" cy="12" r="2" />
            <path d="M13 10h5.25M13 14h5.25" />
          </>
        )}

        {/* ── Feature marks ────────────────────────────────────────────────── */}
        {name === 'eq' && (
          <>
            <path d="M6 20V14M6 10V4M12 20v-9M12 7V4M18 20v-4M18 12V4" />
            <path d="M3.75 14h4.5M9.75 7h4.5M15.75 12h4.5" />
          </>
        )}
        {name === 'cast' && (
          <>
            <path d="M2.75 20.25h.01M2.75 16.5a3.75 3.75 0 0 1 3.75 3.75M2.75 12.5a7.75 7.75 0 0 1 7.75 7.75" />
            <path d="M8 4.75h11.5a1.75 1.75 0 0 1 1.75 1.75v11a1.75 1.75 0 0 1-1.75 1.75H15" />
          </>
        )}
        {name === 'sparkle' && (
          <>
            <path d="M12 3.25 13.9 9.1 19.75 11 13.9 12.9 12 18.75 10.1 12.9 4.25 11 10.1 9.1Z" />
            <path d="M18.5 3v3M20 4.5h-3" />
          </>
        )}
        {name === 'shield' && (
          <>
            <path d="M12 2.75 4.75 5.5v6c0 4.4 2.95 8.35 7.25 9.75 4.3-1.4 7.25-5.35 7.25-9.75v-6Z" />
            <path d="m9 11.75 2.25 2.25 4-4.25" />
          </>
        )}
        {name === 'plug' && (
          <>
            <path d="M9 2.75v5.5M15 2.75v5.5" />
            <path d="M6.5 8.25h11v3.25a5.5 5.5 0 0 1-11 0Z" />
            <path d="M12 17v4.25" />
          </>
        )}
        {name === 'cable' && (
          <>
            <path d="M2.75 12h3.5" />
            <rect x="6.25" y="9" width="4" height="6" rx="1.25" />
            <path d="M10.25 12h3.5" />
            <rect x="13.75" y="9" width="4" height="6" rx="1.25" />
            <path d="M17.75 12h3.5" />
          </>
        )}
        {name === 'library' && (
          <>
            <path d="M4.75 8.5 12 4.75l7.25 3.75L12 12.25Z" />
            <path d="M4.75 12.75 12 16.5l7.25-3.75" />
            <path d="M4.75 17 12 20.75 19.25 17" />
          </>
        )}
        {name === 'download' && (
          <>
            <path d="M12 3.5v10.75" />
            <path d="m7.75 10.5 4.25 4.25 4.25-4.25" />
            <path d="M4.75 16.75v2.5a1.75 1.75 0 0 0 1.75 1.75h11a1.75 1.75 0 0 0 1.75-1.75v-2.5" />
          </>
        )}
        {name === 'phone' && (
          <>
            <rect x="7" y="2.75" width="10" height="18.5" rx="2.25" />
            <path d="M10.25 18.25h3.5" />
          </>
        )}
        {name === 'waveform' && (
          <path d="M2.75 12h2.5l2-6 3 13 3-17 3 14 2-4h3" />
        )}
        {name === 'android' && (
          <>
            <path d="M4.75 10.75h14.5v6.5a1.75 1.75 0 0 1-1.75 1.75H6.5a1.75 1.75 0 0 1-1.75-1.75Z" />
            <path d="M4.75 10.75a7.25 7.25 0 0 1 14.5 0" />
            <path d="m7.25 5.25-1.5-2.5M16.75 5.25l1.5-2.5" />
            <path d="M9.25 8h.01M14.75 8h.01" />
          </>
        )}
        {/* Neutral list mark. Deliberately not a `sig-*` glyph: the status marks are a
            taught vocabulary and must not be borrowed as decoration. */}
        {name === 'bullet' && <path d="M6.5 12h11" />}
        {name === 'chevron' && <path d="m6 9.5 6 6 6-6" />}
        {name === 'arrow' && <path d="M4.75 12h14.5m0 0-5.5-5.5m5.5 5.5-5.5 5.5" />}
        {name === 'play' && <path d="M7.5 4.75 19 12 7.5 19.25Z" fill="currentColor" stroke="none" />}
        {name === 'external' && (
          <>
            <path d="M13.75 4.75h5.5v5.5" />
            <path d="m19.25 4.75-7.5 7.5" />
            <path d="M18 14.5v4.75H4.75V6h4.75" />
          </>
        )}

        {/* ── Social / Brand marks (Phosphor Light, 256x256) ──────────────── */}
        {name === 'telegram' && (
          <path
            d="M227.57,27.7a7,7,0,0,0-7.13-1.22L17.78,105.79a12.23,12.23,0,0,0,2.1,23.39L74,139.81V200a14,14,0,0,0,24.08,9.71l26.64-27.63,41.58,36.45a13.9,13.9,0,0,0,9.2,3.49,14.33,14.33,0,0,0,4.36-.69,13.86,13.86,0,0,0,9.34-10.17L229.82,34.57A7,7,0,0,0,227.57,27.7ZM22.05,117.37h0a.46.46,0,0,1,0-.32.51.51,0,0,1,.15-.08L181.91,54.45l-103.3,74L22.2,117.41Zm67.39,84A2,2,0,0,1,86,200V148.11l29.69,26Zm88.07,7.08a1.93,1.93,0,0,1-1.34,1.44,2,2,0,0,1-2-.4L89.64,135.34,215,45.5Z"
            fill="currentColor"
            stroke="none"
          />
        )}
        {name === 'tiktok' && (
          <path
            d="M224,74a50.06,50.06,0,0,1-50-50,6,6,0,0,0-6-6H128a6,6,0,0,0-6,6V156a22,22,0,1,1-31.43-19.89A6,6,0,0,0,94,130.69V88a6,6,0,0,0-7-5.91C52.2,88.28,26,120.05,26,156a74,74,0,0,0,148,0V112.93A101.28,101.28,0,0,0,224,126a6,6,0,0,0,6-6V80A6,6,0,0,0,224,74Zm-6,39.8a89.13,89.13,0,0,1-46.5-16.69A6,6,0,0,0,162,102v54a62,62,0,0,1-124,0c0-27.72,18.47-52.48,44-60.38v31.53A34,34,0,1,0,134,156V30h28.29A62.09,62.09,0,0,0,218,85.71Z"
            fill="currentColor"
            stroke="none"
          />
        )}
        {name === 'instagram' && (
          <path
            d="M128,82a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162ZM176,26H80A54.06,54.06,0,0,0,26,80v96a54.06,54.06,0,0,0,54,54h96a54.06,54.06,0,0,0,54-54V80A54.06,54.06,0,0,0,176,26Zm42,150a42,42,0,0,1-42,42H80a42,42,0,0,1-42-42V80A42,42,0,0,1,80,38h96a42,42,0,0,1,42,42ZM190,76a10,10,0,1,1-10-10A10,10,0,0,1,190,76Z"
            fill="currentColor"
            stroke="none"
          />
        )}
        {name === 'x' && (
          <path
            d="M213.06,212.78l-63.42-99.66L212.44,44A6,6,0,1,0,203.56,36L143,102.62l-41.9-65.84A6,6,0,0,0,96,34H48a6,6,0,0,0-5.06,9.22l63.42,99.66L43.56,212A6,6,0,0,0,52.44,220L113,153.38l41.9,65.84A6,6,0,0,0,160,222h48a6,6,0,0,0,5.06-9.22ZM163.29,210,58.93,46H92.71L197.07,210Z"
            fill="currentColor"
            stroke="none"
          />
        )}
    </svg>
  );
}
