#!/usr/bin/env node
/**
 * SEO audit of the BUILT site. Runs after every `npm run build` (postbuild) and
 * in CI, so a page cannot ship without its title, description, canonical, Open
 * Graph card, alt text or a working internal link.
 *
 *   node scripts/seo-check.mjs           audit dist/, table + summary
 *   node scripts/seo-check.mjs --json    also write the report as JSON
 *   node scripts/seo-check.mjs --dist <dir>
 *
 * Errors exit 1 and fail the build. Warnings print and pass: they are mostly
 * copy (lengths, duplicates) or polish (image dimensions, link form) for a human.
 *
 * Redirect aliases (a meta refresh: /policy, /faq/npu-ai-enhancer) are held to
 * their own rule instead: noindex, an absolute canonical at the target, and out
 * of the sitemap. 404.html is not a page and skips the canonical/sitemap checks.
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parseDocument, DomUtils } from "htmlparser2";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const distArg = args.indexOf("--dist");
const dist = distArg >= 0 ? args[distArg + 1] : join(root, "dist");
const jsonOut = args.includes("--json")
  ? "/private/tmp/claude-501/seo/report.json"
  : null;

const config = readFileSync(join(root, "astro.config.mjs"), "utf8");
const origin = new URL(
  config.match(/site:\s*["']([^"']+)["']/)?.[1] ?? "https://bit-perfect.com",
).origin;

const LIMITS = { title: [15, 65], description: [70, 165] };

if (!existsSync(dist)) {
  console.error(
    `seo-check: ${dist} does not exist. Run \`npx astro build\` first.`,
  );
  process.exit(1);
}

/* ------------------------------------------------------------------ helpers */

const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? walk(join(d, e.name))
      : e.name.endsWith(".html")
        ? [join(d, e.name)]
        : [],
  );

/** dist/foo/index.html -> /foo/ ; dist/404.html -> /404.html */
const urlPathOf = (file) => {
  const rel = "/" + relative(dist, file).split(sep).join("/");
  return rel.endsWith("/index.html") ? rel.slice(0, -"index.html".length) : rel;
};

/** Does a same-origin path resolve to a file GitHub Pages would serve? */
const resolves = (path) => {
  let p;
  try {
    p = decodeURIComponent(path);
  } catch {
    p = path;
  }
  const f = join(dist, p);
  if (p.endsWith("/")) return existsSync(join(f, "index.html"));
  if (existsSync(f) && statSync(f).isFile()) return true;
  return existsSync(join(f, "index.html")) || existsSync(f + ".html");
};

/** A same-origin path for an href/src, or null for external, mailto, data, etc. */
const internalPath = (raw, pagePath) => {
  if (!raw) return null;
  const v = raw.trim();
  if (
    !v ||
    v.startsWith("#") ||
    /^(mailto|tel|javascript|data|blob|intent|market):/i.test(v)
  )
    return null;
  let u;
  try {
    u = new URL(v, origin + pagePath);
  } catch {
    return null;
  }
  return u.origin === origin ? u.pathname : null;
};

const text = (n) => DomUtils.textContent(n).replace(/\s+/g, " ").trim();
const attr = (n, a) => (n.attribs ? n.attribs[a] : undefined);
const all = (doc, test) =>
  DomUtils.findAll((n) => n.type === "tag" && test(n), doc.children);
const named = (doc, ...names) => all(doc, (n) => names.includes(n.name));
const meta = (doc, key) => {
  const m = all(
    doc,
    (n) =>
      n.name === "meta" &&
      (attr(n, "name") === key || attr(n, "property") === key),
  );
  return m.length ? (attr(m[0], "content") ?? "") : undefined;
};
const inSvg = (n) => {
  for (let p = n.parent; p; p = p.parent) if (p.name === "svg") return true;
  return false;
};
/* alt="" is right when the image is hidden from assistive tech, or when it sits
   in a link or button whose own text already names it (the logo beside the
   wordmark). Anywhere else it is a judgement call for a human. */
const decorativeContext = (n) => {
  for (let p = n; p && p.type === "tag"; p = p.parent) {
    if (attr(p, "aria-hidden") === "true") return true;
    if (["presentation", "none"].includes(attr(p, "role"))) return true;
    if (["a", "button"].includes(p.name))
      return text(p).length > 0 || !!attr(p, "aria-label");
  }
  return false;
};

/* -------------------------------------------------------------- site files */

const site = { errors: [], warnings: [] };

