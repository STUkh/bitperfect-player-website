/**
 * Single source for external links and product constants.
 * Anything marked PLACEHOLDER is on the user's replacement list.
 */
import { signalStateColors, type SignalStateKey } from "./colors";
import { useTranslations, type UIKey } from "../i18n/utils";

export const site = {
  name: "Bitperfect Player",
  tagline: "Bit-for-bit audio for your USB DAC. Optional on-device\u00A0AI.",

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

  /**
   * Maintenance mode for the front door: while true, `/` shows the holding page
   * ("The needle is still up.") instead of the landing. Every other route builds as
   * usual, and the landing stays whole at /preview/home in dev. Set to false to
   * bring the landing back.
   */
  holding: true,

  /** Official contact address for support and privacy inquiries. */
  contactEmail: "support@bit-perfect.com",

  minAndroid: "8.0",
  minSdk: 26,

  /** Official social and community channels. */
  socials: [
    {
      id: "telegram",
      label: "Telegram",
      handle: "@bitperfect_player",
      url: "https://t.me/bitperfect_player",
    },
    {
      id: "tiktok",
      label: "TikTok",
      handle: "@bitperfect.player",
      url: "https://www.tiktok.com/@bitperfect.player",
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: "@bit.perfect.player",
      url: "https://www.instagram.com/bit.perfect.player/",
    },
    {
      id: "x",
      label: "X",
      handle: "@bitperfect_p",
      url: "https://x.com/bitperfect_p",
    },
  ] as const,
};

/**
 * Route list for anything that renders a bare product nav. Kept in step with
 * `src/data/navigation.ts`: the home page carries no technical sections any more, so
 * the old `#engine`, `#ai` and `#faq` fragments are gone and the depth lives on the
 * feature routes.
 */
