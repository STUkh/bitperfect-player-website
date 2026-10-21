import { Header } from '@bitperfect/website-ds';

/* The header is `position: fixed`; the card's frame is its containing block, so
   each cell only needs to reserve the header's height. Below `lg` the nav folds
   behind a burger, which needs a phone-width viewport to show. */
export function Default() {
  return (
    <div style={{ minHeight: 72 }}>
      <Header pathname="/" />
    </div>
  );
}

export function OnFeatures() {
  return (
    <div style={{ minHeight: 72 }}>
      <Header pathname="/features/eq/" />
    </div>
  );
}
