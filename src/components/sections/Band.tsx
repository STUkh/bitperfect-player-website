import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import Container from '../primitives/Container';
import FlowBackdrop, { type FlowProps } from '../bands/FlowBackdrop';
import { ToneContext, bandSpace, toneGround, type BandSpace, type Tone } from './bands';
import type { ClassProps } from '../_lib/class-props';

export interface BandProps extends Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>, ClassProps, FlowProps {
  /** Ground colour, `graphite` (default) or `ivory`. The shells inside inherit it in TSX. */
  tone?: Tone;
  /** Vertical padding, a step of the section rhythm (`default`); `none` leaves it to `className`. */
  space?: BandSpace;
  /** A backdrop class from the grounds (`ground-halftone`, `ground-cta`, `features-ground`...); adds the `ground` base. */
  ground?: string;
  /** Element to render. Defaults to `section`; the prev/next strip is a `nav`. */
  as?: 'section' | 'nav' | 'div';
  /** Extra classes for the inner `Container` (`lg:px-20`, `relative`). */
  containerClassName?: string;
  /** Skip the `Container`: the children lay out their own columns. */
  bare?: boolean;
  /** The band's content. */
  children?: ReactNode;
}

/**
 * A full-width band of a page: the ground colour of its tone, an optional
 * backdrop, the vertical padding of its `space` step, and the page `Container`
 * inside. Borders and anything else are the caller's, in `className`.
 */
export default function Band({
  tone = 'graphite',
  space = 'default',
  ground,
  backgroundVariant,
  as: Tag = 'section',
  containerClassName,
  bare = false,
  className,
  children,
  ...rest
}: BandProps) {
  return (
    <Tag className={cn(backgroundVariant ? 'flow-surface' : ground && ['ground', ground], toneGround[tone], bandSpace[space], className)} {...rest}>
      {backgroundVariant && <FlowBackdrop variant={backgroundVariant} light={tone === 'ivory'} />}
      <ToneContext.Provider value={tone}>
        {bare ? children : <Container className={containerClassName}>{children}</Container>}
      </ToneContext.Provider>
    </Tag>
  );
}
