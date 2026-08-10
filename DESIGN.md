# Vote4Yu Design System

The visual language reconciles the **LE CAMP** reference aesthetic (near-monochrome canvas, poster-scale display type, badge illustrations, alternating section rhythm) with campaign requirements: credibility, premium presentation, a strong single CTA, a scannable platform, and trust signals. The reference is the skin; the campaign information structure is stronger and more conversion-oriented than a lifestyle site.

Tokens live in `src/styles/globals.css` under Tailwind v4 `@theme`. Change a token once to re-skin.

## Colour

| Token | Hex | Use |
|-------|-----|-----|
| `--color-ink` | `#000000` | Primary text, hairline borders |
| `--color-paper` | `#ffffff` | Primary background |
| `--color-cream` | `#f5f0e8` | Feature card surface (not a full-page background) |
| `--color-lightgray` | `#f5f5f5` | Supporting section background |
| `--color-deephero` | `#0a0a0a` | Full-bleed hero + footer |
| `--color-accent` | `#006d77` | **Deep teal.** CTAs, identity, emphasis. Scarce by design. |
| `--color-accent-light` | `#83c5be` | Accent on the dark hero |
| `--color-accent-dark` | `#00424a` | Accent hover/pressed |
| `--color-muted` | `#666666` | The word "for" in the lockup, meta text |

**Accent decision:** deep teal `#006d77` is the recommended accent (municipal-neutral, health-evoking, credible, distinct from federal party colours). It is a single token; swap it to re-skin. Alternatives on the table: deep green `#2d6a4f`, rich navy `#1d3557`, burgundy `#6a040f`.

**"Vote / for / Yu" lockup:** `Vote` in ink (heaviest weight), `for` in muted gray (regular), `Yu` in the accent (bold) to trigger the "You" reading. Implemented in `src/components/ui/Hero.astro`.

Rules: the accent never sits on the accent; no red-on-red / white-on-white; cream is a card surface only; no gradients (flat colour + photography).

## Typography

| Role | Font | Substitute | Use |
|------|------|------------|-----|
| Display | Bricolage Grotesque | system-ui | Poster-scale headlines (48-90px, line-height ~1.0) |
| Body | Inter | system-ui | Body, UI, nav (16-20px, line-height 1.6-1.7) |
| Mono | JetBrains Mono | ui-monospace | Uppercase section labels, meta |
| CJK Hans | Noto Sans SC | PingFang SC / Microsoft YaHei | Simplified Chinese |
| CJK Hant | Noto Sans TC | PingFang TC / Microsoft JhengHei | Traditional Chinese |

`html[lang="zh-CN"]` and `html[lang="zh-HK"]` switch the base family automatically (see `globals.css`). Chinese display headings should render ~20% heavier than the Latin display equivalent to compensate for glyph density (the Latin display face has no CJK glyphs). **Self-host the WOFF2 files** in `public/fonts/` for performance, privacy, and AEO; add `@font-face` in `globals.css`. Placeholder font-faces are not yet wired: the build currently falls back to system fonts until the WOFF2 files are dropped in.

## Spacing, layout, radius

- Base unit 4px. Section gap 60px. Content max-width 1200px (`.container-1200`).
- Alternating surface cadence: dark hero → white → light gray → cream card.
- Asymmetric two-column sections (dense paragraph vs oversized display heading) where useful.
- Radius: `--radius-sm 4px`, `--radius-md 10px` (secondary buttons), `--radius-lg 20px` (cards), `--radius-xl 35px` (primary CTA pill).
- Flat components, 1px ink hairline borders, no drop shadows except the accent CTA and the anchor-pillar ring.

## Components

| Component | File | Notes |
|-----------|------|-------|
| Nav | `components/ui/Nav.astro` | Fixed-feel top bar, logo left, nav, language switcher right |
| Hero | `components/ui/Hero.astro` | Full-bleed dark, stacked Vote/for/Yu lockup, pill CTA |
| HealthPillarBadge | `components/ui/HealthPillarBadge.astro` | One per HEALTH letter; anchor pillars (A, L) get an accent ring + star |
| LanguagePicker | `components/ui/LanguagePicker.astro` | en / 简体 / 繁體 switch |
| Footer | `components/ui/Footer.astro` | Dark, boilerplate + copyright |
| BaseLayout | `layouts/BaseLayout.astro` | hreflang alternates + JSON-LD Person schema |

## Imagery

- **Primary:** tailored-suit professional headshots (dark suit, light suit, suit + white shirt), high production value. Reserve fitness/health imagery for teaching/activity contexts, never the main visual.
- **Badge/patch motif:** the six HEALTH letters render as circular badge icons (the reference's shield-patch idea adapted to a circle). Icon set lives in `public/images/badges/`.
- **All images are placeholders** until the real shoot. Headshot slots use a neutral dashed placeholder box; do NOT substitute an AI-fabricated face for the candidate. Generated stand-ins are for layout review only and must be swapped for real assets.

## AEO / SEO

- JSON-LD `Person` schema on every page (in `BaseLayout`). Add `Event` schema for the election on the home/about pages when copy is final.
- One unambiguous factual sentence near the top of each page ("Dave Yu is a candidate for Markham City Council, Ward 2, in the 2026 municipal election").
- Per-locale crawlable URLs, `hreflang` alternates + `x-default`, canonical URLs, multi-locale `sitemap-index.xml` (via `@astrojs/sitemap`), semantic headings, self-hosted images with alt text.
