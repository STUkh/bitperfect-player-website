import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import type { ClassProps } from '../class-props';

/**
 * The device, showing the screen this beat is about.
 *
 * Each beat is its own band with the phone on one side and the copy on the
 * other, so the device appears four or five times down a route and each instance
 * shows exactly the state its beat argues. One state per frame also means every
 * frame fits its own content, which the retired stacked version could not do.
 *
 * WHAT CHANGED: these used to be hand-drawn reproductions with a `state` prop,
 * four states per feature, clamped because there were only ever four drawings.
 * They are captures now, so the count is whatever the route needs — `usb-dac`
 * argues five beats and gets five screens instead of showing the fourth twice.
 *
 * The mapping is deliberate rather than positional. Every entry answers the beat
 * standing next to it: "Four ways to play into it" gets the Receiver screen,
 * which lists exactly four; "Fifteen formats" gets the flat track list, where
 * the per-track format chips are the evidence; "It tells you when it had to
 * convert" gets the Signal Path sheet, whose badge on this capture honestly
 * reads Resampled. A screen picked because it was next in an array is a
 * screenshot; a screen picked because it proves the sentence is an argument.
 */
export interface FeatureScreensProps extends ClassProps {
  slug: string;
  /** Which beat this is. Clamped to the route's own list, never wrapped. */
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
