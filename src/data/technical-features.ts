export type FeatureCategory =
  | "engine"
  | "dsp"
  | "hardware"
  | "ai"
  | "streaming"
  | "media";

export interface CategoryInfo {
  id: FeatureCategory;
  name: string;
  description: string;
}

export const technicalCategories: CategoryInfo[] = [
  {
    "id": "engine",
    "name": "Core engine",
    "description": "Direct USB output, precise processing and one switch for untouched sound."
  },
  {
    "id": "dsp",
    "name": "Sound processing",
    "description": "EQ, room and headphone correction, tube-style colour and exact volume steps."
  },
  {
    "id": "hardware",
    "name": "Hardware & outputs",
    "description": "Direct output to USB DACs, digital audio players and the phone's own port, if supported."
  },
  {
    "id": "ai",
    "name": "On-device AI",
    "description": "Rebuilds the top octave on your phone. Separates vocals from instruments."
  },
  {
    "id": "streaming",
    "name": "Streaming & network",
    "description": "High-resolution casting, receiver modes and plugins."
  },
  {
    "id": "media",
    "name": "Formats, radio & interface",
    "description": "15 file formats, internet radio, a dark theme and Android Auto."
  }
];

export interface TechnicalFeature {
  number: number;
  id: string;
  title: string;
  category: FeatureCategory;
  categoryLabel: string;
  summary: string;
  description: string;
  audiophileBenefit: string;
  specs: { label: string; value: string }[];
  badge?: string;
  sdkUrl?: string;
  /**
   * The app captures its page shows, keys of `src/data/screens.ts`, in band
   * order: the opening band, "How it works", "What you hear". The third falls
   * back to the first when absent.
   */
  screens?: [opening: string, howItWorks: string, whatYouHear?: string];
}

