export interface Artist {
  name: string
  image: string
  spotifyUrl: string
}

export interface Tracks {
  name: string
  artist: string
  album: string
}

export interface UserProfile {
  name: string
  email: string
  id: string
  userImage: string | null
}
