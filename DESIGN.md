# LE CAMP — Style Reference

> Source: [Refero Styles](https://styles.refero.design/style/45267374-ee40-43d9-8bfe-8d6566ce852d)  
> Alpine summit base camp at dusk — a field command post where one red signal flare cuts through mountain twilight, and everything else is topo-line restraint.

**Theme:** light

LE CAMP reads as an alpine expedition outpost translated into a digital surface: a near-monochrome canvas pierced by a single flare-red accent, where the brand speaks through dramatic photographic scale and badge-style illustration rather than through decoration. Agrandir carries hierarchy; DM Sans handles utility; DM Mono handles wayfinding tags.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Signal Red | `#fe3a3a` | `--color-signal-red` | Primary CTA, logo, emphasis |
| Carbon Ink | `#000000` | `--color-carbon-ink` | Text, borders, structure |
| Summit White | `#ffffff` | `--color-summit-white` | Page canvas, card surface |
| Ridge Gray | `#767676` | `--color-ridge-gray` | Input borders only |

### Extended surfaces (layout fidelity to live Le Camp)

| Name | Value | Token | Role |
|------|-------|-------|------|
| Glacier Mist | `#f5f5f5` | `--surface-glacier-mist` | Supporting section band |
| Trail Cream | `#f5f0e8` / `#F7F1E8` | `--surface-trail-cream` | Feature cards |
| Sky | `#A3CBFD` | `--color-sky` | Program cards / journal band |
| Blue | `#60A3F4` | `--color-blue` | Program accents |
| Burgundy | `#561515` | `--color-burgundy` | Event card footers |
| Base Camp Dark | `#0a1628` | `--surface-base-camp-dark` | Hero / footer photo field |

## Tokens — Typography

| Role | Family | Token | Notes |
|------|--------|-------|-------|
| Display | Agrandir (self-hosted `public/fonts/Agrandir-Variable.woff2`) | `--font-agrandir` | Weights 350 / 600; display 90px / lh 1.0 |
| Body | DM Sans | `--font-dm-sans` | 12–18px |
| Mono | DM Mono | `--font-dm-mono` | 10px uppercase, tracking 0.04em |

Fallback if Agrandir missing: Bricolage Grotesque 800.

## Spacing & shape

- Base unit 4px · page max 1200px · section gap 60px · card padding 40px
- Radii: nav 10px · cards 20px · buttons 35px (pill)

## Imagery

Hero: full-bleed dusk mountain photograph. Program patches float as shield stickers. Body photography uses large radii (~20–32px). Assets cropped from `docs/plans/references/lecampquebec/` into `public/images/lecamp/`.

## Do / Don't

- Use `#fe3a3a` only for CTAs, logo, and emphasis text
- No drop shadows on cards; elevation only on red CTA and hero stickers
- No colours outside the token table for chrome; sky/cream/burgundy only for Le Camp module fills matching the screenshots
- Agrandir is display-only; body stays DM Sans
