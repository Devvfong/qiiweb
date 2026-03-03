"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) { setError("Invalid reset link."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }

    setStatus("loading");
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();

    if (res.ok) {
      setStatus("success");
      setTimeout(() => router.push("/auth/login"), 2500);
    } else {
      setError(data.error || "Something went wrong.");
      setStatus("error");
    }
  };

  const EyeIcon = ({ open }: { open: boolean }) => open
    ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
    : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;

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
            <div className="flex flex-col items-center mb-7">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-cyan-400/20 rounded-xl blur-xl" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">Q</span>
                </div>
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight mb-0.5">Set new password</h1>
              <p className="text-sm text-white/40">Choose a strong password for your account</p>
            </div>

            {status === "success" ? (
              <div className="text-center space-y-4 py-2">
                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto border border-green-500/30">
                  <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Password updated!</p>
                  <p className="text-white/40 text-sm mt-1">Redirecting you to sign in…</p>
                </div>
              </div>
            ) : !token ? (
              <div className="text-center space-y-3 py-2">
                <p className="text-red-300 text-sm">Invalid or missing reset link.</p>
                <Link href="/auth/forgot-password" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
                  Request a new link →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 ml-0.5">New Password</label>
                  <div className="relative">
                    <input
                      id="reset-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full px-4 py-2.5 pr-11 rounded-xl bg-white/[0.07] border border-white/[0.12] text-white placeholder-white/20 text-sm outline-none focus:border-cyan-400/60 focus:bg-white/[0.10] transition-all"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors" tabIndex={-1}>
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 ml-0.5">Confirm Password</label>
                  <input
                    id="reset-confirm"
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.07] border border-white/[0.12] text-white placeholder-white/20 text-sm outline-none focus:border-cyan-400/60 focus:bg-white/[0.10] transition-all"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-xs text-red-300">{error}</p>
                  </div>
                )}

                <button
                  id="reset-submit-btn"
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)", boxShadow: "0 4px 15px rgba(14,165,233,0.3)" }}
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Updating…
                    </span>
                  ) : "Update Password"}
                </button>

                <p className="text-center text-xs text-white/30">
                  <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                    ← Back to sign in
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
