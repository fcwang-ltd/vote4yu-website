// Locale utilities for the trilingual Vote4Yu site.
// en is the default locale served at the root; zh-Hans and zh-Hant are prefixed.

export const LOCALES = ['en', 'zh-Hans', 'zh-Hant'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

// Path prefix per locale. en has no prefix (prefixDefaultLocale: false).
export const LOCALE_PREFIX: Record<Locale, string> = {
  en: '',
  'zh-Hans': '/zh-Hans',
  'zh-Hant': '/zh-Hant',
};

// Human label for the language switcher.
export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
};

// hreflang value per locale for <link rel="alternate">.
export const LOCALE_HREFLANG: Record<Locale, string> = {
  en: 'en-CA',
  'zh-Hans': 'zh-Hans',
  'zh-Hant': 'zh-Hant',
};

export const SITE_URL = 'https://vote4yu.ca';

// Build a locale-prefixed path from a root-relative path (e.g. "/platform").
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const prefix = LOCALE_PREFIX[locale];
  if (clean === '/') return prefix === '' ? '/' : `${prefix}/`;
  return `${prefix}${clean}`;
}
