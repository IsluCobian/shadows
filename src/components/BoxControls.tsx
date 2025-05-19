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
      <h3 className="text-lg font-semibold">Box Properties</h3>
      <BorderRadiusControl
        value={styles.borderRadius}
        onChange={(newRadius) =>
          setStyles((s) => ({ ...s, borderRadius: newRadius }))
        }
      />
      <div className="flex w-full items-center justify-between gap-5 text-sm">
        <label className="flex flex-1/2 flex-col gap-1">
          <span className="font-medium">Width (px)</span>
          <DraggableInput
            max={1000}
            value={styles.width}
            onChange={(val) => setStyles((s) => ({ ...s, width: val }))}
            className="w-full cursor-ew-resize rounded-md border px-2 py-1"
          />
        </label>

        <label className="flex flex-1/2 flex-col gap-1">
          <span className="font-medium">Height (px)</span>
          <DraggableInput
            max={1000}
            value={styles.height}
            onChange={(val) => setStyles((s) => ({ ...s, height: val }))}
            className="w-full cursor-ew-resize rounded-md border px-2 py-1"
          />
        </label>
      </div>
      <div className="flex w-full items-center justify-between gap-5 text-sm">
        <label className="flex w-full flex-col gap-1">
          <span className="font-medium">Bg Color</span>
          <ColorInputPopover
            value={styles.backgroundColor}
            onChange={(c) => setStyles((s) => ({ ...s, backgroundColor: c }))}
          />
        </label>
        <label className="flex w-full flex-col gap-1">
          <span className="font-medium">Canvas Color</span>
          <ColorInputPopover
            value={styles.canvasColor}
            onChange={(c) => setStyles((s) => ({ ...s, canvasColor: c }))}
          />
        </label>
      </div>
    </div>
  )
}
