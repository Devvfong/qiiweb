"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus("sent");
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f2027 0%, #2c5364 60%, #005c97 100%)" }}
    >
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div
        className="relative z-10 w-full max-w-sm"
        style={{ animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-[2px] w-full bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400" />

          <div className="p-8">
            {/* Brand */}
            <div className="flex flex-col items-center mb-7">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-cyan-400/20 rounded-xl blur-xl" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">Q</span>
                </div>
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight mb-0.5">Forgot password?</h1>
              <p className="text-sm text-white/40 text-center">Enter your email and we'll send you a reset link</p>
            </div>

            {status === "sent" ? (
              <div className="text-center space-y-4 py-2">
                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto border border-green-500/30">
                  <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Check your email</p>
                  <p className="text-white/40 text-sm mt-1">We sent a reset link to <span className="text-white/70">{email}</span></p>
                  <p className="text-white/30 text-xs mt-1">Link expires in 1 hour</p>
                </div>
                <Link href="/auth/login" className="inline-block text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors mt-2">
                  ← Back to sign in
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 ml-0.5">Email address</label>
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.07] border border-white/[0.12] text-white placeholder-white/20 text-sm outline-none focus:border-cyan-400/60 focus:bg-white/[0.10] transition-all"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-xs text-red-300">{error}</p>
                  </div>
                )}

                <button
                  id="forgot-submit-btn"
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)", boxShadow: "0 4px 15px rgba(14,165,233,0.3)" }}
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </span>
                  ) : "Send Reset Link"}
                </button>

                <p className="text-center text-xs text-white/30">
                  Remember your password?{" "}
                  <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                    Sign in
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-white/15 text-[11px] mt-5">
          © {new Date().getFullYear()} Qii Services · Dev-Services CLI v2.10
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
