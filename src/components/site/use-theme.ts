"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getTheme, subscribeTheme, toggleTheme } from "@/lib/theme-store";

export type { Theme } from "@/lib/theme-store";

type UseThemeResult = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

/**
 * React binding for the theme store. Re-renders whenever the active
 * theme changes (toggle click or system preference change).
 */
export function useTheme(): UseThemeResult {
  const theme = useSyncExternalStore<"light" | "dark">(
    subscribeTheme,
    getTheme,
    () => "dark"
  );
  const toggle = useCallback(() => toggleTheme(), []);
  return { theme, toggleTheme: toggle };
}
