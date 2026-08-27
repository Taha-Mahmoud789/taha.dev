"use client";

export type Theme = "light" | "dark";

type Listener = () => void;

const listeners = new Set<Listener>();

const subscribe = (listener: Listener): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const emitChange = (): void => {
  for (const listener of listeners) listener();
};

const getStoredTheme = (): Theme | null => {
  try {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
};

/** Reapplies the active theme from storage or system preference. */
export const applyTheme = (): void => {
  const stored = getStoredTheme();
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = stored ? stored === "dark" : systemDark;
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.classList.toggle("light", !dark);
};

/** Flips the theme, persists it, and notifies subscribers. */
export const toggleTheme = (): void => {
  const next: Theme = document.documentElement.classList.contains("dark")
    ? "light"
    : "dark";
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* localStorage unavailable — theme stays in-memory for this session */
  }
  document.documentElement.classList.toggle("dark", next === "dark");
  document.documentElement.classList.toggle("light", next === "light");
  emitChange();
};

/** Current theme, read from the <html> class (the single source of truth). */
export const getTheme = (): Theme => {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

/**
 * Subscribes to theme changes and to system preference changes.
 * Returns an unsubscribe function for useSyncExternalStore.
 */
export const subscribeTheme = (listener: Listener): (() => void) => {
  const unsubscribe = subscribe(listener);
  const onSystemChange = () => {
    if (!getStoredTheme()) {
      applyTheme();
      emitChange();
    }
  };
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", onSystemChange);
  return () => {
    unsubscribe();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", onSystemChange);
  };
};