export const nav = [
  { label: "Features", href: "/features" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/**
 * Subscription: ONE plan, ONE term (annual: $29.95 standard / $19.95 Welcome Offer).
 * The app is subscription only. There is no free tier, no higher tier and nothing switched
 * off to sell an upgrade, so the subscription gates the whole product rather than an add-on.
 * Purchases happen in-app through Google Play billing; the site only informs. Prices are
 * updated 2026-10-06 (replacing old $35 / $34.99). Keep in lockstep with Play Console prices.
 *
 * The site renders ONE card and no selector, because there is one term to select.
 * `defaultPeriodId` names the term every surface looks up. The price and the term
 * here must match the Play Console offer. `src/TERMS_OF_USE.md` deliberately states
 * NO price and no trial length: numbers live on this site and in the store, never in
 * the contract, where a stale figure becomes a consumer-law liability.
 */
export const pro = {
  /** Used in the structured-data offer name. There is no tier to name any more. */
  name: "Bitperfect Player",
  currency: "USD",
  /** Offer expiry milestone: Founder rate ends May 31, 2027. */
  founderEndDate: "May 31, 2027",
  founderEndDateIso: "2027-05-31",
  /** Standard annual rate: $29.95 USD / year. */
  standardPrice: 29.95,
  /** Limited Founder offer: $19.95 USD / year locked in forever. */
  welcomePrice: 19.95,
  founderPrice: 19.95,
  /**
   * Two plans model for display: Founder Offer (active until May 31, 2027)
   * and Standard Plan (regular annual rate after May 31, 2027).
   */
  plans: {
    founder: {
      id: "founder",
      name: "Founder offer",
      badge: "FOUNDER OFFER · SUBSCRIBE BY MAY 31, 2027",
      price: 19.95,
      perMonth: "1.66",
      currency: "$",
      endsAt: "May 31, 2027",
      featured: true,
      trialDays: 14,
    },
    standard: {
      id: "standard",
      name: "Standard annual plan",
      badge: "STANDARD ANNUAL PLAN",
      price: 29.95,
      perMonth: "2.50",
      currency: "$",
      activeFrom: "June 1, 2027",
      featured: false,
      trialDays: null,
    },
  },
  /**
   * The only term there is. Kept as a named id (rather than inlined) because every
   * surface that states the price looks the term up by id, and a second term can be
   * added back here without touching a component.
   */
  defaultPeriodId: "yearly",
  /**
   * ONE term. The app sells exactly one thing.
   *
   * Standard Price: $29.95 / year ($2.50/month).
   * Founder Offer / Limited Founder Access: $19.95 / year ($1.66/month).
   *
   * It stays an ARRAY, not a flattened object, so the pricing card, the FAQ cost
   * answer and the structured data all keep reading it the same way. Adding a term
   * back is a data change here, not a component change.
   *
   * `perMonth` is DERIVED and written out so the markup never does arithmetic:
   * 19.95 / 12 = 1.66.
   *
   * `saves` reflects the Founder Offer saving against standard ($10/yr, ~33%).
   */
  periods: [
    {
      id: "yearly",
      label: "12 months",
      short: "12 mo",
      price: 19.95,
      standardPrice: 29.95,
      per: "year",
      months: 12,
      perMonth: "1.66",
      standardPerMonth: "2.50",
      saves: "Save 33%",
      best: true,
    },
  ],
  /**
   * The introductory free trial, CONFIRMED by the user on 2026-08-31 and published.
   *
   * The app does not hard-code a duration: it reads the free phase off the store
   * offering at runtime (`SubscriptionGateOffer.kt`, `freePhase`). So this number is
   * the Play Console offer's number, mirrored here for the site, and the two have to
   * move together. The Terms carry no length: they defer to the store on purpose, so
   * the Play Console is the ONLY authority to reconcile this against.
   *
   * 14 days, confirmed by the owner 2026-09-04 (was 7). One-time, and only for
   * someone who has never had it.
   *
   * Eligibility is the store's call, roughly one trial per store account, so no copy
   * anywhere may promise a trial to a specific visitor. Every string built off this
   * value is written to survive a returning customer who is offered none.
   * Setting it back to `null` must silence every trial mention on the site.
   */
  trialDays: 14 as number | null,
  /**
   * What the subscription covers. The whole app, not an add-on: every entry here
   * ships to every subscriber and nothing is withheld for a tier that does not exist.
   * Keep the `AI Enhancer` entry named exactly that: it is the name the feature
   * route, the nav and the app all use, and `src/data/features.ts` keys off it.
   */
  unlocks: [
    {
      name: "Every feature, no tiers",
      desc: "Bit-perfect USB output, 32-band parametric EQ, DSP rack, local library, casting and receiver mode. One subscription covers all of it.",
    },
    {
      name: "AI Enhancer",
      desc: "Rebuilds high frequencies in 44.1 and 48 kHz files, on your phone. Off by default. Full model on a supported neural chip; Lite mode on other phones.",
    },
    {
      name: "Sonic Scan and Similar Tracks",
      desc: "Finds similar tracks in your library and builds matching queues. Runs offline after a one-time download.",
    },
  ],
  /**
   * The fine print, and only what the card does not already say. The renewal
   * sentence under the button carries term, amount and exit, so the three
   * disclosure lines that repeated it are gone: what is left is the currency
   * caveat and the fact that no money changes hands on this site.
   */
  disclosures: [
    "Prices in USD. Google Play sets the local currency equivalent at checkout.",
    "Purchased in the app through Google Play billing. This site takes no payment and collects no card details.",
    "Five devices included; more devices are a paid in-app add-on.",
    "Cancel during the trial and you pay nothing.",
    "Cancel anytime in Google Play Subscriptions.",
  ],
};

export function getLocalizedProUnlocks(lang?: string) {
  const t = useTranslations(lang);
  return [
    {
      name: t("pricing.unlock_dac_name"),
      desc: t("pricing.unlock_dac_desc"),
    },
    {
      name: t("pricing.unlock_ai_name"),
      desc: t("pricing.unlock_ai_desc"),
    },
    {
      name: t("pricing.unlock_eq_name"),
      desc: t("pricing.unlock_eq_desc"),
    },
  ];
}

export function getLocalizedDisclosures(lang?: string): string[] {
  const t = useTranslations(lang);
  return [
    t("pricing.disclosure_usd"),
    t("pricing.disclosure_inapp"),
    t("pricing.disclosure_devices"),
    t("pricing.disclosure_trial"),
    t("pricing.disclosure_cancel"),
  ];
}

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
    devices: "Android 8.0 or newer",
    note: "Covers supported phones, tablets and DAPs with Google Play Store.",
    level: "universal",
  },
  {
    id: "ai-library",
    what: "Sonic Scan and Similar Tracks",
    scope: "Local library analysis",
    devices: "Android 8.0 or newer",
    note: "Works offline after a one-time model download.",
    level: "universal",
  },
  {
    id: "ai-enhancer",
    what: "AI Enhancer",
    scope: "Rebuilds 14 to 22 kHz band live on 44.1 and 48 kHz files. Off by default.",
    devices: "Android 8.0 or newer, best on a supported neural chip",
    note: "Full model on a supported neural chip; Lite mode on other phones.",
    level: "npu",
  },
];

export function getLocalizedCompatibility(lang?: string) {
  const t = useTranslations(lang);
  return compatibility.map((row) => {
    const idKey = row.id.replace(/-/g, "_");
    const whatKey = `features_index.compat_${idKey}_what` as UIKey;
    const scopeKey = `features_index.compat_${idKey}_scope` as UIKey;
    const devicesKey = `features_index.compat_${idKey}_devices` as UIKey;
    const noteKey = `features_index.compat_${idKey}_note` as UIKey;

    const what = t(whatKey);
    const scope = t(scopeKey);
    const devices = t(devicesKey);
    const note = t(noteKey);

    return {
      ...row,
      what: what && what !== whatKey ? what : row.what,
      scope: scope && scope !== scopeKey ? scope : row.scope,
      devices: devices && devices !== devicesKey ? devices : row.devices,
      note: note && note !== noteKey ? note : row.note,
    };
  });
}

/*
  `screens` and `formats` used to sit here and were imported by nothing.

  `screens` listed six captioned screenshot slots for a carousel this site no
  longer has: the screens are real app captures now (src/data/screens.ts), shown
  by src/components/devices/Phone, and each page writes its own caption. `formats` listed the twelve decoded formats,
  which the library route states in prose and again as twelve chips
  (src/data/feature-pages.ts). Both were a second copy of something
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
    desc: "The AI Enhancer is changing the sound",
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
