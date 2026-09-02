# Vote4Yu — Style Reference

> Pink / blue campaign flyer system, ported from the Claude Design handoff (`design-build` on branch `v2`) and the homepage concept.

**Theme:** light

Hot pink accent on blue civic bands and warm taupe stock. Brush-mark “YU” watermarks and bilingual chrome. Agrandir for display; DM Sans for body; Noto Sans TC for Traditional Chinese.

## Tokens — Colours

| Name | Value | Token | Role |
|------|-------|-------|------|
| Pink 500 | `#ec078d` | `--color-pink-500` / `--color-accent` | Primary CTA, active nav, emphasis |
| Blue 600 | `#344c96` | `--color-blue-600` / `--color-brand` | Band backgrounds, platform section |
| Ink 900 | `#222222` | `--color-ink-900` | Body text |
| Paper | `#ffffff` | `--color-paper` | Canvas, cards |
| Taupe 100/200 | `#f3edee` / `#dfd4d5` | `--color-taupe-*` | Hero greige / stock bands |

Full pink/blue/taupe scales live in `src/styles/globals.css` (`@theme`).

## Tokens — Typography

| Role | Family | Notes |
|------|--------|-------|
| Display | Agrandir (self-hosted) | Headlines |
| Body | DM Sans | UI and English body |
| Chinese | Noto Sans TC (system fallbacks) | 繁體 nav and body |
| Mono | DM Mono | Rare labels |

Do **not** ship Inter / Roboto / Arial as the primary stack.

## Shape

- Flyer aesthetic: hard edges on bands; radius reserved for inputs and small controls (`--radius-lg` 8px, `--radius-pill`)
- Content max 1200px
- Pink diagonal slogan ribbon between hero and lower sections

## Imagery

- Candidate shoot assets in `public/images/candidate/yu-photo-*.png`
- Brush mark: `yu-brush-bw.svg` (colourise with CSS filter / mask as needed)
- Name lockup: `yu-first-name.svg`

## Do / Don't

- Use pink for CTAs and active states; blue for large civic bands
- No Le Camp signal-red as primary accent
- No drop-shadow chrome on every card
- Canadian English; no em-dashes in copy
