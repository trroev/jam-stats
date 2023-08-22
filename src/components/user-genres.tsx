import { UserGenreProps } from "@/types"
import { motion } from "framer-motion"

export default function UserGenres(genres: UserGenreProps) {
  const highestCount = genres.genres[0].count
  const indexStyles =
    "text-lightPrimary z-10 font-bold text-shadow ml-2 basis-[10%]"
  const textStyles =
    "text-lightPrimary z-10 font-bold text-shadow ml-2 basis-[80%]"
  const lastText = "text-lightPrimary z-10 font-bold text-shadow ml-2 basis-[10%]"

  return (
    <div className="w-full p-4">
      <h1 className="flex justify-start text-xl text-greenAccent font-bold mb-4">
        Top Genres
      </h1>
      <div className="flex flex-col gap-2">
        {genres.genres.map((genre, i) => {
          const widthPercentage: number = (genre.count / highestCount) * 100
          return (
            <div className="w-full flex flex-col justify-center items-start relative">
              <div className="w-full h-8 absolute">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercentage}%` }}
                  transition={{ duration: 0.2, delay: i * 0.1 }}
                  className="h-full bg-black "
                />
              </div>
              <div className="flex w-full justify-start gap-4">
                <p className={indexStyles}>{i + 1 + "."}</p>
                <p className={textStyles}>{genre.genre}</p>
                <p className={lastText}>{genre.count}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
