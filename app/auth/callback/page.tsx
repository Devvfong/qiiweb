"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const handleGoToLogin = () => {
    setRedirecting(true);
    setTimeout(() => router.push("/auth/login"), 4000);
  };

  return (
    <div className="flex min-h-[100vh] items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white px-4">
      <div className="p-10 rounded-3xl bg-white/10 backdrop-blur-xl shadow-2xl max-w-md w-full text-center space-y-6 animate-fade-in">
        <CheckCircle2 className="mx-auto w-20 h-20 text-green-400 drop-shadow-lg animate-bounce" />
        <h1 className="text-3xl font-bold">Email Confirmed 🎉</h1>
        <p className="text-sm text-gray-200">
          Your email has been confirmed successfully.
        </p>

        {redirecting ? (
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="w-10 h-10 text-gray-200 animate-spin" />
            <p className="text-sm text-gray-200 animate-pulse">
              Redirecting to login...
            </p>
          </div>
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
