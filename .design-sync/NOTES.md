# design-sync notes

## What this sync is

- The site's components are React (`src/components/**/*.tsx`, rendered statically by `@astrojs/react`; see `src/components/README.md`). `.design-sync/react/` packages **those same files** as `@bitperfect/website-ds` for Claude Design. Nothing is ported: `src/index.ts` only re-exports them through the `@site/*` alias, so a site change reaches Claude Design on the next sync.
- Design-only code is limited to three files in `.design-sync/react/src/`:
  - `Surface.tsx`, the page-ground wrapper (`cfg.provider`);
  - `nav.ts`, which stands in for `src/utils/nav` in the design build (an esbuild plugin in `build.mjs` routes the components' import there) and sends image paths through `asset()`;
  - `asset.ts`, which resolves an image path from its probe rule in the stylesheet.
- Not exported: `DevOnlyBadge` (renders nothing outside the dev server) and `MobileMenu` (the panel `Header` renders and its burger opens; alone it is an invisible overlay).
- History: tokens-only sync on 2026-10-13; hand-written ports on 2026-10-18; on 2026-10-21 the ports were found to have drifted from the committed site (they were built from a working tree a `git reset` discarded), so the site was migrated to React and, on 2026-10-22, the sync was rebuilt on the real components and the ports deleted.

## The build (one command)

```sh
node .design-sync/sync.mjs [--remote .design-sync/.cache/remote-sync.json]
```

1. `react/build.mjs` bundles the components into `react/dist/index.js` (ESM, React external), collects their co-located stylesheets into `react/dist/index.css`, and emits the `.d.ts` tree with tsc. tsc keeps the `@site/*` alias as written, and the converter reads the tree without the tsconfig, so `build.mjs` rewrites the alias in the emitted entry to a relative path. Without that, the converter finds 1 component instead of 28.
2. `build-css.mjs` writes `react/dist/site.css`:
   - the Tailwind 4 compile of `src/styles/global.css`, scanning `src/`, plus a **safelist** of token-backed utilities and the spacing/layout scale, so classes a design agent invents still compile;
   - `animations.css`;
   - `react/dist/index.css`, the components' stylesheets;
   - one image **probe** rule per file in `public/{screens,img,brand,grounds}`.
   It also copies `public/fonts` beside the CSS (the converter only lifts fonts from inside the package).
3. The driver (`.ds-sync/resync.mjs`) converts, diffs, validates and captures.

`.design-sync/overrides/css.mjs` (declared in `cfg.libOverrides`) wraps `writeStylesCss` to copy the site images into `ds-bundle/assets/`.

## Images

- The components build image URLs with `withBase('screens/x.webp')`. In Claude Design the images are not at the site root, so the design build's `nav.ts` hands any `screens|img|brand` path to `asset()`, which reads the computed `background-image` of the matching `.bpa-*` probe class: a URL the browser already resolved against wherever `styles.css` was served from. Links keep their site paths.
- Phone screens are real captures and are never redrawn.

## Previews (`.design-sync/previews/`)

- Written against the real props. The landing bands take no props, so each has one `Default` cell.
- States that come from behaviour are produced by the behaviour itself: `TechnicalCatalog`'s `FilteredToDsp` clicks a filter tab after mount (the component's `useBehaviour` effect, a child effect, has run by then).
- `Header` is `position: fixed`; the card frame (`transform: translateZ(0)`) is its containing block, so a cell only reserves its height. `cfg.overrides.Header` is `single` because the validator flags fixed content in a grid. The phone-width burger state cannot be shown: the card viewport is 1280 and `lg:` responds to the viewport, not the cell.
- `LegalDocument` cells wrap the document in LegalLayout's `.prose-legal` article, which styles the rendered markdown.
- The dark area below short cells in the review sheets is the site's `html` background (graphite), not part of the component.
- Footer and HoldingPage print the capture browser's year (2024 in the sheets); the site prints the build year.

## Converter environment

- `.ds-sync/` deps: `esbuild ts-morph @types/react react@18 react-dom@18 playwright@1.63.0 typescript@5.9.3 clsx tailwind-merge`. Playwright is pinned to 1.63.0 because the cached Chromium is build 1243.
- Symlinks to recreate on a fresh clone:
  - `.design-sync/node_modules` → `../.ds-sync/node_modules` (the css.mjs override);
  - `.design-sync/react/node_modules` → `../../.ds-sync/node_modules` (tsc, React types).
- `DESIGN.md` (gitignored, internal) ships as `guidelines/DESIGN.md` via `guidelinesGlob: ../../DESIGN.md`.

## Known render warns

- None on the 2026-10-22 build.

## Re-sync risks

- A new component on the site needs an `index.ts` line, and a preview if it should have one. A renamed prop breaks its preview's compile, which drops that card to the floor card: read the build log for `preview build failed`.
- A component that starts importing another module for its image URLs (not `utils/nav`'s `withBase`) bypasses `asset()`, and its images will 404 in Claude Design.
- `conventions.md` names classes and components. After a design change, check every class it names still compiles into `react/dist/site.css`.
- Grades carry forward by preview source, not by component source. A component whose look changed while its preview did not keeps its old grade: after a visual change on the site, re-capture with `--spot-check-components`.

## Groups

- The flat `dist/` has no folders, so the converter would put every component in `general`. `cfg.docsMap` points each one at a one-line stub in `.design-sync/groups/<group>.md` (`category:` only), which restores the site's `common/feature/landing/legal` split. A new component needs a docsMap line too, or it lands in `general`. `HoldingPage`, `Icon`, `PhoneNowPlaying` and `Surface` live outside those folders; `HoldingPage` was put in `landing`, the others in `common`.
