# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: potential employers (engineering managers, hiring leads) and freelance clients (startups, agencies, product teams) evaluating Taha for hire or collaboration. They visit to assess technical skill, design sensibility, and project quality before reaching out.

## Product Purpose

A personal portfolio that converts visitors into conversations — job offers, freelance inquiries, and collaboration opportunities. Success means the visitor leaves convinced of Taha's capability and contacts him.

## Positioning

A frontend developer who ships fast, accessible, pixel-perfect interfaces with React/Next.js/TypeScript — not a designer who codes, not a full-stack generalist, but a focused specialist with obsessive attention to detail and production-grade craft.

## Operating Context

Visitors typically arrive from a LinkedIn profile, resume link, or referral. They scan the hero, scroll through 2-3 projects, check the stack, and decide within 60 seconds whether to reach out. The contact form (mailto) is the primary conversion path.

## Capabilities and Constraints

- Single-page portfolio with sections: Nav, Hero, LEDTicker, Projects, About, Stack, Experience, Contact, Footer (plus custom cursor, scroll progress, spotlight overlays)
- Light/dark theme toggle with system preference detection and localStorage persistence
- Live terminal hero that types out its own build session (theme-isolated, always dark)
- Animated stat counters, infinite marquee strips, hover micro-interactions
- Contact form validates and opens mailto: (no backend, no data storage)
- Built with Next.js 16, React 19, TypeScript strict, Tailwind CSS v4, motion (motion/react)
- No backend, no database, no API routes — fully static site

## Brand Commitments

- Name: Taha Mahmoud
- Email: taha.mahmoud.abdellah@gmail.com
- Accent color: acid green (#b6f030) — binding
- Dark mode is the default; light mode available via toggle
- Fonts: Space Grotesk (body/headings), JetBrains Mono (labels/code)
- Social links: GitHub, LinkedIn, Twitter/X (placeholder URLs for now)

## Evidence on Hand

- 4 project case studies with images: Lumina Store, Pulse Chat, Orbit Analytics, Forge Board
- 3 work experiences: Freelance (2024-Present), Startup Inc (2023-2024), Agency Studio (2022-2023)
- 12 skills: React, Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Prisma, GraphQL, Docker, Git, Figma, Jest
- 30 logo SVGs in public/logos/

## Product Principles

1. Performance is non-negotiable — every page must feel instant
2. Accessibility is not optional — semantic HTML, keyboard nav, contrast ratios
3. Craft over quantity — fewer, better projects shown with depth
4. Honest representation — no fabricated metrics, no stock testimonials
5. The code itself is the portfolio — clean architecture demonstrates skill

## Accessibility & Inclusion

- WCAG AA contrast ratios (4.5:1 minimum)
- Full keyboard navigation across all interactive elements
- Semantic HTML throughout (landmarks, labels, ARIA where needed)
- prefers-reduced-motion respected — all animations disabled
- Screen reader tested via accessibility snapshots
