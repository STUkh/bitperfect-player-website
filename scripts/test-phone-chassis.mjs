// The phone chassis at the original drawing's aspect (368 x 752 screen) must stay
// the original drawing: same markup as the fixed-height PhoneFrame it grew from,
// minus the dead clip/mask defs and the static group ids it used to carry.
//
//   node scripts/test-phone-chassis.mjs
//
// The fixture was rendered from that frame (commit 2a282da) with its gradient
// prefix set to this geometry's key, so the comparison is byte for byte.
import { buildSync } from 'esbuild';
import { readFileSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const out = join(tmpdir(), `phone-chassis-${process.pid}.cjs`);

buildSync({
  stdin: {
    contents: `
      import { renderToStaticMarkup } from 'react-dom/server';
      import PhoneChassis from './src/components/feature/PhoneChassis';
      import { phoneGeometry } from './src/components/feature/phone-geometry';
      export const render = (w, h) => renderToStaticMarkup(<PhoneChassis geometry={phoneGeometry(w, h)} />);
      export const geometry = phoneGeometry;
    `,
    resolveDir: root,
    loader: 'tsx',
  },
  bundle: true,
  platform: 'node',
  format: 'cjs',
  jsx: 'automatic',
  nodePaths: [join(root, 'node_modules')],
  define: { 'process.env.NODE_ENV': '"production"', 'import.meta.env.DEV': 'false' },
  outfile: out,
  logLevel: 'error',
});

const { render, geometry } = createRequire(import.meta.url)(out);
rmSync(out, { force: true });

let failed = 0;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${ok || !detail ? '' : `\n     ${detail}`}`);
  if (!ok) failed++;
};

const expected = readFileSync(join(root, 'scripts/fixtures/phone-chassis-portrait-776.svg'), 'utf8').trim();
const actual = render(368, 752);
const at = [...actual].findIndex((c, i) => c !== expected[i]);
check('368x752 renders the original drawing byte for byte', actual === expected, `first difference at ${at}: ${actual.slice(at, at + 80)}`);

const g = geometry(556, 1236);
check('a 556x1236 capture is portrait, unclamped', g.orientation === 'portrait' && !g.clamped, JSON.stringify(g));
check('9:24 clamps to 9:22.5', geometry(900, 2400).clamped && geometry(900, 2400).aspect === 0.4);
check('1:1 clamps to portrait 9:16', geometry(1000, 1000).orientation === 'portrait' && geometry(1000, 1000).aspect === 0.5625);
const l = geometry(1920, 1080);
check('16:9 is landscape, unclamped', l.orientation === 'landscape' && !l.clamped && l.viewBox.h === 395.5, JSON.stringify(l));
check('landscape turns the device group', /<g transform="translate\(0 395.5\) rotate\(-90\)">/.test(render(1920, 1080)));
check('no static ids', !/ id="(buttons|chassis|bezel|speaker|camera|[^"]*screen-(clip|mask))"/.test(render(1920, 1080) + actual));

process.exit(failed ? 1 : 0);
