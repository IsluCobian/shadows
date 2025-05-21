import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BoxShadow Studio",
  description:
    "Easily build and preview custom shadow boxes. Play with layers, colors, and style to get the perfect look.",
  keywords: [
    "box shadow",
    "css shadows",
    "tailwind shadows",
    "shadow editor",
    "ui tool",
    "tailwind box shadow generator",
    "visual shadow editor",
    "design shadows",
    "generate box shadows",
  ],
  authors: [{ name: "Luis Cobian", url: "https://cobian.dev" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="BoxShadow Studio" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2">
            <ThemeToggle />
          </div>
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
