"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

export default function LoginClient() {
  const { status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (status === "authenticated") router.push("/home");
  }, [status, router]);

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setIsLoading(false);
    if (res?.error) setError("Invalid email or password.");
    else router.push("/home");
  };

  const handleGoogle = async () => {
    setIsGoogleLoading(true);
    await signIn("google", { callbackUrl: "/home" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0f2027 0%, #2c5364 60%, #005c97 100%)" }}>
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden" style={{ background: "linear-gradient(135deg, #0f2027 0%, #2c5364 60%, #005c97 100%)" }}>
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm" style={{ animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
        <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-[2px] w-full bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400" />
          <div className="p-8">
            <div className="flex flex-col items-center mb-7">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-cyan-400/20 rounded-xl blur-xl" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">Q</span>
                </div>
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight mb-0.5">Welcome back</h1>
              <p className="text-sm text-white/40">Sign in to your account</p>
            </div>

            <form onSubmit={handleCredentials} className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 ml-0.5">Email</label>
                <input id="login-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.07] border border-white/[0.12] text-white placeholder-white/20 text-sm outline-none focus:border-cyan-400/60 focus:bg-white/[0.10] transition-all" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5 ml-0.5">
                  <label className="text-xs font-medium text-white/50">Password</label>
                  <a href="/auth/forgot-password" className="text-xs text-white/30 hover:text-white/60 transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <input id="login-password" type={showPassword ? "text" : "password"} required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-11 rounded-xl bg-white/[0.07] border border-white/[0.12] text-white placeholder-white/20 text-sm outline-none focus:border-cyan-400/60 focus:bg-white/[0.10] transition-all" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors" tabIndex={-1}>
                    {showPassword
                      ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-xs text-red-300">{error}</p>
                </div>
              )}

              <button id="email-signin-btn" type="submit" disabled={isLoading}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)", boxShadow: "0 4px 15px rgba(14,165,233,0.3)" }}>
                {isLoading ? <span className="flex items-center justify-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in…</span> : "Sign In"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[11px] text-white/25 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <button id="google-signin-btn" onClick={handleGoogle} disabled={isGoogleLoading}
              className="group w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(235,240,255,0.95))", boxShadow: "0 2px 12px rgba(0,0,0,0.25)" }}>
              {isGoogleLoading ? <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" /> : <FaGoogle className="text-[#EA4335] text-base flex-shrink-0" />}
              <span className="text-slate-800">{isGoogleLoading ? "Redirecting…" : "Continue with Google"}</span>
            </button>

            <p className="text-center text-xs text-white/30 mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Sign up</Link>
            </p>
          </div>
        </div>
        <p className="text-center text-white/15 text-[11px] mt-5">© {new Date().getFullYear()} Qii Services · Dev-Services CLI v2.10</p>
      </div>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
