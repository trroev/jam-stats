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
      className="w-full mt-8 flex flex-col lg:flex-row p-4 justify-center items-center bg-darkGrayAccent rounded-md border-black border-2 gap-8"
    >
      <h2 className="text-2xl font-bold bg-greenAccent text-black p-6 rounded-full">
        {averageXPopularity.toFixed(0)}
      </h2>
      <span className="text-sm">{description}</span>
    </motion.li>
  )
}
