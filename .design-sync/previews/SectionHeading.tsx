import { SectionHeading, Surface } from '@bitperfect/website-ds';

/* The feature-route beat: quiet eyebrow, section title, lede. */
export function Graphite() {
  return (
    <Surface className="p-10">
      <SectionHeading
        className="flex max-w-[560px] flex-col gap-4"
        eyebrow="Filter shapes"
        eyebrowTone="quiet"
        title="Seven filter shapes, not just a bell"
        lede="A bell handles most fixes. The others can shelve the top end or cut deep rumble."
      />
    </Surface>
  );
}

/* On ivory, a larger title with an accent phrase. */
export function IvoryAccent() {
  return (
    <Surface tone="ivory" className="p-10">
      <SectionHeading
        tone="ivory"
        className="max-w-[760px]"
        title="Android's mixer changes your music on the way out. "
        titleAccent="This app sends it to your USB DAC unchanged."
        titleClassName="text-headline-m lg:text-headline"
      />
    </Surface>
  );
}
