"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor — a small accent dot with a trailing ring that expands
 * over interactive elements. Desktop pointers only; native cursor stays
 * for touch devices and reduced-motion users.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mqFine.matches && !mqReduce.matches);
    // defer state update to avoid sync setState in effect
    const id = window.setTimeout(update, 0);
    return () => clearTimeout(id);
  }, []);

  // hide the native cursor while the custom one is active
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor-on");
    return () => document.documentElement.classList.remove("custom-cursor-on");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = -100, y = -100, rx = -100, ry = -100;
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement | null;
      hovering = !!target?.closest("a, button, input, textarea, [role='button']");
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      const scale = hovering ? 1.9 : 1;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      ring.style.borderColor = hovering
        ? "var(--accent)"
        : "color-mix(in srgb, var(--fg-dim) 70%, transparent)";
      raf = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ marginLeft: "-3px", marginTop: "-3px" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-8 w-8 rounded-full border"
        style={{ transition: "border-color 0.25s ease" }}
      />
    </>
  );
}
