"use client"

import Image from "next/image"
import { Artist, Track } from "@/types"

interface CardProps {
  track?: Track
  artist?: Artist
  index: number
}

export default function Card({ track, artist, index }: CardProps) {
  return (
    <div className="flex items-center justify-center relative w-60 h-fit bg-darkGrayAccent border-2 border-black p-2 rounded-md">
      <span className="absolute -top-3 -left-1 text-xl font-bold">
        {index + 1}
      </span>
      <div className="w-1/2">
        <h3 className="absolute top-6 left-4 text-lg font-bold overflow-visible z-10">
          {track ? track.name : artist ? artist.name : "something went wrong"}
        </h3>
        <span className="absolute bottom-4 left-4 z-10 text-xs w-1/2">
          {artist
            ? artist.genres.length > 1
              ? `${artist.genres[0]}/ ${artist.genres[1]}`
              : `${artist.genres[0]}`
            : track
            ? track.artist
            : "something went wrong"}
        </span>
      </div>
      <div className="w-1/2">
        <a
          href={artist ? artist.spotifyUrl : track ? track.spotifyUrl : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="relative"
        >
          <div className="bg-black rounded-md relative">
            {artist && artist.image ? (
              <Image
                src={artist.image}
                alt={artist.name}
                width={100}
                height={100}
                className="rounded-md w-full opacity-70"
              />
            ) : track && track.image ? (
              <Image
                src={track.image}
                alt={track.name}
                width={100}
                height={100}
                className="rounded-md w-full opacity-70"
              />
            ) : (
              "something went wrong"
            )}
          </div>
        </a>
      </div>
    </div>
  )
}
