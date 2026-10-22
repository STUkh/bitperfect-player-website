import { SpecList, Surface } from '@bitperfect/website-ds';

const specs = [
  { label: 'Sample rates', value: 'Up to 768 kHz' },
  { label: 'DSD', value: 'DSD64 to DSD512' },
  { label: 'Mixer bypass', value: 'Direct to your DAC' },
];

/* Label left, value right (stacked below sm). */
export function Graphite() {
  return (
    <Surface className="p-10">
      <SpecList items={specs} className="max-w-[560px]" />
    </Surface>
  );
}

/* The spec band: stacked rows in two columns on ivory. */
export function IvoryStacked() {
  return (
    <Surface tone="ivory" className="p-10">
      <SpecList
        tone="ivory"
        items={[...specs, { label: 'Bit depth', value: '16, 24 and 32-bit' }]}
        close="grid-2"
        className="grid grid-cols-1 gap-x-12 lg:grid-cols-2"
        rowClassName="flex flex-col gap-1.5 py-4 lg:py-5"
        labelClassName="mono-spec text-micro uppercase tracking-wider"
        valueClassName="text-body-lg font-semibold tabular-nums"
      />
    </Surface>
  );
}
