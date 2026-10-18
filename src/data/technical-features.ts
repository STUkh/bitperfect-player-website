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
    id: "engine",
    name: "Engine & Architecture",
    description:
      "Low-latency drivers, deterministic memory execution, and pure hardware transports.",
  },
  {
    id: "dsp",
    name: "Acoustic Processing & DSP",
    description:
      "Mathematical precision, impulse convolutions, tube emulation, and lossless volume controls.",
  },
  {
    id: "hardware",
    name: "Hardware & Output Paths",
    description:
      "Dedicated HAL bypasses, custom DAP hardware integration, and bit-exact converters.",
  },
  {
    id: "ai",
    name: "On-Device Neural Processing",
    description:
      "Zero-cloud neural audio restoration, harmonic expansion, and vocal isolation.",
  },
  {
    id: "streaming",
    name: "Streaming & Network Ecosystem",
    description:
      "High-resolution casting, endpoint receiver modes, and plugin architecture.",
  },
  {
    id: "media",
    name: "Formats, Radio & Interface",
    description:
      "Wide format decoding, pure black OLED interfaces, and vehicle integration.",
  },
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
}

export const technicalFeatures: TechnicalFeature[] = [
  {
    number: 1,
    id: "direct-sound-path",
    title: "Maximum Direct Sound Path",
    category: "engine",
    categoryLabel: "Engine & Architecture",
    summary:
      "Pure bit-perfect delivery that bypasses the Android OS audio mixer completely.",
    description:
      "Android routes audio through AudioFlinger, forcing 48 kHz resampling and software dither. Our USB driver talks directly to the DAC for bit-identical PCM and DSD playback.",
    audiophileBenefit:
      "Eliminates forced OS sample-rate conversion, digital clipping, and dynamic range compression.",
    specs: [
      { label: "OS Mixer Bypass", value: "100% User-Space" },
      { label: "Sample Rates", value: "44.1 kHz to 768 kHz" },
      {
        label: "Signal Verification",
        value: "Live Bit-Perfect Status Indicator",
      },
    ],
    badge: "Core Architecture",
  },
  {
    number: 2,
    id: "audio-pipeline-precision",
    title: "32-Bit & 64-Bit Audio Processing Pipeline",
    category: "engine",
    categoryLabel: "Engine & Architecture",
    summary:
      "Native dual-precision internal audio pipeline with switchable float precision.",
    description:
      "Processes internal audio math in switchable 32-bit or 64-bit IEEE 754 floating point, delivering over 300 dB of headroom across multi-stage filter chains.",
    audiophileBenefit:
      "Applies EQ, tone controls, and volume changes without rounding errors or truncation distortion.",
    specs: [
      { label: "Math Precision", value: "32-bit / 64-bit Float" },
      { label: "Internal Headroom", value: "> 300 dB dynamic range" },
      { label: "Quantization Noise", value: "Below -190 dBFS floor" },
    ],
  },
  {
    number: 3,
    id: "uac-usb-drivers",
    title: "Custom UAC1 & UAC2 USB Drivers",
    category: "engine",
    categoryLabel: "Engine & Architecture",
    summary:
      "Proprietary asynchronous USB Audio Class 1 and 2 user-space drivers.",
    description:
      "Replaces generic Android ALSA USB bindings with custom user-space USB Audio Class 1 and 2 drivers using asynchronous isochronous feedback endpoints.",
    audiophileBenefit:
      "Works reliably with vintage UAC1 DACs and modern UAC2 converters up to 768 kHz and DSD512.",
    specs: [
      { label: "Supported Protocols", value: "UAC 1.0 & UAC 2.0" },
      { label: "Endpoint Mode", value: "Asynchronous Isochronous" },
      { label: "Driver Space", value: "Dedicated User-Space Stack" },
    ],
    badge: "Proprietary Driver",
  },
  {
    number: 4,
    id: "symphony-rust-engine",
    title: "Symphony Engine in Rust & Symphonia",
    category: "engine",
    categoryLabel: "Engine & Architecture",
    summary:
      "High-performance audio engine written in Rust with NEON and SIMD vector acceleration.",
    description:
      "Built in Rust with Symphonia for memory-safe, zero-allocation decoding. Processes audio blocks via ARM NEON SIMD instructions for deterministic timing and low power draw.",
    audiophileBenefit:
      "Prevents buffer underruns and frame drops even under heavy background system load.",
    specs: [
      { label: "Implementation", value: "Rust + Symphonia Core" },
      { label: "Vectorization", value: "ARM NEON SIMD Accelerated" },
      { label: "Allocation Policy", value: "Zero-Allocation Playback Loop" },
    ],
    badge: "Rust Engine",
  },
  {
    number: 5,
    id: "high-refresh-ui",
    title: "60/120 FPS High-Refresh UI Experience",
    category: "media",
    categoryLabel: "Formats, Radio & Interface",
    summary:
      "Silky smooth interface rendering synchronized with 60 Hz, 90 Hz, and 120 Hz displays.",
    description:
      "Decouples UI rendering from audio threads using hardware GPU layer promotion and frame-budgeted updates for 60 Hz, 90 Hz, and 120 Hz screens.",
    audiophileBenefit:
      "Scroll through large music libraries smoothly without stutter or audio playback dropouts.",
    specs: [
      { label: "Display Sync", value: "60 Hz / 90 Hz / 120 Hz" },
      {
        label: "Thread Isolation",
        value: "Dedicated Audio / Render Separation",
      },
      { label: "GPU Compositing", value: "Hardware Layer Isolation" },
    ],
  },
  {
    number: 6,
    id: "bitperfect-lock",
    title: "Bitperfect Lock",
    category: "engine",
    categoryLabel: "Engine & Architecture",
    summary:
      "One-touch hardware lockout preventing any software DSP or volume modification.",
    description:
      "Locks and bypasses all software volume sliders, parametric EQ bands, crossfeed, and resamplers in one tap. Volume control delegates strictly to DAC hardware.",
    audiophileBenefit:
      "Ensures accidental screen touches never alter a single bit of your audio stream.",
    specs: [
      { label: "Lock Target", value: "Volume, EQ, DSP, Resampling" },
      { label: "Volume Control", value: "Delegated to DAC Hardware" },
      { label: "Activation", value: "One-Touch Purist Toggle" },
    ],
    badge: "Purist Essential",
  },
  {
    number: 7,
    id: "pcm-to-dsd-converter",
    title: "Real-Time PCM to DSD Conversion",
    category: "dsp",
    categoryLabel: "Acoustic Processing & DSP",
    summary: "High-efficiency on-the-fly sigma-delta modulation up to DSD512.",
    description:
      "Converts standard PCM recordings into 1-bit Direct Stream Digital streams in real time using a multi-stage noise-shaping delta-sigma modulator. Supports DSD64, DSD128, DSD256, and DSD512 rates via native DSD or DoP.",
    audiophileBenefit:
      "Bypasses internal DAC chip FIR digital filter pre-ringing, yielding a relaxed, analog-like presentation on delta-sigma DACs.",
    specs: [
      { label: "Target Rates", value: "DSD64, DSD128, DSD256, DSD512" },
      { label: "Transport", value: "Native DSD / DoP (DSD over PCM)" },
      { label: "Modulator", value: "Multi-stage Noise-Shaping Sigma-Delta" },
    ],
  },
  {
    number: 8,
    id: "audiophile-src-resamplers",
    title: "6 Audiophile SRC Resampling Algorithms",
    category: "dsp",
    categoryLabel: "Acoustic Processing & DSP",
    summary:
      "Six mastering-grade sample rate converters designed for phase accuracy.",
    description:
      "Offers six selectable sample rate converters: Linear Phase Sinc, Minimum Phase Sinc, Polyphase FIR, Blackman-Harris Sinc, Cubic Spline, and Fast Sinc.",
    audiophileBenefit:
      "Avoids Android OS resampling artifacts and lets you match impulse response to your DAC.",
    specs: [
      { label: "Algorithms", value: "6 Mastering-Grade Converters" },
      {
        label: "Filter Profiles",
        value: "Linear Phase, Minimum Phase, Sinc FIR",
      },
      { label: "Stopband Attenuation", value: "> 140 dB Rejection" },
    ],
  },
  {
    number: 9,
    id: "dyadic-lossless-volume",
    title: "64-Bit Dyadic Lossless Volume Control",
    category: "dsp",
    categoryLabel: "Acoustic Processing & DSP",
    summary:
      "Mathematically exact dyadic bit-shift volume stepping with zero bit truncation.",
    description:
      "Replaces standard lossy float multiplication with exact power-of-two bit-shift scaling, providing 85 lossless steps at 16-bit and 25 lossless steps at 24-bit.",
    audiophileBenefit:
      "Attenuates digital volume with zero bit truncation or dither noise at everyday listening levels.",
    specs: [
      { label: "16-bit Lossless Steps", value: "85 Discrete Steps" },
      { label: "24-bit Lossless Steps", value: "25 Discrete Steps" },
      { label: "Calculation Core", value: "64-bit Dyadic Bit-Shift Math" },
    ],
    badge: "Mathematical Precision",
  },
  {
    number: 10,
    id: "gapless-playback",
    title: "Gapless Playback",
    category: "dsp",
    categoryLabel: "Acoustic Processing & DSP",
    summary:
      "Zero-gap, sample-accurate track transitions with dual pre-buffering.",
    description:
      "Decodes subsequent track headers and pre-buffers audio frames before the current track completes. Audio samples transition across track boundaries without a single dropped, inserted, or padded sample.",
    audiophileBenefit:
      "Seamless continuity for classical movements, live recordings, and continuous concept albums without clicks or gaps.",
    specs: [
      { label: "Transition Accuracy", value: "0 Samples (Exact Boundary)" },
      { label: "Buffering Model", value: "Asynchronous Dual Pre-Buffer" },
      {
        label: "Metadata Handling",
        value: "Reads LAME and container gapless tags",
      },
    ],
  },
  {
    number: 11,
    id: "full-ram-playback",
    title: "Full RAM Playback",
    category: "dsp",
    categoryLabel: "Acoustic Processing & DSP",
    summary:
      "Loads entire audio files directly into system RAM prior to playback.",
    description:
      "Pre-caches the complete decoded audio stream or source file directly into system memory before playback starts. Once loaded, flash storage read cycles and microSD controller activities drop to zero.",
    audiophileBenefit:
      "Eliminates flash storage read jitter, bus contention latency, and electrical RF interference caused by continuous disk access.",
    specs: [
      { label: "Storage Access", value: "Zero disk activity during play" },
      {
        label: "Memory Allocation",
        value: "Dynamic high-throughput RAM cache",
      },
      {
        label: "Battery Impact",
        value: "Reduced SoC flash-bus power consumption",
      },
    ],
  },
  {
    number: 12,
    id: "eq-and-studio",
    title: "EQ & Studio",
    category: "dsp",
    categoryLabel: "Acoustic Processing & DSP",
    summary:
      "Four comprehensive equalizer modes including 32-band Parametric and AutoEQ integration.",
    description:
      "Combines a Studio Target Curve, 10-band Graphic EQ, 32-band Parametric EQ (7 biquad shapes, Q 0.10 to 10.0), and AutoEQ with 4,000+ headphone profiles.",
    audiophileBenefit:
      "Calibrates frequency response to your exact headphone model and listening preferences.",
    specs: [
      { label: "Parametric Bands", value: "Up to 32 Bands per profile" },
      { label: "Filter Shapes", value: "7 Professional Biquad Types" },
      { label: "AutoEQ Integration", value: "4,000+ Headphone Target Curves" },
    ],
    badge: "Studio Suite",
  },
  {
    number: 13,
    id: "harmonic-tuning",
    title: "Harmonic Tuning",
    category: "dsp",
    categoryLabel: "Acoustic Processing & DSP",
    summary:
      "Analog vacuum tube emulation with eight authentic harmonic saturation profiles.",
    description:
      "Models the transfer curves and soft-knee saturation of classic vacuum tubes (300B, KT88, EL34, 12AX7), adding musical 2nd and 4th order harmonics.",
    audiophileBenefit:
      "Adds natural analog warmth and body to analytical solid-state DACs and headphones.",
    specs: [
      { label: "Voicings", value: "8 Authentic Tube Profiles" },
      { label: "Harmonic Structure", value: "Even-Order Dominant (H2/H4)" },
      {
        label: "Clipping Architecture",
        value: "Soft-Knee Polynomial Saturation",
      },
    ],
  },
  {
    number: 14,
    id: "audiophile-upsampler",
    title: "Audiophile Upsampler up to 8x",
    category: "dsp",
    categoryLabel: "Acoustic Processing & DSP",
    summary:
      "Synchronous integer and fractional upsampling up to 8x (768 kHz).",
    description:
      "Upsamples 44.1 kHz and 48 kHz recordings up to 8x (352.8 kHz / 384 kHz / 705.6 kHz / 768 kHz) using high-order interpolation filters with high out-of-band rejection.",
    audiophileBenefit:
      "Moves digital reconstruction filter cutoff far beyond human hearing, minimizing passband ripple and phase smearing.",
    specs: [
      { label: "Multipliers", value: "2x, 4x, 8x Synchronous" },
      { label: "Max Sample Rate", value: "Up to 768 kHz" },
      { label: "Passband Ripple", value: "< 0.0001 dB" },
    ],
  },
  {
    number: 15,
    id: "acoustic-crossfeed",
    title: "Crossfeed",
    category: "dsp",
    categoryLabel: "Acoustic Processing & DSP",
    summary:
      "Natural acoustic room and loudspeaker stereophonic simulation for headphones.",
    description:
      "Blends frequency-shaped, delayed stereo signals across channels using Jan Meier, Chu Moy, and Bauer BS2B acoustic models to fix hard-panned headphone fatigue.",
    audiophileBenefit:
      "Recreates a natural loudspeaker soundstage in headphones for comfortable long-session listening.",
    specs: [
      { label: "Models", value: "Jan Meier, Chu Moy, Bauer BS2B" },
      {
        label: "Interaural Delay",
        value: "Calibrated Head-Related Time Delay",
      },
      { label: "Attenuations", value: "Low, Medium, High & Custom Presets" },
    ],
  },
  {
    number: 16,
    id: "convolution-engine",
    title: "Convolution Engine",
    category: "dsp",
    categoryLabel: "Acoustic Processing & DSP",
    summary:
      "Zero-latency FIR impulse response filter processor for acoustic correction.",
    description:
      "Processes stereo WAV impulse response files (FIR filters) with partitioned zero-latency convolution. Enables exact headphone equalization curves, personalized HRIR spatial models, and room acoustics correction.",
    audiophileBenefit:
      "Applies mastering-grade acoustic correction and binaural room impulse responses with surgical frequency and phase accuracy.",
    specs: [
      { label: "Filter Format", value: "WAV FIR Impulse Responses (PCM)" },
      { label: "Latency Model", value: "Uniformly Partitioned Zero-Latency" },
      { label: "Taps Supported", value: "Up to 131,072 Filter Taps" },
    ],
  },
  {
    number: 17,
    id: "native-direct-output",
    title: "Native Direct Output",
    category: "hardware",
    categoryLabel: "Hardware & Output Paths",
    summary:
      "Direct HAL hardware path bypassing system mixer for internal phone DACs.",
    description:
      "Uses direct Audio HAL routing on the 3.5mm jack, internal ESS Sabre / Cirrus Logic / Qualcomm WCD DACs, and Bluetooth LDAC to bypass AudioFlinger.",
    audiophileBenefit:
      "Delivers cleaner high-resolution output on your phone even without an external USB DAC.",
    specs: [
      { label: "Hardware Routing", value: "Vendor Audio HAL Direct Flag" },
      {
        label: "Supported Chips",
        value: "Qualcomm WCD, Cirrus Logic, ESS Sabre",
      },
      {
        label: "Bluetooth Codecs",
        value: "LDAC / aptX HD Direct Transmission",
      },
    ],
  },
  {
    number: 18,
    id: "multichannel-downmix",
    title: "Multichannel Downmix",
    category: "dsp",
    categoryLabel: "Acoustic Processing & DSP",
    summary:
      "Phase-accurate stereo folding for 5.1 and 7.1 surround audio sources.",
    description:
      "Folds 5.1 and 7.1 surround tracks to stereo using ITU matrix math with center vocal preservation, phase alignment, and 64-bit headroom scaling.",
    audiophileBenefit:
      "Plays multichannel SACD and concert recordings on stereo headphones without clipping or vocal loss.",
    specs: [
      {
        label: "Channel Configurations",
        value: "5.1 and 7.1 Surround to Stereo",
      },
      {
        label: "Phase Handling",
        value: "Phase-Accurate Surround Vector Folding",
      },
      { label: "Clip Prevention", value: "64-bit Headroom Scaling" },
    ],
  },
  {
    number: 19,
    id: "dap-direct-playback",
    title: "DAP Direct Playback",
    category: "hardware",
    categoryLabel: "Hardware & Output Paths",
    summary:
      "Native hardware optimization for audiophile Digital Audio Players.",
    description:
      "Integrates directly with Android DAP hardware from FiiO, iBasso, HiBy, Astell&Kern, Shanling, and Cayin, controlling dual DACs and hardware gain switches.",
    audiophileBenefit:
      "Unlocks native hardware capabilities on dedicated portable players without generic OS limits.",
    specs: [
      {
        label: "Supported Brands",
        value: "FiiO, iBasso, HiBy, Astell&Kern, Shanling",
      },
      {
        label: "DAC Architecture",
        value: "Dual ESS / AKM Chip Synchronization",
      },
      { label: "Gain Control", value: "Hardware Gain Switching" },
    ],
    badge: "Hardware Certified",
  },
  {
    number: 20,
    id: "themes-and-palettes",
    title: "Themes & Color Palettes",
    category: "media",
    categoryLabel: "Formats, Radio & Interface",
    summary:
      "Audiophile visual themes designed for OLED contrast and power efficiency.",
    description:
      "Carefully crafted dark color themes including Graphite, Matte Black, Champagne Gold, Dark Amber, and Monochromatic OLED. Pure black backgrounds turn off display pixels completely on OLED screens.",
    audiophileBenefit:
      "Minimizes display battery consumption and lowers high-frequency RF interference emitted by display panels.",
    specs: [
      {
        label: "Palette Themes",
        value: "Graphite, Matte Black, Champagne Gold, Dark Amber",
      },
      {
        label: "Display Optimization",
        value: "True OLED Black (#000000 / #0D0D0D)",
      },
      {
        label: "Interface Design",
        value: "Understated, High-Legibility Typography",
      },
    ],
  },
  {
    number: 21,
    id: "on-device-ai",
    title: "On-Device AI: Enhancer, Karaoke, Mix",
    category: "ai",
    categoryLabel: "On-Device Neural Processing",
    summary:
      "Real-time neural audio processing with AI Enhancer, AI Karaoke, and AI Sonic Scan.",
    description:
      "Runs neural models 100% on device: AI Enhancer restores compressed harmonics on the NPU, AI Karaoke isolates vocals in real time, and AI Sonic Scan clusters tracks.",
    audiophileBenefit:
      "Delivers real-time neural restoration and stem separation offline with complete data privacy.",
    specs: [
      { label: "Processing Model", value: "100% On-Device Neural Execution" },
      { label: "AI Enhancer", value: "Hardware NPU Acceleration Required" },
      {
        label: "AI Karaoke",
        value: "Real-Time Vocal / Instrumental Isolation",
      },
    ],
    badge: "On-Device Neural",
  },
  {
    number: 22,
    id: "plugin-system-sdk",
    title: "Plugin System & Public SDK",
    category: "streaming",
    categoryLabel: "Streaming & Network Ecosystem",
    summary:
      "Extensible architecture for official and community plugins backed by an open-source SDK.",
    description:
      "Modular audio processing and metadata integration architecture. Developers and audio researchers can build custom DSP modules, specialized format decoders, lyrics providers, and visualization extensions using the open-source SDK.",
    audiophileBenefit:
      "An open, future-proof audio ecosystem that never locks you into proprietary walled-garden formats or closed tools.",
    specs: [
      {
        label: "Public SDK",
        value: "github.com/STUkh/bitperfect-player-plugin-SDK",
      },
      {
        label: "Extension Types",
        value: "Audio DSP, Decoders, Metadata, Visuals",
      },
      { label: "Security Model", value: "Sandboxed Native Execution" },
    ],
    sdkUrl: "https://github.com/STUkh/bitperfect-player-plugin-SDK",
    badge: "Open Ecosystem",
  },
  {
    number: 23,
    id: "universal-casting",
    title: "Universal Casting & Streaming",
    category: "streaming",
    categoryLabel: "Streaming & Network Ecosystem",
    summary:
      "Lossless network casting across Chromecast, AirPlay, DLNA/UPnP, and FCast.",
    description:
      "Streams local audio to network receivers via a custom hi-res Chromecast app, AirPlay / ShAirPlay 2, DLNA/UPnP renderers, and open FCast.",
    audiophileBenefit:
      "Sends lossless music from your phone directly to living room hi-fi systems and streamers.",
    specs: [
      { label: "Protocols", value: "Chromecast, AirPlay 2, DLNA/UPnP, FCast" },
      {
        label: "Chromecast Resolution",
        value: "Custom Hi-Res UI up to 24-bit/96kHz",
      },
      { label: "Stream Integrity", value: "Local Bit-Exact Buffer Feeder" },
    ],
  },
  {
    number: 24,
    id: "receiver-mode",
    title: "Receiver Mode (DLNA & LMS / Roon Endpoint)",
    category: "hardware",
    categoryLabel: "Hardware & Output Paths",
    summary:
      "Turn your Android device into a high-resolution streaming DAC endpoint.",
    description:
      "Turns your Android phone or DAP into a DLNA/UPnP renderer and Logitech Media Server (LMS) / Roon Endpoint outputting up to 24-bit / 192 kHz to a USB DAC.",
    audiophileBenefit:
      "Repurposes any Android device as a silent, bit-perfect network streaming bridge for your stereo rack.",
    specs: [
      { label: "Receiver Modes", value: "DLNA/UPnP Renderer & LMS Endpoint" },
      { label: "Roon Compatibility", value: "Recognized as Roon LMS Endpoint" },
      { label: "Max Endpoint Stream", value: "Up to 24-bit / 192 kHz PCM" },
    ],
    badge: "Roon / LMS Ready",
  },
  {
    number: 25,
    id: "comprehensive-audio-formats",
    title: "Comprehensive Audio Formats",
    category: "media",
    categoryLabel: "Formats, Radio & Interface",
    summary:
      "Decodes every major lossless, uncompressed, and high-resolution audio format.",
    description:
      "Native playback support for FLAC, ALAC, WAV, AIFF, DSD (DSF, DFF, SACD ISO disc images), DCA (lossless multichannel audio), Dolby AC-3 / E-AC-3 playback notes, Monkey’s Audio (APE), WavPack, True Audio (TTA), TAK, Musepack, Opus, and Ogg Vorbis.",
    audiophileBenefit:
      "Plays your entire music collection without needing slow file conversions or secondary media player apps.",
    specs: [
      {
        label: "Lossless Formats",
        value: "FLAC, ALAC, WAV, AIFF, APE, WV, TTA, TAK",
      },
      { label: "DSD Support", value: "DSF, DFF, ISO (DoP & Native DSD)" },
      {
        label: "Multichannel & Cinema",
        value: "DCA, Dolby AC-3 / E-AC-3 compatibility",
      },
    ],
  },
  {
    number: 26,
    id: "android-auto-integration",
    title: "Android Auto Integration",
    category: "media",
    categoryLabel: "Formats, Radio & Interface",
    summary:
      "Full in-vehicle integration designed for distraction-free road listening.",
    description:
      "Provides a native Android Auto dashboard UI with large touch targets, steering wheel controls, voice search, and direct USB or wireless audio output.",
    audiophileBenefit:
      "Browse and play your lossless library safely on the road with clean digital transmission.",
    specs: [
      { label: "Platform Support", value: "Native Android Auto protocol" },
      {
        label: "Controls",
        value: "Dashboard touchscreen & steering wheel keys",
      },
      { label: "Audio Delivery", value: "Direct digital USB / wireless link" },
    ],
  },
  {
    number: 27,
    id: "internet-radio",
    title: "Internet Radio Directory",
    category: "media",
    categoryLabel: "Formats, Radio & Interface",
    summary:
      "Curated international directory with 3,000+ lossless and high-bitrate radio stations.",
    description:
      "Includes a built-in directory of 3,000+ global radio stations with lossless FLAC broadcasts, live track metadata, stream recording, and favorites.",
    audiophileBenefit:
      "Stream lossless FLAC and high-bitrate music stations worldwide without external radio apps.",
    specs: [
      { label: "Station Catalog", value: "3,000+ Curated Global Stations" },
      {
        label: "Lossless Streams",
        value: "Dedicated FLAC lossless broadcast feeds",
      },
      {
        label: "Metadata Tracking",
        value: "Real-time song title and artist display",
      },
    ],
  },
];
