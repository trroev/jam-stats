import { TasteDescriptionProps } from "@/types"
import { motion } from "framer-motion"

export default function TasteDescription({
  description,
  averageXPopularity,
}: TasteDescriptionProps) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.2,
        delay: 0.2,
      }}
      className="w-full lg:h-40 flex flex-col justify-center items-center gap-8 py-8 lg:py-32 border-t-2 border-black lg:border-t-0"
    >
      <div className="w-full flex flex-col gap-4 md:flex-row justify-center items-center">
        <h3 className="text-2xl font-bold bg-greenAccent text-black py-2 px-3 lg:py-6 lg:px-7 rounded-full">
          {averageXPopularity.toFixed(0)}
        </h3>
        <h2 className="text-xl font-bold text-greenAccent">
          Artist Popularity Average
        </h2>
      </div>
      <span className="text-sm lg: w-2/3 lg:text-lg">{description}</span>
    </motion.li>
  )
}
