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
      <div className="bg-card sticky top-0 z-10 flex items-center justify-between py-4">
        <h3 className="text-lg font-bold">Shadows</h3>
        <button
          onClick={addShadow}
          className="self-start rounded-md border px-3 py-1 text-sm font-medium"
        >
          + Add Shadow
        </button>
      </div>
      <div className="flex flex-col gap-3">
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
            <div className="relative rounded-md border p-4">
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
