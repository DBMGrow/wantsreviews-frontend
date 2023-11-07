import NextButton from "../NextButton"
import { ButtonGroup } from "@nextui-org/react"
import { useRouter } from "next/router"
import { useState } from "react"
import Star from "../Star"

export default function VideoStep({ ...data }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

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
      <div className="flex-grow w-full flex items-center justify-center flex-col gap-2">
        <h2 className="font-bold text-text text-lg">How would you rate {data.userName}?</h2>
        <ButtonGroup className="shadow-custom rounded-xl w-full max-w-[300px] justify-around" color="white">
          {[...Array(5)].map((_, i) => (
            <Star event={() => data.setRating(i + 1)} key={i} solid={i < data.rating} />
          ))}
        </ButtonGroup>
      </div>
      <NextButton id={1} isDisabled={!data.rating} isLoading={loading} next={handleClickNext} {...data} />
    </>
  )
}
