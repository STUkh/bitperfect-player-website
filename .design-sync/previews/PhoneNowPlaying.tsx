import { PhoneNowPlaying } from '@bitperfect/website-ds';

export function Default() {
  return (
    <div style={{ width: 300 }}>
      <PhoneNowPlaying />
    </div>
  );
}

export function NarrowColumn() {
  return (
    <div style={{ width: 220 }}>
      <PhoneNowPlaying />
    </div>
  );
}
