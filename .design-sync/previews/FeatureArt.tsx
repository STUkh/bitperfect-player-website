import { FeatureArt } from '@bitperfect/website-ds';

const row = { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 24, padding: 24 } as const;

export function Eq() {
  return (
    <div style={{ maxWidth: 400, padding: 24 }}>
      <FeatureArt slug="eq" className="w-full" />
    </div>
  );
}

export function AllSix() {
  return (
    <div style={row}>
      {(['usb-dac', 'eq', 'library', 'casting', 'dsp', 'ai-enhancer'] as const).map((s) => (
        <FeatureArt key={s} slug={s} className="w-full" />
      ))}
    </div>
  );
}

/* The phone crop the feature cards use below `sm` (`--art-ratio: 4/3`). */
export function CompactRatio() {
  return (
    <div style={{ maxWidth: 400, padding: 24 }}>
      <FeatureArt slug="ai-enhancer" ratio="4 / 3" className="w-full" />
    </div>
  );
}
