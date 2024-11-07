"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { merriweather } from "@/lib/fonts"
import useWindowSize from "@/lib/hooks/useWindowSize"
import loginButton from "@/lib/images/spotifyLoginButton.svg"
import spotifyLogo from "@/lib/images/spotifyLogo.svg"
import wave from "@/lib/images/spotifyWaves.svg"
import JamStatsLogo from "@/components/JamStatsLogo"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const size = useWindowSize()
  const waveSize = {
    width: size.width ? Math.floor(size.width * 0.35) : 0,
    height: size.height ? Math.floor(size.height * 0.35) : 0,
  }

  if (status === "authenticated") {
    router.push("/me")
  }

  return (
    <main className="flex h-screen max-h-screen flex-col items-center justify-center p-24 overflow-clip relative">
      <div className="flex flex-col items-center gap-12">
        <div className="text-greenAccent flex items-end">
          <JamStatsLogo width={100} />
          <div className="flex flex-col gap-1">
            <h1 className="text-5xl lg:text-7xl font-bold text-greenAccent leading-loose tracking-wider flex">
              {siteConfig.title}
            </h1>
            <p className="text-xl lg:text-2.5xl lg:leading-8 font-bold text-greenAccent leading-loose tracking-wider flex">
              quantify your groove
            </p>
          </div>
        </div>
        {status === "unauthenticated" && (
          <button
            className="border-[1px] border-greenAccent"
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
      </div>
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
  return (
    <div className="absolute bottom-0 w-full max-w-5xl h-24">
      <div className="flex flex-col lg:flex-row justify-center items-center h-full gap-2">
        <div className={"flex gap-4 items-center"}>
          <p
            className={`${merriweather.variable} font-serif text-white text-xl`}
          >
            powered by
          </p>
        </div>
        <div className={"flex gap-4 items-center"}>
          <Image height={45} src={spotifyLogo} alt="Spotify's Logo" />
        </div>
      </div>
    </div>
  )
}
