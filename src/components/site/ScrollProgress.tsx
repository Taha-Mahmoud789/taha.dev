"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight
      if (scrollH > 0) {
        setProgress(window.scrollY / scrollH)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div
        className="h-full bg-accent transition-[width] duration-100 ease-out"
        style={{
          width: `${progress * 100}%`,
          boxShadow: "0 0 8px var(--glow)",
        }}
      />
    </div>
  )
}
