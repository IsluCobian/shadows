import {
  MoreVertical,
  ArrowDown,
  ArrowUp,
  ChevronsUp,
  ChevronsDown,
} from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
} from "./ui/context-menu"
import { ContextMenuTrigger } from "@radix-ui/react-context-menu"

type Props = {
  index: number
  total: number
  children: React.ReactNode
  onMove: (from: number, to: number) => void
}

export default function LayerReorderMenu({
  index,
  total,
  onMove,
  children,
}: Props) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-40">
        <ContextMenuItem
          disabled={index === 0}
          onClick={() => onMove(index, index - 1)}
        >
          <ArrowUp className="mr-2 size-4" />
          Move Up
        </ContextMenuItem>
        <ContextMenuItem
          disabled={index === total - 1}
          onClick={() => onMove(index, index + 1)}
        >
          <ArrowDown className="mr-2 size-4" />
          Move Down
        </ContextMenuItem>
        <ContextMenuItem
          disabled={index === 0}
          onClick={() => onMove(index, 0)}
        >
          <ChevronsUp className="mr-2 size-4" />
          Bring to Front
        </ContextMenuItem>
        <ContextMenuItem
          disabled={index === total - 1}
          onClick={() => onMove(index, total - 1)}
        >
          <ChevronsDown className="mr-2 size-4" />
          Send to Back
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
