import type { CSSProperties, ReactNode } from 'react';
import { clsx as cx } from 'clsx';
import { reveal as stagger, toneText, useTone, type Tone } from './bands';
import type { ClassProps } from '../_lib/class-props';

export interface SectionHeadingProps extends ClassProps {
  /** Text tokens to use. Inherited from the enclosing `Band` in TSX; pass it from `.astro`. */
  tone?: Tone;
  /** Short mono uppercase line above the title. Most bands open on their heading (DESIGN.md, The Kicker Rule). */
  eyebrow?: ReactNode;
  /** `accent` (default) sets the eyebrow in gold (gold ink on ivory); `quiet` in the tertiary line colour. */
  eyebrowTone?: 'accent' | 'quiet';
  /** The heading. A node, so an accent phrase can sit in a `<span>`. */
  title: ReactNode;
  /** A phrase set after the title in the accent (gold, gold ink on ivory): `title="Your music, " titleAccent="bit for bit."`. */
  titleAccent?: ReactNode;
  /** Heading level. Default `h2`. */
  titleAs?: 'h1' | 'h2' | 'h3';
  /** The heading's id, for a section's `aria-labelledby`. */
  titleId?: string;
  /** A paragraph under the title. */
  lede?: ReactNode;
  /** Type and spacing of the eyebrow. Replaces the default `mono-spec text-micro font-medium tracking-[1.2px] uppercase lg:tracking-[1.5px]`. */
  eyebrowClassName?: string;
  /** Type and spacing of the title. Replaces the default `text-section-m lg:text-section`. */
  titleClassName?: string;
  /** Type and spacing of the lede. Replaces the default `text-body text-pretty lg:text-body-lg`. */
  ledeClassName?: string;
  /**
   * Stagger index of the title in the reveal. Set, the eyebrow fades (`r-fade`)
   * and the title and lede rise (`r-rise`) at `--i` = `reveal` and `reveal + 1`.
   * Unset, nothing reveals.
   */
  reveal?: number;
  /** Wrapper style (an object; this shell is composed from TSX or given static props). */
  style?: CSSProperties;
  /** More content after the lede, inside the wrapper: an action, stats, a note. */
  children?: ReactNode;
}

/**
 * The opening of a band: an optional eyebrow, the heading and an optional lede,
 * in one wrapper `div` whose layout is the caller's (`className`: a column span,
 * a measure, `flex flex-col items-center text-center`). Colours come from the
 * tone and are never passed in; type sizes and spacing are passed per slot,
 * because the bands set them differently.
 */
export default function SectionHeading(props: SectionHeadingProps) {
  const {
    eyebrow,
    eyebrowTone = 'accent',
    title,
    titleAccent,
    titleAs: Heading = 'h2',
    titleId,
    lede,
    eyebrowClassName = 'mono-spec text-micro font-medium tracking-[1.2px] uppercase lg:tracking-[1.5px]',
    titleClassName = 'text-section-m lg:text-section',
    ledeClassName = 'text-body text-pretty lg:text-body-lg',
    reveal,
    className,
    style,
    children,
  } = props;
  const text = toneText[useTone(props.tone)];
  const reveals = reveal != null;

  return (
    <div className={className} style={style}>
      {eyebrow != null && (
        <span className={cx(reveals && 'r-fade', eyebrowClassName, eyebrowTone === 'quiet' ? text.quiet : text.accent)}>
          {eyebrow}
        </span>
      )}
      <Heading
        id={titleId}
        className={cx(reveals && 'r-rise', 'text-balance', titleClassName, text.title)}
        style={reveals ? stagger(reveal) : undefined}
      >
        {title}
        {titleAccent != null && <span className={text.accent}>{titleAccent}</span>}
      </Heading>
      {lede != null && (
        <p className={cx(reveals && 'r-rise', ledeClassName, text.body)} style={reveals ? stagger(reveal + 1) : undefined}>
          {lede}
        </p>
      )}
      {children}
    </div>
  );
}
