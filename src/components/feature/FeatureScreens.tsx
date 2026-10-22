import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import type { ClassProps } from '../class-props';

/**
 * A phone showing the app screen one beat of a feature route argues: a
 * `PhoneFrame` (Galaxy S25 Ultra chassis) around a `PhoneScreen` capture of the
 * shipping Android app. Each beat is its own band, phone on one side and copy on
 * the other, so each instance shows exactly the state its beat argues.
 *
 * The screen is picked per beat, not by position: every entry in the route's
 * list answers the sentence standing next to it. For example the casting route
 * pairs "Four ways to play into it" with the Receiver screen, which lists
 * exactly four. Routes and their screens, by `state`:
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

const ROUTES: Record<string, string[]> = {
  /* 0 one app at a time · 1 the clock follows the file · 2 dongles and desktop
     DACs · 3 the badge tells the truth · 4 two ways to carry DSD */
  'usb-dac': ['output', 'track-info', 'now-playing', 'signal-clean', 'playback'],
  /* 0 thirty-two bands · 1 seven topologies · 2 warmth to a notch · 3 back to flat.
     Beat 1 gets the band editor rather than another curve, because the seven filter
     shapes ARE the beat: the page lists them as chips and the phone shows the row
     they are chosen from. */
  eq: ['eq', 'eq-filters', 'eq-sculptor', 'eq-presets'],
  /* 0 eight ways in · 1 nothing looked up · 2 fifteen formats · 3 your playlists */
  library: ['library', 'sources', 'tracks', 'album'],
  /* 0 anything that speaks UPnP · 1 four ways in · 2 nothing touches the level
     · 3 it tells you when it converted */
  casting: ['cast', 'receiver', 'cast-sheet', 'signal-path'],
  /* 0 a long headphone session · 1 a mixed queue at one level · 2 eight voicings
     · 3 a guard your DAC will thank you for */
  dsp: ['dsp', 'playback', 'dsp-sheet', 'fidelity'],
  /* 0 in-band reconstruction · 1 on your phone or not at all · 2 no fallback
     · 3 the badge stops saying bit-perfect */
  'ai-enhancer': ['ai', 'ai-neural', 'ai-enhancer', 'ai-karaoke'],
};

export default function FeatureScreens({ slug, state = 0, className }: FeatureScreensProps) {
  const list = ROUTES[slug] ?? ROUTES['usb-dac'];
  const name = list[state < 0 ? 0 : state >= list.length ? list.length - 1 : state];

  return (
    <PhoneFrame className={className}>
      <PhoneScreen name={name} />
    </PhoneFrame>
  );
}
