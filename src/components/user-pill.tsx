import { useState } from "react"
import Image from "next/image"
import { UserPillProps } from "@/types"
import { motion } from "framer-motion"
import { ChevronRight, User } from "lucide-react"
import { signOut } from "next-auth/react"

const UserPill = ({ userProfile }: UserPillProps) => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className="absolute top-[70px] flex flex-col justify-starts items-center  bg-black w-fit px-4 py-1 mr-2 transition-all motion-reduce:transition-none duration-75 delay-75">
      <div className="flex gap-2 items-center transition-all motion-reduce:transition-none duration-200 delay-100">
        {userProfile.userImage ? (
          <div className="w-6 h-6  relative">
            <Image
              className="object-cover"
              src={userProfile.userImage}
              alt="profile"
              fill
              sizes="100vw"
            />
          </div>
        ) : (
          <User size={25} />
        )}
        <h1>{userProfile.name}</h1>
        <motion.button
          initial={{ rotate: 0 }}
          animate={{ rotate: showMenu ? 90 : 0 }}
          transition={{ duration: 0.1 }}
          onClick={() => setShowMenu(!showMenu)}
        >
          <ChevronRight size={15} />
        </motion.button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{
          opacity: showMenu ? 1 : 0,
          y: showMenu ? 0 : -50,
        }}
      >
        {showMenu && (
          <motion.button
            className="py-4"
            onClick={(e) => {
              e.preventDefault()
              signOut({ callbackUrl: "/" })
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Sign Out
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}

export default UserPill
