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
      className="w-full lg:h-40 flex flex-col py-4 pl-4 lg:px-10 justify-center items-center rounded-md gap-8"
    >
      <div className="w-full flex justify-between items-center gap">
        <h2 className="text-md lg:text-xl font-bold text-greenAccent">
          Artist Popularity Average
        </h2>
        <h3 className="text-2xl font-bold bg-greenAccent text-black py-2 px-3 lg:py-6 lg:px-7 rounded-full">
          {averageXPopularity.toFixed(0)}
        </h3>
      </div>
      <span className="text-sm lg:text-md">{description}</span>
    </motion.li>
  )
}
