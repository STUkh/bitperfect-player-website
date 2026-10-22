import { flowBackgrounds } from '../../data/flowBackgrounds';
import { withBase } from '../../utils/nav';
import './SoftBackdrop.css';

export interface FlowProps { backgroundVariant?: string }

/** Static decorative field; selection happens once on the server. */
export default function FlowBackdrop({ variant, light = false }: { variant: string; light?: boolean }) {
  const field = flowBackgrounds.find((item) => item.id === variant) ?? flowBackgrounds[0];
  return (
    <span className="soft-backdrop" aria-hidden="true" data-flow-variant={field.id}>
      <img src={withBase(field.variants[light ? 'light' : 'dark'].src)} width={128} height={128}
        alt="" loading="lazy" decoding="async" draggable={false} />
    </span>
  );
}
