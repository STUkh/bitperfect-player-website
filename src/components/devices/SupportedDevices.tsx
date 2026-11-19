import { clsx as cx } from 'clsx';
import { neuralChipFamilies, liteModeNote } from '../../data/neural-chips';
import { toneText, useTone, type Tone } from '../sections/bands';
import type { ClassProps } from '../_lib/class-props';
import { withBase } from '../../utils/nav';

export interface SupportedDevicesProps extends ClassProps {
  /** Text and hairline tokens. Defaults to graphite. */
  tone?: Tone;
  /** Anchor id, for hash navigation (e.g. `supported-neural-chips`). */
  id?: string;
  /** Kept for older callers; both variants render the same two-column list. */
  variant?: 'reference' | 'compact';
}

/**
 * The supported neural chips as a two-column reference list (Snapdragon,
 * Dimensity), with the Lite mode line and a link to /compatibility under it.
 * Static: the full page with phones and Lite mode processors is /compatibility.
 */
export default function SupportedDevices({ tone = 'graphite', id = 'supported-neural-chips', className }: SupportedDevicesProps) {
  const currentTone = useTone(tone);
  const t = toneText[currentTone];
  const isGraphite = currentTone === 'graphite';

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

      <div className={cx(['mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between', t.rule])}>
        <p className={cx(['text-small text-pretty', t.body])}>{liteModeNote}</p>
        <a
          href={withBase('compatibility')}
          className={cx([
            'focus-visible:focus-ring inline-flex shrink-0 items-center text-small font-semibold transition-colors',
            isGraphite ? 'text-gold hover:text-gold-light' : 'text-band-gold-ink hover:underline',
          ])}
        >
          Check compatibility
        </a>
      </div>
    </div>
  );
}
