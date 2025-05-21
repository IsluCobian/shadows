import BorderRadiusControl from "./BorderRadiusControl"
import ColorInputPopover from "./ColorInputPopover"
import DraggableInput from "./DraggableInput"

interface BoxControlsProps {
  styles: {
    borderRadius: {
      topLeft: number
      topRight: number
      bottomRight: number
      bottomLeft: number
    }
    width: number
    height: number
    backgroundColor: string
    canvasColor: string
  }
  setStyles: React.Dispatch<
    React.SetStateAction<{
      borderRadius: {
        topLeft: number
        topRight: number
        bottomRight: number
        bottomLeft: number
      }
      width: number
      height: number
      backgroundColor: string
      canvasColor: string
    }>
  >
}

export default function BoxControls({ styles, setStyles }: BoxControlsProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <h3 className="text-lg leading-none font-semibold">Box Properties</h3>

      <section>
        <BorderRadiusControl
          value={styles.borderRadius}
          onChange={(newRadius) =>
            setStyles((s) => ({ ...s, borderRadius: newRadius }))
          }
        />
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Width (px)</label>
          <DraggableInput
            max={1000}
            value={styles.width}
            onChange={(val) => setStyles((s) => ({ ...s, width: val }))}
            className="w-full cursor-ew-resize rounded-md border px-2 py-1"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Height (px)</label>
          <DraggableInput
            max={1000}
            value={styles.height}
            onChange={(val) => setStyles((s) => ({ ...s, height: val }))}
            className="w-full cursor-ew-resize rounded-md border px-2 py-1"
          />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Bg Color</label>
          <ColorInputPopover
            value={styles.backgroundColor}
            onChange={(c) => setStyles((s) => ({ ...s, backgroundColor: c }))}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Canvas Color</label>
          <ColorInputPopover
            value={styles.canvasColor}
            onChange={(c) => setStyles((s) => ({ ...s, canvasColor: c }))}
          />
        </div>
      </section>
    </div>
  )
}
