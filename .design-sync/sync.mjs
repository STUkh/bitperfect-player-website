// One command for the whole Claude Design sync build (cfg.buildCmd):
//   1. build-css.mjs        the stylesheet: tokens, safelist, scoped styles, image probes
//   2. react/build.mjs      the React ports -> .design-sync/react/dist (ESM + .d.ts)
//   3. .ds-sync/resync.mjs  the design-sync driver: convert -> diff -> validate -> capture
//
//   node .design-sync/sync.mjs [--remote .design-sync/.cache/remote-sync.json] [other driver flags]
//
// Run from the repo root after staging the converter into .ds-sync/ (NOTES.md).
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(new URL(import.meta.url).pathname), '..');
const run = (args) => execFileSync(process.execPath, args, { cwd: root, stdio: 'inherit' });

run(['.design-sync/build-css.mjs']);
run(['.design-sync/react/build.mjs']);
run([
  '.ds-sync/resync.mjs',
  '--config', '.design-sync/config.json',
  '--node-modules', './.ds-sync/node_modules',
  '--entry', './.design-sync/react/dist/index.js',
  '--out', './ds-bundle',
  ...process.argv.slice(2),
]);
