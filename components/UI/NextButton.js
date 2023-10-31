import { Button } from "@nextui-org/react"
import { ChevronRightIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"

export default function NextButton({ isDisabled, label, next, ...data }) {
  if (!next) next = () => data.handleButtonClick()

  const handleProgress = () => {
    next(data.handleButtonClick)
  }

  const motionProps = {
    className: "w-full",
    initial: { opacity: isDisabled ? 0.5 : 1 },
    animate: { opacity: isDisabled ? 0.5 : 1 },
    transition: { duration: 0.3 },
  }

  return (
    <motion.div {...motionProps}>
      <Button
        onPress={handleProgress}
        isLoading={data.isLoading}
        color="primary"
        endContent={<ChevronRightIcon className="w-4 h-4" />}
        className="text-white font-bold w-full bg-gradient-to-b from-primary to-tertiary"
        radius="full"
        variant="shadow"
        isDisabled={isDisabled}
      >
        {label || "Next"}
      </Button>
    </motion.div>
  )
}
