import { cn } from '../../utils/cn';
import { withBase } from '../../utils/nav';
import type { ClassProps } from '../_lib/class-props';

export interface LogoProps extends ClassProps {
  /** `sm` 24px, `md` 32px (header), `lg` 40px. */
  size?: 'sm' | 'md' | 'lg';
  /** Alt text. Empty by default: beside the wordmark the mark is decorative; set it when the mark stands alone. */
  alt?: string;
}

const sizeMap = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
};

/**
 * The Bitperfect mark (`brand/logo.svg`), a square image. Pair it with the
 * "Bitperfect Player" wordmark in `text-body-lg font-bold`.
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
