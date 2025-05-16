"use client"
import BoxControls from "@/components/BoxControls"
import EditableBox from "@/components/EditableBox"
import Header from "@/components/Header"
import { useState } from "react"

export default function Home() {
  const [boxStyles, setBoxStyles] = useState({
    width: 200,
    height: 200,
    backgroundColor: "#ffffff",
    borderRadius: {
      topLeft: 8,
      topRight: 8,
      bottomRight: 8,
      bottomLeft: 8,
    },
    canvasColor: "var(--muted)",
  })
  return (
    <div
      className="bg-muted flex h-dvh w-full"
      style={{ backgroundColor: boxStyles.canvasColor }}
    >
      <Header />
      <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
        <div className="flex flex-1 items-center justify-center">
          <EditableBox styles={boxStyles} />
        </div>
        <div className="bg-card flex w-full justify-center p-6 md:absolute md:inset-y-0 md:right-0 md:mt-14 md:w-auto md:border-l md:p-3 md:px-4">
          <BoxControls styles={boxStyles} setStyles={setBoxStyles} />
        </div>
      </div>
    </div>
  )
}
