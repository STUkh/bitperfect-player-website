/**
 * Page composition for the six feature routes.
 *
 * `src/data/features.ts` owns the feature record: identity, tagline, the short
 * index description, the facts and the specification table. This module owns
 * what the approved artboards in `design/` added on top of that record and the
 * data file does not yet carry: the detail-page lede, the four-row header
 * summary, the four scroll beats that drive the sticky phone rail, the label on
 * the device screen, and the closing action.
 *
 * Copy is transcribed from the artboards, which were corrected against the app
 * source (see design/APP-PARITY.md). Where an artboard still disagreed with
 * APP-PARITY the app wins, and the divergence is noted inline.
 *
 * House rules that apply to every string below: no em-dash or en-dash, ranges
 * use "to", and no page may say a feature is free or imply a tier below the
 * subscription.
 */

import { featureRoutes } from "../../data/navigation";

export interface SummaryRow {
  label: string;
  value: string;
}

export interface BeatStat {
  label: string;
  value: string;
}

export interface BeatChip {
  label: string;
  /** The one chip the beat is about. Rendered in gold; the rest stay neutral. */
  active?: boolean;
}

export interface Beat {
  /** Monospace, neutral, never gold. */
  eyebrow: string;
  title: string;
  body: string;
  /** At most one supporting element per beat. */
  chips?: BeatChip[];
  stats?: BeatStat[];
  note?: string;
  /** usb-dac only: the five real runtime states, each in its own colour. */
  signalStates?: boolean;
}

export interface FeaturePage {
  /* No title or breadcrumb here. The route's name is `featureName(slug)` in
     `src/data/navigation.ts`, which is the only place any surface reads it. */
  lede: string;
  /** Four rows, hairline separated, in the header's right hand column. */
  summary: SummaryRow[];
  /** Exactly four. The rail's screen swaps once per beat. */
  beats: Beat[];
  /** The label in the device screen's title row. */
  screenTitle: string;
  cta: { title: string; body: string };
}

