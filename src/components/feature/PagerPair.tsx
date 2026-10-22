import { cn } from '../../utils/cn';
import Band from '../common/Band';
import PagerLink from './PagerLink';
import type { ClassProps } from '../class-props';

export interface PagerPairProps extends ClassProps {
  /** The previous entry: its route, the small caps line ("Previous") and its name. */
  prev: { href: string; label: string; title: string };
  /** The next entry, likewise. */
  next: { href: string; label: string; title: string };
  /** The strip's accessible name, e.g. "More features". */
  ariaLabel: string;
}

/**
 * The prev/next strip under a route: a graphite `nav` band holding two
 * `PagerLink` cards, stacked on phones and side by side from `lg`. The caller
 * walks its own order and wraps at both ends, so the routes form a ring.
 * Extra classes (a top hairline) go on the band.
 */
export default function PagerPair({ prev, next, ariaLabel, className }: PagerPairProps) {
  return (
    <Band as="nav" aria-label={ariaLabel} className={cn('pt-8 pb-10 lg:pt-14 lg:pb-18', className)}>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-6">
        <PagerLink direction="prev" {...prev} />
        <PagerLink direction="next" {...next} />
      </div>
    </Band>
  );
}
