import NextButton from "../NextButton"
import { Button, ButtonGroup } from "@nextui-org/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

export default function VideoStep({ ...data }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Star Icon
  const Star = ({ solid, event }) => {
    const buttonProps = {
      isIconOnly: true,
      className: "w-10 h-10 flex-grow text-primary hover:bg-primary hover:bg-opacity-10 transition",
      disableRipple: true,
    }
    const starProps = {
      className: "w-6 h-6",
    }
    return (
      <Button onPress={event} {...buttonProps} className="p-[8px]">
        {solid ? (
          <Image width="54" height="53" src={"/images/star-solid.png"} alt={"*"} />
        ) : (
          <Image width="54" height="53" src={"/images/star-gray.png"} alt={"*"} />
        )}
      </Button>
    )
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
