import { useState, useEffect } from "react"
import { useAnimate } from "framer-motion"

import VideoStep from "./steps/01-VideoStep"
import StarStep from "./steps/02-StarStep"
import FeedbackStep from "./steps/03-FeedbackStep"
import ThankYouStep from "./steps/04-ThankYouStep"

export default function useData() {
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

  data.videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  data.userName = "John Green"
  data.userImage =
    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  const [rating, setRating] = useState(0)

  data.rating = rating
  data.setRating = setRating

  const [message, setMessage] = useState("")

  data.message = message
  data.setMessage = setMessage

  //
  // Next Step Button Logic
  //

  data.handleButtonClick = () => {
    //set current step to the next step or highest step
    setCurrentStep((prev) => (prev === steps.length - 1 ? prev : prev + 1))
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
