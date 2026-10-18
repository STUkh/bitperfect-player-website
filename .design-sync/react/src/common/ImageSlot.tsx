import { plates } from '@site/data/plates';
import { asset } from '../lib/asset';
import { cx, scope } from '../lib/site';

export interface ImageSlotProps {
  /** Kebab-case slot id; also the plate's filename (`img/<name>.webp`). A name with a shipped plate shows that plate. */
  name: string;
  /** Desktop CSS aspect-ratio, e.g. `5 / 1`. */
  ratio: string;
  /** Aspect-ratio below 768px. Defaults to `3 / 1` for anything wider than 3:1, else `ratio`. */
  narrowRatio?: string;
  /** `band` is full-bleed between sections; `plate` sits in the column on graphite; `ivory` sits in the column on a white band. */
  variant?: 'band' | 'plate' | 'ivory';
  /** Shipping pixel size, printed on the empty frame's label (desktop only). */
  ships?: string;
  /** One line of art direction printed on the empty frame's label (desktop only). */
  note?: string;
  /** An explicit image URL; overrides the named plate. */
  src?: string;
  /** Alt text; leave empty for decorative plates. */
  alt?: string;
  /** With no plate: `frame` shows the registration-frame placeholder, `hidden` renders nothing (the live site's behaviour). */
  empty?: 'frame' | 'hidden';
  /** Extra classes on the outer wrapper (spacing, reveal). */
  className?: string;
}

const S = scope('jrmhgko3');

const parseRatio = (r: string): number => {
  const [w, h] = r.split('/').map((n) => Number(n.trim()));
  return h ? w / h : Number(r);
};

/**
 * An image plate at a fixed aspect ratio (taller below 768px): the shipped
 * photographic plate when one exists for `name`, otherwise a gold
 * registration frame labelled with the slot id that reads as "specified, on
 * its way". Use `variant="band"` as a full-bleed seam between page sections
 * (never inside one), `plate` inside a graphite section's Container, `ivory`
 * inside a white band such as PrivacyBand.
 */
export function ImageSlot({
  name,
  ratio,
  narrowRatio,
  variant = 'plate',
  ships,
  note,
  src,
  alt = '',
  empty = 'frame',
  className,
}: ImageSlotProps) {
  const narrow = narrowRatio ?? (parseRatio(ratio) > 3 ? '3 / 1' : ratio);
  const plateSrc = src ?? (plates.has(name) ? asset(`img/${name}.webp`) : undefined);
  if (!plateSrc && empty === 'hidden') return null;

  const label = ratio.replace('/', ':');
  const isIvory = variant === 'ivory';
  const isBand = variant === 'band';

  const tick = isIvory ? 'border-band-gold-ink/42' : 'border-gold/30';
  const tickPos = isBand
    ? ['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6']
    : ['top-5 left-5', 'top-5 right-5', 'bottom-5 left-5', 'bottom-5 right-5'];
  const tickSize = isBand ? 'h-[26px] w-[26px]' : 'h-[22px] w-[22px]';

  const shell = isIvory
    ? 'rounded-tile border border-band-rule bg-[linear-gradient(160deg,var(--color-slot-ivory-hi)_0%,var(--color-slot-ivory)_55%,var(--color-slot-ivory-lo)_100%)]'
    : isBand
      ? 'w-full border-y border-border-subtle bg-[linear-gradient(180deg,var(--color-surface-raised)_0%,var(--color-glass-elevated-surface)_52%,var(--color-slot-dark-lo)_100%)]'
      : 'rounded-card-inner border border-border-subtle shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] bg-[linear-gradient(160deg,var(--color-glass-elevated-surface)_0%,var(--color-glass-surface)_46%,var(--color-slot-dark-lo)_100%)]';

  return (
    <div className={cx(isBand ? 'w-full' : '', className)} data-img-slot={name} {...S}>
      <div
        className={cx('img-slot-frame relative overflow-hidden', shell)}
        style={{ '--slot-ratio': ratio, '--slot-ratio-narrow': narrow } as React.CSSProperties}
        {...S}
      >
        {plateSrc ? (
          <img
            src={plateSrc}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            {...S}
          />
        ) : (
          <>
            {tickPos.map((pos, i) => (
              <div
                key={pos}
                className={cx(
                  'absolute',
                  tick,
                  tickSize,
                  pos,
                  i === 0 && 'border-t border-l',
                  i === 1 && 'border-t border-r',
                  i === 2 && 'border-b border-l',
                  i === 3 && 'border-b border-r',
                )}
                aria-hidden="true"
                {...S}
              />
            ))}

            <div
              className={cx(
                'absolute inset-0 flex',
                isBand ? 'items-center px-5 lg:px-20' : 'flex-col items-center justify-center gap-3',
              )}
              {...S}
            >
              <div className={cx('flex', isBand ? 'items-center gap-[18px]' : 'flex-col items-center gap-3')} {...S}>
                <div
                  className={cx('h-px', isBand ? 'w-14' : 'w-11', isIvory ? 'bg-band-gold-ink/55' : 'bg-gold/50')}
                  aria-hidden="true"
                  {...S}
                />
                <span
                  className={cx(
                    'font-mono text-xs tracking-[1.4px] tabular-nums uppercase',
                    isIvory ? 'text-band-gold-ink' : 'text-gold',
                  )}
                  {...S}
                >
                  {name}
                </span>
                <span
                  className={cx(
                    'font-mono text-[11px] tracking-[0.6px] tabular-nums',
                    isIvory ? 'text-band-ink-muted' : 'text-text-tertiary',
                  )}
                  {...S}
                >
                  {label}
                  <span className="hidden lg:inline" {...S}>
                    {ships && ` · ships ${ships}`}
                    {note && ` · ${note}`}
                  </span>
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
