// Migration converter: turns an `.astro` component into a React `.tsx` (plus a
// co-located `.css` for its `<style>`) that renders the same HTML.
//
//   node scripts/astro-to-tsx.mjs src/components/common/StoreBadges.astro [...]
//
// It parses with Astro's own compiler, so markup, expressions and nested JSX are
// read exactly as Astro reads them, then prints JSX:
//
// - `class` -> `className`, `class:list={x}` -> `className={cx(x)}`, kebab SVG
//   attributes -> camelCase, `set:html` -> `dangerouslySetInnerHTML`, a quoted
//   `style` -> an object, `<slot />` -> `{children}`, `<!-- -->` -> `{/* */}`.
// - Whitespace: Astro keeps one space wherever the source had any; JSX drops a
//   run that holds a newline. Between inline siblings the converter writes the
//   space back as `{' '}`; around block elements it is dropped, as it renders
//   nothing there either.
// - `<style>` goes to `<Name>.css`, imported by the component. Astro scoped it
//   with an attribute; plain CSS is global, so the converter lists every class
//   the stylesheet defines for you to check it is specific to this component.
//
// It does NOT port `<script>`s, `Astro.url`, `Astro.slots` or named slots: it
// prints each one it finds as a TODO, and the output is formatted with prettier.
// The `.astro` is left in place; delete it once the visual regression passes.
import { parse } from '@astrojs/compiler';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';

const BLOCK = new Set(
  'address article aside blockquote details dialog dd div dl dt fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hgroup hr li main nav ol p pre section table tbody thead tfoot tr td th ul summary style script head title meta link body template'.split(' '),
);
const INLINE = new Set('a abbr b bdi bdo br button cite code data dfn em i img input kbd label mark picture q s samp select small span strong sub sup svg textarea time u var wbr'.split(' '));
const VOID = new Set('area base br col embed hr img input link meta source track wbr'.split(' '));
// Booleans React knows; any other valueless attribute is written as `name=""`,
// which is what Astro emits (React would drop an unknown `true`, e.g. `inert`).
const REACT_BOOL = new Set('allowfullscreen async autofocus autoplay checked controls default defer disabled formnovalidate hidden loop multiple muted novalidate open playsinline readonly required reversed selected'.split(' '));
const RENAME = {
  class: 'className', for: 'htmlFor', tabindex: 'tabIndex', srcset: 'srcSet', crossorigin: 'crossOrigin',
  fetchpriority: 'fetchPriority', referrerpolicy: 'referrerPolicy', autocomplete: 'autoComplete', maxlength: 'maxLength',
  readonly: 'readOnly', datetime: 'dateTime', inputmode: 'inputMode', allowfullscreen: 'allowFullScreen',
  playsinline: 'playsInline', autoplay: 'autoPlay', novalidate: 'noValidate', spellcheck: 'spellCheck',
  contenteditable: 'contentEditable', accesskey: 'accessKey', 'http-equiv': 'httpEquiv', charset: 'charSet',
  'xlink:href': 'xlinkHref', 'xmlns:xlink': 'xmlnsXlink', 'xml:space': 'xmlSpace', colspan: 'colSpan', rowspan: 'rowSpan',
  enterkeyhint: 'enterKeyHint', popovertarget: 'popoverTarget',
};
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function attrName(name) {
  if (RENAME[name]) return RENAME[name];
  if (name.startsWith('data-') || name.startsWith('aria-')) return name;
  return name.includes('-') ? camel(name) : name;
}

/** `"--i: 2; aspect-ratio: 4/3"` -> `{ '--i': '2', aspectRatio: '4/3' }`. */
function styleObject(css) {
  const parts = [];
  for (const decl of css.split(';')) {
    const at = decl.indexOf(':');
    if (at < 0) continue;
    const prop = decl.slice(0, at).trim();
    const value = decl.slice(at + 1).trim();
    if (!prop) continue;
    parts.push(`${prop.startsWith('--') ? `'${prop}'` : camel(prop)}: ${JSON.stringify(value)}`);
  }
  return `{ ${parts.join(', ')} }`;
}

