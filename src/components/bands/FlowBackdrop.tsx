import type { CSSProperties } from 'react';
import { flowBackgrounds } from '../../data/flowBackgrounds';
import { withBase } from '../../utils/nav';
import './SoftBackdrop.css';

export interface FlowProps { backgroundVariant?: string }

/**
 * Static decorative field; selection happens once on the server. The field is a
 * 128px alpha image stretched to the band, so it is a CSS background (`--soft-image`)
 * rather than an `<img>`: it carries no content, and an image drawn at another
 * aspect ratio is what Lighthouse flags.
 */
export default function FlowBackdrop({ variant, light = false }: { variant: string; light?: boolean }) {
  const field = flowBackgrounds.find((item) => item.id === variant) ?? flowBackgrounds[0];
  const src = withBase(field.variants[light ? 'light' : 'dark'].src);
  return (
    <span
      className="soft-backdrop"
      aria-hidden="true"
      data-flow-variant={field.id}
      style={{ '--soft-image': `url("${src}")` } as CSSProperties}
    />
  );
}
