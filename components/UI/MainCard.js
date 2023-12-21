import useData from "./useData"
import Head from "next/head"
import ProfileSection from "./ProfileSection"
import { Card, CardBody, Spinner } from "@nextui-org/react"
import { motion } from "framer-motion"

export default function MainCard() {
  const data = useData()

  if (data.error || data?.rawData?.error || data?.rawData?.data?.wrv?.Active === 0) {
    let error = "other"
    if (data?.rawData?.error === "Slug does not exist.") error = "bad slug"
    if (data?.rawData?.data?.wrv?.Active === 0) error = "inactive"

    return (
      <Card className="rounded-2xl shadow-2xl bg-offWhite">
        <CardBody>
          <div ref={data.scope}></div>
          {error === "bad slug" ? (
            <div>
              <h2 className="text-xl font-bold text-text-secondary">404</h2>
              <p className="text-text-secondary">We could not find any data at this url.</p>
            </div>
          ) : null}
          {error === "inactive" ? (
            <div>
              <h2 className="text-xl font-bold text-text-secondary">Inactive Account</h2>
              <p className="text-text-secondary">This WantsReviews account has been deactivated.</p>
              <p className="text-text-secondary">If you are the account owner, please contact support.</p>
            </div>
          ) : null}
          {error === "other" ? (
            <div>
              <h2 className="text-xl font-bold text-text-secondary">An error has occurred.</h2>
              <p className="text-text-secondary">We apologize for the inconvenience.</p>
              <p className="text-text-secondary">Please try again later.</p>
            </div>
          ) : null}
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
    <>
      <Head>
        <title>{data.userName} Wants Reviews</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <motion.div {...data.cardMotion}>
        <Card className="w-full min-h-full sm:w-[550px] sm:min-h-[650px] p-7 max-w-full flex rounded-2xl shadow-2xl bg-offWhite">
          <CardBody className="flex flex-col gap-6 justify-between">
            <ProfileSection {...data} />
            <div ref={data.scope} className="stretch flex-grow flex flex-col items-center justify-between gap-4">
              <data.CurrentComponent {...data} />
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </>
  )
}
