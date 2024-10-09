import { HeaderProps } from "@/types"

const Header = ({ display, setDisplay }: HeaderProps) => {
  return (
    <div className="bg-black min-w-full py-4 px-8 flex justify-evenly items-center">
      <div className="w-1/3 relative flex justify-center items-center">
        <button
          className={
            display === "artists"
              ? "text-greenAccent text-xl font-bold transition-all motion-reduce:transition-none duration-100"
              : "transition-all motion-reduce:transition-none duration-100"
          }
          onClick={() => setDisplay("artists")}
        >
          Artists
          <div
            className={
              display === "artists"
                ? "w-full h-1 bg-greenAccent transition-all motion-reduce:transition-none duration-200 opacity-100"
                : "w-0 transition-all motion-reduce:transition-none duration-200 opacity-0"
            }
          />
        </button>
      </div>
      <div className="w-1/3 relative flex justify-center items-center">
        <button
          className={
            display === "tracks"
              ? "text-greenAccent text-xl font-bold transition-all motion-reduce:transition-none duration-100"
              : "transition-all motion-reduce:transition-none duration-100"
          }
          onClick={() => setDisplay("tracks")}
        >
          Tracks
          <div
            className={
              display === "tracks"
                ? "w-full h-1 bg-greenAccent transition-all motion-reduce:transition-none duration-200 opacity-100"
                : "w-0 transition-all motion-reduce:transition-none duration-200 opacity-0"
            }
          />
        </button>
      </div>
      <div className="w-1/3 relative flex justify-center items-center">
        <button
          className={
            display === "shows"
              ? "text-greenAccent text-xl font-bold transition-all motion-reduce:transition-none duration-100"
              : "transition-all motion-reduce:transition-none duration-100"
          }
          onClick={() => setDisplay("shows")}
        >
          Podcasts
          <div
            className={
              display === "shows"
                ? "w-full h-1 bg-greenAccent transition-all motion-reduce:transition-none duration-200 opacity-100"
                : "w-0 transition-all motion-reduce:transition-none duration-200 opacity-0"
            }
          />
        </button>
      </div>
    </div>
  )
}

export default Header
