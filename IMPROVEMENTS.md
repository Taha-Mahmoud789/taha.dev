# taha.dev — Pending Improvements & Ideas

> Working notes for future sessions. Pick from here when ready. ✅ = fixed in the 2026-10-02 session.

## 🔴 Priority 1 — Real gaps (functionality / SEO)

### 1. Projects links removed, need real URLs
- Location: `src/components/site/Projects.tsx` — dead `href="#"` case-study links were removed.
- Fix: when real case-study/demo URLs exist, add them back as clearly-labeled links.
- Why: a visitor clicking "View project" got nothing — kills credibility.

### 2. ✅ No JSON-LD structured data
- Fixed: Person schema added in `src/app/layout.tsx` (name, jobTitle, url, email, address, knowsAbout).

### 3. ✅ No OG image
- Fixed: `public/og-image.png` generated (1200×630, brand-matched). Metadata in `layout.tsx` now resolves.

## 🟡 Priority 2 — Experience upgrades

### 4. Contact form uses `mailto:` only
- Location: `src/components/site/Contact.tsx` `onSubmit` does `window.location.href = mailto:...`.
- Issue: breaks on mobile / no mail client; no server delivery.
- Fix options: wire to Formspree / Resend / a route handler. (Needs a key/account — ask user.)

### 5. Testimonials / Client logos section
- New section: short quotes from clients/colleagues + maybe client brand marks.
- Boosts freelance credibility.

### 6. Blog / Articles link
- If Taha writes content (e.g. ThinkMode), add a link or section bridging to it.

## 🟢 Priority 3 — Polish / verify

### 7. ✅ Theme persistence
- Verified: `THEME_INIT_SCRIPT` in `layout.tsx` reads localStorage before paint; `theme-store.ts` writes on toggle.

### 8. ✅ `prefers-reduced-motion`
- Fixed gaps: `globals.css` now disables `.animate-ping/.animate-bounce/.animate-pulse`; the LED ticker renders a single static frame under reduced motion. Hero/terminal/cursor already honored it.

### 9. Projects data is inline
- `Projects.tsx` data is hardcoded in JSX (unused `Project` type was removed).
- Optional: move to a `content/projects.ts` data file for easier editing.

## Current site status (as of 2026-10-02 session)
- Stack: Next.js 16.2 + React 19 + TS + Tailwind v4 + motion.
- Sections: Hero (live terminal), LEDTicker, Projects, About (Core Skills), Stack (grid), Experience, Contact, Footer.
- `SITE_URL` = https://taha-dev-eight.vercel.app (update here if a custom domain is added).
- Gates: `npm run lint` 0/0, `npx tsc --noEmit` clean, `npm run build` static prerender.
- Still missing: any test suite (`npm test` doesn't exist yet).
- Local preview: `npm run dev` (3001) / `npm run build && npx next start -p 3002`.
