import { cn } from '../../utils/cn';
import { withBase } from '../../utils/nav';
import type { ClassProps } from '../class-props';

export interface LogoProps extends ClassProps {
  /** `sm` 24px, `md` 32px (header), `lg` 40px. */
  size?: 'sm' | 'md' | 'lg';
  /** Empty by default: beside the wordmark the mark is decorative. */
  alt?: string;
}

const sizeMap = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
};

/**
 * The Bitperfect mark (`brand/logo.svg`). Pair it with the "Bitperfect Player"
 * wordmark in `text-body-lg font-bold`.
 *
 * The Astro version carried an inline `onerror` that swapped in `logo.png`.
 * A server-rendered React component cannot emit an inline handler, and a
 * same-origin SVG the site ships itself has no failure mode worth the hack, so
 * the PNG fallback is gone.
 */
export default function Logo({ size = 'md', alt = '', className }: LogoProps) {
  return (
    <img
      src={withBase('brand/logo.svg')}
      alt={alt}
      width="32"
      height="32"
      loading="eager"
      decoding="async"
      className={cn(sizeMap[size], className)}
    />
  );
}
