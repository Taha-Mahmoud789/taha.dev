"use client";

import { useRef, useEffect, useCallback } from "react";
import type { JSX } from "react";

interface LEDTickerProps {
  items: string[];
  separator?: string;
  speed?: number;
  direction?: "left" | "right";
  textSize?: number;
  dotSize?: number;
  dotQuantity?: number;
  spread?: number;
  dotShape?: "round" | "square";
  onColor?: string;
  offColor?: string;
  glow?: boolean;
  glowOptions?: { strength: number; size: number };
  flicker?: boolean;
  style?: React.CSSProperties;
}

const FONT: Record<string, number[]> = {
  A: [0x7C, 0x12, 0x12, 0x7C], B: [0x7E, 0x4A, 0x4A, 0x34], C: [0x3C, 0x42, 0x42, 0x24],
  D: [0x7E, 0x42, 0x42, 0x3C], E: [0x7E, 0x4A, 0x4A, 0x42], F: [0x7E, 0x0A, 0x0A, 0x02],
  G: [0x3C, 0x42, 0x52, 0x74], H: [0x7E, 0x08, 0x08, 0x7E], I: [0x42, 0x7E, 0x42, 0x00],
  J: [0x20, 0x40, 0x40, 0x3E], K: [0x7E, 0x08, 0x14, 0x62], L: [0x7E, 0x40, 0x40, 0x40],
  M: [0x7E, 0x04, 0x08, 0x7E], N: [0x7E, 0x04, 0x08, 0x7E], O: [0x3C, 0x42, 0x42, 0x3C],
  P: [0x7E, 0x12, 0x12, 0x0C], Q: [0x3C, 0x42, 0x62, 0x7C], R: [0x7E, 0x12, 0x32, 0x4C],
  S: [0x24, 0x4A, 0x52, 0x24], T: [0x02, 0x7E, 0x02, 0x00], U: [0x3E, 0x40, 0x40, 0x3E],
  V: [0x1E, 0x60, 0x60, 0x1E], W: [0x3E, 0x40, 0x30, 0x3E], X: [0x66, 0x18, 0x18, 0x66],
  Y: [0x06, 0x78, 0x78, 0x06], Z: [0x62, 0x52, 0x4A, 0x46],
  "0": [0x3C, 0x42, 0x42, 0x3C], "1": [0x00, 0x04, 0x7E, 0x00], "2": [0x64, 0x52, 0x52, 0x4C],
  "3": [0x44, 0x42, 0x52, 0x6C], "4": [0x1E, 0x10, 0x7E, 0x10], "5": [0x4E, 0x4A, 0x4A, 0x32],
  "6": [0x3C, 0x4A, 0x4A, 0x30], "7": [0x02, 0x72, 0x0A, 0x06], "8": [0x34, 0x4A, 0x4A, 0x34],
  "9": [0x0C, 0x52, 0x52, 0x3C], " ": [0x00, 0x00, 0x00, 0x00], ".": [0x00, 0x60, 0x60, 0x00],
  ",": [0x00, 0x80, 0x60, 0x00], "!": [0x00, 0x6E, 0x00, 0x00], "?": [0x04, 0x02, 0x52, 0x0C],
  ":": [0x00, 0x36, 0x36, 0x00], "-": [0x10, 0x10, 0x10, 0x10], "+": [0x10, 0x7C, 0x10, 0x00],
  "/": [0x00, 0x60, 0x1C, 0x02], "@": [0x3C, 0x42, 0x5A, 0x7C], "#": [0x24, 0x7E, 0x24, 0x7E],
  "*": [0x00, 0x36, 0x36, 0x00], "★": [0x10, 0x54, 0x38, 0x54, 0x10],
  "◆": [0x04, 0x0E, 0x0E, 0x04],
};

function getTextWidth(text: string, dotSize: number, spread: number): number {
  let w = 0;
  for (const ch of text) {
    const glyph = FONT[ch.toUpperCase()];
    w += (glyph ? glyph.length : 4) * (dotSize + spread) + (dotSize + spread) * 2;
  }
  return w;
}

export function LEDTicker({
  items,
  separator = "★",
  speed = 15,
  direction = "left",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for prop-type compatibility
  textSize = 50,
  dotSize = 3,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for prop-type compatibility
  dotQuantity = 10,
  spread = 1,
  dotShape = "round",
  onColor = "#b6f030",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for prop-type compatibility
  offColor = "rgba(182,240,48,0.06)",
  glow = false,
  glowOptions = { strength: 20, size: 2 },
  flicker = false,
  style,
}: LEDTickerProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const drawRef = useRef<() => void>(() => {});
  const offsetInitRef = useRef(false);
  const reducedRef = useRef<boolean | null>(null);

  const fullText = items.join(` ${separator} `) + ` ${separator} ` + items.join(` ${separator} `) + ` ${separator} `;
  const totalWidth = getTextWidth(fullText, dotSize, spread);

  const draw = useCallback(() => {
    if (!visibleRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Start mid-stream so the strip looks full immediately, not empty from the left
    if (!offsetInitRef.current) {
      offsetRef.current = Math.round(totalWidth / 2);
      offsetInitRef.current = true;
    }

    const W = rect.width;
    const H = rect.height;
    const PAD = 24;

    ctx.clearRect(0, 0, W, H);

    if (direction === "left") {
      offsetRef.current = (offsetRef.current + speed * 0.016) % totalWidth;
    } else {
      offsetRef.current = (offsetRef.current - speed * 0.016 + totalWidth) % totalWidth;
    }

    const dotH = 8 * (dotSize + spread);
    const startY = (H - dotH) / 2;
    let x = -offsetRef.current;

    for (let i = 0; i < fullText.length; i++) {
      const ch = fullText[i].toUpperCase();
      const glyph = FONT[ch] || FONT[" "];
      const charWidth = glyph.length * (dotSize + spread);

      if (x + charWidth > -PAD && x < W + PAD) {
        for (let col = 0; col < glyph.length; col++) {
          const bits = glyph[col];
          for (let row = 0; row < 8; row++) {
            if (bits & (1 << row)) {
              const dx = x + PAD + col * (dotSize + spread);
              const dy = startY + row * (dotSize + spread);

              if (flicker && Math.random() > 0.95) continue;

              ctx.fillStyle = onColor;
              if (glow) {
                ctx.shadowBlur = glowOptions.size * glowOptions.strength / 10;
                ctx.shadowColor = onColor;
              }
              if (dotShape === "round") {
                ctx.beginPath();
                ctx.arc(dx + dotSize / 2, dy + dotSize / 2, dotSize / 2, 0, Math.PI * 2);
                ctx.fill();
              } else {
                ctx.fillRect(dx, dy, dotSize, dotSize);
              }
              ctx.shadowBlur = 0;
            }
          }
        }
      }

      x += charWidth + (dotSize + spread) * 2;
    }

    // Reduced motion: keep the frame above static — never start the loop (§59).
    if (reducedRef.current === null) {
      reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    if (!reducedRef.current) {
      rafRef.current = requestAnimationFrame(() => drawRef.current?.());
    }
  }, [fullText, totalWidth, direction, speed, dotSize, spread, dotShape, onColor, glow, glowOptions, flicker]);

  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const startLoop = () => {
      if (!visibleRef.current) return
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          startLoop()
        } else {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = 0
        }
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    // Start immediately if already visible (observer fires async)
    if (visibleRef.current) startLoop()

    return () => { cancelAnimationFrame(rafRef.current); rafRef.current = 0; io.disconnect() }
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{ display: "block", ...style }}
    />
  );
}
