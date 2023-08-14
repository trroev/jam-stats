"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Artist,
  FavArtistProps,
  Show,
  TopTrackProps,
  Track,
  UserPillProps,
} from "@/types"
// import { useCompletion } from "ai/react"
import { motion } from "framer-motion"
import { User } from "lucide-react"

import useSpotify from "@/lib/hooks/useSpotify"
import useWindowSize from "@/lib/hooks/useWindowSize"
import gear from "@/lib/images/gear.svg"
import wave from "@/lib/images/spotifyWaves.svg"
import { popularityDescription } from "@/lib/util/util"
import AIMusicRecs from "@/components/ai-music-recs"
import Card from "@/components/card"

const ulClasses =
  "flex flex-col justify-center items-center gap-1 w-full lg:grid lg:grid-flow-row lg:grid-cols-4 lg:gap-8 lg:justify-items-end lg:px-4"
const sectionHeaderClasses =
  "flex justify-start text-4xl text-greenAccent font-bold mb-4"
const liClasses = "w-full"

export default function Profile() {
  const [loading, setLoading] = useState(true)

  const user = useSpotify()
  const size = useWindowSize()
  const waveHeight = Math.floor(size.height ? size.height * 1.2 : 0)
  const artistDescription = popularityDescription(user.averageArtistPopularity)
  const trackDescription = popularityDescription(user.averageTrackPopularity)
  const waveSize = {
    width: size.width ? Math.floor(size.width * 0.35) : 0,
    height: size.height ? Math.floor(size.height * 0.35) : 0,
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  if (loading) {
    return <Loading {...waveSize} />
  } else if (user.userProfile == null) {
    //should redirect to home with error message or something.
    return null
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-start py-8 max-w-5xl px-4">
        <Image
          priority
          src={wave}
          alt="wave"
          className="fixed opacity-10 -z-40 top-24"
          height={waveHeight}
        />
        <div className="flex flex-col justify-center items-start gap-8">
          <UserPill userProfile={user.userProfile} />
          <div className="flex flex-col justify-between gap-4">
            <AIMusicRecs user={user} />
            <FavArtists
              topArtists={{
                short: user.topArtists.short,
                medium: user.topArtists.medium,
                long: user.topArtists.long,
              }}
              averageArtistPopularity={user.averageArtistPopularity}
              artistDescription={artistDescription}
            />
            <TopTracks
              topTracks={{
                short: user.topTracks.short,
                medium: user.topTracks.medium,
                long: user.topTracks.long,
              }}
              averageTrackPopularity={user.averageTrackPopularity}
              trackDescription={trackDescription}
            />
            <Podcasts shows={user.shows} />
          </div>
        </div>
      </main>
    )
  }
}

const UserPill = ({ userProfile }: UserPillProps) => {
  return (
    <div className="flex justify-starts items-center rounded-full bg-black w-fit px-4 py-1 gap-2">
      {userProfile.userImage ? (
        <div className="w-6 h-6 rounded-full relative">
          <Image
            className="rounded-full"
            src={userProfile.userImage}
            alt="profile"
            fill
            objectFit="cover"
          />
        </div>
      ) : (
        <User size={25} />
      )}
      <h1>{userProfile.name}</h1>
    </div>
  )
}

const FavArtists = ({
  topArtists,
  averageArtistPopularity,
  artistDescription,
}: FavArtistProps) => {
  const [artistsToDisplay, setArtistsToDisplay] = useState<{
    time: "long" | "medium" | "short"
    artists: Artist[]
  }>({ time: "long", artists: topArtists.long })

  return (
    <div>
      <div className="flex gap-4">
        <h2 className={sectionHeaderClasses}>Fav Artists</h2>
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
              setArtistsToDisplay({ time: "short", artists: topArtists.short })
            }
          }}
        >
          Last 4 Weeks
        </button>
      </div>
      <ul className={ulClasses}>
        {artistsToDisplay.artists.map((artist, i) => (
          <motion.li
            className={liClasses}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.2 }}
            key={i}
          >
            <Card artist={artist} index={i} />
          </motion.li>
        ))}
      </ul>
      <motion.li
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: (artistsToDisplay.artists.length + 1) * 0.2,
        }}
        className="w-full mt-8 flex justify-center items-center bg-darkGrayAccent rounded-md border-black border-2 gap-8"
      >
        <h2 className="text-2xl font-bold bg-greenAccent text-black p-6 rounded-full">
          {averageArtistPopularity.toFixed(0)}
        </h2>
        <span className="text-sm">{artistDescription}</span>
      </motion.li>
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
    <div>
      <div className="flex gap-4">
        <h2 className={sectionHeaderClasses}>Top Tracks</h2>
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
      </div>
      <ul className={ulClasses}>
        {tracksToDisplay.tracks.map((track, i) => (
          <motion.li
            className={liClasses}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
              delay: i * 0.2 + 0.2,
            }}
            key={i}
          >
            <Card track={track} index={i} />
          </motion.li>
        ))}
      </ul>
      <motion.li
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: (tracksToDisplay.tracks.length + 1) * 0.2,
        }}
        className="w-full mt-8 flex justify-center items-center bg-darkGrayAccent rounded-md border-black border-2 gap-8"
      >
        <h2 className="text-2xl font-bold bg-greenAccent text-black p-6 rounded-full">
          {averageTrackPopularity.toFixed(0)}
        </h2>
        <span className="text-sm">{trackDescription}</span>
      </motion.li>
    </div>
  )
}

const Podcasts = ({ shows }: { shows: Show[] }) => {
  return (
    <div>
      <h2 className={sectionHeaderClasses}>Podcasts</h2>
      <ul className={ulClasses}>
        {shows.map((show, i) => (
          <motion.li
            className={liClasses}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.2 }}
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
