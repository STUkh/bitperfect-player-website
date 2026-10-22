import type { ClassProps } from '../_lib/class-props';
import { PLAY_STORE_PATH } from '../glyphs';

export interface PlayStoreMarkProps extends ClassProps {
  /** Pixel size of the square box. Default 20. Colour comes from the surrounding text colour. */
  size?: number;
}

/**
 * The Google Play mark, one `currentColor` glyph on a 24-unit grid: the ONE
 * mark for every place the site says "Google Play" (the store badges, the
 * install buttons). Its path is `PLAY_STORE_PATH` in `glyphs.ts`. It takes its
 * colour from the text around it, so it sits dark on the gold key-cap and white
 * on a graphite badge without a second asset.
 */
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
