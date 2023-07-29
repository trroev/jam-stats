import { useEffect, useState } from "react"
import { Artist, Tracks, UserProfile } from "@/types"
import { useSession } from "next-auth/react"

export default function useSpotify(): {
  topArtists: Artist[]
  topTracks: Tracks[]
  userProfile: UserProfile | null
} {
  const { data: session } = useSession()
  const [topArtists, setTopArtists] = useState<Artist[]>([])
  const [topTracks, setTopTracks] = useState<Tracks[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    // fetch the user's profile data
    const fetchSpotifyUserData = async () => {
      try {
        if (session && session.accessToken) {
          const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          })

          if (!response.ok) {
            // handle non-successful response (e.g. if access token is expired)
            console.error("Failed to fetch Spotify user data:", response)
            return
          }

          const data = await response.json()
          console.log("USER DATA: ", data)

          // extracting relevant information from the response and setting it in the userProfile state
          setUserProfile({
            name: data.display_name,
            email: data.email,
            id: data.id,
            userImage: data.images[1]?.url || null,
          })
        }
      } catch (error) {
        console.error("Error fetching Spotify user data:", error)
      }
    }

    // fetch the user's top 10 artists data
    const fetchSpotifyUserTopArtists = async () => {
      try {
        if (session && session.accessToken) {
          const response = await fetch(
            "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10",
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          )

          if (!response.ok) {
            // handle non-successful response
            console.error("Failed to fetch Spotify user data:", response)
            return
          }

          const data = await response.json()
          console.log("USER TOP ARTISTS: ", data)

          // mapping the retrieved data to the Artist interface and setting it in the topArtists state
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
        // handle network or other errors
        console.error("Error fetching Spotify user data:", error)
      }
    }
    // fetch the user's top 10 tracks data
    const fetchSpotifyUserTopTracks = async () => {
      try {
        if (session && session.accessToken) {
          const response = await fetch(
            "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10",
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          )

          if (!response.ok) {
            // handle non-successful response
            console.error("Failed to fetch Spotify user data:", response)
            return
          }

          const data = await response.json()
          console.log("USER TOP TRACKS: ", data)

          // mapping the retrieved data to the Artist interface and setting it in the topArtists state
          const tracks: Tracks[] = data.items.map((track: any) => {
            // const artist = track.artists.length > 0 ? track.artists[0].name : null
            // const album = `https://open.spotify.com/artist/${artist.id}`
            return {
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
            }
          })

          setTopTracks(tracks)
        }
      } catch (error) {
        // handle network or other errors
        console.error("Error fetching Spotify user data:", error)
      }
    }

    // call the functions to fetch the data when the session changes
    fetchSpotifyUserData()
    fetchSpotifyUserTopArtists()
    fetchSpotifyUserTopTracks()
  }, [session])

  return { topArtists, topTracks, userProfile }
}
