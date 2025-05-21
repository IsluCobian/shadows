import React, { useRef } from "react"
import type { InputHTMLAttributes } from "react"
import { Input } from "./ui/input"

type Props = {
  value: number
  onChange: (val: number) => void
  min?: number
  max?: number
  sensitivity?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">

export default function DraggableInput({
  value,
  onChange,
  min = 0,
  max = 100,
  sensitivity = 1,
  className = "",
  ...rest
}: Props) {
  const dragStartX = useRef<number | null>(null)
  const dragStartVal = useRef<number>(value)

  const getX = (e: MouseEvent | TouchEvent): number => {
    if ("touches" in e) return e.touches[0].clientX
    return e.clientX
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const x = "touches" in e ? e.touches[0].clientX : e.clientX
    dragStartX.current = x
    dragStartVal.current = value

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentX = getX(moveEvent)
      if (dragStartX.current !== null) {
        const delta = currentX - dragStartX.current
        const isShift = "shiftKey" in moveEvent && moveEvent.shiftKey
        const multiplier = isShift ? 0.2 : 1
        const newVal = Math.min(
          max,
          Math.max(min, dragStartVal.current + delta * sensitivity * multiplier)
        )
        onChange(Math.round(newVal))
      }
    }

    const handleEnd = () => {
      dragStartX.current = null
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", handleEnd)
      window.removeEventListener("touchmove", handleMove)
      window.removeEventListener("touchend", handleEnd)
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseup", handleEnd)
    window.addEventListener("touchmove", handleMove)
    window.addEventListener("touchend", handleEnd)
  }

  return (
    <Input
      type="number"
      value={value}
      onChange={(e) => {
        const val = +e.target.value
        if (!isNaN(val)) {
          onChange(Math.min(max, Math.max(min, val)))
        }
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      className={`h-8 cursor-ew-resize touch-none ${className}`}
      {...rest}
    />
  )
}
