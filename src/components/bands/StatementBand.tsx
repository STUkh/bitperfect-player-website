import type { FlowProps } from './FlowBackdrop';
import Band from '../sections/Band';
import RuleList from '../sections/RuleList';
import SectionHeading from '../sections/SectionHeading';

const defaultFacts = [
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
    desc: 'No tracking, no ads.',
  },
];

/**
 * Statement band.
 *
 * Directly follows AudioEngineBand and precedes FeaturesTeaser. Ivory surface
 * (`bg-band-ivory`) on the `ground-statement` backdrop, and the second of the page's
 * light bands. Hairlines and space only: no cards, glass, icons or shadows.
 *
 * Content: 40/60 (5/7) split on desktop with the claim on the left and three facts on
 * a hairline stack to the right.
 */
export interface StatementFact {
  title: string;
  desc: string;
}

export interface StatementBandProps extends FlowProps {
  title?: string;
  titleAccent?: string;
  facts?: StatementFact[];
}

export default function StatementBand({
  backgroundVariant,
  title = 'The system mixer changes your music on the way out. ',
  titleAccent = 'This app sends it to your USB DAC unchanged.',
  facts: customFacts,
}: StatementBandProps = {}) {
  const activeFacts = customFacts && customFacts.length > 0 ? customFacts : defaultFacts;
  return (
    <Band
      backgroundVariant={backgroundVariant}
      tone="ivory"
      ground="ground-statement"
      containerClassName="lg:px-20"
    >
      <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-16">
        <SectionHeading
          className="lg:col-span-8"
          title={title}
          titleAccent={titleAccent}
          titleClassName="text-headline-m lg:text-headline"
          reveal={1}
        />
        <RuleList
          items={activeFacts.map((fact) => ({ title: fact.title, body: fact.desc }))}
          className="flex flex-col lg:col-span-4"
          itemClassName="py-5 lg:py-[26px]"
          titleClassName="text-base font-semibold tracking-title lg:text-[17px]"
          bodyClassName="mt-1.5 text-sm leading-[1.6] text-pretty lg:text-[15px]"
        />
      </div>
    </Band>
  );
}
