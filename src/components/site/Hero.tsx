"use client";

import type { JSX } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MagneticButton } from "./MagneticButton";
import { TerminalBuild } from "./hero/TerminalBuild";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero v4 — the site builds itself: a live terminal session types out
 * scaffolding → config → build → ship, next to editorial display type.
 */
export function Hero(): JSX.Element {
  const reduce = useReducedMotion();

  const reveal = (delay: number) =>
    reduce
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { type: "tween" as const, duration: 0.8, ease: EASE, delay },
        };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section
      id="hero"
      aria-label="Intro"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden"
    >
      {/* ── Background ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute right-[-12%] top-[-18%] h-[62vh] w-[52vw] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
        />
        <div
          className="absolute inset-0 dark:opacity-28 opacity-40"
          style={{
            backgroundImage: "radial-gradient(var(--fg-dim) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage: "radial-gradient(70% 55% at 50% 40%, black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(70% 55% at 50% 40%, black 20%, transparent 100%)",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 content-center gap-14 px-5 pb-24 pt-36 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-16">
        {/* ── Left: display type ─────────────────────── */}
        <div>
          <motion.div {...reveal(0.05)} className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <p className="font-mono text-micro uppercase tracking-[0.22em] text-fg-muted">
              Available for new projects
            </p>
          </motion.div>

          <h1 className="mt-6 font-heading text-[clamp(3rem,7.2vw,5.9rem)] font-bold leading-[1.02] tracking-[-0.025em] text-fg">
            <motion.span {...reveal(0.12)} className="block">
              Building
            </motion.span>
            <motion.span {...reveal(0.2)} className="text-gradient block pb-1">
              digital
            </motion.span>
            <motion.span {...reveal(0.28)} className="block">
              experiences<span className="text-accent text-[0.7em] align-baseline">.</span>
            </motion.span>
          </h1>

          <motion.p
            {...reveal(0.42)}
            className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted"
          >
            I&apos;m Taha Mahmoud — I craft{" "}
            <span className="font-medium text-fg">fast, pixel-perfect</span> web
            interfaces with React, Next.js &amp; TypeScript.
          </motion.p>

          <motion.div {...reveal(0.5)} className="mt-9 flex flex-wrap items-center gap-3.5">
            <MagneticButton
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-4 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-accent-strong hover:shadow-[0_12px_40px_-10px_var(--glow)] active:translate-y-px"
            >
              View my work
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-bg-card/60 px-7 py-4 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-fg backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:text-accent hover:bg-accent-soft active:translate-y-px"
            >
              Get in touch
            </MagneticButton>
          </motion.div>

          {/* facts strip */}
          <motion.dl
            {...reveal(0.58)}
            className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-border pt-6"
          >
            {[
              { k: "Experience", v: "3+ years" },
              { k: "Based in", v: "Cairo, EG" },
              { k: "Focus", v: "React · Next.js" },
            ].map((cell) => (
              <div key={cell.k} className="flex items-baseline gap-2.5">
                <dt className="font-mono text-micro uppercase tracking-[0.22em] text-fg-muted">
                  {cell.k}
                </dt>
                <dd className="font-mono text-sm font-medium text-fg">{cell.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ── Right: live terminal that builds the site ── */}
        <motion.div
          {...reveal(0.35)}
          className="relative mx-auto w-full max-w-md select-none lg:justify-self-end"
          aria-hidden="true"
        >
          <TerminalBuild />
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.button
        type="button"
        onClick={() => scrollTo("projects")}
        aria-label="Scroll to projects"
        {...reveal(0.9)}
        className="group absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 md:flex"
      >
        <span className="font-mono text-micro uppercase tracking-[0.22em] text-fg-muted transition-colors group-hover:text-accent">
          scroll
        </span>
        <span className="relative h-7 w-5 rounded-full border border-border-strong">
          <span
            className={`absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full bg-accent ${
              reduce ? "" : "animate-bounce"
            }`}
          />
        </span>
      </motion.button>
    </section>
  );
}
