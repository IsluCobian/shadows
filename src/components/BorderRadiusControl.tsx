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

  const sharedValue = allEqual ? value.topLeft : ""

  const updateAll = (val: number) => {
    onChange({
      topLeft: val,
      topRight: val,
      bottomRight: val,
      bottomLeft: val,
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Border Radius</label>
        <button
          className="text-xs text-violet-400 underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Collapse" : "Edit Corners"}
        </button>
      </div>
      <div className="relative">
        <Scan className="text-muted-foreground/70 absolute top-1/2 left-2 size-4 -translate-y-1/2" />
        <DraggableInput
          max={1000}
          value={sharedValue || 0}
          onChange={updateAll}
          className="text-foreground w-full cursor-ew-resize rounded-md border px-2 py-1 pl-8 text-base"
        />
        {!allEqual && (
          <span className="bg-card text-muted-foreground absolute top-1/2 left-8 -translate-y-1/2">
            Mixed
          </span>
        )}
      </div>
      <div
        className="grid grid-rows-[0fr] overflow-hidden transition-all duration-400 ease-in-out data-open:grid-rows-[1fr]"
        data-open={expanded ? "" : undefined}
      >
        <div className="min-h-0">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {(
              ["topLeft", "topRight", "bottomLeft", "bottomRight"] as const
            ).map((corner) => (
              <label key={corner} className="relative">
                <Icons.Corner
                  className={cn(
                    "text-muted-foreground/70 absolute top-1/2 left-2 size-4 -translate-y-1/2 p-0.5",
                    IconRotation[corner]
                  )}
                />
                <DraggableInput
                  max={1000}
                  value={value[corner]}
                  onChange={(newVal) =>
                    onChange({ ...value, [corner]: newVal })
                  }
                  className="text-foreground w-full cursor-ew-resize rounded-md border px-2 py-1 pl-8 text-base"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
