"use client";

import type { JSX } from "react";
import { ParticleLogos } from "./ParticleLogos";

/** Tool section with particle logos. */
export function Stack(): JSX.Element {
  return (
    <section id="stack" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-5 pt-24 sm:px-8 lg:pt-32">
        <div className="flex flex-col justify-between gap-6 pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-4"><span className="text-accent">{"//"}</span> Stack</p>
            <h2 className="display-sans text-[clamp(2.5rem,6vw,4.5rem)] text-fg">
              Tools I work{" "}
              <span className="text-gradient">with.</span>
            </h2>
          </div>
          <p className="max-w-xs font-mono text-tiny uppercase leading-relaxed tracking-[0.22em] text-fg-dim">
            12 tools — battle-tested in production
          </p>
        </div>
      </div>

      {/* Particle logo canvas — full width, cycles through all logos */}
      <div className="mt-10">
        <ParticleLogos />
      </div>
    </section>
  );
}
