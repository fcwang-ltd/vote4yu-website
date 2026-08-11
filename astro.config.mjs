// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// Vote4Yu campaign site.
// Trilingual: en (default, served at root), zh-CN (/zh-CN/), zh-HK (/zh-HK/).
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
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          'zh-CN': 'zh-CN',
          'zh-HK': 'zh-HK',
        },
      },
    }),
    mdx(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  redirects: {
    '/about': '/',
    '/platform': '/community',
    '/partners': '/community',
    '/zh-CN/about': '/zh-CN/',
    '/zh-CN/platform': '/zh-CN/community',
    '/zh-HK/about': '/zh-HK/',
    '/zh-HK/platform': '/zh-HK/community',
  },

  output: 'static',
});
