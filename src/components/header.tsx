import Image from "next/image"
import { HeaderProps } from "@/types"
import { User } from "lucide-react"

const Header = ({ user, display, setDisplay }: HeaderProps) => {
  return (
    <div className="bg-black w-full py-4 px-8 flex justify-evenly items-center rounded-b-md">
      <div className="w-1/3 relative flex justify-center items-center">
        <button
          className={
            display === "artists"
              ? "text-greenAccent text-xl font-bold transition-all duration-100"
              : "transition-all duration-100"
          }
          onClick={() => setDisplay("artists")}
        >
          Artists
          <div
            className={
              display === "artists"
                ? "w-full h-1 bg-greenAccent transition-all duration-200 opacity-100"
                : "w-0 transition-all duration-200 opacity-0"
            }
          />
        </button>
      </div>
      <div className="w-1/3 relative flex justify-center items-center">
        <button
          className={
            display === "tracks"
              ? "text-greenAccent text-xl font-bold transition-all duration-100"
              : "transition-all duration-100"
          }
          onClick={() => setDisplay("tracks")}
        >
          Tracks
          <div
            className={
              display === "tracks"
                ? "w-full h-1 bg-greenAccent transition-all duration-200 opacity-100"
                : "w-0 transition-all duration-200 opacity-0"
            }
          />
        </button>
      </div>
      <div className="w-1/3 relative flex justify-center items-center">
        <button
          className={
            display === "shows"
              ? "text-greenAccent text-xl font-bold transition-all duration-100"
              : "transition-all duration-100"
          }
          onClick={() => setDisplay("shows")}
        >
          Podcasts
          <div
            className={
              display === "shows"
                ? "w-full h-1 bg-greenAccent transition-all duration-200 opacity-100"
                : "w-0 transition-all duration-200 opacity-0"
            }
          />
        </button>
      </div>
    </div>
  )
}

export default Header
