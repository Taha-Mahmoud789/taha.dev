"use client";

import type { JSX } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Tools Taha actually ships with — curated, no dead deps (three/framer removed). */
const TOOLS: { src: string; label: string; dark?: boolean }[] = [
  { src: "/logos/react.svg", label: "React" },
  // Monochrome-dark marks (verified: #000/#181717/#2D3748 fills) — invert in dark
  // so they don't disappear into the near-black card.
  { src: "/logos/next.svg", label: "Next.js", dark: true },
  { src: "/logos/typescript.svg", label: "TypeScript" },
  { src: "/logos/tailwind.svg", label: "Tailwind" },
  { src: "/logos/node.svg", label: "Node.js" },
  { src: "/logos/postgres.svg", label: "PostgreSQL" },
  { src: "/logos/prisma.svg", label: "Prisma", dark: true },
  { src: "/logos/docker.svg", label: "Docker" },
  { src: "/logos/git.svg", label: "Git" },
  { src: "/logos/figma.svg", label: "Figma" },
  { src: "/logos/github.svg", label: "GitHub", dark: true },
  { src: "/logos/vercel.svg", label: "Vercel", dark: true },
];

export function Stack(): JSX.Element {
  const reduce = useReducedMotion();

  const reveal = (delay: number) =>
    reduce
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { type: "tween" as const, duration: 0.7, ease: EASE, delay },
        };

  return (
    <section id="stack" className="relative overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 pb-12 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-4">
              <span className="text-accent">{"//"}</span> Stack
            </p>
            <h2 className="display-sans text-[clamp(2.5rem,6vw,4.5rem)] text-fg">
              Tools I work{" "}
              <span>with.</span>
            </h2>
            <p className="mt-4 font-mono text-tiny uppercase leading-relaxed tracking-[0.22em] text-fg-muted">
              {TOOLS.length} tools — battle-tested in production
            </p>
          </div>
        </div>

        {/* editorial logo grid — clean cells, brand colors, soft hover */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.label}
              {...reveal(0.04 * i)}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-bg-card/60 px-3 py-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-bg-elevated hover:shadow-[0_14px_40px_-18px_var(--glow)]"
            >
              <Image
                src={tool.src}
                alt=""
                width={42}
                height={42}
                className={`h-10 w-10 transition-transform duration-300 group-hover:scale-110 ${
                  tool.dark ? "dark:invert dark:brightness-110" : ""
                }`}
              />
              <span className="font-mono text-micro uppercase tracking-[0.18em] text-fg-muted transition-colors duration-300 group-hover:text-accent">
                {tool.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
