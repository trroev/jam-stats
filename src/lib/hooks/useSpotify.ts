import { useEffect, useState } from "react"
import { Artist, Track, UserProfile, UserShow } from "@/types"
import { useSession } from "next-auth/react"
import { sortObjectByValues, metaGenres, popularityDescription, getMostAndLeastPopularTrack, getMostAndLeastPopularArtist } from "../util/util"

export default function useSpotify(): {
  topArtists: Artist[]
  topTracks: Track[]
  userProfile: UserProfile | null
  userShows: UserShow[]
  userGenres: { [key: string]: number}
  showTitleList: string[]
  averageTrackPopularity: number
  averageArtistPopularity: number
  mostPopularTrack: Track
  leastPopularTrack: Track
  mostPopularArtist: Artist
  leastPopularArtist: Artist
} {
  const { data: session } = useSession()
  const [topArtists, setTopArtists] = useState<Artist[]>([])
  const [topTracks, setTopTracks] = useState<Track[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [userShows, setUserShows] = useState<UserShow[]>([])
  const [userGenres, setUserGenres] = useState<{ [key: string]: number}>({})
  const showTitleList = userShows.map((show: UserShow) => show.name)
  const averageTrackPopularity = topTracks.reduce((acc: number, track: Track) => {
    acc += track.popularity
    return acc
  }, 0) / topTracks.length
  const averageArtistPopularity = topArtists.reduce((acc: number, artist: Artist) => {
    acc += artist.popularity
    return acc
  }, 0) / topArtists.length
  const tasteDescription = popularityDescription(Math.floor(averageArtistPopularity))
  const [mostPopularTrack, leastPopularTrack] = getMostAndLeastPopularTrack(topTracks)
  const [mostPopularArtist, leastPopularArtist] = getMostAndLeastPopularArtist(topArtists)

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
            "https://api.spotify.com/v1/me/top/artists?time_range=medium_term",
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
          const genres: { [key: string]: number } = data.items.reduce(
            (acc: any, artist: any) => {
              artist.genres.forEach((genre: string) => {
                if (acc[genre]){
                  acc[genre] += 1
                  if(genre.split(" ").length > 1){
                    const splitGenre = genre.split(" ")
                    splitGenre.forEach((g: string) => {
                      if (acc[g]){
                        acc[g] += 1
                      } else {
                        metaGenres.includes(g) ? acc[g] = 1 : null
                      }
                    })
                  }
                } else {
                  acc[genre] = 1
                  if(genre.split(" ").length > 1){
                    const splitGenre = genre.split(" ")
                    splitGenre.forEach((g: string) => {
                      if (acc[g]){
                        acc[g] += 1
                      } else {
                        metaGenres.includes(g) ? acc[g] = 1 : null
                      }
                    })
                  }
                }
              })
              const sortedGenres = sortObjectByValues(acc)
              return sortedGenres
            },
            {}
          )
          console.log("GENRES: ", genres)
          setUserGenres(genres)

          // mapping the retrieved data to the Artist interface and setting it in the topArtists state
          const artists: Artist[] = data.items.map((artist: any) => {
            const image = artist.images.length > 0 ? artist.images[0].url : null
            const spotifyUrl = `https://open.spotify.com/artist/${artist.id}`
            return {
              name: artist.name,
              image: image,
              spotifyUrl: spotifyUrl,
              popularity: artist.popularity,
              genres: artist.genres,
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
            "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=20",
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

          const tracks: Track[] = data.items.map((track: any) => {
            return {
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              image: track.album.images[0].url,
              popularity: track.popularity,
              spotifyUrl: track.external_urls.spotify,
              explicit: track.explicit,
            }
          })

          setTopTracks(tracks)
        }
      } catch (error) {
        // handle network or other errors
        console.error("Error fetching Spotify user data:", error)
      }
    }

    const fetchSpotifyShowData = async () => {
      try {
        if (session && session.accessToken) {
          const response = await fetch("https://api.spotify.com/v1/me/shows", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          })

          if (!response.ok) {
            // handle non-successful response (e.g. if access token is expired)
            console.error("Failed to fetch Spotify show data:", response)
            return
          }

          const data = await response.json()
          console.log("SHOW DATA: ", data)
          
          const shows: UserShow[] = data.items.map((item: any) => {
            const image = item.show.images.length > 0 ? item.show.images[0].url : null
            const spotifyUrl = `https://open.spotify.com/show/${item.show.id}`
            return {
              name: item.show.name,
              image: image,
              spotifyUrl: spotifyUrl,
              explicit: item.show.explicit,
            }
          })
          
          setUserShows(shows)
        }
      } catch (error) {
        console.error("Error fetching Spotify user show data:", error)
      }
    }
    console.log(tasteDescription)

    // call the functions to fetch the data when the session changes
    fetchSpotifyUserData()
    fetchSpotifyUserTopArtists()
    fetchSpotifyUserTopTracks()
    fetchSpotifyShowData()
  }, [session])

  return { topArtists, topTracks, userProfile, userShows, userGenres, showTitleList, averageTrackPopularity, averageArtistPopularity, mostPopularTrack, leastPopularTrack, mostPopularArtist, leastPopularArtist }
}
