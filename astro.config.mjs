import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Custom domain on GitHub Pages: https://bit-perfect.com/
export default defineConfig({
  site: 'https://bit-perfect.com',
  base: '/',
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
