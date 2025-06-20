import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/src/components/theme-provider"
import { Toaster } from "@/src/components/ui/toaster"
import { MockDataProvider } from "@/src/lib/context/mock-data-context"
import FloatingNav from "@/src/components/floating-nav"
import Footer from "@/src/components/footer"
import FramerMotionProvider from "@/src/lib/framer-motion-provider"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata = {
  title: "MediaLane - Empowering Creators with Programmable IP",
  description: "The permissionless marketplace for creators to monetize digital assets and IP",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <MockDataProvider>
            <FramerMotionProvider>
              <div className="relative min-h-screen flex flex-col">
                <FloatingNav />
                <main className="flex-1">{children}</main>
                <Footer />
                <Toaster />
              </div>
            </FramerMotionProvider>
          </MockDataProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
