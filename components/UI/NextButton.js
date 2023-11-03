import { Button } from "@nextui-org/react"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"

export default function NextButton({ id, isDisabled, label, next, ...data }) {
  if (!next) next = () => data.handleButtonClick()

  const handleProgress = () => {
    if (data.currentStep != id) return
    next(data.handleButtonClick)
  }

  const handleBack = () => {
    if (data.currentStep != id) return
    data.handleBackClick()
  }

  const motionProps = {
    className: "w-full",
    initial: { opacity: isDisabled ? 0.5 : 1 },
    animate: { opacity: isDisabled ? 0.5 : 1 },
    transition: { duration: 0.3 },
  }

  return (
    <div className="w-full flex gap-2">
      {data.CurrentComponent !== data.steps[0] ? (
        <Button
          onPress={handleBack}
          color="secondary"
          startContent={<ChevronLeftIcon className="w-4 h-4" />}
          className="text-white font-medium basis-1/4"
          radius="full"
          variant="shadow"
        >
          Back
        </Button>
      ) : null}
      <motion.div {...motionProps}>
        <Button
          onPress={handleProgress}
          isLoading={data.isLoading}
          color="primary"
          endContent={<ChevronRightIcon className="w-4 h-4" />}
          className="text-white font-bold w-full grow bg-gradient-to-b from-primary to-tertiary"
          radius="full"
          variant="shadow"
          isDisabled={isDisabled}
        >
          {label || "Next"}
        </Button>
      </motion.div>
    </div>
  )
}
