# Bitperfect Player — website

Landing page and privacy policy for [Bitperfect Player](https://play.google.com/store/apps/details?id=com.bitperfect.player),
an audiophile Android music player.

**Live:** https://bit-perfect.com/

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/privacy` | Privacy policy — the URL Google Play Console requires |
| `/policy` | Alias; redirects to `/privacy` |
| `/404` | Not found page |

## Develop

```bash
npm install
npm run dev      # http://localhost:4321/bitperfect-player-website/
npm run build    # -> dist/
npm run preview  # serve dist/ locally
```

Astro with static output. Type is **Inter Variable**, the single webfont. Tailwind 4
with a custom theme token layer in `src/styles/global.css` — defines the color, radius,
shadow, and typography scale.

## Deploy

Pushing to `main` builds and publishes via `.github/workflows/deploy.yml`.

**One-time setup:** repo Settings → Pages → Source → **GitHub Actions**.

The workflow fails the build if the design direction contract is stripped from
the emitted HTML, and warns if the privacy policy still contains publish
placeholders.

## Before this can go in front of Play Console

1. **Fill the placeholders in `src/PRIVACY_POLICY.md`** — two `[FILL IN ON PUBLISH]`
   dates and two `[SUPPORT_EMAIL]`. A policy with no effective date or contact
   address will not pass review. The `/privacy` page detects these and shows a
   banner until they are filled; the banner disappears on its own once they are.
2. **Review draft §2.9 "Purchases" in `src/PRIVACY_POLICY.md`.** The Pro
   subscription made the old §8 ("purchases are a future feature") false, so a
   purchases section was drafted — it names the billing processor and is
   comment-flagged as DRAFT. Confirm it against the shipping app, then re-sync
   the upstream copy in the app repo.
3. **Drop real portrait screenshots into `public/screens/`** and set each
   slide's `src` in `src/data/site.ts` — the carousel renders designed
   placeholder slots until then.
4. **Supply `site.apkUrl`** in `src/data/site.ts` if you want a direct-APK action
   alongside the Play button. It is `null` today, and the closing CTA has room
   for it.

## Content that is authored, not real

Demo material is synthetic and labelled as such — replace when real assets exist:

- Track, artist and album names in the phone mock and the "Neighbours" card
- Renderer names and similarity scores
- The spectrum plot is a **diagram of the operation, not a measurement**, and
  says so in its caption. Do not present it as measured data.

No testimonials, ratings, download counts, benchmarks or press claims appear
anywhere, and none should be added without real evidence.

## The privacy policy is a copy

`src/PRIVACY_POLICY.md` is copied from `../bitperfect-player/docs/legal/PRIVACY_POLICY.md`.
Two edits are applied on copy and must be re-applied on any re-sync — they are
documented in a comment at the top of the file.

```bash
diff src/PRIVACY_POLICY.md ../bitperfect-player/docs/legal/PRIVACY_POLICY.md
```

## Design

`DESIGN.md` documents the visual system: brand accents (champagne gold primary,
six signal-state colors), glass surfaces, backdrop blur, gradient CTAs, floating
glow orbs, and a noise-grain overlay. The landing page uses the adopted TinniTone
visual world, recolored to Bitperfect's palette. Legal pages use minimal styling.
Colors and shadows are inherited from the Android app's `:core:ui` theme.
