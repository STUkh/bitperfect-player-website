# design-sync notes

## What this sync is

- The site is Astro, and Claude Design only builds with React. So `.design-sync/react/` is a small React package, `@bitperfect/website-ds`, made of **faithful ports** of the Astro components (27 so far). Each one reproduces the markup Astro renders: same elements, classes, attributes and SVG, and the same `data-astro-cid-*` scope attributes. The Astro files in `src/` stay the source of truth; a port is never a redesign.
- History: on 2026-10-13 the first sync was tokens-only. On 2026-10-18 the user asked for the real components ("отрендерить куски готовые… можно сделать реакт вариант"), and the ports replaced that.
- The ports import the site's own copy, data and utilities through the `@site/*` alias (repo `src/*`): `t()` from `src/i18n`, `src/data/*`, `src/utils/*`. A copy edit on the site therefore reaches the ports on the next sync. Strings typed directly into a port are only literals that the Astro file itself types (TechnicalCatalog's "All Capabilities", PhoneTrio's aria labels).
- Excluded on purpose: `SEOHead`, `DevOnlyBadge` and the layouts.

## The build (one command)

```sh
node .design-sync/sync.mjs [--remote .design-sync/.cache/remote-sync.json]
```

1. `build-css.mjs` writes `.design-sync/react/dist/site.css`:
   - the Tailwind 4 compile of `src/styles/global.css` (scanning `src/` and the ports), plus a **safelist** of every token-backed utility and the spacing/layout scale, so classes a design agent invents still compile;
   - `animations.css`;
   - every component's **scoped** rules, collected from a second Astro build with external stylesheets (`astro.ds.config.mjs` → `.design-sync/.cache/astro-dist`);
   - one image **probe** rule per file in `public/{screens,img,brand,grounds}`.
   It also copies `public/fonts` beside the CSS: the converter only lifts fonts from inside the package, and a symlink fails its realpath bound.
2. `react/build.mjs` builds the ports into `react/dist/index.js` (ESM, React external) and the `.d.ts` tree (tsc, under `dist/types`).
3. The driver (`.ds-sync/resync.mjs`) converts, diffs, validates and captures.

`.design-sync/overrides/css.mjs` (declared in `cfg.libOverrides`) wraps the bundled `writeStylesCss` to copy the site images into `ds-bundle/assets/`. The converter rebuilds its output dir from scratch, so the copy has to happen at that step.

## How the ports work

