import useData from "./useData"
import ProfileSection from "./ProfileSection"
import { Card, CardBody } from "@nextui-org/react"
import { motion } from "framer-motion"

export default function MainCard() {
  const data = useData()

  return (
    <motion.div {...data.cardMotion}>
      <Card className="w-screen h-screen sm:w-[550px] sm:h-[600px] p-7 max-w-full flex rounded-2xl shadow-2xl bg-offWhite">
        <CardBody className="flex flex-col gap-6 justify-between">
          <ProfileSection {...data} />
          <div ref={data.scope} className="stretch flex-grow flex flex-col items-center justify-between gap-4">
            <data.CurrentComponent {...data} />
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}
