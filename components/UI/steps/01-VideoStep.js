import { motion } from "framer-motion"
import { useState } from "react"
import NextButton from "../NextButton"
import ReactPlayer from "react-player"

export default function VideoStep({ ...data }) {
  const [opacity, setOpacity] = useState(0)

  const handleIsReady = () => setOpacity(1)

  const playerAnimation = {
    initial: { opacity: 0 },
    animate: { opacity },
    transition: { duration: 0.7 },
  }

  return (
    <>
      <div className="flex-grow w-full flex items-center justify-center flex-col gap-2 relative">
        <h3 className="font-bold text-lg text-text">Watch this video:</h3>
        <motion.div className="w-full h-full mb-5" {...playerAnimation}>
          <ReactPlayer url={data.videoUrl} width="100%" height="100%" onReady={handleIsReady} />
        </motion.div>
      </div>
      <NextButton id={0} {...data} />
    </>
  )
}
