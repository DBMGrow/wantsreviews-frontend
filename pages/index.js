import { Inter } from "next/font/google"
import { useRouter } from "next/router"
import { randomWords } from "@/components/Utils/randomWords"
import Link from "next/link"
import { useState, useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function ExamplePage() {
  const router = useRouter()
  const subdomain = router.query.subdomain || ""
  const [randomWord, setRandomWord] = useState("")

  useEffect(() => {
    setRandomWord(randomWords[Math.floor(Math.random() * randomWords.length)])
  }, [router])

  return (
    <main className={`w-screen h-screen p-2 sm:p-24 ${inter.className}`}>
      <h1 className="text-3xl font-bold">{subdomain || "Home"}</h1>
      <p className="text-sm">your url is {subdomain ? subdomain + "." : null}wantsreviews.com</p>
      <p className="text-sm mt-2">
        try going to{" "}
        <Link className="text-amber-500 font-bold" href={randomWord + ".wantsreviews.com"}>
          {randomWord}.wantsreviews.com
        </Link>
      </p>
    </main>
  )
}
