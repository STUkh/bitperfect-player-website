import { Container } from '../common/Container';
import { ImageSlot } from '../common/ImageSlot';
import { cx, t, withBase, stagger, scope } from '../lib/site';

export interface PrivacyCommitment {
  /** Short ink heading. */
  title: string;
  /** One or two sentences under it. */
  desc: string;
}

export interface PrivacyBandProps {
  /** The centred claim. */
  heading?: string;
  /** The commitments on the hairline row (three on the site). */
  commitments?: PrivacyCommitment[];
  /** Plate name for the ivory image between the row and the note; `null` drops it. */
  plate?: string | null;
  /** Bold lead-in of the closing note. */
  noteLabel?: string;
  /** Body of the closing note. */
  noteBody?: string;
  /** Label of the policy link that ends the note. */
  policyLabel?: string;
  /** Target of the policy link. */
  policyHref?: string;
}

const S = scope('vcmtvob3');

/**
 * Ivory privacy band: a centred headline, three commitments on a hairline row
 * (stacked on phones), an ivory ImageSlot plate, and a small "whole truth"
 * note ending in a link to the privacy policy. Deliberately compact; on the
 * home page it follows the features section and precedes PricingSection.
 */
export function PrivacyBand({
  heading = t('privacy.heading'),
  commitments = [
    { title: t('privacy.fact1_title'), desc: t('privacy.fact1_desc') },
    { title: t('privacy.fact2_title'), desc: t('privacy.fact2_desc') },
    { title: t('privacy.fact3_title'), desc: t('privacy.fact3_desc') },
  ],
  plate = 'home-privacy',
  noteLabel = t('privacy.whole_truth_label'),
  noteBody = t('privacy.whole_truth_body'),
  policyLabel = t('privacy.read_policy'),
  policyHref = withBase('/privacy'),
}: PrivacyBandProps) {
  return (
    <section id="privacy" className="ground ground-halftone scroll-mt-20 bg-band-ivory pt-12 pb-13 lg:pt-24 lg:pb-26" {...S}>
      <Container>
        <div className="flex flex-col lg:items-center lg:text-center" {...S}>
          <h2 className="r-rise text-headline-sm-m text-balance text-band-ink lg:max-w-[16ch] lg:text-headline-xl" style={stagger(0)} {...S}>
            {heading}
          </h2>
        </div>

        <div className="mt-[30px] grid grid-cols-1 lg:mt-[68px] lg:grid-cols-3 lg:border-t lg:border-band-rule" {...S}>
          {commitments.map((c, i) => (
            <div
              key={i}
              className={cx(
                'r-rise border-t border-band-rule py-5 lg:border-t-0 lg:pt-[34px] lg:pb-0',
                i === commitments.length - 1 && 'border-b border-band-rule lg:border-b-0',
                i > 0 ? 'lg:border-l lg:border-band-rule lg:pl-10' : '',
                i < commitments.length - 1 ? 'lg:pr-10' : '',
              )}
              style={stagger(i)}
              {...S}
            >
              <div className="text-[17px] font-semibold tracking-[-0.01em] text-band-ink lg:text-[19px]" {...S}>
                {c.title}
              </div>
              <p className="mt-1.5 text-sm leading-[1.62] text-pretty text-band-ink-muted lg:mt-2.5 lg:text-[15px]" {...S}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {plate && (
          <ImageSlot name={plate} variant="ivory" ratio="3 / 1" ships="2560x853" className="r-rise mt-9 lg:mt-14" />
        )}

        <div className="r-fade mt-[26px] border-t border-band-rule pt-5 lg:mt-11 lg:pt-6" {...S}>
          <p className="text-[13px] leading-[1.6] text-pretty text-band-ink-muted lg:text-sm lg:leading-[1.65]" {...S}>
            <span className="font-semibold text-band-ink" {...S}>{noteLabel}</span>
            {' '}{noteBody}{' '}
            <a href={policyHref} className="privacy-link focus-visible:focus-ring" {...S}>{policyLabel}</a>.
          </p>
        </div>
      </Container>
    </section>
  );
}
