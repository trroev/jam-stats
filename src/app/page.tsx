"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"

import { merriweather } from "@/lib/fonts"
import useWindowSize from "@/lib/hooks/useWindowSize"
import openAiLogo from "@/lib/images/openAiLogo.svg"
import loginButton from "@/lib/images/spotifyLoginButton.svg"
import spotifyLogo from "@/lib/images/spotifyLogo.svg"
import wave from "@/lib/images/spotifyWaves.svg"
import UserInfo from "@/components/UserInfo"
import UserTopItems from "@/components/UserTopItems"

export default function Home() {
  const { data: session, status } = useSession()
  // console.log({ session, status })
  // console.log(session?.accessToken)

  const size = useWindowSize()
  const logoSize = {
    width: size.width ? Math.floor(size.width * 0.35) : 0,
    height: size.height ? Math.floor(size.height * 0.35) : 0,
  }

  return (
    <main className="flex min-h-screen max-h-screen flex-col items-center justify-center p-24 overflow-clip">
      <Image
        className="fixed -top-10 lg:top-unset lg:-bottom-40 -left-20 lg:-left-60 xl:-left-80 z-10 rotate-135 lg:rotate-45"
        width={logoSize.width}
        height={logoSize.height}
        src={wave}
        alt="Spotify Logo Waves"
      />
      <h1 className="text-5xl font-bold justify-self-center place-self-center text-greenAccent leading-loose tracking-wider">
        Statify
      </h1>
      {status === "unauthenticated" && (
        <button
          onClick={(e) => {
            e.preventDefault()
            // will update callbackUrl to user dashboard once that is set up
            signIn("spotify", { callbackUrl: "/" })
          }}
        >
          <Image height={65} src={loginButton} alt="login with spotify" />
        </button>
      )}
      {status === "authenticated" && (
        <>
          <h2>Hello, {session?.user?.name}</h2>
          {/* <UserInfo /> */}
          <UserTopItems />
          <button
            className="rounded-md p-2 border border-slate-900"
            onClick={(e) => {
              e.preventDefault()
              signOut({ callbackUrl: "/" })
            }}
          >
            Sign Out
          </button>
        </>
      )}
      <div className="bg-grayAccent fixed bottom-0 w-full max-w-5xl h-28">
        <div className="flex p-8 justify-center items-center gap-4">
          <p
            className={`${merriweather.variable} font-serif font-bold text-black text-xl`}
          >
            Powered by
          </p>
          <Image height={45} src={spotifyLogo} alt="Spotify's Logo" />
          <p
            className={`${merriweather.variable} font-serif font-bold text-black text-xl`}
          >
            &
          </p>
          <Image height={45} src={openAiLogo} alt="OpenAI's Logo" />
        </div>
      </div>
    </main>
  )
}
