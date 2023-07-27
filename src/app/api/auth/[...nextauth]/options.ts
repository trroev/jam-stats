import type { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import SpotifyProvider from "next-auth/providers/spotify"

import { LOGIN_URL } from "@/lib/spotify"

async function refreshAccessToken(token: JWT) {
  try {
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
    console.log("REFRESHED TOKEN IS: ", data)

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
      refreshToken: data.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
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
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_at! * 1000,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
        } as JWT
      }

      // access token has not expired
      if (Date.now() < token.accessTokenExpires) {
        console.log("EXISTING ACCESS TOKEN IS VALID")
        return token
      }

      // access token has expired
      console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...")
      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      if (session.user) {
        session.user.username = token.username
      }

      return session
    },
  },
}
