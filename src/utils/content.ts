// Placeholder page content, keyed by locale. English is final-draft; Chinese is
// DRAFT and must be locked by native Mandarin AND Cantonese speakers before print.
// The Principal/COS pastes finalised copy from the vault brand/ and artifacts/ files.
// Markham = 万锦市 / 萬錦市 (city/council entity), 万锦 / 萬錦 (colloquial place); never a transliteration.
import type { Locale } from './i18n';

export const NAV: Record<Locale, { platform: string; about: string; blog: string; contact: string }> = {
  en: { platform: 'Platform', about: 'About', blog: 'Updates', contact: 'Get involved' },
  'zh-Hans': { platform: '政纲', about: '关于', blog: '动态', contact: '参与' },
  'zh-Hant': { platform: '政綱', about: '關於', blog: '動態', contact: '參與' },
};

export interface Pillar {
  letter: string;
  pillar: string;
  message: string;
  anchor: boolean;
}

// EN pillar set (final draft). Chinese pillar headings live in the vault messaging
// hierarchy as DRAFT; wire them in when locked.
export const HEALTH_PILLARS: Pillar[] = [
  { letter: 'H', pillar: 'Housing', message: 'Responsible development that preserves neighbourhood character while growing housing options for families.', anchor: false },
  { letter: 'E', pillar: 'Education', message: 'Lifelong learning opportunities and health literacy for all community members.', anchor: false },
  { letter: 'A', pillar: 'Accessibility', message: 'Barrier-free access to healthcare and shorter family-doctor waits for every resident.', anchor: true },
  { letter: 'L', pillar: 'Living quality', message: 'Safe, clean, and vibrant neighbourhoods where families can thrive.', anchor: true },
  { letter: 'T', pillar: 'Technology', message: "Modern digital services that make Markham's government efficient and responsive.", anchor: false },
  { letter: 'H', pillar: 'Hospitality', message: 'Service-focused leadership that listens closely and acts on constituent concerns.', anchor: false },
];

export const PAGE_TITLES: Record<Locale, { home: string; platform: string; about: string; blog: string; contact: string }> = {
  en: {
    home: 'Vote4Yu — Dave Yu for Markham Ward 2',
    platform: 'Platform — Creating a HEALTH-y Markham',
    about: 'About Dave Yu',
    blog: 'Updates',
    contact: 'Get Involved',
  },
  'zh-Hans': {
    home: 'Vote4Yu — Dave Yu 竞选万锦市 2 区议员 [DRAFT]',
    platform: '政纲 — 创建健康万锦 [DRAFT]',
    about: '关于 Dave Yu [DRAFT]',
    blog: '动态 [DRAFT]',
    contact: '参与 [DRAFT]',
  },
  'zh-Hant': {
    home: 'Vote4Yu — Dave Yu 競選萬錦市 2 區議員 [DRAFT]',
    platform: '政綱 — 創建健康萬錦 [DRAFT]',
    about: '關於 Dave Yu [DRAFT]',
    blog: '動態 [DRAFT]',
    contact: '參與 [DRAFT]',
  },
};
