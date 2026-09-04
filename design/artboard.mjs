/**
 * Cut an artboard for the Claude Design canvas from the SHIPPING page.
 *
 * The canvas in `design/` is a mirror of the site, never a specification ahead of
 * it. Hand-porting a layout into an artboard is how it drifted out of step the
 * last time, so an artboard is only ever produced by running this.
 *
 *   npm run build && npx serve dist -l 4322
 *   node design/artboard.mjs
 *   node design/artboard.mjs Main FeaturesIndex        # a subset, by artboard name
 *
 * WHAT IT PRODUCES is the format the canvas editor expects and the previous
 * artboards already use: one `<x-dc>` document per artboard, a `<helmet>` holding
 * the font link and the body defaults, and then the page's DOM with every element
 * carrying its own computed geometry and paint as an inline `style`. Classes, ids
 * and data attributes are dropped: in the canvas an element is edited directly, so
 * a class pointing at a stylesheet that does not travel with the file is a
 * dangling reference.
 *
 * HOW IT KEEPS FIDELITY:
 *
 * - `reducedMotion: 'reduce'`. Every reveal on this site is `opacity: 0` until an
 *   IntersectionObserver adds `.is-visible`, and the same media query is the one
 *   escape hatch the CSS already honours (`src/styles/animations.css`). Capturing
 *   under it gives the settled state of the whole page without touching a style.
 * - Images are inlined as data URIs. An artboard published into an artifact has no
 *   server to fetch `/img/home-privacy.webp` from, and a canvas full of broken
 *   images is worse than one with none.
 * - Fonts come from Google Fonts rather than the site's self-hosted woff2, for the
 *   same reason, and that is what the existing artboards already do.
 * - Only styles that DIFFER from a bare element of the same tag are written, so
 *   the output is the page's decisions rather than the browser's defaults.
 */
import { chromium } from "playwright-core";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ORIGIN = process.env.ARTBOARD_ORIGIN ?? "http://localhost:4322";

/**
 * `at` is the CSS width the artboard is cut at, and it is the width the canvas
 * lays it out at in `canvas.json`. `route` is the page it comes from.
 */
const ARTBOARDS = [
  { file: "Main.dc.html", route: "/", at: 1440, title: "Home" },
  {
    file: "FeaturesIndex.dc.html",
    route: "/features/",
    at: 1440,
    title: "Features index",
  },
  {
    file: "FeatureUsbDac.dc.html",
    route: "/features/usb-dac/",
    at: 1440,
    title: "Feature: USB DAC",
  },
  {
    file: "FeatureEq.dc.html",
    route: "/features/eq/",
    at: 1440,
    title: "Feature: 32-band EQ",
  },
  {
    file: "FeatureLibrary.dc.html",
    route: "/features/library/",
    at: 1440,
    title: "Feature: Library",
  },
  {
    file: "FeatureCasting.dc.html",
    route: "/features/casting/",
    at: 1440,
    title: "Feature: Streaming",
  },
  {
    file: "FeatureDsp.dc.html",
    route: "/features/dsp/",
    at: 1440,
    title: "Feature: Studio DSP",
  },
  {
    file: "FeatureAiEnhancer.dc.html",
    route: "/features/ai-enhancer/",
    at: 1440,
    title: "Feature: AI Enhancer",
  },
  {
    file: "Privacy.dc.html",
    route: "/privacy/",
    at: 1440,
    title: "Privacy Policy",
  },
  { file: "Terms.dc.html", route: "/terms/", at: 1440, title: "Terms of Use" },
  { file: "MainMobile.dc.html", route: "/", at: 390, title: "Home at 390" },
  {
    file: "FeatureMobile.dc.html",
    route: "/features/usb-dac/",
    at: 390,
    title: "Feature at 390",
  },
];

