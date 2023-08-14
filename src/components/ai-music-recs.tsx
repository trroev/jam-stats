"use client"

import { Artist, TopArtists } from "@/types"
import { useCompletion } from "ai/react"

interface AIMusicRecsProps {
  user: {
    topArtists: TopArtists
  }
}

export default function AIMusicRecs({ user }: AIMusicRecsProps) {
  // combine the top artists arrays from different time ranges into a single array
  const allTopArtists = [
    ...user.topArtists.long,
    ...user.topArtists.medium,
    ...user.topArtists.short,
  ]

  // create a set to store unique artist names
  const uniqueTopArtists = new Set(
    allTopArtists.map((artist: Artist) => artist.name)
  )

  // convert the set of unique artists into a comma-separated string
  const topArtistsString = Array.from(uniqueTopArtists).join(", ")

  const { completion, complete } = useCompletion({
    api: "/api/music-recs",
  })

  const getRecs = (e: any) => {
    e.preventDefault()
    complete(topArtistsString)
  }

  return (
    <>
      <p>{completion}</p>
      <button onClick={getRecs}>Get Music Recommendations</button>
    </>
  )
}