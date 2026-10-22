import type { ReactNode } from 'react';
import { clsx as cx } from 'clsx';
import Container from './Container';
import Button from './Button';
import './ClosingBanner.css';

export interface ClosingBannerProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  primaryExternal?: boolean;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryExternal?: boolean;
  maxWidth?: '760px' | '840px';
  /** Above the eyebrow, centred (Astro's `slot="top"`). */
  top?: ReactNode;
}

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
    <section className="ground ground-rosette border-t border-border-subtle bg-surface-raised py-16 lg:py-24">
      <Container>
        <div className={cx(['mx-auto', maxWidthClass])}>
          {top != null && <div className="w-full flex flex-col items-center text-center">{top}</div>}
          <div className="flex flex-col items-center text-center">
            <span className="mono-spec text-eyebrow uppercase tracking-widest text-gold">{eyebrow}</span>
            <h2 className="mt-4 max-w-xl text-section-sm font-bold text-text-primary lg:text-section-lg text-balance">
              {title}
            </h2>
            <p className="mt-3 max-w-xl text-body text-text-secondary text-pretty">{description}</p>
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
          </div>
        </div>
      </Container>
    </section>
  );
}
