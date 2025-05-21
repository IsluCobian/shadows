"use client"
import BoxControls from "@/components/BoxControls"
import EditableBox from "@/components/EditableBox"
import Header from "@/components/Header"
import ScrollAnimatedIcon from "@/components/ScrollAnimatedIcon"
import ShadowCodePreview from "@/components/ShadowCodePreview"
import { Shadow } from "@/components/ShadowControls"
import ShadowSection from "@/components/ShadowSection"
import Link from "next/link"
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
    canvasColor: "var(--muted)",
  })

  const [shadows, setShadows] = useState<Shadow[]>([
    {
      offsetX: 0,
      offsetY: 4,
      blur: 10,
      spread: 0,
      color: "rgba(0,0,0,0.40)",
    },
  ])
  return (
    <div
      className="bg-muted flex min-h-dvh w-full"
      style={{ backgroundColor: boxStyles.canvasColor }}
    >
      <Header />
      <div className="flex w-full flex-col items-center justify-center md:flex-row">
        <div className="sticky top-0 z-0 flex min-h-dvh flex-1 items-center justify-center md:min-h-auto">
          <EditableBox styles={{ ...boxStyles, shadows }} />
          <ScrollAnimatedIcon className="absolute bottom-2 left-1/2 -translate-x-1/2 md:hidden" />
        </div>
        <div className="bg-card z-10 flex w-full flex-col items-start justify-start space-y-5 rounded-t-xl border-t p-6 md:absolute md:top-0 md:left-0 md:m-3 md:w-72 md:rounded-xl md:border md:pt-0">
          <ShadowSection shadows={shadows} onChange={setShadows} />
        </div>
        <div className="z-10 flex w-full flex-col items-start justify-start md:absolute md:top-0 md:right-0 md:m-3 md:w-64 md:space-y-5">
          <div className="bg-card w-full p-6 md:rounded-xl md:border">
            <BoxControls styles={boxStyles} setStyles={setBoxStyles} />
          </div>
          <div className="bg-card w-full p-6 md:rounded-xl md:border">
            <ShadowCodePreview shadows={shadows} />
          </div>
        </div>
        <div className="bg-card z-10 flex w-full justify-center pb-6 md:absolute md:bottom-2 md:left-1/2 md:w-auto md:-translate-x-1/2 md:bg-transparent md:p-0">
          <Link
            href="https://x.com/CobianOG"
            target="_blank"
            className="bg-primary/20 text-primary hover:bg-primary/30 rounded-full px-4 py-1 font-medium transition-colors duration-200"
          >
            @CobianOG
          </Link>
        </div>
      </div>
    </div>
  )
}
