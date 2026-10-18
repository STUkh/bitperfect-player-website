import { PhoneNowPlaying } from '@bitperfect/website-ds';

export function Default() {
  return <PhoneNowPlaying />;
}

export function HeroWagner() {
  return <PhoneNowPlaying screen="now-playing-hero" />;
}

export function NarrowColumn() {
  return (
    <div style={{ width: 240 }}>
      <PhoneNowPlaying />
    </div>
  );
}
