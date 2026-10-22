import { CloseBand, PlayCta } from '@bitperfect/website-ds';

/* The landing close: ivory, centred, the install. */
export function Ivory() {
  return (
    <CloseBand
      tone="ivory"
      className="pt-16 pb-18 lg:pt-30 lg:pb-32"
      title="Your music, "
      titleAccent="bit for bit."
      titleClassName="text-headline-m max-w-[16ch] lg:text-headline"
      lede="Install the app from Google Play and plug in your USB DAC."
      ledeClassName="mt-4 max-w-[42ch] text-body-sm text-pretty lg:mt-6 lg:text-body-lg"
      action={<PlayCta label="Get it on Google Play" size="lg" className="mt-8 lg:mt-10" />}
    />
  );
}

/* The /features close: graphite after an ivory band, with an eyebrow. */
export function Graphite() {
  return (
    <CloseBand
      tone="graphite"
      className="border-t border-border-subtle pt-16 pb-18 lg:pt-28 lg:pb-30"
      eyebrow="Get the app"
      eyebrowClassName="mono-spec block text-micro font-medium tracking-[1.5px] uppercase lg:tracking-[1.9px]"
      title="Hear it the way it was "
      titleAccent="mastered."
      titleClassName="mt-4 max-w-[20ch] text-headline-sm-m lg:mt-5 lg:text-headline-sm"
      lede="Plays straight to your USB DAC, bit for bit."
      ledeClassName="mt-4 max-w-[51ch] text-body text-pretty lg:mt-5 lg:text-body-lg"
      action={<PlayCta label="Get it on Google Play" size="lg" className="mt-8 lg:mt-10" />}
    />
  );
}
