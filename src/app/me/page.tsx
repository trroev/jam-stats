"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import useSpotify from "@/lib/hooks/useSpotify"
import useWindowSize from "@/lib/hooks/useWindowSize"
import wave from "@/lib/images/spotifyWaves.svg"
import ArtistCard from "@/components/artist-card"
import TrackCard from "@/components/track-card"

export default function Profile() {
  const [loading, setLoading] = useState(true)
  const { topArtists, topTracks, userProfile } = useSpotify()

  const size = useWindowSize()
  const waveHeight = Math.floor(size.height ? size.height * 1.2 : 0)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
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
            duration: 1.5,
            ease: "backInOut",
            times: 1,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </div>
    )
  } else if (userProfile == null) {
    //should redirect to home with error message or something.
    return null
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Image
          priority
          src={wave}
          alt="wave"
          className="fixed opacity-10 -z-40 top-24"
          height={waveHeight}
        />
        <div>
          <h1 className="flex justify-center">Welcome, {userProfile.name}!</h1>
          <div className="flex justify-between gap-4">
            <div>
              <h2 className="flex justify-start text-4xl text-greenAccent font-bold mb-4">
                Fav Artists
              </h2>
              <ul className="flex flex-col gap-4">
                {topArtists.map((artist, i) => (
                  <ArtistCard key={artist.name} artist={artist} index={i} />
                ))}
              </ul>
            </div>
            <div>
              <h2 className="flex justify-start text-4xl text-greenAccent font-bold mb-4">
                Top Tracks
              </h2>
              <ul className="flex flex-col gap-4">
                {topTracks.map((track, i) => (
                  <TrackCard key={track.image} track={track} index={i} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
