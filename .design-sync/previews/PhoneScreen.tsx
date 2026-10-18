import { PhoneScreen, PhoneFrame } from '@bitperfect/website-ds';

export function NowPlaying() {
  return (
    <div style={{ width: 278, aspectRatio: '556 / 1236' }}>
      <PhoneScreen name="now-playing" />
    </div>
  );
}

export function Equaliser() {
  return (
    <div style={{ width: 278, aspectRatio: '556 / 1236' }}>
      <PhoneScreen name="eq-filters" />
    </div>
  );
}

export function InsideFrame() {
  return (
    <PhoneFrame>
      <PhoneScreen name="signal-path" />
    </PhoneFrame>
  );
}
