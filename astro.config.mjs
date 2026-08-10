// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// Vote4Yu campaign site.
// Trilingual: en (default, served at root), zh-Hans (/zh-hans/), zh-Hant (/zh-hant/).
// Deploy target: GitHub Pages via the .github/workflows/deploy.yml Action.
// Custom apex domain vote4yu.ca, so `base` stays "/" (no project subpath).
export default defineConfig({
  site: 'https://vote4yu.ca',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans', 'zh-Hant'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          'zh-Hans': 'zh-Hans',
          'zh-Hant': 'zh-Hant',
        },
      },
    }),
    mdx(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  output: 'static',
});