export const technicalFeatures: TechnicalFeature[] = [
  {
    "number": 1,
    "id": "direct-sound-path",
    "screens": ["signal-clean", "output", "track-info"],
    "title": "Direct sound path",
    "category": "engine",
    "categoryLabel": "Core engine",
    "summary": "Bit-perfect audio to your USB DAC. Bypasses the system mixer.",
    "description": "Standard system mixers resample audio to 48 kHz on many devices. Bitperfect Player sends files straight to your USB DAC instead. PCM and DSD play at their original rate and depth, if your DAC supports them.",
    "audiophileBenefit": "You hear your files untouched, with no unwanted resampling or dither.",
    "specs": [
      {
        "label": "Mixer bypass",
        "value": "Direct to your DAC"
      },
      {
        "label": "Sample rates",
        "value": "Up to 768 kHz, if your DAC supports it"
      },
      {
        "label": "Signal verification",
        "value": "Live Bit-perfect badge"
      }
    ],
    "badge": "Core architecture"
  },
  {
    "number": 2,
    "id": "audio-pipeline-precision",
    "screens": ["playback", "dsp", "signal-path"],
    "title": "32-bit and 64-bit processing",
    "category": "engine",
    "categoryLabel": "Core engine",
    "summary": "Switch internal processing between 32-bit and 64-bit floating point.",
    "description": "32-bit float is the efficient default and uses less battery. 64-bit float delivers the lowest quantisation error across sound processing and volume. Native DSD passes directly to the DAC without float processing.",
    "audiophileBenefit": "Preserves maximum dynamic range and avoids quantisation error during sound processing.",
    "specs": [
      {
        "label": "Precision options",
        "value": "32-bit and 64-bit float"
      },
      {
        "label": "Default mode",
        "value": "32-bit float (lower battery use)"
      },
      {
        "label": "Studio mode",
        "value": "64-bit float (lowest rounding noise)"
      }
    ]
  },
  {
    "number": 3,
    "id": "uac-usb-drivers",
    "screens": ["output", "track-info", "now-playing"],
    "title": "UAC1 and UAC2 USB DAC support",
    "category": "engine",
    "categoryLabel": "Core engine",
    "summary": "Dedicated USB Audio Class 1 and 2 communication for your DAC.",
    "description": "Replaces standard Android USB audio once permitted. The app reads your DAC capabilities and matches each track rate. Compatible with UAC1 and UAC2 hardware.",
    "audiophileBenefit": "Each track plays at its native rate, up to 768 kHz, when supported by your DAC.",
    "specs": [
      {
        "label": "Protocols",
        "value": "UAC1 and UAC2"
      },
      {
        "label": "Rate switching",
        "value": "Automatic per track"
      },
      {
        "label": "DAC communication",
        "value": "Direct hardware access"
      }
    ],
    "badge": "Direct USB"
  },
  {
    "number": 4,
    "id": "symphony-rust-engine",
    "screens": ["tracks", "track-info", "album"],
    "title": "One engine for all formats",
    "category": "engine",
    "categoryLabel": "Core engine",
    "summary": "Decodes 15 formats in one engine. No conversion needed.",
    "description": "Plays FLAC, ALAC, WAV, DSD and archival formats directly. Every file plays without prior conversion.",
    "audiophileBenefit": "Smooth, stutter-free playback across all lossless and DSD formats.",
    "specs": [
      {
        "label": "Format coverage",
        "value": "Lossless, lossy and DSD"
      },
      {
        "label": "Architecture",
        "value": "Unified audio engine"
      },
      {
        "label": "Archival codecs",
        "value": "Monkey's Audio, WavPack, TAK, True Audio"
      }
    ],
    "badge": "Playback engine"
  },
  {
    "number": 5,
    "id": "high-refresh-ui",
    "screens": ["library", "tracks", "now-playing-hero"],
    "title": "Smooth scrolling on high-refresh screens",
    "category": "media",
    "categoryLabel": "Formats, radio & interface",
    "summary": "Library and player screens scroll smoothly at your display's full refresh rate.",
    "description": "The interface adapts to 60 Hz, 90 Hz and 120 Hz screens automatically. Fast scrolling through large music libraries stays fluid. Screen animations never interrupt audio playback.",
    "audiophileBenefit": "Browse tens of thousands of tracks with zero audio stutter or dropouts.",
    "specs": [
      {
        "label": "Display support",
        "value": "60 Hz, 90 Hz and 120 Hz"
      },
      {
        "label": "Audio isolation",
        "value": "Screen updates never interrupt audio"
      },
      {
        "label": "Visual style",
        "value": "Near-black dark theme"
      }
    ]
  },
  {
    "number": 6,
    "id": "bitperfect-lock",
    "screens": ["playback", "signal-clean", "now-playing"],
    "title": "Bit-perfect lock",
    "category": "engine",
    "categoryLabel": "Core engine",
    "summary": "One switch disables sound processing and software volume.",
    "description": "Disables EQ, crossfeed, upsampling and volume attenuation in one tap. Volume moves to your DAC hardware control. If your DAC lacks hardware volume, output stays fixed at 0 dBFS line level. Use an external amplifier with volume control. Turn off the lock or use alternative volume if connecting sensitive headphones directly.",
    "audiophileBenefit": "Guarantees unaltered sample delivery. If your DAC lacks the rate, the badge shows Resampled.",
    "specs": [
      {
        "label": "Locked controls",
        "value": "EQ, sound processing, volume and AI Enhancer"
      },
      {
        "label": "Volume routing",
        "value": "Hardware DAC control or 0 dBFS fixed line level"
      },
      {
        "label": "Signal honesty",
        "value": "Badge shows Resampled if rate differs"
      }
    ],
    "badge": "Purist essential"
  },
  {
    "number": 7,
    "id": "pcm-to-dsd-converter",
    "screens": ["playback", "signal-path", "track-info"],
    "title": "Real-time PCM to DSD conversion",
    "category": "dsp",
    "categoryLabel": "Sound processing",
    "summary": "Converts PCM files to 1-bit DSD in real time as tracks play.",
    "description": "Transforms PCM audio into 1-bit Direct Stream Digital using noise-shaping modulators. Supports DoP up to DSD256 and Native DSD up to DSD512. Real-time conversion to high rates requires a flagship processor.",
    "audiophileBenefit": "Sends native 1-bit pulse streams to delta-sigma DACs that sound best on DSD.",
    "specs": [
      {
        "label": "Target rates",
        "value": "DSD64, DSD128, DSD256, DSD512"
      },
      {
        "label": "Transport",
        "value": "DoP up to DSD256, Native DSD up to DSD512"
      },
      {
        "label": "Modulator",
        "value": "3rd, 4th and 7th-order delta-sigma"
      }
    ]
  },
  {
    "number": 8,
    "id": "audiophile-src-resamplers",
    "screens": ["playback", "signal-path", "dsp"],
    "title": "Six sample rate converters",
    "category": "dsp",
    "categoryLabel": "Sound processing",
    "summary": "Choose from six sample rate converters, from low-power to studio reference.",
    "description": "Includes Half-band, FFT polyphase, Sinc-256 light, Sinc-256, Sinc-512 and 1024-tap studio reference filters. Choose linear phase or minimum phase independently. Active only when output rates differ from the source file.",
    "audiophileBenefit": "Eliminates pre-ringing or preserves phase accuracy to match your DAC's acoustic response.",
    "specs": [
      {
        "label": "Converter options",
        "value": "6 selectable algorithms"
      },
      {
        "label": "Phase control",
        "value": "Linear phase or minimum phase"
      },
      {
        "label": "Peak precision",
        "value": "1024-tap studio reference filter"
      }
    ]
  },
  {
    "number": 9,
    "id": "dyadic-lossless-volume",
    "screens": ["playback", "signal-clean", "now-playing"],
    "title": "Dyadic bit-exact volume steps",
    "category": "dsp",
    "categoryLabel": "Sound processing",
    "summary": "Volume steps that lose zero bits when output depth exceeds file depth.",
    "description": "Off by default. Applies mathematical dyadic step attenuation using pure bit shifts without roundoff error. Provides 85 exact steps for 16-bit files at 32-bit output. Provides 20 exact steps for 24-bit files at 32-bit output.",
    "audiophileBenefit": "Attenuates volume with zero bit-depth truncation and zero added dither noise.",
    "specs": [
      {
        "label": "16-bit to 32-bit",
        "value": "85 bit-exact steps"
      },
      {
        "label": "24-bit to 32-bit",
        "value": "20 bit-exact steps"
      },
      {
        "label": "Dither policy",
        "value": "Zero dither needed for exact steps"
      }
    ],
    "badge": "Mathematical precision"
  },
  {
    "number": 10,
    "id": "gapless-playback",
    "screens": ["now-playing", "tracks", "album"],
    "title": "Gapless playback",
    "category": "dsp",
    "categoryLabel": "Sound processing",
    "summary": "Continuous playback with zero silence or pauses between tracks.",
    "description": "Pre-loads and decodes upcoming audio before the active track finishes. Trims encoder delay and padding samples from lossy and lossless files automatically. Track transitions happen with sample-accurate timing.",
    "audiophileBenefit": "Classical movements, live recordings and concept albums play without unwanted gaps.",
    "specs": [
      {
        "label": "Handoff timing",
        "value": "Sample-accurate transition"
      },
      {
        "label": "Padding removal",
        "value": "Trims encoder delay automatically"
      },
      {
        "label": "Queue preparation",
        "value": "Continuous background audio loading"
      }
    ]
  },
  {
    "number": 11,
    "id": "full-ram-playback",
    "screens": ["playback", "track-info", "now-playing"],
    "title": "Full RAM playback",
    "category": "dsp",
    "categoryLabel": "Sound processing",
    "summary": "Loads tracks into memory before playback so storage stays idle.",
    "description": "Whole file read-ahead loads tracks into memory based on available system RAM. This prevents Android from stopping playback under memory pressure. Larger files like DSD disc images use continuous streaming prefetch without gaps.",
    "audiophileBenefit": "Keeps storage idle during playback for cached tracks, with smooth streaming for larger files.",
    "specs": [
      {
        "label": "Storage activity",
        "value": "Zero disk reads during playback for cached files"
      },
      {
        "label": "Memory allocation",
        "value": "Dynamic allocation based on available RAM"
      },
      {
        "label": "Large file playback",
        "value": "Continuous streaming prefetch without gaps"
      },
      {
        "label": "Read-ahead modes",
        "value": "Auto, Short, Long, Whole file"
      }
    ]
  },
  {
    "number": 12,
    "id": "eq-and-studio",
    "screens": ["eq", "eq-filters", "eq-presets"],
    "title": "EQ and sound processing",
    "category": "dsp",
    "categoryLabel": "Sound processing",
    "summary": "Four EQ modes: tone sliders, 10-band graphic EQ, 32-band parametric EQ, and AutoEQ.",
    "description": "Tone sliders adjust sound up to 6 dB. Graphic EQ offers 10 bands. Parametric mode provides up to 32 bands in seven filter shapes, with Q from 0.10 to 10.0. AutoEQ downloads headphone profiles.",
    "audiophileBenefit": "Corrects headphone frequency response and room acoustics with surgical precision.",
    "specs": [
      {
        "label": "Parametric bands",
        "value": "Up to 32 bands, -12 to +12 dB"
      },
      {
        "label": "Filter shapes",
        "value": "7 types, Q from 0.10 to 10.0"
      },
      {
        "label": "Headphone profiles",
        "value": "5,000+ AutoEQ profiles"
      }
    ],
    "badge": "Equaliser suite"
  },
  {
    "number": 13,
    "id": "harmonic-tuning",
    "screens": ["dsp", "dsp-sheet", "fidelity"],
    "title": "Harmonic tuning",
    "category": "dsp",
    "categoryLabel": "Sound processing",
    "summary": "Eight tube-style voicings, from warm single-ended triode to punchy push-pull.",
    "description": "Eight voicings inspired by classic vacuum tubes, including 300B, KT88, EL34 and 12AX7 profiles. Adds controlled second through eighth-order harmonics to digital audio. An adjustable drive control dials in the exact colour you want.",
    "audiophileBenefit": "Adds tube-style harmonic colour to your music, by choice.",
    "specs": [
      {
        "label": "Tube voicings",
        "value": "8 profiles including 300B and KT88"
      },
      {
        "label": "Harmonic spectrum",
        "value": "Controlled 2nd to 8th harmonics"
      },
      {
        "label": "Customisation",
        "value": "Drive level and per-harmonic faders"
      }
    ]
  },
  {
    "number": 14,
    "id": "audiophile-upsampler",
    "screens": ["dsp", "signal-path", "track-info"],
    "title": "Audiophile upsampler up to 8x",
    "category": "dsp",
    "categoryLabel": "Sound processing",
    "summary": "Upsamples audio by 2x, 4x or 8x with a selectable ceiling.",
    "description": "Multiplies incoming sample rates by 2x, 4x or 8x using linear or minimum phase filters. 44.1 kHz and 48 kHz tracks reach 352.8 kHz or 384 kHz. Choose a ceiling of 96, 192 or 384 kHz. Output never exceeds your DAC's maximum rate.",
    "audiophileBenefit": "Pushes digital reconstruction filter imaging artefacts far beyond the audible frequency spectrum.",
    "specs": [
      {
        "label": "Rate multipliers",
        "value": "2x, 4x or 8x"
      },
      {
        "label": "Output ceiling",
        "value": "96, 192 or 384 kHz"
      },
      {
        "label": "Hardware limit",
        "value": "Capped by your DAC's maximum rate"
      }
    ]
  },
  {
    "number": 15,
    "id": "acoustic-crossfeed",
    "screens": ["dsp-sheet", "dsp", "now-playing"],
    "title": "Acoustic crossfeed",
    "category": "dsp",
    "categoryLabel": "Sound processing",
    "summary": "Simulates natural loudspeaker stereo imaging on headphones to reduce fatigue.",
    "description": "Mixes a frequency-filtered, delayed share of each channel into the opposite ear. Emulates natural acoustic speaker listening. Three presets follow Meier, Chu Moy and BS2B models. Softens harsh hard-panned stereo recordings on headphones.",
    "audiophileBenefit": "Transforms extreme left-right headphone separation into a fatigue-free forward soundstage.",
    "specs": [
      {
        "label": "Circuit models",
        "value": "Meier, Chu Moy and BS2B"
      },
      {
        "label": "Preset levels",
        "value": "Subtle, Natural and Strong"
      },
      {
        "label": "Application",
        "value": "Stereo audio on headphones"
      }
    ]
  },
  {
    "number": 16,
    "id": "convolution-engine",
    "screens": ["dsp-sheet", "dsp", "fidelity"],
    "title": "Convolution engine",
    "category": "dsp",
    "categoryLabel": "Sound processing",
    "summary": "Applies custom impulse-response WAV files for headphone and room acoustic correction.",
    "description": "Loads standard FIR impulse-response WAV files directly from your device storage. Supports mono, stereo and true-stereo correction filters. Short filters run with zero latency. Longer room-correction filters run with partitioned efficiency.",
    "audiophileBenefit": "Applies laboratory-grade acoustic correction filters to achieve reference headphone or room frequency response.",
    "specs": [
      {
        "label": "Filter formats",
        "value": "WAV FIR impulse responses (PCM)"
      },
      {
        "label": "Zero latency",
        "value": "Filters up to 512 taps"
      },
      {
        "label": "Filter capacity",
        "value": "Up to 131,072 taps per channel"
      }
    ]
  },
  {
    "number": 17,
    "id": "native-direct-output",
    "screens": ["output", "signal-path", "signal-clean"],
    "title": "Native direct output",
    "category": "hardware",
    "categoryLabel": "Hardware & outputs",
    "summary": "Direct hardware audio path to internal DACs and headphone jacks on supported devices.",
    "description": "Routes audio directly to integrated DAC chips on supported phones. Availability depends on your phone's internal DAC chip and OS firmware. An external USB DAC is recommended for guaranteed bit-perfect output across all devices. It is off by default and yields when you connect a USB DAC.",
    "audiophileBenefit": "Enables direct playback from internal headphone ports on supported hardware.",
    "specs": [
      {
        "label": "Routing",
        "value": "Direct internal hardware path"
      },
      {
        "label": "Compatibility",
        "value": "Depends on DAC chip and OS firmware"
      },
      {
        "label": "Recommended setup",
        "value": "External USB DAC for guaranteed bit-perfect sound"
      },
      {
        "label": "Priority",
        "value": "Yields automatically to USB DACs"
      }
    ]
  },
  {
    "number": 18,
    "id": "multichannel-downmix",
    "screens": ["dsp", "track-info", "signal-path"],
    "title": "Multichannel downmix",
    "category": "dsp",
    "categoryLabel": "Sound processing",
    "summary": "Mixes 3.0 to 7.1 surround sound down to stereo with standard speaker balancing.",
    "description": "Mixes 3.0 to 7.1 surround sound down to stereo with standard speaker balancing. Choose full level with clip protection, or a fixed 7.6 dB cut for 5.1.",
    "audiophileBenefit": "Listen to surround DSD disc images on stereo headphones without losing the centre channel.",
    "specs": [
      {
        "label": "Source layouts",
        "value": "3.0 to 7.1 surround channels"
      },
      {
        "label": "Overload protection",
        "value": "True-peak limiter or fixed gain cut"
      },
      {
        "label": "Supported media",
        "value": "Multichannel rips and DSD disc images"
      }
    ]
  },
  {
    "number": 19,
    "id": "dap-direct-playback",
    "screens": ["output", "signal-clean", "now-playing"],
    "title": "DAP direct playback",
    "category": "hardware",
    "categoryLabel": "Hardware & outputs",
    "summary": "Direct bit-perfect output for supported digital audio players.",
    "description": "Integrates with audio architectures on HiBy, iBasso, Astell&Kern and other Android DAPs. Bypasses standard system resampling. The portable player manages analogue volume and gain stages directly.",
    "audiophileBenefit": "Drives balanced 4.4 mm and 2.5 mm outputs with bit-perfect sound and zero external adapters.",
    "specs": [
      {
        "label": "Supported brands",
        "value": "HiBy, iBasso, Astell&Kern and other Android DAPs"
      },
      {
        "label": "Output routing",
        "value": "Dedicated hardware direct path"
      },
      {
        "label": "Volume control",
        "value": "Player hardware volume control"
      }
    ],
    "badge": "Portable players"
  },
  {
    "number": 20,
    "id": "themes-and-palettes",
    "screens": ["now-playing-hero", "library", "eq-sculptor"],
    "title": "Dark theme and accent colours",
    "category": "media",
    "categoryLabel": "Formats, radio & interface",
    "summary": "Dark interface with eleven accent colours designed for low-light listening.",
    "description": "A clean dark theme built on deep charcoal backgrounds. Eleven selectable accent colours include champagne gold, cobalt, teal, amber and rose. High-contrast typography ensures readability in dim listening rooms.",
    "audiophileBenefit": "A calm, dark screen that minimises glare during late-night listening sessions.",
    "specs": [
      {
        "label": "Accent colours",
        "value": "11 presets, gold by default"
      },
      {
        "label": "Background",
        "value": "OLED-friendly dark graphite"
      },
      {
        "label": "Typography",
        "value": "Distraction-free high contrast"
      }
    ]
  },
  {
    "number": 21,
    "id": "on-device-ai",
    "screens": ["ai", "ai-enhancer", "ai-karaoke"],
    "title": "On-device AI: Enhancer, Karaoke, Similar Tracks",
    "category": "ai",
    "categoryLabel": "On-device AI",
    "summary": "Rebuilds high frequencies, isolates vocals and finds similar tracks on your phone.",
    "description": "Models download once, then run on your phone. AI Enhancer reconstructs harmonic detail between 14 and 22 kHz on 44.1 and 48 kHz tracks. AI Karaoke isolates vocals on 44.1 kHz-family files. Sonic Scan finds similar tracks.",
    "audiophileBenefit": "Restores compressed tracks offline. Full model runs on a neural chip; Lite mode runs on other phones. The badge shows Enhanced while active.",
    "specs": [
      {
        "label": "Compute",
        "value": "Neural chip, with Lite mode on CPU"
      },
      {
        "label": "Enhancer scope",
        "value": "44.1 and 48 kHz tracks only"
      },
      {
        "label": "Privacy",
        "value": "Zero cloud uploads, 100% on device"
      }
    ],
    "badge": "On-device neural"
  },
  {
    "number": 22,
    "id": "plugin-system-sdk",
    "screens": ["sources", "library", "tracks"],
    "title": "Plugin system and public SDK",
    "category": "streaming",
    "categoryLabel": "Streaming & network",
    "summary": "Expand your player with optional add-on apps using a public SDK.",
    "description": "Plugins run as separate standalone apps. The player verifies cryptographic signatures before allowing connection. Developers can build new audio sources, catalogue views, metadata providers and custom sound processing modules.",
    "audiophileBenefit": "Keep your player core lean while expanding sources and sound processing when needed.",
    "specs": [
      {
        "label": "Architecture",
        "value": "Cryptographically signed Android apps"
      },
      {
        "label": "Capabilities",
        "value": "Audio sources, metadata and sound processing"
      },
      {
        "label": "Public SDK",
        "value": "Open developer repository on GitHub"
      }
    ],
    "sdkUrl": "https://github.com/STUkh/bitperfect-player-plugin-SDK",
    "badge": "Optional add-ons"
  },
  {
    "number": 23,
    "id": "universal-casting",
    "screens": ["cast", "cast-sheet", "signal-path"],
    "title": "Casting to speakers and TVs",
    "category": "streaming",
    "categoryLabel": "Streaming & network",
    "summary": "Stream music to DLNA/UPnP and cast-enabled speakers and TVs.",
    "description": "Streams local music over your Wi-Fi network. Files play unchanged when supported by your receiving device, up to 24-bit and 96 kHz.",
    "audiophileBenefit": "Enjoy your lossless library on living room speakers without quality loss.",
    "specs": [
      {
        "label": "Protocols",
        "value": "DLNA/UPnP and cast-enabled devices"
      },
      {
        "label": "Cast ceiling",
        "value": "Up to 24-bit / 96 kHz"
      },
      {
        "label": "Stream honesty",
        "value": "Badge indicates when stream is converted"
      }
    ]
  },
  {
    "number": 24,
    "id": "receiver-mode",
    "screens": ["receiver", "cast", "signal-path"],
    "title": "Receiver mode: network player",
    "category": "hardware",
    "categoryLabel": "Hardware & outputs",
    "summary": "Turns your phone or portable player into a network receiver.",
    "description": "Acts as a DLNA/UPnP renderer up to 384 kHz, or a network player for music servers up to 768 kHz. Supported sample rates depend on your DAC.",
    "audiophileBenefit": "Turns your device into a dedicated network streamer for your hi-fi system.",
    "specs": [
      {
        "label": "Receiver modes",
        "value": "DLNA/UPnP and music server player"
      },
      {
        "label": "Volume lock",
        "value": "Remote volume locked with Bit-perfect lock"
      },
      {
        "label": "Top sample rate",
        "value": "Up to 768 kHz, if your DAC supports it"
      }
    ],
    "badge": "Network receiver"
  },
  {
    "number": 25,
    "id": "comprehensive-audio-formats",
    "screens": ["tracks", "track-info", "album"],
    "title": "15 audio formats",
    "category": "media",
    "categoryLabel": "Formats, radio & interface",
    "summary": "Plays 15 formats directly, including FLAC, ALAC, DSD and archival rips.",
    "description": "Plays 15 formats directly. Lossless formats include FLAC, ALAC, WAV, AIFF and DSD disc images. Archival and lossy formats include Monkey's Audio, WavPack, TAK, Opus and MP3. Multichannel rips in standard layouts play too.",
    "audiophileBenefit": "Plays your entire lossless and archival music collection natively without converting a single file.",
    "specs": [
      {
        "label": "Lossless formats",
        "value": "FLAC, ALAC, WAV, AIFF"
      },
      {
        "label": "1-bit DSD",
        "value": "DSF, DFF and DSD disc images"
      },
      {
        "label": "Archival codecs",
        "value": "Monkey's Audio, WavPack, TAK, True Audio, Musepack"
      }
    ]
  },
  {
    "number": 26,
    "id": "android-auto-integration",
    "screens": ["library", "album", "now-playing-hero"],
    "title": "Android Auto integration",
    "category": "media",
    "categoryLabel": "Formats, radio & interface",
    "summary": "Your local library, favourites and radio streams on your car dashboard.",
    "description": "Browse Recent tracks, Favourites, Playlists, Albums, Artists and Radio from your car touchscreen. Search your library directly from the dashboard. Steering wheel buttons control playback and track skipping.",
    "audiophileBenefit": "Enjoy your local lossless library on the road with clear, distraction-free vehicle controls.",
    "specs": [
      {
        "label": "Platform",
        "value": "Native Android Auto media interface"
      },
      {
        "label": "Vehicle controls",
        "value": "Touchscreen, rotary dial and steering wheel keys"
      },
      {
        "label": "Library access",
        "value": "Albums, artists, playlists, favourites and radio"
      }
    ]
  },
  {
    "number": 27,
    "id": "internet-radio",
    "screens": ["sources", "library", "now-playing"],
    "title": "Internet radio search",
    "category": "media",
    "categoryLabel": "Formats, radio & interface",
    "summary": "Search global online radio stations. Filter by codec and stream bitrate.",
    "description": "Search community stations by audio codec (MP3, AAC or FLAC) and minimum bitrate. Custom stream URLs paste directly into the player. Organise favourite stations in folders. Real-time song titles and bitrates display during playback.",
    "audiophileBenefit": "Listen to lossless FLAC broadcasts and high-bitrate radio stations alongside your local music library.",
    "specs": [
      {
        "label": "Station directory",
        "value": "Community directory searched in real time"
      },
      {
        "label": "Stream codecs",
        "value": "FLAC, AAC and MP3"
      },
      {
        "label": "Metadata display",
        "value": "Live track titles and stream bitrate"
      }
    ]
  }
];
