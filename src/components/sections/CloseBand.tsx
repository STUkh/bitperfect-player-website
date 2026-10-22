import type { ReactNode } from 'react';
import Band from './Band';
import type { FlowProps } from '../bands/FlowBackdrop';
import SectionHeading from './SectionHeading';
import type { Tone } from './bands';
import type { ClassProps } from '../_lib/class-props';

export interface CloseBandProps extends ClassProps, FlowProps {
  /** Ground colour. Pick the one that alternates with the band above. */
  tone: Tone;
  /** A backdrop class (`ground-cta`); see `Band`. */
  ground?: string;
  /** The section's anchor id. */
  id?: string;
  /** Extra classes for the inner `Container`. */
  containerClassName?: string;
  /** Optional eyebrow; the closing band usually has none (DESIGN.md, The Eyebrow Budget Rule). */
  eyebrow?: ReactNode;
  /** The closing line (an `h2`). */
  title: ReactNode;
  /** A phrase after the title in the accent; see `SectionHeading`. */
  titleAccent?: ReactNode;
  /** One line under the title. */
  lede?: ReactNode;
  /** Type and spacing of the eyebrow, title and lede; see `SectionHeading`. */
  eyebrowClassName?: string;
  titleClassName?: string;
  ledeClassName?: string;
  /** The action, usually a `PlayCta` carrying its own spacing and reveal (`slot="action"` from `.astro`). */
  action?: ReactNode;
  /** More content after the action, e.g. the price line. */
  children?: ReactNode;
}

/**
 * The last band of a page above the Footer: a centred heading, one line and the
 * install. The title reveals at `--i: 0`, the lede at `1`; the action, passed
 * in, takes `2`. Padding and borders are the caller's (`className`).
 *
 * `ClosingBanner` is the other closing band: the rosette plate with two
 * buttons, for the catalog and help pages.
 */
export default function CloseBand(props: CloseBandProps) {
  const { tone, ground, backgroundVariant, id, className, containerClassName, action, children, ...heading } = props;
  return (
    <Band tone={tone} ground={ground} backgroundVariant={backgroundVariant} id={id} className={className} containerClassName={containerClassName}>
      <SectionHeading tone={tone} reveal={0} className="flex flex-col items-center text-center" {...heading}>
        {action}
        {children}
      </SectionHeading>
    </Band>
  );
}
