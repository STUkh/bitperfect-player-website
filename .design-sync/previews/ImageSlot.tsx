import { ImageSlot } from '@bitperfect/website-ds';

export function HomeBand() {
  return <ImageSlot name="home-interstitial-1" variant="band" ratio="5 / 1" narrowRatio="2 / 1" ships="2560x512" />;
}

export function IvoryPlate() {
  return (
    <div style={{ background: '#fff', padding: 24 }}>
      <ImageSlot name="home-privacy" variant="ivory" ratio="3 / 1" ships="2560x853" />
    </div>
  );
}

export function EmptyBandFrame() {
  return <ImageSlot name="new-interstitial" variant="band" ratio="6 / 1" ships="2880x480" note="dark to light: the closing band is white" />;
}

export function EmptyPlateFrame() {
  return (
    <div style={{ padding: 24 }}>
      <ImageSlot name="new-plate" variant="plate" ratio="16 / 9" ships="1600x900" />
    </div>
  );
}
