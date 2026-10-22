import { site } from '../../data/site';
import Button, { type ButtonProps } from './Button';
import PlayStoreMark from './PlayStoreMark';

export interface PlayCtaProps extends Omit<ButtonProps, 'href' | 'children'> {
  /** The visible label, e.g. "Get it on Google Play". Shown beside the Play mark. */
  label: string;
}

/**
 * The install action: a `Button` that goes to the Play listing and carries the
 * Google Play mark. Every "Get it on Google Play" button on the site is this one,
 * so the link, the `rel` and the mark live in one place. `variant` (`primary` gold
 * key-cap by default, or `secondary`/`outline`), `size` and `className` pass through
 * to `Button`. `href` and `children` are fixed. Never swap the mark for a play
 * triangle or add an arrow.
 */
export default function PlayCta({ label, variant = 'primary', ...rest }: PlayCtaProps) {
  return (
    <Button href={site.playUrl} rel="noopener noreferrer" variant={variant} {...rest}>
      <PlayStoreMark />
      <span>{label}</span>
    </Button>
  );
}
