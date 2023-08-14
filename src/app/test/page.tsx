"use client"

import { useCompletion } from "ai/react"

import useSpotify from "@/lib/hooks/useSpotify"

export default function Completion() {
  const user = useSpotify()
  const artistArray = user.topArtists.long.map((artist) => artist.name)
  const topArtistsString = artistArray.join(", ")

  const { completion, input, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: "/api/music-recs",
    })

  const getRecs = (e: any) => {
    setInput(topArtistsString)
    handleSubmit(e)
  }

  console.log(topArtistsString)

  return (
    <div>
      <p>{completion}</p>
      <form onSubmit={getRecs}>
        <button type="submit">Get band Recs</button>
      </form>
    </div>
  )
}
