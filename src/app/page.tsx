"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()
  console.log({ session, status })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello, Statify</h1>
      {status === "unauthenticated" && (
        <button
          className="rounded-md p-2 border border-slate-900"
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}
        >
          Sign In with Spotify
        </button>
      )}
      {status === "authenticated" && (
        <button
          className="rounded-md p-2 border border-slate-900"
          onClick={(e) => {
            e.preventDefault()
            signOut({ callbackUrl: "/" })
          }}
        >
          Sign Out
        </button>
      )}
    </main>
  )
}
