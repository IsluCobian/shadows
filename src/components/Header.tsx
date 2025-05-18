import { Icons } from "./Icons"

export default function Header() {
  return (
    <div className="bg-background fixed top-0 z-50 flex h-16 w-full items-center border-b px-3">
      <div className="flex items-end gap-2">
        <h1 className="inline-flex items-center gap-1 text-xl leading-none font-bold">
          <Icons.BoxStudio className="size-10" />
          BoxShadow Studio
        </h1>
      </div>
    </div>
  )
}
