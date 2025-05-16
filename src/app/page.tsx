"use client"
import BoxControls from "@/components/BoxControls"
import EditableBox from "@/components/EditableBox"
import Header from "@/components/Header"
import ShadowCodePreview from "@/components/ShadowCodePreview"
import { Shadow } from "@/components/ShadowControls"
import ShadowSection from "@/components/ShadowSection"
import { useState } from "react"

export default function Home() {
  const [boxStyles, setBoxStyles] = useState({
    width: 300,
    height: 300,
    backgroundColor: "#ffffff",
    borderRadius: {
      topLeft: 8,
      topRight: 8,
      bottomRight: 8,
      bottomLeft: 8,
    },
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    canvasColor: "var(--muted)",
  })

  const [shadows, setShadows] = useState<Shadow[]>([])
  return (
    <div
      className="bg-muted flex min-h-dvh w-full"
      style={{ backgroundColor: boxStyles.canvasColor }}
    >
      <Header />
      <div className="flex w-full flex-col items-center justify-center md:flex-row">
        <div className="flex min-h-dvh flex-1 items-center justify-center md:min-h-auto">
          <EditableBox styles={{ ...boxStyles, shadows }} />
        </div>
        <div className="bg-card flex w-full flex-col items-start justify-start space-y-5 p-6 md:absolute md:inset-y-0 md:left-0 md:mt-14 md:w-70 md:border-r md:p-3 md:px-4">
          <ShadowSection shadows={shadows} onChange={setShadows} />
        </div>
        <div className="bg-card flex w-full flex-col items-start justify-start space-y-5 p-6 md:absolute md:inset-y-0 md:right-0 md:mt-14 md:w-64 md:border-l md:p-3 md:px-4">
          <BoxControls styles={boxStyles} setStyles={setBoxStyles} />
          <ShadowCodePreview shadows={shadows} />
        </div>
      </div>
    </div>
  )
}