/*
  An ALLOWLIST, not a diff against the browser's defaults.

  The diff was the first attempt and it produced 60 declarations per element:
  `caret-color`, `text-emphasis-color`, `border-block-end-color`, the whole
  `-webkit-text-*` family, each of them a faithful reading of the cascade and none
  of them anything a designer would ever touch. What belongs in an artboard is what
  a designer can see and move, so the properties are named.
*/
const ALLOW = [
  "display",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "z-index",
  "float",
  "clear",
  "flex-direction",
  "flex-wrap",
  "justify-content",
  "align-items",
  "align-content",
  "align-self",
  "flex-grow",
  "flex-shrink",
  "flex-basis",
  "order",
  "gap",
  "row-gap",
  "column-gap",
  "grid-template-columns",
  "grid-template-rows",
  "grid-column",
  "grid-row",
  "grid-auto-flow",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "max-width",
  "min-width",
  "max-height",
  "min-height",
  "aspect-ratio",
  "box-sizing",
  "color",
  "background-color",
  "background-image",
  "background-size",
  "background-position",
  "background-repeat",
  "background-clip",
  "-webkit-background-clip",
  "-webkit-text-fill-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-bottom-right-radius",
  "border-bottom-left-radius",
  "box-shadow",
  "opacity",
  "transform",
  "filter",
  "backdrop-filter",
  "mix-blend-mode",
  "isolation",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "font-variant-numeric",
  "line-height",
  "letter-spacing",
  "text-align",
  "text-transform",
  "text-decoration-line",
  "text-decoration-color",
  "text-underline-offset",
  "white-space",
  "text-overflow",
  "word-break",
  "text-wrap-style",
  "text-wrap-mode",
  "overflow-x",
  "overflow-y",
  "list-style-type",
  "list-style-position",
  "vertical-align",
  "object-fit",
  "object-position",
  "table-layout",
  "border-collapse",
];

/* Borders are the one family that has to be read as a set: Tailwind's preflight
   leaves every element `border: 0 solid <currentColor>`, so a style without its
   width is a border the artboard draws and the site does not. */
const BORDER_SIDES = ["top", "right", "bottom", "left"];

