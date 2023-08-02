"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { User } from "lucide-react"

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
      <main className="flex min-h-screen flex-col items-center justify-start py-8">
        <Image
          priority
          src={wave}
          alt="wave"
          className="fixed opacity-10 -z-40 top-24"
          height={waveHeight}
        />
        <div className="flex flex-col justify-center items-start gap-4">
          <div className="flex justify-starts items-center rounded-full bg-black w-fit px-4 py-1 gap-2">
            {userProfile.userImage ? (
              <div className="w-6 h-6 rounded-full relative">
                <Image
                  className="rounded-full"
                  src={userProfile.userImage}
                  alt="profile"
                  fill
                  objectFit="cover"
                />
              </div>
            ) : (
              <User size={25} />
            )}
            <h1>{userProfile.name}</h1>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div>
              <h2 className="flex justify-start text-4xl text-greenAccent font-bold mb-4">
                Fav Artists
              </h2>
              <ul className="flex flex-col gap-4">
                {topArtists.map((artist, i) => (
                  <motion.li
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.2 }}
                    key={i}
                  >
                    <ArtistCard artist={artist} index={i} />
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="flex justify-start text-4xl text-greenAccent font-bold mb-4">
                Top Tracks
              </h2>
              <ul className="flex flex-col gap-4">
                {topTracks.map((track, i) => (
                  <motion.li
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.2 + 0.2 }}
                    key={i}
                  >
                    <TrackCard track={track} index={i} />
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
