"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Artist,
  FavArtistProps,
  Genre,
  Show,
  TopTrackProps,
  Track,
} from "@/types"
// import { useCompletion } from "ai/react"
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

const ulClasses =
  "flex flex-col justify-center items-center gap-1 w-full lg:grid lg:grid-flow-row lg:grid-cols-4 lg:justify-items-end"
const sectionHeaderClasses =
  "flex justify-start text-4xl text-greenAccent font-bold"
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
        <p>
          Spotify declined our requests. Your session probably expired. Please
          login again.
        </p>
        <button
          className="border-2 border-greenAccent"
          onClick={(e) => {
            e.preventDefault()
            // will update callbackUrl to user dashboard once that is set up
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
      <main className="flex min-h-screen flex-col items-center justify-start max-w-5xl">
        <Image
          priority
          src={wave}
          alt="wave"
          className="fixed opacity-10 -z-40 top-24"
          height={waveHeight}
        />
        <div className="flex flex-col justify-center items-start gap-8">
          <div className="relative flex flex-col justify-center items-end w-full gap-2">
            <Header
              user={user.userProfile}
              display={display}
              setDisplay={setDisplay}
            />
            <UserPill userProfile={user.userProfile} />
          </div>
          <div className="flex flex-col justify-between gap-4">
            {display === "artists" ? (
              <div className="flex flex-col justify-center items-start gap-8 px-2">
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
                <AIMusicRecs user={user} />
              </div>
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
              <div className="flex flex-col justify-center items-start gap-8 px-2">
                <Podcasts shows={user.shows} />
                <AIPodcasts user={user} />
              </div>
            )}
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
  const [artistsToDisplay, setArtistsToDisplay] = useState<{
    time: "long" | "medium" | "short"
    artists: Artist[]
  }>({ time: "long", artists: topArtists.long })

  return (
    <div>
      <div className="flex gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: animationDuration * 2 }}
        >
          <h2 className={sectionHeaderClasses}>Fav Artists</h2>
        </motion.div>
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: animationDuration * 2,
            delay: animationDelay * 2,
          }}
        >
          <button
            className={
              artistsToDisplay.time === "long"
                ? "text-greenAccent font-bold underline"
                : ""
            }
            onClick={() => {
              if (artistsToDisplay.time === "long") {
                return
              } else {
                setArtistsToDisplay({ time: "long", artists: topArtists.long })
              }
            }}
          >
            All Time
          </button>
          <button
            className={
              artistsToDisplay.time === "medium"
                ? "text-greenAccent font-bold underline"
                : ""
            }
            onClick={() => {
              if (artistsToDisplay.time === "medium") {
                return
              } else {
                setArtistsToDisplay({
                  time: "medium",
                  artists: topArtists.medium,
                })
              }
            }}
          >
            Last 6 Months
          </button>
          <button
            className={
              artistsToDisplay.time === "short"
                ? "text-greenAccent font-bold underline"
                : ""
            }
            onClick={() => {
              if (artistsToDisplay.time === "short") {
                return
              } else {
                setArtistsToDisplay({
                  time: "short",
                  artists: topArtists.short,
                })
              }
            }}
          >
            Last 4 Weeks
          </button>
        </motion.div>
      </div>
      <ul className={ulClasses}>
        {artistsToDisplay.artists.map((artist, i) => (
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
            <Card artist={artist} index={i} />
          </motion.li>
        ))}
      </ul>
      <div className="flex justify-center items-center gap-4">
        <TasteDescription
          description={artistDescription}
          averageXPopularity={averageArtistPopularity}
        />
        <UserGenres genres={userGenres} />
      </div>
    </div>
  )
}

const TopTracks = ({
  topTracks,
  averageTrackPopularity,
  trackDescription,
}: TopTrackProps) => {
  const [tracksToDisplay, setTracksToDisplay] = useState<{
    time: "long" | "medium" | "short"
    tracks: Track[]
  }>({ time: "long", tracks: topTracks.long })
  return (
    <div className="px-2">
      <div className="flex gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: animationDuration * 2 }}
        >
          <h2 className={sectionHeaderClasses}>Top Tracks</h2>
        </motion.div>
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: animationDuration * 2,
            delay: animationDelay * 2,
          }}
        >
          <button
            className={
              tracksToDisplay.time === "long"
                ? "text-greenAccent font-bold underline"
                : ""
            }
            onClick={() => {
              if (tracksToDisplay.time === "long") {
                return
              } else {
                setTracksToDisplay({ time: "long", tracks: topTracks.long })
              }
            }}
          >
            All Time
          </button>
          <button
            className={
              tracksToDisplay.time === "medium"
                ? "text-greenAccent font-bold underline"
                : ""
            }
            onClick={() => {
              if (tracksToDisplay.time === "medium") {
                return
              } else {
                setTracksToDisplay({
                  time: "medium",
                  tracks: topTracks.medium,
                })
              }
            }}
          >
            Last 6 Months
          </button>
          <button
            className={
              tracksToDisplay.time === "short"
                ? "text-greenAccent font-bold underline"
                : ""
            }
            onClick={() => {
              if (tracksToDisplay.time === "short") {
                return
              } else {
                setTracksToDisplay({ time: "short", tracks: topTracks.short })
              }
            }}
          >
            Last 4 Weeks
          </button>
        </motion.div>
      </div>
      <ul className={ulClasses}>
        {tracksToDisplay.tracks.map((track, i) => (
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
            <Card track={track} index={i} />
          </motion.li>
        ))}
      </ul>
      <TasteDescription
        description={trackDescription}
        averageXPopularity={averageTrackPopularity}
      />
    </div>
  )
}

const Podcasts = ({ shows }: { shows: Show[] }) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: animationDuration * 2 }}
        className="mb-8"
      >
        <h2 className={sectionHeaderClasses}>Podcasts</h2>
      </motion.div>
      <ul className={ulClasses}>
        {shows.map((show, i) => (
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
