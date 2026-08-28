"use client";

import type { JSX } from "react";
import { motion, useReducedMotion } from "motion/react";
import { StatCounter } from "./StatCounter";
import { MagneticButton } from "./MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: "3+", label: "Years experience" },
  { value: "25+", label: "Projects built" },
  { value: "15+", label: "Happy clients" },
];

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "GraphQL",
  "Docker",
  "Git",
  "Figma",
  "Jest",
];

const reveal = (reduce: boolean, delay: number) =>
  reduce
    ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { type: "tween" as const, duration: 0.75, ease: EASE, delay },
      };

/**
 * About v2 — editorial magazine layout:
 * big statement + inline highlighted bio (no floating cards),
 * borderless stat columns with hairline dividers,
 * skills as a quiet two-column checklist.
 */
export function About(): JSX.Element {
  const reduce = !!useReducedMotion();

  return (
    <section id="about" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8 lg:py-36">
        {/* ── Statement + bio ── */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-5">
              <span className="text-accent">{"//"}</span> About
            </p>
            <h2 className="display-sans text-[clamp(2.4rem,5vw,3.8rem)] text-fg">
              Code that
              <br />
              speaks for{" "}
              <span className="text-gradient">itself.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-fg-muted">
              I&apos;m a frontend developer focused on modern web apps with clean
              architecture and polished interfaces —{" "}
              <mark className="bg-transparent font-medium text-fg underline decoration-accent/50 decoration-2 underline-offset-4">
                performance and accessibility come first
              </mark>
              , every line has a reason to exist.
            </p>
            <div className="mt-8">
              <MagneticButton
                href="#contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-accent-strong hover:shadow-[0_12px_40px_-10px_var(--glow)] active:translate-y-px"
              >
                Let&apos;s work together
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </MagneticButton>
            </div>
          </div>

          {/* bio card with left accent rule */}
          <div className="lg:border-l lg:border-border lg:pl-14">
            <p className="text-lg leading-relaxed text-fg-muted">
              Over the last three years I&apos;ve shipped storefronts, dashboards
              and real-time apps for teams across three countries — always with
              the same obsession: interfaces that feel{" "}
              <span className="font-medium text-fg">obvious</span> from the first
              click.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted">
              Away from the keyboard I explore creative coding and generative
              art, which keeps my eye fresh for the details that make products
              feel crafted rather than assembled.
            </p>

            {/* quick facts */}
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5">
              {[
                { k: "Location", v: "Cairo, Egypt" },
                { k: "Languages", v: "Arabic · English" },
                { k: "Work style", v: "Remote-friendly" },
                { k: "Response", v: "Within 24 hours" },
              ].map((f) => (
                <div key={f.k}>
                  <dt className="font-mono text-micro uppercase tracking-[0.22em] text-fg-dim">
                    {f.k}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-fg">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── Stats — borderless columns with hairlines ── */}
        <motion.dl
          {...reveal(reduce, 0.05)}
          className="mt-20 grid grid-cols-3 divide-x divide-border border-y border-border"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="px-2 py-9 text-center sm:px-6">
              <StatCounter value={stat.value} label={stat.label} />
            </div>
          ))}
        </motion.dl>

        {/* ── Skills — quiet two-column checklist ── */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-20">
          <div>
            <p className="eyebrow whitespace-nowrap">
              <span className="text-accent">{"//"}</span> Core skills
            </p>
            <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-fg-dim">
              The tools I reach for daily — battle-tested in production, not just
              tutorials.
            </p>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2" aria-label="Core skills">
            {skills.map((skill, i) => (
              <li
                key={skill}
                className="flex items-center border-b border-border py-3.5 transition-colors duration-200 hover:border-accent/40"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-micro tabular-nums tracking-[0.1em] text-fg-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-fg-muted transition-colors duration-200 hover:text-fg">
                    {skill}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