/** The wrapper background: the page's own body colour, so the board is not transparent. */
async function cut(page, { route, at }) {
  await page.setViewportSize({ width: at, height: 1000 });
  await page.goto(ORIGIN + route, { waitUntil: "networkidle" });

  /* Walk the page once so every observer has fired, then settle at the top. Under
     reduced motion the reveals are already neutral, but the scroll also forces any
     lazy image to decode, which matters because they are inlined below. */
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
    /* The scroll-spy leaves whichever section was last in view marked active, and
       the cut bakes that state into an inline style: a legal artboard came back
       with "Changes to this policy" lit gold. Back at the top, nothing is. */
    document
      .querySelectorAll(".is-active")
      .forEach((el) => el.classList.remove("is-active"));
    await new Promise((r) => setTimeout(r, 120));
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images)
        .filter((i) => !i.complete)
        .map((i) => i.decode().catch(() => {})),
    );
  });

  return page.evaluate(
    ({ allow, sides, width }) => {
      /* One clean frame to read a bare element's defaults from. Reading them out of
       the live document would inherit the page's own cascade, which is exactly
       what we are trying to separate out. */
      const frame = document.createElement("iframe");
      frame.style.cssText =
        "position:fixed;left:-9999px;width:1px;height:1px;border:0";
      document.body.appendChild(frame);
      const fdoc = frame.contentDocument;
      const defaults = new Map();
      const defaultsFor = (tag) => {
        if (!defaults.has(tag)) {
          const probe = fdoc.createElement(tag);
          /* An anchor is only styled by the UA once it is a LINK: `a:-webkit-any-link`
           needs an href. Probing a bare <a> reports `text-decoration: none`, which
           made every link on the page look like it matched the default and shipped
           an artboard where the header nav was underlined and the site was not. */
          if (tag === "a") probe.setAttribute("href", "#");
          fdoc.body.appendChild(probe);
          const cs = fdoc.defaultView.getComputedStyle(probe);
          const map = new Map();
          for (const prop of cs) map.set(prop, cs.getPropertyValue(prop));
          defaults.set(tag, map);
          probe.remove();
        }
        return defaults.get(tag);
      };

      const esc = (s) =>
        s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const escAttr = (s) => esc(s).replace(/"/g, "&quot;");

      /* Geometry is written explicitly. The canvas positions and resizes elements
       directly, and an element whose size comes from a flex parent has nothing for
       it to grab. */
      const geometry = (el, cs) => {
        const box = el.getBoundingClientRect();
        if (!box.width && !box.height) return "";
        if (cs.display === "inline") return "";
        /* CEIL the width. Rounding a 78.4px label down to 78 takes the fraction the
         text needed and the artboard wraps a line the site sets on one: the spec
         rows came back as "Filter / types" and "Q / range". A pixel of slack costs
         nothing; a shaved pixel re-flows the page. */
        return `width: ${Math.ceil(box.width)}px; height: ${Math.round(box.height)}px`;
      };

      const serialize = (el) => {
        const tag = el.tagName.toLowerCase();
        if (
          tag === "script" ||
          tag === "noscript" ||
          tag === "template" ||
          tag === "link"
        )
          return "";
        if (el.hasAttribute("hidden")) return "";

        const cs = getComputedStyle(el);
        if (cs.display === "none") return "";

        /* SVG travels verbatim: its presentation lives in its own attributes, and a
         computed-style pass over <path> and <tspan> produces pages of noise that
         changes nothing about how it draws. */
        if (tag === "svg") return el.outerHTML;

        const def = defaultsFor(tag);
        const decls = [];
        for (const prop of allow) {
          const value = cs.getPropertyValue(prop);
          if (!value || value === def.get(prop)) continue;
          decls.push(`${prop}: ${value}`);
        }
        for (const side of sides) {
          const w = parseFloat(cs.getPropertyValue(`border-${side}-width`));
          if (!w) continue;
          decls.push(
            `border-${side}: ${cs.getPropertyValue(`border-${side}-width`)} ` +
              `${cs.getPropertyValue(`border-${side}-style`)} ${cs.getPropertyValue(`border-${side}-color`)}`,
          );
        }
        const geo = geometry(el, cs);
        if (geo) decls.push(geo);

        const attrs = [`style="${escAttr(decls.join("; "))}"`];
        for (const name of ["src", "alt", "href", "colspan", "rowspan"]) {
          if (el.hasAttribute(name))
            attrs.push(`${name}="${escAttr(el.getAttribute(name))}"`);
        }
        /* State attributes are not decoration: a <details> without `open` renders as
         a closed disclosure, and the artboard loses everything inside it. That is
         how the legal pages' section index came out as an empty box. */
        for (const name of [
          "open",
          "checked",
          "selected",
          "reversed",
          "start",
        ]) {
          if (el.hasAttribute(name)) attrs.push(name);
        }

        const VOID = ["img", "br", "hr", "input", "source"];
        if (VOID.includes(tag)) return `<${tag} ${attrs.join(" ")}>`;

        let inner = "";
        for (const node of el.childNodes) {
          if (node.nodeType === Node.TEXT_NODE) inner += esc(node.nodeValue);
          else if (node.nodeType === Node.ELEMENT_NODE)
            inner += serialize(node);
        }
        return `<${tag} ${attrs.join(" ")}>${inner}</${tag}>`;
      };

      const bodyStyle = getComputedStyle(document.body);
      const htmlStyle = getComputedStyle(document.documentElement);
      const opaque = (v) =>
        v && v !== "transparent" && !/rgba\(0, 0, 0, 0\)/.test(v);
      const ground = opaque(bodyStyle.backgroundColor)
        ? bodyStyle.backgroundColor
        : opaque(htmlStyle.backgroundColor)
          ? htmlStyle.backgroundColor
          : "rgb(25, 25, 25)";
      const body = Array.from(document.body.children).map(serialize).join("\n");
      frame.remove();

      return {
        body,
        height: Math.round(document.body.scrollHeight),
        background: ground,
        defaults: [
          "margin: 0",
          `font-family: ${bodyStyle.fontFamily}`,
          `font-size: ${bodyStyle.fontSize}`,
          `font-weight: ${bodyStyle.fontWeight}`,
          `line-height: ${bodyStyle.lineHeight}`,
          `color: ${bodyStyle.color}`,
          `background-color: ${ground}`,
          "-webkit-font-smoothing: antialiased",
        ].join("; "),
      };
    },
    { allow: ALLOW, sides: BORDER_SIDES, width: at },
  );
}

