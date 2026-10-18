/**
 * The site's own utilities and copy, re-exported for the ports. Everything a
 * port displays by default comes from here (and from @site/data), never from a
 * string typed into the port, so the ports say what the site says.
 */
export { cn } from '@site/utils/cn';
/**
 * Astro's `class:list` joins classes like clsx and never merges them. Use `cx`
 * when porting a `class:list`, and `cn` only where the Astro source calls `cn`:
 * tailwind-merge reads the site's custom size tokens (`text-micro`,
 * `text-small`...) as colours and drops them beside a `text-gold`.
 */
export { clsx as cx } from 'clsx';
export { withBase, resolveHref, isActive } from '@site/utils/nav';
import { useTranslations } from '@site/i18n/utils';

/** The English translation function the Astro components call as `t`. */
export const t = useTranslations('en');

/** Astro's `style="--i: 1"` stagger index, as a React style object. */
export const stagger = (i: number) => ({ '--i': i }) as React.CSSProperties;

/** Spreads an Astro scope attribute (`data-astro-cid-xxxx`) onto an element so
 *  the component's scoped rules in the shared stylesheet apply to the port.
 *  Copy the exact id from the element in the built site's markup. */
export const scope = (cid: string) => ({ [`data-astro-cid-${cid}`]: '' }) as Record<string, string>;
