"use client"

import { useEffect, useState } from "react"
import { AIMusicRecsProps, Artist } from "@/types"
import { useCompletion } from "ai/react"

import { createArrayFromRecResponse } from "@/lib/util/util"

export default function AIMusicRecs({ user }: AIMusicRecsProps) {
  // combine the top artists arrays from different time ranges into a single array
  const allTopArtists = [
    ...user.topArtists.long,
    ...user.topArtists.medium,
    ...user.topArtists.short,
  ]

  const [recs, setRecs] = useState<string[]>([])

  // create a set to store unique artist names
  const uniqueTopArtists = new Set(
    allTopArtists.map((artist: Artist) => artist.name)
  )

  // convert the set of unique artists into a comma-separated string
  const topArtistsString = Array.from(uniqueTopArtists).join(", ")

  const { completion, complete, isLoading, stop } = useCompletion({
    api: "/api/music-recs",
    onFinish: (_prompt, completion) => {
      setRecs(createArrayFromRecResponse(completion))
    },
  })

  const getRecs = (e: any) => {
    e.preventDefault()
    complete(topArtistsString)
  }

  useEffect(() => {
    console.log(recs)
  }, [recs])

  return (
    <>
      {/* {textArray.length > 0 && 
        textArray.map((text, index) => {
          return <Card key={index} text={text} />
        })} */}
      <p>{completion}</p>
      {isLoading ? (
        <button onClick={stop}>Stop Generating</button>
      ) : (
        <button disabled={isLoading} onClick={getRecs}>
          Get Music Recommendations
        </button>
      )}
    </>
  )
}
