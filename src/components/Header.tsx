import { Icons } from "./Icons"

export default function Header() {
  return (
    <div className="bg-background fixed top-0 z-50 flex h-16 w-full items-center border-b px-3">
      <div className="flex items-end gap-2">
        <div className="flex items-center gap-1">
          <Icons.BoxStudio className="size-12" />
          <h1 className="flex flex-col text-xl leading-none font-bold">
            BoxShadow
            <span className="-mt-1.5 text-base font-normal"> Studio</span>
          </h1>
        </div>
      </div>
    </div>
  )
}
