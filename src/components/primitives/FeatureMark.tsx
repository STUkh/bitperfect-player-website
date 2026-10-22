import Icon from './Icon';
import type { FeatureGlyphName } from './glyphs';
import type { ClassProps } from '../_lib/class-props';

/**
 * The six feature marks (`usb-dac`, `eq`, `library`, `casting`, `dsp`,
 * `ai-enhancer`), plus the handful of utility glyphs the feature routes need
 * (`check`, `play`, `file`, `chip`, `dac`, and the `arrow-*` / `chevron-right`
 * directional ones, which never go inside a button). Strokes in `currentColor`,
 * so the colour is whatever text colour the parent sets.
 *
 * "The Mark Carries the Identity" (DESIGN.md): one weight, one colour, drawn on
 * a 24px grid. Colour never tells the six features apart; the drawing
 * does. Nothing in here is ever tinted per route.
 *
 * The six identity marks run larger than the utility glyphs — against a 34px
 * row heading a 24px mark reads as a bullet rather than a drawing. Stroke is
 * derived from the size by `iconStroke` so the weight stays optically level
 * across the range; do not pass it by hand. See `src/utils/icon.ts`.
 *
 * An alias of `Icon` reading `FEATURE_GLYPHS` (`glyphs.ts`), where the drawings
 * and the reasons for them live.
 */

export interface FeatureMarkProps extends ClassProps {
  name: FeatureGlyphName;
  /** Width and height in px. Default 20; the identity marks read best at 28 or more. */
  size?: number;
  /** Escape hatch. Leave unset so the size-derived weight applies. */
  stroke?: number;
}

export default function FeatureMark(props: FeatureMarkProps) {
  return <Icon {...props} set="feature" />;
}
