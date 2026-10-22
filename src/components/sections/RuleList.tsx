import type { ReactNode } from 'react';
import { clsx as cx } from 'clsx';
import { reveal as stagger, toneText, useTone, type Tone } from './bands';
import type { ClassProps } from '../_lib/class-props';

export interface RuleListProps extends ClassProps {
  /** Text and hairline tokens. Inherited from the enclosing `Band` in TSX. */
  tone?: Tone;
  /** The entries: a short title and a line or two under it. Titles are ink, never gold (DESIGN.md, The Gold Hierarchy Rule). */
  items: { title: string; body: ReactNode }[];
  /**
   * `stack` (default): one column, a hairline above every entry and one under
   * the last. `columns`: the same stack on phones; from `lg` a row with one
   * hairline over it and vertical rules between the entries. Set the column
   * count in `className` (`lg:grid-cols-3`).
   */
  layout?: 'stack' | 'columns';
  /** Vertical rhythm of an entry (`py-5 lg:py-[26px]`). */
  itemClassName?: string;
  /** Type of the title (`text-base font-semibold tracking-title lg:text-[17px]`). */
  titleClassName?: string;
  /** Type of the line under it. */
  bodyClassName?: string;
  /** Entries rise one after another (`r-rise`, `--i` = index). Default true. */
  reveal?: boolean;
}

/**
 * Short title-and-line entries separated by hairlines and space, never cards:
 * the facts of an ivory band. A `<ul>`; layout is `className`, rhythm and type
 * are per slot, colours come from the tone.
 */
export default function RuleList(props: RuleListProps) {
  const { items, layout = 'stack', itemClassName, titleClassName, bodyClassName, reveal = true, className } = props;
  const text = toneText[useTone(props.tone)];
  const columns = layout === 'columns';
  const last = items.length - 1;

  return (
    <ul role="list" className={cx(columns && ['grid grid-cols-1 lg:border-t', text.rule], className)}>
      {items.map((item, i) => (
        <li
          key={item.title}
          className={cx(
            reveal && 'r-rise',
            'border-t',
            text.rule,
            itemClassName,
            i === last && 'border-b',
            columns && ['lg:border-t-0', i === last && 'lg:border-b-0', i > 0 && 'lg:border-l lg:pl-10', i < last && 'lg:pr-10'],
          )}
          style={reveal ? stagger(i) : undefined}
        >
          <div className={cx(titleClassName, text.title)}>{item.title}</div>
          <p className={cx(bodyClassName, text.body)}>{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
