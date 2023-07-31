"use client"

import Image from "next/image"
import { Track } from "@/types"

export default function TrackCard(track: Track) {
  return (
    <li
      key={track.name}
      className="flex items-center justify-center relative w-80 h-fit border-b-2 border-black px-8 py-4"
    >
      <div className="w-1/2 flex flex-col justify-start items-start overflow-x-visible ">
        <h3 className="text-2xl font-bold z-10">{track.name}</h3>
        <span className="text-sm z-10">{track.artist}</span>
        <span className="text-sm z-10">{track.album}</span>
      </div>
      <div className="w-1/2">
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
    </li>
  )
}