function convertFile(file) {
  const src = readFileSync(file, 'utf8');
  const name = basename(file, '.astro');
  const todos = [];
  const uses = { cx: false, styleOf: false, css: false, children: false, CSSProperties: false };
  return parse(src, { position: false }).then(({ ast }) => {
    let frontmatter = '';
    let css = '';

    const attr = (a, isComponent) => {
      const { kind, name: n, value } = a;
      if (n === 'class:list') { uses.cx = true; return `className={cx(${value})}`; }
      if (n === 'set:html') return `dangerouslySetInnerHTML={{ __html: ${kind === 'quoted' ? JSON.stringify(value) : value} }}`;
      if (n.startsWith('is:') || n.startsWith('define:') || n.startsWith('client:') || n.startsWith('transition:') || n === 'set:text' || n === 'slot') {
        todos.push(`attribute \`${n}\` on an element: port by hand`);
        return `data-todo-${n.replace(/[^a-z]/g, '-')}=""`;
      }
      if (kind === 'spread') return `{...${value}}`;
      if (kind === 'shorthand') return `${attrName(n)}={${n}}`;
      const jsxName = attrName(n);
      if (n === 'style') {
        if (kind === 'quoted') { uses.CSSProperties = true; return `style={${styleObject(value)} as CSSProperties}`; }
        uses.styleOf = true;
        return `style={styleOf(${kind === 'template-literal' ? `\`${value}\`` : value})}`;
      }
      // On a component a valueless attribute is a `true` prop (`<PhoneScreen
      // priority />`); `priority=""` would be falsy.
      if (kind === 'empty') return isComponent || REACT_BOOL.has(n) ? jsxName : `${jsxName}=""`;
      if (kind === 'quoted' && /^(tabindex|colspan|rowspan|maxlength)$/.test(n) && /^-?\d+$/.test(value)) return `${jsxName}={${value}}`;
      if (kind === 'quoted') return `${jsxName}=${JSON.stringify(value)}`;
      if (kind === 'template-literal') return `${jsxName}={\`${value}\`}`;
      return `${jsxName}={${value}}`;
    };

    const isComment = (node) =>
      node.type === 'comment' ||
      (node.type === 'expression' && node.children.every((c) => c.type === 'text' && /^\s*(\/\*[\s\S]*?\*\/\s*)*$/.test(c.value)));
    const isBlock = (node) => !node || (node.type === 'element' && BLOCK.has(node.name));
    const isInline = (node) => node && (node.type === 'text' || (node.type === 'element' && INLINE.has(node.name)));
    const escText = (t) => t.replace(/[{}<>]/g, (c) => `{'${c}'}`);

    /** Print a list of markup siblings. */
    const markup = (nodes) => {
      const kids = nodes.filter((n) => n.type !== 'frontmatter');
      let out = '';
      // One gap between two real nodes may hold several whitespace runs split by
      // comments; it gets at most one space.
      let gapSpaced = false;
      const real = (k) => !isComment(k) && !(k.type === 'text' && !k.value.trim());
      kids.forEach((node, i) => {
        if (node.type !== 'text') {
          out += print(node);
          if (!isComment(node)) gapSpaced = false;
          return;
        }
        const prev = kids.slice(0, i).reverse().find(real);
        const next = kids.slice(i + 1).find(real);
        const v = node.value;
        // A space on one line is always kept, even against the parent's edge
        // (`<span> Player</span>`). A run with a newline is kept only
        // next to inline content: between expressions, components and blocks it
        // is layout whitespace, and writing it back would litter the JSX.
        const keep = (ws, a, b) => !ws.includes('\n') || (!isBlock(a) && !isBlock(b) && (isInline(a) || isInline(b)));
        if (!v.trim()) {
          if (!gapSpaced && keep(v, prev, next)) { out += `{' '}`; gapSpaced = true; }
          return;
        }
        const lead = v.match(/^\s*/)[0], trail = v.match(/\s*$/)[0];
        if (lead && !gapSpaced && keep(lead, prev, node)) out += `{' '}`;
        out += escText(v.trim().replace(/\s+/g, ' '));
        gapSpaced = false;
        if (trail && keep(trail, node, next)) { out += `{' '}`; gapSpaced = true; }
      });
      return out;
    };

    function print(node) {
      switch (node.type) {
        case 'frontmatter': frontmatter = node.value; return '';
        case 'comment': return `{/*${node.value.replace(/\*\//g, '* /')}*/}`;
        case 'text': return escText(node.value);
        case 'expression':
          // Text inside an expression is code; nested elements are markup.
          return `{${node.children.map((c) => (c.type === 'text' ? c.value : print(c))).join('')}}`;
        case 'fragment':
          return `<>${markup(node.children)}</>`;
        case 'element':
        case 'component':
        case 'custom-element': {
          if (node.name === 'style') {
            if (node.attributes.length) todos.push(`<style ${node.attributes.map((a) => a.name).join(' ')}>: check the CSS port`);
            const sheet = node.children.map((c) => c.value).join('');
            if (sheet.includes(':global(')) todos.push('`:global()` unwrapped: check the selector is still specific to this component');
            css += sheet.replace(/:global\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g, '$1');
            uses.css = true;
            return '';
          }
          if (node.name === 'script') {
            todos.push(`<script${node.attributes.map((a) => ' ' + a.name).join('')}> (${node.children.map((c) => c.value).join('').split('\n').length} lines): port to ${name}.client.ts`);
            return '';
          }
          if (node.name === 'slot') {
            const slotName = node.attributes.find((a) => a.name === 'name')?.value;
            if (slotName) { todos.push(`named slot "${slotName}" -> prop \`${camel(slotName)}?: ReactNode\` (Astro passes it camelCased)`); return `{${camel(slotName)}}`; }
            uses.children = true;
            return '{children}';
          }
          const tag = node.name === 'Fragment' ? '' : node.name;
          const attrs = node.attributes.map((a) => attr(a, node.type === 'component')).join(' ');
          const open = `<${tag}${attrs ? ' ' + attrs : ''}`;
          if (VOID.has(node.name) || !node.children.length) return tag ? `${open} />` : '';
          return `${open}>${markup(node.children)}</${tag}>`;
        }
        default:
          todos.push(`unhandled node type ${node.type}`);
          return '';
      }
    }

    frontmatter = ast.children.find((n) => n.type === 'frontmatter')?.value ?? '';
    const body = markup(ast.children);

    // Frontmatter: imports go to the top, the rest into the function body.
    const lines = frontmatter.split('\n');
    const imports = [];
    const rest = [];
    let inImport = false;
    for (const l of lines) {
      if (/^import\s/.test(l) || inImport) {
        imports.push(l);
        inImport = !/;\s*$/.test(l) && !/from\s+['"][^'"]+['"]\s*$/.test(l);
      } else rest.push(l);
    }
    const importText = imports.join('\n').replace(/from\s+(['"])(\.[^'"]*?)\.astro\1/g, (m, q, p) => {
      if (!existsSync(resolve(dirname(file), p + '.tsx'))) todos.push(`imports ${p}.astro, which is not React yet: a React component cannot render it`);
      return `from ${q}${p}${q}`;
    });
    let code = rest.join('\n').trim();
    const propsName = `${name}Props`;
    const hasProps = /interface Props\b/.test(code);
    code = code.replace(/(export\s+)?interface Props\b/, `export interface ${propsName}`);
    code = code.replace(/^(\s*)class\?:\s*string;/m, '$1className?: string;');
    code = code.replace(/\bclass:\s*className\b/, 'className');
    if (/\bclass:\s*\w+/.test(code)) todos.push('destructures `class:` from props: rename to `className`');
    code = code.replace(/Astro\.props/g, 'props');
    for (const m of new Set(code.match(/Astro\.\w+/g) ?? [])) todos.push(`uses ${m}: pass it in as a prop`);
    if (uses.children && hasProps && !/children\??:/.test(code)) code = code.replace(`export interface ${propsName} {`, `export interface ${propsName} {\n  children?: ReactNode;`);

    // An interface cannot live in a function body: hoist every one to module level.
    const hoisted = [];
    for (let at; (at = code.search(/^(export\s+)?interface\s/m)) >= 0; ) {
      let depth = 0, end = code.indexOf('{', at);
      for (; end < code.length; end++) {
        if (code[end] === '{') depth++;
        else if (code[end] === '}' && --depth === 0) break;
      }
      // Take the doc comment directly above it along.
      const before = code.slice(0, at);
      const doc = before.match(/\/\*\*[\s\S]*?\*\/\s*$/);
      const start = doc ? at - doc[0].length : at;
      hoisted.push(code.slice(start, end + 1));
      code = code.slice(0, start) + code.slice(end + 1);
    }
    code = code.trim();

    const typeImports = [uses.CSSProperties && 'CSSProperties', uses.children && 'ReactNode'].filter(Boolean);
    const header = [
      typeImports.length && `import type { ${typeImports.join(', ')} } from 'react';`,
      uses.cx && `import { clsx as cx } from 'clsx';`,
      importText.trim(),
      uses.styleOf && `import { styleOf } from '${relativeTo(file, 'src/components/_lib/class-props')}';`,
      uses.css && `import './${name}.css';`,
    ].filter(Boolean).join('\n');
    const usesProps = /\bprops\b/.test(code);
    const childrenParam = uses.children && !/\bchildren\b/.test(code) ? `{ children }: { children?: ReactNode }` : '';
    const sig = usesProps ? `props: ${hasProps ? propsName : 'Record<string, unknown>'}` : childrenParam;
    if (uses.children && usesProps && !/\bchildren\b/.test(code)) code += `\nconst { children } = props;`;
    const tsx = `${header}\n\n${hoisted.join('\n\n')}\n\nexport default function ${name}(${sig}) {\n${code}\n\nreturn (${ast.children.filter((n) => n.type !== 'frontmatter' && !(n.type === 'text' && !n.value.trim()) && !(n.type === 'element' && (n.name === 'style' || n.name === 'script'))).length === 1 && !body.startsWith('{') ? body : `<>${body}</>`});\n}\n`;

    const out = file.replace(/\.astro$/, '.tsx');
    writeFileSync(out, tsx);
    const cssOut = file.replace(/\.astro$/, '.css');
    if (uses.css) writeFileSync(cssOut, css.replace(/^\n+/, '').replace(/^ {2}/gm, '').trimEnd() + '\n');
    try {
      execFileSync('npx', ['prettier', '--write', '--single-quote', '--print-width', '120', '--log-level', 'warn', out, ...(uses.css ? [cssOut] : [])], { stdio: 'inherit' });
    } catch {
      todos.push('prettier could not format the output: it is probably not valid TSX yet');
    }
    const bare = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@keyframes[^{]*\{(?:[^{}]*\{[^}]*\})*[^}]*\}/g, '');
    const classes = [...new Set(bare.replace(/\{[^}]*\}/g, '{}').match(/\.[a-zA-Z_][\w-]*/g) ?? [])];
    console.log(`\n${out.slice(process.cwd().length + 1)}${uses.css ? ` + ${basename(cssOut)}` : ''}`);
    if (classes.length) console.log(`  global classes: ${classes.join(' ')}`);
    const bareTags = [...bare.matchAll(/([^{};]+)\{/g)]
      .map((m) => m[1].trim())
      .filter((p) => !p.startsWith('@'))
      .flatMap((p) => p.split(',').map((x) => x.trim()))
      .filter((sel) => /^[a-z]/i.test(sel) && !/^(from|to)$/.test(sel));
    if (bareTags.length) console.log(`  check: selectors start with a bare tag name, which is global now: ${bareTags.join(', ')}`);
    for (const t of todos) console.log(`  TODO ${t}`);
  });
}

function relativeTo(from, target) {
  const rel = resolve(target).slice(0).replace(/\\/g, '/');
  const fromDir = dirname(resolve(from)).split('/');
  const to = rel.split('/');
  let i = 0;
  while (i < fromDir.length && fromDir[i] === to[i]) i++;
  return [...Array(fromDir.length - i).fill('..'), ...to.slice(i)].join('/').replace(/^(?!\.)/, './');
}

for (const f of process.argv.slice(2)) await convertFile(resolve(f));
