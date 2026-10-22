import { clsx as cx } from 'clsx';
import { styleOf, type ClassProps, type StyleInput } from '../class-props';
import { toneText, useTone, type Tone } from './bands';

export interface SpecListProps extends ClassProps {
  /** Text and hairline tokens. Inherited from the enclosing `Band` in TSX; pass it from `.astro`. */
  tone?: Tone;
  /** The rows: a label and its value (tabular figures). */
  items: { label: string; value: string }[];
  /** `quiet` (default) sets the labels in the tertiary line colour; `accent` in gold (gold ink on ivory). */
  labelTone?: 'quiet' | 'accent';
  /**
   * The closing hairline. `last` (default): under the last row. `grid-2`: under
   * the last row, and from `lg` under the last two (a two-column list). `none`.
   */
  close?: 'last' | 'grid-2' | 'none';
  /** Layout of each row. Replaces the default label-left, value-right row (stacked below `sm`). The top hairline is always set. */
  rowClassName?: string;
  /** Type of the label. Replaces the default `shrink-0 text-caption`. */
  labelClassName?: string;
  /** Type of the value. Replaces the default `text-small font-semibold tabular-nums sm:text-right`. */
  valueClassName?: string;
  /** An object from React; CSS text (`"--i: 3"`) from an `.astro` caller. */
  style?: StyleInput;
}

/**
 * Label and value rows on hairlines, as a `<dl>`: the numbers of a band (a
 * spec table, a route's summary, a beat's stats). Each row has a top hairline
 * in the tone's rule colour, and `close` draws the one under the list. No
 * cards, ever: on ivory it is hairlines and space (DESIGN.md, "The Ivory Band
 * Has No Shadows"). The list's own layout (a grid, a measure, a reveal) is
 * `className`.
 */
export default function SpecList(props: SpecListProps) {
  const {
    items,
    labelTone = 'quiet',
    close = 'last',
    rowClassName = 'flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 lg:py-4',
    labelClassName = 'shrink-0 text-caption',
    valueClassName = 'text-small font-semibold tabular-nums sm:text-right',
    className,
    style,
  } = props;
  const text = toneText[useTone(props.tone)];
  const count = items.length;

  return (
    <dl className={className} style={styleOf(style)}>
      {items.map((item, i) => (
        <div
          key={item.label}
          className={cx(
            rowClassName,
            'border-t',
            text.rule,
            close === 'grid-2' && i >= count - 2 && 'lg:border-b',
            close !== 'none' && i === count - 1 && 'border-b',
          )}
        >
          <dt className={cx(labelClassName, labelTone === 'accent' ? text.accent : text.quiet)}>{item.label}</dt>
          <dd className={cx(valueClassName, text.title)}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
