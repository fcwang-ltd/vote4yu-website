// Locale utilities for the trilingual Vote4Yu site.
// en is the default locale served at the root; zh-CN and zh-HK are prefixed.
// zh-CN = Simplified Chinese (Mainland/Mandarin audience).
// zh-HK = Hong Kong Chinese (Traditional, Cantonese audience).

export const LOCALES = ['en', 'zh-CN', 'zh-HK'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

// Path prefix per locale. en has no prefix (prefixDefaultLocale: false).
// The prefix casing MUST match the physical folder names in src/pages/
// (src/pages/zh-CN, src/pages/zh-HK) so URLs resolve on case-sensitive hosts.
export const LOCALE_PREFIX: Record<Locale, string> = {
  en: '',
  'zh-CN': '/zh-CN',
  'zh-HK': '/zh-HK',
};

// Human label for the language switcher.
export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  'zh-CN': '简体中文',
  'zh-HK': '繁體中文',
};

// hreflang value per locale for <link rel="alternate">. zh-CN and zh-HK are
// valid BCP-47 tags, so they double as the hreflang values.
export const LOCALE_HREFLANG: Record<Locale, string> = {
  en: 'en-CA',
  'zh-CN': 'zh-CN',
  'zh-HK': 'zh-HK',
};

export const SITE_URL = 'https://vote4yu.ca';

// Build a locale-prefixed path from a root-relative path (e.g. "/platform").
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const prefix = LOCALE_PREFIX[locale];
  if (clean === '/') return prefix === '' ? '/' : `${prefix}/`;
  return `${prefix}${clean}`;
}
