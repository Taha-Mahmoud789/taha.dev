"use client";

import { useEffect, useState, useRef } from "react";
import type { JSX } from "react";
import { Wordmark } from "./Wordmark";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/** Floating glass capsule nav — detached, rounded, sliding active pill. */
export function Nav(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = links.map((l) => l.href.slice(1));
      let current = sections[0];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 140) {
          current = sections[i];
          break;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: Escape closes and returns focus to the toggle; Tab is trapped
  // inside the panel so keyboard users never land behind the scrim.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = menuRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement;
      const inside = panel.contains(activeEl);
      if (e.shiftKey) {
        if (!inside || activeEl === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (!inside || activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Move focus into the panel when it opens (dialog behavior).
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
  }, [open]);

  // Slide pill to active link
  useEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;

    const movePill = () => {
      const target = nav.querySelector(`a[href="#${active}"]`);
      if (!target) return;
      const linkRect = target.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      pill.style.transform = `translate(${linkRect.left - navRect.left}px, ${linkRect.top - navRect.top}px)`;
      pill.style.width = `${linkRect.width}px`;
      pill.style.height = `${linkRect.height}px`;
    };

    movePill();
    const ro = new ResizeObserver(movePill);
    ro.observe(nav);
    window.addEventListener("resize", movePill);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", movePill);
    };
  }, [active]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5 sm:px-6">
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
          scrolled
            ? "glass border border-border shadow-[0_10px_40px_-12px_rgba(0,0,0,0.35)]"
            : "border border-transparent"
        }`}
      >
        {/* Brand — badge-free typing wordmark */}
        <a href="#hero" className="flex shrink-0 items-center" aria-label="Taha — back to top">
          <Wordmark />
        </a>

        {/* Desktop links — sliding pill */}
        <nav ref={navRef} aria-label="Primary" className="relative hidden items-center md:flex">
          <span
            ref={pillRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 rounded-full bg-accent-soft transition-[transform,width,height] duration-300 ease-out"
            style={{ willChange: "transform, width, height" }}
          />
          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
                  isActive
                    ? "text-accent-strong dark:text-accent"
                    : "text-fg-muted hover:text-fg"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center gap-2.5">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden items-center rounded-full bg-accent px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-on-accent transition-colors hover:bg-accent-strong md:inline-flex"
          >
            Hire me
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            ref={toggleRef}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-card transition-colors hover:border-accent md:hidden"
          >
            <span className="relative block h-3.5 w-4" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-fg transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-fg transition-all duration-300 ${
                  open ? "scale-x-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-fg transition-all duration-300 ${
                  open ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Scrim — clicking it dismisses the menu and returns focus to the toggle */}
      {open && (
        <div
          aria-hidden="true"
          onClick={() => {
            setOpen(false);
            toggleRef.current?.focus();
          }}
          className="fixed inset-0 -z-10 bg-black/50 backdrop-blur-[2px] md:hidden"
        />
      )}

      {/* Mobile menu panel — stays mounted behind [hidden] so aria-controls always resolves */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="mx-auto mt-2 max-w-5xl overflow-hidden rounded-2xl border border-border bg-bg-card shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] md:hidden"
      >
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-full px-4 font-mono text-xs uppercase tracking-[0.15em] text-fg-muted transition-colors hover:bg-bg-elevated hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 flex min-h-11 items-center justify-center rounded-full bg-accent px-4 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-on-accent"
              >
                Hire me
              </a>
            </nav>
      </div>
    </header>
  );
}