import { ImageSlot } from '@bitperfect/website-ds';

/* A slot renders only when its plate exists (public/img/<name>.webp). */
export function HomeBand() {
  return <ImageSlot name="home-interstitial-1" variant="band" ratio="5 / 1" ships="2560x512" />;
}

export function IvoryPlate() {
  return (
    <div style={{ background: '#fff', padding: 24 }}>
      <ImageSlot name="home-privacy" variant="ivory" ratio="3 / 1" ships="2560x853" />
    </div>
  );
}
