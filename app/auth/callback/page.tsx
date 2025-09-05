"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });

        if (error) {
          setStatus("error");
          setErrorMessage(error.message);
        } else {
          setStatus("success");
        }
      } catch (err: unknown) {
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Unexpected error");
      }
    };

    if (typeof window !== "undefined") run();
  }, []);

  const handleGoToLogin = () => {
    setRedirecting(true);
    setTimeout(() => router.push("/auth/login"), 4000);
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-[100vh] items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-zinc-800 text-white">
        <p className="text-lg animate-pulse">Verifying your email...</p>
      </div>
    );
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
    );
  }

  return (
    <div className="flex min-h-[100vh] items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white">
      <div className="p-10 rounded-3xl bg-white/10 backdrop-blur-xl shadow-2xl max-w-md w-full text-center space-y-6 animate-fade-in">
        <CheckCircle2 className="mx-auto w-20 h-20 text-green-400 drop-shadow-lg" />
        <h1 className="text-3xl font-bold">Email Confirmed 🎉</h1>
        <p className="text-sm text-gray-200">
          Your email has been confirmed successfully.
        </p>

        {redirecting ? (
          <p className="text-sm text-gray-200 animate-pulse">
            You will be redirected to login...
          </p>
        ) : (
          <Button
            onClick={handleGoToLogin}
            className="w-full text-lg py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            Go to Login
          </Button>
        )}
      </div>
    </div>
  );
}
