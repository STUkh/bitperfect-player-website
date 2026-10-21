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
    title: 'It opens straight into your library',
    desc: 'There is no sign-up screen, because there is no server holding anything of yours.',
  },
  {
    title: 'There is no analytics to switch off',
    desc: 'It was never added to the app, so there is no advertising ID and no play history to leak.',
  },
  {
    title: 'The AI stays on the phone',
    desc: 'Restoration happens entirely on the phone. No audio is uploaded, because none of it needs to leave.',
  },
];

/**
 * Privacy band, ivory. The page's second and last light band.
 *
 * Centred claim, three commitments on a hairline row, and the honest note
 * about the three optional network calls. One band-well note, no cards.
 *
 * This band runs TIGHTER than its neighbours on purpose. It is the shortest
 * argument on the page, one headline and three facts, and letting it run compact
 * is what makes it land as a statement rather than as another full-height slab.
 * Every section at the same height reads as a template even when each is good.
 */
export default function PrivacyBand() {
  return (
    <section id="privacy" className="scroll-mt-20 bg-band-ivory pt-12 pb-13 lg:pt-24 lg:pb-26">
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
          ratio="3 / 1"
          ships="2560x853"
          className="r-rise mt-9 lg:mt-14"
        />
        <div className="r-fade mt-[26px] rounded-card-sm border border-band-ink/10 bg-band-well px-5 py-[18px] lg:mt-11 lg:rounded-card lg:px-[26px] lg:py-[22px]">
          <p className="text-[13px] leading-[1.6] text-pretty text-band-ink-muted lg:text-sm lg:leading-[1.65]">
            <span className="font-semibold text-band-ink">The whole truth:</span> four network calls and no more. Crash
            reports and album art lookup, both on by default and switchable in Settings, a one-time AI model download,
            and the check that says your subscription is active.{' '}
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
