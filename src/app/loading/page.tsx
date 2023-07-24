"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen gap-8">
      <motion.div
        className="bg-greenAccent h-32 w-32"
        animate={{
          opacity: [0.2, 0.4, 0.6, 0.8, 1],
          scale: [1, 1.5, 2, 3, 1],
          rotate: [0, 270, 180, 90, 0],
          borderRadius: ["0%", "25%", "40%", "50%", "0%"],
        }}
        transition={{
          duration: 3,
          ease: "backInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </div>
  )
}
