import type { AccentColorKey } from './colors';

export interface Feature {
  id: string;
  title: string;
  description: string;
  accent: AccentColorKey;
}

export const features: Feature[] = [
  {
    id: 'engine',
    title: 'Rust engine, direct to the DAC.',
    description:
      'Samples reaching your DAC are numerically identical to the ones in the file. No resampling, remixing, or dithering on the way out — when bit-perfect is achievable, you get told.',
    accent: 'bitperfect',
  },
  {
    id: 'usb',
    title: 'Exclusive USB output.',
    description:
      "Android's internal mixer is bypassed entirely. The player opens the audio device directly and drives it at the file's own sample rate and bit depth.",
    accent: 'lossless',
  },
  {
    id: 'eq',
    title: 'Parametric EQ, up to 32 bands.',
    description:
      "Seven filter types, ±12 dB per band — ±24 in expert mode — Q from 0.1 to 10. A simple ten-band graphic mode when you want it, free per-band control when you don't.",
    accent: 'hires',
  },
  {
    id: 'plugins',
    title: 'Sources are separate apps.',
    description:
      'Plugins ship as their own signed APKs and only ever hand back a URL. Audio never crosses into their process.',
    accent: 'enhanced',
  },
  {
    id: 'casting',
    title: 'Casts both directions.',
    description:
      'Six protocol families, send and receive — TVs, smart speakers, network streamers, open receivers. The phone can be the player in the room or the renderer other apps cast to.',
    accent: 'resampled',
  },
  {
    id: 'library',
    title: 'Library and formats.',
    description:
      'Every format the engine decodes: FLAC, ALAC, WAV, AIFF, DSD, APE, WavPack, Opus, Vorbis, MP3, AAC. Indexed and searchable.',
    accent: 'lossy',
  },
];
