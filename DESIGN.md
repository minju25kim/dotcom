## V2 Brutalist Design System

Brutalist, newspaper-inspired aesthetic. Monospace font everywhere. Thick 3px borders. No border-radius. Fixed light palette — no dark mode.

## Colors

- **Background**: `#f4f1ea` (warm cream)
- **Ink**: `#0a0a0a` (near-black)
- **Hot / Accent**: `#ff3b00` (hot orange-red — used for CTAs, highlights, pinned items)
- **Soft**: `#e8e2d1` (muted cream for alternating rows, code blocks)

## Typography

- **Font**: JetBrains Mono (all weights: 400 / 700 / 800 / 900)
- **Hero text**: 900 weight, uppercase, tight letter-spacing (-0.05em), line-height 0.9–0.95
- **Labels**: 11px, 0.15–0.2em letter-spacing, uppercase
- **Body**: 12–14px, 1.5–1.6 line-height

## Layout

- Full-width (no max-width container)
- 3px solid `#0a0a0a` borders everywhere — between sections, grid columns, rows
- Grid-based layouts: 2-column desktop, single-column mobile
- `1px dashed` for secondary dividers (ledger rows)

## Navigation

- `[mk]` logo → home, font-weight 900
- Location text: `MINJU KIM / SOFTWARE ENGINEER / SEOUL, KR` (desktop only)
- Nav links: active = inverted (ink bg, cream text), inactive = underline
- `● AVAILABLE` badge → `mailto:minju25kim@gmail.com`, hot red background

## Footer

- Black bar (`#0a0a0a` bg, `#f4f1ea` text)
- `[mk]` · © 2026 MINJU KIM · email · ↗ GH · IG · YT · STRAVA

## Page Patterns

### Headers
```
━━ PAGE_LABEL / SUBTITLE ━━━━━━━━━
BIG UPPERCASE TITLE.
Optional sub-description text.
```

### Stats / Data cells
Bordered grid, big number + small label. Accent cell uses `#ff3b00` bg.

### Tables / Ledgers
Grid rows with date | category badge | title | arrow. Pinned rows get `#ff3b00` bg.

## Marquee

Black ticker scrolling `SHIPPING / PROJECT · METRIC / STATUS /` text at 30s speed.

## Rules

- No shadows — depth via color contrast and borders
- No rounded corners
- Uppercase for labels, categories, section headers
- Status badges: inverted (ink/cream)
