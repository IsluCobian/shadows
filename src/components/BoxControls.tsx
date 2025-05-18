import BorderRadiusControl from "./BorderRadiusControl"
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
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">Box Properties</h3>
      <BorderRadiusControl
        value={styles.borderRadius}
        onChange={(newRadius) =>
          setStyles((s) => ({ ...s, borderRadius: newRadius }))
        }
      />
      <div className="text-muted-foreground flex items-center justify-between gap-10 text-sm">
        <label className="flex flex-1/2 flex-col gap-1">
          <span className="text-foreground text-sm font-medium">
            Width (px)
          </span>
          <DraggableInput
            max={1000}
            value={styles.width}
            onChange={(val) => setStyles((s) => ({ ...s, width: val }))}
            className="text-foreground w-full cursor-ew-resize rounded-md border px-2 py-1 text-base"
          />
        </label>

        <label className="flex flex-1/2 flex-col gap-1">
          <span className="text-foreground text-sm font-medium">
            Height (px)
          </span>
          <DraggableInput
            max={1000}
            value={styles.height}
            onChange={(val) => setStyles((s) => ({ ...s, height: val }))}
            className="text-foreground w-full cursor-ew-resize rounded-md border px-2 py-1 text-base"
          />
        </label>
      </div>
      <div className="flex items-center justify-between gap-10 text-sm">
        <label className="flex w-full flex-col">
          <span className="text-foreground text-sm font-medium">Bg Color</span>
          <input
            type="color"
            className="h-8 w-full cursor-pointer rounded-md"
            value={styles.backgroundColor}
            onChange={(e) =>
              setStyles((s) => ({ ...s, backgroundColor: e.target.value }))
            }
          />
        </label>
        <label className="flex w-full flex-col">
          <span className="text-foreground text-sm font-medium">
            Canvas Color
          </span>
          <input
            type="color"
            className="h-8 w-full cursor-pointer rounded-md"
            value={styles.canvasColor}
            onChange={(e) =>
              setStyles((s) => ({ ...s, canvasColor: e.target.value }))
            }
          />
        </label>
      </div>
    </div>
  )
}
