import React, { useRef, useState } from "react"
import DraggableInput from "./DraggableInput"

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
          className="text-xs text-blue-500 underline dark:text-blue-400"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Collapse" : "Edit Corners"}
        </button>
      </div>

      <DraggableInput
        value={sharedValue || 0}
        onChange={updateAll}
        className="text-foreground w-full cursor-ew-resize rounded-md border px-2 py-1 text-base"
      />
      <div
        className="grid grid-rows-[0fr] overflow-hidden transition-all duration-400 ease-in-out data-open:grid-rows-[1fr]"
        data-open={expanded ? "" : undefined}
      >
        <div className="min-h-0">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {(
              ["topLeft", "topRight", "bottomRight", "bottomLeft"] as const
            ).map((corner) => (
              <label key={corner} className="flex flex-col">
                {corner.replace(/([A-Z])/g, " $1")}
                <DraggableInput
                  value={value[corner]}
                  onChange={(newVal) =>
                    onChange({ ...value, [corner]: newVal })
                  }
                  className="text-foreground w-full cursor-ew-resize rounded-md border px-2 py-1 text-base"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
