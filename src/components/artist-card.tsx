"use client"

import Image from "next/image"
import { Artist } from "@/types"

interface ArtistCardProps {
  artist: Artist
  index: number
}

export default function ArtistCard({ artist, index }: ArtistCardProps) {
  return (
    <div className="flex items-center justify-center relative w-60 h-fit bg-darkGrayAccent border-2 border-black px-8 py-4">
      <span className="absolute -top-2 -left-1 text-xl font-bold">
        {index + 1}
      </span>
      <div className="w-1/2">
        <h3 className="absolute top-4 left-4 text-lg font-bold overflow-visible z-10">
          {artist.name}
        </h3>
        <span className="absolute bottom-4 left-4 z-10 text-xs w-1/2">
          {artist.genres.length > 1
            ? `${artist.genres[0]}/ ${artist.genres[1]}`
            : `${artist.genres[0]}`}
        </span>
      </div>
      <div className="w-1/2">
        <a
          href={artist.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative"
        >
          <div className="bg-black rounded-md relative">
            {artist.image && (
              <Image
                src={artist.image}
                alt={artist.name}
                width={100}
                height={100}
                className="rounded-md w-full opacity-70"
              />
            )}
          </div>
        </a>
      </div>
    </div>
  )
}
