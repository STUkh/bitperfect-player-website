import type { CSSProperties, ReactNode } from 'react';
import { clsx as cx } from 'clsx';
import { cn } from '../../utils/cn';
import Container from '../common/Container';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import type { ClassProps } from '../class-props';
import './CapabilityBand.css';

/**
 * One full-width band of a capability page (`/features/catalog/<id>`): copy on
 * one side, a real app capture in the site's `PhoneFrame` on the other. A page
 * is a run of these that alternates ground AND side together: graphite with the
 * phone right, then ivory with the phone left, then graphite right again.
 *
 * The split is 7/5 of twelve from `lg`, never 50/50 (DESIGN.md, "The alternating
 * band"). Below `lg` it is one column and the phone comes AFTER the copy in every
 * band, whatever `media` says.
 *
 * Ivory bands follow "The Ivory Band Has No Shadows": `bg-band-ivory` nulls the
 * phone's cast shadow, and everything inside is hairlines and space (spec rows
 * are `border-t border-band-rule` rows, never cards). Text tokens follow the
 * tone: `text-text-*` on graphite, `text-band-*` on ivory.
 *
 * `titleAs="h1"` makes it the page's opening band: a larger heading, the body set
 * as a lede, the back link above, the brushed plate and an overhead wash, the
 * screen loaded eagerly. Use it once per page, first, on graphite.
 *
 * Content is all props; the band knows nothing about the capability data.
 */
export interface CapabilityBandProps extends ClassProps {
  /** Ground colour. `graphite` (the site's dark `#191919`) or `ivory` (the white paper band). Alternate them down a page. */
  tone: 'graphite' | 'ivory';
  /** Which side the phone sits on from `lg`. Graphite bands take `right`, ivory bands `left`. Below `lg` the phone always follows the copy. */
  media: 'right' | 'left';
  /** Short mono uppercase line above the title, e.g. `§ Core engine · 01`. Only on the opening band (`titleAs="h1"`); other bands open on their heading (DESIGN.md, The Kicker Rule). */
  eyebrow?: string;
  /** The band's heading. */
  title: string;
  /** `h1` for the page's opening band, `h2` (default) for every band after it. */
  titleAs?: 'h1' | 'h2';
  /** A paragraph under the title. On an `h1` band it is set as the page lede. */
  body?: string;
  /** A short status line under the body, e.g. `Core architecture`. Rendered as a graphite lacquer chip on graphite, a hairline-ruled label on ivory. */
  badge?: string;
  /** Label/value rows under the body, as hairline rows with tabular figures. */
  specs?: { label: string; value: string }[];
  /** Back link above the eyebrow (opening band). Shows only with `backLabel`. */
  backHref?: string;
  /** Text of the back link, e.g. `All 27 capabilities`. */
  backLabel?: string;
  /** The capture to show: a key of `src/data/screens.ts` (now-playing, output, eq, dsp, ai, ...). An unknown key leaves the frame empty. */
  screen: string;
  /** Alt text for the capture. Default empty: the copy beside it already says what it shows. */
  screenAlt?: string;
  /** The section's anchor id. */
  id?: string;
  /** A text link under the specs (e.g. the public SDK). `external` opens it in a new tab and adds the external-link glyph. */
  link?: { href: string; label: string; external?: boolean };
  /** Extra content after the body, specs and link: a note. Use the tone's text tokens. */
  children?: ReactNode;
}

const reveal = (i: number) => ({ '--i': String(i) }) as CSSProperties;

