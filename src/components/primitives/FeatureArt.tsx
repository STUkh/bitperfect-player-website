import { clsx as cx } from 'clsx';
import type { ClassProps } from '../_lib/class-props';
import Picture, { type PictureArt } from './Picture';

export interface FeatureArtProps extends ClassProps {
  /** Which feature's photograph: `usb-dac`, `eq`, `library`, `casting`, `dsp` or `ai-enhancer` (public/img/features/<slug>.webp). */
  slug: string;
  /** The frame's aspect, as a CSS aspect-ratio value (default `var(--art-ratio, 16 / 9)`). A card may crop wider than 16:9. */
  ratio?: string;
  /** Rendered width of the frame, per breakpoint, for the pick from the ladder. Pass the real one: the default (full width, then half the column) over-asks in a grid. */
  sizes?: string;
  /** A generated crop that matches `ratio` exactly (`16x7` for the landing cards; CROPS in scripts/images.mjs), so the file carries no pixels the frame cuts away. */
  crop?: string;
  /** Art direction for a frame that changes shape by breakpoint (the features index's 16:7 below 640px); `Picture`'s `art`. */
  art?: PictureArt[];
}

/**
 * The feature's photograph in a clipped, aspect-ratio frame. The image fills the
 * frame (cover), so a wide crop keeps the subject and costs nothing else. Carries
 * no text: the card around it says what the feature is. Decorative (`aria-hidden`).
 * Give it a width (`className="w-full"`); the vertical focus follows `--art-y`.
 */
export default function FeatureArt({
  slug,
  className,
  ratio = 'var(--art-ratio, 16 / 9)',
  sizes = '(max-width: 1023px) 100vw, 640px',
  crop,
  art,
}: FeatureArtProps) {
  return (
    <div className={cx(['feature-art relative overflow-hidden', className])} style={{ aspectRatio: ratio }} aria-hidden="true">
      <Picture
        src={`img/features/${slug}.webp`}
        sizes={sizes}
        crop={crop}
        art={art}
        position="50% var(--art-y, 50%)"
        style={{ objectPosition: '50% var(--art-y, 50%)' }}
        className="feature-art-img absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
