import { cn } from "@/lib/utils"
import { Scan } from "lucide-react"
import { useState } from "react"
import DraggableInput from "./DraggableInput"
import { Icons } from "./Icons"

type Radius = {
  topLeft: number
  topRight: number
  bottomRight: number
  bottomLeft: number
}

type Props = {
  value: Radius
  onChange: (newRadius: Radius) => void
}

const IconRotation = {
  topLeft: "",
  topRight: "rotate-90",
  bottomRight: "rotate-180",
  bottomLeft: "rotate-270",
}

export default function BorderRadiusControl({ value, onChange }: Props) {
  const [expanded, setExpanded] = useState(false)

  const allEqual =
    value.topLeft === value.topRight &&
    value.topRight === value.bottomRight &&
    value.bottomRight === value.bottomLeft

  const sharedValue = allEqual ? value.topLeft : undefined

  const updateAll = (val: number) => {
    onChange({
      topLeft: val,
      topRight: val,
      bottomRight: val,
      bottomLeft: val,
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Border Radius</span>
        <button
          className="text-xs text-violet-500 hover:underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Collapse" : "Edit Corners"}
        </button>
      </div>

      <div className="relative">
        <Scan className="text-muted-foreground/70 absolute top-1/2 left-2 size-4 -translate-y-1/2" />
        <DraggableInput
          max={1000}
          value={sharedValue ?? 0}
          onChange={updateAll}
          className="text-foreground w-full cursor-ew-resize rounded-md border py-1 pr-2 pl-8 text-base"
        />
        {!allEqual && (
          <span className="text-muted-foreground bg-card absolute top-1/2 left-8 -translate-y-1/2 px-1 text-sm">
            Mixed
          </span>
        )}
      </div>

      <div
        className={cn(
          "-m-2 grid grid-rows-[0fr] overflow-hidden p-2 transition-all duration-300 ease-in-out",
          expanded && "grid-rows-[1fr]"
        )}
      >
        <div className="min-h-0">
          <div className="grid grid-cols-2 gap-3">
            {(
              ["topLeft", "topRight", "bottomLeft", "bottomRight"] as const
            ).map((corner) => (
              <label key={corner} className="relative">
                <Icons.Corner
                  className={cn(
                    "text-muted-foreground/70 absolute top-1/2 left-2 size-4 -translate-y-1/2",
                    IconRotation[corner]
                  )}
                />
                <DraggableInput
                  max={1000}
                  value={value[corner]}
                  onChange={(newVal) =>
                    onChange({ ...value, [corner]: newVal })
                  }
                  className="text-foreground w-full cursor-ew-resize rounded-md border py-1 pr-2 pl-8 text-base"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
