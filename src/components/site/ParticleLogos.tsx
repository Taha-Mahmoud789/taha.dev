"use client";

import { useEffect, useRef } from "react";
import type { JSX } from "react";

const LOGOS = [
  "/logos/react.svg",
  "/logos/next.svg",
  "/logos/typescript.svg",
  "/logos/tailwind.svg",
  "/logos/node.svg",
  "/logos/postgres.svg",
  "/logos/prisma.svg",
  "/logos/docker.svg",
  "/logos/git.svg",
  "/logos/figma.svg",
  "/logos/github.svg",
  "/logos/vercel.svg",
];

interface Drifter {
  el: HTMLImageElement;
  x: number;
  y: number;
  bx: number;
  by: number;
  vx: number;
  vy: number;
  size: number;
  depth: number; // parallax factor
}

/**
 * Floating logo field — the 12 tools drift gently and react to the cursor.
 * Pure DOM <img> (no canvas sampling), so brand colors stay crisp and it
 * works in both light and dark mode.
 */
export function ParticleLogos(): JSX.Element {
  const wrapRef = useRef<HTMLDivElement>(null);
  const driftersRef = useRef<Drifter[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { width: W, height: H } = wrap.getBoundingClientRect();

    const drifters: Drifter[] = LOGOS.map((src, i) => {
      const size = 38 + Math.random() * 26;
      const x = Math.random() * (W - size);
      const y = Math.random() * (H - size);
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      img.style.cssText = `position:absolute;left:0;top:0;width:${size}px;height:${size}px;opacity:0.55;filter:drop-shadow(0 4px 10px rgba(0,0,0,0.25));will-change:transform;pointer-events:none;transition:opacity .3s`;
      wrap.appendChild(img);
      return {
        el: img,
        x,
        y,
        bx: x,
        by: y,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size,
        depth: 0.5 + Math.random() * 0.8,
      };
    });
    driftersRef.current = drifters;

    if (reduce) {
      drifters.forEach((d) => {
        d.el.style.transform = `translate(${d.x}px, ${d.y}px)`;
        d.el.style.opacity = "0.6";
      });
      return () => drifters.forEach((d) => d.el.remove());
    }

    let t = 0;
    const tick = () => {
      t += 0.008;
      for (const d of drifters) {
        // gentle drift around home
        d.bx += d.vx;
        d.by += d.vy;
        // bounce off edges
        if (d.bx < 0 || d.bx > W - d.size) d.vx *= -1;
        if (d.by < 0 || d.by > H - d.size) d.vy *= -1;

        // cursor repel
        const dx = d.bx - mouse.current.x;
        const dy = d.by - mouse.current.y;
        const dist = Math.hypot(dx, dy);
        let ox = 0,
          oy = 0;
        if (dist < 130) {
          const f = (130 - dist) / 130;
          ox = (dx / (dist || 1)) * f * 28 * d.depth;
          oy = (dy / (dist || 1)) * f * 28 * d.depth;
        }

        const floatY = Math.sin(t + d.depth * 6) * 6;
        d.x = d.bx + ox;
        d.y = d.by + oy + floatY;
        d.el.style.transform = `translate(${d.x}px, ${d.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => (mouse.current = { x: -9999, y: -9999 });
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf.current);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      drifters.forEach((d) => d.el.remove());
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="relative h-[360px] w-full overflow-hidden rounded-3xl border border-border bg-bg-card/40 sm:h-[420px]"
    />
  );
}
