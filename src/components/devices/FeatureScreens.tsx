import Phone from './Phone';
import { featureScreens } from '../../data/feature-screens';
import type { ScreenName } from '../../data/screens';
import type { ClassProps } from '../_lib/class-props';

/**
 * A phone showing the app screen one beat of a feature route argues: a
 * `Phone` (Galaxy S25 Ultra chassis) around a capture of the shipping Android
 * app. Each beat is its own band, phone on one side and copy on
 * the other, so each instance shows exactly the state its beat argues.
 */
export interface FeatureScreensProps extends ClassProps {
  /** The feature route: `usb-dac`, `eq`, `library`, `casting`, `dsp` or `ai-enhancer`. An unknown slug falls back to `usb-dac`. */
  slug?: string;
  /** Zero-based beat index into the route's screen list. Default 0. */
  state?: number;
  /** Explicit screen name override (from SCREEN_OPTIONS / screens.ts). */
  screen?: ScreenName | string;
  /** Load eagerly with high fetch priority. Default true for state=0. */
  priority?: boolean;
  /** Load eagerly with low fetch priority. */
  eager?: boolean;
}

export default function FeatureScreens({ slug = 'usb-dac', state = 0, screen, priority, eager, className }: FeatureScreensProps) {
  const list = featureScreens[slug] ?? featureScreens['usb-dac'];
  const name = (screen as ScreenName) || list[state < 0 ? 0 : state >= list.length ? list.length - 1 : state];

  return <Phone screen={name} priority={priority ?? state === 0} eager={eager} className={className} />;
}
