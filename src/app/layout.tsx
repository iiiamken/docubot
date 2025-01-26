import Navbar from "@/components/Navbar"
import Providers from "@/components/Providers"
import { Geist, Geist_Mono } from "next/font/google"
import { cn, constructMetadata } from "../lib/utils"
import "./globals.css"

import { Toaster } from "@/components/ui/toaster"
import "react-loading-skeleton/dist/skeleton.css"

import "simplebar-react/dist/simplebar.min.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = constructMetadata()
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/dokubot-icon.svg" />
      </head>
      <Providers>
        <body
          className={cn(
            "min-h-screen font-sans antialiased grainy",
            `${geistSans.variable} ${geistMono.variable} antialiased`
          )}
        >
          <Toaster />
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  )
}
