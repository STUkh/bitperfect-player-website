import type { AccentColorKey } from './colors';

export interface FeatureSpec {
  label: string;
  value: string;
}

export interface FeatureBenefit {
  title: string;
  desc: string;
  icon: string;
}

export interface FeatureScreenshot {
  src: string | null;
  caption: string;
  alt: string;
}

export interface Feature {
  id: 'eq' | 'library' | 'casting' | 'dsp' | 'usb-dac' | 'ai-enhancer';
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  accent: AccentColorKey;
  icon: string;
  description: string;
  overview: string;
  facts: string[];
  specs: FeatureSpec[];
  benefits: FeatureBenefit[];
  screenshots: FeatureScreenshot[];
  interactiveType?: 'eq-curve' | 'library-views' | 'streaming-nodes' | 'dsp-modules' | 'signal-chain' | 'spectrum-plot';
}

export const features: Feature[] = [
  {
    id: 'eq',
    slug: 'eq',
    title: '32-Band Parametric EQ',
    tagline: 'Surgical acoustic compensation with 7 filter topologies',
    badge: 'DSP Engine',
    accent: 'hires',
    icon: 'eq',
    description:
      'Shape exact acoustic compensation curves with up to 32 parametric bands, seven filter types, and precision Q factor scaling from 0.10 to 10.0.',
    overview:
      'Bitperfect Player includes a studio-grade 32-band parametric equalizer built for exacting audiophile compensation. Whether flattening headphone frequency responses, correcting room acoustics, or fine-tuning tonal balance, the engine runs 64-bit floating-point mathematics with zero audible phase distortion and instant bit-perfect bypass.',
    benefits: [
      {
        title: '32 Fully Independent Bands',
        desc: 'Configure up to 32 distinct parametric filters across the audible spectrum (20 Hz – 20 kHz) with ±24 dB gain adjustment.',
        icon: 'eq',
      },
      {
        title: 'Seven Filter Topologies',
        desc: 'Peak (Bell), Low Shelf, High Shelf, Low Pass, High Pass, Band Pass, and Notch filter shapes for surgical control.',
        icon: 'waveform',
      },
      {
        title: 'Continuous Q Precision',
        desc: 'Scale Q factor continuously from 0.10 (broad tonal warmth) to 10.0 (pinpoint resonance notch).',
        icon: 'sparkle',
      },
      {
        title: 'Zero Latency Hardware Bypass',
        desc: 'Toggle instant hardware bypass with a single tap to verify untouched bit-perfect signal purity against your equalized curve.',
        icon: 'sig-bitperfect',
      },
    ],
    facts: [
      'Up to 32 parametric bands per profile',
      'Seven filter topologies (Peak, Shelves, Passes, Notch)',
      'Q factor continuously scalable from 0.10 to 10.0',
      'Gain range adjustable from -24.0 dB to +24.0 dB',
      '64-bit floating point processing pipeline',
      'Instant one-tap bit-perfect bypass',
    ],
    specs: [
      { label: 'Bands', value: '1 to 32 parametric filters' },
      { label: 'Filter Types', value: '7 topologies' },
      { label: 'Q Factor Range', value: '0.10 to 10.0' },
      { label: 'Gain Range', value: '-24.0 dB to +24.0 dB' },
      { label: 'Processing Depth', value: '64-bit floating point' },
      { label: 'Frequency Span', value: '20 Hz – 20,000 Hz' },
    ],
    screenshots: [
      {
        src: null,
        caption: 'Parametric EQ: 32-band interactive response curve with live filter nodes and topology selector',
        alt: 'Bitperfect Player 32-band parametric EQ interface showing frequency response curve',
      },
    ],
    interactiveType: 'eq-curve',
  },
  {
    id: 'library',
    slug: 'library',
    title: 'Local Lossless Library Indexing',
    tagline: 'Six organized views without remote indexing or cloud dependencies',
    badge: 'Local Intelligence',
    accent: 'lossless',
    icon: 'waveform',
    description:
      'Organize your collection across albums, artists, songs, genres, folders, and playlists. Instant local search and navigation without sending data outside your device.',
    overview:
      'Your music library stays strictly on your device. Bitperfect indexes your local and SD card audio storage with instant sub-millisecond search, extracting embedded high-resolution tags and album artwork natively. No account is required, and zero telemetry or listening history is ever transmitted.',
    benefits: [
      {
        title: 'Six Native Navigation Views',
        desc: 'Browse seamlessly across Albums, Artists, Songs, Genres, hierarchical Folders, or custom Playlists.',
        icon: 'node-file',
      },
      {
        title: 'Instant Sub-Millisecond Search',
        desc: 'Fast full-text local search across titles, artists, album names, and filesystem paths with zero network latency.',
        icon: 'sparkle',
      },
      {
        title: 'Embedded Hi-Res Tag Extraction',
        desc: 'Extracts FLAC, ALAC, WAV, and DSD metadata directly from container headers without external scraping.',
        icon: 'node-dac',
      },
      {
        title: '100% On-Device Privacy',
        desc: 'Your listening habits, library size, and track listings never leave your device storage.',
        icon: 'shield',
      },
    ],
    facts: [
      'Albums, artists, songs, genres, folders, and playlists',
      'Hierarchical folder navigation for complex storage trees',
      'Automatic album art caching with high-resolution scaling',
      'M3U and M3U8 playlist import and export support',
      'Background storage change watcher keeps library current',
      'Zero analytics, telemetry, or remote catalog lookups',
    ],
    specs: [
      { label: 'Navigation Modes', value: '6 views (Albums, Artists, Songs, Genres, Folders, Playlists)' },
      { label: 'Search Speed', value: '< 2 ms local index lookup' },
      { label: 'Storage Sources', value: 'Internal storage, MicroSD, USB OTG drives' },
      { label: 'Embedded Formats', value: 'FLAC, ALAC, WAV, DSD, AIFF, OGG, MP3, AAC' },
      { label: 'Network Transfer', value: '0 bytes transmitted (100% offline)' },
      { label: 'Folder Hierarchy', value: 'Infinite subfolder traversal' },
    ],
    screenshots: [
      {
        src: null,
        caption: 'Library Browser: Multi-tier album grid with format tags and instantaneous search',
        alt: 'Bitperfect Player library navigation interface with album artwork',
      },
    ],
    interactiveType: 'library-views',
  },
  {
    id: 'casting',
    slug: 'casting',
    title: 'Bi-Directional Network Streaming',
    tagline: 'Send to remote renderers or turn your phone into a bit-perfect receiver',
    badge: 'Network Audio',
    accent: 'resampled',
    icon: 'cast',
    description:
      'Stream uncompressed audio to network players across your home, or turn your phone into a bit-perfect receiver for other audio sources.',
    overview:
      'Bitperfect operates as both a high-fidelity DLNA/UPnP transmitter and an uncompressed network receiver. Send pristine audio streams directly to smart TVs, network streamers, and wireless DACs, or stream from desktop audio workstations directly into Bitperfect on your mobile device.',
    benefits: [
      {
        title: 'Universal UPnP & DLNA Cast',
        desc: 'Cast lossless audio to any UPnP or DLNA certified network streamer, media renderer, or smart TV on your LAN.',
        icon: 'cast',
      },
      {
        title: 'Lossless Audio Receiver Mode',
        desc: 'Turn your Android phone into a dedicated wireless DAC endpoint for other audio sources across your home.',
        icon: 'node-usb',
      },
      {
        title: 'Hardware Volume Synchronization',
        desc: 'Synchronize hardware master volume with connected network streamers without digital bit truncation.',
        icon: 'node-engine',
      },
      {
        title: 'Network Stream Diagnostics',
        desc: 'Real-time telemetry of stream format, buffer health, and negotiated sample rate across the local network.',
        icon: 'sig-resampled',
      },
    ],
    facts: [
      'Transmit uncompressed audio to network renderers',
      'Receive incoming bit-perfect streams from remote computers',
      'Hardware volume lock prevents digital dynamic truncation',
      'Zero recompression: files stream at original bit depth',
      'Background streaming continues seamlessly with screen locked',
      'Compatible with UPnP, DLNA, and local network endpoints',
    ],
    specs: [
      { label: 'Streaming Protocols', value: 'UPnP AV, DLNA MediaRenderer, HTTP Audio' },
      { label: 'Operating Modes', value: 'Transmitter (Sender) & Receiver (Sink)' },
      { label: 'Max Sample Rate', value: 'Up to 24-bit / 192 kHz lossless streaming' },
      { label: 'Network Discovery', value: 'Zero-config SSDP mDNS local discovery' },
      { label: 'Volume Protocol', value: 'Renderer-side hardware volume lock' },
      { label: 'Buffer Window', value: 'Adaptive jitter-free ring buffer' },
    ],
    screenshots: [
      {
        src: null,
        caption: 'Network Streaming: Renderer discovery selector and live stream bitrate monitor',
        alt: 'Bitperfect Player network streaming control screen showing active endpoint',
      },
    ],
    interactiveType: 'streaming-nodes',
  },
  {
    id: 'dsp',
    slug: 'dsp',
    title: 'Studio-Grade 64-Bit DSP Engine',
    tagline: 'Real-time acoustic modules with zero latency and true-peak protection',
    badge: 'Studio DSP',
    accent: 'enhanced',
    icon: 'sparkle',
    description:
      'When bit-perfect bypass is not active, engage precision DSP modules: binaural headphone crossfeed, channel balance, ReplayGain 2.0, and true-peak protection.',
    overview:
      'Designed for demanding headphone listening, Bitperfect’s 64-bit floating-point DSP pipeline incorporates acoustic processing modules derived from professional mastering workstations. From natural binaural crossfeed to ITU-R loudness normalization, all modules operate with zero phase distortion and instant bit-perfect bypass.',
    benefits: [
      {
        title: 'Binaural Headphone Crossfeed',
        desc: 'Select between Meier and Bauer crossfeed models to eliminate headphone listening fatigue and restore a natural stereo soundstage.',
        icon: 'node-dac',
      },
      {
        title: 'ReplayGain 2.0 (EBU R128)',
        desc: 'ITU-R BS.1770 / EBU R128 loudness normalization ensures consistent volume across diverse track sources without dynamic squashing.',
        icon: 'waveform',
      },
      {
        title: 'Channel Balance & 180° Inversion',
        desc: 'Fine-tune stereo balance in 0.1 dB increments and correct inverted acoustic phase on vintage recordings.',
        icon: 'eq',
      },
      {
        title: 'True-Peak Inter-Sample Guard',
        desc: 'Mastering-grade limiter protects your DAC from inter-sample clipping artifacts caused by lossy decoders.',
        icon: 'shield',
      },
    ],
    facts: [
      'Binaural headphone crossfeed (Meier & Bauer algorithms)',
      'ReplayGain 2.0 (EBU R128 & ITU-R BS.1770 loudness normalization)',
      'Per-channel balance (±12 dB) and 180° polarity inversion',
      'True-peak inter-sample limiter prevents DAC clipping',
      'Zero-latency 64-bit float real-time computation',
      'Instant one-click bypass restores bit-perfect output',
    ],
    specs: [
      { label: 'Math Precision', value: '64-bit IEEE 754 floating point' },
      { label: 'Crossfeed Algorithms', value: 'Jan Meier & Bauer stereophonic models' },
      { label: 'Loudness Standard', value: 'EBU R128 / ITU-R BS.1770 (-14 to -23 LUFS)' },
      { label: 'Phase Control', value: '0° normal / 180° inverted per channel' },
      { label: 'Balance Precision', value: '±12.0 dB in 0.1 dB steps' },
      { label: 'Limiter Latency', value: '0 ms real-time lookahead' },
    ],
    screenshots: [
      {
        src: null,
        caption: 'DSP Studio: Precision crossfeed, loudness balance, and phase configuration panel',
        alt: 'Bitperfect Player DSP and effects control panel interface',
      },
    ],
    interactiveType: 'dsp-modules',
  },
  {
    id: 'usb-dac',
    slug: 'usb-dac',
    title: 'Direct USB DAC Output & Bit-True Engine',
    tagline: 'Exclusive hardware lock with complete Android mixer bypass',
    badge: 'Core Audio',
    accent: 'bitperfect',
    icon: 'node-usb',
    description:
      'Bypasses the standard 48 kHz Android system mixer to deliver unaltered bit-for-bit audio directly to your external USB DAC at up to DSD512 and 32-bit / 768 kHz PCM.',
    overview:
      'Standard Android audio routes every stream through an internal system mixer that forces 48 kHz resampling, 16-bit truncation, and dithering. Bitperfect opens the USB Audio Class 2 device node directly in exclusive mode, locking the DAC clock to the exact native sample rate of the file.',
    benefits: [
      {
        title: 'Zero Resampling or Dithering',
        desc: 'Audio samples travel from the file container to the DAC chip bit-for-bit unchanged.',
        icon: 'sig-bitperfect',
      },
      {
        title: 'Native DSD & 32-Bit PCM',
        desc: 'Direct support for native DSD up to DSD512 (DoP and Native DSD) and PCM up to 768 kHz.',
        icon: 'node-dac',
      },
      {
        title: 'Exclusive Device Ownership',
        desc: 'Prevents system notification sounds and OS audio mixer from degrading your listening session.',
        icon: 'shield',
      },
      {
        title: 'Real-Time Hardware Lock Telemetry',
        desc: 'Displays exact negotiated bit depth, sample rate, and DAC buffer status in live indicators.',
        icon: 'node-engine',
      },
    ],
    facts: [
      'Works with any USB-C or Micro-USB OTG DAC dongle or desktop DAC',
      'Automatic sample rate switching between tracks of different rates',
      'Hardware DAC volume control via USB HID commands',
      'Active bit-perfect badge in Now Playing UI with live telemetry',
      'Supports UAC1 and UAC2 USB audio class standards',
      'Bit-exact passthrough for FLAC, ALAC, WAV, and DSD streams',
    ],
    specs: [
      { label: 'Audio Protocol', value: 'USB Audio Class 2.0 (UAC2) Direct' },
      { label: 'Max PCM Sample Rate', value: 'Up to 32-bit / 768 kHz' },
      { label: 'DSD Support', value: 'DSD64, DSD128, DSD256, DSD512 (DoP & Native)' },
      { label: 'Android Resampling', value: '0% (Completely Bypassed)' },
      { label: 'Driver Architecture', value: 'Native C++ asynchronous ring buffer' },
      { label: 'Hardware Control', value: 'Direct USB HID hardware volume synchronization' },
    ],
    screenshots: [
      {
        src: null,
        caption: 'Now Playing with Bit-Perfect Lock: Live signal chain indicator showing FLAC 24/192 direct DAC lock',
        alt: 'Bitperfect Player Now Playing interface showing direct USB DAC lock',
      },
    ],
    interactiveType: 'signal-chain',
  },
  {
    id: 'ai-enhancer',
    slug: 'ai-enhancer',
    title: 'Real-Time Neural Signal Restoration',
    tagline: 'On-device in-band harmonic and phase reconstruction',
    badge: 'Neural DSP',
    accent: 'gold',
    icon: 'sparkle',
    description:
      'Dedicated on-device hardware neural acceleration for real-time lossy signal restoration. Reconstructs in-band amplitude and coherent phase with zero cloud telemetry.',
    overview:
      'When playing compressed MP3, AAC, or streaming sources, the AI Enhancer activates on-device hardware neural acceleration to predict lost harmonic detail and reconstruct coherent phase relationships in real time. Processing takes ~45 ms per chunk, executing 100% locally on your phone.',
    benefits: [
      {
        title: 'In-Band Acoustic Reconstruction',
        desc: 'Neural model reconstructs missing harmonics and phase coherence within the existing sample rate.',
        icon: 'sparkle',
      },
      {
        title: '100% On-Device Neural Inference',
        desc: 'Model runs on dedicated NPU/GPU hardware with zero internet connection or data uploads.',
        icon: 'shield',
      },
      {
        title: 'Automatic Hardware Probe',
        desc: 'Tests device accelerator throughput at launch to guarantee smooth, jitter-free real-time playback.',
        icon: 'node-engine',
      },
      {
        title: 'Honest Signal Transparency',
        desc: 'Signal indicator automatically updates to "Enhanced" to clearly state that DSP has been applied.',
        icon: 'sig-enhanced',
      },
    ],
    facts: [
      'One-time model download on first enable; works fully offline',
      'Can be enabled/disabled with a single toggle in Settings',
      'Bypassed automatically on native Hi-Res FLAC/DSD files',
      'Does not invent high-frequency noise or ultrasonic distortion',
      'Tested across 9 accelerator generations on Android',
      'Zero audio data or telemetry ever leaves your phone',
    ],
    specs: [
      { label: 'Inference Engine', value: 'On-device NPU / GPU / Vector CPU' },
      { label: 'Latency', value: '~45 ms per chunk (Real-time factor 0.15)' },
      { label: 'Network Transfer', value: '0 KB during playback (100% local)' },
      { label: 'Supported Inputs', value: 'MP3, AAC, OGG, Opus, Lossy streams' },
      { label: 'Signal Badge', value: 'Enhanced status indicator' },
      { label: 'Offline Execution', value: '100% standalone inference' },
    ],
    screenshots: [
      {
        src: null,
        caption: 'Neural Spectrum Analysis: Live spectral reconstruction comparison and phase prediction plot',
        alt: 'Bitperfect Player AI Enhancer spectrum analysis diagram',
      },
    ],
    interactiveType: 'spectrum-plot',
  },
];

export function getFeatureBySlug(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug);
}

export function getAllFeatures(): Feature[] {
  return features;
}

export function getAdjacentFeatures(slug: string): { prev: Feature; next: Feature } {
  const index = features.findIndex((f) => f.slug === slug);
  const prevIndex = (index - 1 + features.length) % features.length;
  const nextIndex = (index + 1) % features.length;
  return {
    prev: features[prevIndex],
    next: features[nextIndex],
  };
}
