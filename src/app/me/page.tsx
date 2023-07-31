"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import useWindowSize from "@/lib/hooks/useWindowSize"
import wave from "@/lib/images/spotifyWaves.svg"
import { SpotifyData } from "@/components/spotify-data"

export default function Profile() {
  const [loading, setLoading] = useState(true)

  const size = useWindowSize()
  const waveSize = {
    width: size.width ? Math.floor(size.width * 0.35) : 0,
    height: size.height ? Math.floor(size.height * 0.35) : 0,
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen gap-8">
        <motion.div
          className="bg-greenAccent h-32 w-32"
          animate={{
            opacity: [0.2, 0.4, 0.6, 0.8, 1],
            scale: [1, 1.5, 2, 3, 1],
            rotate: [0, 270, 180, 90, 0],
            borderRadius: ["0%", "25%", "40%", "50%", "0%"],
          }}
          transition={{
            duration: 3,
            ease: "backInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </div>
    )
  } else {
    return (
      <main className="flex min-h-screen max-h-screen flex-col items-center justify-center p-24 overflow-clip ">
        <SpotifyData />
      </main>
    )
  }
}
