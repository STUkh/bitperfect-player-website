# design-sync notes

Maintainer rules for creating and re-syncing `@bitperfect/website-ds`, the Claude Design system built from the site's own components.

## What this sync is

- The site's components are React (`src/components/**/*.tsx`, rendered statically by `@astrojs/react`; see `src/components/README.md`). `.design-sync/react/` packages **those same files**. Nothing is ported: `react/src/index.ts` only re-exports them through the `@site/*` alias, so a site change reaches Claude Design on the next sync. Never re-port a component.
- Design-only code is three files in `.design-sync/react/src/`:
  - `Surface.tsx`, the page-ground wrapper (`cfg.provider`);
  - `nav.ts`, which stands in for `src/utils/nav` (an esbuild plugin in `build.mjs` routes the components' import there) and sends `screens|img|brand` paths through `asset()`;
  - `asset.ts`, which resolves an image path from its probe rule in the stylesheet.
- Not exported: `DevOnlyBadge` (renders nothing outside the dev server) and `MobileMenu` (the panel `Header` renders; alone it is an invisible overlay). `HeroSection` and `PhoneShowcase` are gone: the hero and showcase are one `HomeOpening`.
- History: tokens-only sync 2026-10-13; hand-written ports 2026-10-18; ports found drifted on 2026-10-21 (built from a working tree a `git reset` discarded), so the site moved to React and on 2026-10-22 the sync was rebuilt on the real components and the ports deleted.
- Lacquer: on 2026-10-22 the lacquer surfaces and grounds were flattened as dead code, then restored the same day from the 2026-10-18 reference. `src/styles/lacquer.css` owns them; components never carry a private copy.

## Which file owns what

| File | Owns |
|---|---|
| `react/src/index.ts` | what is exported (one line per component) |
| `config.json` | `docsMap` (groups), `overrides` (card mode, viewport), `provider`, `readmeHeader`, `guidelinesGlob` |
| `conventions.md` | the README head the design agent reads first (budget ~5k, cap 7k chars) |
| `groups/<group>.md` | one-line `category:` stubs for common/feature/landing/legal |
| `previews/<Name>.tsx` | the cards (named exports = cells) |
| `overrides/css.mjs` | copies site images into `ds-bundle/assets/` (`cfg.libOverrides`) |
| `build-css.mjs` | `react/dist/site.css` |
| component JSDoc | the per-component `.prompt.md` text |

## The build (one command, one session at a time)

```sh
node .design-sync/sync.mjs [--remote .design-sync/.cache/remote-sync.json]
```

1. `react/build.mjs` bundles the components into `react/dist/index.js` (ESM, React external), collects their co-located stylesheets into `react/dist/index.css`, and emits `.d.ts` with tsc. tsc keeps `@site/*` as written and the converter reads the tree without the tsconfig, so `build.mjs` rewrites the alias in the emitted entry to a relative path; without that the converter finds 1 component instead of 32. esbuild treats `/grounds/*`, `/img/*`, `/screens/*`, `/brand/*` as external, so CSS `url()`s to them survive bundling.
2. `build-css.mjs` writes `react/dist/site.css`: the Tailwind 4 compile of `src/styles/global.css` (scanning `src/`, plus a safelist of token-backed utilities and the spacing/layout scale so classes an agent invents still compile), `animations.css`, `react/dist/index.css`, and one image probe rule per file in `public/{screens,img,brand,grounds}`. Root-absolute `url(/grounds/…)` etc. are rewritten to `./assets/…`. It copies `public/fonts` beside the CSS (the converter only lifts fonts from inside the package).
3. `.ds-sync/resync.mjs` converts, diffs, validates and captures into `ds-bundle/`.

## Images

- `ASSET_DIRS` = `screens img brand grounds`, in both `build-css.mjs` and `overrides/css.mjs`; a new public image folder must be added to both (and to the esbuild externals).
- Every image path in a component goes through `withBase('img/x.webp')` from `utils/nav`, never a root-absolute string and never another helper: `nav.ts` hands it to `asset()`, which reads the computed `background-image` of the matching `.bpa-*` probe (a URL the browser already resolved against wherever `styles.css` is served). Links keep their site paths.
- Grounds are referenced from CSS only (`--ground-image: url(/grounds/…)`), so the url rewrite covers them; `nav.ts` does not match `grounds/`. A component that builds a grounds path in TS would 404.
- Known limitation: `PrivacyBand.css`, `FeaturesTeaser.css`, `PageHeader.css` and `ClosingBanner.css` use root-absolute `url('/grounds/*.svg')`. That is correct while the site base is `/`, and the design build rewrites them to `./assets/grounds/`. If the site base ever changes, these four need withBase-style handling.
- Phone screens are real captures and are never redrawn.

## Adding a component

1. Export it from `react/src/index.ts` (`export { default as X, type XProps } from '@site/components/<group>/X';`).
2. Add `"X": "../groups/<group>.md"` to `cfg.docsMap`, or it lands in `general`.
3. Write `previews/X.tsx` against the real props, one named export per state; add a `cfg.overrides.X` entry for a full-width band (`cardMode: column`, `viewport: 1280x900`).
4. Give it a JSDoc on the component and every prop: that is its `.prompt.md`.
5. If `conventions.md` should mention it, add it to the role table, then rerun the validator (below).

## Previews

- Written against the real props. The no-prop landing bands have one `Default` cell.
- States that come from behaviour are produced by the behaviour: `TechnicalCatalog`'s `FilteredToDsp` clicks a filter tab after mount.
- `Header` is `position: fixed`; the card frame (`transform: translateZ(0)`) is its containing block. `cfg.overrides.Header` is `single` because the validator flags fixed content in a grid. The burger state cannot be shown: the card viewport is 1280 and `lg:` follows the viewport.
- `LegalDocument` cells wrap the document in LegalLayout's `.prose-legal` article.
- The dark area under short cells is the site's `html` background, not the component. Footer and HoldingPage print the capture browser's year.

## After a visual change on the site

- Re-sync with `--spot-check-components`: grades carry forward by preview source, not component source, so a restyled component with an unchanged preview keeps its old grade.
- Check every class, token and component `conventions.md` names still exists: `python3 /private/tmp/claude-501/lacquer-ref/validate-conventions.py` from the repo root must print `[]` (copy the script into the repo if `/private/tmp` was cleared).
- Read `ds-bundle/.render-check.json` for blank, collapsed or fallback cards.

## Multi-session hazards

- One design-sync run at a time: two runs share `react/dist/` and `ds-bundle/` and corrupt each other.
- Never `git checkout`, `git stash` or `git reset` a tree other sessions are editing (that is how the 2026-10-21 drift happened). Read files, do not rewind them.

## Converter environment

- `.ds-sync/` deps: `esbuild ts-morph @types/react react@18 react-dom@18 playwright@1.63.0 typescript@5.9.3 clsx tailwind-merge`. Playwright stays at 1.63.0: the cached Chromium is build 1243.
- Symlinks on a fresh clone: `.design-sync/node_modules` → `../.ds-sync/node_modules`; `.design-sync/react/node_modules` → `../../.ds-sync/node_modules`.
- `DESIGN.md` (gitignored) ships as `guidelines/DESIGN.md` via `guidelinesGlob: ../../DESIGN.md`.

## Known warns

- None on the 2026-10-22 build (32 components, render-check clean).

## Re-sync risks

- A renamed prop breaks its preview's compile and drops the card to the floor card: grep the build log for `preview build failed`.
- esbuild does not type-check previews: a missing required prop (e.g. `ClosingBanner`'s `eyebrow`) renders silently wrong instead of failing.
- Measures, extra tracking steps and extra radii are arbitrary values, not tokens (DESIGN.md says so since 2026-10-22). Name a token in `conventions.md` only once it exists in `global.css`.
- `HoldingPage`, `Icon`, `PhoneNowPlaying` and `Surface` live outside the group folders; they are mapped to `landing` (HoldingPage) and `common` (the rest).
