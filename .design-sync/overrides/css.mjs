// forked from design-sync lib/css.mjs - also ships the site's images into assets/.
//
// The React ports show real screenshots and plates. The stylesheet points one
// probe rule per image at ./assets/<site path> (see build-css.mjs), so the
// files must sit beside styles.css in the output. The converter rebuilds the
// output dir from scratch and has no slot for page images, so the copy rides
// on writeStylesCss, the last styling step of every build. Everything else is
// the bundled module, unchanged.
import { cpSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { writeStylesCss as writeStylesCssBase } from '../../.ds-sync/lib/css.mjs';

export { extractFonts, copyTokens, rewriteBundleFontFaces } from '../../.ds-sync/lib/css.mjs';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '../..');
const ASSET_DIRS = ['screens', 'img', 'brand', 'grounds'];

export function writeStylesCss(args) {
  const result = writeStylesCssBase(args);
  for (const dir of ASSET_DIRS) {
    const src = join(ROOT, 'public', dir);
    if (existsSync(src)) cpSync(src, join(args.out, 'assets', dir), { recursive: true });
  }
  console.error(`  assets: ${ASSET_DIRS.join(', ')} → assets/ (site images for the ports)`);
  return result;
}