const robotsFile = join(dist, "robots.txt");
if (!existsSync(robotsFile)) site.errors.push("robots.txt is missing");
else if (!/^sitemap:\s*\S+/im.test(readFileSync(robotsFile, "utf8")))
  site.errors.push("robots.txt does not reference a sitemap");

const sitemapUrls = new Set();
const indexFile = join(dist, "sitemap-index.xml");
if (!existsSync(indexFile)) site.errors.push("sitemap-index.xml is missing");
else {
  const locs = (xml) =>
    [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  const children = locs(readFileSync(indexFile, "utf8"));
  if (!children.length) site.errors.push("sitemap-index.xml lists no sitemaps");
  for (const loc of children) {
    const f = join(dist, new URL(loc).pathname);
    if (!existsSync(f)) {
      site.errors.push(`sitemap-index.xml lists ${loc}, which was not built`);
      continue;
    }
    for (const u of locs(readFileSync(f, "utf8"))) sitemapUrls.add(u);
  }
  if (!sitemapUrls.size) site.errors.push("the sitemaps list no URLs");
}

/* ------------------------------------------------------------------- pages */

const pages = [];
const byTitle = new Map();
const byDescription = new Map();
/* Site-wide findings, one warning per href or image rather than one per page:
   the same header link or phone screen repeats on every page that uses it. */
const linkForms = new Map(); // href -> pages using it, for the slash/case warning
const emptyAlt = new Map(); // image folder -> images where alt="" has no decorative context
const sizeless = new Map(); // image -> pages where it has no width/height
const note = (map, key, path) =>
  map.set(key, new Set([...(map.get(key) ?? []), path]));
const files = walk(dist).sort();

for (const file of files) {
  const path = urlPathOf(file);
  const url = origin + path;
  const html = readFileSync(file, "utf8");
  const doc = parseDocument(html, { decodeEntities: true });
  const errors = [];
  const warnings = [];
  const page = { path, errors, warnings };
  pages.push(page);

  const htmlEl = named(doc, "html")[0];
  const robots = (meta(doc, "robots") ?? "").toLowerCase();
  const noindex = robots.includes("noindex");
  const refresh = all(
    doc,
    (n) =>
      n.name === "meta" &&
      (attr(n, "http-equiv") ?? "").toLowerCase() === "refresh",
  );
  const isRedirect = refresh.length > 0;
  const is404 = path === "/404.html";
  const inSitemap = sitemapUrls.has(url);
  page.kind = isRedirect ? "redirect" : is404 ? "404" : "page";

  if (!attr(htmlEl ?? {}, "lang")) errors.push("<html> has no lang");
  if (!meta(doc, "viewport")) errors.push("no meta viewport");

  // Title
  const titles = named(doc, "title").filter((t) => !inSvg(t));
  const title = titles[0] ? text(titles[0]) : "";
  page.title = title;
  if (titles.length !== 1)
    errors.push(`${titles.length} <title> elements (want exactly 1)`);
  if (!title) errors.push("empty <title>");

  // Canonical
  const canonicals = all(
    doc,
    (n) =>
      n.name === "link" &&
      (attr(n, "rel") ?? "").split(/\s+/).includes("canonical"),
  );
  const canonical = canonicals[0] ? attr(canonicals[0], "href") : "";
  if (canonicals.length !== 1)
    errors.push(`${canonicals.length} canonical links (want exactly 1)`);
  else if (!/^https?:\/\//.test(canonical))
    errors.push(`canonical is not absolute: ${canonical}`);
  else if (new URL(canonical).origin !== origin)
    errors.push(`canonical is off-site: ${canonical}`);

  // Sitemap and noindex agree
  if (!is404) {
    if (inSitemap && noindex) errors.push("noindex, but listed in the sitemap");
    if (!inSitemap && !noindex)
      errors.push("indexable, but missing from the sitemap");
  }

  if (isRedirect) {
    if (!noindex) errors.push("redirect alias is not noindex");
    const target = (attr(refresh[0], "content") ?? "").match(
      /url\s*=\s*['"]?([^'"]+)/i,
    )?.[1];
    const tp = internalPath(target, path);
    if (tp && !resolves(tp))
      errors.push(`redirect target does not exist: ${target}`);
    if (canonical && tp && /^https?:\/\//.test(canonical)) {
      const cp = new URL(canonical).pathname.replace(/\/$/, "");
      if (cp !== tp.replace(/\/$/, ""))
        warnings.push(
          `canonical ${canonical} is not the redirect target ${target}`,
        );
    }
    page.summary = { title: title.length, description: "-", h1: "-" };
  } else {
    if (!is404 && canonical && /^https?:\/\//.test(canonical)) {
      const cp = new URL(canonical).pathname;
      if (cp !== path)
        errors.push(`canonical points at ${cp}, not this page (${path})`);
    }

    const [tmin, tmax] = LIMITS.title;
    if (title && (title.length < tmin || title.length > tmax))
      warnings.push(
        `title is ${title.length} chars (want ${tmin}-${tmax}): "${title}"`,
      );

    // Description
    const description = meta(doc, "description");
    page.description = description ?? "";
    const [dmin, dmax] = LIMITS.description;
    if (description === undefined || !description.trim())
      errors.push("no meta description");
    else if (description.length < dmin || description.length > dmax)
      warnings.push(
        `description is ${description.length} chars (want ${dmin}-${dmax})`,
      );

    if (!is404) {
      if (title) byTitle.set(title, [...(byTitle.get(title) ?? []), path]);
      if (description)
        byDescription.set(description, [
          ...(byDescription.get(description) ?? []),
          path,
        ]);
    }

    // Headings
    const headings = named(doc, "h1", "h2", "h3", "h4", "h5", "h6");
    const h1s = headings.filter((h) => h.name === "h1");
    if (h1s.length !== 1)
      errors.push(`${h1s.length} <h1> elements (want exactly 1)`);
    let prev = 0;
    for (const h of headings) {
      const level = Number(h.name[1]);
      if (prev && level > prev + 1)
        warnings.push(
          `heading skips h${prev} -> h${level}: "${text(h).slice(0, 50)}"`,
        );
      prev = level;
    }

    // Open Graph and Twitter
    for (const key of [
      "og:title",
      "og:description",
      "og:type",
      "og:url",
      "og:image",
    ])
      if (!meta(doc, key)) errors.push(`no ${key}`);
    const ogUrl = meta(doc, "og:url");
    if (ogUrl && canonical && ogUrl !== canonical)
      warnings.push(`og:url ${ogUrl} differs from canonical ${canonical}`);
    const ogImage = meta(doc, "og:image");
    if (ogImage) {
      if (!/^https?:\/\//.test(ogImage))
        errors.push(`og:image is not absolute: ${ogImage}`);
      else {
        const ip = internalPath(ogImage, path);
        if (ip && !resolves(ip))
          errors.push(`og:image file is missing: ${ogImage}`);
      }
    }
    if (!meta(doc, "twitter:card")) errors.push("no twitter:card");

    // Structured data
    for (const s of all(
      doc,
      (n) => n.name === "script" && attr(n, "type") === "application/ld+json",
    )) {
      try {
        const data = JSON.parse(DomUtils.textContent(s));
        for (const item of Array.isArray(data) ? data : [data]) {
          if (!item["@context"]) errors.push("JSON-LD block has no @context");
          if (!item["@type"] && !item["@graph"])
            errors.push("JSON-LD block has no @type");
        }
      } catch (e) {
        errors.push(`JSON-LD does not parse: ${e.message}`);
      }
    }

    // Images
    const altless = [];
    for (const img of named(doc, "img")) {
      const src = attr(img, "src") ?? "";
      const name = src.split("/").pop() || "(no src)";
      const alt = attr(img, "alt");
      if (alt === undefined) altless.push(name);
      else if (!alt.trim() && !decorativeContext(img))
        note(emptyAlt, src.slice(0, src.lastIndexOf("/") + 1), name);
      if (!attr(img, "width") || !attr(img, "height"))
        note(sizeless, name, path);
    }
    if (altless.length) errors.push(`<img> without alt: ${altless.join(", ")}`);

    page.summary = {
      title: title.length,
      description: description?.length ?? 0,
      h1: h1s.length,
    };
  }

  // Internal links and assets, on every kind of page
  const broken = new Set();
  const refs = [];
  for (const a of named(doc, "a", "area")) refs.push([attr(a, "href"), true]);
  for (const el of named(doc, "img", "source", "script", "link")) {
    if (
      el.name === "link" &&
      !/(icon|manifest|stylesheet|preload|canonical)/.test(
        attr(el, "rel") ?? "",
      )
    )
      continue;
    if (el.name === "link" && (attr(el, "rel") ?? "").includes("canonical"))
      continue;
    refs.push([attr(el, "src") ?? attr(el, "href"), false]);
    for (const part of (attr(el, "srcset") ?? "").split(","))
      refs.push([part.trim().split(/\s+/)[0], false]);
  }
  for (const [raw, isLink] of refs) {
    const p = internalPath(raw, path);
    if (!p) continue;
    if (!resolves(p)) broken.add(raw);
    else if (isLink && !/\.[a-z0-9]+$/i.test(p)) {
      if (p !== p.toLowerCase() || !p.endsWith("/")) {
        note(linkForms, raw.split("#")[0], path);
      }
    }
  }
  if (broken.size)
    errors.push(`broken internal links: ${[...broken].join(", ")}`);
}

/* Sitemap URLs that were not built */
const built = new Set(pages.map((p) => origin + p.path));
for (const u of sitemapUrls)
  if (!built.has(u))
    site.errors.push(`sitemap lists ${u}, which was not built`);

/* Duplicates across pages are copy: warnings, attached to every page involved */
for (const [kind, map] of [
  ["title", byTitle],
  ["description", byDescription],
])
  for (const [value, paths] of map)
    if (paths.length > 1)
      for (const p of paths)
        pages
          .find((x) => x.path === p)
          .warnings.push(
            `duplicate ${kind}, shared with ${paths.filter((x) => x !== p).join(", ")}`,
          );

/* Link form: GitHub Pages answers /foo with a 301 to /foo/, so a link without
   the slash costs every visitor and crawler a redirect hop. One line per href. */
for (const [href, from] of linkForms) {
  const p = new URL(href, origin).pathname;
  const why =
    p !== p.toLowerCase()
      ? "has uppercase"
      : "has no trailing slash (301 on GitHub Pages)";
  site.warnings.push(`link ${href} ${why}; used on ${from.size} page(s)`);
}
const where = (from) =>
  from.size > 3 ? `${from.size} pages` : [...from].join(", ");
for (const [dir, imgs] of emptyAlt)
  site.warnings.push(
    `${imgs.size} image(s) in ${dir} have alt="" outside a link, aria-hidden or presentation context ` +
      `(${[...imgs].slice(0, 4).join(", ")}${imgs.size > 4 ? ", ..." : ""}): confirm decorative, or write alt copy`,
  );
for (const [img, from] of sizeless)
  site.warnings.push(`${img} has no width/height (${where(from)})`);

/* ------------------------------------------------------------------ output */

const pad = (s, n) => String(s).padEnd(n);
const errCount =
  site.errors.length + pages.reduce((n, p) => n + p.errors.length, 0);
const warnCount =
  site.warnings.length + pages.reduce((n, p) => n + p.warnings.length, 0);
const w = Math.max(...pages.map((p) => p.path.length), 4) + 2;
const red = (s) => (process.stdout.isTTY ? `\x1b[31m${s}\x1b[0m` : s);
const yellow = (s) => (process.stdout.isTTY ? `\x1b[33m${s}\x1b[0m` : s);

console.log(
  `\nSEO check: ${pages.length} HTML files in ${relative(root, dist) || dist}, origin ${origin}\n`,
);
console.log(
  `${pad("page", w)}${pad("kind", 10)}${pad("title", 7)}${pad("desc", 6)}${pad("h1", 4)}${pad("err", 5)}warn`,
);
console.log("-".repeat(w + 36));
for (const p of pages) {
  const s = p.summary;
  console.log(
    `${pad(p.path, w)}${pad(p.kind, 10)}${pad(s.title, 7)}${pad(s.description, 6)}${pad(s.h1, 4)}` +
      `${pad(p.errors.length ? red(p.errors.length) : 0, p.errors.length && process.stdout.isTTY ? 14 : 5)}${p.warnings.length}`,
  );
}

const section = (label, list, paint) => {
  if (!list.length) return;
  console.log(`\n${label}`);
  for (const line of list) console.log(`  ${paint(line)}`);
};
section(
  "site",
  [
    ...site.errors.map((e) => `ERROR ${e}`),
    ...site.warnings.map((e) => `warn  ${e}`),
  ],
  (s) => (s.startsWith("ERROR") ? red(s) : yellow(s)),
);
for (const p of pages)
  section(
    p.path,
    [
      ...p.errors.map((e) => `ERROR ${e}`),
      ...p.warnings.map((e) => `warn  ${e}`),
    ],
    (s) => (s.startsWith("ERROR") ? red(s) : yellow(s)),
  );

console.log(
  `\n${errCount ? red(`${errCount} error(s)`) : "0 errors"}, ${warnCount} warning(s), ${sitemapUrls.size} sitemap URL(s)`,
);

if (jsonOut) {
  mkdirSync(dirname(jsonOut), { recursive: true });
  writeFileSync(
    jsonOut,
    JSON.stringify(
      { origin, errors: errCount, warnings: warnCount, site, pages },
      null,
      2,
    ),
  );
  console.log(`report: ${jsonOut}`);
}

process.exit(errCount ? 1 : 0);
