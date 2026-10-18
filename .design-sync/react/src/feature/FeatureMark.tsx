import type { SVGProps } from 'react';
import { iconStroke } from '@site/utils/icon';

export type FeatureMarkName =
  | 'usb-dac' | 'eq' | 'library' | 'casting' | 'dsp' | 'ai-enhancer'
  | 'arrow-right' | 'arrow-left' | 'chevron-right' | 'check' | 'play' | 'file' | 'chip' | 'dac';

export interface FeatureMarkProps {
  /** One of the six feature identity marks, or a utility glyph. */
  name: FeatureMarkName;
  /** Pixel size; the stroke weight is derived from it. Default 20. */
  size?: number;
  /** Escape hatch. Leave unset so the size-derived weight applies. */
  stroke?: number;
  className?: string;
}

/**
 * The six feature marks (usb-dac, eq, library, casting, dsp, ai-enhancer) plus
 * utility glyphs, drawn on a 24px grid in currentColor. One weight, one colour:
 * never tint a mark per feature.
 */
export function FeatureMark({ name, size = 20, stroke, className }: FeatureMarkProps) {
  const svg: SVGProps<SVGSVGElement> = {
    className, width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    strokeWidth: stroke ?? iconStroke(size), strokeLinecap: 'round', strokeLinejoin: 'round',
    'aria-hidden': true, focusable: false,
  };
  return (
    <svg {...svg}>
      {name === 'usb-dac' && (
        <>
          <rect x="7.5" y="6.5" width="14" height="11" rx="3" />
          <path d="M6.5 9.75H3.5a1 1 0 0 0-1 1v2.5a1 1 0 0 0 1 1h3" strokeLinecap="butt" />
          <circle cx="16.5" cy="12" r="2.2" />
        </>
      )}
      {name === 'eq' && (
        <>
          <path d="M5 3v18M12 3v18M19 3v18" strokeOpacity="0.4" />
          <circle cx="5" cy="15" r="2.6" fill="currentColor" stroke="none" />
          <circle cx="12" cy="7.5" r="2.6" fill="currentColor" stroke="none" />
          <circle cx="19" cy="12" r="2.6" fill="currentColor" stroke="none" />
        </>
      )}
      {name === 'library' && (
        <>
          <rect x="3" y="7" width="14" height="14" rx="2" />
          <path d="M7 3.5h11a2.5 2.5 0 0 1 2.5 2.5v11" strokeOpacity="0.55" />
          <circle cx="10" cy="14" r="3.6" />
          <circle cx="10" cy="14" r="1" fill="currentColor" stroke="none" />
        </>
      )}
      {name === 'casting' && (
        <>
          <path d="M3 8.5h17" />
          <path d="m16.5 5 3.5 3.5-3.5 3.5" />
          <path d="M21 15.5H4" />
          <path d="m7.5 12-3.5 3.5L7.5 19" />
        </>
      )}
      {name === 'dsp' && (
        <>
          <path d="M5.3 18.7A9.5 9.5 0 1 1 18.7 18.7" strokeOpacity="0.5" />
          <circle cx="12" cy="12" r="5.5" />
          <path d="M12 12 8.5 8.5" />
        </>
      )}
      {name === 'ai-enhancer' && (
        <>
          <rect x="5" y="5" width="14" height="14" rx="3" />
          <path d="M9 2.5V5M15 2.5V5M9 19v2.5M15 19v2.5M2.5 9H5M2.5 15H5M19 9h2.5M19 15h2.5" />
          <path d="M8.5 12h1l1.2-2.5 2.6 5 1.2-2.5h1" />
        </>
      )}
      {name === 'arrow-right' && <path d="M5 12h14M13 6l6 6-6 6" />}
      {name === 'arrow-left' && <path d="M19 12H5M11 6l-6 6 6 6" />}
      {name === 'chevron-right' && <path d="M9 6l6 6-6 6" />}
      {name === 'check' && <path d="M4 12.5 9.5 18 20 6.5" />}
      {name === 'play' && (
        <path d="M5 3.5v17a1 1 0 0 0 1.52.86l14-8.5a1 1 0 0 0 0-1.72l-14-8.5A1 1 0 0 0 5 3.5Z" fill="currentColor" stroke="none" />
      )}
      {name === 'file' && (
        <>
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H14l6 6v7.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5Z" />
          <path d="M14 4v6h6" />
        </>
      )}
      {name === 'chip' && (
        <>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <rect x="9" y="9" width="6" height="6" rx="1.2" />
          <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
        </>
      )}
      {name === 'dac' && (
        <>
          <rect x="2.5" y="7" width="19" height="10" rx="2" />
          <circle cx="7.5" cy="12" r="1.6" />
          <path d="M12 10.5h6M12 13.5h6" />
        </>
      )}
    </svg>
  );
}
