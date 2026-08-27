"use client"

import { useRef, useState, useEffect, useCallback } from "react"

const LOGOS = [
  { src: "/logos/react.svg" },
  { src: "/logos/next.svg" },
  { src: "/logos/typescript.svg" },
  { src: "/logos/tailwind.svg" },
  { src: "/logos/node.svg" },
  { src: "/logos/postgres.svg" },
  { src: "/logos/prisma.svg" },
  { src: "/logos/docker.svg" },
  { src: "/logos/git.svg" },
  { src: "/logos/figma.svg" },
  { src: "/logos/three.svg" },
  { src: "/logos/framer.svg" },
]

interface Particle {
  x: number; y: number
  homeX: number; homeY: number
  baseX: number; baseY: number
  prevDrawX: number
  size: number
  r: number; g: number; b: number
  a: number
}

interface Cursor {
  x: number; y: number
  tx: number; ty: number
  ring: number
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function sampleImage(
  img: HTMLImageElement, ox: number, oy: number, scale: number, gap: number
): Omit<Particle, "baseX" | "baseY" | "prevDrawX">[] {
  const w = Math.round(img.naturalWidth * scale)
  const h = Math.round(img.naturalHeight * scale)
  const off = document.createElement("canvas")
  off.width = w; off.height = h
  const ctx = off.getContext("2d")!
  ctx.drawImage(img, 0, 0, w, h)
  const data = ctx.getImageData(0, 0, w, h).data
  const particles: Omit<Particle, "baseX" | "baseY" | "prevDrawX">[] = []
  for (let py = 0; py < h; py += gap) {
    for (let px = 0; px < w; px += gap) {
      const i = (py * w + px) * 4
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3]
      if (a < 30) continue
      const x = ox + px, y = oy + py
      particles.push({ x, y, homeX: x, homeY: y, size: 3, r, g, b, a: a / 255 })
    }
  }
  return particles
}

export function ParticleLogos() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -99999, y: -99999 })
  const rafRef = useRef<number>(0)
  const cursorRef = useRef<Cursor>({ x: 0, y: 0, tx: 0, ty: 0, ring: 0 })
  const scrollRef = useRef(0)
  const stripWRef = useRef(0)
  const [ready, setReady] = useState(false)

  const build = useCallback(async () => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rect = container.getBoundingClientRect()
    const W = Math.round(rect.width)
    const H = Math.round(rect.height)
    const dpr = window.devicePixelRatio || 1
    canvas.width = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)

    const images = await Promise.all(LOGOS.map(l => loadImage(l.src)))

    const logoSize = H * 0.85
    const gap = Math.max(4, Math.round(logoSize / 25))
    const oy = (H - logoSize) / 2

    // Sample each logo once (relative coords), keep per-logo slices
    const logos: { raw: Omit<Particle, "baseX" | "baseY" | "prevDrawX">[]; w: number }[] = []
    images.forEach(img => {
      const scale = logoSize / Math.max(img.naturalWidth, img.naturalHeight)
      const w = Math.round(img.naturalWidth * scale)
      logos.push({ raw: sampleImage(img, 0, 0, scale, gap), w })
    })

    // Layout left→right with equal visual gaps, centered in viewport
    const gapBetween = 70
    const totalW = logos.reduce((acc, l) => acc + l.w, 0) + gapBetween * (logos.length - 1)
    const stripW = Math.max(W, totalW)
    stripWRef.current = stripW

    const all: Particle[] = []
    const ACENT_R = 129, ACENT_G = 140, ACENT_B = 248
    let offsetX = (stripW - totalW) / 2

    logos.forEach(l => {
      l.raw.forEach(p => {
        all.push({
          ...p,
          r: ACENT_R, g: ACENT_G, b: ACENT_B,
          a: p.a,
          size: 3,
          baseX: p.x + offsetX,
          baseY: p.y + oy,
          prevDrawX: p.x + offsetX,
        })
      })
      offsetX += l.w + gapBetween
    })

    particlesRef.current = all
    scrollRef.current = 0
    setReady(true)
  }, [])

  useEffect(() => {
    build()
    const onResize = () => { particlesRef.current = []; build() }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [build])

  useEffect(() => {
    if (!ready) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const dpr = window.devicePixelRatio || 1
    const repulseR = 90
    const repulseF = 6
    let visible = true
    let rafId = 0

    const loop = () => {
      if (!visible) { rafId = 0; return }
      const W = canvas.width / dpr
      const H = canvas.height / dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const cur = cursorRef.current
      const now = Date.now()
      const stripW = stripWRef.current

      cur.tx = mx; cur.ty = my
      cur.x += (cur.tx - cur.x) * 0.35
      cur.y += (cur.ty - cur.y) * 0.35
      cur.ring += ((mx > 0 ? 1 : 0) - cur.ring) * 0.15

      scrollRef.current = (scrollRef.current - 0.5 + stripW) % stripW
      const scroll = scrollRef.current

      for (const p of particlesRef.current) {
        let drawX = p.baseX - scroll
        if (drawX < 0) drawX += stripW
        else if (drawX > stripW) drawX -= stripW

        if (drawX < -20 || drawX > W + 20) continue

        const { dx, dy } = { dx: mx - drawX, dy: my - p.baseY }
        const dist = Math.sqrt(dx * dx + dy * dy)
        let pushX = 0, pushY = 0
        if (dist < repulseR && dist > 0) {
          const force = (repulseR - dist) / repulseR * repulseF
          pushX = -(dx / dist) * force * 5
          pushY = -(dy / dist) * force * 5
        }

        const tx = drawX + pushX
        const ty = p.baseY + pushY
        p.x = tx
        p.y = ty

        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      if (mx > 0) {
        ctx.fillStyle = "rgba(255,255,255,0.8)"
        ctx.beginPath()
        ctx.arc(cur.x, cur.y, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      rafId = requestAnimationFrame(loop)
      rafRef.current = rafId
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !rafId) {
          rafId = requestAnimationFrame(loop)
          rafRef.current = rafId
        }
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    rafId = requestAnimationFrame(loop)
    rafRef.current = rafId
    return () => { cancelAnimationFrame(rafRef.current); io.disconnect() }
  }, [ready])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseRef.current = { x, y }
    const cur = cursorRef.current
    if (cur.ring < 0.5) { cur.x = x; cur.y = y }
    cur.tx = x; cur.ty = y
  }, [])

  const onMouseLeave = useCallback(() => {
    mouseRef.current = { x: -99999, y: -99999 }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "160px" }}
    >
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ opacity: ready ? 1 : 0 }}
      />
    </section>
  )
}
