export const accentColors = {
  bitperfect: { hex: '#34d399', token: 'var(--color-bitperfect)' },
  lossless: { hex: '#00d2ff', token: 'var(--color-lossless)' },
  hires: { hex: '#818cf8', token: 'var(--color-hires)' },
  enhanced: { hex: '#00e5ff', token: 'var(--color-enhanced)' },
  resampled: { hex: '#fbbf24', token: 'var(--color-resampled)' },
  lossy: { hex: '#ef4444', token: 'var(--color-lossy)' },
} as const;

export type AccentColorKey = keyof typeof accentColors;
