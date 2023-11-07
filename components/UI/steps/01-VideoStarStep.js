import { motion } from "framer-motion"
import { useState } from "react"
import { ButtonGroup } from "@nextui-org/react"
import { useRouter } from "next/router"
import Star from "../Star"
import NextButton from "../NextButton"
import ReactPlayer from "react-player"

export default function VideoStarStep({ ...data }) {
  const [opacity, setOpacity] = useState(0)

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleIsReady = () => setOpacity(1)

  const playerAnimation = {
    initial: { opacity: 0 },
    animate: { opacity },
    transition: { duration: 0.7 },
  }

  const handleClickNext = (next) => {
    if (data.rating >= data.minRating) {
      router.push(data.redirectLink)
      setLoading(true)
      return
    }
    next()
  }

  return (
    <>
      <div className="flex-grow w-full flex items-center justify-center flex-col gap-2 relative mb-4">
        <motion.div className="w-full h-full mb-5 flex items-center justify-center" {...playerAnimation}>
          <ReactPlayer url={data.videoUrl} width="90%" height="100%" onReady={handleIsReady} />
        </motion.div>
        <h2 className="font-bold text-text text-lg">How would you rate {data.userName}?</h2>
        <ButtonGroup className="shadow-custom rounded-xl w-full max-w-[300px] justify-around" color="white">
          {[...Array(5)].map((_, i) => (
            <Star event={() => data.setRating(i + 1)} key={i} solid={i < data.rating} />
          ))}
        </ButtonGroup>
      </div>
      <NextButton id={0} isDisabled={!data.rating} isLoading={loading} next={handleClickNext} {...data} />
    </>
  )
}
