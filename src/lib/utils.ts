import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hexToRgba(hex: string, alpha = 1): string {
  let cleanHex = hex.replace(/^#/, "")

  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("")
  }

  if (cleanHex.length === 8) {
    alpha = parseInt(cleanHex.slice(6, 8), 16) / 255
    cleanHex = cleanHex.slice(0, 6)
  }

  if (cleanHex.length !== 6) {
    throw new Error(`Invalid HEX color: ${hex}`)
  }

  const r = parseInt(cleanHex.slice(0, 2), 16)
  const g = parseInt(cleanHex.slice(2, 4), 16)
  const b = parseInt(cleanHex.slice(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function isHexColor(str: string): boolean {
  return /^#?([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(str.trim())
}
