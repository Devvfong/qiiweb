"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      const supabase = createClient()
      const { error } = await supabase.auth.exchangeCodeForSession()
      if (error) {
        setStatus("error")
        setErrorMessage(error.message)
      } else {
        setStatus("success")
        // redirect to /auth/login after 4 seconds
        setTimeout(() => router.push("/auth/login"), 5000)
      }
    }
    run()
  }, [])

  if (status === "loading") {
    return (
      <div className="flex min-h-[100vh] items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-zinc-800 text-white">
        <p className="text-lg animate-pulse">Verifying your email...</p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex min-h-[100vh] items-center justify-center bg-red-950 text-red-200">
        <div className="p-8 rounded-2xl bg-red-900/30 backdrop-blur-lg shadow-xl max-w-md text-center space-y-4">
          <p className="text-xl font-semibold">Verification failed</p>
          <p className="text-sm">{errorMessage}</p>
          <Button onClick={() => router.push("/auth/login")} className="w-full">
            Back to Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[100vh] items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white">
      <div className="p-10 rounded-3xl bg-white/10 backdrop-blur-xl shadow-2xl max-w-md w-full text-center space-y-6 animate-fade-in">
        <CheckCircle2 className="mx-auto w-20 h-20 text-green-400 drop-shadow-lg" />
        <h1 className="text-3xl font-bold">Email Confirmed 🎉</h1>
        <p className="text-sm text-gray-200">
          Your email has been confirmed successfully.
          You will be redirected to the login page shortly.
        </p>
      </div>
    </div>
  )
}
