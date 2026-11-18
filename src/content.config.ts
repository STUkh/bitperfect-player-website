import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Site Settings Collection (Singleton)
 * Represents site-wide configuration, pricing, URLs, socials, and compatibility.
 */
const settings = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/settings' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    playUrl: z.string().url(),
    apkUrl: z.string().nullable().default(null),
    appStoreUrl: z.string().nullable().default(null),
    holding: z.boolean().default(false),
    contactEmail: z.string().email(),
    minAndroid: z.string(),
    minSdk: z.number(),
    socials: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        handle: z.string(),
        url: z.string(),
      })
    ),
    nav: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        })
      )
      .optional(),
    pro: z.object({
      name: z.string(),
      currency: z.string(),
      founderEndDate: z.string(),
      founderEndDateIso: z.string(),
      standardPrice: z.number(),
      welcomePrice: z.number(),
      founderPrice: z.number(),
      plans: z.object({
        founder: z.object({
          id: z.string(),
          name: z.string(),
          badge: z.string(),
          price: z.number(),
          perMonth: z.string(),
          currency: z.string(),
          endsAt: z.string(),
          featured: z.boolean(),
          trialDays: z.number().nullable(),
        }),
        standard: z.object({
          id: z.string(),
          name: z.string(),
          badge: z.string(),
          price: z.number(),
          perMonth: z.string(),
          currency: z.string(),
          activeFrom: z.string(),
          featured: z.boolean(),
          trialDays: z.number().nullable(),
        }),
      }),
      defaultPeriodId: z.string(),
      periods: z.array(
        z.object({
          id: z.string(),
          label: z.string(),
          short: z.string(),
          price: z.number(),
          standardPrice: z.number(),
          per: z.string(),
          months: z.number(),
          perMonth: z.string(),
          standardPerMonth: z.string(),
          saves: z.string(),
          best: z.boolean(),
        })
      ),
      trialDays: z.number().nullable(),
      unlocks: z.array(
        z.object({
          name: z.string(),
          desc: z.string(),
        })
      ),
      disclosures: z.array(z.string()),
    }),
    compatibility: z
      .array(
        z.object({
          id: z.string(),
          what: z.string(),
          scope: z.string(),
          devices: z.string(),
          note: z.string(),
          level: z.string(),
        })
      )
      .optional(),
    signalStates: z
      .array(
        z.object({
          id: z.string(),
          label: z.string(),
          desc: z.string(),
          token: z.string(),
          glyph: z.string(),
        })
      )
      .optional(),
  }),
});

/**
 * FAQ Collection
 * Structured Q&A items categorized across audio engine, hardware, AI, DSP, battery, and licensing.
 */
const faq = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faq' }),
  schema: z.object({
    id: z.string(),
    category: z.enum(['engine', 'hardware', 'ai', 'dsp', 'battery', 'license']),
    q: z.string(),
    a: z.string(),
    guideUrl: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    order: z.number().optional(),
  }),
});

/**
 * Features Collection
 * Complete feature route definitions, combining technical capabilities and landing page composition.
 */
const features = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/features' }),
  schema: z.object({
    id: z.enum(['eq', 'library', 'casting', 'dsp', 'usb-dac', 'ai-enhancer']),
    slug: z.string(),
    title: z.string(),
    tagline: z.string(),
    badge: z.string(),
    accent: z.string().default('gold'),
    icon: z.string(),
    description: z.string(),
    overview: z.string(),
    facts: z.array(z.string()),
    specs: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ),
    benefits: z.array(
      z.object({
        title: z.string(),
        desc: z.string(),
        icon: z.string().optional(),
      })
    ),
    lede: z.string(),
    summary: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ),
    screenTitle: z.string(),
    beats: z.array(
      z.object({
        eyebrow: z.string(),
        title: z.string(),
        body: z.string(),
        chips: z
          .array(
            z.object({
              label: z.string(),
              active: z.boolean().optional(),
            })
          )
          .optional(),
        stats: z
          .array(
            z.object({
              label: z.string(),
              value: z.string(),
            })
          )
          .optional(),
        note: z.string().optional(),
        signalStates: z.boolean().optional(),
      })
    ),
    cta: z.object({
      title: z.string(),
      body: z.string(),
    }),
    order: z.number().optional(),
  }),
});

/**
 * Block item schema for Pages collection
 * Supports both Keystatic { discriminant, value } structure and { id, type, enabled, props }
 */
const pageBlockSchema = z.union([
  z
    .object({
      discriminant: z.string(),
      value: z.record(z.unknown()),
    })
    .transform((b) => ({
      id: typeof b.value.id === 'string' ? b.value.id : undefined,
      type: b.discriminant,
      enabled: typeof b.value.enabled === 'boolean' ? b.value.enabled : true,
      props: b.value,
    })),
  z.object({
    id: z.string().optional(),
    type: z.string(),
    enabled: z.boolean().default(true).optional(),
    props: z.record(z.unknown()).optional(),
  }),
]);

/**
 * Pages Collection
 * Block-based modular pages, e.g. home page band choreography.
 */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    blocks: z.array(pageBlockSchema),
  }),
});

/**
 * Legal Collection
 * Authoritative legal documents (Privacy Policy, Terms of Use) in Markdown.
 */
const legal = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    effectiveDate: z.string().optional(),
    lastUpdated: z.string().optional(),
  }),
});

/**
 * Guides Collection
 * Guides, blog posts, and troubleshooting tutorials in Markdown.
 */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]).optional(),
    draft: z.boolean().default(false).optional(),
  }),
});

export const collections = {
  settings,
  faq,
  features,
  pages,
  legal,
  guides,
};
