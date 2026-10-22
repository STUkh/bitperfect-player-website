import { TextureStrip } from '@bitperfect/website-ds';

/* A narrow ribbon of photographed material between two bands, repeated along x. */
export function Materials() {
  return (
    <div className="bg-surface-base">
      <TextureStrip material="wood" />
      <div className="h-6" />
      <TextureStrip material="copper" />
      <div className="h-6" />
      <TextureStrip material="glass" />
    </div>
  );
}
