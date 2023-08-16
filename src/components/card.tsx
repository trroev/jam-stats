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
    <div className="flex items-center w-full lg:items-center lg:justify-center lg:relative lg:w-60 lg:h-fit bg-transparentDarkGray border-2 border-black lg:p-2 rounded-md transition-all duration-500 delay-75">
      <span className="pl-4 lg:absolute lg:-top-3 lg:-left-1 text-xl font-bold">
        {index + 1}
      </span>
      <div className="w-full gap-8 ml-4 lg:ml-0 lg:block lg:w-1/2 transition-all duration-500 delay-75">
        <h3 className="lg:absolute lg:top-6 lg:left-4 lg:text-lg font-bold lg:overflow-visible lg:z-10 transition-all duration-500 delay-75">
          {toDisplay ? toDisplay.name : "something went wrong"}
        </h3>
        <span className="hidden md:block lg:absolute lg:bottom-4 lg:left-4 lg:z-10 lg:text-xs lg:w-1/2 transition-all duration-500 delay-75">
          {secondaryInfo}
        </span>
      </div>
      <div className="lg:w-1/2">
        <a
          href={toDisplay ? toDisplay.spotifyUrl : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="relative"
        >
          <div className="bg-black rounded-md lg:h-[110px] w-2/3 md:w-full float-right lg:w-full transition-all duration-500 delay-75">
            {
              //adding height to the div that matches square images might fix it. if the image is at the top or bottom of the square, maybe flex on the div would fix it?
              //if not flex, I'd try the commented out fill property on Image below.

              toDisplay ? (
                <Image
                  src={toDisplay.image}
                  alt={toDisplay.name}
                  width={100}
                  height={100}
                  className="rounded-md w-full opacity-70"
                  // fill={true}
                />
              ) : (
                "something went wrong"
              )
            }
          </div>
        </a>
      </div>
    </div>
  )
}
