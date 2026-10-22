import type { ScreenName } from './screens';

/**
 * The capture each beat of a feature route shows, in beat order. Picked per beat,
 * not by position: every entry answers the sentence standing next to it.
 */
export const featureScreens: Record<string, ScreenName[]> = {
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
