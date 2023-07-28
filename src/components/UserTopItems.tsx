import { FC, useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"

interface UserTopItemsProps {}

interface Artist {
  name: string
  image: string
  spotifyUrl: string
}

const UserTopItems: FC<UserTopItemsProps> = ({}) => {
  const { data: session, status } = useSession()
  const [topArtists, setTopArtists] = useState<Artist[]>([])

  useEffect(() => {
    const fetchSpotifyUserTopItems = async () => {
      try {
        if (session && session.accessToken) {
          const response = await fetch(
            "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=5",
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          )

          if (!response.ok) {
            // Handle non-successful response (e.g., if access token is expired)
            console.error("Failed to fetch Spotify user data:", response)
            return
          }

          const data = await response.json()
          console.log(data)

          const artists: Artist[] = data.items.map((artist: any) => {
            const image = artist.images.length > 0 ? artist.images[0].url : null
            const spotifyUrl = `https://open.spotify.com/artist/${artist.id}`
            return {
              name: artist.name,
              image: image,
              spotifyUrl: spotifyUrl,
            }
          })

          setTopArtists(artists)
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Error fetching Spotify user data:", error)
      }
    }

    fetchSpotifyUserTopItems()
  }, [session])

  return (
    <div>
      <h1 className="flex justify-center">Top 10 Artists:</h1>
      <ul className="grid grid-cols-4 gap 4">
        {topArtists.map((artist) => (
          <li key={artist.name} className="flex items-center p-3">
            <a
              href={artist.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {artist.image && (
                <Image
                  src={artist.image}
                  alt={artist.name}
                  width={50}
                  height={50}
                  className="mr-4"
                />
              )}
            </a>
            <span>{artist.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserTopItems
