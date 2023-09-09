"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Artist,
  ContentItemArray,
  FavArtistProps,
  Genre,
  SingleSelectTimeFrameProps,
  SpotifyData,
  TopTrackProps,
  Track,
} from "@/types"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"

import useSpotify from "@/lib/hooks/useSpotify"
import useWindowSize from "@/lib/hooks/useWindowSize"
import gear from "@/lib/images/gear.svg"
import loginButton from "@/lib/images/spotifyLoginButton.svg"
import wave from "@/lib/images/spotifyWaves.svg"
import { calculateUserGenres, popularityDescription } from "@/lib/util/util"
import AIMusicRecs from "@/components/ai-music-recs"
import AIPodcasts from "@/components/ai-podcasts"
import Card from "@/components/card"
import Header from "@/components/header"
import TasteDescription from "@/components/taste-description"
import UserGenres from "@/components/user-genres"
import UserPill from "@/components/user-pill"

const selectedTimeClasses =
  "text-greenAccent font-bold underline text-sm lg:text-lg"
const notSelectedTimeClasses = "text-xs lg:text-lg"
const ulClasses =
  "flex flex-col justify-center items-center gap-1 w-full lg:grid lg:grid-flow-row lg:grid-cols-3 lg:justify-items-end px-2 lg:px-0"
const sectionHeaderDivClasses =
  "flex justify-between max-w-full gap-4 my-8 mx-2"
const sectionHeaderClasses =
  "flex justify-start text-2xl lg:text-4xl text-greenAccent font-bold"
const liClasses = "w-full"
const animationDuration = 0.2
const animationDelay = 0.1

export default function Profile() {
  const [loading, setLoading] = useState(true)
  const [display, setDisplay] = useState("artists")
  const user = useSpotify()
  const size = useWindowSize()
  const waveHeight = Math.floor(size.height ? size.height * 1.2 : 0)
  const artistDescription = popularityDescription(user.averageArtistPopularity)
  const trackDescription = popularityDescription(user.averageTrackPopularity)
  const waveSize = {
    width: size.width ? Math.floor(size.width * 0.35) : 0,
    height: size.height ? Math.floor(size.height * 0.35) : 0,
  }
  const userGenres: Genre[] = calculateUserGenres([
    ...user.topArtists.long,
    ...user.topArtists.medium,
    ...user.topArtists.short,
  ])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  if (loading) {
    return <Loading {...waveSize} />
  } else if (user.userProfile == null || user.authStatus === 401) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center max-w-5xl">
        <p className="flex justify-center items-center p-4">
          Spotify declined our requests. Your session probably expired. Please
          login again.
        </p>
        <button
          className="border-2 border-greenAccent"
          onClick={(e) => {
            e.preventDefault()
            signIn("spotify", { callbackUrl: "/me" })
          }}
        >
          <Image
            priority
            height={60}
            src={loginButton}
            alt="login with spotify"
          />
        </button>
      </main>
    )
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-start w-full max-w-5xl">
        <Image
          priority
          src={wave}
          alt="wave"
          className="fixed opacity-10 -z-40 top-24"
          height={waveHeight}
        />
        <div className="flex flex-col justify-center items-start gap-8 w-full max-w-full">
          <div className="relative flex flex-col justify-center items-end w-full gap-2">
            <Header
              user={user.userProfile}
              display={display}
              setDisplay={setDisplay}
            />
            <UserPill userProfile={user.userProfile} />
          </div>
          <div className="flex flex-col justify-between items-start gap-4 w-full max-w-full p-2">
            {display === "artists" ? (
              <FavArtists
                topArtists={{
                  short: user.topArtists.short,
                  medium: user.topArtists.medium,
                  long: user.topArtists.long,
                }}
                averageArtistPopularity={user.averageArtistPopularity}
                artistDescription={artistDescription}
                userGenres={userGenres}
              />
            ) : display === "tracks" ? (
              <TopTracks
                topTracks={{
                  short: user.topTracks.short,
                  medium: user.topTracks.medium,
                  long: user.topTracks.long,
                }}
                averageTrackPopularity={user.averageTrackPopularity}
                trackDescription={trackDescription}
              />
            ) : (
              <Podcasts {...user} />
            )}
          </div>
          <hr className="h-[1px] bg-white w-full"></hr>
          <div className="w-full flex justify-center items-center pb-4 pt-1">
            <p>
              Data and Images from <a>Spotify</a>
            </p>
          </div>
        </div>
      </main>
    )
  }
}

