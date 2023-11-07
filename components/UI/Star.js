import { Button } from "@nextui-org/react"
import Image from "next/image"

// Star Icon
export default function Star({ solid, event }) {
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
