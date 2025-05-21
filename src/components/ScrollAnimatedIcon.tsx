import { cn } from "@/lib/utils"

export default function ScrollAnimatedIcon({
  className,
}: {
  className?: string
}) {
  return (
    <div
      className={cn(
        "border-primary flex h-12 items-end rounded-full border p-1",
        className
      )}
    >
      <div className="bg-primary animate-scroll size-4 rounded-full" />
    </div>
  )
}
