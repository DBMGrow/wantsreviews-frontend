import NextButton from "../NextButton"
import { Textarea, Input } from "@nextui-org/react"

export default function FeedbackStep({ ...data }) {
  const handleFirstName = (e) => data.setNameFirst(e.target.value)
  const handleLastName = (e) => data.setNameLast(e.target.value)
  const handleEmail = (e) => data.setEmail(e.target.value)
  const handlePhone = (e) => data.setPhone(e.target.value)
  const handleMessage = (e) => data.setMessage(e.target.value)

  const inputProps = {
    classNames: {
      inputWrapper: "bg-white shadow-custom rounded-xl w-full",
    },
  }

  const firstNameProps = {
    ...inputProps,
    placeholder: "First Name",
    value: data.nameFirst,
    onChange: handleFirstName,
  }

  const lastNameProps = {
    ...inputProps,
    placeholder: "Last Name",
    value: data.nameLast,
    onChange: handleLastName,
  }

  const emailProps = {
    ...inputProps,
    placeholder: "Email",
    value: data.email,
    onChange: handleEmail,
  }

  const phoneProps = {
    ...inputProps,
    placeholder: "Phone",
    value: data.phone,
    onChange: handlePhone,
  }

  const messageProps = {
    minRows: 7,
    maxRows: 7,
    placeholder: "Enter your feedback here",
    classNames: {
      inputWrapper: "bg-white shadow-custom rounded-xl w-full",
    },
    onChange: handleMessage,
    value: data.message,
  }

  return (
    <>
      <div className="flex-grow w-full flex items-center justify-center flex-col gap-2">
        <h2 className="font-bold text-text text-lg">Feedback</h2>
        <div className="flex gap-2 w-full">
          <Input placeholder="First Name" {...firstNameProps} />
          <Input placeholder="Last Name" {...lastNameProps} />
        </div>
        <div className="flex gap-2 w-full">
          <Input placeholder="Email" {...emailProps} />
          <Input placeholder="Phone" {...phoneProps} />
        </div>
        <Textarea {...messageProps} />
      </div>
      <NextButton id={1} isLoading={data.submitting} label="Submit" {...data} next={data.handleSubmit} />
    </>
  )
}
