import { Icon } from '@bitperfect/website-ds';

export function ArrowInALink() {
  return (
    <div className="flex flex-col gap-5 p-6">
      <a href="#" className="inline-flex items-center gap-2 text-small font-semibold text-text-primary">
        All features <Icon name="arrow" size={16} />
      </a>
      <div className="flex items-end gap-6 text-text-secondary">
        {[16, 20, 24].map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Icon name="arrow" size={size} />
            <span className="text-caption text-text-tertiary">{size}px</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SignalStates() {
  const states = [
    ['sig-bitperfect', 'var(--color-bitperfect)', 'Bit-perfect'],
    ['sig-enhanced', 'var(--color-enhanced)', 'Enhanced'],
    ['sig-resampled', 'var(--color-resampled)', 'Resampled'],
    ['sig-lossy', 'var(--color-lossy)', 'Lossy'],
  ] as const;
  return (
    <div className="flex items-start gap-7 p-6">
      {states.map(([name, color, label]) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <span style={{ color }}><Icon name={name} size={24} /></span>
          <span className="text-caption text-text-tertiary">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function ChainNodes() {
  return (
    <div className="flex items-center gap-4 text-text-secondary">
      <Icon name="node-file" size={28} />
      <Icon name="arrow" size={16} />
      <Icon name="node-decode" size={28} />
      <Icon name="arrow" size={16} />
      <Icon name="node-engine" size={28} />
      <Icon name="arrow" size={16} />
      <Icon name="node-usb" size={28} />
      <Icon name="arrow" size={16} />
      <Icon name="node-dac" size={28} />
    </div>
  );
}

export function FeatureMarks() {
  return (
    <div className="flex items-center gap-5 text-gold">
      <Icon name="eq" size={36} />
      <Icon name="cast" size={36} />
      <Icon name="sparkle" size={36} />
      <Icon name="shield" size={36} />
      <Icon name="library" size={36} />
      <Icon name="waveform" size={36} />
    </div>
  );
}
