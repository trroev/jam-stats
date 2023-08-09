"use client"

import Image from "next/image"
import { Artist, Show, Track } from "@/types"

interface CardProps {
  track?: Track
  artist?: Artist
  index: number
  show?: Show
}

export default function Card({ track, artist, show, index }: CardProps) {
  const toDisplay = track ? track : artist ? artist : show ? show : null
  const secondaryInfo = artist
    ? artist.genres.length > 1
      ? `${artist.genres[0]}/ ${artist.genres[1]}`
      : `${artist.genres[0]}`
    : track
    ? track.artist
    : null

  return (
    <div className="flex items-center justify-center relative w-60 h-fit bg-darkGrayAccent border-2 border-black p-2 rounded-md">
      <span className="absolute -top-3 -left-1 text-xl font-bold">
        {index + 1}
      </span>
      <div className="w-1/2">
        <h3 className="absolute top-6 left-4 text-lg font-bold overflow-visible z-10">
          {toDisplay ? toDisplay.name : "something went wrong"}
        </h3>
        <span className="absolute bottom-4 left-4 z-10 text-xs w-1/2">
          {secondaryInfo}
        </span>
      </div>
      <div className="w-1/2">
        <a
          href={toDisplay ? toDisplay.spotifyUrl : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="relative"
        >
          <div className="bg-black rounded-md relative">
            {toDisplay ? (
              <Image
                src={toDisplay.image}
                alt={toDisplay.name}
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
