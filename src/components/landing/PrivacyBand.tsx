import type { FlowProps } from '../common/FlowBackdrop';
import Band from '../common/Band';
import ImageSlot from '../common/ImageSlot';
import RuleList from '../common/RuleList';
import SectionHeading from '../common/SectionHeading';
import { withBase } from '../../utils/nav';
import './PrivacyBand.css';

/**
 * These explain the headline rather than repeating it. They used to read "Zero
 * accounts / Zero telemetry / AI stays on device", which is the H2 above them said
 * a second time in different words, and saying a thing twice makes it sound less
 * true rather than more.
 */
const commitments = [
  {
    title: 'No account needed',
    desc: 'You only need a Google Play subscription. Your music, library, history and favourites stay on your phone.',
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

/**
 * Privacy band. No props; the copy is the site's own.
 *
 * Landing page order: HomeOpening, StatementBand, FeaturesTeaser, TextureStrip,
 * PrivacyBand, PricingSection, CTASection. Ivory surface (`bg-band-ivory`) on the
 * `ground-halftone` backdrop, and the second of the page's light bands. Hairlines and
 * space only: no cards, glass or shadows.
 *
 * Content: a centred headline ("Your listening never leaves the phone."), three
 * commitments on a hairline row (ink titles, never gold), an ivory `ImageSlot`
 * (`home-privacy`, the library beside earphones), and one `band-well` note listing the
 * app's optional network calls with a link to the privacy policy. It runs tighter than
 * its neighbours on purpose. Static text; no data or i18n reads.
 */
export default function PrivacyBand({ backgroundVariant }: FlowProps) {
  return (
    <Band
      backgroundVariant={backgroundVariant}
      id="privacy"
      tone="ivory"
      ground="ground-halftone"
      className="scroll-mt-20 pt-12 pb-13 lg:pt-24 lg:pb-26"
      containerClassName="lg:px-20"
    >
      {/*
      No eyebrow. `Privacy` restated the section id, the nav item and the headline
      below it. DESIGN.md, "The Eyebrow Budget Rule".
    */}
      {/*
      It read "No account. No telemetry. No ads." Triple-negative fragments are
      THE cadence of a generated landing page, and this was the third band in a
      row to land on a manufactured contrast. The fact is unchanged and the
      three commitments below still spell it out; the headline just states it
      once, in a sentence.

      The SUBJECT is "your listening", not "you". It read "Nothing about you
      leaves the phone", which the privacy policy contradicts on its own first
      screen: crash diagnostics are ON BY DEFAULT and carry stack traces, device
      model and IP, which §2.1 names as personal data under GDPR, and a
      subscription app checks its entitlement over the network on every install.
      What genuinely never leaves is the listening: the library, the play
      history, the favourites and the audio itself (PRIVACY_POLICY.md §2.2 and
      §2.4). That claim is absolute, so it is the one the headline makes.
    */}
      <SectionHeading
        className="flex flex-col lg:items-center lg:text-center"
        title="Your listening never leaves the phone."
        titleClassName="text-headline-sm-m lg:max-w-[16ch] lg:text-headline-xl"
        reveal={0}
      />
      {/* Ink, not gold: three 19px gold headings in a row on white read as
            three links. Gold on this band belongs to the accent phrase in the
            headline and nothing else. DESIGN.md, "The Gold Hierarchy Rule". */}
      <RuleList
        layout="columns"
        items={commitments.map((c) => ({ title: c.title, body: c.desc }))}
        className="mt-[30px] lg:mt-[68px] lg:grid-cols-3"
        itemClassName="py-5 lg:pt-[34px] lg:pb-0"
        titleClassName="text-[17px] font-semibold tracking-[-0.01em] lg:text-[19px]"
        bodyClassName="mt-1.5 text-sm leading-[1.62] text-pretty lg:mt-2.5 lg:text-[15px]"
      />
      <ImageSlot
        name="home-privacy"
        variant="ivory"
        ratio="var(--listening-art-ratio, 16 / 9)"
        ships="2560x1440"
        alt="The app's album library on a phone beside earphones on a walnut table."
        className="r-rise mt-9 sm:[--listening-art-ratio:2/1] lg:mt-14"
      />
      <div className="r-fade mt-[26px] rounded-card-sm border border-band-ink/10 bg-band-well px-5 py-[18px] lg:mt-11 lg:rounded-card lg:px-[26px] lg:py-[22px]">
        <p className="text-[13px] leading-[1.6] text-pretty text-band-ink-muted lg:text-sm lg:leading-[1.65]">
          The app goes online for album art, lyrics, AutoEQ profiles, internet radio and subscription checks. Crash
          reports can be turned off in settings.{' '}
          <a href={withBase('/privacy')} className="privacy-band-link focus-visible:focus-ring">
            Read the privacy policy
          </a>
          .
        </p>
      </div>
    </Band>
  );
}
