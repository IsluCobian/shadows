import { cn } from "@/lib/utils"
import {
  ChevronRight,
  Eye,
  EyeOff,
  SquareDashed,
  SquarePen,
} from "lucide-react"
import { useState } from "react"
import ColorInputPopover from "./ColorInputPopover"
import DraggableInput from "./DraggableInput"
import ToggleButton from "./ToggleButton"

export type Shadow = {
  offsetX: number
  offsetY: number
  blur: number
  spread: number
  color: string
  visible?: boolean
  inset?: boolean
  name?: string
}

type Props = {
  value: Shadow
  onChange: (val: Shadow) => void
  onDelete: () => void
}

export default function ShadowControl({ value, onChange, onDelete }: Props) {
  const [collapsed, setCollapsed] = useState(false)

  const update = (key: keyof Shadow, val: number | string | boolean) => {
    onChange({ ...value, [key]: val })
  }

  return (
    <div className="flex flex-col">
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="flex cursor-pointer items-center justify-between"
      >
        <span className="inline-flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              update("visible", !value.visible)
            }}
            className="hover:bg-muted flex cursor-pointer items-center justify-center rounded-full p-2 [&_svg]:size-4"
          >
            {value.visible === false ? <EyeOff /> : <Eye />}
          </button>
          <label className="group relative w-[70%] text-sm font-medium">
            <input
              value={value.name || "Box Shadow"}
              onChange={(e) => update("name", e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="peer w-full rounded-md px-2 py-1"
            />
            <SquarePen className="text-muted-foreground absolute top-1/2 right-2 size-4 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 peer-focus-visible:opacity-100" />
          </label>
        </span>
        <ChevronRight
          className={cn(
            "transition-transform duration-200",
            collapsed && "rotate-90"
          )}
        />
      </div>
      <div
        className="grid grid-rows-[0fr] overflow-hidden transition-all duration-400 ease-in-out data-open:grid-rows-[1fr]"
        data-open={collapsed ? "" : undefined}
      >
        <div className="min-h-0">
          <div className="flex w-full items-center justify-between py-1">
            <ToggleButton
              onToggle={() => {
                update("inset", !value.inset)
              }}
            >
              <SquareDashed />
              Inset
            </ToggleButton>
            <button
              onClick={onDelete}
              className="hover:bg-muted flex cursor-pointer items-center justify-center rounded-lg px-2 py-1 text-sm text-red-400 [&_svg]:size-4"
            >
              Remove
            </button>
          </div>
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

          <div className="mt-4">
            <ColorInputPopover
              value={value.color}
              onChange={(color) => update("color", color)}
              opacity
            />
          </div>
        </div>
      </div>
    </div>
  )
}
