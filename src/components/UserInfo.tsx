import { FC, useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"

interface UserInfoProps {}

const UserInfo: FC<UserInfoProps> = ({}) => {
  const { data: session } = useSession()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [id, setId] = useState("")
  const [userImage, setUserImage] = useState("")

  useEffect(() => {
    const fetchSpotifyUserData = async () => {
      try {
        if (session && session.accessToken) {
          const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          })

          if (!response.ok) {
            // Handle non-successful response (e.g., if access token is expired)
            console.error("Failed to fetch Spotify user data:", response)
            return
          }

          const data = await response.json()
          console.log(data)
          setName(data.display_name)
          setEmail(data.email)
          setId(data.id)
          setUserImage(data.images[1]?.url)
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Error fetching Spotify user data:", error)
      }
    }

    fetchSpotifyUserData()
  }, [session])

  return (
    <div>
      <h1>Name: {name}</h1>
      <h1>Email: {email}</h1>
      <h1>Id: {id}</h1>
      <Image
        className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
        src={userImage}
        width={200}
        height={200}
        alt={session?.user?.name ?? "Profile Pic"}
        priority={true}
      />
    </div>
  )
}

export default UserInfo
