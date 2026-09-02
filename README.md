# Vote4Yu Website

Campaign website for **Haohui Yu (余浩輝)**, candidate for **Markham City Council, Ward 2**, in the 2026 municipal election. Bilingual static site: Canadian English (default) and Traditional Chinese 繁體 (`zh-HK`). Simplified Chinese (`zh-CN`) redirects to 繁體 until a Mandarin lock.

A Horizon Studio advisory build. The campaign and its IP belong to Haohui Yu.

## Stack

- **Astro 5** (static output)
- **Tailwind CSS v4** (via `@tailwindcss/vite`, tokens in `src/styles/globals.css`)
- **Astro content collections** for the Blog (`src/content/blog/{locale}/`)
- **Astro built-in i18n**: `en` at root, `zh-HK` at `/zh-HK/` (EN | 繁體 toggle)
- **Forms:** custom UI → Google Apps Script → Sheets (see `docs/forms-setup.md`)
- **Donate:** Interac e-Transfer to `donate@vote4yu.ca`
- **Deploy:** GitHub Pages via `.github/workflows/deploy.yml`, custom apex domain `vote4yu.ca`

## Develop

```bash
pnpm install
cp .env.example .env   # set PUBLIC_FORMS_ENDPOINT when ready
pnpm build             # production build; the ONLY verification (see AGENTS.md)
pnpm check             # astro + typescript checks
```

Do NOT rely on `pnpm dev` for agent verification: a dev server runs indefinitely. A clean `pnpm build` (exit 0) is the verification.

## Structure

```
src/
  components/campaign/  Nav, Footer, HomePage, forms, PageShell
  components/ui/        Wordmark
  layouts/              BaseLayout (hreflang + JSON-LD Person schema)
  content/blog/en/      English posts
  pages/                en at root; zh-HK/ mirrors; zh-CN/ redirects
  styles/               globals.css (pink/blue @theme tokens)
  utils/                i18n.ts, content.ts, forms.ts, healthDots.ts
public/
  CNAME                 vote4yu.ca
  images/candidate/     yu-photo-*, yu-brush-bw.svg, yu-first-name.svg
docs/
  forms-setup.md        Google Sheets form wiring
```

## Documentation

- `AGENTS.md` — working agreements for AI coding agents (read first)
- `DESIGN.md` — pink/blue design system
- `docs/forms-setup.md` — Apps Script + Sheets
- `docs/plans/` — internal build handover (**gitignored**, sensitive)

## Status

Full campaign IA building. English near-final from vault / design-build; **繁體 is DRAFT pending Cantonese native lock**. Real candidate shoot assets are wired. Set `PUBLIC_FORMS_ENDPOINT` before relying on form submissions.
