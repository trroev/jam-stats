"use client"

import Image from "next/image"
import { Track } from "@/types"

interface TrackCardProps {
  track: Track
  index: number
}

export default function TrackCard({ track, index }: TrackCardProps) {
  return (
    <div className="flex items-center justify-center relative w-60 bg-darkGrayAccent border-2 border-black px-8 py-4">
      <span className="absolute -top-2 -left-1 text-xl font-bold">
        {index + 1}
      </span>
      <div className="w-full flex flex-col justify-start items-start overflow-x-visible ">
        <h3 className="text-lg font-bold z-10">{track.name}</h3>
        <span className="text-xs z-10">{track.artist}</span>
      </div>
      <div className="w-full">
        <div className="bg-black rounded-full relative">
          {track.image && (
            <Image
              src={track.image}
              alt={track.album}
              width={100}
              height={100}
              className="rounded-full w-full opacity-70"
            />
          )}
        </div>
      </div>
    </div>
  )
}
