// One-off migration codemod: in `.astro` files, rewrite how React components are
// given their classes.
//
//   node scripts/codemod-react-class.mjs Container Button Logo Icon
//
// Astro's React renderer drops a framework component's `class` prop (it keeps it
// for an island wrapper), so an `.astro` caller has to pass `className`:
//
//   <Button class="w-full">            ->  <Button className="w-full">
//   <Button class={x}>                 ->  <Button className={x}>
//   <Button class:list={[a, b && c]}>  ->  <Button className={cx([a, b && c])}>
//
// `cx` is clsx, which joins exactly the way `class:list` does. The codemod adds
// `import { clsx as cx } from 'clsx';` to the frontmatter of any file it uses it
// in. Tags are scanned with brace and quote depth, so `=>` and `>` inside an
// attribute expression never end a tag early. Prints each file it changed.
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const names = process.argv.slice(2);
if (!names.length) throw new Error('usage: codemod-react-class.mjs <Component> [...]');
const root = resolve(new URL('..', import.meta.url).pathname, 'src');

const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.astro')) files.push(p);
  }
})(root);

/** Index just past the `>` that closes the tag opened at `from`, or -1. */
function tagEnd(src, from) {
  let brace = 0, quote = null;
  for (let i = from; i < src.length; i++) {
    const c = src[i];
    if (quote) { if (c === quote && src[i - 1] !== '\\') quote = null; continue; }
    if (brace === 0 && (c === '"' || c === "'")) { quote = c; continue; }
    if (c === '`' && brace > 0) { quote = '`'; continue; }
    if (c === '{') brace++;
    else if (c === '}') brace--;
    else if (c === '>' && brace === 0) return i + 1;
  }
  return -1;
}

/** Rewrite the class attributes inside one opening tag's text. */
function rewriteTag(tag) {
  let usedCx = false;
  let out = tag.replace(/(\s)class=/g, '$1className=');
  const at = out.search(/\sclass:list=\{/);
  if (at >= 0) {
    const open = out.indexOf('{', at);
    let depth = 0, close = -1;
    for (let i = open; i < out.length; i++) {
      if (out[i] === '{') depth++;
      else if (out[i] === '}' && --depth === 0) { close = i; break; }
    }
    if (close < 0) throw new Error(`unbalanced class:list in: ${tag.slice(0, 80)}`);
    const expr = out.slice(open + 1, close);
    out = `${out.slice(0, at)} className={cx(${expr})}${out.slice(close + 1)}`;
    usedCx = true;
  }
  return { out, usedCx };
}

const tagRe = new RegExp(`<(${names.join('|')})(?=[\\s/>])`, 'g');
for (const file of files) {
  const src = readFileSync(file, 'utf8');
  const fmEnd = src.startsWith('---') ? src.indexOf('\n---', 3) + 4 : 0;
  let out = '', last = 0, usedCx = false, changed = false;
  for (const m of src.matchAll(tagRe)) {
    if (m.index < fmEnd) continue;
    const end = tagEnd(src, m.index);
    if (end < 0) continue;
    const tag = src.slice(m.index, end);
    const r = rewriteTag(tag);
    if (r.out !== tag) {
      out += src.slice(last, m.index) + r.out;
      last = end;
      changed = true;
      usedCx ||= r.usedCx;
    }
  }
  if (!changed) continue;
  out += src.slice(last);
  if (usedCx && !/import\s*\{[^}]*\bcx\b[^}]*\}\s*from\s*['"]clsx['"]/.test(out)) {
    out = fmEnd
      ? out.replace(/^---\n/, "---\nimport { clsx as cx } from 'clsx';\n")
      : `---\nimport { clsx as cx } from 'clsx';\n---\n${out}`;
  }
  writeFileSync(file, out);
  console.log(file.slice(root.length + 1));
}