/** Inline every `/img/...` reference the cut produced, so the board is portable. */
function inlineImages(html) {
  return html.replace(
    /src="([^"]+\.(?:webp|png|jpg|jpeg|svg))"/g,
    (match, url) => {
      const rel = url.replace(/^https?:\/\/[^/]+/, "").replace(/^\//, "");
      const file = join(HERE, "..", "public", rel);
      if (!existsSync(file)) return match;
      const type = rel.endsWith(".svg")
        ? "image/svg+xml"
        : rel.endsWith(".png")
          ? "image/png"
          : rel.endsWith(".webp")
            ? "image/webp"
            : "image/jpeg";
      return `src="data:${type};base64,${readFileSync(file).toString("base64")}"`;
    },
  );
}

const wanted = process.argv.slice(2);
const boards = wanted.length
  ? ARTBOARDS.filter((b) => wanted.includes(b.file.replace(".dc.html", "")))
  : ARTBOARDS;

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({
  reducedMotion: "reduce",
  deviceScaleFactor: 1,
});

const cutBoards = [];
for (const board of boards) {
  const { body, height, background, defaults } = await cut(page, board);
  const doc = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap">
  <style>
    /* Tailwind's preflight, reduced to the two rules an artboard depends on: the
       box model every measurement here was taken under, and the zero-width border
       that keeps a bare border-style from drawing a box the site never had. */
    *, *::before, *::after { box-sizing: border-box; border: 0 solid; }
    body { ${defaults}; }
  </style>
</helmet>

<!-- Cut from the shipping page at ${board.route} (${board.at}px) by design/artboard.mjs.
     Hand-porting is how this artboard drifted out of step with the code the last
     time; re-cut it rather than editing the layout here. -->
<div style="position: relative; width: ${board.at}px; overflow: hidden; background: ${background};">
${inlineImages(body)}
</div>
</x-dc>
</body>
</html>
`;
  writeFileSync(join(HERE, board.file), doc);
  cutBoards.push({ ...board, height });
  console.log(
    `${board.file.padEnd(26)} ${board.at}x${height}  ${(doc.length / 1024).toFixed(0)}KB`,
  );
}
await browser.close();

/*
  The canvas layout.

  Boards run left to right in one row at desktop width, with the mobile boards on a
  second row below the tallest of them. Only what this run actually cut is resized;
  every other board on the canvas KEEPS its own size and its place in the order.
  An artboard this script does not know how to produce — `PhoneShowcase`, which is
  a scroll-pinned sequence unrolled by hand, and `ImageSlots`, which is a gallery of
  the registration frames — must survive a re-cut of its neighbours. Dropping a
  board because this file has no recipe for it is how a canvas loses work.
*/
const GAP = 120;
const canvasPath = join(HERE, "canvas.json");
const canvas = JSON.parse(readFileSync(canvasPath, "utf8"));
const byFile = new Map(cutBoards.map((b) => [b.file, b]));
const previous = new Map(canvas.artboards.map((a) => [a.file, a]));

/* Everything this script knows about, in its declared order, then anything already
   on the canvas that it does not. */
const order = [
  ...ARTBOARDS.filter((b) => byFile.has(b.file) || previous.has(b.file)).map(
    (b) => b.file,
  ),
  ...canvas.artboards
    .map((a) => a.file)
    .filter((f) => !ARTBOARDS.some((b) => b.file === f)),
];

const laid = [];
let deskX = 0;
let mobX = 0;
for (const file of order) {
  const spec = ARTBOARDS.find((b) => b.file === file);
  const prev = previous.get(file);
  const cutB = byFile.get(file);
  const w = cutB?.at ?? spec?.at ?? prev?.w ?? 1440;
  const h = cutB?.height ?? prev?.h ?? 1000;
  const title = spec?.title ?? prev?.title ?? file.replace(".dc.html", "");
  laid.push({ file, w, h, title, mobile: w < 1440 });
}

const mobileY =
  Math.max(0, ...laid.filter((b) => !b.mobile).map((b) => b.h)) + 200;
canvas.artboards = laid.map(({ file, w, h, title, mobile }) => {
  const entry = mobile
    ? { file, x: mobX, y: mobileY, w, h, title }
    : { file, x: deskX, y: 0, w, h, title };
  if (mobile) mobX += w + GAP;
  else deskX += w + GAP;
  return entry;
});

writeFileSync(canvasPath, JSON.stringify(canvas, null, 2) + "\n");
console.log(
  `\n${cutBoards.length} artboard(s) cut, ${canvas.artboards.length} on the canvas.`,
);
