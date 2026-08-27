# Taha Mahmoud — Frontend Developer Portfolio

> `taha.dev` · Built with Next.js 16, React 19, TypeScript & Tailwind CSS v4.

A premium, fast, fully responsive personal portfolio with a **live terminal hero** — the page types out its own build session on load.

![logo](public/logo-64.png)

## ✨ Features

- **Live terminal hero** — a `taha@dev — zsh` window that types a real build sequence (install → config → `npm run build` → shipped) with syntax highlighting. Theme-isolated: always dark on any page background.
- **Light / dark mode** — class-based toggle in the nav, persisted to `localStorage`, respects system preference by default.
- **Editorial section system** — Hero, Projects, About, Stack, Experience, Contact & Footer share one visual language (mono micro-labels, thin accent rules, numbered/ledger layouts).
- **Custom cursor** + **magnetic buttons** — subtle, desktop-only, disabled on touch & `prefers-reduced-motion`.
- **Unified type scale** — `text-micro` / `text-tiny` + a 3-step tracking scale keep every label consistent.
- **Performance-budgeted** — no heavy 3D libs, `next/image` logo, static prerendering, ~242 KB gzipped JS.
- **Accessible** — semantic HTML, labeled form fields, visible focus rings, keyboard-navigable nav, reduced-motion fallbacks.

## 🧱 Sections

Hero · Projects · About · Stack · Experience · Contact · Footer

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

### Scripts

| Script           | Purpose                          |
| ---------------- | -------------------------------- |
| `npm run dev`    | Start the dev server (Turbopack) |
| `npm run build`  | Production build                 |
| `npm run start`  | Serve the production build       |
| `npm run lint`   | Run ESLint                       |

## 🛠 Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Motion (motion/react) · Space Grotesk · JetBrains Mono

## 🌐 Deploy (Vercel)

Zero-config — Vercel auto-detects Next.js:

1. Push this repo to GitHub (already done: `Taha-Mahmoud789/taha.dev`).
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** `Taha-Mahmoud789/taha.dev`.
3. Framework preset: **Next.js** (auto). Build command & output dir are pre-filled.
4. Click **Deploy**. Your site goes live on `*.vercel.app`, and every future push to `main` redeploys automatically.

> Optional: in project settings set **Production Branch** = `main`, and add a custom domain (`taha.dev`) under **Domains**.

## 📁 Project map

```
src/
  app/            layout, page, globals.css, icon, robots, sitemap
  components/site/ Hero, About, Experience, Contact, Footer, Nav, ThemeToggle…
    hero/         TerminalBuild (the live terminal)
  lib/            site config + theme store
public/           logo-64.png, logos/, icon.png
```

© Taha Mahmoud — Frontend Developer