export const featurePages: Record<string, FeaturePage> = {
  eq: {
    lede: "Build an exact curve with up to 32 bands and seven filter shapes. One tap turns it off to hear the music without your curve.",
    summary: [
      { label: "Bands", value: "1 to 32" },
      { label: "Filter shapes", value: "7" },
      { label: "Q range", value: "0.10 to 10.0" },
      { label: "Bypass", value: "One tap" },
    ],
    screenTitle: "Equalizer",
    beats: [
      {
        eyebrow: "Bands",
        title: "Up to 32 independent bands",
        body: "Place each filter anywhere from 20 Hz to 20 kHz. Boost or cut it by up to 12 dB. You can enter a measured curve with its exact values.",
        stats: [
          { label: "Span", value: "20 Hz to 20 kHz" },
          { label: "Gain", value: "-12.0 dB to +12.0 dB" },
        ],
      },
      {
        eyebrow: "Filter shapes",
        title: "Seven filter shapes, not just a bell",
        body: "A bell handles most fixes. The others can shelve the top end, cut deep rumble, or remove one resonance.",
        // EqFilterTypeOrder: BELL, LOW_SHELF, HIGH_SHELF, LOW_PASS, HIGH_PASS,
        // NOTCH, ALL_PASS. The seventh is All Pass, never Band Pass.
        chips: [
          { label: "Bell", active: true },
          { label: "Low shelf" },
          { label: "High shelf" },
          { label: "Low pass" },
          { label: "High pass" },
          { label: "Notch" },
          { label: "All pass" },
        ],
      },
      {
        eyebrow: "Q factor",
        title: "From broad to narrow",
        body: "Q runs from 0.10 to 10.0. A low Q gently changes a wide range. A high Q fixes one narrow peak and leaves the rest alone.",
        note: "Same gain, different Q. Q 0.7 covers about two octaves. Q 8.0 covers under a fifth of an octave.",
      },
      {
        eyebrow: "Bypass",
        title: "One tap to hear the original file",
        body: "Bypass turns the EQ off completely. The badge shows Bit-perfect again when nothing else changes the sound. Compare your curve with the original.",
        note: "With EQ active, the badge cannot show Bit-perfect. Bypassed, the EQ alters nothing.",
      },
    ],
    cta: {
      title: "Set a curve once, then listen.",
      body: "Seven filter shapes and a one-tap bypass, included with everything else.",
    },
  },

  library: {
    lede: "Works with internal storage, MicroSD, USB drives and network shares. Tags and artwork come from the file itself.",
    summary: [
      { label: "Views", value: "8" },
      { label: "Sources", value: "Local and network" },
      { label: "Main formats", value: "15" },
      { label: "Search", value: "Instant, offline" },
    ],
    screenTitle: "Library",
    beats: [
      {
        eyebrow: "Views",
        title: "Eight ways to browse your music",
        body: "Sources, Recent, Favourites, Playlists, Albums, Artists, Tracks, Genres. Sources shows your real folders, the way you organised them.",
        // LibraryTab.kt declares eight, with the songs tab labelled Tracks and
        // the folders tab labelled Sources.
        chips: [
          { label: "Sources" },
          { label: "Recent" },
          { label: "Favourites" },
          { label: "Playlists" },
          { label: "Albums", active: true },
          { label: "Artists" },
          { label: "Tracks" },
          { label: "Genres" },
        ],
      },
      {
        eyebrow: "On device",
        title: "Search never leaves the phone",
        body: "Your library is indexed on the phone. Search by title, artist or album, with instant results. Missing covers download only when you ask.",
      },
      {
        eyebrow: "Formats",
        title: "Less common formats, played natively",
        // Corrected against AudioMimeTypes.kt (EXTENSION_TO_MIME,
        // DECODE_REQUIRED_EXTENSIONS): the shipping decoder covers 18 formats,
        // but this page advertises 15. Dolby Digital, AC3, E-AC3, DTS and WMA
        // are decoded but deliberately not named here: Dolby and DTS license
        // their decoders, so advertising them would imply a licence this build
        // may not hold. SACD ISO is listed as "DSD disc images" instead, since
        // SACD is a Sony/Philips trademark for the same thing. Do not add the
        // five back; see CONTENT.md and PRODUCT.md, "Format Decoding".
        body: "Plays the common formats, from FLAC and WAV to MP3 and AAC. Also the rarer ones: Monkey's Audio, WavPack, TAK, True Audio, Musepack and DSD disc images.",
        chips: [
          { label: "FLAC", active: true },
          { label: "ALAC" },
          { label: "WAV" },
          { label: "AIFF" },
          { label: "DSD" },
          { label: "DSD disc images" },
          { label: "Monkey's Audio" },
          { label: "WavPack" },
          { label: "True Audio" },
          { label: "TAK" },
          { label: "Musepack" },
          { label: "Opus" },
          { label: "Ogg Vorbis" },
          { label: "MP3" },
          { label: "AAC" },
        ],
      },
      {
        eyebrow: "Playlists",
        title: "It reads the playlists you already have",
        body: "Import M3U, M3U8, PLS, XSPF, ASX and CUE playlists. It works even if the file extension is missing or wrong. Export any playlist as M3U or M3U8.",
        note: "Import six formats. Export two: M3U and M3U8.",
      },
    ],
    cta: {
      title: "Point it at a folder. It does the rest.",
      body: "No account needed. No audio leaves your phone.",
    },
  },

  casting: {
    lede: "Stream music to cast-enabled speakers and TVs, or turn your phone into a network player.",
    summary: [
      { label: "Receiver protocols", value: "2" },
      { label: "Modes", value: "Sender and receiver" },
      { label: "Receiver ceiling", value: "Up to 384 kHz (DLNA)" },
      { label: "DLNA path", value: "Unchanged if accepted" },
    ],
    screenTitle: "Cast",
    beats: [
      {
        eyebrow: "Sending",
        title: "Cast to speakers and TVs on your network",
        body: "Cast to cast-enabled speakers and TVs, or DLNA players on your network. If a device accepts the file as it is, nothing is re-encoded. If not, the app picks a format it can play. It tells you which happened.",
      },
      {
        eyebrow: "Receiving",
        title: "Two ways to play to your phone",
        body: "Turn on one or both. The phone can be a DLNA renderer that UPnP apps can find. Or it can be a network player for a music server. Either way, the app you already use plays to your phone and your DAC.",
        chips: [
          { label: "DLNA MediaRenderer", active: true },
          { label: "Network player for music servers" },
        ],
      },
      {
        eyebrow: "Volume",
        title: "Bit-perfect lock blocks remote volume",
        body: "With Bit-perfect lock on, remote volume commands are declined and the receiver reports full volume. Software gain would remove bits. With the lock off, remote volume works as usual.",
      },
      {
        eyebrow: "Honesty",
        title: "It tells you when it had to convert",
        body: 'The signal path shows either "Sent unchanged" or the exact conversion made. The app also says when it could not keep the audio unchanged.',
        note: "Sent unchanged, or each conversion named.",
      },
    ],
    cta: {
      title: "Your library, in every room.",
      body: "Send it to big speakers, or let other apps play to your phone.",
    },
  },

  dsp: {
    lede: "For listening when exact bits do not matter. Every module is optional. Bit-perfect lock turns them all off at once. Turning on the AI Enhancer turns the rack off.",
    summary: [
      { label: "Tube voicings", value: "8" },
      // The artboard reads "Natural" here and on the crossfeed spec row. That is
      // a stale find and replace; the app ships Meier, Chu Moy and BS2B.
      { label: "Crossfeed models", value: "Meier, Chu Moy, BS2B" },
      { label: "ReplayGain", value: "From file tags" },
      { label: "Bypass", value: "Bit-perfect lock" },
    ],
    screenTitle: "DSP",
    beats: [
      {
        eyebrow: "Crossfeed",
        title: "Soften hard-panned stereo on headphones",
        body: "Headphones send each channel to one ear only. A room never does that. Crossfeed mixes a little of each channel into the other. Three presets follow the Meier, Chu Moy and BS2B designs. Subtle is the gentlest. Natural is balanced. Strong sounds most like speakers.",
        chips: [
          { label: "Subtle (Meier)", active: true },
          { label: "Natural (Chu Moy)" },
          { label: "Strong (BS2B)" },
        ],
      },
      {
        eyebrow: "Loudness",
        title: "A mixed queue at one level",
        body: "ReplayGain reads the gain tags in your files, per track or per album. It evens out a mixed queue by changing level only, never by squashing dynamics. Album mode keeps quiet songs quiet within an album. Auto picks album or track for you.",
        chips: [
          { label: "Track" },
          { label: "Album", active: true },
          { label: "Auto" },
        ],
      },
      {
        eyebrow: "Character",
        title: "Eight voicings, not measurements",
        body: "Harmonic Tuning adds the sound of a valve amp. Eight voicings range from silky single-ended triode to bold push-pull. Four follow tube physics. The other four are our own voicings. Treat them as colour, not a copy of a real tube.",
        note: "Four follow tube physics, four are custom voicings. None is measured from real hardware.",
      },
      {
        eyebrow: "Protection",
        title: "Stops clipping inside your DAC",
        body: "Lossy decoding can create peaks between samples. These clip in the converter, even when no single sample looks too loud. The limiter oversamples four times to find them. It keeps peaks under -0.6 dBTP. It switches on by itself when another stage could create them.",
        stats: [
          { label: "Ceiling", value: "-0.6 dBTP" },
          { label: "Oversampling", value: "4x" },
        ],
      },
    ],
    cta: {
      title: "Shape the sound, or turn it all off.",
      body: "Four modules: Crossfeed, ReplayGain, Harmonic Tuning, true-peak limiter. Bit-perfect lock turns them off.",
    },
  },

  "usb-dac": {
    lede: "Many Android phones convert audio to 48 kHz and 16-bit. Bitperfect Player sends music straight to your DAC at the file's native rate, if your DAC supports it.",
    summary: [
      { label: "Max PCM", value: "32-bit / 768 kHz, DAC permitting" },
      { label: "DSD", value: "DSD64 to DSD512, DAC permitting" },
      { label: "Protocol", value: "UAC1 and UAC2" },
      { label: "System mixer", value: "Bypassed" },
    ],
    screenTitle: "Now Playing",
    beats: [
      {
        eyebrow: "Exclusive mode",
        title: "Only one app uses your DAC",
        body: "Bitperfect takes over your USB DAC while music plays, so other apps cannot use it. Android asks your permission once.",
      },
      {
        eyebrow: "Rate switching",
        title: "Your DAC follows each file's rate",
        body: "Your DAC switches to each track's own rate, such as 44.1 kHz or 192 kHz. If your DAC cannot play a rate, the badge says Resampled.",
        stats: [
          { label: "PCM", value: "up to 768 kHz" },
          { label: "Bit depth", value: "16, 24 and 32" },
          { label: "DSD", value: "DoP and native" },
        ],
      },
      {
        eyebrow: "Hardware",
        title: "Dongles and desktop DACs, same path",
        body: "Works with UAC1 and UAC2 DACs, from a USB-C dongle to a desktop DAC. If your DAC has hardware volume, Bitperfect Player uses it. With Bit-perfect lock on, DACs without volume stay fixed at 0 dBFS line level. Use an external amplifier, or unlock software volume for sensitive headphones.",
        note: "0 dBFS is full line level. Use external volume controls when connecting sensitive headphones.",
      },
      {
        eyebrow: "Honesty",
        title: "The badge tells you what reached the DAC",
        body: "Bit-perfect shows only when nothing changes the file. Enhanced shows when AI Enhancer is active. Resampled shows if rate or depth changed. Lossy marks lossy files or connections. Unknown shows when state cannot be confirmed.",
        signalStates: true,
      },
      {
        /*
          The fifth beat, and the only page that has one.

          Every route used to carry exactly four, which is a schema rather than an
          argument: content cut to fill a grid instead of a grid sized to the
          content. USB output is the deepest thing this app does and it had the same
          budget as crossfeed. DSD was the piece that had been squeezed out, living
          only in a spec row despite being a genuinely separate output path.

          Sourced: DSD64 to DSD512 from MonospaceFormatChip.kt, the 176.4 kHz DoP
          carrier requirement from ConnectionManagerHandler.kt.
        */
        eyebrow: "DSD",
        title: "Two ways to send DSD, picked for you",
        body: "Your DAC gets DSD64 to DSD512 as native DSD if it can take it, or as DoP if not. The app picks for you, and you can change it. If neither works, the file is converted to PCM and the badge says so.",
        stats: [
          { label: "Range", value: "DSD64 to DSD512" },
          { label: "Transport", value: "Native or DoP" },
        ],
      },
    ],
    cta: {
      title: "Plug in a DAC and hear your files bit for bit.",
      body: "Bit-perfect USB output, in the same subscription as every other feature.",
    },
  },

  "ai-enhancer": {
    lede: "The enhancer rebuilds the upper band, about 14 to 22 kHz, of 44.1 and 48 kHz files. It is off by default and runs on your phone.",
    summary: [
      { label: "Reconstructs", value: "14 to 22 kHz" },
      { label: "Works on", value: "44.1 and 48 kHz" },
      { label: "Runs on", value: "Your phone only" },
      { label: "Works offline", value: "After one download" },
    ],
    screenTitle: "AI Enhancer",
    beats: [
      {
        eyebrow: "What it does",
        title: "A plausible rebuild, not the original",
        body: "It rebuilds the upper band, about 14 to 22 kHz, at the file's own sample rate. It works on 44.1 and 48 kHz files only. It adds nothing above that.",
        stats: [
          { label: "Band", value: "14 to 22 kHz" },
          { label: "Rates", value: "44.1 and 48 kHz" },
        ],
      },
      {
        eyebrow: "Where it runs",
        title: "Only on your phone",
        body: "Audio stays on your phone. It needs no network while it plays. The model downloads once, when you first turn it on. Then it works offline.",
      },
      {
        eyebrow: "Hardware",
        title: "It turns off before it stutters",
        body: "It is off by default. A supported neural chip runs the full model. Other phones use Lite mode on the main processor. If the phone cannot keep up in real time, the enhancer turns itself off.",
        chips: [{ label: "Off" }, { label: "Neural chip", active: true }, { label: "Lite mode" }],
      },
      {
        eyebrow: "Honesty",
        title: "The badge stops saying Bit-perfect",
        body: "As soon as the enhancer changes the sound, the badge shows Enhanced. It does not run on DSD, while casting, or with Karaoke on. While it runs, the sound processing rack is off.",
        note: "While the AI Enhancer is on, the sound processing rack is off.",
      },
    ],
    cta: {
      title: "Rebuild the highs.",
      body: "Included in the same subscription as everything else. Off until you switch it on.",
    },
  },
};

/**
 * Display order for the index. Not the array order in `features.ts`, which the
 * prev and next chain follows: the index leads with the two features that sell
 * the product.
 */
/** The running order, read off the canonical route table so it cannot fork. */
export const indexOrder = featureRoutes.map((r) => r.slug);
export function getLocalizedFeaturePage(slug: string, _lang?: string) {
  return featurePages[slug];
}


/** Two decimal digits, so the mono column stays the same width all six times. */