const FavArtists = ({
  topArtists,
  averageArtistPopularity,
  artistDescription,
  userGenres,
}: FavArtistProps) => {
  const [itemsToDisplay, setItemsToDisplay] = useState<{
    time: "long" | "medium" | "short"
    items: ContentItemArray
  }>({ time: "long", items: topArtists.long })

  return (
    <div>
      <div className={sectionHeaderDivClasses}>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: animationDuration * 2 }}
        >
          <h2 className={sectionHeaderClasses}>Fav Artists</h2>
        </motion.div>
        <SingleSelectTimeFrame
          topItems={topArtists}
          setItemsToDisplay={setItemsToDisplay}
          itemsToDisplay={itemsToDisplay}
        />
      </div>
      <ul className={ulClasses}>
        {itemsToDisplay.items.map((artist, i) => (
          <motion.li
            className={liClasses}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: animationDuration,
              delay: i * animationDelay,
            }}
            key={i}
          >
            <Card artist={artist as Artist} index={i} />
          </motion.li>
        ))}
      </ul>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-center gap-4 bg-darkGrayAccent border-2 border-black mt-4">
        <TasteDescription
          description={artistDescription}
          averageXPopularity={averageArtistPopularity}
        />
        <UserGenres genres={userGenres} />
      </div>
      <AIMusicRecs {...topArtists} />
    </div>
  )
}

const TopTracks = ({
  topTracks,
  averageTrackPopularity,
  trackDescription,
}: TopTrackProps) => {
  const [itemsToDisplay, setItemsToDisplay] = useState<{
    time: "long" | "medium" | "short"
    items: ContentItemArray
  }>({ time: "long", items: topTracks.long })
  return (
    <div>
      <div className={sectionHeaderDivClasses}>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: animationDuration * 2 }}
        >
          <h2 className={sectionHeaderClasses}>Top Tracks</h2>
        </motion.div>
        <SingleSelectTimeFrame
          topItems={topTracks}
          itemsToDisplay={itemsToDisplay}
          setItemsToDisplay={setItemsToDisplay}
        />
      </div>
      <ul className={ulClasses}>
        {itemsToDisplay.items.map((track, i) => (
          <motion.li
            className={liClasses}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              ease: "easeInOut",
              duration: animationDuration,
              delay: i * animationDelay + animationDelay,
            }}
            key={i}
          >
            <Card track={track as Track} index={i} />
          </motion.li>
        ))}
      </ul>
      <div className="flex justify-center items-center gap-4 bg-darkGrayAccent  border-2 border-black p-4 mt-8">
        <TasteDescription
          description={trackDescription}
          averageXPopularity={averageTrackPopularity}
        />
      </div>
    </div>
  )
}

const Podcasts = (user: SpotifyData) => {
  return (
    <div className="w-full">
      <div className={sectionHeaderDivClasses}>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: animationDuration * 2 }}
        >
          <h2 className={sectionHeaderClasses}>Podcasts</h2>
        </motion.div>
      </div>
      <ul className={ulClasses}>
        {user.shows &&
          user.shows.map((show, i) => (
            <motion.li
              className={liClasses}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: animationDuration,
                delay: i * animationDelay,
              }}
              key={i}
            >
              <Card show={show} index={i} />
            </motion.li>
          ))}
      </ul>
      <div className="flex justify-center items-center gap-4 p-4 mt-8">
        <AIPodcasts user={user} />
      </div>
    </div>
  )
}

const Loading = (waveSize: { height: number; width: number }) => {
  return (
    <div className="flex min-h-screen max-h-screen flex-col items-center justify-center p-24 overflow-clip gap-4">
      <motion.div
        animate={{
          opacity: [1, 0.5, 1],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: 1,
          repeat: Infinity,
        }}
      >
        <Image src={gear} alt="loading" />
      </motion.div>
      <div className="flex justify-center items-center text-greenAccent">
        <h1>Working</h1>
        <motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          .
        </motion.span>
      </div>
      <Image
        priority
        className="fixed -top-10 lg:top-unset lg:-bottom-40 -left-20 lg:-left-60 xl:-left-80 z-10 rotate-135 lg:rotate-45"
        width={waveSize.width}
        height={waveSize.height}
        src={wave}
        alt="Spotify Logo Waves"
      />
    </div>
  )
}

const SingleSelectTimeFrame = ({
  topItems,
  itemsToDisplay,
  setItemsToDisplay,
}: SingleSelectTimeFrameProps) => {
  return (
    <motion.div
      className="flex gap-2 lg:gap-4"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: animationDuration * 2,
        delay: animationDelay * 2,
      }}
    >
      <button
        className={
          itemsToDisplay.time === "long"
            ? selectedTimeClasses
            : notSelectedTimeClasses
        }
        onClick={() => {
          if (itemsToDisplay.time === "long") {
            return
          } else {
            setItemsToDisplay({ time: "long", items: topItems.long })
          }
        }}
      >
        All Time
      </button>
      <button
        className={
          itemsToDisplay.time === "medium"
            ? selectedTimeClasses
            : notSelectedTimeClasses
        }
        onClick={() => {
          if (itemsToDisplay.time === "medium") {
            return
          } else {
            setItemsToDisplay({
              time: "medium",
              items: topItems.medium,
            })
          }
        }}
      >
        6 Months
      </button>
      <button
        className={
          itemsToDisplay.time === "short"
            ? selectedTimeClasses
            : notSelectedTimeClasses
        }
        onClick={() => {
          if (itemsToDisplay.time === "short") {
            return
          } else {
            setItemsToDisplay({
              time: "short",
              items: topItems.short,
            })
          }
        }}
      >
        4 Weeks
      </button>
    </motion.div>
  )
}
