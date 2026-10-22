import type { ReactNode } from 'react';
import { clsx as cx } from 'clsx';
import { styleOf, type ClassProps, type StyleInput } from '../_lib/class-props';
import './FeatureLinkCard.css';

export interface FeatureLinkCardProps extends ClassProps {
  /** The feature route it opens. */
  href: string;
  /** The feature's name, from `featureName()` so it matches the nav. */
  title: string;
  /** One line under the name. */
  body: string;
  /** The plate above the text: a `FeatureArt` in its own clipping box (`slot="art"` from `.astro`). */
  art?: ReactNode;
  /** An object from React; CSS text (`"--i: 2"`, the reveal stagger) from an `.astro` caller. */
  style?: StyleInput;
}

/**
 * One feature as a whole-card link: the plate, then the name (gold on hover)
 * and a line. The card fades up in its own entrance (`r-rise` with the
 * card timing in FeatureLinkCard.css; set `--i` in `style`).
 * Its chassis is `className`: on the home page `lacquer lacquer-lift
 * features-card` (FeaturesTeaser.css), on /features `feature-card` with the
 * hover sweep (FeatureLinkCard.css). Render them in a 1/2/3 column grid.
 */
export default function FeatureLinkCard({ href, title, body, art, className, style }: FeatureLinkCardProps) {
  return (
    <a
      href={href}
      className={cx(
        'feature-link-card focus-visible:focus-ring r-rise group relative flex cursor-pointer flex-col rounded-card-inner lg:rounded-card',
        className,
      )}
      style={styleOf(style)}
    >
      {art}
      <div className="relative flex flex-1 flex-col px-6 pt-3 pb-6 lg:px-7 lg:pt-4 lg:pb-7">
        <h3 className="text-title-sm font-semibold tracking-[-0.01em] text-text-primary transition-colors duration-[var(--d-ui)] ease-ui group-hover:text-gold-light lg:text-title">
          {title}
        </h3>
        <p className="mt-2 text-body-sm text-pretty text-text-secondary transition-colors duration-[var(--d-ui)] ease-ui group-hover:text-text-primary">
          {body}
        </p>
      </div>
    </a>
  );
}
