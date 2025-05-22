import React from "react"
import { Copy } from "lucide-react"
import { Shadow } from "./ShadowControls"
import { toast } from "sonner"

type Props = {
  shadows: Shadow[]
}

export default function ShadowCodePreview({ shadows }: Props) {
  const filteredShadows = shadows.filter((s) => s.visible !== false)

  const css = filteredShadows
    .map(
      (s) =>
        `${s.inset ? "inset " : ""}${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${s.color}`
    )
    .join(", ")

  const tailwind = filteredShadows
    .map(
      (s) =>
        `${s.inset ? "inset_" : ""}${s.offsetX}px_${s.offsetY}px_${s.blur}px_${s.spread}px_${s.color.replace(
          /\s+/g,
          ""
        )}`
    )
    .join(",")

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast("Copied to clipboard")
    } catch {
      toast.error("Failed to copy")
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <h3 className="text-lg leading-none font-semibold">Generated Code</h3>
      <div className="flex flex-col gap-1">
        <label className="text-muted-foreground text-xs">CSS</label>
        <div className="relative">
          <div className="bg-background flex max-h-24 flex-wrap overflow-y-auto rounded border p-2 font-mono text-xs">
            <code className="">box-shadow: {css};</code>
            <button
              onClick={() => copy(`box-shadow: ${css};`)}
              className="text-muted-foreground hover:text-foreground absolute top-2 right-2 cursor-pointer"
              title="Copy CSS"
            >
              <Copy className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-muted-foreground text-xs">Tailwindcss</label>
        <div className="relative">
          <div className="bg-background flex overflow-x-auto rounded border p-2 font-mono text-xs text-nowrap">
            <code>shadow-[{tailwind}]</code>
            <button
              onClick={() => copy(`shadow-[${tailwind}]`)}
              className="text-muted-foreground hover:text-foreground absolute top-2 right-2 cursor-pointer"
              title="Copy Tailwind"
            >
              <Copy className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
