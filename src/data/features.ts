import type { AccentColorKey } from "./colors";

export interface FeatureSpec {
  label: string;
  value: string;
}

export interface FeatureBenefit {
  title: string;
  desc: string;
  icon: string;
}

export interface Feature {
  id: "eq" | "library" | "casting" | "dsp" | "usb-dac" | "ai-enhancer";
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  /**
   * @deprecated The design no longer distinguishes feature routes by hue (DESIGN.md,
   * "One accent, full stop"): routes are told apart by their mark
   * and their content. Every feature therefore resolves to the one brand accent. The
   * field is kept only so pages that read `feature.accent` keep building; new code
   * should read `brandAccent` from `./colors` instead.
   */
  accent: AccentColorKey;
  icon: string;
  description: string;
  overview: string;
  facts: string[];
  specs: FeatureSpec[];
  benefits: FeatureBenefit[];
}

export const features: Feature[] = [
  {
    id: "eq",
    slug: "eq",
    title: "32-Band Parametric EQ",
    tagline: "Shape your sound with 32 bands and 7 filter shapes",
    badge: "Equalizer",
    accent: "gold",
    icon: "eq",
    description:
      "Shape the sound to your ears and your room with up to 32 bands, seven filter shapes, and Q that runs from broad warmth to a pinpoint notch.",
    overview:
      "Bitperfect Player includes a studio-grade 32-band parametric equalizer built for exacting audiophile compensation. Whether flattening a headphone frequency response, correcting room acoustics, or fine-tuning tonal balance, every band is yours to place across 20 Hz to 20 kHz, and the whole curve can be taken out of the path to return the output to bit-perfect.",
    benefits: [
      {
        title: "32 Fully Independent Bands",
        desc: "Configure up to 32 distinct parametric filters across the audible spectrum (20 Hz to 20 kHz), with a gain range of -12 dB to +12 dB and an expanded range of -24 dB to +24 dB.",
        icon: "eq",
      },
      {
        title: "Seven Filter Shapes",
        desc: "Bell, low shelf, high shelf, low pass, high pass, notch and all pass. Four of the seven have no gain control at all: only frequency and Q shape them.",
        icon: "waveform",
      },
      {
        title: "Continuous Q Precision",
        desc: "Scale Q factor continuously from 0.10 (broad tonal warmth) to 10.0 (pinpoint resonance notch).",
        icon: "sparkle",
      },
      {
        title: "Bit-Perfect Lock",
        desc: "Switch the EQ out of the path and the badge returns to Bit-perfect. While a band is active the app says Enhanced, because samples are being altered.",
        icon: "sig-bitperfect",
      },
    ],
    facts: [
      "Up to 32 parametric bands per profile",
      "Seven filter shapes (bell, shelves, passes, notch, all pass)",
      "Q factor scales continuously from 0.10 to 10.0",
      "Gain range -12.0 dB to +12.0 dB, expandable to -24.0 dB to +24.0 dB",
      "Every band placed anywhere across 20 Hz to 20 kHz",
      "One-tap bit-perfect bypass",
    ],
    specs: [
      { label: "EQ Bands", value: "Up to 32, fully independent" },
      { label: "Filter Shapes", value: "7 shapes" },
      { label: "Q Factor Range", value: "0.10 to 10.0" },
      {
        label: "Gain Range",
        value: "-12.0 dB to +12.0 dB (expanded: -24.0 dB to +24.0 dB)",
      },
      { label: "Bypass", value: "One tap back to bit-perfect" },
      { label: "Frequency Span", value: "20 Hz to 20 kHz" },
    ],
  },
  {
    id: "library",
    slug: "library",
    title: "Local Lossless Library",
    tagline: "Eight ways in, indexed entirely on your phone",
    badge: "Local Library",
    accent: "gold",
    icon: "waveform",
    description:
      "Organize your collection across Sources, Recent, Favourites, Playlists, Albums, Artists, Tracks and Genres. Search finds it instantly, and nothing about your library ever leaves the phone.",
    overview:
      "Your music library stays strictly on your device. Bitperfect indexes your local storage and SD card, reading tags and album artwork straight out of the files themselves. No account is required, and search returns results instantly with no network call at all.",
    benefits: [
      {
        title: "Eight Native Navigation Views",
        desc: "Browse across Sources, Recent, Favourites, Playlists, Albums, Artists, Tracks and Genres. Tabs can be reordered or hidden.",
        icon: "node-file",
      },
      {
        title: "Instant Search",
        desc: "Search your whole collection by title, performer or album. It never leaves the phone.",
        icon: "sparkle",
      },
      {
        title: "Accurate Tags and Artwork",
        desc: "Reads tags and artwork straight from the file, even when the extension is wrong.",
        icon: "node-dac",
      },
      {
        title: "100% On-Device Privacy",
        desc: "Your listening habits, library size and track listings never leave the phone.",
        icon: "shield",
      },
    ],
    facts: [
      "Sources, Recent, Favourites, Playlists, Albums, Artists, Tracks, Genres",
      "Browse nested folders exactly as they're stored",
      "Album art downloads and displays automatically, at full resolution",
      "Playlist import: M3U, M3U8, PLS, XSPF, ASX and CUE",
      "The library updates itself when files change on storage",
      "No analytics and no remote lookups while you browse your library",
    ],
    specs: [
      {
        label: "Library Views",
        value: "8, including albums, artists and genres",
      },
      { label: "Search", value: "Instant, entirely on device" },
      {
        label: "Storage Sources",
        value: "Internal storage, MicroSD, USB OTG drives",
      },
      {
        label: "Formats Played",
        value: "15, from FLAC and DSD to DSD disc images and TAK",
      },
      { label: "Playlist Import", value: "M3U, M3U8, PLS, XSPF, ASX, CUE" },
      { label: "Network Use", value: "None, ever" },
    ],
  },
  {
    id: "casting",
    slug: "casting",
    title: "Bi-Directional Network Streaming",
    tagline: "Cast to any speaker on your network, or turn your phone into one",
    badge: "Network Audio",
    accent: "gold",
    icon: "cast",
    description:
      "Cast lossless audio to any player on your network, or turn your phone into a receiver of its own.",
    overview:
      "Bitperfect sends to DLNA and UPnP renderers, cast-enabled speakers and TVs, and FCast targets. It can also work the other way, turning your phone into a receiver with its own library browsing and queue.",
    benefits: [
      {
        title: "Send to Any Speaker on Your Network",
        desc: "Cast to any UPnP or DLNA speaker, media renderer or smart TV on your home network, along with cast-enabled speakers, wireless speakers and FCast.",
        icon: "cast",
      },
      {
        title: "Turn Your Phone Into a Receiver",
        desc: "Your phone can receive audio too, over DLNA, FCast and more, each one switched on independently in Settings.",
        icon: "node-usb",
      },
      {
        title: "Volume Commands Are Declined",
        desc: "In bit-perfect mode there is no volume control in the signal path, so an incoming volume command is declined rather than quietly applied. That refusal is what keeps the stream bit-exact.",
        icon: "node-engine",
      },
      {
        title: "Honest Stream Reporting",
        desc: "The app always says whether a stream went out unchanged or had to be converted, and exactly how.",
        icon: "sig-resampled",
      },
    ],
    facts: [
      "Send to DLNA, UPnP, cast-enabled speakers and TVs, and FCast",
      "Receive over DLNA, FCast and more, each switched on independently",
      "The DLNA path sends the file unchanged: nothing is re-encoded",
      "Every other path tells you exactly what conversion it made",
      "Background streaming continues with the screen locked",
      "One receiver mode adds full library browsing, queues, artwork and stored playlists",
    ],
    specs: [
      {
        label: "Send To",
        value: "DLNA and UPnP, cast-enabled speakers and TVs, FCast",
      },
      {
        label: "Receive As",
        value:
          "A DLNA renderer, an FCast target, an MPD or classic network player",
      },
      { label: "Receiver Ceiling", value: "Up to 384 kHz / 24-bit" },
      {
        label: "Network Discovery",
        value: "Automatic on your local network, no account",
      },
      {
        label: "Volume Control",
        value: "Declined in bit-perfect mode, to stay exact",
      },
      {
        label: "Stream Format",
        value: "Unchanged on DLNA; told exactly when it's not",
      },
    ],
  },
  {
    id: "dsp",
    slug: "dsp",
    title: "Studio-Grade DSP Rack",
    tagline: "Crossfeed, tone shaping and true-peak protection in real time",
    badge: "Studio DSP",
    accent: "gold",
    icon: "sparkle",
    description:
      "Switch out of bit-perfect and into four processing modules: headphone crossfeed, ReplayGain, Harmonic Tuning and true-peak protection.",
    overview:
      "Built for headphone listening, the DSP rack carries four processing modules drawn from professional mastering practice: crossfeed, ReplayGain, Harmonic Tuning and true-peak protection. The rack and the AI Enhancer never run together: turning on the Enhancer switches the rack off, and the app tells you when that happens.",
    benefits: [
      {
        title: "Binaural Headphone Crossfeed",
        desc: "Three strengths, Subtle (Jan Meier style, 650 Hz), Natural (Chu Moy style, 700 Hz) and Strong (BS2B’s full cross-mix), to relax hard-panned stereo without collapsing the image.",
        icon: "node-dac",
      },
      {
        title: "Tag-Driven ReplayGain",
        desc: "Track, album or auto, read from the values already written into your files. Nothing is measured at playback and nothing is squashed.",
        icon: "waveform",
      },
      {
        title: "Harmonic Tuning",
        desc: "Eight tube voicings for colouring the top end to taste. These are voicings, not measurements of specific hardware.",
        icon: "eq",
      },
      {
        title: "True-Peak Protection",
        desc: "Catches the peaks that hide between samples, holding the ceiling at -0.6 dBTP so your DAC never clips on them. It switches itself on whenever another module could push a peak over that line.",
        icon: "shield",
      },
    ],
    facts: [
      "Crossfeed in three strengths: Jan Meier style, Chu Moy style, BS2B full cross-mix",
      "ReplayGain per track, per album or auto, read from file tags",
      "Harmonic Tuning with eight tube voicings",
      "True-peak limiter holds a -0.6 dBTP ceiling to catch inter-sample peaks",
      "Four independent modules, each toggled on its own",
      "The rack switches off automatically while the AI Enhancer is running",
    ],
    specs: [
      {
        label: "DSP Modules",
        value: "Four: crossfeed, gain, tone, peak guard",
      },
      { label: "Crossfeed", value: "Meier, Chu Moy or BS2B" },
      { label: "Loudness", value: "ReplayGain: track, album or auto" },
      { label: "Harmonic Tuning", value: "Eight tube voicings" },
      {
        label: "True-Peak Limiter",
        value: "Catches inter-sample peaks at -0.6 dBTP",
      },
      { label: "With AI Enhancer", value: "Switches off automatically" },
    ],
  },
  {
    id: "usb-dac",
    slug: "usb-dac",
    title: "Direct USB DAC Output",
    tagline: "Exclusive hardware lock, mixer out of the path",
    badge: "USB DAC",
    accent: "gold",
    icon: "node-usb",
    description:
      "Skips the phone's system mixer and its forced 48 kHz resampling, delivering the file bit-for-bit to your external USB DAC at up to DSD512 and 32-bit / 768 kHz PCM.",
    overview:
      "Android normally routes every stream through a system mixer that forces 48 kHz resampling, 16-bit truncation and dithering, even on a hi-res file. Bitperfect opens a direct, exclusive connection to your USB DAC instead, so the DAC runs at the file's exact native sample rate.",
    benefits: [
      {
        title: "Zero Resampling or Dithering",
        desc: "Every sample travels from the file to the DAC chip bit-for-bit, unchanged.",
        icon: "sig-bitperfect",
      },
      {
        title: "Native DSD and 32-Bit PCM",
        desc: "Direct support for native DSD up to DSD512 (DoP and native) and PCM up to 768 kHz.",
        icon: "node-dac",
      },
      {
        title: "Exclusive Device Ownership",
        desc: "Notification sounds and the phone's own mixer are locked out while you listen, so nothing else can touch the stream.",
        icon: "shield",
      },
      {
        title: "Live Lock Status",
        desc: "Shows the exact bit depth and sample rate your DAC is locked to, live, right on the Now Playing screen.",
        icon: "node-engine",
      },
    ],
    facts: [
      "Works with any USB-C or Micro-USB OTG DAC dongle or desktop DAC",
      "Automatic sample rate switching between tracks of different rates",
      "Volume and balance are handled by your DAC's own hardware, when it has them",
      "Where a DAC has no hardware volume control, the app says so instead of faking one",
      "Works with both generations of USB Audio Class DACs",
      "Bit-exact passthrough for FLAC, ALAC, WAV, and DSD streams",
    ],
    specs: [
      {
        label: "USB Standard",
        value: "USB Audio Class 1 and 2, direct connection",
      },
      { label: "Max PCM", value: "Up to 32-bit / 768 kHz" },
      { label: "DSD Support", value: "DSD64 to DSD512, DoP and native" },
      {
        label: "Resampling",
        value: "None: your file's native rate, unchanged",
      },
      {
        label: "Access Mode",
        value: "Exclusive, so nothing else can interrupt it",
      },
      {
        label: "Volume and Balance",
        value: "Your DAC's own hardware, when it has it",
      },
    ],
  },
  {
    id: "ai-enhancer",
    slug: "ai-enhancer",
    title: "The AI Enhancer",
    tagline: "Real-time restoration, entirely on your phone",
    badge: "On-device restoration",
    accent: "gold",
    icon: "sparkle",
    description:
      "Real-time restoration for 44.1 and 48 kHz material, filling back in detail that compression or a limited source strips out. Runs entirely on your phone's own neural hardware, nothing is sent anywhere.",
    overview:
      "On a 44.1 or 48 kHz source, lossy or lossless, the AI Enhancer runs on your phone's own neural chip to fill back in detail that a compressed or band-limited source is missing. It runs entirely on the device, and the DSP rack switches off automatically while it works: the two never run together.",
    benefits: [
      {
        title: "Restores Detail, Not Invents It",
        desc: "The Enhancer restores detail inside your file's existing sample rate. It never invents ultrasonic content that was not there.",
        icon: "sparkle",
      },
      {
        title: "Entirely On-Device",
        desc: "Runs on your phone's own neural chip, with no internet connection and no data uploaded, ever.",
        icon: "shield",
      },
      {
        title: "Checks Your Phone First",
        desc: "The app checks your phone's hardware before offering the feature, so it only turns on where it can run in real time.",
        icon: "node-engine",
      },
      {
        title: "Honest Signal Transparency",
        desc: "The signal badge switches to Enhanced the moment it's working, so you always know when the sound has been altered.",
        icon: "sig-enhanced",
      },
    ],
    facts: [
      "One-time model download on first enable; works fully offline",
      "Can be enabled or disabled with a single toggle in Settings",
      "Eligible on 44.1 and 48 kHz PCM, FLAC included; everything else plays untouched",
      "Restores detail already in the file; invents nothing above it",
      "Switches the DSP rack off automatically while it runs",
      "Nothing about your audio or your listening leaves the phone while it runs",
    ],
    specs: [
      { label: "Processing", value: "On your phone's neural chip only" },
      { label: "Enable It", value: "One switch in Settings, off by default" },
      { label: "Your Data", value: "Never leaves your phone while it plays" },
      {
        label: "Supported Inputs",
        value: "44.1 and 48 kHz files, FLAC included",
      },
      { label: "Signal Badge", value: "Shows Enhanced whenever it's active" },
      { label: "With the DSP Rack", value: "Switches off automatically" },
    ],
  },
];

export function getFeatureBySlug(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug);
}

export function getAllFeatures(): Feature[] {
  return features;
}

export function getAdjacentFeatures(slug: string): {
  prev: Feature;
  next: Feature;
} {
  const index = features.findIndex((f) => f.slug === slug);
  const prevIndex = (index - 1 + features.length) % features.length;
  const nextIndex = (index + 1) % features.length;
  return {
    prev: features[prevIndex],
    next: features[nextIndex],
  };
}
