"use client"

import { useEffect } from "react"
import Image from "next/image"
import { AIPodcastsProps } from "@/types"
import { useCompletion } from "ai/react"
import { motion } from "framer-motion"

import gear from "@/lib/images/gear.svg"

export default function AIPodcasts({ user }: AIPodcastsProps) {
  // extract show names from shows array and convert to a string
  const showsString = user.shows.map((show) => show.name).join(", ")

  const { completion, complete, isLoading, stop } = useCompletion({
    api: "/api/podcasts",
  })

  useEffect(() => {
    const fetchPodcastStuff = async () => {
      complete(showsString)
    }

    fetchPodcastStuff()
  }, [])

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex flex-col min-w-full justify-center items-center px-24 py-8">
          <motion.div
            animate={{
              x: [-100, -50, 0, 50, 100],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          >
            <Image src={gear} alt="loading" />
          </motion.div>
          <p className="text-center">Waiting on ChatGPT...</p>
        </div>
      ) : (
        <div className="flex flex-col w-full justify-center items-center px-4 py-8">
          <p>{completion}</p>
        </div>
      )}
    </div>
  )
}
