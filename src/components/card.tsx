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
  const toDisplay = track ? track : artist ? artist : show ? show : null
  const secondaryInfo = artist ? artist.genres[0] : track ? track.artist : null

  const cardHeights = "h-[40px] md:h-[70px] lg:h-[110px]"
  const cardWeights = "w-[40px] md:w-[70px] lg:w-[110px]"
  const textDivClasses = "flex justify-start lg:h-1/2 ml-4"

  return (
    <div className="flex justify-between items-center w-full lg:justify-center relative bg-transparentDarkGray border-2 border-black lg:p-2  transition-all duration-500 delay-75">
      <div
        className={
          "w-4/5 max-w-4/5 lg:w-2/3 lg:max-w-2/3 flex flex-col justify-center relative " +
          cardHeights
        }
      >
        <span className="absolute -top-3 left-1 font-bold">{index + 1}</span>
        <div className={textDivClasses + " items-end"}>
          <h2 className="truncate font-extrabold md:text-lg">
            {toDisplay?.name}
          </h2>
        </div>
        <div className={"hidden md:block " + textDivClasses}>
          <p className="truncate text-sm">{secondaryInfo}</p>
        </div>
        <a
          className="absolute right-0 lg:bottom-0 lg:right-2"
          target="_blank"
          href={toDisplay?.spotifyUrl}
        >
          <Image height={20} width={20} alt="Spotify logo" src={logo} />
        </a>
      </div>
      {toDisplay ? (
        <div
          className={
            "bg-black float-right transition-all duration-500 delay-75 flex " +
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
