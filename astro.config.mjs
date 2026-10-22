import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import { buildImages } from "./scripts/images.mjs";
import Beasties from "beasties";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

/* Responsive variants (AVIF/WebP ladders, phone crops, LQIPs) are generated
   before anything renders, so `Picture` reads a manifest that matches the files
   on disk in `astro dev`, `astro build` and CI alike. Unchanged sources are
   skipped, so after the first run this costs a hash per file. */
const responsiveImages = () => ({
  name: "responsive-images",
  hooks: {
    "astro:config:setup": async ({ logger }) => {
      await buildImages({ log: (m) => logger.info(m) });
    },
  },
});

/* Critical CSS. Each built page gets the rules its own markup matches inlined in
   the head, and the full stylesheet arrives as a non-blocking preload, so first
   paint waits on the HTML alone rather than on 84K of CSS the holding page uses
   a third of. Nothing is pruned: once the sheet lands every rule is back, so a
   state a script sets later (a reveal, the open menu) is styled as before. The
   allow-list covers what scripts set during load, which the build cannot see. */
const criticalCss = () => ({
  name: "critical-css",
  hooks: {
    "astro:build:done": async ({ dir, logger }) => {
      const root = fileURLToPath(dir);
      const beasties = new Beasties({
        path: root,
        publicPath: "/",
        preload: "swap",
        pruneSource: false,
        reduceInlineStyles: false,
        allowRules: [/html\.js/, /is-visible/, /is-armed/, /is-active/, /data-(open|moving|armed|bound)/, /aria-expanded/],
        logLevel: "warn",
      });
      const walk = (d) =>
        readdirSync(d, { withFileTypes: true }).flatMap((e) =>
          e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith(".html") ? [join(d, e.name)] : [],
        );
      const pages = walk(root);
      for (const file of pages) {
        const html = readFileSync(file, "utf8");
        if (!html.includes('rel="stylesheet"')) continue;
        writeFileSync(file, await beasties.process(html));
      }
      logger.info(`inlined critical CSS in ${pages.length} pages`);
    },
  },
});

// Custom domain on GitHub Pages: https://bit-perfect.com/
export default defineConfig({
  site: "https://bit-perfect.com",
  base: "/",
  trailingSlash: "ignore",
  build: { format: "directory" },
  devToolbar: { enabled: false },
  /* Hover/focus prefetch for every internal link, for the browsers that ignore
     the speculation rules in BaseLayout (Safari, Firefox). Chromium prerenders. */
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  markdown: { shikiConfig: { theme: "css-variables" } },
  integrations: [
    responsiveImages(),
    criticalCss(),
    /* Components are React and render to static HTML at build time. Nothing
       hydrates: no component carries a `client:*` directive, so no React ships
       to the browser. The same components are what Claude Design builds with. */
    react(),
    sitemap({
      /* /404 is not a page, and /policy is a noindex meta-refresh alias of
         /privacy kept for store listings that already point at it. Listing a
         noindex URL in the sitemap asks a crawler to index a page that tells it
         not to. The two real legal routes, /privacy and /terms, stay in. */
      filter: (page) => !page.includes("/404") && !page.includes("/policy"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
