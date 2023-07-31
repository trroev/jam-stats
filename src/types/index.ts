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
}

export interface UserProfile {
  name: string
  email: string
  id: string
  userImage: string | null
}
