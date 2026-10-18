export interface ChangeCategory {
  type: "features" | "improvements" | "fixes" | "engine";
  label: string;
  items: {
    title: string;
    description?: string;
  }[];
}

export interface Release {
  version: string;
  releaseDate: string;
  title: string;
  summary: string;
  badge?: string;
  isLatest?: boolean;
  categories: ChangeCategory[];
}

export const releases: Release[] = [
  {
    version: "1.2.0",
    releaseDate: "October 12, 2026",
    title: "Major Audio Engine & 120 FPS UI Update",
    summary:
      "Rebuilt the audio pipeline in Rust with Symphonia and ARM NEON vectorization. Added a 60/120 FPS decoupled UI, dyadic lossless volume, and a 4-mode equalizer.",
    badge: "Latest Release",
    isLatest: true,
    categories: [
      {
        type: "engine",
        label: "Audio Engine & Architecture",
        items: [
          {
            title: "Symphony Engine in Rust",
            description:
              "Custom Rust and Symphonia playback pipeline with ARM NEON vector instructions for lower latency and higher power efficiency than C++.",
          },
          {
            title: "Bitperfect Lock",
            description:
              "One-touch lockout that disables all DSP modules, EQ, and software volume sliders, delegating volume control strictly to DAC hardware.",
          },
          {
            title: "Full RAM Playback",
            description:
              "Loads complete audio tracks into RAM before playback to eliminate flash storage reads, microSD bus contention, and RF noise.",
          },
          {
            title: "Real-Time PCM to DSD Conversion",
            description:
              "Delta-sigma modulator converting PCM audio into 1-bit DSD streams (up to DSD512) in real time.",
          },
        ],
      },
      {
        type: "features",
        label: "New Features",
        items: [
          {
            title: "4-Mode EQ & Studio Suite",
            description:
              "Integrated Studio target curves, 10-band graphic EQ, 32-band Parametric EQ with 7 filter shapes, and AutoEQ database with 4,000+ headphone calibration profiles.",
          },
          {
            title: "Harmonic Tuning Vacuum Tube Emulation",
            description:
              "Added 8 authentic vacuum tube voicings (300B, KT88, EL34, 12AX7, etc.) with musical even-order harmonic saturation.",
          },
          {
            title: "6 Audiophile SRC Resamplers",
            description:
              "Introduced selectable mastering-grade sample rate converters including Linear Phase, Minimum Phase, Polyphase FIR, and Blackman-Harris sinc.",
          },
          {
            title: "Audiophile Upsampler up to 8x",
            description:
              "Synchronous integer and fractional upsampling up to 768 kHz to push digital filter reconstruction far beyond audible bandwidth.",
          },
          {
            title: "Open Plugin System & SDK",
            description:
              "Launched public SDK repository at github.com/STUkh/bitperfect-player-plugin-SDK for developer DSP and metadata plugins.",
          },
        ],
      },
      {
        type: "improvements",
        label: "Performance & Improvements",
        items: [
          {
            title: "60/120 FPS High-Refresh Display Optimization",
            description:
              "Decoupled UI rendering threads from audio processing threads, ensuring fluid library navigation without audio dropouts.",
          },
          {
            title: "Faster USB DAC Handshake",
            description:
              "Reduced cold-start initialization and endpoint negotiation time on Android 14 and 15.",
          },
          {
            title: "Neural Engine Memory Footprint",
            description:
              "Quantized model weights reducing on-device NPU RAM usage by 38% during active AI Enhancer playback.",
          },
          {
            title: "Universal Casting Protocol Enhancements",
            description:
              "Improved Chromecast custom hi-res receiver app with gapless track pre-buffering and album artwork caching.",
          },
        ],
      },
      {
        type: "fixes",
        label: "Bug Fixes & Stability",
        items: [
          {
            title: "UAC2 Hot-Plug Buffer Recovery",
            description:
              "Resolved rare audio buffer underrun when rapidly disconnecting and reconnecting USB DAC cables during active playback.",
          },
          {
            title: "Sample-Accurate Gapless Transitions",
            description:
              "Fixed micro-gap anomaly occurring on 32-bit floating point WAV and ALAC files across consecutive tracks.",
          },
          {
            title: "Samsung Background Playback Optimization",
            description:
              "Added automatic background service foreground priority handling to prevent aggressive One UI battery management termination.",
          },
          {
            title: "HiBy & FiiO DAP Hardware Volume Sync",
            description:
              "Fixed hardware volume step synchronization on custom Android builds with non-standard Linux ALSA mappings.",
          },
        ],
      },
    ],
  },
  {
    version: "1.0.6",
    releaseDate: "August 15, 2026",
    title: "Initial Public Release",
    summary:
      "First public release on Google Play featuring user-space USB Audio Class bypass, a 32-band Parametric EQ, and live bit-perfect signal telemetry.",
    badge: "Milestone Release",
    isLatest: false,
    categories: [
      {
        type: "features",
        label: "Core Features",
        items: [
          {
            title: "Direct Bit-Perfect USB DAC Output",
            description:
              "Exclusive hardware driver bypassing Android AudioFlinger mixer, sample-rate conversion, and software volume dither.",
          },
          {
            title: "Broad Lossless Format Decoding",
            description:
              "Playback support for FLAC, ALAC, WAV, AIFF, DSD (DSF/DFF and SACD ISO), Monkey’s Audio (APE), WavPack, Opus, and Ogg Vorbis.",
          },
          {
            title: "32-Band Parametric Equalizer",
            description:
              "Surgical biquad EQ with 7 filter shapes (Bell, Low Shelf, High Shelf, Low Pass, High Pass, Notch, All Pass) and Q from 0.10 to 10.0.",
          },
          {
            title: "Acoustic Crossfeed Engine",
            description:
              "Headphone spatial simulation featuring Jan Meier, Chu Moy, and Bauer BS2B acoustic models.",
          },
          {
            title: "Bi-Directional Streaming & Receiver Mode",
            description:
              "Stream out via DLNA/UPnP and turn phone into a high-res network receiver endpoint.",
          },
        ],
      },
      {
        type: "improvements",
        label: "Design & Usability",
        items: [
          {
            title: "Understated Graphite & Ivory Aesthetic",
            description:
              "Minimalist audiophile user interface designed with true black backgrounds for OLED contrast and power savings.",
          },
          {
            title: "Local Privacy Architecture",
            description:
              "Zero user accounts, zero analytics SDKs, zero advertising trackers. Library index stays strictly on-device.",
          },
        ],
      },
      {
        type: "fixes",
        label: "Compatibility & Fixes",
        items: [
          {
            title: "Micro-USB OTG Enumeration",
            description:
              "Stabilized USB Host endpoint detection on legacy Android 8.0 through 10 devices with Micro-USB ports.",
          },
          {
            title: "Non-Standard ID3v2 Artwork Parsing",
            description:
              "Fixed embedded album artwork extraction for FLAC and MP3 files containing non-standard ID3v2.4 frame headers.",
          },
        ],
      },
    ],
  },
];

export function getRelease(version: string): Release | undefined {
  return releases.find((r) => r.version === version);
}

export function getReleaseBadgeClass(type: string): string {
  switch (type) {
    case "engine":
      return "bg-gold/15 text-gold border-gold/30";
    case "features":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "improvements":
      return "bg-sky-500/15 text-sky-400 border-sky-500/30";
    case "fixes":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    default:
      return "bg-white/10 text-text-secondary border-border-subtle";
  }
}
