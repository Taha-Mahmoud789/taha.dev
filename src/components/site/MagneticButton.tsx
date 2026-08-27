"use client";

import { useRef, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

/** Button that leans toward the cursor — premium micro-interaction. */
export function MagneticButton({ children, className = "", href, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // pull toward cursor at 30% of the distance to center, clamped
    const dx = Math.max(-14, Math.min(14, (e.clientX - (rect.left + rect.width / 2)) * 0.3));
    const dy = Math.max(-10, Math.min(10, (e.clientY - (rect.top + rect.height / 2)) * 0.3));
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={className}
        style={{ transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={className}
      style={{ transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)" }}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  );
}
