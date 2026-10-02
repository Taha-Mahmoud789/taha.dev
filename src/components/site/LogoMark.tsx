import type { JSX } from "react";

/**
 * Brand mark — theme-token badge instead of a static bitmap.
 * Uses the same recipe as primary CTAs (bg-accent + text-on-accent):
 * acid green #b6f030 with a near-black glyph in dark, deep lime with a
 * white glyph in light — contrast is guaranteed in both themes by the
 * token system rather than baked into a PNG.
 */
export function LogoMark({ className = "" }: { className?: string }): JSX.Element {
  return (
    <span
      aria-hidden="true"
      className={`grid place-items-center bg-accent font-mono font-bold leading-none text-on-accent ${className}`}
    >
      {"</>"}
    </span>
  );
}
