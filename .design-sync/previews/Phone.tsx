import { Phone } from '@bitperfect/website-ds';

/* A capture of the app, by name: the device is drawn for the capture's 9:20. */
export function Capture() {
  return (
    <div className="flex justify-center p-10">
      <Phone screen="eq-filters" />
    </div>
  );
}

/* Any other portrait image: give its pixel size and the device fits it. */
export function PortraitImage() {
  return (
    <div className="flex justify-center p-10">
      <Phone src="screens/signal-path.webp" width={556} height={1236} />
    </div>
  );
}

/* Outside 9:22.5 to 9:16 the device stops at the nearest bound and the image is
   cropped from the top. Here a 4:1 band photograph: the landscape device stops at
   22.5:9 and the photograph's ends are cropped. Prefer an image in range. */
export function ClampedExtreme() {
  return (
    <div className="flex justify-center p-10">
      <Phone src="img/home-statement.webp" width={2560} height={1440} />
    </div>
  );
}

/* A wide image turns the phone landscape: camera left, buttons on top, the image upright. */
export function Landscape() {
  return (
    <div className="flex justify-center p-10">
      <Phone src="img/hero-backdrop.webp" width={1672} height={941} />
    </div>
  );
}

/* `fill` takes the parent's width. */
export function FillParent() {
  return (
    <div style={{ width: 220 }}>
      <Phone screen="cast" fill sizes="205px" />
    </div>
  );
}
