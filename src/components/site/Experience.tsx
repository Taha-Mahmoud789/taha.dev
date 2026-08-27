"use client";

import type { JSX } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const experiences = [
  {
    period: "2024 — Present",
    role: "Senior Frontend Engineer",
    company: "Freelance",
    description:
      "Leading design systems and Next.js applications for product teams across three countries. Performance budgets enforced in CI; Core Web Vitals in the green on every shipped project.",
    highlights: ["Design Systems", "Performance", "CI/CD"],
    current: true,
  },
  {
    period: "2023 — 2024",
    role: "Frontend Developer",
    company: "Startup Inc",
    description:
      "Owned the product interface end-to-end with Next.js and TypeScript. Shipped features used by 10K+ daily active users while cutting the main bundle by 45%.",
    highlights: ["TypeScript", "Bundle Optimization", "A11y"],
    current: false,
  },
  {
    period: "2022 — 2023",
    role: "Junior Developer",
    company: "Agency Studio",
    description:
      "Built responsive marketing sites and web applications for clients across fintech, e-commerce, and media. Focused on React and modern CSS.",
    highlights: ["React", "Responsive", "Marketing"],
    current: false,
  },
];

/**
 * Experience v2 — editorial ledger rows (no cards, no broken timeline):
 * period column left, role & details right, hairline dividers between rows.
 */
export function Experience(): JSX.Element {
  const reduce = !!useReducedMotion();

  return (
    <section id="experience" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8 lg:py-36">
        {/* header */}
        <div className="flex flex-col justify-between gap-6 pb-14 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-5">
              <span className="text-accent">{"//"}</span> Experience
            </p>
            <h2 className="display-sans text-[clamp(2.6rem,6vw,4.4rem)] text-fg">
              Where I&apos;ve{" "}
              <span className="text-gradient">worked.</span>
            </h2>
          </div>
          <p className="max-w-[22ch] font-mono text-tiny uppercase leading-relaxed tracking-[0.22em] text-fg-dim sm:text-right">
            3 roles — 2022 → present
          </p>
        </div>

        {/* ledger rows */}
        <ol className="border-t border-border">
          {experiences.map((exp, i) => (
            <motion.li
              key={exp.role}
              {...(reduce
                ? { initial: { opacity: 1 } }
                : {
                    initial: { opacity: 0, y: 24 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: "-40px" },
                    transition: { type: "tween" as const, duration: 0.7, ease: EASE, delay: i * 0.06 },
                  })}
              className="group grid gap-x-10 gap-y-4 border-b border-border py-9 transition-colors duration-300 hover:bg-bg-card/50 sm:grid-cols-[150px_1fr_auto] sm:px-2 md:py-11"
            >
              {/* period */}
              <div className="flex items-start gap-2.5 sm:block">
                <time className="font-mono text-micro uppercase tracking-[0.15em] text-fg-muted transition-colors duration-300 group-hover:text-accent">
                  {exp.period}
                </time>
                {exp.current && (
                  <span className="relative mt-1 flex h-1.5 w-1.5 sm:ml-auto sm:mt-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                )}
              </div>

              {/* role + details */}
              <div>
                <h3 className="font-heading text-xl font-bold tracking-tight text-fg transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                  {exp.role}
                </h3>
                <p className="mt-1 font-mono text-micro uppercase tracking-[0.22em] text-fg-dim">
                  {exp.company}
                </p>
                <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-fg-muted">
                  {exp.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2" aria-label="Highlights">
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 font-mono text-tiny uppercase tracking-[0.15em] text-fg-dim"
                    >
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent/70" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* arrow affordance — decorative */}
              <div
                aria-hidden="true"
                className="hidden items-start justify-end pt-1 sm:flex"
              >
                <span className="translate-x-2 text-lg text-fg-dim opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100">
                  ↗
                </span>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* footnote */}
        <p className="mt-8 font-mono text-tiny uppercase tracking-[0.15em] text-fg-dim">
          Full résumé available on request —{" "}
          <a href="#contact" className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
            ask me
          </a>
        </p>
      </div>
    </section>
  );
}
