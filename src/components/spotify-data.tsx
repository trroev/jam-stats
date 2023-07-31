import Image from "next/image"
import { Artist } from "@/types"

import useSpotify from "@/lib/hooks/useSpotify"

import ArtistCard from "./artist-card"
import TrackCard from "./track-card"

export function SpotifyData() {
  const { topArtists, topTracks, userProfile } = useSpotify()

  if (!userProfile) {
    return null
  }

  return (
    <div>
      <h1 className="flex justify-center">Welcome, {userProfile.name}!</h1>
      <div>
        <h2 className="flex justify-center">Your top 10 Artists:</h2>
        <ul className="grid grid-cols-4 gap-3">
          {topArtists.map((artist: Artist) => (
            <ArtistCard {...artist} />
          ))}
        </ul>
      </div>
      <div>
        <h2 className="flex justify-center">Your top 10 Track:</h2>
        <ul className="grid grid-cols-4 gap-3">
          {topTracks.map((track) => (
            <TrackCard {...track} />
          ))}
        </ul>
      </div>
    </div>
  )
}
