import { useState } from "react"
import DraggableInput from "./DraggableInput"
import { ChevronDown, ChevronRight, SquarePen } from "lucide-react"
import { cn } from "@/lib/utils"

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
  const [collapsed, setCollapsed] = useState(false)
  const [shadowName, setShadowName] = useState("Box Shadow")

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
    <div className="flex flex-col">
      <span
        onClick={() => setCollapsed(!collapsed)}
        className="flex cursor-pointer items-center justify-between"
      >
        <label className="group relative text-sm font-medium">
          <input
            value={shadowName}
            onChange={(e) => setShadowName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="peer rounded-md px-2 py-1"
          />
          <SquarePen className="text-muted-foreground absolute top-1/2 right-2 size-4 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 peer-focus-visible:opacity-100" />
        </label>
        <ChevronRight
          className={cn(
            "transition-transform duration-200",
            collapsed && "rotate-90"
          )}
        />
      </span>
      <div
        className="grid grid-rows-[0fr] overflow-hidden transition-all duration-400 ease-in-out data-open:grid-rows-[1fr]"
        data-open={collapsed ? "" : undefined}
      >
        <div className="min-h-0">
          <div className="mt-4 grid grid-cols-2 gap-4">
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
      </div>
    </div>
  )
}
