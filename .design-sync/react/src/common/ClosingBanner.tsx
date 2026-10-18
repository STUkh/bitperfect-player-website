import type { ReactNode } from 'react';
import { Container } from './Container';
import { Button } from './Button';
import { cx } from '../lib/site';

export interface ClosingBannerProps {
  /** Gold mono eyebrow. */
  eyebrow: string;
  /** Closing headline (h2). */
  title: string;
  /** One line under the headline. */
  description: string;
  /** Primary (gold) action. */
  primaryHref: string;
  primaryLabel: string;
  /** Opens the primary action in a new tab (store links). */
  primaryExternal?: boolean;
  /** Optional secondary (glass) action beside it; renders only with both href and label. */
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryExternal?: boolean;
  /** Column width, centred. Default `840px`. */
  maxWidth?: '760px' | '840px';
  /** Slot above the eyebrow, centred (an icon, a badge). */
  top?: ReactNode;
}

/**
 * The last band of an inner page: raised graphite with the rosette ground, a
 * centred eyebrow, headline and line, then a gold primary and optional glass
 * secondary button. Place it after the page body, directly above the Footer;
 * it pairs with PageHeader at the top.
 */
export function ClosingBanner({
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
}: ClosingBannerProps) {
  const maxWidthClass = maxWidth === '760px' ? 'max-w-[760px]' : 'max-w-[840px]';
  return (
    <section className="ground ground-rosette border-t border-border-subtle bg-surface-raised py-16 lg:py-24">
      <Container>
        <div className={cx('mx-auto', maxWidthClass)}>
          {top && <div className="w-full flex flex-col items-center text-center">{top}</div>}

          <div className="flex flex-col items-center text-center">
            <span className="mono-spec text-eyebrow uppercase tracking-widest text-gold">
              {eyebrow}
            </span>
            <h2 className="mt-4 max-w-xl text-section-sm font-bold text-text-primary lg:text-section-lg text-balance">
              {title}
            </h2>
            <p className="mt-3 max-w-xl text-body text-text-secondary text-pretty">
              {description}
            </p>
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
