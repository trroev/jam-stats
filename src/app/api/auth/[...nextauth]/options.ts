import type { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import SpotifyProvider from "next-auth/providers/spotify"

import { LOGIN_URL } from "@/lib/spotify"

async function refreshAccessToken(token: JWT) {
  const params = new URLSearchParams()
  params.append("grant_type", "refresh_token")
  params.append("refresh_token", token.refreshToken)

  const authHeader = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64")

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + authHeader,
    },
    body: params,
  })
  const data = await response.json()
  return {
    ...token,
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? token.refreshToken,
    expiresIn: Date.now() + data.expires_in * 1000,
  }
}

export const options: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: LOGIN_URL,
    }),
  ],
  // pages: {
  //   signIn: "/",
  // },
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: any }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresIn = account.expires_at
        return token
      }
      // access token has not expired
      if (token.expiresIn && Date.now() < (token.expiresIn as number) * 1000) {
        return token
      }
      // access token has expired
      return await refreshAccessToken(token)
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.accessToken = token.accessToken
      return session
    },
  },
}
