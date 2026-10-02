# Design: Logo — Badge → Typing Wordmark (Direction D)

- **Date:** 2026-10-02
- **Status:** Approved — user picked direction D in the visual companion and approved this design ("لا ابدا").

## Problem

The site mark was a `</>` badge (`LogoMark.tsx` in Nav + Footer, `icon.png`). User: "logo بتاع الموقع مش احسن حاجه" → diagnosed in clarifying questions as **generic/repetitive** (`</>` is the default developer logo), not a color/typography/theme issue.

## Decision

Adopt **Direction D — badge-free typing wordmark** over A (Pixel-T badge), B (Slash-T badge), C (T+cursor badge). D and C were the shortlist (7 vs 5 clicks, hesitation both ways); the difference is only badge vs no badge — user settled on **no badge** in the terminal.

## Design

### Visual

- Lockup: `Taha` + a block cursor replacing the trailing period — `font-mono · font-semibold · tracking-tight · text-fg` (the current wordmark styles, unchanged).
- Cursor block: `inline-block`, `width 0.44em`, `height 0.72em`, `margin-left 0.06em`, `border-radius 0.08em`, `background var(--accent)`, `vertical-align: baseline` (bottom edge sits exactly where the period sat).
- Blink: opacity `1 → 0.15` at 50%, `steps(1)`, `1.1s` infinite; **disabled under `prefers-reduced-motion: reduce`** (site convention).
- Theme-aware via `--accent`: acid green `#b6f030` (dark) / deep lime `#4d7c0f` (light).
- Accessibility: cursor is decorative (`aria-hidden`); "Taha" remains the link text and brand links keep their existing `aria-label`s.

### Components

- **Delete** `src/components/site/LogoMark.tsx` — sole consumers are Nav and Footer.
- **Add** `src/components/site/Wordmark.tsx`: renders `Taha` + cursor span. No props (both call sites use the same sizing, hardcoded inside).
- **`Nav.tsx`:** swap `<LogoMark …/> + wordmark <span>` for `<Wordmark />`; drop the now-unused `gap-2.5`, `group`, and `group-hover:rotate-6` (there is no badge left to rotate; the blink is the motion).
- **`Footer.tsx`:** same replacement (identical current sizing).
- **`globals.css`:** `.wordmark-cursor` rule + `@keyframes wordmark-blink`; add the animation-off rule to the existing reduced-motion block.

### Favicon

- **Replace** `src/app/icon.png` (old badge) with **`src/app/icon.svg`**: 64×64 rounded square (`#0a0c16`, rx 14), white T (crossbar + stem, left-of-center), acid `#b6f030` cursor block to its right — proportions of the companion's favicon chip. Static (SVG cannot blink; fine).

### Out of scope

- `public/logo-64.png` (README-only) — regenerate only if requested.
- `public/og-image.png` — inspected during implementation; if it shows the old badge, re-capture from the live site at 1200×630.

## Verification

1. Gates: `lint`, `tsc`, `build` all 0.
2. Browser: Nav + Footer lockups in dark and light; tab loads the SVG favicon; cursor visible and blinking; static under emulated reduced-motion.
3. Impeccable detector run (baseline: 0 findings).
4. Commit + push to `origin/main` (Vercel deploy).
