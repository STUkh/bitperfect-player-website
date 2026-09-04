/**
 * Single source for external links and product constants.
 * Anything marked PLACEHOLDER is on the user's replacement list.
 */
import { signalStateColors, type SignalStateKey } from "./colors";

export const site = {
  name: "Bitperfect Player",
  packageId: "com.bitperfect.player",
  tagline: "Bit-perfect Hi-Res audio with on-device AI",

  /** Confirmed by the user as the primary CTA target. */
  playUrl:
    "https://play.google.com/store/apps/details?id=com.bitperfect.player",

  /** PLACEHOLDER: the Cloudflare R2 direct-APK path. Replace with the real URL. */
  apkUrl: null as string | null,

  /**
   * Gates the Apple App Store badge in StoreBadges.astro: same null-until-supplied
   * pattern as apkUrl. The product is Android-only today, so this stays null; the
   * badge is built and ready but renders nothing until a real URL lands here.
   */
  appStoreUrl: null as string | null,

  /** Official contact address for support and privacy inquiries. */
  contactEmail: "support@bit-perfect.com",

  minAndroid: "8.0",
  minSdk: 26,
};

/**
 * Route list for anything that renders a bare product nav. Kept in step with
 * `src/data/navigation.ts`: the home page carries no technical sections any more, so
 * the old `#engine`, `#ai` and `#faq` fragments are gone and the depth lives on the
 * feature routes.
 */
export const nav = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Privacy", href: "/privacy" },
];

/**
 * Subscription: ONE plan, ONE term (annual, $35). The app is subscription only. There is
 * no free tier, no higher tier and nothing switched off to sell an upgrade, so the
 * subscription gates the whole product rather than an add-on. Purchases happen in-app
 * through Google Play billing; the site only informs. Prices are user-confirmed
 * (2026-08-28). Keep in lockstep with Play Console prices.
 *
 * The site renders ONE card and no selector, because there is one term to select.
 * `defaultPeriodId` names the term every surface looks up. The price, the term and
 * the 7-day trial here must match `src/TERMS_OF_USE.md` §4 and the Play Console
 * offer; the Terms are the published statement of them.
 */
export const pro = {
  /** Used in the structured-data offer name. There is no tier to name any more. */
  name: "Bitperfect Player",
  currency: "USD",
  /**
   * The only term there is. Kept as a named id (rather than inlined) because every
   * surface that states the price looks the term up by id, and a second term can be
   * added back here without touching a component.
   */
  defaultPeriodId: "yearly",
  /**
   * ONE term. The app sells exactly one thing.
   *
   * This array held three terms (3 months $15, 6 months $25, 12 months $35) until
   * 2026-08-31. It was cut to one after the app source was checked: the subscription
   * gate builds its offer with `buildAnnualGateOffer()`, which takes the ANNUAL
   * package off the store offering and nothing else, and `SubscriptionGateOffer.kt`
   * says so in a comment. A site that advertises a 3-month price a buyer cannot
   * reach at the till is worse than a site with one price on it, and on a store
   * listing it is the kind of mismatch that draws a policy complaint.
   *
   * It stays an ARRAY, not a flattened object, so the pricing card, the FAQ cost
   * answer and the structured data all keep reading it the same way. Adding a term
   * back is a data change here, not a component change.
   *
   * `perMonth` is DERIVED and written out so the markup never does arithmetic:
   * 35 / 12 = 2.92.
   *
   * This read $11.99 for part of 2026-09-01 and that was WRONG. The figure came
   * off a debug build's subscription gate, which is not the production store:
   * `RevenueCatManager` lets a debuggable build fall back to a hardcoded
   * `test_`-prefixed key, and a `test_` key runs RevenueCat's Simulated Test
   * Store against a SEPARATE project with its own catalogue. That sandbox is
   * also where the three products and the missing trial came from. **Reading a
   * price off a debug build proves nothing about the Play Console.** `saves` is null because with one term there is nothing to
   * compare against, and an invented "save 42%" against a term we no longer sell
   * would be a fabricated discount.
   */
  periods: [
    {
      id: "yearly",
      label: "12 months",
      short: "12 mo",
      price: 35,
      per: "year",
      months: 12,
      perMonth: "2.92",
      saves: null as string | null,
      best: true,
    },
  ],
  /**
   * The introductory free trial, CONFIRMED by the user on 2026-08-31 and published.
   *
   * The app does not hard-code a duration: it reads the free phase off the store
   * offering at runtime (`SubscriptionGateOffer.kt`, `freePhase`) and renders
   * "Try Bitperfect Player free for 7 days". So this number is the Play Console
   * offer's number, mirrored here for the site, and the two have to move together.
   * `src/TERMS_OF_USE.md` states the same 7 days.
   *
   * Eligibility is the store's call, roughly one trial per store account, so no copy
   * anywhere may promise a trial to a specific visitor. Every string built off this
   * value is written to survive a returning customer who is offered none.
   * Setting it back to `null` must silence every trial mention on the site.
   */
  trialDays: 7 as number | null,
  /**
   * What the subscription covers. The whole app, not an add-on: every entry here
   * ships to every subscriber and nothing is withheld for a tier that does not exist.
   * Keep the `AI Enhancer` entry named exactly that: it is the name the feature
   * route, the nav and the app all use, and `src/data/features.ts` keys off it.
   */
  unlocks: [
    {
      name: "Every feature, no tiers",
      desc: "Bit-perfect USB output, the 32-band parametric EQ, the DSP rack, the local library, casting and receiver mode. One subscription carries all of it.",
    },
    {
      name: "AI Enhancer",
      desc: "Optional on-device restoration for 44.1 and 48 kHz material, running on your phone's neural chip. Off by default, and only offered on phones that support it.",
    },
    {
      name: "Sonic Scan and Similar Tracks",
      desc: "On-device analysis of your library to find similar tracks and build a queue that flows, entirely offline. Your subscription funds the independent development behind it.",
    },
  ],
  /**
   * The fine print, and only what the card does not already say. The renewal
   * sentence under the button carries term, amount and exit, so the three
   * disclosure lines that repeated it are gone: what is left is the currency
   * caveat and the fact that no money changes hands on this site.
   */
  disclosures: [
    "Prices in USD. Google Play sets the local equivalent.",
    "Purchased in the app through Google Play billing. This site takes no payment and collects no card details.",
  ],
};

