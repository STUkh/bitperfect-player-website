import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// GitHub project pages: https://stukh.github.io/bitperfect-player-website/
export default defineConfig({
  site: 'https://stukh.github.io',
  base: '/bitperfect-player-website',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  markdown: { shikiConfig: { theme: 'css-variables' } },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
