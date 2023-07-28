import Image from "next/image"

import useSpotify from "@/lib/hooks/useSpotify"

export function SpotifyData() {
  const { topArtists, userProfile } = useSpotify()

  if (!userProfile) {
    // if userProfile is not available, render loading state
    return <div>Loading...</div>
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
                  />
                )}
              </a>
              <span>{artist.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
