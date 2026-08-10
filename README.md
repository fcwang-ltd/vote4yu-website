# Vote4Yu Website

Campaign website for **Dave Yu**, candidate for **Markham City Council, Ward 2**, in the 2026 municipal election. Trilingual static site: Canadian English (default), Simplified Chinese (`zh-Hans`), Traditional Chinese (`zh-Hant`).

A Horizon Studio advisory build. The campaign and its IP belong to Dave Yu.

## Stack

- **Astro 5** (static output)
- **Tailwind CSS v4** (via `@tailwindcss/vite`, tokens in `src/styles/globals.css`)
- **Astro content collections** for the Blog (`src/content/blog/{locale}/`)
- **Astro built-in i18n**: `en` at root, `zh-Hans` at `/zh-Hans/`, `zh-Hant` at `/zh-Hant/`
- **Deploy:** GitHub Pages via `.github/workflows/deploy.yml`, custom apex domain `vote4yu.ca`

## Develop

```bash
pnpm install
pnpm build      # production build; the ONLY verification (see AGENTS.md)
pnpm check      # astro + typescript checks
```

Do NOT rely on `pnpm dev` for agent verification: a dev server runs indefinitely. A clean `pnpm build` (exit 0) is the verification.

## Structure

```
src/
  components/ui/   Nav, Hero, HealthPillarBadge, LanguagePicker, Footer
  layouts/         BaseLayout (hreflang + JSON-LD Person schema)
  content/
    config.ts      blog + pages collection schemas
    blog/{locale}/ per-locale posts
  pages/           en at root; zh-hans/ and zh-hant/ mirrors
  styles/          globals.css (Tailwind v4 @theme design tokens)
  utils/           i18n.ts, content.ts
public/
  CNAME            vote4yu.ca (GitHub Pages custom domain)
  images/          candidate/ blog/ badges/ (placeholders until real shoot)
```

## Documentation

- `AGENTS.md` — working agreements for AI coding agents (read first)
- `DESIGN.md` — the design system (palette, type, tokens, components)
- `docs/plans/` — internal build handover from the vault (**gitignored**, sensitive)

## Status

Scaffold complete and building. Copy is placeholder/DRAFT: English is near-final and pasted from the vault; **all Chinese is DRAFT pending native Mandarin AND Cantonese speaker lock**. Candidate headshots are neutral placeholders until the real shoot (no AI-fabricated likeness).
