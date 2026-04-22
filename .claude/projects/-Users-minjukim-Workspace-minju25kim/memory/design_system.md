---
name: Design System
description: V2 Brutalist design tokens, colors, typography, layout rules, and component patterns
type: project
---

## V2 Brutalist Design System (as of 2026-04-22)

**Font**: JetBrains Mono (all weights 400–900) — set in `index.html` + `src/index.css`

**Colors**:
- `#f4f1ea` — cream background (body bg, page bg)
- `#0a0a0a` — ink (text, borders)
- `#ff3b00` — hot red (accent, CTA badge, highlights, pinned rows)
- `#e8e2d1` — soft (alternating rows, code bg)

**Borders**: Always `3px solid #0a0a0a` for major sections; `1px solid` or `1px dashed` for rows

**No**: dark mode, border-radius, shadows, centered max-width container

**Nav** (`__root.tsx`): `[mk]` → home · location text (desktop) · nav links (active=inverted) · `● AVAILABLE` mailto badge in hot red

**Footer** (`__root.tsx`): Black bar · `[mk]` · © 2026 MINJU KIM · email · social links

**Why**: Full V2 brutalist redesign shipped 2026-04-22. Replaced old DM Sans / Supabase green / dark-mode design.

**How to apply**: New UI components should use inline styles with these tokens. Tailwind utilities still work but the CSS vars are now mapped to the brutalist palette.
