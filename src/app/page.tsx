"use client"

import Image from "next/image"
import { Music2 } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"

import { merriweather } from "@/lib/fonts"
import useWindowSize from "@/lib/hooks/useWindowSize"
import openAiLogo from "@/lib/images/openAiLogo.svg"
import loginButton from "@/lib/images/spotifyLoginButton.svg"
import spotifyLogo from "@/lib/images/spotifyLogo.svg"
import wave from "@/lib/images/spotifyWaves.svg"

export default function Home() {
  const { data: session, status } = useSession()

  const size = useWindowSize()
  const waveSize = {
    width: size.width ? Math.floor(size.width * 0.35) : 0,
    height: size.height ? Math.floor(size.height * 0.35) : 0,
  }

  return (
    <main className="flex h-screen max-h-screen flex-col items-center justify-center p-24 overflow-clip relative">
      <h1 className="text-5xl lg:text-7xl lg:my-8 font-bold justify-self-center place-self-center text-greenAccent leading-loose tracking-wider flex">
        <Music2 size={30} />
        JamStats
        <Music2 size={30} />
      </h1>

      {status === "unauthenticated" && (
        <button
          className="border-2 border-greenAccent "
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
      )}
      {status === "authenticated" && (
        <>
          <h2>Hello, {session?.user?.name}</h2>
          <a href="/me">Go to Your Data</a>
          <button
            className="p-2 border border-slate-900"
            onClick={(e) => {
              e.preventDefault()
              signOut({ callbackUrl: "/" })
            }}
          >
            Sign Out
          </button>
        </>
      )}
      <LowerBanner />
      <Image
        priority
        className="fixed -top-10 lg:top-unset lg:-bottom-40 -left-20 lg:-left-60 xl:-left-80 z-10 rotate-135 lg:rotate-45 overflow-hidden"
        width={waveSize.width}
        height={waveSize.height}
        src={wave}
        alt="Spotify Logo Waves"
      />
    </main>
  )
}

const LowerBanner = () => {
  const textClasses = `${merriweather.variable} font-serif text-black text-xl`
  const divClasses = "flex gap-4 items-center"

  return (
    <div className="bg-grayAccent absolute bottom-0 w-full max-w-5xl h-24 border-t-2 lg:border-2 lg:border-b-0 border-black shadow-md">
      <div className="flex flex-col lg:flex-row justify-center items-center h-full gap-2 lg:gap-8">
        <div className={divClasses}>
          <p className={textClasses}>Powered by:</p>
        </div>
        <div className={divClasses}>
          <Image height={45} src={spotifyLogo} alt="Spotify's Logo" />
          <p className={textClasses}>&</p>
          <Image height={40} src={openAiLogo} alt="OpenAI's Logo" />
        </div>
      </div>
    </div>
  )
}
