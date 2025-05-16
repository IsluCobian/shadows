import ShadowControl, { Shadow } from "./ShadowControls"

interface ShadowSectionProps {
  shadow: Shadow
  setShadow: (shadow: Shadow) => void
}

export default function ShadowSection({
  shadow,
  setShadow,
}: ShadowSectionProps) {
  return (
    <div className="flex w-64 flex-col gap-4">
      <h3 className="text-lg font-bold">Shadows</h3>
      <ShadowControl value={shadow} onChange={setShadow} />
    </div>
  )
}
