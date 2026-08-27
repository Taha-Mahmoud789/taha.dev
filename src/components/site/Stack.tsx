"use client";

import type { JSX } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Tools Taha actually ships with — curated, no dead deps (three/framer removed). */
const TOOLS: { src: string; label: string }[] = [
  { src: "/logos/react.svg", label: "React" },
  { src: "/logos/next.svg", label: "Next.js" },
  { src: "/logos/typescript.svg", label: "TypeScript" },
  { src: "/logos/tailwind.svg", label: "Tailwind" },
  { src: "/logos/node.svg", label: "Node.js" },
  { src: "/logos/postgres.svg", label: "PostgreSQL" },
  { src: "/logos/prisma.svg", label: "Prisma" },
  { src: "/logos/docker.svg", label: "Docker" },
  { src: "/logos/git.svg", label: "Git" },
  { src: "/logos/figma.svg", label: "Figma" },
  { src: "/logos/github.svg", label: "GitHub" },
  { src: "/logos/vercel.svg", label: "Vercel" },
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
              <span className="text-gradient">with.</span>
            </h2>
          </div>
          <p className="max-w-xs font-mono text-tiny uppercase leading-relaxed tracking-[0.22em] text-fg-muted">
            {TOOLS.length} tools — battle-tested in production
          </p>
        </div>

        {/* editorial logo grid */}
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4 lg:grid-cols-6">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.label}
              {...reveal(0.04 * i)}
              className="group flex flex-col items-center justify-center gap-3 bg-bg-card px-4 py-8 transition-colors duration-300 hover:bg-bg-elevated"
            >
              <Image
                src={tool.src}
                alt={tool.label}
                width={36}
                height={36}
                className="h-9 w-9 opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
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
