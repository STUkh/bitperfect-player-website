import { clsx as cx } from 'clsx';
import { neuralChipFamilies, liteModeNote } from '../../data/neural-chips';
import { toneText, useTone, type Tone } from '../sections/bands';
import type { ClassProps } from '../_lib/class-props';

export interface NeuralChipListProps extends ClassProps {
  /** Text and hairline tokens. Inherited from the enclosing `Band` in TSX; pass it from `.astro`. */
  tone?: Tone;
  /** Anchor id, for links to the list (the AI Enhancer guide uses `supported-neural-chips`). */
  id?: string;
}

/**
 * The neural chips that run AI Enhancer's full model, from
 * `src/data/neural-chips.ts`: one hairline-ruled list per family (Snapdragon,
 * Dimensity), side by side from `md`, then the Lite mode line for every other
 * phone. A plain reference list with no state of its own; a page that wants it
 * folded wraps it in its own `<details>`.
 */
export default function NeuralChipList({ tone, id, className }: NeuralChipListProps) {
  const t = toneText[useTone(tone)];

  return (
    <div id={id} className={cx(['scroll-mt-24', className])}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
        {neuralChipFamilies.map((family) => (
          <section key={family.id} aria-labelledby={`neural-chips-${family.id}`}>
            <h3 id={`neural-chips-${family.id}`} className={cx(['text-body font-semibold', t.title])}>
              {family.name}
            </h3>
            <ul className="mt-3" role="list">
              {family.chips.map((chip) => (
                <li key={chip} className={cx(['border-t py-2 text-small tabular-nums', t.rule, t.body])}>
                  {chip}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className={cx(['mt-5 text-small text-pretty', t.body])}>{liteModeNote}</p>
    </div>
  );
}
