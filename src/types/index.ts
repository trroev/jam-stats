export interface Artist {
  name: string
  image: string
  spotifyUrl: string
  genres: string[]
  popularity: number
}

export interface TopArtists {
  short: Artist[],
  medium: Artist[],
  long: Artist[]
}

export interface Track {
  name: string
  artist: string
  album: string
  image: string
  popularity: number
  spotifyUrl: string
  explicit?: boolean
}

export interface TopTracks {
  short: Track[],
  medium: Track[],
  long: Track[]
}

export interface UserProfile {
  name: string
  email: string
  id: string
  userImage: string | null
}

export interface UserShow {
  name: string
  image: string
  spotifyUrl: string
  explicit: boolean
}

export type TimeFrame = "allTime" | "lastSixMonths" | "lastFourWeeks"

export interface TopTrackProps{
  topTracks: TopTracks
  averageTrackPopularity: number
  trackDescription: string
}


export interface FavArtistProps{
  topArtists: TopArtists
  averageArtistPopularity: number
  artistDescription: string
}
export interface UserPillProps{
  userProfile: UserProfile
}
