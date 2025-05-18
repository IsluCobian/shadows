import { RgbaStringColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Pipette } from "lucide-react"
import { useCallback } from "react"

type Props = {
  value: string //rgba
  onChange: (val: string) => void
}

export default function ColorControl({ value, onChange }: Props) {
  const pickColor = useCallback(async () => {
    // Check for browser support
    if (!("EyeDropper" in window)) {
      alert("Your browser doesn't support the EyeDropper API.")
      return
    }

    try {
      const eyeDropper = new (window as any).EyeDropper()
      const result = await eyeDropper.open()
      const hex = result.sRGBHex

      // Convert hex to rgba with default alpha 1
      const rgba = hexToRgba(hex)
      onChange(rgba)
    } catch (e) {
      // User cancelled or unsupported
      console.error("EyeDropper error:", e)
    }
  }, [onChange])

  return (
    <div className="flex flex-col gap-1 text-sm">
      <span>Color</span>

      <Popover>
        <div className="flex w-full gap-2">
          <PopoverTrigger asChild>
            <div className="relative h-10 flex-1 rounded border">
              <div
                className="absolute inset-0 rounded"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                  backgroundSize: "10px 10px",
                  backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px",
                }}
              />
              <div
                className="absolute inset-0 rounded"
                style={{ backgroundColor: value }}
              />
            </div>
          </PopoverTrigger>
          <button
            onClick={pickColor}
            title="Pick a color"
            className="hover:bg-muted flex size-10 items-center justify-center rounded border"
          >
            <Pipette className="size-4.5" />
          </button>
        </div>
        <PopoverContent align="start" className="w-fit">
          <RgbaStringColorPicker color={value} onChange={(c) => onChange(c)} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

function hexToRgba(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, 1)`
}
