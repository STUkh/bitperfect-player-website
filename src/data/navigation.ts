/**
 * Header nav, WHILE THE SITE IS PARKED behind the holding page.
 *
 * It read `Features` (`/features`), `Pricing` (`/#pricing`) and `Privacy`
 * (`/privacy`). The first two point at routes that no longer build: the home
 * page is `src/pages/_index.astro` and the six feature routes are
 * `src/pages/_features/`, and Astro does not route a path with a leading
 * underscore. A header offering two 404s is worse than a header offering
 * nothing, so this is cut to the two documents that are still served.
 *
 * The holding page itself carries none of this: it has its own bar, and its own
 * pair of links. This list exists for `/privacy` and `/terms`, which still run
 * the full site chrome.
 *
 * TO BRING THE SITE BACK: restore the three entries above alongside these two,
 * and restore the `features` column in `footerLinks` at the foot of this file.
 */
export const navLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
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
  { slug: "usb-dac", name: "Direct USB DAC output" },
  { slug: "eq", name: "32-band parametric EQ" },
  { slug: "library", name: "Local lossless library" },
  { slug: "casting", name: "Bi-directional streaming" },
  { slug: "dsp", name: "Studio-grade DSP rack" },
  { slug: "ai-enhancer", name: "AI Enhancer" },
] as const;

export type FeatureSlug = (typeof featureRoutes)[number]["slug"];

/** The canonical name, by slug. Falls back to the slug rather than throwing. */
export const featureName = (slug: string): string =>
  featureRoutes.find((r) => r.slug === slug)?.name ?? slug;

/** The six feature routes, in the order they run on `/features`. */
export const featureRouteLinks = featureRoutes.map((r) => ({
  label: r.name,
  href: `/features/${r.slug}`,
}));

/**
 * The `features` column is REMOVED while the site is parked. It listed the six
 * feature routes plus `/features`, seven links, every one of which now resolves
 * to the holding page's 404. `featureRouteLinks` above is kept and still exported
 * because `src/pages/_features/` reads it and comes back with the site; it is
 * simply not rendered anywhere today.
 */
export const footerLinks = {
  support: {
    title: "Support",
    links: [
      { label: "Contact Support", href: "mailto:support@bit-perfect.com" },
    ],
  },
  /**
   * Two documents, not one. The privacy policy used to carry the Terms of Use
   * inside it — a visitor looking for the subscription terms had to read a data
   * policy to find them, and a store review looking for a terms URL had none to
   * point at. They are separate routes now and both are listed here.
   */
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      /* "Google Play", not "Play Store": Google's brand guidelines name the store
         "Google Play" in running text, and using their mark correctly is the point of
         this pass. See CONTENT.md, "Third-party names and trademarks". */
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.bitperfect.player",
      },
    ],
  },
} as const;
