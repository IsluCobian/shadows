import { Pipette } from "lucide-react"
import { useCallback } from "react"
import { HexColorPicker } from "react-colorful"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

type Props = {
  value: string //rgba
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

export default function ColorInputPopover({ value, onChange }: Props) {
  const pickColor = useCallback(async () => {
    // Check for browser support
    if (!("EyeDropper" in window)) {
      alert("Your browser doesn't support the EyeDropper API.")
      return
    }

    try {
      const eyeDropper = new (window as Window).EyeDropper()
      const result = await eyeDropper.open()
      const hex = result.sRGBHex
      onChange(hex)
    } catch (e) {
      // User cancelled or unsupported
      console.error("EyeDropper error:", e)
    }
  }, [onChange])

  return (
    <div className="flex flex-col gap-1 text-sm">
      <Popover>
        <div className="flex w-full">
          <PopoverTrigger asChild>
            <div
              className="relative h-7 flex-1 cursor-pointer rounded-md border"
              style={{ backgroundColor: value }}
            />
          </PopoverTrigger>
        </div>
        <PopoverContent align="start" className="flex flex-col gap-2.5">
          <div className="colorPicker">
            <HexColorPicker
              color={value}
              onChange={(c) => onChange(c)}
              className="custom w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Input
                type="text"
                value={value.startsWith("var(--") ? "#" : value}
                onChange={(e) => {
                  let input = e.target.value.replace(/[^0-9a-fA-F]/g, "")
                  if (input.length > 6) input = input.slice(0, 6)
                  const formatted = `#${input}`
                  onChange(formatted)
                }}
                className="focus-visible:outline-primary h-10 w-full rounded-md border px-2 py-1 text-base uppercase"
              />
            </div>
            <button
              onClick={pickColor}
              title="Pick a color"
              className="hover:bg-muted flex size-10 cursor-pointer items-center justify-center rounded-md border"
            >
              <Pipette className="size-4.5" />
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
