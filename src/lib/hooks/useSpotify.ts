import { useEffect, useState } from "react"
import { Artist, Show, SpotifyData, Track, UserProfile, SpotifyError } from "@/types"
import { useSession } from "next-auth/react"

import {
  mapArtists,
  mapTracks,
  metaGenres,
  popularityDescription,
} from "../util/util"

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1/me"

export default function useSpotify(): SpotifyData {
  const { data: session } = useSession()

  const [topArtistsShort, setTopArtistsShort] = useState<Artist[]>([])
  const [topArtistsMedium, setTopArtistsMedium] = useState<Artist[]>([])
  const [topArtistsLong, setTopArtistsLong] = useState<Artist[]>([])
  const [topTracksShort, setTopTracksShort] = useState<Track[]>([])
  const [topTracksMedium, setTopTracksMedium] = useState<Track[]>([])
  const [topTracksLong, setTopTracksLong] = useState<Track[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [shows, setShows] = useState<Show[]>([])
  const [authStatus, setAuthStatus] = useState<number>(0)

  const topArtists = {
    short: topArtistsShort,
    medium: topArtistsMedium,
    long: topArtistsLong,
  }
  
  const topTracks = {
    short: topTracksShort,
    medium: topTracksMedium,
    long: topTracksLong,
  }

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
      const err = error as SpotifyError
      if(err.status){
        setAuthStatus(err.status)
      }else{
        console.error("Error fetching Spotify data:", error)
      }
    }
  }

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

        setShows(shows)
      }
    } catch (error) {
      const err = error as SpotifyError
      if(err.status){
        setAuthStatus(err.status)
      }else{
        console.error("Error fetching Spotify data:", error)
      }
    }
  }

  // calculate and set userGenres
  

  useEffect(() => {
    // call the functions to fetch the data when the session changes
    fetchSpotifyUserData()
    fetchSpotifyTopArtists("short_term", setTopArtistsShort)
    fetchSpotifyTopArtists("medium_term", setTopArtistsMedium)
    fetchSpotifyTopArtists("long_term", setTopArtistsLong)
    fetchSpotifyTopTracks("short_term", setTopTracksShort)
    fetchSpotifyTopTracks("medium_term", setTopTracksMedium)
    fetchSpotifyTopTracks("long_term", setTopTracksLong)
    fetchSpotifyShowData()
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
    topArtists,
    topTracks,
    shows,
    showTitleList,
    averageArtistPopularity,
    averageTrackPopularity,
    authStatus,
  }
}
