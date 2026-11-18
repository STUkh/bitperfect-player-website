/**
 * Single source for external links and product constants.
 * Sourced from src/content/settings/site.json with full backwards compatibility.
 */
import siteSettings from "../content/settings/site.json";
import { type SignalStateKey } from "./colors";
import { useTranslations, type UIKey } from "../i18n/utils";

export const site = {
  name: siteSettings.name,
  tagline: siteSettings.tagline,

  /** Confirmed by the user as the primary CTA target. */
  playUrl: siteSettings.playUrl,

  /** PLACEHOLDER: the Cloudflare R2 direct-APK path. Replace with the real URL. */
  apkUrl: siteSettings.apkUrl as string | null,

  /**
   * Gates the Apple App Store badge in StoreBadges.astro: same null-until-supplied
   * pattern as apkUrl. The product is Android-only today, so this stays null; the
   * badge is built and ready but renders nothing until a real URL lands here.
   */
  appStoreUrl: siteSettings.appStoreUrl as string | null,

  /**
   * Maintenance mode for the front door: while true, `/` shows the holding page
   * ("The needle is still up.") instead of the landing. Every other route builds as
   * usual, and the landing stays whole at /preview/home in dev. Set to false to
   * bring the landing back.
   */
  holding: siteSettings.holding,

  /** Official contact address for support and privacy inquiries. */
  contactEmail: siteSettings.contactEmail,

  minAndroid: siteSettings.minAndroid,
  minSdk: siteSettings.minSdk,

  /** Official social and community channels. */
  socials: siteSettings.socials,
};

/**
 * Route list for anything that renders a bare product nav. Kept in step with
 * `src/data/navigation.ts`: the home page carries no technical sections any more, so
 * the old `#engine`, `#ai` and `#faq` fragments are gone and the depth lives on the
 * feature routes.
 */
export const nav = siteSettings.nav;

/**
 * Subscription: ONE plan, ONE term (annual: $29.95 standard / $19.95 Welcome Offer).
 * The app is subscription only. There is no free tier, no higher tier and nothing switched
 * off to sell an upgrade, so the subscription gates the whole product rather than an add-on.
 * Purchases happen in-app through Google Play billing; the site only informs.
 */
export const pro = siteSettings.pro;

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
 * runs on the neural chip only.
 */
export const compatibility = siteSettings.compatibility;

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

/**
 * Signal-path vocabulary. FIVE states, because five is all the app can produce:
 * `SignalQuality.kt` declares exactly these and `signalQualityColor()` maps exactly
 * these.
 */
export const signalStates: {
  id: SignalStateKey;
  label: string;
  desc: string;
  token: string;
  glyph: string;
}[] = siteSettings.signalStates as {
  id: SignalStateKey;
  label: string;
  desc: string;
  token: string;
  glyph: string;
}[];