- **Scoped styles.** Astro's scope hash comes from the component's file path only (verified: editing the content keeps the hash). So the ports carry the same `data-astro-cid-xxxxxxxx` attributes (`scope(cid)` in `lib/site.ts`), and the collected scoped rules apply unchanged. Moving or renaming an Astro component changes its cid, and the port must then be updated.
- **Images.** `asset('screens/x.webp')` (in `lib/asset.ts`) reads the computed `background-image` of the matching `.bpa-*` probe class. The browser has already resolved that URL against wherever `styles.css` was served from: preview card, bound design copy or local file. Images ship in `assets/`. Phone screens are real captures and are never redrawn.
- **`class:list` → `cx`, never `cn`.** `cn` is tailwind-merge and drops the site's custom size tokens (`text-micro`, `text-small`, `text-section-m`, `text-body-sm`…) as "colours". Use `cn` only where the Astro file itself calls `cn` (Button, Container, Logo).
- **`src/utils/cn.ts` was fixed on 2026-10-18.** It now extends tailwind-merge with the site's `--text-*` and `--shadow-*` tokens. Before that it dropped `text-body-sm` from the md Button and `text-text-secondary` from the hero's secondary action. The ports call the site's `cn`, so they followed automatically. A new size or shadow token in `global.css` must also be added to that list.
- **Faithful quirks:** in FeaturesTeaser the `.art` hover-scale never applies (FeatureArt's root has no parent cid). The scoped `.phone :global(.phone-gold-rim)` in PhoneShowcase targets nothing. PricingSection's set:html legal links are unscoped.
- **Additions to the Astro API, for designers:**
  - `position: 'fixed' | 'static'` on Header and MobileMenu;
  - `withZone` on HeroSection (renders `.hero-showcase-zone` + ambient; pass `false` when composing with PhoneShowcase inside one zone);
  - `ground` on PhoneShowcase;
  - `screen` on PhoneFrame;
  - `empty: 'frame' | 'hidden'` on ImageSlot (production renders nothing for a missing plate; the frame is the default in the DS);
  - `plate` on PrivacyBand;
  - `defaultFilter` on TechnicalCatalog;
  - `tocOpen`, `activeSlug` and `prose` on LegalDocument;
  - `defaultFeaturesOpen` and `defaultMenuOpen` on Header.
- **LegalDocument** takes its body as `children` or `html`. There is no markdown loader in the package, and inlining the rendered policy would duplicate site copy.
- **PageHeader / ClosingBanner** have no copy defaults: every page passes literals.

## Verifying a port (tools in `.design-sync/tools/`)

```sh
node .design-sync/tools/ref.mjs --name X --page / --selector "section#x"   # reference from dist/, JS off
node .design-sync/tools/shot.mjs --name X [--props '{...}'] [--label X-state] [--page]
```

- `shot.mjs` writes `.design-sync/.cache/compare/X.png` (reference over port, both widths) and prints a pixel mismatch %.
- Run `npm run build` first so `dist/` is current.
- A lazy backdrop (PricingSection's) sometimes misses a reference shot: a sudden ~10% desktop diff on a section that matched before means re-run `ref.mjs` first.
- `ref.mjs` hides the fixed `#site-header` and forces lazy images to load. It uses `pg.evaluate` because `addStyleTag` hangs with JavaScript off.
- Residuals seen at the end of the run, all named:
  - sub-pixel phase where the reference element sits at a fractional page y (PhoneFrame 2.9%, FeatureScreens 1.3%, ClosingBanner 0.8–1.6%, LegalDocument ~2%, FeaturesTeaser/PrivacyBand ~1.5–2.2% mobile);
  - PhoneShowcase's sticky stage, captured scrolled (0.00% once aligned);
  - Header, StatementBand, PageHeader, PhoneNowPlaying, PhoneTrio, HeroSection (below the header band) and ImageSlot: 0.00%.

## Converter environment

- `.ds-sync/` deps: `esbuild ts-morph @types/react react@18 react-dom@18 playwright@1.63.0 typescript@5.9.3 clsx tailwind-merge`. Playwright is pinned to 1.63.0 because the cached Chromium is build 1243.
- Symlinks to recreate on a fresh clone:
  - `.design-sync/node_modules` → `../.ds-sync/node_modules` (tools + override);
  - `.design-sync/react/node_modules` → `../../.ds-sync/node_modules` (tsc, React types).
- `DESIGN.md` (gitignored, internal) ships as `guidelines/DESIGN.md` via `guidelinesGlob: ../../DESIGN.md`.

## Known render warns

- `[RENDER_THIN]` on Footer "variants render identically": the two stories differ only in the active link.
- `[DTS_REACT]` on the old tokens-only build: gone now that `@types/react` resolves from the package.

## Re-sync risks

- A changed Astro component does NOT update its port. The data and copy flow through, but markup and class changes do not. After a site redesign:
  1. diff each changed `.astro` against its port;
  2. re-run `ref.mjs` + `shot.mjs` for it;
  3. expect `≤0.5%` or a named sub-pixel residual.
  This is the main drift risk of this approach.
- A new component on the site needs a new port and an `index.ts` line (`export *`).
- The `conventions.md` header names classes and components. Re-validate them against `ds-bundle` after each sync.
- `astro.ds.config.mjs` spreads the site's `astro.config.mjs`. If that config gains integrations that write outside `outDir`, check the DS build doesn't clobber `dist/`.

## 2026-10-21: ports drifted from the committed site (sync stopped, nothing uploaded)

- The 2026-10-18 ports were built from an uncommitted working tree. A `git reset` right after that sync (reflog `HEAD@{3}: reset: moving to HEAD`) discarded it, and it is not recoverable (no stash, no dangling blob). The ports are now the only copy of that version.
- Measured against the current `dist/`: Header 10.7% desktop (port has a Features dropdown and an untranslated `nav.releases`), Footer is missing the four social links and runs a narrower container, Button chassis differs (repo `Button.astro` is the simple `sm/md/lg` padding version, the port is the 52/54px one), and PageHeader, TechnicalCatalog and PhoneTrio differ in size.
- Decision (user, 2026-10-21): the committed site is the source of truth. The site is to be migrated onto React components via `@astrojs/react`, and the next sync builds from those real components instead of hand ports. Do not re-port by hand in the meantime.
