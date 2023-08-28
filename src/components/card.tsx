"use client"

import Image from "next/image"
import { Artist, Show, Track } from "@/types"

import logo from "../lib/images/spotifyLogoNoText.svg"

interface CardProps {
  track?: Track
  artist?: Artist
  index: number
  show?: Show
}

export default function Card({ track, artist, show, index }: CardProps) {
  const toDisplay = track ? track : artist ? artist : show ? show : undefined
  const secondaryInfo = artist ? artist.genres[0] : track ? track.artist : null

  if (!toDisplay) {
    return <div>something went wrong</div>
  } else if (toDisplay?.name.length > 30) {
    toDisplay.name = toDisplay.name.slice(0, 30) + "..."
  } else {
    toDisplay.name = toDisplay.name
  }

  const cardHeights =
    "h-[50px] min-h-[50px] md:h-[70px] lg:h-[110px] md:min-h-[70px] lg:min-h-[110px]"
  const cardWeights =
    "w-[50px] min-w-[50px] md:w-[70px] lg:w-[110px] md:min-w-[70px] lg:min-w-[110px]"
  const textDivClasses = "lg:h-1/2 max-w-1/2"

  return (
    <div className="flex justify-between items-centerlg:justify-center relative bg-transparentDarkGray border-2 border-black lg:p-2  transition-all duration-500 delay-75">
      <div
        className={
          "w-full flex justify-between items-center relative p-2 " + cardHeights
        }
      >
        <span className="font-bold absolute -top-3 -left-1">{index + 1}</span>
        <div className="flex flex-col justify-center items-start p-2">
          <div className={textDivClasses + " items-end"}>
            <h2 className="md:text-lg">{toDisplay?.name}</h2>
          </div>
          <div className={"hidden md:block wrap" + textDivClasses}>
            <p className="wrap text-sm">{secondaryInfo}</p>
          </div>
        </div>
        <a
          className="min-h-[20px] min-w-[20px] lg:absolute lg:bottom-2 lg:right-2"
          target="_blank"
          href={toDisplay?.spotifyUrl}
        >
          <Image height={20} width={20} alt="Spotify logo" src={logo} />
        </a>
      </div>
      {toDisplay ? (
        <div
          className={
            "bg-black transition-all duration-500 delay-75 flex " +
            cardHeights +
            " " +
            cardWeights
          }
        >
          <Image
            alt={`${toDisplay.name} art`}
            className="w-full"
            height={100}
            width={100}
            src={toDisplay?.image}
          />
        </div>
      ) : (
        "something went wrong"
      )}
    </div>
  )
}
