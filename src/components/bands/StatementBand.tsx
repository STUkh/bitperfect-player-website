import type { FlowProps } from './FlowBackdrop';
import Band from '../sections/Band';
import ImageSlot from '../primitives/ImageSlot';
import RuleList from '../sections/RuleList';
import SectionHeading from '../sections/SectionHeading';
import './StatementBand.css';

const facts = [
  {
    title: 'Your own files',
    desc: 'FLAC, ALAC, WAV and DSD, from your own storage.',
  },
  {
    title: 'Straight to your DAC',
    desc: 'The app talks to your USB DAC directly. While it plays, other apps cannot use the DAC.',
  },
  {
    title: 'Your music stays on the phone',
    desc: 'No account needed. No tracking, no ads.',
  },
];

/**
 * Statement band. No props; the copy is the site's own.
 *
 * Directly follows HomeOpening and precedes FeaturesTeaser. Ivory surface
 * (`bg-band-ivory`) on the `ground-statement` backdrop, and the first of the page's
 * light bands. Hairlines and space only: no cards, glass, icons or shadows (DESIGN.md,
 * "The Ivory Band Has No Shadows").
 *
 * Content: an 8/4 split on desktop with the claim on the left ("Many phones change
 * your music on the way out. This app sends it to your USB DAC unchanged.", accent in
 * `band-gold-ink`) and three facts on a hairline stack to the right, then an ivory
 * `ImageSlot` (`home-statement`, phone to DAC to headphones). Static text; no data or
 * i18n reads.
 */
export default function StatementBand({ backgroundVariant }: FlowProps) {
  return (
    <Band
      backgroundVariant={backgroundVariant}
      tone="ivory"
      ground="ground-statement"
      className="pt-14 pb-15 lg:pt-29 lg:pb-30"
      containerClassName="lg:px-20"
    >
      <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-16">
        {/* 8/4, not 7/5. At 7 columns this headline set five lines of 46px type in
          a 633px track while the fact list beside it ran out 120px early: one
          column too dense, the other stranded. Eight columns takes the headline to
          four lines and gives the facts a measure that wraps to two, so the pair
          finishes level. */}
        <SectionHeading
          className="lg:col-span-8"
          title="The system mixer changes your music on the way out. "
          titleAccent="This app sends it to your USB DAC unchanged."
          titleClassName="text-headline-m lg:text-headline"
          reveal={1}
        />
        <RuleList
          items={facts.map((fact) => ({ title: fact.title, body: fact.desc }))}
          className="flex flex-col lg:col-span-4"
          itemClassName="py-5 lg:py-[26px]"
          titleClassName="text-base font-semibold tracking-[-0.01em] lg:text-[17px]"
          bodyClassName="mt-1.5 text-sm leading-[1.6] text-pretty lg:text-[15px]"
        />
      </div>
      <ImageSlot
        name="home-statement"
        variant="ivory"
        ratio="var(--listening-art-ratio, 16 / 9)"
        ships="2560x1440"
        alt="A phone connected by USB to a DAC and wired headphones."
        className="r-rise mt-10 sm:[--listening-art-ratio:2/1] lg:mt-18"
      />
    </Band>
  );
}
