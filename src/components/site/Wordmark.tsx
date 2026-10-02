import type { JSX } from "react";

/**
 * Brand wordmark — `Taha` followed by a blinking acid block cursor in place
 * of the old period. Replaces the generic `</>` badge (LogoMark); the cursor
 * ties the logo to the site's terminal identity, is theme-aware via
 * --accent, and stays static under prefers-reduced-motion
 * (globals.css → .wordmark-cursor).
 */
export function Wordmark(): JSX.Element {
  return (
    <span className="font-mono text-base font-semibold tracking-tight text-fg">
      Taha<span className="wordmark-cursor" aria-hidden="true" />
    </span>
  );
}
