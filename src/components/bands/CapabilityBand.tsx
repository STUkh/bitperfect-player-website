import type { ReactNode } from 'react';
import { clsx as cx } from 'clsx';
import { cn } from '../../utils/cn';
import BackLink from '../sections/BackLink';
import Band from '../sections/Band';
import MediaSplit from '../sections/MediaSplit';
import SectionHeading from '../sections/SectionHeading';
import SpecList from '../sections/SpecList';
import { reveal } from '../sections/bands';
import Phone from '../devices/Phone';
import { GlyphShapes } from '../primitives/Icon';
import { EXTERNAL_LINK } from '../primitives/glyphs';
import type { ScreenName } from '../../data/screens';
import type { ClassProps } from '../_lib/class-props';
import './CapabilityBand.css';

/**
 * One full-width band of a capability page (`/features/catalog/<id>`): copy on
 * one side, a real app capture in the site's `Phone` on the other. A page
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
  /** The capture to show: a key of `src/data/screens.ts` (now-playing, output, eq, dsp, ai, ...). */
  screen: ScreenName;
  /** Alt text for the capture. Default empty: the copy beside it already says what it shows. */
  screenAlt?: string;
  /** The section's anchor id. */
  id?: string;
  /** A text link under the specs (e.g. the public SDK). `external` opens it in a new tab and adds the external-link glyph. */
  link?: { href: string; label: string; external?: boolean };
  /** Extra content after the body, specs and link: a note. Use the tone's text tokens. */
  children?: ReactNode;
}

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

  return (
    <Band
      id={id}
      data-media={media}
      tone={tone}
      space={opening ? 'none' : ivory ? 'spacious' : 'default'}
      ground={ivory ? 'ground-capability-ivory' : 'ground-capability-graphite'}
      className={cn(
        'capability-band',
        opening && 'capability-band-opening border-b border-border-subtle pt-[26px] pb-16 lg:pt-11 lg:pb-24',
        className,
      )}
    >
      {backHref && backLabel && <BackLink href={backHref} label={backLabel} tone={tone} className="mb-6 lg:mb-10" />}

      <MediaSplit
        mediaSide={media}
        copyClassName="flex flex-col"
        mediaClassName="r-fade"
        mediaStyle={reveal(2)}
        media={<Phone screen={screen} alt={screenAlt} priority={opening} />}
      >
        <SectionHeading
          className="contents"
          tone={tone}
          eyebrow={eyebrow}
          eyebrowClassName="mono-spec mb-4 text-micro font-medium tracking-[1.2px] uppercase tabular-nums lg:mb-5 lg:tracking-[1.5px]"
          title={title}
          titleAs={titleAs}
          titleClassName={opening ? 'text-headline-m lg:text-headline-sm' : 'text-section-m lg:text-section'}
          lede={body}
          ledeClassName={cx(
            'mt-4 max-w-[56ch] text-pretty lg:mt-5',
            opening ? 'text-lede-m lg:text-lede' : 'text-body lg:text-body-lg',
          )}
          reveal={1}
        />

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
          <SpecList tone={tone} items={specs} className="r-rise mt-8 w-full max-w-[560px] lg:mt-10" style={reveal(3)} />
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
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <GlyphShapes glyph={EXTERNAL_LINK} />
              </svg>
            )}
          </a>
        )}

        {children != null && children !== false && (
          <div className="r-rise mt-6" style={reveal(4)}>
            {children}
          </div>
        )}
      </MediaSplit>
    </Band>
  );
}
