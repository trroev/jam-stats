export interface Artist {
  name: string
  image: string
  spotifyUrl: string
  genres: string[]
  popularity: number
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

export interface TopTrackProps{
  topTracks: Track[]
  averageTrackPopularity: number
  trackDescription: string
}

export interface FavArtistProps{
  topArtists: Artist[]
  averageArtistPopularity: number
  artistDescription: string
}
export interface UserPillProps{
  userProfile: UserProfile
}
