"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Seg = { t: string; c: string };
type Line = { prompt?: boolean; segs: Seg[] };

/**
 * The build sequence — a fake terminal session that "compiles" the site.
 * Lines type out one by one with syntax colors, then the site "ships".
 */
const SCRIPT: Line[] = [
  { prompt: true, segs: [{ t: "npx create-portfolio@latest", c: "text-[#eef0ff]" }] },
  { segs: [{ t: "✔ Scaffolding project…", c: "text-[#8b91b5]" }] },
  { segs: [{ t: "✔ Installing react · next · typescript", c: "text-[#8b91b5]" }] },
  {
    prompt: true,
    segs: [
      { t: "vim ", c: "text-[#eef0ff]" },
      { t: "developer.config.ts", c: "text-[#67e8f9]" },
    ],
  },
  {
    segs: [
      { t: "const", c: "text-[#a5b4fc]" },
      { t: " developer", c: "text-[#eef0ff]" },
      { t: " = {", c: "text-[#c7cbde]" },
    ],
  },
  {
    segs: [
      { t: "  name", c: "text-[#c7cbde]" },
      { t: ": ", c: "text-[#8b91b5]" },
      { t: '"Taha Mahmoud"', c: "text-[#67e8f9]" },
      { t: ",", c: "text-[#8b91b5]" },
    ],
  },
  {
    segs: [
      { t: "  role", c: "text-[#c7cbde]" },
      { t: ": ", c: "text-[#8b91b5]" },
      { t: '"Frontend Developer"', c: "text-[#67e8f9]" },
      { t: ",", c: "text-[#8b91b5]" },
    ],
  },
  {
    segs: [
      { t: "  stack", c: "text-[#c7cbde]" },
      { t: ": [", c: "text-[#8b91b5]" },
      { t: '"React", "Next.js", "TS"', c: "text-[#67e8f9]" },
      { t: "],", c: "text-[#8b91b5]" },
    ],
  },
  {
    segs: [
      { t: "  pixelPerfect", c: "text-[#c7cbde]" },
      { t: ": ", c: "text-[#8b91b5]" },
      { t: "true", c: "text-[#a5b4fc]" },
      { t: ",", c: "text-[#8b91b5]" },
    ],
  },
  {
    segs: [
      { t: "} as const", c: "text-[#a5b4fc]" },
      { t: ";", c: "text-[#8b91b5]" },
    ],
  },
  { prompt: true, segs: [{ t: "npm run build", c: "text-[#eef0ff]" }] },
  { segs: [{ t: "✓ Compiled successfully", c: "text-emerald-400" }] },
  { segs: [{ t: "✓ ESLint · type-check passed", c: "text-emerald-400" }] },
  {
    segs: [
      { t: "➜ ", c: "text-[#a5b4fc]" },
      { t: "Local: ", c: "text-[#8b91b5]" },
      { t: "ready — let's build something together", c: "text-[#eef0ff]" },
    ],
  },
];

/** Char counts per line (text only) — the typing budget per line. */
const LINE_LENGTHS = SCRIPT.map((l) => l.segs.reduce((a, s) => a + s.t.length, 0));
/** Total typed chars INCLUDING one newline token after each line. */
const TOTAL = LINE_LENGTHS.reduce((a, n) => a + n + 1, 0);

export function TerminalBuild(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const total = TOTAL;

  // start when visible (or instantly for reduced motion)
  useEffect(() => {
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      reduce = false;
    }
    if (reduce) {
      const id = setTimeout(() => {
        setStarted(true);
        setStep(total);
      }, 0);
      return () => clearTimeout(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [total]);

  // typing engine — one char per tick, Enter pauses feel real
  useEffect(() => {
    if (!started || step >= total) return;
    // find which line this char belongs to; newline tokens get a longer pause
    let acc = 0;
    let isNewline = false;
    for (const len of LINE_LENGTHS) {
      acc += len;
      if (step === acc) {
        isNewline = true;
        break;
      }
      if (step < acc) break;
      acc += 1; // newline token
    }
    const delay = isNewline ? 240 : 12 + Math.random() * 24;
    const id = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(id);
  }, [started, step, total]);

  // keep latest line in view
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [step]);

  // derive rendered lines from step
  const renderedLines = useMemo(() => {
    const out: React.ReactElement[] = [];
    let consumed = 0;
    for (let li = 0; li < SCRIPT.length; li++) {
      const line = SCRIPT[li];
      const len = LINE_LENGTHS[li];
      if (consumed >= step) break;

      const visibleChars = Math.min(len, step - consumed);
      consumed += len + 1;

      out.push(
        <div key={li} className="whitespace-pre">
          {line.prompt && (
            <span aria-hidden="true" className="mr-2 select-none text-accent">
              ➜
            </span>
          )}
          {(() => {
            let inner = 0;
            return line.segs.map((seg, si) => {
              const start = inner;
              inner += seg.t.length;
              const visible = Math.max(0, Math.min(seg.t.length, visibleChars - start));
              if (visible <= 0) return null;
              return (
                <span key={si} className={seg.c}>
                  {seg.t.slice(0, visible)}
                </span>
              );
            });
          })()}
        </div>,
      );
    }
    return out;
  }, [step]);

  const done = step >= total;

  return (
    <div
      ref={ref}
      className="relative w-full max-w-md select-none overflow-hidden rounded-2xl border border-white/10 bg-[#0a0c16]/95 shadow-[0_40px_90px_-24px_rgba(0,0,0,0.35),0_0_0_1px_rgba(182,240,48,0.08)] backdrop-blur-xl dark:shadow-[0_40px_90px_-24px_rgba(0,0,0,0.7),0_0_0_1px_rgba(182,240,48,0.08)]"
    >
      {/* accent glow line on top edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-10 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(182,240,48,0.6), rgba(34,211,238,0.6), transparent)",
        }}
      />

      {/* chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.02] px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#fbbc34]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
        <span className="ml-2 font-mono text-micro uppercase tracking-[0.15em] text-[#8b91b5]">
          taha@dev — zsh
        </span>
        <span className="ml-auto font-mono text-micro text-[#8b91b5]/60">⌘~</span>
      </div>

      {/* scrolling terminal body */}
      <div
        ref={scrollRef}
        className="h-[330px] overflow-hidden px-5 py-4 font-mono text-[0.85rem] leading-relaxed sm:text-[0.92rem]"
      >
        {renderedLines}
        {!done ? (
          <span className="term-caret" aria-hidden="true" />
        ) : (
          <div className="mt-3 flex items-center gap-2 whitespace-nowrap font-mono text-micro uppercase tracking-[0.15em] text-emerald-400">
            ✓ site shipped — scroll to explore
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
          </div>
        )}
      </div>

      {/* bottom status bar — always dark, theme-independent */}
      <div className="flex items-center justify-between border-t border-white/[0.07] bg-white/[0.02] px-5 py-2.5">
        <span className="font-mono text-micro uppercase tracking-[0.15em] text-[#8b91b5]">
          zsh · utf-8
        </span>
        <span className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.15em] text-[#8b91b5]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          open to work
        </span>
      </div>
    </div>
  );
}
