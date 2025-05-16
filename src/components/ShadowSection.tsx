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
        color: "#00000088",
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
      <div className="flex items-center justify-between">
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
          <div key={i} className="relative rounded-md border p-4">
            <ShadowControl
              value={shadow}
              onChange={(v) => updateShadow(i, v)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
