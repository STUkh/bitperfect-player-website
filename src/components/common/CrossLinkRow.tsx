import { clsx as cx } from 'clsx';
import Button from './Button';
import type { ClassProps } from '../_lib/class-props';

export interface CrossLinkRowProps extends ClassProps {
  /** Small gold mono line above the title, e.g. "Technical catalog". */
  eyebrow: string;
  /** A tertiary note after the eyebrow on the same line, e.g. "27 entries". Shown after a `·`. */
  badge?: string;
  /** The row's heading (an `h3`: it sits inside a band that has its own `h2`). */
  title: string;
  /** One line under the title. */
  body: string;
  /** Where the button goes. */
  href: string;
  /** The button's label. No arrow: it is a button. */
  cta: string;
  /** Classes for the copy column (`max-w-2xl`). */
  copyClassName?: string;
  /** Size and spacing of the title. Replaces the default `mt-1.5 text-title-sm`. */
  titleClassName?: string;
  /** Size and spacing of the line. Replaces the default `mt-1.5 max-w-xl text-small`. */
  bodyClassName?: string;
  /** Extra classes for the button (`tabular-nums`). */
  ctaClassName?: string;
}

/**
 * A pointer to another part of the site at the foot of a band: an eyebrow, a
 * title and a line on the left, one secondary `Button` on the right (stacked
 * under the copy below `md`). Hairlines and spacing above it are the caller's
 * (`className`). On graphite only.
 */
export default function CrossLinkRow(props: CrossLinkRowProps) {
  const {
    eyebrow,
    badge,
    title,
    body,
    href,
    cta,
    copyClassName,
    titleClassName = 'mt-1.5 text-title-sm',
    bodyClassName = 'mt-1.5 max-w-xl text-small',
    ctaClassName,
    className,
  } = props;
  const kicker = <span className="mono-spec text-micro font-semibold tracking-wider text-gold uppercase">{eyebrow}</span>;

  return (
    <div className={cx('flex flex-col items-start justify-between gap-6 md:flex-row md:items-center', className)}>
      <div className={copyClassName}>
        {badge ? (
          <div className="flex items-center gap-2">
            {kicker}
            <span className="mono-spec text-micro tabular-nums text-text-tertiary uppercase">{`· ${badge}`}</span>
          </div>
        ) : (
          kicker
        )}
        <h3 className={cx(titleClassName, 'font-bold text-text-primary')}>{title}</h3>
        <p className={cx(bodyClassName, 'text-pretty text-text-secondary')}>{body}</p>
      </div>
      <Button href={href} variant="secondary" size="md" className={cx('shrink-0', ctaClassName)}>
        <span>{cta}</span>
      </Button>
    </div>
  );
}