/**
 * Compatibility tiers. The core engine runs on any supported phone; the AI Enhancer
 * runs on the neural chip only. The enhancer's GPU tier, its vector-CPU tier
 * and the Auto mode that depends on the GPU are all disabled in shipping builds, so a
 * shipping enhancer picker holds exactly two entries: Off, and Neural chip.
 */
export const compatibility = [
  {
    id: "player",
    what: "Playback and processing",
    /* Four middots on one line read as a spec strip rather than as a sentence.
       The neighbouring rows are written as prose; this one now is too. */
    scope: "Playback, bit-perfect USB, EQ, casting and the DSP rack",
    devices: "Every phone on Android 8.0 or newer",
    note: "One download covers every supported phone.",
    level: "universal",
  },
  {
    id: "ai-library",
    what: "Sonic Scan and Similar Tracks",
    scope: "Local library analysis and acoustic similarity",
    devices: "Every phone on Android 8.0 or newer",
    note: "Runs on any phone's processor. No special chip and no network connection needed.",
    level: "universal",
  },
  {
    id: "ai-enhancer",
    what: "AI Enhancer",
    scope: "Real-time restoration of 44.1 and 48 kHz material",
    devices: "Phones with a neural chip",
    note: "This is the one feature that needs a neural chip. The app checks your phone first and only offers it where it can run in real time.",
    level: "npu",
  },
];

/*
  `screens` and `formats` used to sit here and were imported by nothing.

  `screens` listed six captioned screenshot slots for a carousel this site no
  longer has: the screens are DRAWN now, in src/components/feature/screens/, and
  each carries its own caption. `formats` listed the twelve decoded formats,
  which the library route states in prose and again as twelve chips
  (src/components/feature/content.ts). Both were a second copy of something
  already rendered somewhere else, which is the only kind of copy that can drift.
*/

/**
 * Signal-path vocabulary. FIVE states, because five is all the app can produce:
 * `SignalQuality.kt` declares exactly these and `signalQualityColor()` maps exactly
 * these. Lossless and Hi-res are declared colour tokens with no enum mapping and are
 * deliberately absent, see `unmappedAppTokens` in `./colors`.
 *
 * `id` doubles as the `sig-*` icon name and as the key into `accentColors`.
 */
export const signalStates: {
  id: SignalStateKey;
  label: string;
  desc: string;
  token: string;
  glyph: string;
}[] = [
  {
    id: "bitperfect",
    label: signalStateColors.bitperfect.label,
    desc: "Untouched to an external USB DAC",
    token: signalStateColors.bitperfect.token,
    glyph: signalStateColors.bitperfect.glyph,
  },
  {
    id: "enhanced",
    label: signalStateColors.enhanced.label,
    desc: "EQ, the DSP rack or the AI Enhancer is altering samples",
    token: signalStateColors.enhanced.token,
    glyph: signalStateColors.enhanced.glyph,
  },
  {
    id: "resampled",
    label: signalStateColors.resampled.label,
    desc: "Rate or bit depth converted en route",
    token: signalStateColors.resampled.token,
    glyph: signalStateColors.resampled.glyph,
  },
  {
    id: "lossy",
    label: signalStateColors.lossy.label,
    desc: "Compressed source",
    token: signalStateColors.lossy.token,
    glyph: signalStateColors.lossy.glyph,
  },
  {
    id: "unknown",
    label: signalStateColors.unknown.label,
    desc: "The path cannot be established, so nothing is claimed",
    token: signalStateColors.unknown.token,
    glyph: signalStateColors.unknown.glyph,
  },
];
