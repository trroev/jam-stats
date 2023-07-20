import "@/styles/globals.css"
import type { Metadata } from "next"

import { fontSans } from "@/lib/fonts"

import AuthProvider from "./context/AuthProvider"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen font-sans antialiased ${fontSans.variable}`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
