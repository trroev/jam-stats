import { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types"

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

export interface TopItems{
  short: ContentItemArray
  medium: ContentItemArray
  long: ContentItemArray
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

export interface SingleSelectTimeFrameProps {
  topItems: TopItems,
  itemsToDisplay: {time: "long" | "medium" | "short", items: ContentItemArray},
  setItemsToDisplay: React.Dispatch<React.SetStateAction<{
    time: "long" | "medium" | "short";
    items: ContentItemArray;
}>>,
}

export type ContentItemArray = Artist[] | Track[] | Show[]

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
  userGenres: Genre[]
}

export interface HeaderProps {
  user: UserProfile
  display: string
  setDisplay: React.Dispatch<React.SetStateAction<string>>
}

export interface UserPillProps {
  userProfile: UserProfile
}

export interface AIPodcastsProps {
  user: SpotifyData
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

export interface TasteDescriptionProps {
  description: string
  averageXPopularity: number
}

export interface SiteConfig {
  title: string
  description: string
  author: string[]
  website: string
  keywords: string[]
  url: string
  openGraph: {
    title: string
    description: string
    url: string
    site_name: string
    images: string
    type: OpenGraphType
    locale: string
  }
  icons: {
    icon: string
    shortcut: string
    apple: string
  }
  links: string
  manifest: string
}
