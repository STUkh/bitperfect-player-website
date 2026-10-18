// Builds the React ports into dist/: one ESM bundle (React external) and a
// .d.ts tree. The site's own data, copy and utilities are imported from
// ../../src via the @site/* alias and bundled in, so a copy edit on the site
// reaches the ports on the next sync instead of drifting in a duplicate.
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const here = dirname(new URL(import.meta.url).pathname);
rmSync(resolve(here, 'dist/index.js'), { force: true });
rmSync(resolve(here, 'dist/types'), { recursive: true, force: true });

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
writeFileSync(resolve(here, 'dist/index.d.ts'), `export * from '${typesEntry}';\n`);
console.log('built dist/index.js + dist/index.d.ts');
