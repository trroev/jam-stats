"use client"

import Image from "next/image"
import { Artist } from "@/types"

export default function ArtistCard(artist: Artist) {
  return (
    <li key={artist.name} className="flex items-center">
      <a
        href={artist.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4"
      >
        {artist.image && (
          <Image
            src={artist.image}
            alt={artist.name}
            width={100}
            height={100}
            className="rounded-full"
          />
        )}
      </a>
      <span>{artist.name}</span>
    </li>
  )
}
