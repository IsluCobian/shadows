import { Plus } from "lucide-react"
import LayerReorderMenu from "./LayerReorderMenu"
import ShadowControl, { Shadow } from "./ShadowControls"

interface ShadowSectionProps {
  shadows: Shadow[]
  onChange: (shadow: Shadow[]) => void
}

export default function ShadowSection({
  shadows,
  onChange,
}: ShadowSectionProps) {
  const addShadow = () => {
    onChange([
      ...shadows,
      {
        offsetX: 0,
        offsetY: 4,
        blur: 10,
        spread: 0,
        color: "rgba(0,0,0,0.40)",
      },
    ])
  }

  const updateShadow = (index: number, updated: Shadow) => {
    const newShadows = [...shadows]
    newShadows[index] = updated
    onChange(newShadows)
  }

  const removeShadow = (index: number) => {
    const newShadows = shadows.filter((_, i) => i !== index)
    onChange(newShadows)
  }
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="bg-card sticky top-0 z-10 flex items-center justify-between">
        <h3 className="cursor-default text-lg leading-none font-semibold">
          Shadows
        </h3>
        <button
          onClick={addShadow}
          className="hover:bg-muted inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 pr-3.5 text-sm font-medium transition-colors [&_svg]:size-4"
        >
          <Plus /> Add Shadow
        </button>
      </div>
      <div className="scrollbar-gutter -mr-3.5 flex max-h-[40vh] flex-col gap-3 overflow-y-auto pr-2 md:max-h-[70vh]">
        {shadows.map((shadow, i) => (
          <LayerReorderMenu
            key={i}
            index={i}
            total={shadows.length}
            onMove={(from, to) => {
              const updated = [...shadows]
              const [moved] = updated.splice(from, 1)
              updated.splice(to, 0, moved)
              onChange(updated)
            }}
          >
            <div className="relative rounded-md border p-2.5">
              <ShadowControl
                value={shadow}
                onChange={(v) => updateShadow(i, v)}
                onDelete={() => removeShadow(i)}
              />
            </div>
          </LayerReorderMenu>
        ))}
      </div>
    </div>
  )
}
