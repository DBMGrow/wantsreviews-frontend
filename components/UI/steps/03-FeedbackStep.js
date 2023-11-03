import NextButton from "../NextButton"
import { Textarea } from "@nextui-org/react"

export default function FeedbackStep({ ...data }) {
  const fieldProps = {
    minRows: 7,
    maxRows: 7,
    placeholder: "Enter your feedback here",
    classNames: {
      inputWrapper: "bg-white shadow-custom rounded-xl w-full",
    },
  }

  const handleTextChange = (e) => {
    data.setMessage(e.target.value)
    console.log(data.message)
  }

  return (
    <>
      <div className="flex-grow w-full flex items-center justify-center flex-col">
        <h2 className="font-bold text-text text-lg mb-2">Feedback</h2>
        <Textarea {...fieldProps} onChange={handleTextChange} value={data.message} />
      </div>
      <NextButton id={2} label="Submit" {...data} />
    </>
  )
}
