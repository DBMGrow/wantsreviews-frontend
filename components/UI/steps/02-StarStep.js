import NextButton from "../NextButton"
import { Button, ButtonGroup } from "@nextui-org/react"
import { StarIcon as StarSolid } from "@heroicons/react/24/solid"
import { StarIcon as StarOutline } from "@heroicons/react/24/outline"

export default function VideoStep({ ...data }) {
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
      <Button onPress={event} {...buttonProps}>
        {solid ? <StarSolid {...starProps} /> : <StarOutline {...starProps} />}
      </Button>
    )
  }

  const handleClickNext = (next) => {
    console.log("This is where we would check how many stars is acceptable for google and redirect")
    next()
  }

  return (
    <>
      <div className="flex-grow w-full flex items-center justify-center flex-col gap-2">
        <h2 className="font-bold text-text text-lg">How would you rate {data.userName}?</h2>
        <ButtonGroup className="shadow-custom rounded-xl w-full justify-around" color="white">
          {[...Array(5)].map((_, i) => (
            <Star event={() => data.setRating(i + 1)} key={i} solid={i < data.rating} />
          ))}
        </ButtonGroup>
      </div>
      <NextButton isDisabled={!data.rating} next={handleClickNext} {...data} />
    </>
  )
}
