import { PlayStoreMark } from '@bitperfect/website-ds';

export function Sizes() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, color: '#f2f2f2' }}>
      <PlayStoreMark size={18} />
      <PlayStoreMark size={24} />
      <PlayStoreMark size={32} />
      <PlayStoreMark size={48} />
    </div>
  );
}

export function OnGold() {
  return (
    <div style={{ display: 'inline-flex', padding: 18, borderRadius: 16, background: '#e8b84b', color: '#191919' }}>
      <PlayStoreMark size={32} />
    </div>
  );
}
