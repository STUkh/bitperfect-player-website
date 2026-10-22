import type { CSSProperties } from 'react';
import { clsx as cx } from 'clsx';
import { withBase } from '../../utils/nav';
import type { ClassProps } from '../class-props';
import './TextureStrip.css';

/** The ribbons we have: a photographed material, cropped to a narrow height. */
const MATERIALS = {
  /** Walnut diffuser blocks: warm wood. */
  wood: 'band-walnut-diffuser',
  /** Braided copper cable: warm metal. */
  copper: 'band-braided-cable',
  /** Vacuum-tube filaments. */
  glass: 'band-vacuum-filament',
} as const;

export interface TextureStripProps extends ClassProps {
  /** The photographed material: `wood` (walnut), `copper` (braided cable) or `glass` (vacuum-tube filaments). */
  material: keyof typeof MATERIALS;
}

/**
 * A narrow full-bleed ribbon of material between two bands. The file is a tile (the
 * photograph plus its mirror image, so it joins itself without a seam) that repeats
 * along x: one small file at any width, and it is purely decorative (no alt, no
 * content). It sits on a dark-to-light seam and ends on a gold hairline against the
 * light band, which gives the seam its crisp edge.
 */
export default function TextureStrip({ material, className }: TextureStripProps) {
  const file = MATERIALS[material];
  const style = {
    '--strip-img': `url("${withBase(`img/${file}-tile.webp`)}")`,
  } as CSSProperties;
  return <div className={cx('texture-strip', className)} style={style} aria-hidden="true" />;
}