/** A copy-and-phone band of a capability page; see `CapabilityBandProps`. */
export default function CapabilityBand(props: CapabilityBandProps) {
  const {
    tone,
    media,
    eyebrow,
    title,
    titleAs = 'h2',
    body,
    badge,
    specs,
    backHref,
    backLabel,
    screen,
    screenAlt,
    link,
    id,
    className,
    children,
  } = props;

  const ivory = tone === 'ivory';
  const opening = titleAs === 'h1';
  const Heading = titleAs;

  return (
    <section
      id={id}
      data-media={media}
      className={cn(
        'capability-band ground',
        ivory ? 'ground-capability-ivory bg-band-ivory' : 'ground-capability-graphite bg-surface-base',
        opening
          ? 'capability-band-opening border-b border-border-subtle pt-[26px] pb-16 lg:pt-11 lg:pb-24'
          : ivory
            ? 'py-16 lg:py-32'
            : 'py-14 lg:py-28',
        className,
      )}
    >
      <Container>
        {backHref && backLabel && (
          <a
            href={backHref}
            className={cx(
              'mb-6 inline-flex min-h-[44px] items-center gap-1.5 rounded text-caption font-medium transition-colors duration-[var(--d-ui)] focus-visible:focus-ring lg:mb-10',
              ivory ? 'text-band-ink-muted hover:text-band-gold-ink' : 'text-text-tertiary hover:text-gold',
            )}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>{' '}
            <span>{backLabel}</span>
          </a>
        )}

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div
            className={cx(
              'flex flex-col lg:col-span-7',
              media === 'left' ? 'lg:order-2 lg:col-start-6 lg:pl-6' : 'lg:order-1 lg:pr-6',
            )}
          >
            {eyebrow && (
              <span
                className={cx(
                  'r-fade mono-spec mb-4 text-micro font-medium tracking-[1.2px] uppercase tabular-nums lg:mb-5 lg:tracking-[1.5px]',
                  ivory ? 'text-band-gold-ink' : 'text-gold',
                )}
              >
                {eyebrow}
              </span>
            )}

            <Heading
              className={cx(
                'r-rise text-balance',
                opening ? 'text-headline-m lg:text-headline-sm' : 'text-section-m lg:text-section',
                ivory ? 'text-band-ink' : 'text-text-primary',
              )}
              style={reveal(1)}
            >
              {title}
            </Heading>

            {body && (
              <p
                className={cx(
                  'r-rise mt-4 max-w-[56ch] text-pretty lg:mt-5',
                  opening ? 'text-lede-m lg:text-lede' : 'text-body lg:text-body-lg',
                  ivory ? 'text-band-ink-muted' : 'text-text-secondary',
                )}
                style={reveal(2)}
              >
                {body}
              </p>
            )}

            {badge && (
              <span
                className={cx(
                  'r-rise mt-6 inline-flex w-fit items-center text-label tracking-micro uppercase',
                  ivory
                    ? 'border-t border-band-rule pt-3 text-band-ink-muted'
                    : 'lacquer rounded-chip px-3.5 py-2 text-text-secondary [--lq-drop:none]',
                )}
                style={reveal(3)}
              >
                {badge}
              </span>
            )}

            {specs && specs.length > 0 && (
              <dl className="r-rise mt-8 w-full max-w-[560px] lg:mt-10" style={reveal(3)}>
                {specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={cx(
                      'flex flex-col gap-1 border-t py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 lg:py-4',
                      ivory ? 'border-band-rule' : 'border-border-subtle',
                      i === specs.length - 1 && 'border-b',
                    )}
                  >
                    <dt className={cx('shrink-0 text-caption', ivory ? 'text-band-ink-muted' : 'text-text-tertiary')}>
                      {spec.label}
                    </dt>
                    <dd
                      className={cx(
                        'text-small font-semibold tabular-nums sm:text-right',
                        ivory ? 'text-band-ink' : 'text-text-primary',
                      )}
                    >
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {link && (
              <a
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={cx(
                  'r-rise mt-6 inline-flex min-h-[44px] w-fit items-center gap-1.5 rounded text-small font-medium transition-colors duration-[var(--d-ui)] hover:underline focus-visible:focus-ring',
                  ivory ? 'text-band-ink-muted hover:text-band-gold-ink' : 'text-gold hover:text-gold-light',
                )}
                style={reveal(4)}
              >
                <span>{link.label}</span>
                {link.external && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                )}
              </a>
            )}

            {children != null && children !== false && (
              <div className="r-rise mt-6" style={reveal(4)}>
                {children}
              </div>
            )}
          </div>

          <div
            className={cx(
              'r-fade flex justify-center lg:col-span-5',
              media === 'left' ? 'lg:order-1 lg:col-start-1 lg:row-start-1' : 'lg:order-2',
            )}
            style={reveal(2)}
          >
            <PhoneFrame>
              <PhoneScreen name={screen} alt={screenAlt} priority={opening} />
            </PhoneFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
