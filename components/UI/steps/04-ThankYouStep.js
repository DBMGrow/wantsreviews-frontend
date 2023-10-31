import NextButton from "../NextButton"

export default function ThankYouStep({ ...data }) {
  return (
    <>
      <div className="flex-grow w-full flex items-center justify-center flex-col">
        <h2 className="font-bold text-text text-lg mb-2">Thank You!</h2>
        <div className="text-sm text-text-secondary">
          <p className="mb-2">
            Your insights are invaluable to us. We&apos;re committed to continuous improvement and ensuring the best
            possible experience for everyone. Your feedback helps our professionals grow and serve you better.
          </p>
          <p>
            If you have any more thoughts or questions in the future, don&apos;t hesitate to reach out. We appreciate
            the time you took to share with us. Have a wonderful day!
          </p>
        </div>
      </div>
    </>
  )
}
