"use client"

import Image from "next/image"
import { Artist } from "@/types"

interface ArtistCardProps{
  artist: Artist
  index: number
}

export default function ArtistCard({artist, index}: ArtistCardProps) {
  return (
    <li
      key={artist.name}
      className="flex items-center justify-center relative w-80 h-fit bg-darkGrayAccent border-2 border-black px-8 py-4"
    >
      <span className="absolute -top-2 -left-1 text-3xl font-bold">{(index + 1)}</span>
      <div className="w-1/2">
        <h3 className="absolute top-8 left-4 text-2xl font-bold overflow-visible z-10">
          {artist.name}
        </h3>
        <span className="absolute bottom-12 left-4 z-10 text-sm w-1/2">
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
          <div className="bg-black rounded-full relative">
            {artist.image && (
              <Image
                src={artist.image}
                alt={artist.name}
                width={100}
                height={100}
                className="rounded-full w-full opacity-70"
              />
            )}
            <div className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-greenAccent flex justify-center items-center">
              <span className="text-black">{artist.popularity}</span>
            </div>
          </div>
        </a>
      </div>
    </li>
  )
}
