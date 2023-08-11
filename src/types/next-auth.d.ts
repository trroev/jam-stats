import { DefaultSession } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    accessToken: string
    error: string
    refreshToken: string
    user: {
      name: string
      username: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string
    accessTokenExpires: number
    refreshToken: string
    username: string
  }
}
