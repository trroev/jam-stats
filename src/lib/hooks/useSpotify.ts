import { useEffect, useState } from "react"
import { Artist, Show, Track, UserProfile } from "@/types"
import { useSession } from "next-auth/react"

import {
  metaGenres,
  popularityDescription,
  sortObjectByValues,
} from "../util/util"

export default function useSpotify(): {
  topArtistsShort: Artist[]
  topArtistsMedium: Artist[]
  topArtistsLong: Artist[]
  topTracksShort: Track[]
  topTracksMedium: Track[]
  topTracksLong: Track[]
  userProfile: UserProfile | null
  shows: Show[]
  userGenres: [string, number][]
  showTitleList: string[]
  averageTrackPopularity: number
  averageArtistPopularity: number
} {
  const { data: session } = useSession()

  const [topArtistsShort, setTopArtistsShort] = useState<Artist[]>([])
  const [topArtistsMedium, setTopArtistsMedium] = useState<Artist[]>([])
  const [topArtistsLong, setTopArtistsLong] = useState<Artist[]>([])
  const [topTracksShort, setTopTracksShort] = useState<Track[]>([])
  const [topTracksMedium, setTopTracksMedium] = useState<Track[]>([])
  const [topTracksLong, setTopTracksLong] = useState<Track[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [shows, setshows] = useState<Show[]>([])
  const [userGenres, setUserGenres] = useState<[string, number][]>([])
  const showTitleList = shows.map((show: Show) => show.name)
  const averageTrackPopularity =
    topTracksLong.reduce((acc: number, track: Track) => {
      acc += track.popularity
      return acc
    }, 0) / topTracksLong.length
  const averageArtistPopularity =
    topArtistsLong.reduce((acc: number, artist: Artist) => {
      acc += artist.popularity
      return acc
    }, 0) / topArtistsLong.length
  const tasteDescription = popularityDescription(
    Math.floor(averageArtistPopularity)
  )

  // helper function to fetch Spotify data
  const fetchSpotifyData = async (url: string, stateSetter: Function) => {
    try {
      if (session && session.accessToken) {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })

        if (!response.ok) {
          console.error("Failed to fetch Spotify data:", response)
          return
        }

        const data = await response.json()
        console.log(data)
        stateSetter(data)
      }
    } catch (error) {
      console.error("Error fetching Spotify data:", error)
    }
  }

  // helper functions to map data
  const mapArtists = (items: any[]) =>
    items.map((artist: any) => ({
      name: artist.name,
      image: artist.images.length > 0 ? artist.images[0].url : null,
      spotifyUrl: `https://open.spotify.com/artist/${artist.id}`,
      popularity: artist.popularity,
      genres: artist.genres,
    }))

  const mapTracks = (items: any[]) =>
    items.map((track: any) => ({
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      image: track.album.images[0].url,
      popularity: track.popularity,
      spotifyUrl: track.external_urls.spotify,
      explicit: track.explicit,
    }))

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
    const fetchSpotifyUserTopArtistsShort = async () => {
      try {
        if (session && session.accessToken) {
          const response = await fetch(
            "https://api.spotify.com/v1/me/top/artists?time_range=short_term",
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

          // mapping the retrieved data to the Artist interface and setting it in the topArtists state
          const artists: Artist[] = mapArtists(data.items)

          setTopArtistsShort(artists)
        }
      } catch (error) {
        // handle network or other errors
        console.error("Error fetching Spotify user data:", error)
      }
    }
    // fetch the user's top 10 artists data
    const fetchSpotifyUserTopArtistsMedium = async () => {
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

          // mapping the retrieved data to the Artist interface and setting it in the topArtists state
          const artists: Artist[] = mapArtists(data.items)

          setTopArtistsMedium(artists)
        }
      } catch (error) {
        // handle network or other errors
        console.error("Error fetching Spotify user data:", error)
      }
    }
    const fetchSpotifyUserTopArtistsLong = async () => {
      try {
        if (session && session.accessToken) {
          const response = await fetch(
            "https://api.spotify.com/v1/me/top/artists?time_range=long_term",
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
          const genres: [string, number][] = data.items.reduce(
            (acc: any, artist: any) => {
              artist.genres.forEach((genre: string) => {
                if (acc[genre]) {
                  acc[genre] += 1
                  if (genre.split(" ").length > 1) {
                    const splitGenre = genre.split(" ")
                    splitGenre.forEach((g: string) => {
                      if (acc[g]) {
                        acc[g] += 1
                      } else {
                        metaGenres.includes(g) ? (acc[g] = 1) : null
                      }
                    })
                  }
                } else {
                  acc[genre] = 1
                  if (genre.split(" ").length > 1) {
                    const splitGenre = genre.split(" ")
                    splitGenre.forEach((g: string) => {
                      if (acc[g]) {
                        acc[g] += 1
                      } else {
                        metaGenres.includes(g) ? (acc[g] = 1) : null
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
          setUserGenres(genres)

          // mapping the retrieved data to the Artist interface and setting it in the topArtists state
          const artists: Artist[] = mapArtists(data.items)

          setTopArtistsLong(artists)
        }
      } catch (error) {
        // handle network or other errors
        console.error("Error fetching Spotify user data:", error)
      }
    }
    const fetchSpotifyUserTopTracksShort = async () => {
      try {
        if (session && session.accessToken) {
          const response = await fetch(
            "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20",
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

          const tracks: Track[] = mapTracks(data.items)

          setTopTracksShort(tracks)
        }
      } catch (error) {
        // handle network or other errors
        console.error("Error fetching Spotify user data:", error)
      }
    }
    const fetchSpotifyUserTopTracksMedium = async () => {
      try {
        if (session && session.accessToken) {
          const response = await fetch(
            "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20",
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

          const tracks: Track[] = mapTracks(data.items)

          setTopTracksMedium(tracks)
        }
      } catch (error) {
        // handle network or other errors
        console.error("Error fetching Spotify user data:", error)
      }
    }
    // fetch the user's top 10 tracks data
    const fetchSpotifyUserTopTracksLong = async () => {
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

          const tracks: Track[] = mapTracks(data.items)

          setTopTracksLong(tracks)
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

          const shows: Show[] = data.items.map((item: any) => {
            const image =
              item.show.images.length > 0 ? item.show.images[0].url : null
            const spotifyUrl = `https://open.spotify.com/show/${item.show.id}`
            return {
              name: item.show.name,
              image: image,
              spotifyUrl: spotifyUrl,
              explicit: item.show.explicit,
            }
          })

          setshows(shows)
        }
      } catch (error) {
        console.error("Error fetching Spotify user show data:", error)
      }
    }

    // call the functions to fetch the data when the session changes
    fetchSpotifyUserData()
    fetchSpotifyUserTopArtistsShort()
    fetchSpotifyUserTopArtistsMedium()
    fetchSpotifyUserTopArtistsLong()
    fetchSpotifyUserTopTracksShort()
    fetchSpotifyUserTopTracksMedium()
    fetchSpotifyUserTopTracksLong()
    fetchSpotifyShowData()
  }, [session])

  return {
    topArtistsShort,
    topArtistsMedium,
    topArtistsLong,
    topTracksShort,
    topTracksMedium,
    topTracksLong,
    userProfile,
    shows,
    userGenres,
    showTitleList,
    averageTrackPopularity,
    averageArtistPopularity,
  }
}
