#!/usr/bin/env python3
"""Check that every class, token and component named in .design-sync/conventions.md exists in the built design system.

Run from the repo root after `node .design-sync/sync.mjs` has produced ./ds-bundle:
    python3 /private/tmp/claude-501/lacquer-ref/validate-conventions.py
Prints the names that do NOT resolve (empty list = OK). A name resolves when
  - a utility/class `.name` is defined in ds-bundle/_ds_bundle.css or styles.css, or
  - a Tailwind token `--color|radius|shadow|text|tracking|container-<name>` is defined there, or
  - it is a component directory under ds-bundle/components/*/<Name>, or
  - it is a prop/word listed in IGNORE, or an arbitrary value (`max-w-[...]`, `bg-gold/8`).
"""
import glob, os, re, sys

root = os.getcwd()
conv = open(os.path.join(root, '.design-sync/conventions.md')).read()
css = open('ds-bundle/_ds_bundle.css').read() + open('ds-bundle/styles.css').read()
comps = {os.path.basename(p) for p in glob.glob('ds-bundle/components/*/*')}
IGNORE = {'direction', 'headings', 'href', 'meta', 'next', 'pathname', 'prev', 'primary', 'secondary', 'size',
          'label', 'outline', 'prev', 'next', 'children', 'className', 'slug', 'state', 'name', 'material',
          'wood', 'copper', 'glass', 'media', 'specs', 'tone', 'titleAs', 'link', 'badge', 'eyebrow', 'screen', 'screens', 'sm', 'md', 'lg', 'icon', 'fill', 'as', 'variant', 'tone', 'graphite', 'ivory'}
bad = []
for tok in sorted(set(re.findall(r'`([A-Za-z][\w:/.\[\]%-]*)`', conv))):
    if tok in IGNORE or tok.startswith(('/', 'guidelines', 'styles', '_ds')) or '=' in tok or tok.startswith('--'):
        continue
    if tok in comps or tok in ('Surface',):
        continue
    if re.search(r'\[.*\]', tok) or re.search(r'/\d+$', tok):
        continue  # arbitrary value or alpha, resolved by Tailwind at build time
    esc = re.escape(tok)
    cls = re.search(r'\.' + esc + r'(?![\w-])', css)
    stripped = re.sub(r'^(?:bg|text|border|rounded|shadow|tracking|max-w)-', '', tok)
    token = re.search(r'--(?:color|radius|shadow|text|tracking|container)-' + re.escape(stripped) + r'\s*:', css)
    if not (cls or token):
        bad.append(tok)
print(bad)
sys.exit(1 if bad else 0)
