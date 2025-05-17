export default function Header() {
  return (
    <div className="bg-background fixed top-0 z-50 flex h-16 w-full items-center border-b px-3">
      <div className="flex items-end gap-2">
        <h1 className="text-xl leading-none font-bold">Shadow Generator</h1>
        <span className="text-muted-foreground text-xs leading-none">
          by Luis Cobian
        </span>
      </div>
    </div>
  )
}
