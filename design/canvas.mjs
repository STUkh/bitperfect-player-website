/**
 * Rebuild the published canvas page from the artboards on disk.
 *
 *   node design/canvas.mjs <published-artifact.html> [out.html]
 *
 * The Claude Design canvas is a single self-contained page: the editor code and
 * the design content live in one file, and the content — one `.dc.html` per
 * artboard, plus `canvas.json` — is a JSON document inside
 * `<script type="application/json" id="appifact-doc">`. Everything else in that
 * file is runtime, and it is rebuilt on publish, so the only safe way to update the
 * canvas is to take the CURRENT published page, swap that one block, and publish
 * the result back to the same URL.
 *
 * Which is why the input is the page as published rather than the copy in this
 * folder: that copy is a download from a particular day, and republishing it would
 * silently roll back anything saved from inside the canvas since.
 *
 * `comments` and any other key in the document are carried through untouched. Only
 * `content.files` is replaced, and only for the files that exist here.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const [input, output] = process.argv.slice(2);
if (!input) {
  console.error(
    "usage: node design/canvas.mjs <published-artifact.html> [out.html]",
  );
  process.exit(1);
}

const page = readFileSync(input, "utf8");
const OPEN = '<script type="application/json" id="appifact-doc">';
const start = page.indexOf(OPEN);
if (start < 0) throw new Error("no appifact-doc block in that page");
const from = start + OPEN.length;
const to = page.indexOf("</script>", from);
const doc = JSON.parse(page.slice(from, to));

const files = { ...doc.content.files };
let replaced = 0;
let added = 0;
for (const name of readdirSync(HERE)) {
  if (!name.endsWith(".dc.html") && name !== "canvas.json") continue;
  const body = readFileSync(join(HERE, name), "utf8");
  if (files[name] === undefined) added++;
  else if (files[name] !== body) replaced++;
  files[name] = body;
}

/* An artboard removed from disk is removed from the canvas too, so the document
   cannot keep serving a board whose source no longer exists. */
const removed = Object.keys(files).filter(
  (name) => !readdirSync(HERE).includes(name),
);
for (const name of removed) delete files[name];

doc.content.files = files;

/*
  `<` is escaped on the way in, and it is not optional.

  Every artboard contains the literal text `</script>` — each `.dc.html` opens with
  one — and an HTML parser ends a script element at the first of those it sees,
  wherever it appears, including inside a JSON string. Written raw, the document
  block is cut in half and the canvas loads with no content at all. The same escape
  is why the published file already reads `\u003c!doctype html>`. `>` and the two
  line separators go with it, which is the standard set for JSON embedded in HTML.
*/
const embed = JSON.stringify(doc)
  .replace(/</g, "\\u003c")
  .replace(/>/g, "\\u003e")
  .replace(/\u2028/g, "\\u2028")
  .replace(/\u2029/g, "\\u2029");

const rebuilt = page.slice(0, from) + embed + page.slice(to);
const out = output ?? join(HERE, "bitperfect-website-redesign.html");
writeFileSync(out, rebuilt);

console.log(
  `files: ${Object.keys(files).length} (${replaced} updated, ${added} new, ${removed.length} removed)`,
);
console.log(`${(rebuilt.length / 1024 / 1024).toFixed(2)}MB -> ${out}`);
