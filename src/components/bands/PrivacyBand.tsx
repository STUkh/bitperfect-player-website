import type { FlowProps } from './FlowBackdrop';
import Band from '../sections/Band';
import ImageSlot from '../primitives/ImageSlot';
import RuleList from '../sections/RuleList';
import SectionHeading from '../sections/SectionHeading';
import { withBase } from '../../utils/nav';
import './PrivacyBand.css';

/**
 * These explain the headline rather than repeating it. They used to read "Zero
 * accounts / Zero telemetry / AI stays on device", which is the H2 above them said
 * a second time in different words, and saying a thing twice makes it sound less
 * true rather than more.
 */
export interface PrivacyCommitment {
  title: string;
  desc: string;
}

export interface PrivacyBandProps extends FlowProps {
  title?: string;
  commitments?: PrivacyCommitment[];
  note?: string;
  policyLinkText?: string;
}

const defaultCommitments: PrivacyCommitment[] = [
  {
    title: 'No ads',
    desc: 'No ads and no ad SDKs. Your music, library, history and favourites stay on your phone.',
  },
  {
    title: 'No tracking',
    desc: 'The app has no advertising ID and collects no play history.',
  },
  {
    title: 'AI runs on your phone',
    desc: 'After a one-time model download, AI features run on your phone. No audio is uploaded.',
  },
];

export default function PrivacyBand({
  backgroundVariant,
  title = 'Your listening never leaves the phone.',
  commitments: customCommitments,
  note = 'The app goes online for album art, lyrics, AutoEQ profiles, internet radio and subscription checks. Crash reports can be turned off in settings.',
  policyLinkText = 'Read the privacy policy',
}: PrivacyBandProps = {}) {
  const activeCommitments = customCommitments && customCommitments.length > 0 ? customCommitments : defaultCommitments;
  return (
    <Band
      backgroundVariant={backgroundVariant}
      id="privacy"
      tone="ivory"
      ground="ground-halftone"
      className="scroll-mt-20"
      containerClassName="lg:px-20"
    >
      <SectionHeading
        className="flex flex-col lg:items-center lg:text-center"
        title={title}
        titleClassName="text-headline-sm-m lg:max-w-[16ch] lg:text-headline-xl"
        reveal={0}
      />
      <RuleList
        layout="columns"
        items={activeCommitments.map((c) => ({ title: c.title, body: c.desc }))}
        className="mt-[30px] lg:mt-[68px] lg:grid-cols-3"
        itemClassName="py-5 lg:pt-[34px] lg:pb-0"
        titleClassName="text-[17px] font-semibold tracking-title lg:text-[19px]"
        bodyClassName="mt-1.5 text-sm leading-[1.62] text-pretty lg:mt-2.5 lg:text-[15px]"
      />
      <ImageSlot
        name="home-privacy"
        variant="ivory"
        ratio="var(--listening-art-ratio, 16 / 9)"
        ships="2560x1440"
        alt="The app's album library on a phone beside earphones on a walnut table."
        art={[{ media: '(max-width: 639px)', crop: '4x3' }]}
        className="r-rise mt-9 [--listening-art-ratio:4/3] sm:[--listening-art-ratio:2/1] lg:mt-14"
      />
      <div className="r-fade mt-[26px] rounded-card-sm border border-band-ink/10 bg-band-well px-5 py-[18px] lg:mt-11 lg:rounded-card lg:px-[26px] lg:py-[22px]">
        <p className="text-[13px] leading-[1.6] text-pretty text-band-ink-muted lg:text-sm lg:leading-[1.65]">
          {note}{' '}
          <a href={withBase('/privacy')} className="privacy-band-link focus-visible:focus-ring">
            {policyLinkText}
          </a>
          .
        </p>
      </div>
    </Band>
  );
}
