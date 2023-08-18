import "@/styles/globals.css"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"

import { siteConfig } from "@/config/site"
import { raleway } from "@/lib/fonts"

import AuthProvider from "./context/AuthProvider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author[0],
      url: "https://www.mattgehrls.com/",
    },
    {
      name: siteConfig.author[1],
      url: "https://www.trevormathiak.dev",
    },
  ],
  openGraph: {
    title: siteConfig.openGraph.title,
    description: siteConfig.openGraph.description,
    url: siteConfig.openGraph.url,
    siteName: siteConfig.openGraph.title,
    images: siteConfig.openGraph.images,
    locale: siteConfig.openGraph.locale,
    type: siteConfig.openGraph.type,
  },
  // icons: {
  //   icon: siteConfig.icons.icon,
  //   shortcut: siteConfig.icons.shortcut,
  //   apple: siteConfig.icons.apple,
  // },
  manifest: siteConfig.manifest,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen font-sans antialiased ${raleway.variable} bg-darkPrimary text-lightPrimary flex justify-center items-start`}
      >
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
