"use client";

import type { JSX } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ParticleLogos } from "./ParticleLogos";

const EASE = [0.16, 1, 0.3, 1] as const;

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
            <p className="mt-4 font-mono text-tiny uppercase leading-relaxed tracking-[0.22em] text-fg-muted">
              12 tools — battle-tested in production
            </p>
          </div>
        </div>

        {/* floating logo field — the tools drift & react to the cursor */}
        <motion.div {...reveal(0.1)}>
          <ParticleLogos />
        </motion.div>
      </div>
    </section>
  );
}
