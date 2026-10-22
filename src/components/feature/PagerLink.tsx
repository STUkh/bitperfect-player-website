import { clsx as cx } from 'clsx';
import Card from '../common/Card';
import FeatureMark from './FeatureMark';
import './PagerLink.css';

export interface PagerLinkProps {
  /** `prev` puts the arrow before the label; `next` puts it after and right-aligns the card's text from `lg`. */
  direction: 'prev' | 'next';
  /** Where the card links to: the neighbouring feature's route. */
  href: string;
  /** The small caps line beside the arrow ("Previous", "Next"). */
  label: string;
  /** The feature it leads to. */
  title: string;
}

/**
 * One half of the prev/next strip under a feature route: a whole-card link on
 * the lacquer surface (an `<a>`, not a button). Render two in a two-column grid,
 * `prev` then `next`; `next` mirrors `prev`, arrow and title aligned to the right
 * edge from `lg`.
 */
export default function PagerLink({ direction, href, label, title }: PagerLinkProps) {
  const next = direction === 'next';
  const arrow = <FeatureMark name={next ? 'arrow-right' : 'arrow-left'} size={15} />;
  return (
    <Card
      as="a"
      href={href}
      className={cx(
        'pager-link focus-visible:focus-ring group flex cursor-pointer flex-col gap-2 px-[22px] py-5 lacquer-lift lg:gap-2.5 lg:px-[30px] lg:py-[26px]',
        next && 'lg:items-end',
      )}
    >
      <span className="inline-flex items-center gap-2 text-label tracking-micro text-text-tertiary uppercase lg:text-micro lg:tracking-label">
        {next ? null : arrow}
        <span>{label}</span>
        {next ? arrow : null}
      </span>
      <span className={cx('text-body-lg font-semibold tracking-[-0.02em] text-text-primary lg:text-title', next && 'lg:text-right')}>
        {title}
      </span>
    </Card>
  );
}
