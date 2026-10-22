import type { CSSProperties } from 'react';
import { clsx as cx } from 'clsx';
import Container from '../common/Container';
import ImageSlot from '../common/ImageSlot';
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
    desc: 'You only need a Google Play subscription. Your library and play history stay on your phone.',
  },
  {
    title: 'No analytics',
    desc: 'The app has no advertising ID and sends no play history.',
  },
  {
    title: 'The AI stays on the phone',
    desc: 'After a one-time model download, the AI runs on your phone. No audio is uploaded.',
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
export default function PrivacyBand() {
  return (
    <section id="privacy" className="ground ground-halftone scroll-mt-20 bg-band-ivory pt-12 pb-13 lg:pt-24 lg:pb-26">
      <Container className="lg:px-20">
        {/*
      No eyebrow. `Privacy` restated the section id, the nav item and the headline
      below it. DESIGN.md, "The Eyebrow Budget Rule".
    */}
        <div className="flex flex-col lg:items-center lg:text-center">
          <h2
            className="r-rise text-headline-sm-m text-balance text-band-ink lg:max-w-[16ch] lg:text-headline-xl"
            style={{ '--i': '0' } as CSSProperties}
          >
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
            Your listening never leaves the phone.
          </h2>
        </div>
        <div className="mt-[30px] grid grid-cols-1 lg:mt-[68px] lg:grid-cols-3 lg:border-t lg:border-band-rule">
          {commitments.map((c, i) => (
            <div
              key={c.title}
              className={cx([
                'r-rise border-t border-band-rule py-5 lg:border-t-0 lg:pt-[34px] lg:pb-0',
                i === commitments.length - 1 && 'border-b border-band-rule lg:border-b-0',
                i > 0 ? 'lg:border-l lg:border-band-rule lg:pl-10' : '',
                i < commitments.length - 1 ? 'lg:pr-10' : '',
              ])}
              style={{ '--i': i } as CSSProperties}
            >
              {/* Ink, not gold: three 19px gold headings in a row on white read as
                three links. Gold on this band belongs to the accent phrase in the
                headline and nothing else. DESIGN.md, "The Gold Hierarchy Rule". */}
              <div className="text-[17px] font-semibold tracking-[-0.01em] text-band-ink lg:text-[19px]">{c.title}</div>
              <p className="mt-1.5 text-sm leading-[1.62] text-pretty text-band-ink-muted lg:mt-2.5 lg:text-[15px]">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
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
            <span className="font-semibold text-band-ink">The app goes online for:</span> crash reports, artist photos, artwork and lyrics lookups, headphone EQ
            profiles, internet radio, a one-time AI model download, update checks and the subscription check. The first
            two are on by default. You can turn them off in Settings.{' '}
            <a href={withBase('/privacy')} className="privacy-band-link focus-visible:focus-ring">
              Read the privacy policy
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
