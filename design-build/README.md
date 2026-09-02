# Vote 4 Yu — static build of the Claude Design handoff

Five pages built from the Claude Design bundle (`chats/chat1.md` plus the `.dc.html` prototypes),
implemented as plain HTML, CSS and vanilla JS.

**This folder is standalone.** It does not participate in the Astro app: nothing here is imported
by `src/`, and `astro build` ignores it. Open `index.html` directly, or serve the folder:

```
python3 -m http.server 8000     # then open http://localhost:8000/
```

## What is here

| Path | What it is |
|------|-----------|
| `index.html`, `platform.html`, `about.html`, `events-news.html`, `get-involved.html` | the five pages |
| `privacy.html` | privacy policy, English body only; its nav and footer still follow the toggle |
| `css/tokens.css` | design tokens, copied verbatim from the bundle's design system |
| `css/site.css` | all component styles |
| `js/content.js` | every string, in English and Traditional Chinese |
| `js/site.js` | language toggle, nav, WeChat modal, tabs, pagination, contact form |
| `assets/` | artwork, resized and served as WebP with JPEG/PNG fallbacks |
| `tools/` | `optimize-images.py` regenerates `assets/`; `build_preview.py` bundles the site into one reviewable file |

English is written into the HTML, so the pages read correctly with JavaScript off. The toggle swaps
in the Traditional Chinese from `js/content.js` and remembers the choice in `localStorage`.

## Carried over from the design, worth a second look before this goes anywhere public

- **The candidate's name.** These pages say "Haohui Yu 余浩輝" throughout, following the design
  bundle. The Astro app in this repo says "Dave Yu". One of them needs to change.
- **Chinese scope.** The design covers English and Traditional Chinese only. There is no Simplified
  Chinese here, and the Traditional Chinese is the design assistant's draft, never reviewed by a
  native speaker. On the About page the Chinese biography is still the older three-paragraph draft:
  the English was rewritten later and deliberately not machine-translated, so those two paragraphs
  hide in 中文 until real copy arrives.
- **House style not applied.** This build follows the design copy as approved, so it keeps
  em-dashes and US spellings that `AGENTS.md` rules out for the Astro site.
- **Placeholder content.** Events, news articles and article thumbnails are samples from the design.
  "Read Full Article" has nowhere to go yet.
- **Two contact addresses are in play.** The blue band, the footer and the privacy policy use
  dave@vote4yu.ca; the older design CTAs still use hello@vote4yu.ca. Worth settling on one.
- **Every action is a `mailto:`** to hello@vote4yu.ca: donate, volunteer, partnership, media,
  RSVP, calendar subscription, and the Platform page's "Talk to Yu" form. Real destinations and a
  form endpoint are still needed. The swap point for the form is `submitTalkToYu` in `js/site.js`.
- **Unverified specifics.** Voting dates (online Oct 16-26, in person Oct 23-26) and the $50
  donation rebate came from the design draft citing markham.ca. Confirm both against the City
  before publishing.
- **Social handles.** instagram.com/VOTE4YU_ and facebook.com/VOTE4YU_ were assumed in the design
  and never confirmed. The 小紅書 icon points at xiaohongshu.com until a profile URL exists, and the
  phone number 647-000-0000 is a placeholder.
