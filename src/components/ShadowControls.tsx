import { cn } from "@/lib/utils"
import { ChevronRight, Eye, EyeOff, SquarePen, Trash2 } from "lucide-react"
import { useState } from "react"
import ColorInputPopover from "./ColorInputPopover"
import DraggableInput from "./DraggableInput"
import ShadowModeToggle from "./ShadowModeToggle"
import { Input } from "./ui/input"

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
            className="hover:bg-muted text-muted-foreground hover:text-foreground flex cursor-pointer items-center justify-center rounded-md p-2 [&_svg]:size-4"
          >
            {value.visible === false ? <EyeOff /> : <Eye />}
          </button>
          <label className="group relative w-[70%] text-sm font-medium">
            <Input
              value={value.name || "Box Shadow"}
              onChange={(e) => update("name", e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="peer h-auto w-full rounded-md border-none px-2 py-1 dark:bg-transparent"
            />
            <SquarePen className="text-muted-foreground absolute top-1/2 right-2 size-4 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 peer-focus-visible:opacity-100" />
          </label>
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="hover:bg-muted text-muted-foreground flex cursor-pointer items-center justify-center rounded-md p-2 text-sm hover:text-red-400 [&_svg]:size-4"
        >
          <Trash2 />
        </button>
        <span className="text-muted-foreground flex cursor-pointer items-center justify-center rounded-md p-2 text-sm [&_svg]:size-4">
          <ChevronRight
            className={cn(
              "transition-transform duration-200",
              collapsed && "rotate-90"
            )}
          />
        </span>
      </div>
      <div
        className="-mx-0.5 grid grid-rows-[0fr] overflow-hidden px-0.5 transition-all duration-500 ease-in-out data-open:grid-rows-[1fr]"
        data-open={collapsed ? "" : undefined}
      >
        <div className="min-h-0">
          <div className="flex w-full items-center justify-between py-1">
            <ShadowModeToggle
              onToggle={() => {
                update("inset", !value.inset)
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-muted-foreground text-xs">Offset X</span>
              <DraggableInput
                value={value.offsetX}
                onChange={(v) => update("offsetX", v)}
                className="w-full rounded-md border px-2 py-1"
                min={-200}
                max={200}
              />
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <span className="text-muted-foreground text-xs">Offset Y</span>
              <DraggableInput
                value={value.offsetY}
                onChange={(v) => update("offsetY", v)}
                min={-200}
                max={200}
              />
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <span className="text-muted-foreground text-xs">Blur</span>
              <DraggableInput
                value={value.blur}
                onChange={(v) => update("blur", v)}
                min={0}
                max={200}
              />
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <span className="text-muted-foreground text-xs">Spread</span>
              <DraggableInput
                value={value.spread}
                onChange={(v) => update("spread", v)}
                min={-100}
                max={100}
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground text-xs">Color</span>
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
