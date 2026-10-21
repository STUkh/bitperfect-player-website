import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// Custom domain on GitHub Pages: https://bit-perfect.com/
export default defineConfig({
  site: "https://bit-perfect.com",
  base: "/",
  trailingSlash: "ignore",
  build: { format: "directory" },
  devToolbar: { enabled: false },
  markdown: { shikiConfig: { theme: "css-variables" } },
  integrations: [
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
