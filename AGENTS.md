# Vote4Yu Website — Agent Context

> Read on every session to bootstrap context. Keep concise and current. If a fact here is stale, fix it in the same change that proves it stale.

## What this project is

Campaign website for **Dave Yu**, candidate for **Markham City Council, Ward 2**, in the **2026 municipal election**. It presents his health-first platform, serves three language communities (English, Simplified Chinese, Traditional Chinese), and must ship before the **August 21, 2026 candidate registration deadline**. It doubles as a weekly work-log and health-policy explainer via the Blog.

This is a **SENSITIVE live municipal campaign**. Public-facing copy becomes public on ship. Internal positioning rationale lives in `docs/plans/` (gitignored) and must never surface in the shipped site.

## Tech stack (locked)

| Concern | Choice |
|---------|--------|
| Framework | Astro 5 (static output) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`; tokens in `src/styles/globals.css` (`@theme`) |
| i18n | Astro built-in i18n; `en` at root, `zh-Hans` `/zh-Hans/`, `zh-Hant` `/zh-Hant/`, `prefixDefaultLocale: false` |
| Content | Astro content collections; blog in `src/content/blog/{locale}/` |
| Package manager | **pnpm** (npm is broken on the authoring machine) |
| Deploy | GitHub Pages, `.github/workflows/deploy.yml`, apex `vote4yu.ca` (no `base`) |

## Working agreements

### Build verification (critical)
- **NEVER run `astro dev` / `pnpm dev`** to verify: it starts a server that runs indefinitely and blocks the session.
- **ALWAYS verify with `pnpm build`.** A clean production build (exit 0) is the only valid verification. Run `pnpm check` for types.

### Code
- Canadian English spelling in all copy and comments: honour, labour, colour, favour, behaviour, centre, metre, fibre, recognise, organise, defence, licence (noun), catalogue, travelled, modelling, counsellor.
- No em-dashes; restructure sentences (colon, semicolon, parentheses, or a new sentence).
- No "This is not X; it is Y" negation-then-assertion; state the positive directly.
- Components are `.astro` by default; add a framework island only for genuine interactivity.
- Design tokens live in `src/styles/globals.css`; do not hard-code palette hex values in components when a token exists.

### Content rules
- **Chinese is DRAFT.** All `zh-Hans` and `zh-Hant` copy is provisional until a native **Mandarin AND Cantonese** speaker locks it. A line that scans in Mandarin can read oddly in Cantonese. Chinese blog posts stay `draft: true` (unpublished) until lock.
- **Markham place name:** use the community's established Chinese name. City/council **entity** = 万锦市 / 萬錦市 (e.g. 万锦市议会 = Markham City Council). Colloquial **place** = 万锦 / 萬錦 (e.g. 健康万锦). NEVER a phonetic transliteration (not 马尔克姆 / 馬克姆).
- **"Vote for Yu, Vote for You" pun** does not carry phonetically into Chinese. The Chinese hero tagline is a transcreation slot, not a literal translation. Leave marked until the native reviewer transcreates it.
- **No unverified health claims.** Benefit/subsidy specifics are largely provincial/federal, not municipal. A councillor advocates, informs, and connects residents to services; the site must not imply Dave personally grants provincial/federal benefits. Respect every `NEEDS-VERIFICATION` flag from the source notes; publish no unverified program detail.
- **No AI-fabricated likeness of the candidate.** Headshot slots use neutral placeholders until the real tailored-suit photo shoot. Do not generate a fake face for Dave Yu.

## Content provenance

Final English copy originates from the vault at `04_Execute/_Studio/horizon-studio/Vote4Yu/` (brand/, artifacts/, context/, landscape/). The Principal/COS pastes finalised blocks into `src/content/` and `src/utils/content.ts`. Do not invent campaign facts here; if copy is missing, leave a clearly-marked placeholder.

## Reading order for a new contributor

1. This file (`AGENTS.md`)
2. `README.md` (setup + scripts)
3. `DESIGN.md` (design system + tokens)
4. `docs/plans/` (the full build handover, gitignored, sensitive)
5. `src/styles/globals.css` and `src/utils/content.ts`
