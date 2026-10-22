import type { ClassProps } from '../class-props';

/**
 * The Google Play mark, one `currentColor` glyph on a 24-unit grid: the ONE source
 * for every place the site says "Google Play" (the store badges, the install
 * buttons). It takes its colour from the text around it, so it sits dark on the
 * gold key-cap and white on a graphite badge without a second asset.
 */
export const PLAY_STORE_PATH =
  'M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19 0 .5-.25.92-.59 1.19l-2.27 1.31-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z';

export interface PlayStoreMarkProps extends ClassProps {
  /** Pixel size of the square box. Default 20. Colour comes from the surrounding text colour. */
  size?: number;
}

export default function PlayStoreMark({ size = 20, className }: PlayStoreMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PLAY_STORE_PATH} />
    </svg>
  );
}
