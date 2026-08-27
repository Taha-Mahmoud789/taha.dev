"use client";

import type { JSX } from "react";

type Project = {
  name: string;
  description: string;
  tags: string[];
  link: string;
  visual: "store" | "chat" | "analytics" | "kanban";
};

const projects: Project[] = [
  {
    name: "Lumina Store",
    description:
      "Headless commerce platform with Stripe checkout, real-time inventory, and an admin dashboard. Product pages hold a 99+ Lighthouse score thanks to Edge caching.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Edge Cache"],
    link: "#",
    visual: "store",
  },
  {
    name: "Pulse Chat",
    description:
      "Real-time AI chat with streaming responses, markdown rendering, conversation memory, and a keyboard-first interface built for speed.",
    tags: ["React", "WebSocket", "OpenAI", "Tailwind"],
    link: "#",
    visual: "chat",
  },
  {
    name: "Orbit Analytics",
    description:
      "Interactive analytics dashboard with live charts, custom widgets, and full light/dark theming — responsive from mobile to ultrawide.",
    tags: ["Next.js", "Recharts", "WebSocket", "TypeScript"],
    link: "#",
    visual: "analytics",
  },
  {
    name: "Forge Board",
    description:
      "Collaborative kanban with drag-and-drop, presence cursors, and role-based team workspaces. Real-time sync across every client.",
    tags: ["React", "Liveblocks", "DnD Kit", "Zustand"],
    link: "#",
    visual: "kanban",
  },
];

function StoreVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="w-full max-w-[200px] space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-2.5 w-16 rounded bg-fg/10" />
          <div className="h-2.5 w-6 rounded bg-accent/30" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square rounded-md border border-border bg-bg/50" />
          ))}
        </div>
        <div className="flex gap-1.5">
          <div className="h-6 flex-1 rounded-md bg-accent/20" />
          <div className="h-6 w-14 rounded-md border border-border" />
        </div>
      </div>
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="absolute inset-0 flex items-end justify-center p-6">
      <div className="w-full max-w-[200px] space-y-1.5">
        {["Hello! How can I help?", "Can you explain hooks?", "Sure! Hooks let you..."].map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] rounded-xl px-2.5 py-1.5 text-[8px] ${
              i % 2 === 0
                ? "ml-0 rounded-bl-sm border border-border bg-bg/80"
                : "ml-auto rounded-br-sm bg-accent/15"
            }`}
          >
            {msg}
          </div>
        ))}
        <div className="mt-1 flex items-center gap-1.5 border-t border-border pt-1.5">
          <div className="h-5 flex-1 rounded-full border border-border bg-bg/50" />
          <div className="h-5 w-5 rounded-full bg-accent/30" />
        </div>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [40, 65, 45, 80, 55, 90, 70, 95, 60, 75, 85, 50];
  return (
    <div className="absolute inset-0 flex items-end justify-center p-6">
      <div className="flex w-full max-w-[200px] items-end gap-1" style={{ height: "60px" }}>
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-accent/25 transition-all"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function KanbanVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="flex w-full max-w-[200px] gap-1.5">
        {[
          ["Design", "API"],
          ["Frontend", "Deploy"],
          ["Testing"],
        ].map((col, ci) => (
          <div key={ci} className="flex-1 space-y-1">
            {col.map((task, ti) => (
              <div
                key={ti}
                className="rounded border border-border bg-bg/60 px-1.5 py-1 text-[8px] text-fg-muted"
              >
                {task}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const visuals = { store: StoreVisual, chat: ChatVisual, analytics: AnalyticsVisual, kanban: KanbanVisual };

/** Selected-work list — terminal window panels. */
export function Projects(): JSX.Element {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
      <div className="flex flex-col justify-between gap-6 pb-10 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-4"><span className="text-accent">{"//"}</span> Projects</p>
          <h2 className="display-sans text-[clamp(2.5rem,6vw,4.5rem)] text-fg">
            Things I&apos;ve{" "}
            <span className="text-gradient">built.</span>
          </h2>
        </div>
        <p className="max-w-xs font-mono text-tiny uppercase leading-relaxed tracking-[0.22em] text-fg-dim">
          04 entries — 2024 → 2026
        </p>
      </div>

      {/* Terminal windows grid */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-[auto_auto] md:grid-cols-3">
        {/* Lumina Store — spans 2 cols */}
        <article className="group term-window relative col-span-1 overflow-hidden rounded-md transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_30px_-8px_var(--glow)] sm:col-span-2">
          <div className="term-bar">
            <span className="term-dot bg-danger/80" />
            <span className="term-dot bg-accent/70" />
            <span className="term-dot bg-fg-dim" />
            <span className="ml-2">lumina_store.tsx</span>
          </div>
          <div className="grid sm:grid-cols-[1fr_1.2fr]">
            <div className="relative flex flex-col justify-center p-6 sm:p-8">
              <span className="mb-3 inline-block w-fit rounded-sm border border-accent/50 bg-accent-soft px-2.5 py-0.5 font-mono text-micro uppercase tracking-[0.15em] text-accent-strong dark:text-accent">
                ./featured
              </span>
              <h3 className="display-sans text-2xl text-fg transition-colors duration-300 group-hover:text-accent-strong dark:group-hover:text-accent lg:text-3xl">
                Lumina Store
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
                Headless commerce platform with Stripe checkout, real-time inventory, and an admin dashboard. 99+ Lighthouse score.
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                {["Next.js", "Stripe", "PostgreSQL", "Edge Cache"].map((tag) => (
                  <li key={tag} className="rounded-sm border border-border bg-bg px-2.5 py-0.5 font-mono text-micro uppercase tracking-[0.15em] text-fg-muted transition-colors group-hover:border-accent/50 group-hover:text-accent-strong dark:group-hover:text-accent">
                    {tag}
                  </li>
                ))}
              </ul>
              <a href="#" className="mt-5 inline-flex items-center gap-1.5 font-mono text-tiny uppercase tracking-[0.15em] text-fg-muted transition-colors hover:text-accent-strong dark:hover:text-accent">
                ./case-study <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            </div>
            <div className="relative min-h-[200px] overflow-hidden bg-gradient-to-br from-bg-card to-bg-elevated sm:min-h-0">
              <div aria-hidden="true" className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]" style={{ backgroundImage: "linear-gradient(var(--fg-muted) 1px, transparent 1px), linear-gradient(90deg, var(--fg-muted) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <StoreVisual />
            </div>
          </div>
        </article>

        {/* Pulse Chat */}
        <article className="group term-window relative overflow-hidden rounded-md transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_30px_-8px_var(--glow)]">
          <div className="term-bar">
            <span className="term-dot bg-danger/80" />
            <span className="term-dot bg-accent/70" />
            <span className="term-dot bg-fg-dim" />
            <span className="ml-2">pulse_chat.tsx</span>
          </div>
          <div className="relative min-h-[200px] overflow-hidden bg-gradient-to-br from-bg-card to-bg-elevated">
            <div aria-hidden="true" className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]" style={{ backgroundImage: "linear-gradient(var(--fg-muted) 1px, transparent 1px), linear-gradient(90deg, var(--fg-muted) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <ChatVisual />
          </div>
          <div className="p-5">
            <h3 className="display-sans text-xl text-fg transition-colors duration-300 group-hover:text-accent-strong dark:group-hover:text-accent">
              Pulse Chat
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-fg-muted">
              Real-time AI chat with streaming responses and keyboard-first interface.
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
              {["React", "WebSocket", "OpenAI", "Tailwind"].map((tag) => (
                <li key={tag} className="rounded-sm border border-border bg-bg px-2 py-0.5 font-mono text-micro uppercase tracking-[0.15em] text-fg-muted transition-colors group-hover:border-accent/50 group-hover:text-accent-strong dark:group-hover:text-accent">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Orbit Analytics */}
        <article className="group term-window relative overflow-hidden rounded-md transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_30px_-8px_var(--glow)]">
          <div className="term-bar">
            <span className="term-dot bg-danger/80" />
            <span className="term-dot bg-accent/70" />
            <span className="term-dot bg-fg-dim" />
            <span className="ml-2">orbit_analytics.tsx</span>
          </div>
          <div className="relative min-h-[200px] overflow-hidden bg-gradient-to-br from-bg-card to-bg-elevated">
            <div aria-hidden="true" className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]" style={{ backgroundImage: "linear-gradient(var(--fg-muted) 1px, transparent 1px), linear-gradient(90deg, var(--fg-muted) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <AnalyticsVisual />
          </div>
          <div className="p-5">
            <h3 className="display-sans text-xl text-fg transition-colors duration-300 group-hover:text-accent-strong dark:group-hover:text-accent">
              Orbit Analytics
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-fg-muted">
              Interactive dashboard with live charts and custom widgets.
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
              {["Next.js", "Recharts", "WebSocket", "TypeScript"].map((tag) => (
                <li key={tag} className="rounded-sm border border-border bg-bg px-2 py-0.5 font-mono text-micro uppercase tracking-[0.15em] text-fg-muted transition-colors group-hover:border-accent/50 group-hover:text-accent-strong dark:group-hover:text-accent">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Forge Board — spans 2 cols */}
        <article className="group term-window relative col-span-1 overflow-hidden rounded-md transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_30px_-8px_var(--glow)] sm:col-span-2">
          <div className="term-bar">
            <span className="term-dot bg-danger/80" />
            <span className="term-dot bg-accent/70" />
            <span className="term-dot bg-fg-dim" />
            <span className="ml-2">forge_board.tsx</span>
          </div>
          <div className="grid sm:grid-cols-[1.2fr_1fr]">
            <div className="relative min-h-[200px] overflow-hidden bg-gradient-to-br from-bg-card to-bg-elevated sm:min-h-0">
              <div aria-hidden="true" className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]" style={{ backgroundImage: "linear-gradient(var(--fg-muted) 1px, transparent 1px), linear-gradient(90deg, var(--fg-muted) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <KanbanVisual />
            </div>
            <div className="relative flex flex-col justify-center p-6 sm:p-8">
              <h3 className="display-sans text-2xl text-fg transition-colors duration-300 group-hover:text-accent-strong dark:group-hover:text-accent lg:text-3xl">
                Forge Board
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
                Collaborative kanban with drag-and-drop, presence cursors, and real-time sync across every client.
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                {["React", "Liveblocks", "DnD Kit", "Zustand"].map((tag) => (
                  <li key={tag} className="rounded-sm border border-border bg-bg px-2.5 py-0.5 font-mono text-micro uppercase tracking-[0.15em] text-fg-muted transition-colors group-hover:border-accent/50 group-hover:text-accent-strong dark:group-hover:text-accent">
                    {tag}
                  </li>
                ))}
              </ul>
              <a href="#" className="mt-5 inline-flex items-center gap-1.5 font-mono text-tiny uppercase tracking-[0.15em] text-fg-muted transition-colors hover:text-accent-strong dark:hover:text-accent">
                ./case-study <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
