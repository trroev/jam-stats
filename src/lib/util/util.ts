import { Artist, Track } from "@/types"
import { Type } from "typescript"

export function sortObjectByValues(obj: { [key: string]: number }) {
  const sortedEntries = Object.entries(obj).sort((a, b) => b[1] - a[1])

  return sortedEntries
}

export const metaGenres = [
  "rock",
  "pop",
  "country",
  "rap",
  "jazz",
  "indie",
  "bluegrass",
  "progressive",
  "metal",
  "classical",
  "alternative",
]

export const popularityDescription = (popularity: number) => {
  if (popularity >= 100) {
    return `Your musical taste aligns with mainstream trends, and you enjoy the latest and greatest hits from the biggest global superstars. You actively follow pop culture and are likely to be up-to-date with the latest music releases and popular trends.`
  } else if (popularity >= 50) {
    return `You have a preference for well-known artists and songs. You tend to gravitate towards music that has broader recognition and appeal, enjoying the energy and familiarity of popular tracks.`
  } else if (popularity >= 40) {
    return `Your musical taste is moderately mainstream. While you appreciate some popular artists and hits, you also seek out music that may not be on everyone's radar, allowing you to enjoy a diverse range of songs.`
  } else if (popularity >= 30) {
    return `You strike a balance between mainstream hits and lesser-known tracks. Your musical taste is versatile, allowing you to enjoy both popular chart-toppers and lesser-known songs that resonate with you on a personal level.`
  } else if (popularity >= 20) {
    return `Your musical preferences lean towards niche and alternative genres. You appreciate the creativity and experimentation found in less mainstream music, and you enjoy supporting artists who have a dedicated following.`
  } else if (popularity >= 10) {
    return `You have an eclectic taste in music, always on the lookout for hidden gems and obscure tracks from underground artists. You enjoy the thrill of discovering new sounds that most people might not have heard of yet.`
  } else {
    return `You must be trying to be different.`
  }
}

export function getMostAndLeastPopularTrack(array: Track[]) {
  const sortedArray = array.sort(
    (a: any, b: any) => b.popularity - a.popularity
  )

  return [sortedArray[0], sortedArray[sortedArray.length - 1]]
}

export function getMostAndLeastPopularArtist(array: Artist[]) {
  const sortedArray = array.sort(
    (a: any, b: any) => b.popularity - a.popularity
  )

  return [sortedArray[0], sortedArray[sortedArray.length - 1]]
}

// helper functions to map data
export const mapArtists = (items: any[]) =>
  items.map((artist: any) => ({
    name: artist.name,
    image: artist.images.length > 0 ? artist.images[0].url : null,
    spotifyUrl: `https://open.spotify.com/artist/${artist.id}`,
    popularity: artist.popularity,
    genres: artist.genres,
  }))

export const mapTracks = (items: any[]) =>
  items.map((track: any) => ({
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    image: track.album.images[0].url,
    popularity: track.popularity,
    spotifyUrl: track.external_urls.spotify,
    explicit: track.explicit,
  }))

export const extractBandsFromResponse = (response: string) => {
  // regex to match each numbered item and capture its content
  const matches = response.match(
    /\d+\.\s(.*?)(?=\n\d+\.|\n$|\nRecommended Bands|$)/g
  )
  if (matches) {
    // map over the matches and extract the band names by removing the nubmers and dots
    return matches.map((match) => match.replace(/\d+\.\s/, "").trim())
  }
  // return an empty array of no matches are found
  return []
}
