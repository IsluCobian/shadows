import React from "react"
import DraggableInput from "./DraggableInput"

export type Shadow = {
  offsetX: number
  offsetY: number
  blur: number
  spread: number
  color: string
}

type Props = {
  value: Shadow
  onChange: (val: Shadow) => void
}

export default function ShadowControl({ value, onChange }: Props) {
  const update = (key: keyof Shadow, val: number | string) => {
    onChange({ ...value, [key]: val })
  }

  function getAlpha(hex: string): number {
    if (hex.length === 9) {
      return Math.round((parseInt(hex.slice(7, 9), 16) / 255) * 100)
    }
    return 100
  }

  function setAlpha(hex: string, alpha: number): string {
    const a = Math.round((alpha / 100) * 255)
      .toString(16)
      .padStart(2, "0")
    if (hex.length === 9) return hex.slice(0, 7) + a
    return hex + a
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-medium">Box Shadow</label>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col text-sm">
          <span>Offset X</span>
          <DraggableInput
            value={value.offsetX}
            onChange={(v) => update("offsetX", v)}
            className="w-full rounded-md border px-2 py-1"
            min={-200}
            max={200}
          />
        </div>

        <div className="flex flex-col text-sm">
          <span>Offset Y</span>
          <DraggableInput
            value={value.offsetY}
            onChange={(v) => update("offsetY", v)}
            className="w-full rounded-md border px-2 py-1"
            min={-200}
            max={200}
          />
        </div>

        <div className="flex flex-col text-sm">
          <span>Blur</span>
          <DraggableInput
            value={value.blur}
            onChange={(v) => update("blur", v)}
            className="w-full rounded-md border px-2 py-1"
            min={0}
            max={200}
          />
        </div>

        <div className="flex flex-col text-sm">
          <span>Spread</span>
          <DraggableInput
            value={value.spread}
            onChange={(v) => update("spread", v)}
            className="w-full rounded-md border px-2 py-1"
            min={-100}
            max={100}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <span>Color</span>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={value.color}
            onChange={(e) => update("color", e.target.value)}
            className="h-10 w-16 cursor-pointer rounded border"
          />

          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Opacity</span>
            <DraggableInput
              value={getAlpha(value.color)}
              onChange={(alpha) =>
                update("color", setAlpha(value.color, alpha))
              }
              min={0}
              max={100}
              className="w-24 rounded-md border px-2 py-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
