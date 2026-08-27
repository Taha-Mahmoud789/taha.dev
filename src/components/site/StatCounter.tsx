"use client";

import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type StatCounterProps = {
  value: string;
  label: string;
};

/**
 * Animated statistic — counts up from zero when it scrolls into view.
 * Borderless editorial style: big gradient number + mono label.
 */
export function StatCounter({ value, label }: StatCounterProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState("0");

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match?.[2] ?? "";

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, target]);

  const rendered = reduceMotion ? value : `${display}${suffix}`;

  return (
    <div ref={ref}>
      <span className="display-sans text-gradient block text-[clamp(2.6rem,5.5vw,3.8rem)] leading-none">
        {rendered}
      </span>
      <span className="mt-3 block font-mono text-tiny uppercase tracking-[0.22em] text-fg-dim">
        {label}
      </span>
    </div>
  );
}
