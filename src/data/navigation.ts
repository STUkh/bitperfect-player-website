import { useTranslations, type UIKey } from "../i18n/utils";

export const navLinks = [
  { label: "Features", href: "/features" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

export const featureRoutes = [
  { slug: "usb-dac", name: "Direct USB DAC output" },
  { slug: "eq", name: "32-band parametric EQ" },
  { slug: "library", name: "Local lossless library" },
  { slug: "casting", name: "Two-way streaming" },
  { slug: "dsp", name: "DSP rack" },
  { slug: "ai-enhancer", name: "AI Enhancer" },
] as const;

export type FeatureSlug = (typeof featureRoutes)[number]["slug"];

export const featureName = (slug: string, lang?: string): string =>
  getLocalizedFeatureName(slug, lang);

export const getLocalizedFeatureName = (slug: string, lang?: string): string => {
  const t = useTranslations(lang);
  const key = `feature.${slug}.title` as UIKey;
  const translated = t(key);
  return translated && translated !== key ? translated : featureRoutes.find((r) => r.slug === slug)?.name ?? slug;
};

export const featureRouteLinks = featureRoutes.map((r) => ({
  label: r.name,
  href: `/features/${r.slug}`,
}));

export const getLocalizedFeatureRouteLinks = (lang?: string) =>
  featureRoutes.map((r) => ({
    label: getLocalizedFeatureName(r.slug, lang),
    href: `/features/${r.slug}`,
  }));

export const getLocalizedNavLinks = (lang?: string) => {
  const t = useTranslations(lang);
  return navLinks.map((link) => {
    const slug = link.label.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    const key = `nav.${slug}` as UIKey;
    const translated = t(key);
    return {
      ...link,
      label: translated && translated !== key ? translated : link.label,
    };
  });
};

export const footerLinks = {
  features: {
    title: "Features",
    href: "/features",
    links: [
      { label: "Direct USB DAC", href: "/features/usb-dac" },
      { label: "32-band parametric EQ", href: "/features/eq" },
      { label: "DSP rack and crossfeed", href: "/features/dsp" },
      { label: "Local lossless library", href: "/features/library" },
      { label: "Casting and receiver mode", href: "/features/casting" },
      { label: "On-device AI Enhancer", href: "/features/ai-enhancer" },
      { label: "27 technical capabilities", href: "/features/catalog" },
    ],
  },
  faq: {
    title: "FAQ",
    href: "/faq",
    links: [
      { label: "AI Enhancer and neural chips", href: "/faq/why-npu-ai-enhancer-not-working" },
      { label: "How direct USB output works", href: "/faq#direct-hardware-bypass" },
      { label: "External USB DAC setup", href: "/faq#need-external-dac" },
      { label: "Supported audio formats", href: "/faq#supported-audio-formats" },
      { label: "All questions", href: "/faq" },
    ],
  },
  legal: {
    title: "Legal and support",
    href: "/privacy",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of use", href: "/terms" },
      { label: "Email support", href: "mailto:support@bit-perfect.com" },
      {
        label: "Get it on Google Play",
        href: "https://play.google.com/store/apps/details?id=com.bitperfect.player",
      },
    ],
  },
} as const;
