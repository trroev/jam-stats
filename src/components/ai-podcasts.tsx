"use client"

import { AIPodcastsProps } from "@/types"
import { useCompletion } from "ai/react"

export default function AIPodcasts({ user }: AIPodcastsProps) {
  // extract show names from shows array and convert to a string
  const showsString = user.shows.map((show) => show.name).join(", ")

  const { completion, complete, isLoading, stop } = useCompletion({
    api: "/api/podcasts",
  })

  const podcastStuff = (e: any) => {
    e.preventDefault()
    complete(showsString)
  }

  return (
    <>
      <p>{completion}</p>
      {isLoading ? (
        <button onClick={stop}>Stop Generating</button>
      ) : (
        <button disabled={isLoading} onClick={podcastStuff}>
          Podcast Stuff
        </button>
      )}
    </>
  )
}
