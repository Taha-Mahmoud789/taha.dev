import type { JSX } from "react";
import { LogoMark } from "./LogoMark";

const nav = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter / X", href: "https://twitter.com" },
];

const EMAIL = "taha.mahmoud.abdellah@gmail.com";

/**
 * Footer v2 — editorial:
 * giant email-first CTA (mailto as the headline), inline nav + social rows,
 * slim meta bar. No duplicate hero, no floating grid.
 */
export function Footer(): JSX.Element {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* ── Giant CTA — the email IS the headline ── */}
      <div className="mx-auto max-w-6xl px-5 pb-4 pt-24 sm:px-8">
        <p className="eyebrow">
          <span className="text-accent">{"//"}</span> Got a project in mind?
        </p>
        <a
          href={`mailto:${EMAIL}?subject=Project%20inquiry`}
          aria-label={`Email ${EMAIL}`}
          className="group mt-6 block"
        >
          <span className="display-sans block break-all text-[clamp(1.7rem,5.2vw,4.2rem)] leading-[1.04] text-fg transition-colors duration-300 group-hover:text-accent sm:text-[clamp(1.9rem,5vw,4rem)]">
            Let&apos;s talk
            <span className="text-accent">.</span>
          </span>
          <span className="mt-3 inline-flex items-center gap-3 font-mono text-xs tracking-[0.06em] text-fg-muted transition-colors duration-300 group-hover:text-accent sm:text-sm">
            <span className="border-b border-border-strong transition-colors duration-300 group-hover:border-accent/60">
              {EMAIL}
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </span>
        </a>
      </div>

      {/* ── Link columns ── */}
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
        <div className="grid gap-12 border-t border-border pt-12 sm:grid-cols-3">
          {/* Menu */}
          <div>
            <p className="font-mono text-tiny uppercase tracking-[0.22em] text-fg-dim">
              Menu
            </p>
            <ul className="mt-5 flex flex-col gap-y-3">
              {nav.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-fg-muted transition-colors duration-200 hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials — plain labels until real profile URLs exist */}
          <div>
            <p className="font-mono text-tiny uppercase tracking-[0.22em] text-fg-dim">
              Socials
            </p>
            <ul className="mt-5 space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-fg-muted transition-colors duration-200 hover:text-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status card — response signal (status + slot live in Contact) */}
          <div>
            <p className="font-mono text-tiny uppercase tracking-[0.22em] text-fg-dim">
              Response
            </p>
            <div className="mt-5 rounded-xl border border-border bg-bg-card px-4 py-3.5">
              <span className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-sm font-medium text-fg">Usually replies within 24 hours</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Meta bar ── */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border py-7 sm:flex-row sm:items-center">
          <a href="#hero" className="inline-flex items-center gap-2" aria-label="Back to top">
            <LogoMark className="h-6 w-6 rounded-[6px] text-[10px]" />
            <span className="font-mono text-base font-semibold tracking-tight text-fg">
              Taha<span className="text-accent">.</span>
            </span>
          </a>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-mono text-tiny tracking-[0.15em] text-fg-dim">
              © {new Date().getFullYear()} Taha Mahmoud
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" aria-hidden="true" />
            <span className="font-mono text-tiny tracking-[0.15em] text-fg-dim">
              Built with Next.js &amp; Tailwind
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" aria-hidden="true" />
            <a
              href="#hero"
              className="font-mono text-tiny tracking-[0.15em] text-fg-dim transition-colors hover:text-accent"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
