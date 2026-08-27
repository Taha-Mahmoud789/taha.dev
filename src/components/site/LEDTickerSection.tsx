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
          "REACT",
          "NEXT.JS",
          "TYPESCRIPT",
          "TAILWIND",
          "NODE.JS",
          "POSTGRESQL",
          "PRISMA",
          "DOCKER",
          "GIT",
          "FIGMA",
          "THREE.JS",
          "FRAMER",
        ]}
        separator="◆"
        speed={38}
        direction="right"
        textSize={50}
        dotSize={3}
        dotQuantity={10}
        spread={1}
        dotShape="round"
        onColor={isDark ? "#818cf8" : "#4f46e5"}
        offColor={isDark ? "rgba(129,140,248,0.07)" : "rgba(79,70,229,0.09)"}
        glow={isDark}
        glowOptions={{ strength: 30, size: 4 }}
        flicker={false}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
