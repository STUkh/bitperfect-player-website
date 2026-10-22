import { CapabilityBand } from '@bitperfect/website-ds';

/* The opening band of /features/catalog/direct-sound-path. */
export function GraphiteRight() {
  return (
    <CapabilityBand
      tone="graphite"
      media="right"
      titleAs="h1"
      backHref="/features/catalog"
      backLabel="All 27 capabilities"
      eyebrow="§ Core engine · 01"
      title="Direct sound path"
      body="Bit-perfect audio to your USB DAC. Bypasses Android's system mixer."
      badge="Core architecture"
      screen="signal-clean"
    />
  );
}

/* A mirrored ivory band with the entry's spec rows. */
export function IvoryLeft() {
  return (
    <CapabilityBand
      tone="ivory"
      media="left"
      title="What you hear"
      body="You hear your files untouched, with no unwanted resampling or dither."
      specs={[
        { label: 'Mixer bypass', value: 'Direct to your DAC' },
        { label: 'Sample rates', value: 'Up to 768 kHz, if your DAC supports it' },
        { label: 'Signal verification', value: 'Live Bit-perfect badge' },
      ]}
      screen="output"
    />
  );
}
