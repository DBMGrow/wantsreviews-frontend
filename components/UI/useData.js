import { useState, useEffect } from "react"
import { useAnimate } from "framer-motion"
import { useGet, useTrigger } from "@davidcrammer/shotgun"
import { useRouter } from "next/router"

import VideoStarStep from "./steps/01-VideoStarStep"
import FeedbackStep from "./steps/03-FeedbackStep"
import ThankYouStep from "./steps/04-ThankYouStep"

export default function useData() {
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(0)
  const steps = [VideoStarStep, FeedbackStep, ThankYouStep]

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
    proxyUrl: process.env.NEXT_PUBLIC_PROXY_URL,
  })

  const [submitting, setSubmitting] = useState(false)
  const encodedUrl = encodeURIComponent(`review&slug=${router?.query?.subdomain}`)

  const submitUrl = router.isReady ? `${process.env.NEXT_PUBLIC_PROXY_URL}?url=${encodedUrl}` : "/"
  const submit = useTrigger(submitUrl, "POST", {
    proxy: false,
    onSuccess: (data) => {
      setSubmitting(false)
      setCurrentStep(2)
      console.log(data)
    },
    onError: (error) => {
      setSubmitting(false)
      setCurrentStep(2)
      console.error(error)
    },
  })
  data.submit = submit
  data.submitting = submitting
  data.setSubmitting = setSubmitting

  data.rawData = rawData
  data.error = error

  data.agentID = rawData?.data?.Agent_ID
  data.videoUrl = rawData?.data?.wrv?.Video_URL
  data.userName = rawData?.data?.Agent_Name
  data.userTitle = rawData?.data?.Company_Name
  data.userImage = "data:image/png;base64," + rawData?.data?.Display_Photo
  data.minRating = rawData?.data?.wrv?.StarMin
  data.redirectLink = rawData?.data?.wrv?.Review_URL

  const [rating, setRating] = useState(5)
  data.rating = rating
  data.setRating = setRating

  const [message, setMessage] = useState("")
  data.message = message
  data.setMessage = setMessage

  const [nameFirst, setNameFirst] = useState("")
  data.nameFirst = nameFirst
  data.setNameFirst = setNameFirst

  const [nameLast, setNameLast] = useState("")
  data.nameLast = nameLast
  data.setNameLast = setNameLast

  const [email, setEmail] = useState("")
  data.email = email
  data.setEmail = setEmail

  const [phone, setPhone] = useState("")
  data.phone = phone
  data.setPhone = setPhone

  data.handleSubmit = () => {
    console.log("submitting")
    if (submitting) return
    setSubmitting(true)
    submit({
      Agent_ID: data.agentID,
      Name_First: nameFirst,
      Name_Last: nameLast,
      Email: email,
      Phone: phone,
      Message: message,
      Rating: rating,
    })
  }

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
    className: "w-full h-full flex items-center justify-center flex-col gap-2",
  }

  return data
}
