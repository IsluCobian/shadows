import Link from "next/link"
import { Icons } from "./Icons"

export default function Header() {
  return (
    <div className="bg-background fixed inset-x-0 top-0 z-0 m-3 flex items-center rounded-xl border p-4 md:left-1/2 md:m-0 md:mt-3 md:w-72 md:-translate-x-1/2">
      <div className="flex w-full items-center justify-between">
        <div className="flex cursor-default items-center gap-1">
          <Icons.BoxStudio className="size-9" />
          <h1 className="flex flex-col text-xl leading-none font-bold">
            BoxShadow
            <span className="text-base leading-none font-normal"> Studio</span>
          </h1>
        </div>
        <Link href="https://github.com/IsluCobian/shadows" target="_blank">
          <Icons.Github className="size-8" />
        </Link>
      </div>
    </div>
  )
}
