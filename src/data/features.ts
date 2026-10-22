import type { AccentColorKey } from "./colors";

export interface FeatureSpec {
  label: string;
  value: string;
}

export interface FeatureBenefit {
  title: string;
  desc: string;
  icon?: string;
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
    title: "32-band parametric EQ",
    tagline: "Shape your sound with 32 bands and 7 filter shapes",
    badge: "Equalizer",
    accent: "gold",
    icon: "eq",
    description:
      "Shape sound to your ears and your room with up to 32 bands, seven filter shapes, and continuous Q.",
    overview:
      "Bitperfect Player includes a 32-band parametric equalizer. Correct headphone response, room acoustics, or tonal balance. Every band is yours to place across 20 Hz to 20 kHz. One tap takes the whole curve out of the path to return to bit-perfect.",
    benefits: [
      {
        title: "32 independent bands",
        desc: "Configure up to 32 filters across 20 Hz to 20 kHz, with a gain range of -12 dB to +12 dB.",
      },
      {
        title: "Seven filter shapes",
        desc: "Bell, low shelf, high shelf, low pass, high pass, notch and all pass. Gain controls bell and shelves.",
      },
      {
        title: "Continuous Q precision",
        desc: "Scale Q factor from 0.10 for broad tone shaping to 10.0 for a narrow notch.",
      },
      {
        title: "Bit-perfect lock",
        desc: "Switch the EQ out of the path and the badge returns to Bit-perfect. While active, the badge indicates active signal processing.",
      },
    ],
    facts: [
      "Up to 32 parametric bands per profile",
      "Seven filter shapes: bell, shelves, passes, notch, all pass",
      "Q factor scales continuously from 0.10 to 10.0",
      "Gain range from -12.0 dB to +12.0 dB",
      "Every band placed anywhere across 20 Hz to 20 kHz",
      "One-tap bit-perfect bypass",
    ],
    specs: [
      { label: "EQ bands", value: "Up to 32, fully independent" },
      { label: "Filter shapes", value: "7 shapes" },
      { label: "Q factor range", value: "0.10 to 10.0" },
      { label: "Gain range", value: "-12.0 dB to +12.0 dB" },
      { label: "Bypass", value: "One tap to untouched audio" },
      { label: "Frequency span", value: "20 Hz to 20 kHz" },
    ],
  },
  {
    id: "library",
    slug: "library",
    title: "Local lossless library",
    tagline: "Eight ways in, indexed entirely on your phone",
    badge: "Local library",
    accent: "gold",
    icon: "waveform",
    description:
      "Organise your collection across eight views. Search finds music instantly, and audio stays on your phone.",
    overview:
      "Your music library stays on your phone. Bitperfect Player indexes local storage and SD cards, reading tags and artwork straight from the files. No account needed. Search returns instant results without a network connection.",
    benefits: [
      {
        title: "Eight browsing views",
        desc: "Browse across Sources, Recent, Favourites, Playlists, Albums, Artists, Tracks, Genres.",
      },
      {
        title: "Instant search",
        desc: "Search your collection by title, artist or album. Search runs on your phone.",
      },
      {
        title: "Accurate tags and artwork",
        desc: "Reads tags and artwork straight from the file, even if the file extension is wrong.",
      },
      {
        title: "On-device privacy",
        desc: "Your music, library, history and favourites stay on your phone. No account needed, and no tracking.",
      },
    ],
    facts: [
      "Sources, Recent, Favourites, Playlists, Albums, Artists, Tracks, Genres",
      "Browse nested folders exactly as they are stored",
      "Embedded artwork shows automatically. Missing covers download only when you ask",
      "Playlist import: M3U, M3U8, PLS, XSPF, ASX and CUE",
      "The library updates itself when files change on storage",
      "No tracking and no remote lookups while you browse your library",
    ],
    specs: [
      {
        label: "Library views",
        value: "8, including albums, artists and genres",
      },
      { label: "Search", value: "Instant, on your phone" },
      {
        label: "Storage sources",
        value: "Phone, SD, USB OTG and network",
      },
      {
        label: "Formats played",
        value: "15, including FLAC, DSD and TAK",
      },
      { label: "Playlist import", value: "M3U, M3U8, PLS, XSPF, ASX, CUE" },
      { label: "Network use", value: "Index and search stay on your phone" },
    ],
  },
  {
    id: "casting",
    slug: "casting",
    title: "Two-way streaming",
    tagline: "Cast to any network streamer, or turn your phone and DAC into a network receiver",
    badge: "Network audio",
    accent: "gold",
    icon: "cast",
    description:
      "Cast audio to cast-enabled speakers and TVs or DLNA players, or turn your phone into a receiver.",
    overview:
      "Stream music to cast-enabled speakers and TVs, or DLNA players on your network. Turn your phone into a receiver for DLNA apps or a network player for music servers.",
    benefits: [
      {
        title: "Send to speakers and TVs on your network",
        desc: "Cast to cast-enabled speakers and TVs, or DLNA and UPnP players on your network.",
      },
      {
        title: "Turn your phone into a receiver",
        desc: "Receive audio as a DLNA renderer or as a network player for music servers.",
      },
      {
        title: "Volume commands are declined under lock",
        desc: "Under Bit-perfect lock, remote volume commands are declined. That refusal keeps the stream bit-exact.",
      },
      {
        title: "Honest stream reporting",
        desc: "The app reports whether a stream went out unchanged or had to be converted.",
      },
    ],
    facts: [
      "Send to DLNA, UPnP and cast-enabled speakers and TVs",
      "Receive as a DLNA renderer or a network player for music servers",
      "The DLNA path sends the file unchanged when accepted",
      "Every other path tells you exactly what conversion it made",
      "Background streaming continues with the screen locked",
      "As a DLNA renderer, the phone takes PCM up to 384 kHz",
    ],
    specs: [
      {
        label: "Send to",
        value: "DLNA, UPnP, cast-enabled speakers and TVs",
      },
      {
        label: "Receive as",
        value:
          "A DLNA renderer or a network player for music servers",
      },
      { label: "Receiver ceiling", value: "Up to 384 kHz over DLNA" },
      {
        label: "Network discovery",
        value: "Automatic on your local network, no account needed",
      },
      {
        label: "Volume control",
        value: "Never software gain under Bit-perfect lock",
      },
      {
        label: "Stream format",
        value: "Unchanged if accepted, always reported",
      },
    ],
  },
  {
    id: "dsp",
    slug: "dsp",
    title: "DSP rack",
    tagline: "Crossfeed, tone shaping and true-peak protection in real time",
    badge: "DSP rack",
    accent: "gold",
    icon: "sparkle",
    description:
      "Switch out of bit-perfect into four sound processing modules: headphone crossfeed, ReplayGain, Harmonic Tuning and a true-peak limiter.",
    overview:
      "The DSP rack carries four sound processing modules: crossfeed, ReplayGain, Harmonic Tuning and a true-peak limiter. Turning on AI Enhancer switches the rack off. The app tells you when that happens.",
    benefits: [
      {
        title: "Headphone crossfeed",
        desc: "Three presets: Subtle (Meier), Natural (Chu Moy) and Strong (BS2B). Relaxes hard-panned stereo on headphones.",
      },
      {
        title: "Tag-driven ReplayGain",
        desc: "Track, album or auto mode, read from file tags. Balances volume without compressing dynamic range.",
      },
      {
        title: "Harmonic Tuning",
        desc: "Eight tube voicings to colour the sound. These are custom voicings, not hardware measurements.",
      },
      {
        title: "True-peak limiter",
        desc: "Holds a ceiling at -0.6 dBTP so your DAC never clips on inter-sample peaks. Turns on when needed.",
      },
    ],
    facts: [
      "Four modules: Crossfeed, ReplayGain, Harmonic Tuning, true-peak limiter",
      "Crossfeed in three strengths: Meier, Chu Moy, BS2B",
      "ReplayGain per track, per album or auto, read from file tags",
      "Harmonic Tuning with eight tube voicings",
      "True-peak limiter holds a -0.6 dBTP ceiling to catch inter-sample peaks",
      "The rack switches off automatically while AI Enhancer is running",
    ],
    specs: [
      {
        label: "DSP modules",
        value: "Crossfeed, ReplayGain, Harmonic Tuning, true-peak limiter",
      },
      { label: "Crossfeed", value: "Meier, Chu Moy or BS2B" },
      { label: "Loudness", value: "ReplayGain: track, album or auto" },
      { label: "Harmonic Tuning", value: "Eight tube voicings" },
      {
        label: "True-peak limiter",
        value: "Catches inter-sample peaks at -0.6 dBTP",
      },
      { label: "With AI Enhancer", value: "Switches off automatically" },
    ],
  },
  {
    id: "usb-dac",
    slug: "usb-dac",
    title: "Direct USB DAC output",
    tagline: "Direct hardware path, system mixer bypassed",
    badge: "USB DAC",
    accent: "gold",
    icon: "node-usb",
    description:
      "Bypasses Android's system mixer and forced 48 kHz resampling. Delivers audio bit-for-bit to your USB DAC at up to 32-bit / 768 kHz and DSD512, if your DAC supports it.",
    overview:
      "Android normally routes audio through a system mixer that forces 48 kHz resampling and 16-bit truncation. Bitperfect Player opens a direct connection to your USB DAC instead. Your DAC runs at the file's native sample rate, if supported.",
    benefits: [
      {
        title: "Zero resampling or dithering",
        desc: "Every sample reaches the DAC bit-for-bit unchanged, if your DAC supports the file rate.",
      },
      {
        title: "Native DSD and 32-bit PCM",
        desc: "Supports native DSD up to DSD512 (DoP and native) and PCM up to 768 kHz, if your DAC supports them.",
      },
      {
        title: "Exclusive device access",
        desc: "Notification sounds and Android's system mixer are locked out while music plays.",
      },
      {
        title: "Live signal status",
        desc: "Shows the exact bit depth, sample rate, and signal state on the Now Playing screen.",
      },
    ],
    facts: [
      "Works with UAC1 and UAC2 USB DACs, dongles and desktop units",
      "Automatic sample rate switching between tracks",
      "Uses hardware volume and balance controls when your DAC has them",
      "Shows when software volume is used below 100%",
      "Up to 32-bit / 768 kHz PCM and DSD512, if your DAC supports them",
      "Bit-perfect passthrough for FLAC, ALAC, WAV and DSD",
    ],
    specs: [
      {
        label: "USB standard",
        value: "USB Audio Class 1 and 2, direct connection",
      },
      { label: "Max PCM", value: "Up to 32-bit / 768 kHz, DAC permitting" },
      { label: "DSD support", value: "DSD64 to DSD512, DoP and native" },
      {
        label: "Resampling",
        value: "None, if your DAC supports the file rate",
      },
      {
        label: "Access mode",
        value: "Exclusive: other apps cannot use the DAC",
      },
      {
        label: "Volume and balance",
        value: "Your DAC's hardware, when available",
      },
    ],
  },
  {
    id: "ai-enhancer",
    slug: "ai-enhancer",
    title: "AI Enhancer",
    tagline: "Real-time restoration, entirely on your phone",
    badge: "On-device restoration",
    accent: "gold",
    icon: "sparkle",
    description:
      "Real-time audio restoration for 44.1 and 48 kHz tracks, off by default. Full model runs on a supported neural chip. Other phones use Lite mode on the main processor. Audio stays on your phone.",
    overview:
      "The AI Enhancer restores high-frequency detail on 44.1 and 48 kHz audio. It is off by default and runs on your phone. Supported phones run the full model on a neural chip, while others use Lite mode. The DSP rack turns off automatically while it runs.",
    benefits: [
      {
        title: "Restores upper band detail",
        desc: "Restores detail between 14 and 22 kHz inside the file's sample rate. It never invents ultrasonic content.",
        icon: "waveform",
      },
      {
        title: "Runs on your phone",
        desc: "Full model on a supported neural chip, or Lite mode on the processor. Works offline after download.",
        icon: "sparkle",
      },
      {
        title: "Checks hardware first",
        desc: "The app tests performance before enabling the model. It turns off if the phone cannot keep up.",
        icon: "shield",
      },
      {
        title: "Honest signal badge",
        desc: "The signal badge shows Enhanced while active. It stops saying Bit-perfect as soon as sound changes.",
        icon: "sig-bitperfect",
      },
    ],
    facts: [
      "One-time model download on first enable; works fully offline",
      "Off by default, enabled with a single toggle in Settings",
      "Works on 44.1 and 48 kHz audio only; other files play untouched",
      "Full model on a supported neural chip, Lite mode on the processor",
      "Switches the DSP rack off automatically while it runs",
      "Audio stays on your phone while it runs",
    ],
    specs: [
      { label: "Processing", value: "On your phone, works offline" },
      { label: "Status", value: "Off by default, enabled in Settings" },
      { label: "Your data", value: "Audio stays on your phone" },
      {
        label: "Supported inputs",
        value: "44.1 and 48 kHz files only",
      },
      { label: "Signal badge", value: "Shows Enhanced whenever active" },
      { label: "With DSP rack", value: "Switches off automatically" },
    ],
  },
];

export function getFeatureBySlug(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug);
}
export function getLocalizedFeatureBySlug(
  slug: string,
  _lang?: string
): Feature | undefined {
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
