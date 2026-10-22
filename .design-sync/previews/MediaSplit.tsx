import { Band, MediaSplit, Phone, SectionHeading } from '@bitperfect/website-ds';

/* 7/5, copy first, the phone right. */
export function PhoneRight() {
  return (
    <Band className="py-14 lg:py-28">
      <MediaSplit mediaSide="right" copyClassName="flex flex-col" media={<Phone screen="output" />}>
        <SectionHeading
          className="contents"
          title="Straight to your DAC"
          lede="The app talks to your USB DAC directly, past Android's mixer."
          ledeClassName="mt-4 max-w-[56ch] text-body text-pretty lg:mt-5 lg:text-body-lg"
        />
      </MediaSplit>
    </Band>
  );
}

/* 6/6 mirrored on ivory, the screen leading in the DOM. */
export function IvoryPhoneLeft() {
  return (
    <Band tone="ivory" className="py-16 lg:py-32">
      <MediaSplit
        split="6/6"
        mediaFirst
        mediaSide="left"
        copyClassName="flex flex-col gap-3.5 lg:gap-4"
        media={<Phone screen="eq" />}
      >
        <SectionHeading
          className="contents"
          eyebrow="Bands"
          title="Up to 32 independent bands"
          lede="Place each filter anywhere from 20 Hz to 20 kHz."
          ledeClassName="max-w-[52ch] text-body text-pretty lg:text-body-lg"
        />
      </MediaSplit>
    </Band>
  );
}
