"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const MODES = [{ name: "Outer" }, { name: "Inset" }]

export default function ShadowModeToggle({
  onToggle,
}: {
  onToggle?: (value: boolean) => void
}) {
  const [mode, setMode] = useState(MODES[0].name)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const activeRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const activeBtn = activeRef.current

    if (container && activeBtn) {
      const { offsetLeft, offsetWidth } = activeBtn
      const left = offsetLeft
      const right = offsetLeft + offsetWidth
      const containerWidth = container.offsetWidth

      const clipLeft = (left / containerWidth) * 100
      const clipRight = 100 - (right / containerWidth) * 100
      container.style.clipPath = `inset(0 ${clipRight.toFixed()}% 0 ${clipLeft.toFixed()}% round 999px)`
    }
  }, [mode])

  const handleClick = (name: string) => {
    setMode(name)
    onToggle?.(name === "Inset")
  }

  return (
    <div className="my-2 flex w-full flex-col items-start justify-between">
      <span className="text-muted-foreground mb-1 text-xs">Shadow Mode</span>
      <div className="relative w-full">
        <div
          ref={containerRef}
          aria-hidden
          className="absolute inset-0 z-10 my-1 flex gap-1 bg-violet-500 p-1 text-white transition-all duration-300 ease-in-out"
        >
          {MODES.map((tab) => (
            <div
              key={tab.name}
              className="w-1/2 rounded-full px-4 text-center text-xs font-medium transition-colors select-none"
            >
              {tab.name}
            </div>
          ))}
        </div>
        <div className="ring-border relative flex w-full gap-1 rounded-full p-1 ring">
          {MODES.map((tab) => (
            <button
              key={tab.name}
              ref={mode === tab.name ? activeRef : null}
              onClick={() => handleClick(tab.name)}
              className={cn(
                "text-muted-foreground w-1/2 cursor-pointer rounded-full px-4 py-1 text-xs transition-colors"
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
