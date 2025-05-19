import Link from "next/link"
import { Icons } from "./Icons"

export default function Header() {
  return (
    <div className="bg-background fixed top-0 left-1/2 z-0 mt-3 flex -translate-x-1/2 items-center rounded-xl border px-4 py-2">
      <div className="flex w-72 items-center justify-between">
        <div className="flex cursor-default items-center gap-1">
          <Icons.BoxStudio className="size-12" />
          <h1 className="flex flex-col pr-1.5 text-xl leading-none font-bold">
            BoxShadow
            <span className="-mt-1 text-base font-normal"> Studio</span>
          </h1>
        </div>
        <Link href="https://github.com/IsluCobian/shadows" target="_blank">
          <Icons.Github className="size-8" />
        </Link>
      </div>
    </div>
  )
}
