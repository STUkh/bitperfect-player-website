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
    name: "Core Engine",
    description:
      "Direct USB output, precise processing and one switch for untouched sound.",
  },
  {
    id: "dsp",
    name: "Sound Processing",
    description:
      "EQ, room and headphone correction, tube-style colour and exact volume steps.",
  },
  {
    id: "hardware",
    name: "Hardware & Outputs",
    description:
      "Direct output to USB DACs, digital audio players and the phone's own port, if supported.",
  },
  {
    id: "ai",
    name: "On-Device AI",
    description:
      "Rebuilds the top octave on your phone. Separates vocals from instruments.",
  },
  {
    id: "streaming",
    name: "Streaming & Network",
    description:
      "High-resolution casting, receiver modes and plugins.",
  },
  {
    id: "media",
    name: "Formats, Radio & Interface",
    description:
      "Many file formats, internet radio, a dark theme and Android Auto.",
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
    title: "Direct Sound Path",
    category: "engine",
    categoryLabel: "Core Engine",
    summary:
      "Bit-perfect audio to your USB DAC. Android's system mixer is skipped.",
    description:
      "On many phones, Android converts all audio to 48 kHz and 16 bits. Bitperfect sends it straight to your USB DAC. PCM and DSD play at the file's own rate and depth, if your DAC supports them.",
    audiophileBenefit:
      "No rate change from Android's mixer. A DAC that supports the file plays it at its own rate and depth.",
    specs: [
      { label: "Mixer Bypass", value: "Direct to Your DAC" },
      { label: "Sample Rates", value: "Up to 768 kHz, DAC-dependent" },
      {
        label: "Signal Verification",
        value: "Live Bit-Perfect Status",
      },
    ],
    badge: "Core Architecture",
  },
  {
    number: 2,
    id: "audio-pipeline-precision",
    title: "32-Bit and 64-Bit Processing",
    category: "engine",
    categoryLabel: "Core Engine",
    summary:
      "Switch the internal processing between 32-bit and 64-bit floating point.",
    description:
      "32-bit float is the default and uses less battery. 64-bit float gives the lowest rounding noise in effects, resampling and volume. DSD playback stays at 32-bit.",
    audiophileBenefit:
      "Keeps rounding error low when EQ, crossfeed and volume shape the sound.",
    specs: [
      { label: "Math Precision", value: "32-bit / 64-bit Float" },
      { label: "Default Precision", value: "32-bit float" },
      { label: "Highest Precision", value: "64-bit float" },
    ],
  },
  {
    number: 3,
    id: "uac-usb-drivers",
    title: "UAC1 & UAC2 USB DAC Support",
    category: "engine",
    categoryLabel: "Core Engine",
    summary:
      "Built-in USB Audio Class 1 and 2 support for your DAC.",
    description:
      "Replaces Android's USB audio handling, once you allow USB access. Bitperfect reads what your DAC reports. It sets the rate for each track. Works with UAC1 and UAC2 DACs.",
    audiophileBenefit:
      "Each track plays at its own rate, up to 768 kHz, if your DAC has it. If not, the badge says Resampled.",
    specs: [
      { label: "Supported Protocols", value: "UAC 1.0 & UAC 2.0" },
      { label: "Rate Switching", value: "Follows each track's rate" },
      { label: "USB Access", value: "Direct, once permitted" },
    ],
    badge: "Direct USB",
  },
  {
    number: 4,
    id: "symphony-rust-engine",
    title: "One Engine for All Formats",
    category: "engine",
    categoryLabel: "Core Engine",
    summary:
      "One engine plays every supported format. No converter needed.",
    description:
      "FLAC, ALAC, WAV, DSD, archival lossless and lossy formats all play in the app. No file needs converting first.",
    audiophileBenefit:
      "Built to keep playback steady when the phone is busy.",
    specs: [
      { label: "Format Coverage", value: "Lossless, lossy and DSD" },
      { label: "Decoding Model", value: "One engine, all formats" },
      { label: "Archival Formats", value: "Monkey's Audio, WavPack, TAK" },
    ],
    badge: "Playback Engine",
  },
  {
    number: 5,
    id: "high-refresh-ui",
    title: "Smooth Scrolling on High-Refresh Screens",
    category: "media",
    categoryLabel: "Formats, Radio & Interface",
    summary:
      "Library and player screens scroll smoothly on high-refresh displays.",
    description:
      "The app follows your screen's refresh rate. Long album and track lists scroll smoothly.",
    audiophileBenefit:
      "Browse a large library without the screen stuttering while music plays.",
    specs: [
      { label: "Refresh Rate", value: "Matches your display" },
      {
        label: "Scrolling",
        value: "Smooth on long lists",
      },
      { label: "Theme", value: "Dark, near-black" },
    ],
  },
  {
    number: 6,
    id: "bitperfect-lock",
    title: "Bitperfect Lock",
    category: "engine",
    categoryLabel: "Core Engine",
    summary:
      "One switch turns off all effects and software volume. Nothing in the app alters the file.",
    description:
      "One tap turns off ReplayGain, dither, the true-peak limiter, crossfeed, EQ, the upsampler, PCM to DSD and the AI Enhancer. Volume moves to your DAC's control, or stays at full level if it has none.",
    audiophileBenefit:
      "A stray tap cannot change the sound. Files at rates your DAC lacks are still resampled, and the badge says Resampled.",
    specs: [
      { label: "Locks", value: "EQ, effects and volume" },
      { label: "Volume", value: "DAC's own, else 0 dB" },
      { label: "Activation", value: "One switch" },
    ],
    badge: "Purist Essential",
  },
  {
    number: 7,
    id: "pcm-to-dsd-converter",
    title: "Real-Time PCM to DSD Conversion",
    category: "dsp",
    categoryLabel: "Sound Processing",
    summary: "Converts PCM to DSD up to DSD512, in real time as the track plays.",
    description:
      "Converts PCM to 1-bit Direct Stream Digital in real time, using a noise-shaping modulator. Outputs DSD64 up to DSD512, as high as your DAC accepts. Sent to your DAC as DoP.",
    audiophileBenefit:
      "Gives delta-sigma DACs a DSD stream instead of PCM. Useful if you prefer that sound.",
    specs: [
      { label: "Target Rates", value: "DSD64, DSD128, DSD256, DSD512" },
      { label: "Transport", value: "DoP (DSD over PCM)" },
      { label: "Modulator", value: "Noise-shaping delta-sigma" },
    ],
  },
  {
    number: 8,
    id: "audiophile-src-resamplers",
    title: "Six Sample Rate Converters",
    category: "dsp",
    categoryLabel: "Sound Processing",
    summary:
      "Six converters, from fast to studio reference.",
    description:
      "Six converters: Half-Band (Fast), FFT Polyphase (Balanced, the default), Sinc-256 Light, Sinc-256, Sinc-512 and 1024-tap Studio Reference. Minimum or linear phase is set separately.",
    audiophileBenefit:
      "Pick the filter that suits your DAC and your ears.",
    specs: [
      { label: "Algorithms", value: "6 Selectable Converters" },
      {
        label: "Filter Profiles",
        value: "Minimum or linear phase",
      },
      { label: "Top Converter", value: "1024-tap Studio Reference" },
    ],
  },
  {
    number: 9,
    id: "dyadic-lossless-volume",
    title: "Dyadic Bit-Exact Volume Steps",
    category: "dsp",
    categoryLabel: "Sound Processing",
    summary:
      "Optional volume steps that lose no bits, when the output is wider than the file.",
    description:
      "Off by default. Works only when your DAC's output is wider than the file. 16-bit files at 32-bit output get 85 exact steps. 24-bit files at 32-bit, or 16-bit files at 24-bit, get 20.",
    audiophileBenefit:
      "Lowers volume in fixed steps, without cutting bits or adding dither.",
    specs: [
      { label: "16-bit to 32-bit", value: "85 exact steps" },
      { label: "24-bit to 32-bit", value: "20 exact steps" },
      { label: "Default", value: "Off, opt-in" },
    ],
    badge: "Mathematical Precision",
  },
  {
    number: 10,
    id: "gapless-playback",
    title: "Gapless Playback",
    category: "dsp",
    categoryLabel: "Sound Processing",
    summary:
      "Albums play without gaps. The next track loads in advance.",
    description:
      "The next track is read before the current one ends. Encoder padding is trimmed from ALAC files.",
    audiophileBenefit:
      "Classical movements, live recordings and concept albums play without gaps.",
    specs: [
      { label: "Track Joins", value: "Next track read ahead" },
      { label: "Preparation", value: "Ready before the join" },
      {
        label: "Metadata Handling",
        value: "Reads ALAC gapless tags",
      },
    ],
  },
  {
    number: 11,
    id: "full-ram-playback",
    title: "Full RAM Playback",
    category: "dsp",
    categoryLabel: "Sound Processing",
    summary:
      "Loads the whole file into memory before playback, if it fits. Storage stays idle.",
    description:
      "Pick Whole file read-ahead and the original file loads into memory first. Storage is not read during the track. Files too big for memory use read-ahead instead.",
    audiophileBenefit:
      "Storage stays idle while a track plays. No reads until the next file loads.",
    specs: [
      { label: "Storage Access", value: "Zero disk activity during play" },
      {
        label: "Memory Use",
        value: "Whole file, if it fits",
      },
      {
        label: "Read-Ahead",
        value: "Auto, Short, Long, Whole file",
      },
    ],
  },
  {
    number: 12,
    id: "eq-and-studio",
    title: "EQ & Studio",
    category: "dsp",
    categoryLabel: "Sound Processing",
    summary:
      "Four EQ modes: Studio sliders, 10-band graphic EQ, parametric EQ up to 32 bands, and AutoEQ.",
    description:
      "Studio has 14 sliders, up to 6 dB up or down. Graphic EQ has 10 bands, from 31.5 Hz to 16 kHz. Parametric EQ has up to 32 bands in seven shapes, Q 0.10 to 10.0. AutoEQ downloads headphone corrections.",
    audiophileBenefit:
      "Shape the sound for your headphones and taste, from one slider to a full curve.",
    specs: [
      { label: "Parametric Bands", value: "Up to 32 bands" },
      { label: "Filter Shapes", value: "7 Filter Types" },
      { label: "AutoEQ Integration", value: "Online headphone catalogue" },
    ],
    badge: "Studio Suite",
  },
  {
    number: 13,
    id: "harmonic-tuning",
    title: "Harmonic Tuning",
    category: "dsp",
    categoryLabel: "Sound Processing",
    summary:
      "Eight tube-style voicings, from warm single-ended triode to bold push-pull.",
    description:
      "Eight voicings named after classic tubes, including the 300B, KT88, EL34 and 12AX7. Each adds 2nd to 8th order harmonics. A drive control sets the amount.",
    audiophileBenefit:
      "Adds warmth to DACs and headphones that sound clinical.",
    specs: [
      { label: "Voicings", value: "8 Tube-Inspired Voicings" },
      { label: "Harmonic Structure", value: "2nd to 8th order" },
      {
        label: "Expert Mode",
        value: "Per-harmonic faders",
      },
    ],
  },
  {
    number: 14,
    id: "audiophile-upsampler",
    title: "Audiophile Upsampler up to 8x",
    category: "dsp",
    categoryLabel: "Sound Processing",
    summary:
      "Upsamples by 2x, 4x or 8x, with a 96, 192 or 384 kHz cap.",
    description:
      "Raises the sample rate up to 8x. 44.1 kHz and 48 kHz files can reach 352.8 kHz or 384 kHz. You pick a cap of 96, 192 or 384 kHz. The default is 192 kHz. Output stops at the cap or your DAC's top rate.",
    audiophileBenefit:
      "Gives your DAC a higher-rate signal. Its filters work far above the range you can hear.",
    specs: [
      { label: "Multipliers", value: "2x, 4x or 8x" },
      { label: "Output Cap", value: "96, 192 or 384 kHz" },
      { label: "Default Cap", value: "192 kHz" },
    ],
  },
  {
    number: 15,
    id: "acoustic-crossfeed",
    title: "Crossfeed",
    category: "dsp",
    categoryLabel: "Sound Processing",
    summary:
      "Three levels that mix each channel a little into the other, as speakers do.",
    description:
      "Mixes a filtered, quieter share of each channel into the other, as speakers do. Its three presets follow the Meier, Chu Moy and BS2B styles. Softens the hard left-right split of headphones. Stereo only.",
    audiophileBenefit:
      "A softer, less fatiguing stereo image for long sessions on headphones.",
    specs: [
      { label: "Models", value: "Meier, Chu Moy, BS2B" },
      {
        label: "Cross-Mix",
        value: "Low-Pass, Level-Attenuated",
      },
      { label: "Strength Presets", value: "Subtle, Natural, Strong" },
    ],
  },
  {
    number: 16,
    id: "convolution-engine",
    title: "Convolution Engine",
    category: "dsp",
    categoryLabel: "Sound Processing",
    summary:
      "Loads your own impulse-response WAV files for room or headphone correction.",
    description:
      "Loads impulse-response WAV files from a folder you choose, for headphone or room correction. Mono, stereo or true-stereo. Short mono files add no delay. Longer or stereo files add about 21 ms at 48 kHz.",
    audiophileBenefit:
      "Applies a correction you trust, from a headphone profile to a room measurement, to every track.",
    specs: [
      { label: "Filter Format", value: "WAV FIR Impulse Responses (PCM)" },
      { label: "Latency", value: "Zero up to 512 taps" },
      { label: "Length per Channel", value: "Up to 131,072 taps" },
    ],
  },
  {
    number: 17,
    id: "native-direct-output",
    title: "Native Direct Output",
    category: "hardware",
    categoryLabel: "Hardware & Outputs",
    summary:
      "Optional direct route to your phone's internal output, on supported devices.",
    description:
      "Sends PCM and DSD straight to the phone's internal output, on supported devices. It is off until you turn it on. It steps aside for Bluetooth or a USB DAC.",
    audiophileBenefit:
      "On supported devices, the badge can show Bit-perfect from the phone's own output, with no USB DAC.",
    specs: [
      { label: "Route", value: "Direct, opt-in per device" },
      {
        label: "Device Support",
        value: "Checked per device",
      },
      {
        label: "Bluetooth",
        value: "Steps aside",
      },
    ],
  },
  {
    number: 18,
    id: "multichannel-downmix",
    title: "Multichannel Downmix",
    category: "dsp",
    categoryLabel: "Sound Processing",
    summary:
      "Mixes 5.1, 7.1 and other surround layouts to stereo, using ITU levels.",
    description:
      "Mixes 3.0 to 7.1 layouts to stereo using ITU-R BS.775 levels. Choose full level with a limiter, or a fixed cut of about 7.6 dB for 5.1.",
    audiophileBenefit:
      "Plays surround DSD disc images and multichannel rips on stereo headphones. The centre channel stays in the mix.",
    specs: [
      {
        label: "Channel Configurations",
        value: "3.0 to 7.1 Layouts",
      },
      {
        label: "Level Policy",
        value: "Full level or fixed cut",
      },
      { label: "Clip Prevention", value: "Limiter at full level" },
    ],
  },
  {
    number: 19,
    id: "dap-direct-playback",
    title: "DAP Direct Playback",
    category: "hardware",
    categoryLabel: "Hardware & Outputs",
    summary:
      "Sends music to supported portable players, which handle the output themselves.",
    description:
      "Works with HiBy, FiiO, iBasso, Cayin, Shanling, Lotoo and Questyle players. Plays through the player's own direct path. The player keeps control of volume.",
    audiophileBenefit:
      "The player's own output carries the music. The badge can show Bit-perfect without an external DAC.",
    specs: [
      {
        label: "Supported Brands",
        value: "HiBy, FiiO, iBasso, Cayin, Shanling",
      },
      {
        label: "Output Path",
        value: "Firmware direct path",
      },
      { label: "Gain Control", value: "Set by the player" },
    ],
    badge: "Portable Players",
  },
  {
    number: 20,
    id: "themes-and-palettes",
    title: "Dark Theme & Accent Colours",
    category: "media",
    categoryLabel: "Formats, Radio & Interface",
    summary:
      "A dark interface, with eleven accent colours to choose from.",
    description:
      "One dark theme with near-white text. Eleven accent colours, from the default champagne gold to cobalt, teal or rose.",
    audiophileBenefit:
      "A calm dark screen for late-night listening, in an accent colour you choose.",
    specs: [
      {
        label: "Accent Presets",
        value: "Eleven, gold by default",
      },
      {
        label: "Background",
        value: "Charcoal graphite, #131318",
      },
      {
        label: "Interface Design",
        value: "Simple, easy-to-read type",
      },
    ],
  },
  {
    number: 21,
    id: "on-device-ai",
    title: "On-Device AI: Enhancer, Karaoke, Similar Tracks",
    category: "ai",
    categoryLabel: "On-Device AI",
    summary:
      "Rebuilds the top octave, isolates vocals and finds similar tracks, all on your phone.",
    description:
      "Models download once, then run on your phone. AI Enhancer rebuilds the top octave of 44.1 and 48 kHz tracks. AI Karaoke separates vocals from the instrumental in 44.1 kHz-family tracks. Sonic Scan finds similar tracks.",
    audiophileBenefit:
      "Rebuilds the top octave of 44.1 and 48 kHz files. It is off by default, and the badge says Enhanced while it works. Isolates vocals. No audio is uploaded.",
    specs: [
      { label: "Processing", value: "On your phone" },
      { label: "AI Enhancer", value: "44.1 and 48 kHz files" },
      {
        label: "AI Karaoke",
        value: "Vocals or instrumental",
      },
    ],
    badge: "On-Device Neural",
  },
  {
    number: 22,
    id: "plugin-system-sdk",
    title: "Plugin System & Public SDK",
    category: "streaming",
    categoryLabel: "Streaming & Network",
    summary:
      "Optional add-on apps, built on a public plugin SDK.",
    description:
      "Plugins are separate apps. The player checks each one's signature before connecting. Developers can build sources, catalogue pages, metadata and processing add-ons.",
    audiophileBenefit:
      "Add-ons are optional. Your local library plays the same with or without them.",
    specs: [
      {
        label: "Public SDK",
        value: "github.com/STUkh/bitperfect-player-plugin-SDK",
      },
      {
        label: "Capabilities",
        value: "Sources, Metadata, Processing",
      },
      { label: "Trust Model", value: "Signature-checked by the app" },
    ],
    sdkUrl: "https://github.com/STUkh/bitperfect-player-plugin-SDK",
    badge: "Optional Add-ons",
  },
  {
    number: 23,
    id: "universal-casting",
    title: "Casting to Speakers and TVs",
    category: "streaming",
    categoryLabel: "Streaming & Network",
    summary:
      "Send music to DLNA/UPnP and cast-enabled speakers and TVs on your network.",
    description:
      "Streams your local music to DLNA/UPnP and cast-enabled devices. Files play unchanged if the device accepts their format. Cast-enabled devices play up to 24-bit, 96 kHz. The app tells you when it converts a file.",
    audiophileBenefit:
      "Sends your library to your living room hi-fi, at full file quality where the device allows.",
    specs: [
      { label: "Protocols", value: "DLNA/UPnP, cast-enabled devices" },
      {
        label: "Cast-Enabled Devices",
        value: "Up to 24-bit / 96 kHz",
      },
      { label: "Stream Integrity", value: "Bit-exact when accepted" },
    ],
  },
  {
    number: 24,
    id: "receiver-mode",
    title: "Receiver Mode: Your Phone as a Network Player",
    category: "hardware",
    categoryLabel: "Hardware & Outputs",
    summary:
      "Turn your Android phone or player into a network receiver for your hi-fi.",
    description:
      "Your phone or player can be a DLNA/UPnP renderer, up to 384 kHz. It can also be a Logitech Media Server player, up to 768 kHz. The rate you hear depends on your DAC. Turn each mode on separately.",
    audiophileBenefit:
      "Turns a spare Android phone or player into a network player for your hi-fi. With Bit-perfect lock on, remote volume is ignored.",
    specs: [
      { label: "Receiver Modes", value: "DLNA/UPnP, LMS player" },
      { label: "Remote Volume", value: "Ignored with Bit-perfect lock" },
      { label: "Top Sample Rate", value: "Up to 768 kHz (LMS)" },
    ],
    badge: "Network Receiver",
  },
  {
    number: 25,
    id: "comprehensive-audio-formats",
    title: "Many Audio Formats",
    category: "media",
    categoryLabel: "Formats, Radio & Interface",
    summary:
      "Plays FLAC, ALAC, WAV, AIFF, DSD, APE and WavPack files.",
    description:
      "Plays FLAC, ALAC, WAV, AIFF, MP3, AAC, Opus and Ogg Vorbis. DSD plays as DSF, DFF or disc images. Archival formats: APE, WavPack, TTA, TAK and Musepack. Multichannel disc rips in common layouts play too.",
    audiophileBenefit:
      "Plays the files you have, with no conversion and no second player.",
    specs: [
      {
        label: "Lossless Formats",
        value: "FLAC, ALAC, WAV, AIFF",
      },
      { label: "DSD Support", value: "DSF, DFF, disc images" },
      {
        label: "Archival Formats",
        value: "APE, WavPack, TTA, TAK",
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
      "Your library, favourites and radio on your car screen.",
    description:
      "Browse Recent, Favourites, Playlists, Albums, Artists, Radio and more on the car screen. Search from the car's own screen. Steering-wheel keys work too.",
    audiophileBenefit:
      "Find and play your library from the driver's seat, without handling your phone.",
    specs: [
      { label: "Platform", value: "Media browser app" },
      {
        label: "Controls",
        value: "Car screen, wheel keys",
      },
      { label: "Audio Delivery", value: "Through the car connection" },
    ],
  },
  {
    number: 27,
    id: "internet-radio",
    title: "Internet Radio Search",
    category: "media",
    categoryLabel: "Formats, Radio & Interface",
    summary:
      "Search community radio stations. Filter by codec and bitrate.",
    description:
      "Search stations by codec (MP3, AAC or FLAC) and minimum bitrate. Paste any stream URL. Save favourites in folders. See live song titles as they play.",
    audiophileBenefit:
      "Find FLAC and high-bitrate stations. Listen in the same player as your library.",
    specs: [
      { label: "Directory", value: "Community, searched live" },
      {
        label: "Codecs",
        value: "MP3, AAC, FLAC",
      },
      {
        label: "Metadata Tracking",
        value: "Live song titles",
      },
    ],
  },
];
