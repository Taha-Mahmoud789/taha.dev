"use client";

import { useRef, useEffect, useCallback } from "react";
import type { JSX } from "react";

/**
 * Cursor spotlight — soft glow that follows the mouse, with faint
 * grid lines revealed only inside the radial mask. No grid anywhere else.
 */
export function SpotlightGrid(): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: MouseEvent) => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty("--sx", `${e.clientX}px`);
    el.style.setProperty("--sy", `${e.clientY}px`);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    document.addEventListener("mousemove", onMove, { passive: true });

    const id = window.setTimeout(() => {
      spotRef.current?.style.setProperty("opacity", "1");
    }, 150);

    return () => {
      window.clearTimeout(id);
      document.removeEventListener("mousemove", onMove);
    };
  }, [onMove]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ "--sx": "-400px", "--sy": "-400px" } as React.CSSProperties}
    >
      {/* Faint grid + soft glow revealed only around the cursor */}
      <div
        ref={spotRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          maskImage:
            "radial-gradient(180px circle at var(--sx) var(--sy), black, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(180px circle at var(--sx) var(--sy), black, transparent 72%)",
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--accent) 40%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--accent) 40%, transparent) 1px, transparent 1px)",
          backgroundSize: "2.5rem 2.5rem",
        }}
      />
      {/* Soft glow behind the lines */}
      <div
        className="absolute rounded-full"
        style={{
          width: 260,
          height: 260,
          transform: "translate(calc(var(--sx) - 130px), calc(var(--sy) - 130px))",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 6%, transparent) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}