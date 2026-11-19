import { config, fields, collection, singleton } from '@keystatic/core';
import { block, wrapper } from '@keystatic/core/content-components';

// When running locally in development (`astro dev`), use local filesystem storage.
// In production builds (`astro build` / Cloudflare Pages), use GitHub storage mode.
const isProd = import.meta.env.PROD;

const markdocComponents = {
  callout: wrapper({
    label: 'Callout Note',
    description: 'Highlighted callout banner for notes, tips, warnings, and alerts',
    schema: {
      tone: fields.select({
        label: 'Tone',
        options: [
          { label: 'Note (Neutral info)', value: 'note' },
          { label: 'Tip (Recommendation)', value: 'tip' },
          { label: 'Warning (Cautionary notice)', value: 'warning' },
          { label: 'Caution (Critical warning)', value: 'caution' },
        ],
        defaultValue: 'note',
      }),
      title: fields.text({ label: 'Callout Title (Optional)' }),
    },
  }),
  specBadge: block({
    label: 'Spec / Status Badge',
    description: 'Compact visual badge or tag',
    schema: {
      label: fields.text({ label: 'Badge Label' }),
      tone: fields.select({
        label: 'Color Tone',
        options: [
          { label: 'Gold (Brand Highlight)', value: 'gold' },
          { label: 'Neutral (Monospace Meta)', value: 'neutral' },
          { label: 'Green (Bit-perfect Verified)', value: 'verified' },
        ],
        defaultValue: 'gold',
      }),
    },
  }),
  actionButton: block({
    label: 'Action CTA Button',
    description: 'Interactive button link to download or related page',
    schema: {
      label: fields.text({ label: 'Button Label' }),
      href: fields.text({ label: 'Target URL' }),
      variant: fields.select({
        label: 'Visual Style',
        options: [
          { label: 'Primary (Gold Filled)', value: 'primary' },
          { label: 'Secondary (Subtle Hairline)', value: 'secondary' },
        ],
        defaultValue: 'primary',
      }),
    },
  }),
};

const SCREEN_OPTIONS = [
  { label: 'Now Playing (Hero - Wagner)', value: 'now-playing-hero' },
  { label: 'Now Playing (Handel)', value: 'now-playing' },
  { label: 'Equalizer (Parametric Multi-band)', value: 'eq' },
  { label: 'Equalizer (Presets)', value: 'eq-presets' },
  { label: 'Equalizer (Filters)', value: 'eq-filters' },
  { label: 'DSP Engine Matrix', value: 'dsp' },
  { label: 'DSP Sheet', value: 'dsp-sheet' },
  { label: 'Music Library (Grid)', value: 'library' },
  { label: 'Music Sources & Storage', value: 'sources' },
  { label: 'Track List View', value: 'tracks' },
  { label: 'Album View', value: 'album' },
  { label: 'USB DAC & Direct Path', value: 'output' },
  { label: 'Signal Path (Stages & Latency)', value: 'signal-path' },
  { label: 'Signal Clean (Bit-perfect Verified)', value: 'signal-clean' },
  { label: 'Receiver Mode', value: 'receiver' },
  { label: 'Casting Screen', value: 'cast' },
  { label: 'Track Info & Audio Codecs', value: 'track-info' },
  { label: 'Fidelity Analysis', value: 'fidelity' },
  { label: 'AI Enhancer', value: 'ai-enhancer' },
  { label: 'AI Neural Accelerator', value: 'ai-neural' },
  { label: 'AI Karaoke (Stem Isolation)', value: 'ai-karaoke' },
];

