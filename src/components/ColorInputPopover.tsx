import { hexToRgba, isHexColor } from "@/lib/utils"
import { Pipette } from "lucide-react"
import { useCallback } from "react"
import { HexColorPicker, RgbaStringColorPicker } from "react-colorful"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { toast } from "sonner"

type Props = {
  value: string
  opacity?: boolean
  onChange: (val: string) => void
}

interface EyeDropper {
  open(): Promise<{ sRGBHex: string }>
}

interface Window {
  EyeDropper: {
    new (): EyeDropper
  }
}

export default function ColorInputPopover({
  value,
  onChange,
  opacity = false,
}: Props) {
  const pickColor = useCallback(async () => {
    if (!("EyeDropper" in window)) {
      toast.error("Your browser doesn't support the Eye Dropper")
      return
    }

    try {
      const eyeDropper = new (window as Window).EyeDropper()
      const result = await eyeDropper.open()
      onChange(result.sRGBHex)
    } catch (e) {
      console.error("EyeDropper error:", e)
    }
  }, [onChange])

  const isCustomVar = value.startsWith("var(--")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim()

    if (opacity) {
      if (input.startsWith("rgba") || input.startsWith("rgb")) {
        onChange(input)
      }
    }
    let hex = input.replace(/[^0-9a-fA-F]/g, "")
    if (hex.length > 6) hex = hex.slice(0, 6)
    onChange(`#${hex}`)
  }

  return (
    <div className="flex flex-col gap-1 text-sm">
      <Popover>
        <div className="flex w-full">
          <PopoverTrigger asChild>
            <div className="relative h-10 flex-1 cursor-pointer overflow-hidden rounded-md border">
              {opacity && (
                <div
                  className="absolute inset-0 rounded"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                    backgroundSize: "10px 10px",
                    backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px",
                  }}
                />
              )}
              <div
                className="absolute inset-0 rounded"
                style={{ backgroundColor: value }}
              />
            </div>
          </PopoverTrigger>
        </div>

        <PopoverContent align="start" className="flex flex-col gap-2.5">
          <div className="colorPicker">
            {opacity ? (
              <RgbaStringColorPicker
                color={isHexColor(value) ? hexToRgba(value) : value}
                onChange={onChange}
              />
            ) : (
              <HexColorPicker color={value} onChange={onChange} />
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute top-1/2 left-2 size-6 -translate-y-1/2 overflow-hidden rounded-full border">
                {opacity && (
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                      backgroundSize: "10px 10px",
                      backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px",
                    }}
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: value }}
                />
              </div>
              <Input
                type="text"
                value={isCustomVar ? "#" : value}
                onChange={handleInputChange}
                className="h-10 w-full rounded-md border pl-9 text-base"
              />
            </div>
            <button
              onClick={pickColor}
              title="Pick a color"
              className="hover:bg-muted flex size-10 items-center justify-center rounded-md border"
            >
              <Pipette className="size-4.5" />
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
