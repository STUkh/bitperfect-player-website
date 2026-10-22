# Bitperfect Player: website design system

The bit-perfect.com site's own React components. **Build from these first**; utilities are only glue between them. The home bands (`HomeOpening`, `StatementBand`, `FeaturesTeaser`, `PrivacyBand`, `PricingSection`, `CTASection`) take no props and carry the real copy: for other words, compose a band from the primitives.

## Setup

No provider. `styles.css` loads Manrope, the tokens, component styles and image probes. The page ground is graphite `#191919` on `body`; wrap a loose component in `<Surface>` (`tone="graphite"` default, or `"ivory"`). Give your own text a weight (`font-medium`/`font-semibold`/`font-bold`): Manrope's variable default is 200. Never write an image URL: every picture comes from a component (they resolve their own paths).

## Components by role

| Role | Components |
|---|---|
| Chrome | `Header` (fixed; `pathname`), `Footer` (`pathname`) |
| Home, in order | `HomeOpening` (hero + three-phone showcase, ONE block), `StatementBand` (ivory), `FeaturesTeaser`, `TextureStrip`, `PrivacyBand` (ivory), `PricingSection`, `CTASection` (ivory) |
| Inner pages | `PageHeader` (title, description, back link, `meta`, children), `ClosingBanner`, `TechIndex` (the grouped capability index, no content props), `CapabilityBand` (copy beside a phone, `tone` graphite/ivory, `media` right/left, `specs`), `LegalDocument` (markdown children, `headings`) |
| Phones (real captures) | `PhoneFrame` + `PhoneScreen`, `PhoneNowPlaying`, `PhoneTrio`, `FeatureScreens` (`slug`, `state`) |
| Primitives | `Button` (`variant` primary/secondary/outline, `size`, `href`), `PlayCta` (install: gold key-cap + `PlayStoreMark` + `label`), `PlayStoreMark`, `Card` (lacquer chassis; padding is yours; `as="a"` + `href`), `PagerLink` (`direction`, `href`, `label`, `title`), `StoreBadges`, `TextureStrip` (`material` wood/copper/glass), `ImageSlot`, `Logo`, `Container` (1280px column), `FeatureMark`, `FeatureArt`, `Icon` |
| Whole page | `HoldingPage` |

- Screen names (`PhoneScreen name=`, `PhoneTrio leftScreen/centerScreen/rightScreen`): now-playing, now-playing-hero, eq, eq-filters, eq-presets, eq-sculptor, library, tracks, album, sources, output, track-info, fidelity, signal-path, signal-clean, cast, cast-sheet, receiver, dsp, dsp-sheet, playback, ai, ai-enhancer, ai-karaoke, ai-neural.
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
9. Kickers (short gold mono uppercase label above a heading) only on `PageHeader` and `ClosingBanner` (their `eyebrow`), the hero and a plan card's label row; elsewhere the heading opens the block. `ClosingBanner`'s primary is a plain `Button`; an install close uses `PlayCta`.
10. Never draw an app screen; use a phone component.
11. Manrope only; mono for numbers. No em or en dashes in copy.

## Example: a feature page

```jsx
<>
  <Header pathname="/features/eq/" />
  <main className="pt-16">
    <PageHeader title="32-band parametric EQ" description="Shape the sound, then switch it off in one tap." backHref="/features" backLabel="All features" />
    <section className="bg-band-ivory py-14 lg:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <h2 className="text-section-m font-bold text-band-ink lg:text-headline-sm">Thirty-two bands, each one independent</h2>
        <PhoneFrame><PhoneScreen name="eq-sculptor" /></PhoneFrame>
      </Container>
    </section>
    <section className="bg-surface-base py-14 lg:py-28">
      <Container className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <Card className="p-[22px] lg:p-[34px]">
          <h3 className="text-title font-semibold text-text-primary">Presets</h3>
          <p className="mt-2 text-body-sm text-text-secondary">Save a curve per pair of headphones.</p>
        </Card>
      </Container>
      <Container className="mt-14 grid gap-3 lg:grid-cols-2 lg:gap-6">
        <PagerLink direction="prev" href="/features/usb-dac" label="Previous" title="USB DAC output" />
        <PagerLink direction="next" href="/features/library" label="Next" title="Library" />
      </Container>
    </section>
    <TextureStrip material="wood" />
    <section className="bg-band-ivory py-14 text-center lg:py-24">
      <h2 className="text-headline-sm-m font-bold text-band-ink lg:text-headline-sm">Hear it as it was mastered.</h2>
      <PlayCta label="Get it on Google Play" size="lg" className="mt-8" />
    </section>
  </main>
  <Footer pathname="/features/eq/" />
</>
```
