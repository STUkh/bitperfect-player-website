import { Band, SectionHeading } from '@bitperfect/website-ds';

/* A graphite band: ground colour, the page Container, the caller's padding. */
export function Graphite() {
  return (
    <Band className="py-14 lg:py-28">
      <SectionHeading
        className="max-w-[58ch]"
        title="Every sample reaches your DAC"
        lede="The band sets the ground and the column; the shells inside take its tone."
      />
    </Band>
  );
}

/* An ivory band on a backdrop from the grounds. */
export function IvoryOnGround() {
  return (
    <Band tone="ivory" ground="ground-halftone" className="py-16 lg:py-32">
      <SectionHeading
        className="max-w-[58ch]"
        title="The colour change is the divider"
        lede="On ivory the text follows in band ink, and the band holds no card or shadow."
      />
    </Band>
  );
}
