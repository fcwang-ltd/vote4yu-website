/** Locale helpers for EN (default) + Traditional Chinese (zh-HK / 繁體). */

export type Locale = 'en' | 'zh-HK';

export const LOCALES: Locale[] = ['en', 'zh-HK'];

export const LOCALE_PREFIX: Record<Locale, string> = {
  en: '',
  'zh-HK': '/zh-HK',
};

/** html lang attribute */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: 'en',
  'zh-HK': 'zh-Hant',
};

export const LOCALE_HREFLANG: Record<Locale, string> = {
  en: 'en-CA',
  'zh-HK': 'zh-Hant-CA',
};

export function isLocale(value: string): value is Locale {
  return value === 'en' || value === 'zh-HK';
}

export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const prefix = LOCALE_PREFIX[locale];
  if (clean === '/') return prefix === '' ? '/' : `${prefix}/`;
  return `${prefix}${clean}`;
}

/** Map a path from one locale to another (strip current prefix, add target). */
export function switchLocalePath(currentPath: string, target: Locale): string {
  let bare = currentPath;
  if (bare.startsWith('/zh-HK')) {
    bare = bare.slice('/zh-HK'.length) || '/';
  } else if (bare.startsWith('/zh-CN')) {
    bare = bare.slice('/zh-CN'.length) || '/';
  }
  return localizePath(bare, target);
}

export function localeFromUrl(pathname: string): Locale {
  if (pathname === '/zh-HK' || pathname.startsWith('/zh-HK/')) return 'zh-HK';
  return 'en';
}
