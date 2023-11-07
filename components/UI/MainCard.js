import useData from "./useData"
import ProfileSection from "./ProfileSection"
import { Card, CardBody, Spinner } from "@nextui-org/react"
import { motion } from "framer-motion"

export default function MainCard() {
  const data = useData()

  if (data.error || data?.rawData?.error) {
    const error = data.error || data?.rawData?.error === "Slug does not exist." ? "bad slug" : "other"
    return (
      <Card className="rounded-2xl shadow-2xl bg-offWhite">
        <CardBody>
          <div ref={data.scope}></div>
          {error === "bad slug" ? (
            <div>
              <h2 className="text-xl font-bold text-text-secondary">404</h2>
              <p className="text-text-secondary">We could not find any data at this url.</p>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-text-secondary">An error has occurred.</h2>
              <p className="text-text-secondary">We apologize for the inconvenience.</p>
              <p className="text-text-secondary">Please try again later.</p>
            </div>
          )}
        </CardBody>
      </Card>
    )
  }

  if (!data.rawData) {
    return (
      <>
        <Card className="rounded-2xl shadow-2xl bg-offWhite">
          <CardBody>
            <div ref={data.scope}></div>
            <Spinner />
          </CardBody>
        </Card>
      </>
    )
  }

  return (
    <motion.div {...data.cardMotion}>
      <Card className="w-full h-full sm:w-[550px] sm:h-[650px] p-7 max-w-full flex rounded-2xl shadow-2xl bg-offWhite">
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