export default config({
  storage: isProd
    ? {
        kind: 'github',
        repo: {
          owner: 'STUkh',
          name: 'bitperfect-player-website',
        },
      }
    : {
        kind: 'local',
      },
  ui: {
    brand: {
      name: 'Bitperfect Studio',
    },
    navigation: {
      'Pages & Layouts': ['pages'],
      'Features & Catalog': ['features', 'catalog'],
      'App Screens & Media': ['media'],
      'Support & Guides': ['faq', 'guides'],
      'Legal & Policies': ['legal'],
      'Global Settings': ['settings', 'neuralChips'],
    },
  },
  singletons: {
    media: singleton({
      label: 'App Screenshots & Media',
      path: 'src/content/settings/media',
      format: { data: 'json' },
      schema: {
        nowPlaying: fields.image({
          label: 'Now Playing Screen (Handel / Mid-track)',
          description: 'Upload replacement for public/screens/now-playing.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        nowPlayingHero: fields.image({
          label: 'Now Playing Hero Screen (Wagner / Fold Hero)',
          description: 'Upload replacement for public/screens/now-playing-hero.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        eq: fields.image({
          label: 'Equalizer Screen (Parametric Multi-band)',
          description: 'Upload replacement for public/screens/eq.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        eqPresets: fields.image({
          label: 'Equalizer Presets Screen',
          description: 'Upload replacement for public/screens/eq-presets.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        eqFilters: fields.image({
          label: 'Equalizer Filters Screen',
          description: 'Upload replacement for public/screens/eq-filters.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        dsp: fields.image({
          label: 'DSP & Audio Effects Screen',
          description: 'Upload replacement for public/screens/dsp.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        dspSheet: fields.image({
          label: 'DSP Effects Sheet Screen',
          description: 'Upload replacement for public/screens/dsp-sheet.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        library: fields.image({
          label: 'Music Library Screen (Album Grid)',
          description: 'Upload replacement for public/screens/library.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        sources: fields.image({
          label: 'Music Sources Screen',
          description: 'Upload replacement for public/screens/sources.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        tracks: fields.image({
          label: 'Track List Screen',
          description: 'Upload replacement for public/screens/tracks.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        album: fields.image({
          label: 'Album View Screen',
          description: 'Upload replacement for public/screens/album.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        output: fields.image({
          label: 'Output / USB DAC Screen',
          description: 'Upload replacement for public/screens/output.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        signalPath: fields.image({
          label: 'Signal Path Screen (Stages & Latency)',
          description: 'Upload replacement for public/screens/signal-path.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        signalClean: fields.image({
          label: 'Signal Clean Screen (Bit-perfect Pure)',
          description: 'Upload replacement for public/screens/signal-clean.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        receiver: fields.image({
          label: 'Receiver Mode Screen',
          description: 'Upload replacement for public/screens/receiver.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        cast: fields.image({
          label: 'Universal Casting Screen',
          description: 'Upload replacement for public/screens/cast.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        trackInfo: fields.image({
          label: 'Track Info & Audio Codecs Screen',
          description: 'Upload replacement for public/screens/track-info.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        fidelity: fields.image({
          label: 'Fidelity & Dynamic Range Screen',
          description: 'Upload replacement for public/screens/fidelity.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        aiEnhancer: fields.image({
          label: 'AI Enhancer Screen',
          description: 'Upload replacement for public/screens/ai-enhancer.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        aiNeural: fields.image({
          label: 'AI Neural Accelerator Screen',
          description: 'Upload replacement for public/screens/ai-neural.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        aiKaraoke: fields.image({
          label: 'AI Karaoke Screen',
          description: 'Upload replacement for public/screens/ai-karaoke.webp',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
      },
    }),
    settings: singleton({
      label: 'Site Settings',
      path: 'src/content/settings/site',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Site Name', defaultValue: 'Bitperfect Player' }),
        tagline: fields.text({ label: 'Tagline', defaultValue: 'AI Enhanced and Bit-for-bit audio playback' }),
        playUrl: fields.url({ label: 'Google Play URL' }),
        apkUrl: fields.text({ label: 'Direct APK Download URL' }),
        appStoreUrl: fields.text({ label: 'App Store URL' }),
        holding: fields.checkbox({ label: 'Maintenance / Holding Mode' }),
        contactEmail: fields.text({ label: 'Contact Email', defaultValue: 'support@bit-perfect.com' }),
        minAndroid: fields.text({ label: 'Minimum Android Version', defaultValue: '8.0' }),
        minSdk: fields.integer({ label: 'Minimum SDK', defaultValue: 26 }),
        socials: fields.array(
          fields.object({
            id: fields.text({ label: 'ID' }),
            label: fields.text({ label: 'Label' }),
            handle: fields.text({ label: 'Handle' }),
            url: fields.url({ label: 'URL' }),
          }),
          { label: 'Social Channels', itemLabel: (p) => p.fields.label.value || 'Channel' }
        ),
        nav: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({ label: 'Href' }),
          }),
          { label: 'Navigation Links', itemLabel: (p) => p.fields.label.value || 'Link' }
        ),
        footerLinks: fields.object({
          features: fields.object({
            title: fields.text({ label: 'Features Column Title', defaultValue: 'Features' }),
            href: fields.text({ label: 'Features Column URL', defaultValue: '/features' }),
            links: fields.array(
              fields.object({
                label: fields.text({ label: 'Link Label' }),
                href: fields.text({ label: 'Link URL' }),
              }),
              { label: 'Feature Links', itemLabel: (p) => p.fields.label.value || 'Link' }
            ),
          }),
          faq: fields.object({
            title: fields.text({ label: 'FAQ Column Title', defaultValue: 'FAQ' }),
            href: fields.text({ label: 'FAQ Column URL', defaultValue: '/faq' }),
            links: fields.array(
              fields.object({
                label: fields.text({ label: 'Link Label' }),
                href: fields.text({ label: 'Link URL' }),
              }),
              { label: 'FAQ Links', itemLabel: (p) => p.fields.label.value || 'Link' }
            ),
          }),
          legal: fields.object({
            title: fields.text({ label: 'Legal Column Title', defaultValue: 'Legal and support' }),
            href: fields.text({ label: 'Legal Column URL', defaultValue: '/privacy' }),
            links: fields.array(
              fields.object({
                label: fields.text({ label: 'Link Label' }),
                href: fields.text({ label: 'Link URL' }),
              }),
              { label: 'Legal Links', itemLabel: (p) => p.fields.label.value || 'Link' }
            ),
          }),
        }),
        pro: fields.object({
          name: fields.text({ label: 'Product Name', defaultValue: 'Bitperfect Player' }),
          currency: fields.text({ label: 'Currency', defaultValue: 'USD' }),
          founderEndDate: fields.text({ label: 'Founder Offer End Date', defaultValue: 'May 31, 2027' }),
          standardPrice: fields.number({ label: 'Standard Price ($)', defaultValue: 29.95 }),
          welcomePrice: fields.number({ label: 'Welcome / Launch Price ($)', defaultValue: 19.95 }),
          founderPrice: fields.number({ label: 'Founder Price ($)', defaultValue: 19.95 }),
          trialDays: fields.integer({ label: 'Free Trial Days (e.g. 14)', defaultValue: 14 }),
          plans: fields.object({
            founder: fields.object({
              id: fields.text({ label: 'Plan ID', defaultValue: 'founder' }),
              name: fields.text({ label: 'Plan Name', defaultValue: 'Founder offer' }),
              badge: fields.text({ label: 'Plan Badge', defaultValue: 'FOUNDER OFFER · SUBSCRIBE BY MAY 31, 2027' }),
              price: fields.number({ label: 'Price ($)', defaultValue: 19.95 }),
              perMonth: fields.text({ label: 'Price Per Month ($)', defaultValue: '1.66' }),
              currency: fields.text({ label: 'Currency Symbol', defaultValue: '$' }),
              endsAt: fields.text({ label: 'Cutoff Date', defaultValue: 'May 31, 2027' }),
              featured: fields.checkbox({ label: 'Featured Plan', defaultValue: true }),
              trialDays: fields.integer({ label: 'Plan Trial Days', defaultValue: 14 }),
            }),
            standard: fields.object({
              id: fields.text({ label: 'Plan ID', defaultValue: 'standard' }),
              name: fields.text({ label: 'Plan Name', defaultValue: 'Standard annual plan' }),
              badge: fields.text({ label: 'Plan Badge', defaultValue: 'STANDARD ANNUAL PLAN' }),
              price: fields.number({ label: 'Price ($)', defaultValue: 29.95 }),
              perMonth: fields.text({ label: 'Price Per Month ($)', defaultValue: '2.50' }),
              currency: fields.text({ label: 'Currency Symbol', defaultValue: '$' }),
              activeFrom: fields.text({ label: 'Active From Date', defaultValue: 'June 1, 2027' }),
              featured: fields.checkbox({ label: 'Featured Plan', defaultValue: false }),
              trialDays: fields.integer({ label: 'Plan Trial Days' }),
            }),
          }),
          unlocks: fields.array(
            fields.object({
              name: fields.text({ label: 'Feature Name' }),
              desc: fields.text({ label: 'Feature Description', multiline: true }),
            }),
            { label: 'Pro Unlocked Features', itemLabel: (p) => p.fields.name.value || 'Feature' }
          ),
          disclosures: fields.array(
            fields.text({ label: 'Disclosure Sentence' }),
            { label: 'Store Disclosures', itemLabel: (p) => p.value || 'Disclosure' }
          ),
        }),
        compatibility: fields.array(
          fields.object({
            id: fields.text({ label: 'Scope ID' }),
            what: fields.text({ label: 'Component / Hardware' }),
            scope: fields.text({ label: 'Scope' }),
            devices: fields.text({ label: 'Supported Devices / Chips', multiline: true }),
            note: fields.text({ label: 'Technical Note', multiline: true }),
          }),
          { label: 'Compatibility Matrix', itemLabel: (p) => p.fields.what.value || 'Item' }
        ),
        signalStates: fields.ignored(),
      },
    }),
    neuralChips: singleton({
      label: 'Processor & NPU Matrix',
      path: 'src/content/settings/neural-chips',
      format: { data: 'json' },
      schema: {
        liteModeNote: fields.text({
          label: 'Lite Mode Summary Note',
          defaultValue: 'Other phones run AI Enhancer in Lite mode on the main processor.',
        }),
        families: fields.array(
          fields.object({
            id: fields.text({ label: 'Family ID (e.g. snapdragon, dimensity)' }),
            name: fields.text({ label: 'Full Family Name (e.g. Qualcomm Snapdragon)' }),
            shortName: fields.text({ label: 'Short Name (e.g. Snapdragon)' }),
            npuName: fields.text({ label: 'NPU Architecture Name (e.g. Qualcomm Hexagon NPU)' }),
            chips: fields.array(fields.text({ label: 'Chip Model' }), {
              label: 'Supported Chip Models',
              itemLabel: (p) => p.value || 'Chip',
            }),
            examples: fields.array(
              fields.object({
                chip: fields.text({ label: 'Chip' }),
                devices: fields.text({ label: 'Representative Devices' }),
              }),
              {
                label: 'Device Examples',
                itemLabel: (p) => (p.fields.chip.value ? `${p.fields.chip.value}: ${p.fields.devices.value}` : 'Example'),
              }
            ),
          }),
          { label: 'Neural Chip Families', itemLabel: (p) => p.fields.name.value || 'Family' }
        ),
        liteModeGroups: fields.array(
          fields.object({
            chip: fields.text({ label: 'Processor Line' }),
            devices: fields.text({ label: 'Device Examples' }),
          }),
          {
            label: 'Lite Mode Processor Groups',
            itemLabel: (p) => (p.fields.chip.value ? `${p.fields.chip.value}: ${p.fields.devices.value}` : 'Group'),
          }
        ),
        enhancerModes: fields.array(
          fields.object({
            id: fields.text({ label: 'Mode ID' }),
            title: fields.text({ label: 'Mode Title' }),
            body: fields.text({ label: 'Description', multiline: true }),
            needs: fields.text({ label: 'Hardware Requirement' }),
          }),
          { label: 'Enhancer Operational Modes', itemLabel: (p) => p.fields.title.value || 'Mode' }
        ),
        systemRequirements: fields.array(
          fields.object({
            id: fields.text({ label: 'Requirement ID' }),
            label: fields.text({ label: 'Label' }),
            value: fields.text({ label: 'Requirement Value' }),
            note: fields.text({ label: 'Technical Note', multiline: true }),
          }),
          { label: 'System Requirements', itemLabel: (p) => p.fields.label.value || 'Requirement' }
        ),
      },
    }),
  },
  collections: {
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { data: 'json' },
      previewUrl: '/{slug}/',
      schema: {
        title: fields.slug({ name: { label: 'Page Title' } }),
        description: fields.text({ label: 'Page Description', multiline: true }),
        blocks: fields.blocks(
          {
            homeOpening: {
              label: 'Hero: Home Opening',
              schema: fields.object({
                id: fields.text({ label: 'Anchor ID', defaultValue: 'hero' }),
                enabled: fields.checkbox({ label: 'Enabled', defaultValue: true }),
                eyebrow: fields.text({ label: 'Eyebrow', defaultValue: 'Bit-perfect audio playback' }),
                title: fields.text({ label: 'Main Headline', defaultValue: 'Pure sound.' }),
                titleAccent: fields.text({ label: 'Headline Accent (Gold)', defaultValue: 'Nothing in between.' }),
                lede: fields.text({
                  label: 'Lede Subtitle',
                  multiline: true,
                  defaultValue: 'Bypass the system mixer. Send bit-perfect audio straight to your USB DAC.',
                }),
                primaryCtaLabel: fields.text({ label: 'Primary Button Label', defaultValue: 'Get it on Google Play' }),
                secondaryCtaLabel: fields.text({ label: 'Secondary Button Label', defaultValue: 'See what it does' }),
                screensHeading: fields.text({
                  label: 'Phone Showcase Heading',
                  defaultValue: 'Bit-perfect sound with studio-grade control.',
                }),
                leftScreen: fields.select({
                  label: 'Left Phone Screen',
                  defaultValue: 'eq',
                  options: SCREEN_OPTIONS,
                }),
                centerScreen: fields.select({
                  label: 'Center Phone Screen (Hero)',
                  defaultValue: 'now-playing-hero',
                  options: SCREEN_OPTIONS,
                }),
                rightScreen: fields.select({
                  label: 'Right Phone Screen',
                  defaultValue: 'library',
                  options: SCREEN_OPTIONS,
                }),
              }),
            },
            aiPlayer: {
              label: 'Band: AI Player & Neural Modules',
              schema: fields.object({
                id: fields.text({ label: 'Anchor ID', defaultValue: 'ai-player' }),
                enabled: fields.checkbox({ label: 'Enabled', defaultValue: true }),
                backgroundVariant: fields.select({
                  label: 'Background Flow Variant',
                  options: [
                    { label: 'Default / Auto Sequence', value: '' },
                    { label: 'Daylight', value: 'daylight' },
                    { label: 'Walnut', value: 'walnut' },
                    { label: 'Side Light', value: 'side-light' },
                    { label: 'Diagonal Shadow', value: 'diagonal-shadow' },
                  ],
                  defaultValue: '',
                }),
                title: fields.text({ label: 'Headline', defaultValue: 'AI Enhanced Audio Player. ' }),
                titleAccent: fields.text({ label: 'Headline Accent', defaultValue: 'Three on-device neural modules.' }),
                lede: fields.text({
                  label: 'Lede Description',
                  multiline: true,
                  defaultValue:
                    'Running 100% offline on your phone\'s silicon. Real-time high-frequency harmonic restoration, stem isolation, and acoustic timbral matching—engineered with mathematical honesty. No audio ever leaves your phone.',
                }),
                modules: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Module Title' }),
                    description: fields.text({ label: 'Module Description', multiline: true }),
                    note: fields.text({ label: 'Status Note' }),
                    href: fields.text({ label: 'Read More URL (Optional)' }),
                    linkText: fields.text({ label: 'Link Text', defaultValue: 'Read more' }),
                  }),
                  { label: 'Neural Modules', itemLabel: (p) => p.fields.title.value || 'Module' }
                ),
                footnote: fields.text({
                  label: 'Footnote Text',
                  defaultValue: 'Full neural model requires a supported hardware neural accelerator.',
                }),
                compatibilityLabel: fields.text({ label: 'Compatibility Link Text', defaultValue: 'Check compatibility' }),
              }),
            },
            audioEngine: {
              label: 'Band: Audio Engine & 64-bit DSP',
              schema: fields.object({
                id: fields.text({ label: 'Anchor ID', defaultValue: 'audio-engine' }),
                enabled: fields.checkbox({ label: 'Enabled', defaultValue: true }),
                backgroundVariant: fields.select({
                  label: 'Background Flow Variant',
                  options: [
                    { label: 'Default / Auto Sequence', value: '' },
                    { label: 'Daylight', value: 'daylight' },
                    { label: 'Walnut', value: 'walnut' },
                    { label: 'Side Light', value: 'side-light' },
                    { label: 'Diagonal Shadow', value: 'diagonal-shadow' },
                  ],
                  defaultValue: '',
                }),
                title: fields.text({ label: 'Headline', defaultValue: 'Beyond bit-perfect. ' }),
                titleAccent: fields.text({ label: 'Headline Accent', defaultValue: 'Studio sound processing.' }),
                lede: fields.text({
                  label: 'Lede Description',
                  multiline: true,
                  defaultValue:
                    'When you want untouched sound, Bitperfect delivers pure bit-exact transmission. When you want to tailor your listening, our 64-bit audio engine offers precision studio algorithms for uncompromising fidelity.',
                }),
                capabilities: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Algorithm Title' }),
                    specs: fields.text({ label: 'Technical Specs' }),
                    desc: fields.text({ label: 'Description', multiline: true }),
                  }),
                  { label: 'Engine Capabilities', itemLabel: (p) => p.fields.title.value || 'Capability' }
                ),
              }),
            },
            statement: {
              label: 'Band: Statement & Philosophy',
              schema: fields.object({
                id: fields.text({ label: 'Anchor ID', defaultValue: 'statement' }),
                enabled: fields.checkbox({ label: 'Enabled', defaultValue: true }),
                backgroundVariant: fields.select({
                  label: 'Background Flow Variant',
                  options: [
                    { label: 'Default / Auto Sequence', value: '' },
                    { label: 'Daylight', value: 'daylight' },
                    { label: 'Walnut', value: 'walnut' },
                    { label: 'Side Light', value: 'side-light' },
                    { label: 'Diagonal Shadow', value: 'diagonal-shadow' },
                  ],
                  defaultValue: '',
                }),
                title: fields.text({
                  label: 'Headline',
                  defaultValue: 'The system mixer changes your music on the way out. ',
                }),
                titleAccent: fields.text({
                  label: 'Headline Accent (Gold)',
                  defaultValue: 'This app sends it to your USB DAC unchanged.',
                }),
                facts: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Fact Title' }),
                    desc: fields.text({ label: 'Fact Description', multiline: true }),
                  }),
                  { label: 'Facts Stack', itemLabel: (p) => p.fields.title.value || 'Fact' }
                ),
              }),
            },
            featuresTeaser: {
              label: 'Band: Features Grid',
              schema: fields.object({
                id: fields.text({ label: 'Anchor ID', defaultValue: 'features-teaser' }),
                enabled: fields.checkbox({ label: 'Enabled', defaultValue: true }),
                backgroundVariant: fields.select({
                  label: 'Background Flow Variant',
                  options: [
                    { label: 'Default / Auto Sequence', value: '' },
                    { label: 'Daylight', value: 'daylight' },
                    { label: 'Walnut', value: 'walnut' },
                    { label: 'Side Light', value: 'side-light' },
                    { label: 'Diagonal Shadow', value: 'diagonal-shadow' },
                  ],
                  defaultValue: '',
                }),
                title: fields.text({ label: 'Section Title', defaultValue: 'Things it does' }),
                catalogLabel: fields.text({ label: 'Catalog Link Label', defaultValue: 'All features' }),
                items: fields.array(
                  fields.object({
                    slug: fields.select({
                      label: 'Feature Route',
                      options: [
                        { label: 'USB DAC (/features/usb-dac)', value: 'usb-dac' },
                        { label: 'AI Enhancer (/features/ai-enhancer)', value: 'ai-enhancer' },
                        { label: 'Parametric EQ (/features/eq)', value: 'eq' },
                        { label: 'Lossless Library (/features/library)', value: 'library' },
                        { label: 'Network Casting (/features/casting)', value: 'casting' },
                        { label: 'DSP Studio (/features/dsp)', value: 'dsp' },
                      ],
                      defaultValue: 'usb-dac',
                    }),
                    desc: fields.text({ label: 'Card Teaser Description', multiline: true }),
                  }),
                  { label: 'Feature Cards', itemLabel: (p) => p.fields.slug.value || 'Card' }
                ),
              }),
            },
            privacy: {
              label: 'Band: Privacy & Local Audio',
              schema: fields.object({
                id: fields.text({ label: 'Anchor ID', defaultValue: 'privacy' }),
                enabled: fields.checkbox({ label: 'Enabled', defaultValue: true }),
                backgroundVariant: fields.select({
                  label: 'Background Flow Variant',
                  options: [
                    { label: 'Default / Auto Sequence', value: '' },
                    { label: 'Daylight', value: 'daylight' },
                    { label: 'Walnut', value: 'walnut' },
                    { label: 'Side Light', value: 'side-light' },
                    { label: 'Diagonal Shadow', value: 'diagonal-shadow' },
                  ],
                  defaultValue: '',
                }),
                title: fields.text({ label: 'Headline', defaultValue: 'Your listening never leaves the phone.' }),
                commitments: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Commitment Title' }),
                    desc: fields.text({ label: 'Description', multiline: true }),
                  }),
                  { label: 'Commitments', itemLabel: (p) => p.fields.title.value || 'Commitment' }
                ),
                note: fields.text({
                  label: 'Network Call Disclosure Note',
                  multiline: true,
                  defaultValue:
                    'The app goes online for album art, lyrics, AutoEQ profiles, internet radio and subscription checks. Crash reports can be turned off in settings.',
                }),
                policyLinkText: fields.text({ label: 'Privacy Policy Link Text', defaultValue: 'Read the privacy policy' }),
              }),
            },
            pricing: {
              label: 'Band: Pricing & Plans',
              schema: fields.object({
                id: fields.text({ label: 'Anchor ID', defaultValue: 'pricing' }),
                enabled: fields.checkbox({ label: 'Enabled', defaultValue: true }),
                backgroundVariant: fields.select({
                  label: 'Background Flow Variant',
                  options: [
                    { label: 'Default / Auto Sequence', value: '' },
                    { label: 'Daylight', value: 'daylight' },
                    { label: 'Walnut', value: 'walnut' },
                    { label: 'Side Light', value: 'side-light' },
                    { label: 'Diagonal Shadow', value: 'diagonal-shadow' },
                  ],
                  defaultValue: '',
                }),
              }),
            },
            cta: {
              label: 'Band: Closing CTA',
              schema: fields.object({
                id: fields.text({ label: 'Anchor ID', defaultValue: 'cta' }),
                enabled: fields.checkbox({ label: 'Enabled', defaultValue: true }),
                backgroundVariant: fields.select({
                  label: 'Background Flow Variant',
                  options: [
                    { label: 'Default / Auto Sequence', value: '' },
                    { label: 'Daylight', value: 'daylight' },
                    { label: 'Walnut', value: 'walnut' },
                    { label: 'Side Light', value: 'side-light' },
                    { label: 'Diagonal Shadow', value: 'diagonal-shadow' },
                  ],
                  defaultValue: '',
                }),
                title: fields.text({ label: 'Headline', defaultValue: 'Your music, ' }),
                titleAccent: fields.text({ label: 'Headline Accent (Gold)', defaultValue: 'bit for bit.' }),
                lede: fields.text({
                  label: 'Lede Description',
                  defaultValue: 'Install the app from Google Play and plug in your USB DAC.',
                }),
                buttonLabel: fields.text({ label: 'Button Text', defaultValue: 'Get it on Google Play' }),
              }),
            },
            mediaSplit: {
              label: 'Section: Media Split',
              schema: fields.object({
                id: fields.text({ label: 'Section ID' }),
                enabled: fields.checkbox({ label: 'Enabled', defaultValue: true }),
                mediaSide: fields.select({
                  label: 'Media Side',
                  options: [
                    { label: 'Right', value: 'right' },
                    { label: 'Left', value: 'left' },
                  ],
                  defaultValue: 'right',
                }),
                split: fields.select({
                  label: 'Split Ratio',
                  options: [
                    { label: '7/5', value: '7/5' },
                    { label: '6/6', value: '6/6' },
                  ],
                  defaultValue: '7/5',
                }),
                mediaFirst: fields.checkbox({ label: 'Media First on Mobile', defaultValue: false }),
                image: fields.image({
                  label: 'Section Image',
                  directory: 'public/img',
                  publicPath: '/img/',
                }),
                content: fields.text({ label: 'Content (HTML/Text)', multiline: true }),
              }),
            },
            specList: {
              label: 'Section: Spec List',
              schema: fields.object({
                id: fields.text({ label: 'Section ID' }),
                enabled: fields.checkbox({ label: 'Enabled', defaultValue: true }),
                title: fields.text({ label: 'Title' }),
                tone: fields.select({
                  label: 'Tone',
                  options: [
                    { label: 'Graphite', value: 'graphite' },
                    { label: 'Ivory', value: 'ivory' },
                  ],
                  defaultValue: 'graphite',
                }),
                items: fields.array(
                  fields.object({
                    label: fields.text({ label: 'Label' }),
                    value: fields.text({ label: 'Value' }),
                  }),
                  { label: 'Spec Items', itemLabel: (p) => p.fields.label.value || 'Spec' }
                ),
              }),
            },
            ruleList: {
              label: 'Section: Rule List',
              schema: fields.object({
                id: fields.text({ label: 'Section ID' }),
                enabled: fields.checkbox({ label: 'Enabled', defaultValue: true }),
                title: fields.text({ label: 'Title' }),
                tone: fields.select({
                  label: 'Tone',
                  options: [
                    { label: 'Graphite', value: 'graphite' },
                    { label: 'Ivory', value: 'ivory' },
                  ],
                  defaultValue: 'graphite',
                }),
                layout: fields.select({
                  label: 'Layout',
                  options: [
                    { label: 'Stack', value: 'stack' },
                    { label: 'Columns', value: 'columns' },
                  ],
                  defaultValue: 'stack',
                }),
                items: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Title' }),
                    body: fields.text({ label: 'Body', multiline: true }),
                  }),
                  { label: 'Rule Items', itemLabel: (p) => p.fields.title.value || 'Item' }
                ),
              }),
            },
            richText: {
              label: 'Section: Rich Text / Article',
              schema: fields.object({
                id: fields.text({ label: 'Section ID' }),
                enabled: fields.checkbox({ label: 'Enabled', defaultValue: true }),
                title: fields.text({ label: 'Title (Optional)' }),
                content: fields.markdoc({
                  label: 'Content (Markdown / Typography)',
                  options: {
                    image: {
                      directory: 'public/img',
                      publicPath: '/img/',
                    },
                  },
                  components: markdocComponents,
                }),
              }),
            },
          },
          { label: 'Page Blocks' }
        ),
      },
    }),
    faq: collection({
      label: 'FAQ Items',
      slugField: 'id',
      path: 'src/content/faq/*',
      format: { data: 'json' },
      schema: {
        id: fields.slug({ name: { label: 'FAQ ID' } }),
        category: fields.select({
          label: 'Category',
          defaultValue: 'engine',
          options: [
            { label: 'Audio Engine', value: 'engine' },
            { label: 'Hardware & DAC', value: 'hardware' },
            { label: 'On-Device AI', value: 'ai' },
            { label: 'DSP & Audio Effects', value: 'dsp' },
            { label: 'Battery & Power', value: 'battery' },
            { label: 'License & Purchase', value: 'license' },
          ],
        }),
        q: fields.text({ label: 'Question' }),
        a: fields.text({ label: 'Answer', multiline: true }),
        guideUrl: fields.text({ label: 'Guide URL' }),
        highlights: fields.array(fields.text({ label: 'Highlight phrase' }), { label: 'Highlights' }),
        order: fields.integer({ label: 'Display Order' }),
      },
    }),
    features: collection({
      label: 'Features',
      slugField: 'id',
      path: 'src/content/features/*',
      format: { data: 'json' },
      previewUrl: '/features/{slug}/',
      schema: {
        id: fields.slug({ name: { label: 'Feature ID' } }),
        slug: fields.text({ label: 'Slug' }),
        title: fields.text({ label: 'Title' }),
        tagline: fields.text({ label: 'Tagline' }),
        badge: fields.text({ label: 'Badge' }),
        accent: fields.text({ label: 'Accent', defaultValue: 'gold' }),
        icon: fields.text({ label: 'Icon' }),
        description: fields.text({ label: 'Description', multiline: true }),
        overview: fields.text({ label: 'Overview', multiline: true }),
        facts: fields.array(fields.text({ label: 'Fact' }), { label: 'Facts' }),
        specs: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            value: fields.text({ label: 'Value' }),
          }),
          { label: 'Specs', itemLabel: (p) => p.fields.label.value || 'Spec' }
        ),
        benefits: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            desc: fields.text({ label: 'Description', multiline: true }),
            icon: fields.text({ label: 'Icon' }),
          }),
          { label: 'Benefits', itemLabel: (p) => p.fields.title.value || 'Benefit' }
        ),
        lede: fields.text({ label: 'Lede', multiline: true }),
        summary: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            value: fields.text({ label: 'Value' }),
          }),
          { label: 'Summary', itemLabel: (p) => p.fields.label.value || 'Row' }
        ),
        screenTitle: fields.text({ label: 'Screen Title' }),
        beats: fields.array(
          fields.object({
            eyebrow: fields.text({ label: 'Eyebrow' }),
            title: fields.text({ label: 'Title' }),
            body: fields.text({ label: 'Body', multiline: true }),
            chips: fields.array(
              fields.object({
                label: fields.text({ label: 'Label' }),
                active: fields.checkbox({ label: 'Active' }),
              }),
              { label: 'Chips', itemLabel: (p) => p.fields.label.value || 'Chip' }
            ),
            stats: fields.array(
              fields.object({
                label: fields.text({ label: 'Label' }),
                value: fields.text({ label: 'Value' }),
              }),
              { label: 'Stats', itemLabel: (p) => p.fields.label.value || 'Stat' }
            ),
            note: fields.text({ label: 'Note' }),
            signalStates: fields.checkbox({ label: 'Signal States' }),
          }),
          { label: 'Beats', itemLabel: (p) => p.fields.title.value || 'Beat' }
        ),
        cta: fields.object({
          title: fields.text({ label: 'CTA Title' }),
          body: fields.text({ label: 'CTA Body', multiline: true }),
        }),
        screens: fields.array(
          fields.select({
            label: 'Screen',
            options: SCREEN_OPTIONS,
          }),
          { label: 'Screen Mockups (in beat order)', itemLabel: (p) => p.value || 'Screen' }
        ),
        order: fields.integer({ label: 'Order' }),
      },
    }),
    catalog: collection({
      label: 'Technical Catalog (27 Capabilities)',
      slugField: 'id',
      path: 'src/content/catalog/*',
      format: { data: 'json' },
      previewUrl: '/features/catalog/{id}/',
      schema: {
        number: fields.integer({
          label: 'Catalog Number (1-27)',
          validation: { min: 1, max: 99 },
        }),
        id: fields.slug({ name: { label: 'Feature ID / Slug' } }),
        title: fields.text({ label: 'Feature Title' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Core engine', value: 'engine' },
            { label: 'Sound processing (DSP)', value: 'dsp' },
            { label: 'Hardware & outputs', value: 'hardware' },
            { label: 'On-device AI', value: 'ai' },
            { label: 'Streaming & network', value: 'streaming' },
            { label: 'Formats & interface', value: 'media' },
          ],
          defaultValue: 'engine',
        }),
        categoryLabel: fields.text({ label: 'Category Label', defaultValue: 'Core engine' }),
        summary: fields.text({ label: 'Summary / Lede', multiline: true }),
        metaTitle: fields.text({ label: 'Meta Title (Optional)' }),
        metaDescription: fields.text({ label: 'Meta Description (Optional)', multiline: true }),
        description: fields.text({ label: 'Detailed How-It-Works Description', multiline: true }),
        audiophileBenefit: fields.text({ label: 'What You Hear / Audiophile Benefit', multiline: true }),
        badge: fields.text({ label: 'Badge / Architecture Pill (Optional)' }),
        sdkUrl: fields.text({ label: 'Developer SDK URL (Optional)' }),
        screens: fields.array(
          fields.select({
            label: 'Mockup Screen',
            options: SCREEN_OPTIONS,
          }),
          {
            label: 'Associated App Screens (Opening, How it works, What you hear)',
            itemLabel: (p) => p.value || 'Screen',
          }
        ),
        specs: fields.array(
          fields.object({
            label: fields.text({ label: 'Spec Parameter' }),
            value: fields.text({ label: 'Spec Value' }),
          }),
          {
            label: 'Technical Specifications Table',
            itemLabel: (p) => (p.fields.label.value ? `${p.fields.label.value}: ${p.fields.value.value}` : 'Spec'),
          }
        ),
      },
    }),
    legal: collection({
      label: 'Legal Documents',
      slugField: 'title',
      path: 'src/content/legal/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        effectiveDate: fields.text({ label: 'Effective Date' }),
        lastUpdated: fields.text({ label: 'Last Updated' }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md',
          options: {
            image: {
              directory: 'public/img',
              publicPath: '/img/',
            },
          },
          components: markdocComponents,
        }),
      },
    }),
    guides: collection({
      label: 'Guides & Troubleshooting',
      slugField: 'title',
      path: 'src/content/guides/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        publishDate: fields.date({ label: 'Publish Date' }),
        updatedDate: fields.date({ label: 'Updated Date' }),
        author: fields.text({ label: 'Author' }),
        category: fields.text({ label: 'Category' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        draft: fields.checkbox({ label: 'Draft' }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md',
          options: {
            image: {
              directory: 'public/img',
              publicPath: '/img/',
            },
          },
          components: markdocComponents,
        }),
      },
    }),
  },
});
