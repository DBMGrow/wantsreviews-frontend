import { Inter } from "next/font/google"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import MainCard from "@/components/UI/MainCard"

const inter = Inter({ subsets: ["latin"] })

export default function ExamplePage() {
  const router = useRouter()
  const subdomain = router.query.subdomain || ""
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!ready && router.isReady) setReady(true)
  }, [ready, router])

  if (!ready) return null

  return (
    <main
      className={`text-text max-h-[100dvh] overflow-auto w-screen h-screen flex items-center justify-center ${inter.className} bg-[url('/images/bg2.svg')] bg-cover`}
    >
      <MainCard />
    </main>
  )
}
