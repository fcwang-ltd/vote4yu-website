# Vote4Yu Website — Agent Context

> Read on every session to bootstrap context. Keep concise and current. If a fact here is stale, fix it in the same change that proves it stale.

## What this project is

Campaign website for **Haohui Yu (余浩輝)**, candidate for **Markham City Council, Ward 2**, in the **2026 municipal election**. It presents his health-first HEALTH platform, serves English and Traditional Chinese (繁體) audiences, and must ship before the **August 21, 2026 candidate registration deadline**. It doubles as a weekly work-log and health-policy explainer via the Blog.

This is a **SENSITIVE live municipal campaign**. Public-facing copy becomes public on ship. Internal positioning rationale lives in `docs/plans/` (gitignored) and must never surface in the shipped site.

## Tech stack (locked)

| Concern | Choice |
|---------|--------|
| Framework | Astro 5 (static output) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`; tokens in `src/styles/globals.css` (`@theme`). Display: Poppins; body: Inter; 繁體: Noto Sans TC |
| i18n | Astro built-in i18n; `en` at root, `zh-HK` `/zh-HK/` (繁體). UI toggle is **EN \| 繁體**. `zh-CN` routes redirect to `zh-HK` until Mandarin lock |
| Content | `src/utils/content.ts` + Astro content collections (`src/content/blog/`) |
| Package manager | **pnpm** (npm is broken on the authoring machine) |
| Deploy | GitHub Pages, `.github/workflows/deploy.yml`, apex `vote4yu.ca` (no `base`) |
| Forms | Custom Astro forms → Google Apps Script → Google Sheets (`PUBLIC_FORMS_ENDPOINT`) |
| Donate | Interac e-Transfer to `donate@vote4yu.ca` (no card processor) |

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
- Public candidate name is **Haohui Yu / 余浩輝** only (never “Dave” on the site).
- Public email `hello@vote4yu.ca`; donate EMT `donate@vote4yu.ca`.
- Campaign office: `1550 16th Ave, Unit A11, Richmond Hill, ON L4B 3K9`.

### Content rules
- **繁體 Chinese is DRAFT** until a native **Cantonese** speaker locks it. Ship the EN/繁體 toggle so reviewers can compare. Simplified (`zh-CN`) stays out of the toggle.
- **Markham place name:** entity = 萬錦市; place = 萬錦. NEVER phonetic 馬克姆. (Simplified 万锦 deferred with zh-CN.)
- **HEALTH “A” = Advocacy** (發聲倡議), not Accessibility.
- **"Vote for Yu, Vote for You" pun** does not carry phonetically into Chinese. The Chinese hero tagline is a transcreation slot.
- **No unverified health claims.** Respect every `NEEDS-VERIFICATION` flag; publish no unverified program detail.
- **No AI-fabricated likeness of the candidate.** Use real shoot assets in `public/images/candidate/`.

## Content provenance

Final English copy originates from the vault at `04_Execute/_Studio/horizon-studio/Vote4Yu/` and the `design-build` handoff. Principal/COS pastes finalised blocks into `src/content/` and `src/utils/content.ts`. Do not invent campaign facts here; if copy is missing, leave a clearly-marked placeholder.

## Reading order for a new contributor

1. This file (`AGENTS.md`)
2. `README.md` (setup + scripts)
3. `DESIGN.md` (design system + tokens)
4. `docs/plans/` (the full build handover, gitignored, sensitive)
5. `src/styles/globals.css` and `src/utils/content.ts`
