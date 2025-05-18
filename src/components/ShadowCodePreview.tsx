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
        `${s.offsetX}px_${s.offsetY}px_${s.blur}px_${s.spread}px_${s.color.replace(
          /\s+/g,
          ""
        )}`
    )
    .join(",")

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast("Copied to clipboard")
    } catch (error) {
      toast.error("Failed to copy")
    }
  }

  return (
    <div className="flex w-full flex-col">
      <h3 className="mb-2 text-sm font-medium">Generated Code</h3>
      <div className="mb-4">
        <label className="text-muted-foreground mb-1 text-xs">CSS</label>
        <div className="bg-background relative flex max-h-24 flex-wrap overflow-y-auto rounded border p-2 font-mono text-xs">
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

      <div>
        <label className="text-muted-foreground mb-1 text-xs">
          Tailwindcss
        </label>
        <div className="bg-background relative flex overflow-clip rounded border p-2 font-mono text-xs">
          <code>shadow-[{tailwind}]</code>
          <button
            onClick={() => copy(tailwind)}
            className="text-muted-foreground hover:text-foreground absolute top-2 right-2 cursor-pointer"
            title="Copy Tailwind"
          >
            <Copy className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
