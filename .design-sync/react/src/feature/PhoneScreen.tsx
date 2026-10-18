import { screens } from '@site/data/screens';
import { asset } from '../lib/asset';
import { cx } from '../lib/site';

export interface PhoneScreenProps {
  /** A key from `src/data/screens.ts`: "now-playing", "eq", "library", "output", "cast"... An unknown name renders nothing. */
  name: string;
  /** Empty by default: the copy beside the phone already says what the screen shows. Set it only when the image is the sole carrier of the information. */
  alt?: string;
  /** Load eagerly at high priority. Only for the one screen above the fold. */
  priority?: boolean;
  className?: string;
}

/**
 * One real capture of the shipping Android app, filling its parent edge to
 * edge. Put it inside PhoneFrame (or pass `screen` to PhoneFrame); it never
 * stands alone on a page, and app screens are never redrawn.
 */
export function PhoneScreen({ name, alt = '', priority = false, className }: PhoneScreenProps) {
  if (!screens.has(name)) return null;
  return (
    <img
      src={asset(`screens/${name}.webp`)}
      alt={alt}
      width="556"
      height="1236"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      className={cx('h-full w-full object-fill', className)}
    />
  );
}
