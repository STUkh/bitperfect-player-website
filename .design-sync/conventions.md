# Bitperfect Player: website design system

The bit-perfect.com site's own React components. **Build from these first**; utilities are only glue between them. The home bands (`HomeOpening`, `StatementBand`, `FeaturesTeaser`, `PrivacyBand`, `PricingSection`, `CTASection`) take no props and carry the real copy: for other words, compose a band from the primitives.

## Setup

No provider. `styles.css` loads Manrope, the tokens, component styles and image probes. The page ground is graphite `#191919` on `body`; wrap a loose component in `<Surface>` (`tone="graphite"` default, or `"ivory"`). Give your own text a weight (`font-medium`/`font-semibold`/`font-bold`): Manrope's variable default is 200. Never write an image URL: components resolve their own pictures.

## Components by role

| Role | Components |
|---|---|
| Chrome | `Header` (fixed; `pathname`), `Footer` (`pathname`) |
| Home, in order | `HomeOpening` (hero + three-phone showcase, ONE block), `StatementBand` (ivory), `FeaturesTeaser`, `TextureStrip`, `PrivacyBand` (ivory), `PricingSection`, `CTASection` (ivory) |
| Inner pages | `PageHeader` (title, description, back link, `meta`, children), `ClosingBanner`, `TechIndex` (the grouped capability index, no content props), `CapabilityBand` (copy beside a phone, `tone` graphite/ivory, `media` right/left, `specs`), `LegalDocument` (markdown children, `headings`) |
| Band shells | `Band` (section: `tone` ground, Container inside; padding is yours), `SectionHeading` (`eyebrow`, title, accent, lede; sizes per slot, colours from `tone`), `MediaSplit` (copy beside media, 7/5 or 6/6, mirrored), `SpecList` (label/value hairline rows), `RuleList` (title-and-line entries on hairlines), `CloseBand` (centred last band), `BackLink`, `CrossLinkRow` (pointer + secondary `Button`), `PagerPair`, `FeatureLinkCard` |
| Phones (real captures) | `Phone` (`screen`, or src + width + height; wide is landscape), `PhoneTrio`, `FeatureScreens` (`slug`, `state`) |
| Primitives | `Button` (`variant` primary/secondary/outline, `size`, `href`), `PlayCta` (install: gold key-cap + `PlayStoreMark` + optional `label`), `PlayStoreMark`, `Card` (lacquer chassis; padding is yours; `as="a"` + `href`), `PagerLink` (`direction`, `href`, `label`, `title`), `StoreBadges`, `TextureStrip` (`material` wood/copper/glass), `ImageSlot`, `Logo`, `Container` (1280px column), `FeatureMark`, `FeatureArt`, `Icon` |
| Whole page | `HoldingPage` |

- Screen names (`Phone screen=`, `PhoneTrio leftScreen/centerScreen/rightScreen`): now-playing, now-playing-hero, eq, eq-filters, eq-presets, eq-sculptor, library, tracks, album, sources, output, track-info, fidelity, signal-path, signal-clean, cast, cast-sheet, receiver, dsp, dsp-sheet, playback, ai, ai-enhancer, ai-karaoke, ai-neural.
- `FeatureArt slug=` / `FeatureScreens slug=`: usb-dac, eq, library, casting, dsp, ai-enhancer.
- Each component's `.prompt.md` and `.d.ts` hold its full API; read them before using a prop.

## Styling vocabulary (Tailwind 4 on the site's tokens)

