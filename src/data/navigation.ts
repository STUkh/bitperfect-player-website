/**
 * Header nav. The home page carries no technical sections any more (DESIGN.md's
 * information architecture: hero, statement band, features teaser, privacy band,
 * pricing, closing CTA), so `#showcase`, `#ai` and `#faq` were dead fragments and are
 * gone. The technical depth lives on `/features` and the six feature routes.
 */
export const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Privacy', href: '/privacy' },
] as const;

/**
 * THE name of each feature, and the order the six run in everywhere.
 *
 * The label a visitor clicks is the label they land on. Five separate lists used
 * to name these routes — this one, `src/data/features.ts`, the breadcrumb in
 * `src/components/feature/content.ts`, the rows in `src/pages/features/index.astro`
 * and the teaser on the home page — and five of the six features answered to
 * three or four different names across them. The DSP route was `DSP rack` in the
 * footer, `Studio DSP` on the home page and `Studio-grade 64-bit DSP engine` on
 * its own breadcrumb; the AI Enhancer was `AI Enhancer` in every navigation
 * surface and `Real-time neural signal restoration` on the page it led to.
 *
 * Long-form descriptions still live per surface. The NAME does not: it lives
 * here, and everything that names a route reads `featureName()`.
 */
export const featureRoutes = [
  { slug: 'usb-dac', name: 'Direct USB DAC output' },
  { slug: 'eq', name: '32-band parametric EQ' },
  { slug: 'library', name: 'Local lossless library' },
  { slug: 'casting', name: 'Bi-directional streaming' },
  { slug: 'dsp', name: 'Studio-grade DSP rack' },
  { slug: 'ai-enhancer', name: 'AI Enhancer' },
] as const;

export type FeatureSlug = (typeof featureRoutes)[number]['slug'];

/** The canonical name, by slug. Falls back to the slug rather than throwing. */
export const featureName = (slug: string): string =>
  featureRoutes.find((r) => r.slug === slug)?.name ?? slug;

/** The six feature routes, in the order they run on `/features`. */
export const featureRouteLinks = featureRoutes.map((r) => ({
  label: r.name,
  href: `/features/${r.slug}`,
}));

export const footerLinks = {
  features: {
    title: 'Features',
    links: [
      ...featureRouteLinks,
      { label: 'All features', href: '/features' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { label: 'Contact Support', href: 'mailto:support@bit-perfect.com' },
    ],
  },
  /**
   * Two documents, not one. The privacy policy used to carry the Terms of Use
   * inside it — a visitor looking for the subscription terms had to read a data
   * policy to find them, and a store review looking for a terms URL had none to
   * point at. They are separate routes now and both are listed here.
   */
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.bitperfect.player' },
    ],
  },
} as const;
