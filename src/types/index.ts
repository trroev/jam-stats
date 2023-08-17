export interface Artist {
  name: string
  image: string
  spotifyUrl: string
  genres: string[]
  popularity: number
}

export interface TopArtists {
  short: Artist[]
  medium: Artist[]
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
  short: Track[]
  medium: Track[]
  long: Track[]
}

export interface UserProfile {
  name: string
  email: string
  id: string
  userImage: string | null
}

export interface Show {
  name: string
  image: string
  spotifyUrl: string
  explicit: boolean
}

export type TimeFrame = "allTime" | "lastSixMonths" | "lastFourWeeks"

export interface TopTrackProps {
  topTracks: TopTracks
  averageTrackPopularity: number
  trackDescription: string
}

export interface FavArtistProps {
  topArtists: TopArtists
  averageArtistPopularity: number
  artistDescription: string
}

export interface HeaderProps {
  user: UserProfile
  display: string
  setDisplay: React.Dispatch<React.SetStateAction<string>>
}

export interface UserPillProps {
  userProfile: UserProfile
}

export interface AIMusicRecsProps {
  user: {
    topArtists: TopArtists
  }
}

export interface AIPodcastsProps {
  user: {
    shows: Show[]
  }
}

export interface SpotifyData {
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
  showTitleList: string[]
  averageArtistPopularity: number
  averageTrackPopularity: number
  authStatus: number
}

export interface SpotifyError {
  status: number
}

export interface Genre {
  genre: string
  count: number
}

export interface UserGenreProps {
  genres: Genre[]
}