| Family | Names |
|---|---|
| Surfaces | `lacquer` (lit graphite: cards, plates), `lacquer-gold` (Founder plan only), `lacquer-lift` (linked card hover); band plate `ground ground-brushed` (graphite header; other variants belong to their bands); fills `bg-surface-base` `bg-surface-raised` |
| Ivory band | `bg-band-ivory` + `text-band-ink` `text-band-ink-muted` `text-band-gold-ink` `border-band-rule` |
| Gold | `text-gold` `bg-gold` `text-on-gold` `border-border-gold`; alpha as `bg-gold/8` |
| Text on graphite | `text-text-primary` `text-text-secondary` `text-text-tertiary`; rule `border-border-subtle` |
| Type (desktop) | `text-display` `text-headline` `text-headline-sm` `text-section-lg` `text-section-sm` `text-title` `text-lede` `text-body-lg` `text-body` `text-body-sm` `text-caption` `text-label` |
| Type (phone; desktop step at lg:) | `text-headline-m` `text-headline-sm-m` `text-section-m` `text-lede-m` |
| Composed | `heading-section`, `mono-spec` (rates, prices: tabular) |
| Radii | `rounded-card` `rounded-card-sm` `rounded-card-inner` `rounded-tile` `rounded-chip` |
| Shadows | `shadow-card` `shadow-elevated` `shadow-device` (no coloured shadows) |
| Tracking | `tracking-label` `tracking-micro`; `tracking-eyebrow` is the hero eyebrow's only |
| Measures | no tokens, write the value: `max-w-[56ch]` lede, `max-w-[760px]`/`max-w-[840px]` column |

Full rules: `guidelines/DESIGN.md`. Every compiled class: `_ds_bundle.css`.

## Rules

1. One accent, gold. No blue, violet or neon; graphite is neutral, never `#000`.
2. Bands alternate graphite and ivory. `text-band-*` only on ivory, `text-text-*` only on graphite. An ivory band holds no card, glass box or dark shadow.
3. Cards and plates are `Card` (or `lacquer`), never a flat `bg-glass-surface` box. No box inside a card; split with `border-t border-border-subtle`.
4. Gold text (links, label rows, active tab) is fine on graphite. Gold fills are only the install key-cap and the Founder plan; every other button, badge and chip is graphite lacquer (a store badge is a secondary `Button`).
5. Every install button is `PlayCta`. Never a play triangle, never a hand-made gold button.
6. Buttons never move on hover; only the sheen and rim light up. No arrow or chevron inside a button or store badge; text links and `PagerLink` may carry one.
7. Hero and showcase are one `HomeOpening`; never split or rebuild it.
8. `TextureStrip` only on a dark-to-light seam, never under a block with its own photograph.
9. Kickers (short gold mono uppercase label above a heading) only on `PageHeader` and `ClosingBanner` (their `eyebrow`), the hero and a plan card's label row; elsewhere the heading opens the block (leave `SectionHeading`'s `eyebrow` empty). `ClosingBanner`'s primary is a plain `Button`; an install close uses `PlayCta`.
10. Never draw an app screen; use a phone component.
11. Manrope only; mono for numbers. No em or en dashes in copy.

## Example: a feature page

```jsx
<>
  <Header pathname="/features/eq/" />
  <main className="pt-16">
    <PageHeader title="32-band parametric EQ" description="Shape the sound, then switch it off in one tap." backHref="/features" backLabel="All features" />
    <Band tone="ivory" className="py-16 lg:py-32">
      <MediaSplit mediaSide="right" copyClassName="flex flex-col gap-4" media={<Phone screen="eq-sculptor" />}>
        <SectionHeading className="contents" tone="ivory" title="Thirty-two bands, each one independent" lede="Place each filter anywhere from 20 Hz to 20 kHz." />
      </MediaSplit>
    </Band>
    <PagerPair ariaLabel="More features" prev={{ href: '/features/usb-dac', label: 'Previous', title: 'USB DAC output' }} next={{ href: '/features/library', label: 'Next', title: 'Library' }} />
    <CloseBand tone="ivory" className="py-14 lg:py-24" title="Hear it as it was mastered." action={<PlayCta label="Get it on Google Play" size="lg" className="mt-8" />} />
  </main>
  <Footer pathname="/features/eq/" />
</>
```
