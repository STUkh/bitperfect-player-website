import Phone from './Phone';
import { featureScreens } from '../../data/feature-screens';
import type { ClassProps } from '../_lib/class-props';

/**
 * A phone showing the app screen one beat of a feature route argues: a
 * `Phone` (Galaxy S25 Ultra chassis) around a capture of the shipping Android
 * app. Each beat is its own band, phone on one side and copy on
 * the other, so each instance shows exactly the state its beat argues.
 *
 * The screen is picked per beat, not by position: every entry in the route's
 * list answers the sentence standing next to it. For example the casting route
 * pairs "Four ways to play into it" with the Receiver screen, which lists
 * exactly four. Routes and their screens (`src/data/feature-screens.ts`), by `state`:
 * - `usb-dac` (5): output, track-info, now-playing, signal-clean, playback
 * - `eq` (4): eq, eq-filters, eq-sculptor, eq-presets
 * - `library` (4): library, sources, tracks, album
 * - `casting` (4): cast, receiver, cast-sheet, signal-path
 * - `dsp` (4): dsp, playback, dsp-sheet, fidelity
 * - `ai-enhancer` (4): ai, ai-neural, ai-enhancer, ai-karaoke
 */
export interface FeatureScreensProps extends ClassProps {
  /** The feature route: `usb-dac`, `eq`, `library`, `casting`, `dsp` or `ai-enhancer`. An unknown slug falls back to `usb-dac`. */
  slug: string;
  /** Zero-based beat index into the route's screen list (see above). Default 0. Clamped to the list, never wrapped. */
  state?: number;
}

export default function FeatureScreens({ slug, state = 0, className }: FeatureScreensProps) {
  const list = featureScreens[slug] ?? featureScreens['usb-dac'];
  const name = list[state < 0 ? 0 : state >= list.length ? list.length - 1 : state];

  return <Phone screen={name} className={className} />;
}
