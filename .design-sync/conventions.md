# Bitperfect Player — website design system

These are the bit-perfect.com site's own React components: the same files the site renders, not copies. **Build pages from these components first**, and use the utility classes below only for your own layout glue between them. The landing bands (`HeroSection`, `StatementBand`, `FeaturesTeaser`, `PrivacyBand`, `PricingSection`, `CTASection`, `PhoneShowcase`) take no props: their copy is the site's real copy. For a band with different words, compose it yourself from the primitives and tokens below.

## Setup

No provider is required. Load `styles.css` (fonts, tokens, component styles and image probes). The page ground is graphite `#191919`, set on `body`. For a loose component in a mockup, wrap it in `<Surface>` (`tone="graphite"` default, or `"ivory"`). Set an explicit font weight on your own text (`font-medium`/`font-semibold`/`font-bold`): Manrope's variable default is 200.

## Components by role

| Role | Components |
|---|---|
| Page chrome | `Header` (fixed to the top; `pathname` marks the active link; below `lg` the nav folds behind a burger), `Footer` (`pathname`) |
| Home bands, in site order | `HeroSection`, `PhoneShowcase`, `ImageSlot variant="band"`, `StatementBand` (ivory), `FeaturesTeaser`, `PrivacyBand` (ivory), `PricingSection`, `CTASection` (ivory) |
| Inner-page bands | `PageHeader` (title, description, optional eyebrow, back link, `meta`, children), `ClosingBanner` (install CTA), `TechnicalCatalog` (filterable list of all capabilities), `LegalDocument` (rendered markdown as children, `headings` for its index) |
| Phones (real app screenshots) | `PhoneFrame` with a `PhoneScreen` child, `PhoneNowPlaying`, `PhoneTrio`, `FeatureScreens slug="usb-dac" state={0}` |
| Primitives | `Button` (`primary` gold / `secondary` glass / `outline`; `size` `sm`/`md`/`lg`), `StoreBadges`, `Logo`, `Container` (the 1280px column), `FeatureMark` (six feature marks + glyphs), `Icon`, `FeatureArt` (drawn card plates) |
| Whole page | `HoldingPage` (what `/` shows while the site is parked) |

- Screen names (`PhoneScreen name=`, `PhoneTrio *Screen=`): now-playing, now-playing-hero, eq, eq-filters, eq-presets, eq-sculptor, library, tracks, album, sources, output, track-info, fidelity, signal-path, signal-clean, cast, cast-sheet, receiver, dsp, dsp-sheet, playback, ai, ai-enhancer, ai-karaoke, ai-neural.
- `ImageSlot name=` plates: home-interstitial-1/2/3, home-statement, home-privacy, band-walnut-diffuser, band-braided-cable, band-vacuum-filament, feature-<slug>-interstitial. A name with no plate renders nothing.
- `FeatureArt slug=` and `FeatureScreens slug=`: usb-dac, eq, library, casting, dsp, ai-enhancer.
- **Never draw an app screen yourself:** use a phone component with a screen name.

Each component's `.prompt.md` and `.d.ts` hold its full API.

## Styling idiom for your own glue: Tailwind 4 utilities on the site's tokens

| Family | Real names |
|---|---|
| Surfaces (dark) | `bg-surface-base` `bg-surface-raised` `bg-glass-surface` `bg-glass-elevated-surface` |
| Light band | `bg-band-ivory` with `text-band-ink` `text-band-ink-muted` `text-band-gold-ink` `border-band-rule` |
| Accent (gold only) | `text-gold` `bg-gold` `text-on-gold` `border-gold` `border-border-gold` |
| Text on dark | `text-text-primary` `text-text-secondary` `text-text-tertiary` |
| Type ramp | `text-display` `text-headline` `text-headline-sm` `text-section-m` `text-title` `text-body` `text-body-sm` `text-label` `text-caption` |
| Composed type | `heading-section` · `text-eyebrow` (uppercase label) · `mono-spec` (rates, prices: tabular) |
| Chassis | `glass` (card) · `glass-elevated` · radii `rounded-card` `rounded-tile` `rounded-chip` |

`_ds_bundle.css` holds the component styles and `styles.css` the tokens; read them before styling. `guidelines/DESIGN.md` holds the full rules.

## Rules

- **One accent:** gold only. No blue, purple or neon, and no glowing or coloured shadows. Darks are graphite, never `#000`.
- **Strict alternation:** major bands alternate graphite and ivory down the page. `text-band-*` is used only inside ivory, and `text-text-*` only on graphite.
- **No nested boxes:** never put a bordered card inside a card. Separate content with `border-t border-border-subtle`.

## Example: a feature page

```jsx
<>
  <Header pathname="/features/eq/" />
  <main className="pt-16">
    <PageHeader eyebrow="Features" title="32-band parametric EQ" description="Precise tone control, off again in one tap." backHref="/features" backLabel="All features" />
    <section className="bg-band-ivory py-14 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-eyebrow text-band-gold-ink">Bands</p>
          <h2 className="text-section-m font-bold text-band-ink lg:text-headline-sm">Thirty-two bands, each one fully independent</h2>
        </div>
        <PhoneFrame>
          <PhoneScreen name="eq-sculptor" />
        </PhoneFrame>
      </Container>
    </section>
    <ClosingBanner eyebrow="Get the app" title="Start listening bit for bit." description="Connect your DAC for bit-perfect output." primaryHref="https://play.google.com/store/apps/details?id=com.bitperfect.player" primaryLabel="Get it on Google Play" primaryExternal />
  </main>
  <Footer pathname="/features/eq/" />
</>
```
