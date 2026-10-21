// Builds the site's own React components (../../src/components, re-exported by
// src/index.ts through the @site/* alias) into dist/: one ESM bundle (React
// external), dist/index.css (the components' co-located stylesheets, which
// build-css.mjs appends to the design stylesheet) and a .d.ts tree.
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const here = dirname(new URL(import.meta.url).pathname);
rmSync(resolve(here, 'dist/index.js'), { force: true });
rmSync(resolve(here, 'dist/index.css'), { force: true });
rmSync(resolve(here, 'dist/types'), { recursive: true, force: true });

// The components build image URLs with the site's withBase(). In Claude Design
// the images sit beside the uploaded stylesheet instead of at the site root, so
// their import of utils/nav resolves to src/nav.ts, which sends image paths
// through asset(). The stand-in itself imports the real module.
const navShim = resolve(here, 'src/nav.ts');
const siteNav = {
  name: 'site-nav',
  setup(b) {
    b.onResolve({ filter: /(^|\/)utils\/nav$/ }, (args) => (args.importer === navShim ? undefined : { path: navShim }));
  },
};

await build({
  entryPoints: [resolve(here, 'src/index.ts')],
  outfile: resolve(here, 'dist/index.js'),
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  target: 'es2020',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  tsconfig: resolve(here, 'tsconfig.json'),
  define: { 'import.meta.env.BASE_URL': '"/"', 'import.meta.env.DEV': 'false', 'import.meta.env.PROD': 'true' },
  plugins: [siteNav],
  logLevel: 'warning',
});

// Declarations: tsc emits the tree under dist/types mirroring the repo (rootDir
// ../..), so the entry's types land at dist/types/.design-sync/react/src/.
try {
  execFileSync(resolve(here, 'node_modules/.bin/tsc'), ['-p', resolve(here, 'tsconfig.json')], { stdio: 'pipe' });
} catch (e) {
  const out = `${e.stdout ?? ''}`.trim();
  if (out) console.error(`tsc reported (declarations still emitted):\n${out}`);
}
const typesEntry = './types/.design-sync/react/src/index';
if (!existsSync(resolve(here, `dist/${typesEntry}.d.ts`))) throw new Error('declarations missing');
// tsc keeps the @site/* alias as written; the converter reads the .d.ts tree
// without this tsconfig, so point the alias at the emitted repo src/ instead.
for (const rel of ['src/index.d.ts', 'src/nav.d.ts']) {
  const file = resolve(here, 'dist/types/.design-sync/react', rel);
  if (existsSync(file)) writeFileSync(file, readFileSync(file, 'utf8').replaceAll("'@site/", "'../../../src/"));
}
writeFileSync(resolve(here, 'dist/index.d.ts'), `export * from '${typesEntry}';\n`);
console.log('built dist/index.js + dist/index.css + dist/index.d.ts');
