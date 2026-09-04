/**
 * Signal telemetry palette, mirroring the app's `Status*` tokens in
 * `core/ui-common/.../theme/Color.kt`.
 *
 * ONLY THESE FIVE STATES EVER RENDER. `core/model/.../SignalQuality.kt` declares
 * exactly BIT_PERFECT, ENHANCED, RESAMPLED, LOSSY and UNKNOWN, and
 * `signalQualityColor()` maps exactly those five. `StatusLossless` and
 * `StatusHiRes` are declared tokens with no enum mapping: the app cannot produce
 * either state, so they are held in `unmappedAppTokens` below, deliberately
 * outside this record, and a consumer cannot index its way to them.
 *
 * Labels and glyphs are the app's own. DESIGN.md's Honest Telemetry Rule requires
 * the colourblind glyph to travel with the colour wherever a state is shown.
 */
export const signalStateColors = {
  bitperfect: {
    hex: "#34d399",
    token: "var(--color-bitperfect, #34d399)",
    label: "Bit-perfect",
    glyph: "◉",
  },
  enhanced: {
    hex: "#9582d9",
    token: "var(--color-enhanced, #9582d9)",
    label: "Enhanced",
    glyph: "✦",
  },
  resampled: {
    hex: "#fbbf24",
    token: "var(--color-resampled, #fbbf24)",
    label: "Resampled",
    glyph: "◐",
  },
  lossy: {
    hex: "#94a3b8",
    token: "var(--color-lossy, #94a3b8)",
    label: "Lossy",
    glyph: "○",
  },
  unknown: {
    hex: "#8e8e93",
    token: "var(--color-unknown, #8e8e93)",
    label: "Unknown",
    glyph: "·",
  },
} as const;

export type SignalStateKey = keyof typeof signalStateColors;

/** Declaration order, so a consumer never has to hand-list the five states. */
export const signalStateKeys = Object.keys(
  signalStateColors,
) as SignalStateKey[];

/**
 * Declared in the app's `Color.kt` and never mapped by `signalQualityColor()`.
 * Recorded here only so nobody re-adds them to `signalStateColors` later: the app
 * has no Lossless and no Hi-res runtime state, and the site must never show one.
 * Not a palette. Do not render these.
 */
export const unmappedAppTokens = {
  lossless: "#00d2ff",
  hires: "#818cf8",
} as const;

/**
 * One accent for the whole product (DESIGN.md, "One accent, full stop"). Champagne
 * gold is the only brand colour on the site; it is not one accent per route.
 */
export const brandAccent = {
  hex: "#e8b84b",
  token: "var(--color-gold)",
} as const;

/**
 * @deprecated The design no longer distinguishes anything by hue. Feature routes are
 * told apart by their mark and their content. This lookup is kept
 * only so existing pages that resolve `Feature.accent` keep building; every feature now
 * resolves to `brandAccent`. The five signal entries are here because the signal-state
 * strip is real telemetry data, the one documented exception to the single-accent rule.
 * New code should read `brandAccent` or `signalStateColors` directly.
 */
export const accentColors = {
  gold: brandAccent,
  ...signalStateColors,
} as const;

export type AccentColorKey = keyof typeof accentColors;
