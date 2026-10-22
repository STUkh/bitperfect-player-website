import { CrossLinkRow, Surface } from '@bitperfect/website-ds';

export function WithBadge() {
  return (
    <Surface className="p-10">
      <CrossLinkRow
        className="border-t border-border-subtle pt-8"
        copyClassName="max-w-2xl"
        eyebrow="Technical catalog"
        badge="27 entries"
        title="Every capability, in full"
        titleClassName="mt-2 text-title-sm sm:text-title-lg"
        body="Exact sample rates, bit depths and filters for all 27 features."
        bodyClassName="mt-2 text-small"
        href="#"
        cta="See all 27 features"
      />
    </Surface>
  );
}

export function Plain() {
  return (
    <Surface className="p-10">
      <CrossLinkRow
        eyebrow="Technical catalog"
        title="Want more technical detail?"
        body="Browse all 27 features, with exact sample rates, bit depths and filters."
        href="#"
        cta="See all 27 features"
      />
    </Surface>
  );
}
