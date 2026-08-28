/**
 * Single source for external links and product constants.
 * Anything marked PLACEHOLDER is on the user's replacement list.
 */
export const site = {
  name: 'Bitperfect Player',
  packageId: 'com.bitperfect.player',
  tagline: 'Bit-perfect Hi-Res audio with on-device AI',

  /** Confirmed by the user as the primary CTA target. */
  playUrl: 'https://play.google.com/store/apps/details?id=com.bitperfect.player',

  /** PLACEHOLDER: the Cloudflare R2 direct-APK path. Replace with the real URL. */
  apkUrl: null as string | null,

  /**
   * Gates the Apple App Store badge in StoreBadges.astro: same null-until-supplied
   * pattern as apkUrl. The product is Android-only today, so this stays null; the
   * badge is built and ready but renders nothing until a real URL lands here.
   */
  appStoreUrl: null as string | null,

  /** Official contact address for support and privacy inquiries. */
  contactEmail: 'support@bit-perfect.com',

  minAndroid: '8.0',
  minSdk: 26,
};

/** Fragments are resolved against the index route by Nav.astro: a bare `#engine`
 *  is dead on /privacy, where those sections do not exist. */
export const nav = [
  { label: 'Engine', hash: '#engine' },
  { label: 'Features', hash: '#features' },
  { label: 'AI', hash: '#ai' },
  { label: 'Privacy', hash: '#privacy' },
  { label: 'Pricing', hash: '#pricing' },
  { label: 'FAQ', hash: '#faq' },
];

/**
 * Pro subscription: ONE plan, three billing periods (mirrors the app's single
 * Pro entitlement; purchases happen in-app through Google Play billing, the
 * site only informs). Prices are user-confirmed (2026-08-03). Keep in lockstep
 * with Play Console prices.
 */
export const pro = {
  name: 'Pro',
  currency: 'USD',
  periods: [
    {
      id: 'yearly',
      label: 'Yearly',
      price: 12,
      per: 'year',
      months: 12,
      best: true,
      accent: 'var(--color-gold)',
      accentClass: 'text-gold',
      borderHover: 'hover:border-gold/50',
    },
    {
      id: 'halfyear',
      label: '6 months',
      price: 9,
      per: '6 months',
      months: 6,
      best: false,
      accent: 'var(--color-gold-light)',
      accentClass: 'text-gold-light',
      borderHover: 'hover:border-gold-light/50',
    },
    {
      id: 'monthly',
      label: 'Monthly',
      price: 2,
      per: 'month',
      months: 1,
      best: false,
      accent: 'var(--color-champagne)',
      accentClass: 'text-champagne',
      borderHover: 'hover:border-champagne/50',
    },
  ],
  /** What Pro unlocks: all of it runs on-device; the subscription unlocks
   *  features, it never moves processing to a server. */
  unlocks: [
    {
      name: 'AI Enhancer',
      desc: 'Optional real-time neural restoration with in-band amplitude and phase reconstruction for lossy sources. Hardware-probed and executed on-device.',
    },
    {
      name: 'Sonic Scan & Similar Tracks',
      desc: 'On-device acoustic analysis of your local library to find acoustic neighbours and queue coherent tracks instantly without network access.',
    },
    {
      name: 'App Development & Support',
      desc: 'Your subscription directly fuels ongoing independent development, DSP engineering, and updates without ads or tracking.',
    },
  ],
  /** Trust line: the negative-option honesty the audience expects. */
  freeForever: 'The player itself is not a subscription: playback, bit-perfect USB output, the full parametric EQ, casting, and DSP effects are yours with the app.',
  disclosures: [
    'Purchased in-app · billed by Google Play',
    'Renews automatically until cancelled',
    'Cancel anytime in Play subscriptions',
    'Prices in USD · local pricing is set by Google Play',
  ],
};

/**
 * Compatibility consolidated into concise honest tiers.
 * The AI Enhancer requires dedicated hardware neural acceleration and is probe-gated
 * at runtime. The core engine and Sonic Scan acoustic analysis run universally on any CPU.
 */
export const compatibility = [
  {
    id: 'player',
    what: 'Core engine and playback',
    scope: 'Playback · bit-perfect USB · EQ · casting · DSP effects',
    devices: 'Every phone on Android 8.0 or newer',
    note: 'All three ABIs in one release: 64-bit, 32-bit, and emulator builds.',
    level: 'universal',
  },
  {
    id: 'ai-library',
    what: 'Sonic Scan & Similar Tracks',
    scope: 'Local library analysis and acoustic similarity',
    devices: 'Every phone on Android 8.0 or newer',
    note: 'The acoustic analysis models run on any processor with zero network calls required.',
    level: 'universal',
  },
  {
    id: 'ai-enhancer',
    what: 'AI Enhancer',
    scope: 'Real-time neural restoration',
    devices: 'Devices with hardware NPU neural acceleration',
    note: 'Supported flagship and premium mid-range platforms with dedicated neural accelerators. The app probes your hardware accelerator first and only enables what runs in real time.',
    level: 'npu',
  },
];

/**
 * Screenshot carousel. Captions live in HTML, never baked into images.
 */
export const screens = [
  { id: 'now-playing', caption: 'Now Playing: signal state always visible', src: null as string | null },
  { id: 'library', caption: 'Library: your files, fully indexed', src: null as string | null },
  { id: 'eq', caption: 'Parametric EQ: up to 32 bands', src: null as string | null },
  { id: 'similar-tracks', caption: 'Similar Tracks: acoustic neighbour discovery', src: null as string | null },
  { id: 'cast', caption: 'Casting: send anywhere, receive too', src: null as string | null },
  { id: 'output', caption: 'Output: exclusive USB, tier by tier', src: null as string | null },
];

/** Formats the engine decodes. Real, from the app's codec support. */
export const formats = [
  'FLAC',
  'ALAC',
  'WAV',
  'AIFF',
  'DSD64',
  'DSD128',
  'APE',
  'WavPack',
  'Opus',
  'Vorbis',
  'MP3',
  'AAC',
];

/** Signal-path vocabulary, mirroring Color.kt's status tokens. All six states. */
export const signalStates = [
  { id: 'bitperfect', label: 'Bit-perfect', desc: 'Untouched to the DAC', token: '--color-bitperfect' },
  { id: 'lossless', label: 'Lossless', desc: 'Full rate, exclusive out', token: '--color-lossless' },
  { id: 'hires', label: 'Hi-res', desc: 'Direct, above CD rate', token: '--color-hires' },
  { id: 'enhanced', label: 'Enhanced', desc: 'DSP applied on purpose', token: '--color-enhanced' },
  { id: 'resampled', label: 'Resampled', desc: 'Rate converted en route', token: '--color-resampled' },
  { id: 'lossy', label: 'Lossy', desc: 'Compressed source', token: '--color-lossy' },
];
