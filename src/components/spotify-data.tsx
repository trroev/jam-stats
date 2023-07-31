import Image from "next/image"

import useSpotify from "@/lib/hooks/useSpotify"

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
          {topArtists.map((artist) => (
            <li key={artist.name} className="flex items-center">
              <a
                href={artist.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4"
              >
                {artist.image && (
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                )}
              </a>
              <span>{artist.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="flex justify-center">Your top 10 Tracks:</h2>
        <ul className="grid grid-cols-4 gap-3">
          {topTracks.map((track) => (
            <li key={track.name} className="flex items-center">
              <h3>
                {track.name} by {track.artist}
              </h3>
              <h3>{track.album}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
