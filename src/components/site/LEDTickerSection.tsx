"use client";

import type { JSX } from "react";
import { LEDTicker } from "@/components/ui/led-ticker";
import { useTheme } from "./use-theme";

export function LEDTickerSection(): JSX.Element {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative h-14 overflow-hidden bg-bg-card/40 sm:h-16">
      <LEDTicker
        items={[
          // Identity signal — availability lives in the hero pill, tools once in Stack.
          "FRONTEND DEVELOPER",
          "BASED IN CAIRO",
          "REMOTE FRIENDLY",
        ]}
        separator="◆"
        speed={38}
        direction="right"
        textSize={50}
        dotSize={3}
        dotQuantity={10}
        spread={1}
        dotShape="round"
        onColor={isDark ? "#b6f030" : "#4d7c0f"}
        offColor={isDark ? "rgba(182,240,48,0.07)" : "rgba(77,124,15,0.09)"}
        glow={isDark}
        glowOptions={{ strength: 30, size: 4 }}
        flicker={false}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
