import { cn } from "@/lib/utils"
import { useState } from "react"

type ToggleButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  onToggle?: (value: boolean) => void
}
export default function ToggleButton({
  children,
  className,
  onToggle,
  ...props
}: ToggleButtonProps) {
  const [isOn, setIsOn] = useState(false)
  const toggle = () => {
    const newVal = !isOn
    setIsOn(newVal)
    onToggle?.(newVal)
  }
  return (
    <button
      type="button"
      className={cn(
        "hover:bg-muted inline-flex cursor-pointer items-center rounded-lg px-2 py-1 text-sm transition-colors duration-200 ease-in-out data-[state=on]:bg-blue-200 data-[state=on]:text-blue-400 [&_svg]:mr-1 [&_svg]:size-4",
        className
      )}
      onClick={toggle}
      data-state={isOn ? "on" : "off"}
      {...props}
    >
      {children}
    </button>
  )
}
