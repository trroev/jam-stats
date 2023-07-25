import { DefaultSession } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    refreshToken: string
  }
}
