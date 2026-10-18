# Bitperfect Player — website design system

The components are faithful React ports of the live bitperfect.com site, rendered from the same markup and styles. **Build pages from these components first**, and use the utility classes below only for your own layout glue between them. Every component's default props are the site's real copy, so `<HeroSection />` with no props is the real hero.

## Setup

No provider is required. Load `styles.css` (it pulls in the fonts, tokens, component styles and image probes). The page ground is graphite `#191919`, set on `body`. For a loose component in a mockup, wrap it in `<Surface>` (`tone="graphite"` default, or `"ivory"`). Set an explicit font weight on your own text (`font-medium`/`font-semibold`/`font-bold`): Manrope's variable default is 200.

## Components by role

| Role | Components |
|---|---|
| Page chrome | `Header` (`position="static"` in mockups; `currentPath` marks the active link), `Footer`, `MobileMenu` (`open`, `hideOnDesktop={false}` for a phone mockup) |
| Home bands, in site order | `HeroSection`, `PhoneShowcase`, `ImageSlot variant="band"`, `StatementBand` (ivory), `FeaturesTeaser`, `PrivacyBand` (ivory), `PricingSection`, `CTASection` (ivory) |
| Inner-page bands | `PageHeader` (title, description, optional back link), `ClosingBanner` (install CTA), `TechnicalCatalog`, `LegalDocument` (body as children) |
| Phones (real app screenshots) | `PhoneFrame screen="eq"`, `PhoneNowPlaying`, `PhoneTrio`, `FeatureScreens slug="usb-dac"`, `PhoneScreen` |
| Primitives | `Button` (`primary` gold key-cap / `secondary` glass / `outline`; `size="lg"` full width), `StoreBadges`, `Logo`, `Container` (the 1280px column), `FeatureMark` (six feature marks + glyphs), `Icon`, `FeatureArt` (drawn card plates) |

- Screen names: now-playing, now-playing-hero, eq, eq-filters, eq-presets, eq-sculptor, library, tracks, album, sources, output, track-info, fidelity, signal-path, signal-clean, cast, cast-sheet, receiver, dsp, dsp-sheet, playback, ai, ai-enhancer, ai-karaoke, ai-neural.
- `ImageSlot name=` plates: home-interstitial-1/2/3, home-statement, home-privacy, band-walnut-diffuser, band-braided-cable, band-vacuum-filament, feature-<slug>-interstitial.
- **Never draw an app screen yourself:** use a phone component with a screen name.
- `HeroSection` and `PhoneShowcase` share one ground on the home page. To compose them that way, wrap both in `<div className="hero-showcase-zone relative bg-surface-base">`, then use `<HeroSection withZone={false} />` and `<PhoneShowcase ground={false} />`.

Each component's `.prompt.md` and `.d.ts` hold its full API and examples.

## Styling idiom for your own glue: Tailwind 4 utilities on the site's tokens

| Family | Real names |
|---|---|
| Surfaces (dark) | `bg-surface-base` `bg-surface-raised` `bg-glass-surface` `bg-glass-elevated-surface` |
| Light band | `bg-band-ivory` with `text-band-ink` `text-band-ink-muted` `text-band-gold-ink` `border-band-rule` |
| Accent (gold only) | `text-gold` `bg-gold` `text-gold-light` `text-on-gold` `border-gold` `border-border-gold` |
| Text on dark | `text-text-primary` `text-text-secondary` `text-text-tertiary` |
| Type ramp | `text-display` `text-headline` `text-headline-sm` `text-section-lg` `text-section-m` `text-title` `text-lede` `text-body` `text-body-sm` `text-label` `text-caption` |
| Composed type | `heading-section` · `text-eyebrow` (uppercase label) · `mono-spec` (rates, prices: tabular) |
| Chassis | `glass` (card) · `glass-elevated` · `lacquer-card` · radii `rounded-card` `rounded-tile` `rounded-chip` |
| Section grounds | `ground` + one motif. Light: `ground-grooves` `ground-halftone` `ground-dither` `ground-spectrum` `ground-harmonograph` `ground-drafting`. Dark: `ground-samples` `ground-guilloche` `ground-interference` `ground-brushed` |

`_ds_bundle.css` is the stylesheet to read before styling. `guidelines/DESIGN.md` holds the full rules.

## Rules

- **One accent:** gold only. No blue, purple or neon, and no glowing or coloured shadows. Darks are graphite, never `#000`.
- **Strict alternation:** major bands alternate graphite and ivory down the page. `text-band-*` is used only inside ivory, and `text-text-*` only on graphite.
- **No nested boxes:** never put a bordered card inside a card. Separate content with `border-t border-border-subtle`.

## Example: a feature landing page

```jsx
<>
  <Header position="static" currentPath="/features" />
  <PageHeader eyebrow="Features" title="32-band parametric EQ" description="Precise tone control, off again in one tap." backHref="/features" backLabel="All features" />
  <section className="bg-band-ivory py-14 lg:py-29">
    <Container className="grid items-center gap-10 lg:grid-cols-2">
      <div>
        <p className="text-eyebrow text-band-gold-ink">Bands</p>
        <h2 className="text-section-m font-bold text-band-ink lg:text-headline-sm">Thirty-two bands, each one fully independent</h2>
      </div>
      <PhoneFrame screen="eq-sculptor" />
    </Container>
  </section>
  <ClosingBanner eyebrow="Get the app" title="Start listening bit for bit." description="Connect your DAC for bit-perfect output." primaryHref="https://play.google.com/store/apps/details?id=com.bitperfect.player" primaryLabel="Get it on Google Play" primaryExternal />
  <Footer />
</>
```
