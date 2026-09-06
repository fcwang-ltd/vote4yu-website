// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// Vote4Yu campaign site.
// Bilingual: en (default, root) + zh-HK 繁體 (/zh-HK/). zh-CN redirects to zh-HK.
// Deploy target: GitHub Pages via the .github/workflows/deploy.yml Action.
// Custom apex domain vote4yu.ca, so `base` stays "/" (no project subpath).
export default defineConfig({
  site: 'https://vote4yu.ca',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN', 'zh-HK'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      // Unlisted pages must not appear in the sitemap that search engines read.
      filter: (page) => !/\/(private|preview)-/.test(page),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-CA',
          'zh-HK': 'zh-Hant-CA',
          'zh-CN': 'zh-CN',
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
