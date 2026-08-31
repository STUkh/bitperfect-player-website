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

  /** PLACEHOLDER — the Cloudflare R2 direct-APK path. Replace with the real URL. */
  apkUrl: null as string | null,

  /**
   * Gates the Apple App Store badge in StoreBadges.astro — same null-until-supplied
   * pattern as apkUrl. The product is Android-only today, so this stays null; the
   * badge is built and ready but renders nothing until a real URL lands here.
   */
  appStoreUrl: null as string | null,

  /** Official contact address for support and privacy inquiries. */
  contactEmail: 'support@bit-perfect.com',

  minAndroid: '8.0',
  minSdk: 26,
};

/** Fragments are resolved against the index route by Nav.astro — a bare `#engine`
 *  is dead on /privacy, where those sections do not exist. */
export const nav = [
  { label: 'Engine', hash: '#engine' },
  { label: 'AI', hash: '#ai' },
  { label: 'Features', hash: '#features' },
  { label: 'Pricing', hash: '#pricing' },
  { label: 'Privacy', hash: '#privacy' },
  { label: 'FAQ', hash: '#faq' },
];

// One store-managed annual subscription for the complete app.
export const pro = {
  name: 'Bitperfect Player',
  currency: 'USD',
  trialDays: 7,
  periods: [
    { id: 'yearly', label: 'Annual', price: 35, per: 'year', months: 12, best: false, accent: 'var(--color-gold)', accentClass: 'text-gold', borderHover: 'hover:border-gold/50' },
  ],
  unlocks: [
    { name: 'Playback and library', desc: 'Local and network libraries, playlists, search, radio and playback.' },
    { name: 'Bit-perfect output and DSP', desc: 'Exclusive USB output, parametric EQ, processing and casting.' },
    { name: 'On-device AI', desc: 'AI Enhancer, mixes, similar tracks and search, processed on your phone.' },
  ],
  accessRequirement: 'The whole app requires an active free trial or annual subscription. There is no free tier.',
  disclosures: [
    'Eligible new customers get 7 days free',
    'Then USD 35 per year',
    'Google Play shows and charges the regional price before purchase',
    'Renews automatically until cancelled',
    'Cancel anytime in Play subscriptions',
  ],
};

/**
 * Compatibility. Qualcomm and MediaTek may be named directly (user directive,
 * 2026-08-03 — narrow exception to the site's no-brand-names rule, scoped to
 * these two chip vendors; see PRODUCT.md Brand Commitments). The precise
 * silicon mapping is kept here in this comment (TypeScript comments are never
 * emitted to HTML) since the visible copy names vendors, not individual chips:
 *
 *   Qualcomm Hexagon (five NPU generations, per-arch compiled models — the app
 *   asks the chip its Hexagon arch at runtime rather than matching a model
 *   table, so no Snapdragon marketing names are listed here):
 *     v69 → 2022 flagships           v73 → 2023 flagships + 2024 premium-mid
 *     v75 → 2024 flagships           v79 → 2025 flagships (verified end-to-end)
 *     v81 → 2026 flagships
 *   MediaTek Dimensity (four platforms, per-chip compiled models):
 *     MT6989 → Dimensity 9300 (late-2023 flagship)
 *     MT6897 → Dimensity 8300-Ultra / 8350 (2024 premium-mid)
 *     MT6991 → Dimensity 9400 (late-2024 flagship)
 *     MT6899 → Dimensity 8400 / 8400-Ultra / 8450 (2024–25 premium-mid)
 *
 * The AI Enhancer's CPU tier is compiled out in the current build — on a phone
 * with no supported NPU the enhancer is hidden, playback is untouched. Every
 * enhancer install is probe-gated at runtime: the app measures the accelerator
 * first and only enables what runs in real time.
 */
export const compatibility = [
  {
    id: 'player',
    what: 'The player',
    scope: 'Playback · bit-perfect USB · EQ · casting · plugins',
    devices: 'Every phone on Android 8.0 or newer',
    note: 'All three ABIs in one release — 64-bit, 32-bit and emulator builds.',
    level: 'universal',
  },
  {
    id: 'ai-library',
    what: 'AI Mix · similar tracks · AI search',
    scope: 'Library analysis, mixes, radio, search',
    devices: 'Every phone on Android 8.0 or newer',
    note: 'The analysis models run on any processor — no accelerator required.',
    level: 'universal',
  },
  {
    id: 'ai-enhancer',
    what: 'AI Enhancer',
    scope: 'Real-time neural restoration',
    devices: 'Devices with hardware NPU neural acceleration',
    note: 'Nine hardware accelerator generations supported — flagship platforms from 2022 onward, premium mid-range from 2024. The app probes your hardware accelerator first and only enables what runs in real time.',
    level: 'npu',
  },
];

/**
 * Screenshot carousel. The user will supply real portrait captures; until a
 * slide has a `src` (path under /public/screens/), the component renders an
 * in-world placeholder frame. Captions live in HTML, never baked into images.
 */
export const screens = [
  { id: 'now-playing', caption: 'Now Playing — signal state always visible', src: null as string | null },
  { id: 'library', caption: 'Library — your files, fully indexed', src: null as string | null },
  { id: 'eq', caption: 'Parametric EQ — up to 32 bands', src: null as string | null },
  { id: 'ai-mix', caption: 'AI Mix — a playlist from a few tags', src: null as string | null },
  { id: 'cast', caption: 'Casting — send anywhere, receive too', src: null as string | null },
  { id: 'output', caption: 'Output — exclusive USB, tier by tier', src: null as string | null },
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

/** Signal-path vocabulary, mirroring Color.kt's status tokens. All six states —
 *  omitting `enhanced` would contradict the EQ card, the FAQ and the AI section,
 *  which all tell the reader that state exists. */
export const signalStates = [
  { id: 'bitperfect', label: 'Bit-perfect', desc: 'Untouched to the DAC', token: '--color-bitperfect' },
  { id: 'lossless', label: 'Lossless', desc: 'Full rate, exclusive out', token: '--color-lossless' },
  { id: 'hires', label: 'Hi-res', desc: 'Direct, above CD rate', token: '--color-hires' },
  { id: 'enhanced', label: 'Enhanced', desc: 'DSP applied on purpose', token: '--color-enhanced' },
  { id: 'resampled', label: 'Resampled', desc: 'Rate converted en route', token: '--color-resampled' },
  { id: 'lossy', label: 'Lossy', desc: 'Compressed source', token: '--color-lossy' },
];
