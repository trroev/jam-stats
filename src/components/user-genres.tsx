import { UserGenreProps } from "@/types"
import { motion } from "framer-motion"

export default function UserGenres(genres: UserGenreProps) {
  const highestCount = genres.genres[0].count
  const textStyles = "text-lightPrimary z-10 font-bold text-shadow"

  return (
    <div className="w-full">
      <h1 className="flex justify-start text-xl text-greenAccent font-bold">
        Genres
      </h1>
      <div className="flex flex-col gap-2">
        {genres.genres.map((genre, i) => {
          const widthPercentage: number = (genre.count / highestCount) * 100
          return (
            <div className="w-full flex flex-col">
              <div className="w-full h-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercentage}%` }}
                  transition={{ duration: 0.2, delay: i * 0.1 }}
                  className="h-full bg-black rounded-md"
                />
              </div>
              <div className="flex gap-4">
                <p className={textStyles}>{i + 1 + "."}</p>
                <p className={textStyles}>{genre.genre}</p>
                <p className={textStyles}>{genre.count}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
