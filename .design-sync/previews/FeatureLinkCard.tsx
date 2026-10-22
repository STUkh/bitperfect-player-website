import { FeatureArt, FeatureLinkCard, Surface } from '@bitperfect/website-ds';

/* The home page's card, three across. */
export function Lacquer() {
  return (
    <Surface className="p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {(
          [
            ['usb-dac', 'USB DAC output', "Direct USB DAC output, past Android's mixer."],
            ['eq', 'Parametric EQ', 'Parametric, graphic or AutoEQ. Turn it off in one tap.'],
            ['library', 'Local library', 'Browse your local files by folder, album, artist or tag.'],
          ] as const
        ).map(([slug, title, body]) => (
          <FeatureLinkCard
            key={slug}
            href="#"
            title={title}
            body={body}
            className="lacquer lacquer-lift features-card"
            art={
              <div className="features-card-art relative overflow-hidden rounded-t-[15px] lg:rounded-t-[23px]">
                <FeatureArt slug={slug} ratio="16 / 7" />
              </div>
            }
          />
        ))}
      </div>
    </Surface>
  );
}
