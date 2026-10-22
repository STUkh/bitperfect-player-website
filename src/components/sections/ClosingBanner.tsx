import type { ReactNode } from 'react';
import { clsx as cx } from 'clsx';
import Band from './Band';
import Button from '../primitives/Button';
import SectionHeading from './SectionHeading';
import './ClosingBanner.css';

/**
 * The closing call to action of a page: a centred band on a rosette ground with an
 * eyebrow, a title, one line of copy, a primary (gold) button and an optional
 * secondary (graphite) one, large. Put it just above the Footer.
 */
export interface ClosingBannerProps {
  /** Small gold uppercase label above the title. */
  eyebrow: string;
  /** The band's heading (an `h2`). */
  title: string;
  /** One or two sentences under the title. */
  description: string;
  /** Destination of the primary gold button. */
  primaryHref: string;
  /** Label of the primary button. */
  primaryLabel: string;
  /** Opens the primary link in a new tab with `rel="noopener noreferrer"`. Default false. */
  primaryExternal?: boolean;
  /** Destination of the secondary button; it shows only when both `secondaryHref` and `secondaryLabel` are set. */
  secondaryHref?: string;
  /** Label of the secondary button. */
  secondaryLabel?: string;
  /** Opens the secondary link in a new tab. Default false. */
  secondaryExternal?: boolean;
  /** Width of the centred column. Default `840px`. */
  maxWidth?: '760px' | '840px';
  /** Optional content above the eyebrow, centred (Astro's `slot="top"`). */
  top?: ReactNode;
}

/** The page-closing install/contact band; see `ClosingBannerProps`. */
export default function ClosingBanner(props: ClosingBannerProps) {
  const {
    eyebrow,
    title,
    description,
    primaryHref,
    primaryLabel,
    primaryExternal = false,
    secondaryHref,
    secondaryLabel,
    secondaryExternal = false,
    maxWidth = '840px',
    top,
  } = props;

  const maxWidthClass = maxWidth === '760px' ? 'max-w-[760px]' : 'max-w-[840px]';

  return (
    <Band ground="ground-rosette" className="border-t border-border-subtle bg-surface-raised py-16 lg:py-24">
      <div className={cx(['mx-auto', maxWidthClass])}>
        {top != null && <div className="w-full flex flex-col items-center text-center">{top}</div>}
        <SectionHeading
          className="flex flex-col items-center text-center"
          eyebrow={eyebrow}
          eyebrowClassName="mono-spec text-eyebrow uppercase tracking-widest"
          title={title}
          titleClassName="mt-4 max-w-xl text-section-sm font-bold lg:text-section-lg"
          lede={description}
          ledeClassName="mt-3 max-w-xl text-body text-pretty"
        >
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href={primaryHref}
              variant="primary"
              size="lg"
              target={primaryExternal ? '_blank' : undefined}
              rel={primaryExternal ? 'noopener noreferrer' : undefined}
            >
              {primaryLabel}
            </Button>
            {secondaryHref && secondaryLabel && (
              <Button
                href={secondaryHref}
                variant="secondary"
                size="lg"
                target={secondaryExternal ? '_blank' : undefined}
                rel={secondaryExternal ? 'noopener noreferrer' : undefined}
              >
                {secondaryLabel}
              </Button>
            )}
          </div>
        </SectionHeading>
      </div>
    </Band>
  );
}
