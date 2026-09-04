import { pro, site } from "./site";

/**
 * The questions this site is actually asked.
 *
 * This file was unreachable and was very nearly deleted with the other eighteen
 * dead modules. It earned a different decision for two reasons.
 *
 * The first is that four of its entries are content that exists nowhere else:
 * what leaves the phone, what is in the DSP rack, what the subscription costs and
 * whether the AI works offline. Deleting those would have meant rewriting them
 * later from memory.
 *
 * The second is that it was not inert. Its cost answer still said "$2 per month,
 * $9 for six months, or $12 per year" against a shipping price of $15 / $25 / $35,
 * and it linked to a `#compatibility` section that no longer exists. An unrendered
 * file with wrong prices in it is not an archive, it is a landmine waiting for
 * whoever renders it next.
 *
 * So it is now LIVE and it is the single source: the features index renders every
 * entry, and the cost answer is BUILT from `pro.periods` rather than typed, so it
 * cannot drift from the pricing card again. The answers are cut to the house voice
 * the rest of the redesign uses — no em-dash, ranges use "to", and no claim that
 * anything is free.
 */
export interface FAQItem {
  q: string;
  a: string;
}

/**
 * Built from `pro.periods`, never typed, so the answer cannot drift from the
 * pricing card. The array holds ONE term now (the app sells the annual package
 * alone), and the sort and join are kept rather than flattened so that restoring
 * a second term needs no edit here.
 */
const terms = [...pro.periods]
  .sort((a, b) => a.months - b.months)
  .map((p) => `$${p.price} for ${p.label}`)
  .join(", ");

/**
 * The trial, stated for NEW customers only: eligibility is the store's decision,
 * roughly one per store account, so this answer must not promise it to the person
 * reading. Silences itself when `pro.trialDays` is null.
 */
const trialSentence = pro.trialDays
  ? `, with the first ${pro.trialDays} days free for new customers.`
  : ".";

/**
 * `What does the app send over the internet?` is written against
 * `src/PRIVACY_POLICY.md`, not from memory. It said THREE optional calls; the
 * policy discloses four flows, and two of the three it did name (crash reporting
 * §2.1, artwork lookup §2.6) are ON BY DEFAULT rather than opt-in, while the
 * fourth, the entitlement check of §2.9, is not optional at all in a
 * subscription-only app. When that section of the policy changes, this answer
 * changes with it.
 */
export const faqItems: FAQItem[] = [
  {
    q: "What does bit-perfect actually mean here?",
    a: "The samples reaching your DAC are numerically identical to the ones in the file. Where direct hardware access is not achievable, the app shows the real state instead of claiming otherwise.",
  },
  {
    q: "Do I need an external DAC?",
    a: "No. The phone's own output works too, but it goes through the system mixer, so the bit-perfect badge is reserved for direct USB output to an external DAC.",
  },
  {
    q: "What audio formats does it play?",
    a: "Fifteen. FLAC, ALAC, WAV, AIFF and DSD (DSF and DFF, via DoP or native), plus DSD disc images, Monkey's Audio, WavPack, True Audio, TAK, Musepack, Opus, Ogg Vorbis, MP3 and AAC. If you have an archive full of the formats other players refuse, it will most likely open it.",
  },
  {
    q: "Can I turn off the AI processing?",
    a: "Yes, and it is off by default. Turning it on moves the badge to Enhanced rather than Bit-perfect, because the samples have changed.",
  },
  {
    q: "Will it work on my phone?",
    a: `Android ${site.minAndroid} and newer. Every feature runs on any phone that meets that, except the AI Enhancer, which needs a phone with a neural chip. The app checks for one before offering it.`,
  },
  {
    q: "What does the app send over the internet?",
    a: "Crash diagnostics, artwork, lyrics and headphone-profile lookups, store-backed subscription and integrity checks, protected model downloads, and connections to network sources, streams, plugins or cast targets you choose. The app does not upload your library database, listening history or audio to Bitperfect-operated servers, and it has no ads or listening-profile analytics.",
  },
  {
    q: "What is in the DSP rack?",
    a: "A 32-band parametric EQ with seven filter types, headphone crossfeed in three strengths, ReplayGain read from your file tags, and a true-peak limiter at a -0.6 dBTP ceiling. The whole rack switches off for bit-perfect output.",
  },
  {
    q: "What does it cost?",
    a: `${terms}${trialSentence} One subscription covers the whole app, there is no higher tier, and nothing is switched off to sell you one. Billed through Google Play and cancellable there at any time.`,
  },
  {
    q: "How many devices does the subscription cover?",
    a: "Up to five concurrently registered devices by default. If you need more, optional capacity packs in the app raise the limit in steps of five, up to twenty devices.",
  },
  {
    q: "Do the AI features work offline?",
    a: "After the initial model download, AI processing runs on the phone. The first download and periodic subscription verification require a network connection.",
  },
];
