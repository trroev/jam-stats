import { useEffect, useState } from "react"
import { Artist, Show, Track, UserProfile } from "@/types"
import { useSession } from "next-auth/react"

import {
  metaGenres,
  popularityDescription,
  sortObjectByValues,
} from "../util/util"

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1/me"

interface SpotifyData {
  userProfile: UserProfile | null
  topArtists: {
    short: Artist[]
    medium: Artist[]
    long: Artist[]
  }
  topTracks: {
    short: Track[]
    medium: Track[]
    long: Track[]
  }
  shows: Show[]
  userGenres: [string, number][]
  showTitleList: string[]
  averageArtistPopularity: number
  averageTrackPopularity: number
}

export default function useSpotify(): SpotifyData {
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
      await fetchSpotifyData(`${SPOTIFY_BASE_URL}`, (data: any) => {
        setUserProfile({
          name: data.display_name,
          email: data.email,
          id: data.id,
          userImage: data.images[1]?.url || null,
        })
      })
    }

    // fetch user's top Spotify artists for different time ranges
    const fetchSpotifyTopArtists = async (
      timeRange: string,
      stateSetter: Function
    ) => {
      await fetchSpotifyData(
        `${SPOTIFY_BASE_URL}/top/artists?time_range=${timeRange}`,
        (data: any) => {
          stateSetter(mapArtists(data.items))
        }
      )
    }

    // fetch user's top Spotify tracks for different time ranges
    const fetchSpotifyTopTracks = async (
      timeRange: string,
      stateSetter: Function
    ) => {
      await fetchSpotifyData(
        `${SPOTIFY_BASE_URL}/top/tracks?time_range=${timeRange}`,
        (data: any) => {
          stateSetter(mapTracks(data.items))
        }
      )
    }

    const fetchSpotifyShowData = async () => {
      try {
        if (session && session.accessToken) {
          const response = await fetch(`${SPOTIFY_BASE_URL}/shows`, {
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

    // calculate and set userGenres
    const calculateUserGenres = () => {
      const genresMap = new Map<string, number>()

      topArtistsLong.forEach((artist: Artist) => {
        artist.genres.forEach((genre: string) => {
          const genreWords = genre.split(" ")
          genreWords.forEach((g: string) => {
            if (metaGenres.includes(g)) {
              genresMap.set(g, (genresMap.get(g) || 0) + 1)
            }
          })
          if (genreWords.length === 1) {
            genresMap.set(genre, (genresMap.get(genre) || 0) + 1)
          }
        })
      })

      const genresObject: { [key: string]: number } = {}
      genresMap.forEach((value, key) => {
        genresObject[key] = value
      })

      const sortedGenres = sortObjectByValues(genresObject)
      // @ts-ignore
      setUserGenres(Object.entries(sortedGenres) as [string, number][])
    }

    // call the functions to fetch the data when the session changes
    fetchSpotifyUserData()
    fetchSpotifyTopArtists("short_term", setTopArtistsShort)
    fetchSpotifyTopArtists("medium_term", setTopArtistsMedium)
    fetchSpotifyTopArtists("long_term", setTopArtistsLong)
    fetchSpotifyTopTracks("short_term", setTopTracksShort)
    fetchSpotifyTopTracks("medium_term", setTopTracksMedium)
    fetchSpotifyTopTracks("long_term", setTopTracksLong)
    fetchSpotifyShowData()
    calculateUserGenres()
  }, [session])

  // calculate average artist and track popularity
  const averageArtistPopularity =
    topArtistsLong.reduce(
      (acc: number, artist: Artist) => acc + artist.popularity,
      0
    ) / topArtistsLong.length
  const averageTrackPopularity =
    topTracksLong.reduce(
      (acc: number, track: Track) => acc + track.popularity,
      0
    ) / topTracksLong.length

  // calculate taste description
  const tasteDescription = popularityDescription(
    Math.floor(averageArtistPopularity)
  )

  // calculate show title list
  const showTitleList = shows.map((show: Show) => show.name)

  return {
    userProfile,
    topArtists: {
      short: topArtistsShort,
      medium: topArtistsMedium,
      long: topArtistsLong,
    },
    topTracks: {
      short: topTracksShort,
      medium: topTracksMedium,
      long: topTracksLong,
    },
    shows,
    userGenres,
    showTitleList,
    averageArtistPopularity,
    averageTrackPopularity,
    // topArtistsShort,
    // topArtistsMedium,
    // topArtistsLong,
    // topTracksShort,
    // topTracksMedium,
    // topTracksLong,
    // userProfile,
    // shows,
    // userGenres,
    // showTitleList,
    // averageTrackPopularity,
    // averageArtistPopularity,
  }
}
