"use client"

import { useEffect } from "react"
import { AIPodcastsProps } from "@/types"
import { useCompletion } from "ai/react"

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
    <>{isLoading ? <p>Generating Podcast Stuff...</p> : <p>{completion}</p>}</>
  )
}
