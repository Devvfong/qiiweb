"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AuthCallbackPage() {
  const router = useRouter()
  const [msg, setMsg] = useState("Verifying your email...")

  useEffect(() => {
    const run = async () => {
      const supabase = createClient()
      const { error } = await supabase.auth.exchangeCodeForSession()
      if (error) {
        setMsg(`Verification failed: ${error.message}`)
        return
      }
      // Success → redirect to /home
      router.replace("/home")
    }
    run()
  }, [router])

  return (
    <div className="flex min-h-svh items-center justify-center">
      <p className="text-sm text-muted-foreground">{msg}</p>
    </div>
  )
}
