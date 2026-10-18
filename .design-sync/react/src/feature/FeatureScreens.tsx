import { PhoneFrame } from './PhoneFrame';
import { PhoneScreen } from './PhoneScreen';

/** The screen each beat of a feature route shows, in beat order. Picked to prove the sentence beside it. */
export const FEATURE_SCREEN_ROUTES: Record<string, string[]> = {
  /* 0 one app at a time · 1 the clock follows the file · 2 dongles and desktop
     DACs · 3 the badge tells the truth · 4 two ways to carry DSD */
  'usb-dac': ['output', 'track-info', 'now-playing', 'signal-clean', 'playback'],
  /* 0 thirty-two bands · 1 seven topologies · 2 warmth to a notch · 3 back to flat */
  eq: ['eq', 'eq-filters', 'eq-presets', 'eq-filters'],
  /* 0 eight ways in · 1 nothing looked up · 2 fifteen formats · 3 your playlists */
  library: ['library', 'sources', 'tracks', 'album'],
  /* 0 anything that speaks UPnP · 1 four ways in · 2 nothing touches the level
     · 3 it tells you when it converted */
  casting: ['cast', 'receiver', 'cast-sheet', 'signal-path'],
  /* 0 a long headphone session · 1 a mixed queue at one level · 2 eight voicings
     · 3 a guard your DAC will thank you for */
  dsp: ['dsp', 'playback', 'dsp-sheet', 'dsp'],
  /* 0 in-band reconstruction · 1 on your phone or not at all · 2 it runs where it
     can run well · 3 the badge stops saying bit-perfect */
  'ai-enhancer': ['ai', 'ai-neural', 'ai-enhancer', 'ai'],
};

export interface FeatureScreensProps {
  /** Feature route: "usb-dac", "eq", "library", "casting", "dsp" or "ai-enhancer". Unknown slugs fall back to usb-dac. */
  slug?: string;
  /** Which beat (0-based). Clamped to the route's own list, never wrapped. */
  state?: number;
  className?: string;
}

/**
 * The device on a feature route, showing the capture that proves one beat
 * (296px, 344px from lg). Put one in the art column of each beat band, opposite
 * the beat's headline and paragraph, with `state` set to the beat's index.
 */
export function FeatureScreens({ slug = 'usb-dac', state = 0, className }: FeatureScreensProps) {
  const list = FEATURE_SCREEN_ROUTES[slug] ?? FEATURE_SCREEN_ROUTES['usb-dac'];
  const name = list[state < 0 ? 0 : state >= list.length ? list.length - 1 : state];
  return (
    <PhoneFrame className={className}>
      <PhoneScreen name={name} />
    </PhoneFrame>
  );
}
