import { FeatureMark } from '@bitperfect/website-ds';

const marks = ['usb-dac', 'eq', 'library', 'casting', 'dsp', 'ai-enhancer'] as const;
const glyphs = ['arrow-right', 'arrow-left', 'chevron-right', 'check', 'play', 'file', 'chip', 'dac'] as const;

export function FeatureIdentityMarks() {
  return (
    <div className="flex flex-wrap gap-6 p-6 text-text-secondary">
      {marks.map((m) => (
        <div key={m} className="flex flex-col items-center gap-2">
          <FeatureMark name={m} size={32} />
          <span className="text-caption text-text-tertiary">{m}</span>
        </div>
      ))}
    </div>
  );
}

export function UtilityGlyphs() {
  return (
    <div className="flex flex-wrap gap-6 p-6 text-text-secondary">
      {glyphs.map((g) => (
        <div key={g} className="flex flex-col items-center gap-2">
          <FeatureMark name={g} size={24} />
          <span className="text-caption text-text-tertiary">{g}</span>
        </div>
      ))}
    </div>
  );
}

/* The mark takes the parent text colour: secondary at rest, primary on hover or when current. */
export function RestAndHover() {
  return (
    <div className="flex gap-8 p-6">
      <div className="flex flex-col items-center gap-2 text-text-secondary">
        <FeatureMark name="eq" size={32} />
        <span className="text-caption text-text-tertiary">Rest</span>
      </div>
      <div className="flex flex-col items-center gap-2 text-text-primary">
        <FeatureMark name="eq" size={32} />
        <span className="text-caption text-text-tertiary">Hover / current</span>
      </div>
    </div>
  );
}
