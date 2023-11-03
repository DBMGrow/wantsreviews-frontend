import { useState, useEffect } from "react"
import { useAnimate } from "framer-motion"
import { useGet } from "@davidcrammer/shotgun"
import { useRouter } from "next/router"

import VideoStep from "./steps/01-VideoStep"
import StarStep from "./steps/02-StarStep"
import FeedbackStep from "./steps/03-FeedbackStep"
import ThankYouStep from "./steps/04-ThankYouStep"

export default function useData() {
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(0)
  const steps = [VideoStep, StarStep, FeedbackStep, ThankYouStep]

  const [scope, animate] = useAnimate()

  const Placeholder = () => <div></div> //never shows up, but needs ref to replace with real content
  const [CurrentComponent, setCurrentComponent] = useState(() => Placeholder)

  const data = {
    currentStep,
    setCurrentStep,
    steps,
    scope,
    animate,
    CurrentComponent,
  }

  //
  // Data Fetching Logic
  //
  const url = router.isReady ? `agent&slug=${router?.query?.subdomain}` : null
  const store = url ? "Data" : null
  const { data: rawData, error } = useGet(store, true, {
    url,
    debug: true,
    proxyUrl: process.env.NEXT_PUBLIC_PROXY_URL,
  })

  data.rawData = rawData
  data.error = error

  data.agentID = rawData?.data?.Agent_ID
  data.videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ" //
  data.userName = rawData?.data?.Agent_Name
  data.userTitle = rawData?.data?.Company_Name
  data.userImage =
    "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?auto=format&fit=crop&q=80&w=540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  data.minRating = 5
  data.redirectLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

  const [rating, setRating] = useState(5)

  data.rating = rating
  data.setRating = setRating

  const [message, setMessage] = useState("")

  data.message = message
  data.setMessage = setMessage

  //
  // Next Step Button Logic
  //

  data.handleButtonClick = () => {
    setCurrentStep((prev) => (prev === steps.length - 1 ? prev : prev + 1))
  }

  data.handleBackClick = () => {
    setCurrentStep((prev) => (prev === 0 ? prev : prev - 1))
  }

  //
  // Animation Logic
  //

  useEffect(() => {
    if (scope.current === null) return

    animate(scope.current, { opacity: 0 }, { duration: 0.3 }).then(() => {
      setCurrentComponent(() => steps[currentStep])
      animate(scope.current, { opacity: 1 }, { duration: 0.5 })
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, scope])

  data.cardMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1, delay: 0.3 },
  }

  return data
}
