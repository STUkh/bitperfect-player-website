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
    lede: "Shape an exact compensation curve with up to 32 bands, seven filter shapes, and Q that runs from broad warmth to a pinpoint notch. Then bypass it in one tap to hear the file untouched.",
    summary: [
      { label: "Bands", value: "1 to 32" },
      { label: "Filter types", value: "7" },
      { label: "Q range", value: "0.10 to 10.0" },
      { label: "Bypass", value: "One tap" },
    ],
    screenTitle: "Equalizer",
    beats: [
      {
        eyebrow: "Bands",
        title: "Thirty-two bands, each one fully independent",
        body: "Place a filter anywhere between 20 Hz and 20 kHz and move it by up to 24 dB in either direction. Nothing is snapped to a preset slider position, so a correction curve from a measurement rig transfers over exactly as it was measured.",
        stats: [
          { label: "Span", value: "20 Hz to 20 kHz" },
          { label: "Gain", value: "-24.0 dB to +24.0 dB" },
        ],
      },
      {
        eyebrow: "Filter shapes",
        title: "Seven topologies, not just a bell",
        body: "A bell handles most corrections. The other six are there for the cases it cannot: shelving the whole top end, rolling off subsonic rumble before it reaches the driver, or notching out one resonance without touching its neighbours.",
        // EqFilterTypeOrder: BELL, LOW_SHELF, HIGH_SHELF, LOW_PASS, HIGH_PASS,
        // NOTCH, ALL_PASS. The seventh is All Pass, never Band Pass.
        chips: [
          { label: "Peak", active: true },
          { label: "Low shelf" },
          { label: "High shelf" },
          { label: "Low pass" },
          { label: "High pass" },
          { label: "All pass" },
          { label: "Notch" },
        ],
      },
      {
        eyebrow: "Q factor",
        title: "From broad warmth to a surgical notch",
        body: "Q is continuous from 0.10 to 10.0, not stepped. At the wide end a single band tilts a whole region gently. At the narrow end it removes one peak and leaves the octave either side of it alone.",
        note: "Same gain, different Q. Q 0.7 spreads across two octaves. Q 8.0 sits on one frequency.",
      },
      {
        eyebrow: "Bypass",
        title: "One tap back to the untouched file",
        body: "Bypass is a hard bypass. The EQ leaves the signal path entirely and the badge returns to Bit-perfect, so you can A and B your curve against the original without wondering whether something is still running.",
        note: "While bypassed the engine is bit-exact again, and the indicator says so.",
      },
    ],
    cta: {
      title: "Set a curve and forget the phone is there.",
      body: "All seven filter shapes and the hard bypass, on any output the app can reach.",
    },
  },

  library: {
    lede: "Internal storage, MicroSD and USB OTG drives, indexed on the device. Tags and artwork are read straight from the file itself, not guessed from its name.",
    summary: [
      { label: "Views", value: "8" },
      { label: "Sources", value: "Internal, SD, OTG" },
      { label: "Formats decoded", value: "15" },
      { label: "Search", value: "Instant, offline" },
    ],
    screenTitle: "Library",
    beats: [
      {
        eyebrow: "Views",
        title: "Eight ways into the same collection",
        body: "Sources, Recent, Favourites, Playlists, Albums, Artists, Tracks and Genres. The Sources view walks your real directory tree rather than flattening it, which matters if you have spent years organising it yourself.",
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
        title: "Nothing is looked up anywhere",
        body: "The index is built on the phone, from the files you already have. Search your whole collection by title, performer or album and it answers instantly, because the question never leaves the phone: no catalogue service, no scraping, no account.",
      },
      {
        eyebrow: "Formats",
        title: "Fifteen formats, including the ones other players give up on",
        // Corrected against AudioMimeTypes.kt (EXTENSION_TO_MIME,
        // DECODE_REQUIRED_EXTENSIONS): the shipping decoder covers 18 formats,
        // but this page advertises 15. Dolby Digital, AC3, E-AC3, DTS and WMA
        // are decoded but deliberately not named here: Dolby and DTS license
        // their decoders, so advertising them would imply a licence this build
        // may not hold. SACD ISO is listed as "DSD disc images" instead, since
        // SACD is a Sony/Philips trademark for the same thing. Do not add the
        // five back; see CONTENT.md and PRODUCT.md, "Format Decoding".
        body: "DSD disc images, Monkey's Audio, WavPack and TAK sit alongside FLAC, ALAC, WAV, AIFF, DSD, True Audio, Musepack, Opus, Vorbis, MP3 and AAC: the awkward formats a real archive still has, not just the easy ones. Tags and embedded artwork are read straight out of the file itself, even when it has been renamed or the extension is wrong.",
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
          { label: "Vorbis" },
          { label: "MP3" },
          { label: "AAC" },
        ],
      },
      {
        eyebrow: "Playlists",
        title: "It reads the playlists you already have",
        body: "Import covers M3U, M3U8, PLS, XSPF, ASX and CUE, and it recognises the format even when a file arrives without a usable extension. A playlist you build here stays here: export is not built yet, and the app says so upfront.",
        note: "Import only. Export is not built yet, and the app tells you plainly.",
      },
    ],
    cta: {
      title: "Point it at a folder and it does the rest.",
      body: "No account, no upload, no wait. Included with everything else.",
    },
  },

  casting: {
    lede: "Send audio to a renderer on your network, or turn the phone into a receiver that four different systems can play into.",
    summary: [
      { label: "Receiver protocols", value: "4" },
      { label: "Modes", value: "Sender and receiver" },
      { label: "Receiver ceiling", value: "384 kHz / 24-bit" },
      { label: "DLNA path", value: "Byte-exact" },
    ],
    screenTitle: "Cast",
    beats: [
      {
        eyebrow: "Sending",
        title: "Cast to anything that speaks UPnP",
        body: "Any DLNA renderer on your network shows up in the picker: a network streamer, a smart TV, a wireless speaker. Where the renderer accepts the file as it is, nothing gets re-encoded on the way out. Where it does not, the app negotiates a format it can play, and tells you which of the two happened.",
      },
      {
        eyebrow: "Receiving",
        title: "Four ways to play into it",
        body: "Receiver mode is not one door but four, each one switchable on its own: a DLNA renderer for any UPnP controller, an FCast receiver, an MPD server, and a classic network player. Whatever already controls your library can play into the phone, with your DAC on the end of it.",
        chips: [
          { label: "DLNA MediaRenderer", active: true },
          { label: "FCast" },
          { label: "MPD server" },
          { label: "Classic network player" },
        ],
      },
      {
        eyebrow: "Volume",
        title: "In bit-perfect mode, nothing touches the level",
        body: "There is no software gain stage in the bit-perfect path, so an incoming volume command is declined rather than applied. Refusing to attenuate is the only way to stay bit-exact, and the app would rather report full volume than quietly throw bits away.",
      },
      {
        eyebrow: "Honesty",
        title: "It tells you when it had to convert",
        body: 'The badge reads either "Sent unchanged, receiver supports this format" or the exact conversion it had to make. A claim of untouched audio is worth nothing unless the app also admits the times it could not manage it.',
        note: "Sent unchanged, receiver supports this format.",
      },
    ],
    cta: {
      title: "Your whole house, at the original rate.",
      body: "Send it to the big speakers, or let the phone become the endpoint.",
    },
  },

  dsp: {
    lede: "For the sessions where you are not chasing bit-exactness. Every module is optional, bit-perfect lock takes all of them out of the path at once, and turning on the AI Enhancer switches the whole rack off rather than stacking with it.",
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
        title: "Take the edge off a long headphone session",
        body: "Headphones put each channel into one ear with no crossover, which is not how a room works and is a large part of why long sessions tire you. Crossfeed bleeds a little of each channel into the other. Three models: Meier at 650 Hz for the gentlest bleed, Chu Moy at 700 Hz for most recordings, and the BS2B circuit for the most speaker-like result.",
        chips: [
          { label: "Meier, 650 Hz", active: true },
          { label: "Chu Moy, 700 Hz" },
          { label: "BS2B" },
        ],
      },
      {
        eyebrow: "Loudness",
        title: "A mixed queue at one level",
        body: "ReplayGain reads the gain your files were already tagged with, per track or per album, and evens out a queue built from different masters by adjusting level rather than compressing dynamics. A quiet record stays a quiet record; it just starts in the right place.",
        chips: [
          { label: "Track" },
          { label: "Album", active: true },
          { label: "Auto" },
        ],
      },
      {
        eyebrow: "Character",
        title: "Eight voicings, and no claim they are measured",
        body: "Harmonic Tuning is a saturation stage with eight voicings, for when you want a little of the character a valve stage adds rather than a flat wire. Four are grounded in documented tube data. The other four are careful engineering extrapolations named after classic tubes, and the app names which is which rather than letting a guess pass as a measurement.",
        note: "Four of the eight are backed by documented tube data. The app tells you which four, on principle.",
      },
      {
        eyebrow: "Protection",
        title: "A guard your DAC will thank you for",
        body: "Lossy decoders produce peaks that hide between samples, peaks that clip in the converter even though no single sample looks too loud. The limiter oversamples four times to find them, holds a ceiling of -0.6 dBTP, and switches itself on automatically whenever another stage runs that could create them.",
        stats: [
          { label: "Ceiling", value: "-0.6 dBTP" },
          { label: "Oversampling", value: "4x" },
        ],
      },
    ],
    cta: {
      title: "Every module, and a way back to nothing.",
      body: "Crossfeed, ReplayGain and the true-peak guard, each one switchable on its own.",
    },
  },

  "usb-dac": {
    lede: "Android routes every stream through a system mixer that forces 48 kHz and truncates to 16-bit. Bitperfect opens the USB audio device itself, in exclusive mode, and locks your DAC to the file's own clock.",
    summary: [
      { label: "Max PCM", value: "32-bit / 768 kHz" },
      { label: "DSD", value: "DSD64 to DSD512" },
      { label: "Protocol", value: "UAC1 and UAC2" },
      { label: "Android resampling", value: "0%" },
    ],
    screenTitle: "Now Playing",
    beats: [
      {
        eyebrow: "Exclusive mode",
        title: "Your DAC answers to one app at a time",
        body: "Bitperfect takes the USB audio device in exclusive mode, so a notification chime cannot duck your track, and the OS cannot quietly re-open the stream at its own preferred rate halfway through an album.",
      },
      {
        eyebrow: "Rate switching",
        title: "The clock follows the file, not the phone",
        body: "A 44.1 kHz track followed by a 192 kHz one switches the hardware rate between them rather than resampling either to meet in the middle. Native DSD and DoP are both handled, up to DSD512.",
        stats: [
          { label: "PCM", value: "up to 768 kHz" },
          { label: "Bit depth", value: "16, 24 and 32" },
          { label: "DSD", value: "DoP and native" },
        ],
      },
      {
        eyebrow: "Hardware",
        title: "Dongles and desktop DACs, same path",
        body: "Any USB-C or Micro-USB OTG DAC that speaks UAC1 or UAC2 works, from a pocket dongle to a desk unit. Where the DAC has its own hardware volume control, Bitperfect drives that control directly rather than attenuating in software and throwing bits away.",
      },
      {
        eyebrow: "Honesty",
        title: "The badge tells the truth, always",
        body: "Bit-perfect is reserved for an unaltered stream to an external DAC. Turn on the EQ or the AI Enhancer and it changes to Enhanced. Fall back to the internal output and it says so. Five states, each meaning exactly one thing.",
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
        title: "Two ways to carry a DSD stream, and it picks the right one",
        body: "DSD64 through DSD512, sent natively where the DAC accepts it, or as DoP where it does not. The choice is made from what the device reports, not from a setting you have to understand, and neither path ever converts the stream down to ordinary PCM.",
        stats: [
          { label: "Range", value: "DSD64 to DSD512" },
          { label: "Transport", value: "Native or DoP" },
        ],
      },
    ],
    cta: {
      title: "Plug in a DAC and hear the difference.",
      body: "Bit-perfect USB output, in the same subscription as everything else on this site.",
    },
  },

  "ai-enhancer": {
    lede: "The enhancer reconstructs the upper band, roughly 14 to 22 kHz, on 44.1 and 48 kHz material, entirely on your phone's own neural chip.",
    summary: [
      { label: "Reconstructs", value: "14 to 22 kHz" },
      { label: "Works on", value: "44.1 and 48 kHz" },
      { label: "Runs on", value: "Neural chip" },
      { label: "Works offline", value: "Yes" },
    ],
    screenTitle: "AI Enhancer",
    beats: [
      {
        eyebrow: "What it does",
        title: "In-band reconstruction, not invention",
        body: "It rebuilds amplitude and phase inside the band the file already occupies, around 14 to 22 kHz, at the same sample rate. It does not synthesise ultrasonic content that was never recorded, and it will not turn a 128 kbps MP3 into a master.",
        stats: [
          { label: "Band", value: "14 to 22 kHz" },
          { label: "Rates", value: "44.1 and 48 kHz" },
        ],
      },
      {
        eyebrow: "Where it runs",
        title: "On your phone, or not at all",
        body: "It runs entirely on your phone's own neural chip. Nothing is uploaded and nothing is asked of the network while it plays. The model downloads once, the first time you switch the feature on, and after that it works with the radio off.",
      },
      {
        eyebrow: "Hardware",
        title: "No fallback, and that is deliberate",
        body: "There are two settings: off, and the neural chip. There is no fallback path and no automatic guessing. On a phone without the hardware the feature is simply not offered, which is a better answer than one that stutters.",
        chips: [{ label: "Off" }, { label: "Neural chip (NPU)", active: true }],
      },
      {
        eyebrow: "Honesty",
        title: "The badge stops saying bit-perfect",
        body: "The moment the enhancer touches a sample, the signal indicator changes to Enhanced. It is DSP, it is doing something, and the app says so rather than letting a purity claim stand that is no longer true. Turning it on also switches the whole effects rack off: only one of the two can run at a time, and every affected row tells you why it went quiet.",
        note: "Unavailable while AI Enhance is on: the two do not stack, so switching one on switches the other off.",
      },
    ],
    cta: {
      title: "The AI is not an add-on.",
      body: "It is in the same subscription as everything else on this site.",
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
