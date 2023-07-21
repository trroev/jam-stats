"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"

import useWindowSize from "../lib/hooks/useWindowSize"
import logo from "../lib/images/spotifyWaves.svg"

export default function Home() {
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  // console.log({ session, status })
  // console.log(session?.accessToken)

  const size = useWindowSize()
  const logoSize = {
    width: size.width ? Math.floor(size.width * 0.35) : 0,
    height: size.height ? Math.floor(size.height * 0.35) : 0,
  }

  // useEffect(() => {
  //   async function f() {
  //     if (session && session.accessToken) {
  //       const response = await fetch("https://api.spotify.com/v1/me", {
  //         headers: {
  //           Authorization: `Bearer ${session.accessToken}`,
  //         },
  //       })
  //       const data = await response.json()
  //       console.log(data)
  //       // setPlaylists(data.playlists.items)
  //     }
  //   }
  //   f()
  // }, [session])

  return (
    <main className="flex min-h-screen max-h-screen flex-col items-center justify-center p-24 overflow-clip">
      <Image
        className="fixed -top-10 lg:top-unset lg:-bottom-40 -left-20 lg:-left-60 xl:-left-80 z-10 rotate-135 lg:rotate-45"
        width={logoSize.width}
        height={logoSize.height}
        src={logo}
        alt="Spotify Logo Waves"
      />
      <h1 className="text-5xl font-bold justify-self-center place-self-center text-greenAccent leading-loose tracking-wider">
        Statify
      </h1>
      {status === "unauthenticated" && (
        <button
          className="rounded-md p-2 border border-slate-900 justify-self-end"
          onClick={(e) => {
            e.preventDefault()
            // will update callbackUrl to user dashboard once that is set up
            signIn("spotify", { callbackUrl: "/" })
          }}
        >
          Sign In with Spotify
        </button>
      )}
      {status === "authenticated" && (
        <>
          <h2>Hello, {session?.user?.name}</h2>
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
      <div className="bg-grayAccent absolute bottom-0 w-full max-w-5xl h-28"></div>
    </main>
  )
}
