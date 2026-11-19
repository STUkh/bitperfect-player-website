import { config, fields, collection, singleton } from '@keystatic/core';

// When running locally in development (`astro dev`), use local filesystem storage.
// In production builds (`astro build` / Cloudflare Pages), use GitHub storage mode.
const isProd = import.meta.env.PROD;

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
      'Features & Catalog': ['features'],
      'App Screens & Media': ['media'],
      'Support & Guides': ['faq', 'guides'],
      'Legal & Policies': ['legal'],
      'Global Settings': ['settings'],
    },
  },
  singletons: {
    media: singleton({
      label: 'App Screenshots & Media',
      path: 'src/content/settings/media',
      format: { data: 'json' },
      schema: {
        nowPlaying: fields.image({
          label: 'Now Playing (Hero Screen)',
          description: 'Upload replacement for hero player view',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        eq: fields.image({
          label: 'Equalizer Screen',
          description: 'Upload replacement for parametric EQ view',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        dsp: fields.image({
          label: 'DSP & Audio Effects Screen',
          description: 'Upload replacement for DSP pipeline view',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        library: fields.image({
          label: 'Music Library Screen',
          description: 'Upload replacement for album grid view',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        output: fields.image({
          label: 'Output / USB DAC Screen',
          description: 'Upload replacement for direct DAC output view',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        signalPath: fields.image({
          label: 'Signal Path Screen',
          description: 'Upload replacement for bit-perfect signal chain view',
          directory: 'public/screens',
          publicPath: '/screens/',
        }),
        receiver: fields.image({
          label: 'Receiver Mode Screen',
          description: 'Upload replacement for casting receiver view',
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
                content: fields.markdoc({ label: 'Content (Markdown / Typography)' }),
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
        order: fields.integer({ label: 'Order' }),
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
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
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
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
  },
});
