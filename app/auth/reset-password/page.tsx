"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router       = useRouter();
  const token        = useSearchParams().get("token");
  const [pw, setPw]  = useState("");
  const [cpw, setCpw]= useState("");
  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [error, setError]   = useState("");

  const handle = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (!token)       return setError("Invalid reset link.");
    if (pw !== cpw)   return setError("Passwords do not match.");
    if (pw.length < 8) return setError("Password must be at least 8 characters.");

    setStatus("loading");
    const res = await fetch("/api/auth/reset-password", {
      method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ token, password:pw }),
    });
    const data = await res.json();
    if (res.ok) { setStatus("success"); setTimeout(() => router.push("/auth/login"), 2500); }
    else        { setError(data.error || "Something went wrong."); setStatus("error"); }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        @keyframes spin    { to { transform:rotate(360deg); } }
        @keyframes fadeUp  { from { opacity:0;transform:translateY(16px); } to { opacity:1;transform:translateY(0); } }
        @keyframes aurora  { 0%,100%{transform:scale(1) translate(0,0);} 50%{transform:scale(1.4) translate(5%,5%);} }
        @keyframes aurora2 { 0%,100%{transform:scale(1.2);} 50%{transform:scale(1) translate(-5%,-5%);} }
        @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(34,211,238,0.4);} 70%{box-shadow:0 0 0 10px rgba(34,211,238,0);} }
        @keyframes checkIn { from{stroke-dashoffset:50;opacity:0;} to{stroke-dashoffset:0;opacity:1;} }

        .rp-root  { display:flex; min-height:100vh; background:#060c15; font-family:'Inter',sans-serif; align-items:center; justify-content:center; position:relative; overflow:hidden; }
        .rp-blob1 { position:absolute; top:-20%; left:-10%; width:60%; height:60%; border-radius:50%; background:radial-gradient(circle,rgba(6,182,212,0.1) 0%,transparent 70%); animation:aurora 14s ease-in-out infinite; pointer-events:none; }
        .rp-blob2 { position:absolute; bottom:-20%; right:-10%; width:55%; height:55%; border-radius:50%; background:radial-gradient(circle,rgba(99,102,241,0.09) 0%,transparent 70%); animation:aurora2 17s ease-in-out infinite; pointer-events:none; }
        .rp-grid  { position:absolute; inset:0; background-image:linear-gradient(rgba(34,211,238,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.025) 1px,transparent 1px); background-size:64px 64px; pointer-events:none; }

        .rp-card  { position:relative; z-index:10; width:100%; max-width:420px; padding:48px 40px; border-radius:24px; background:rgba(11,21,37,0.95); border:1px solid rgba(255,255,255,0.07); backdrop-filter:blur(24px); box-shadow:0 24px 80px rgba(0,0,0,0.5); animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both; }

        .rp-input { width:100%; padding:13px 16px; border-radius:12px; font-size:14px; color:#f1f5f9; font-family:'Inter',sans-serif; outline:none; transition:all .2s; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); }
        .rp-input:focus { background:rgba(34,211,238,0.05); border-color:rgba(34,211,238,0.4); box-shadow:0 0 0 3px rgba(34,211,238,0.08); }
        .rp-input::placeholder { color:rgba(100,116,139,0.5); }

        .rp-btn { width:100%; padding:14px; border-radius:12px; font-weight:700; font-size:15px; color:#fff; border:none; cursor:pointer; transition:all .25s; font-family:'Inter',sans-serif; background:linear-gradient(135deg,#06b6d4 0%,#3b82f6 55%,#6366f1 100%); box-shadow:0 4px 20px rgba(6,182,212,0.28); }
        .rp-btn:hover:not(:disabled) { box-shadow:0 8px 32px rgba(6,182,212,0.45); transform:translateY(-1px); }
        .rp-btn:active { transform:scale(0.98); }
        .rp-btn:disabled { opacity:0.6; cursor:not-allowed; }
        .rp-eye { background:none; border:none; cursor:pointer; color:#475569; padding:0; display:flex; transition:color .2s; }
        .rp-eye:hover { color:#94a3b8; }
        .check-path { stroke-dasharray:50; stroke-dashoffset:50; animation:checkIn .5s .2s ease forwards; }
      `}} />

      <div className="rp-root">
        <div className="rp-blob1" /><div className="rp-blob2" /><div className="rp-grid" />
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,#06b6d4,#6366f1,transparent)", pointerEvents:"none" }} />

        <div className="rp-card">
          {/* Brand */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:32 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#06b6d4,#2563eb)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#fff", fontSize:15, flexShrink:0, boxShadow:"0 0 16px rgba(6,182,212,0.35)" }}>Q</div>
            <span style={{ color:"#f1f5f9", fontWeight:600, fontSize:15 }}>Qii Services</span>
          </div>

          {status === "success" ? (
            <div style={{ textAlign:"center", padding:"8px 0" }}>
              <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.25)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", animation:"pulse 2s ease-in-out infinite" }}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2.5}>
                  <path className="check-path" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 style={{ fontSize:20, fontWeight:800, color:"#f8fafc", marginBottom:8 }}>Password updated!</h2>
              <p style={{ color:"#64748b", fontSize:14, marginBottom:4 }}>You'll be redirected to sign in…</p>
              <div style={{ width:40, height:3, borderRadius:999, background:"rgba(34,197,94,0.3)", margin:"16px auto 0", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", inset:0, background:"#22c55e", animation:"shimmer 2.5s ease-out forwards", transformOrigin:"left" }} />
              </div>
            </div>
          ) : !token ? (
            <div style={{ textAlign:"center", padding:"8px 0" }}>
              <div style={{ width:56, height:56, borderRadius:"50%", background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#f87171" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h2 style={{ fontSize:18, fontWeight:700, color:"#f8fafc", marginBottom:8 }}>Invalid link</h2>
              <p style={{ color:"#64748b", fontSize:14, marginBottom:24 }}>This reset link is invalid or has expired.</p>
              <Link href="/auth/forgot-password" style={{ color:"#22d3ee", fontWeight:600, textDecoration:"none", fontSize:14 }}>Request a new link →</Link>
            </div>
          ) : (
            <>
              <div style={{ marginBottom:28 }}>
                <h1 style={{ fontSize:24, fontWeight:800, color:"#f8fafc", marginBottom:6, letterSpacing:"-0.7px" }}>Set new password</h1>
                <p style={{ color:"#475569", fontSize:14 }}>Choose a strong password for your account.</p>
              </div>

              <form onSubmit={handle} style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div>
                  <label style={{ display:"block", fontSize:12, fontWeight:500, color:"#64748b", marginBottom:8 }}>New password</label>
                  <div style={{ position:"relative" }}>
                    <input id="reset-password" type={showPw ? "text" : "password"} required className="rp-input"
                      value={pw} onChange={e => setPw(e.target.value)} placeholder="Min. 8 characters" style={{ paddingRight:48 }} />
                    <button type="button" tabIndex={-1} className="rp-eye" onClick={() => setShowPw(!showPw)}
                      style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)" }}>
                      {showPw
                        ? <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                        : <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display:"block", fontSize:12, fontWeight:500, color:"#64748b", marginBottom:8 }}>Confirm password</label>
                  <input id="reset-confirm" type={showPw ? "text" : "password"} required className="rp-input"
                    value={cpw} onChange={e => setCpw(e.target.value)} placeholder="Re-enter password" />
                </div>

                {/* Strength bar */}
                {pw.length > 0 && (
                  <div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                      <span style={{ fontSize:11, color:"#475569" }}>Password strength</span>
                      <span style={{ fontSize:11, fontWeight:600, color: pw.length < 8 ? "#ef4444" : pw.length < 12 ? "#f59e0b" : "#22c55e" }}>
                        {pw.length < 8 ? "Too short" : pw.length < 12 ? "Good" : "Strong"}
                      </span>
                    </div>
                    <div style={{ height:4, borderRadius:999, background:"rgba(255,255,255,0.06)", overflow:"hidden" }}>
                      <div style={{ height:"100%", borderRadius:999, transition:"all .3s", width: pw.length < 8 ? "25%" : pw.length < 12 ? "60%" : "100%", background: pw.length < 8 ? "#ef4444" : pw.length < 12 ? "#f59e0b" : "#22c55e" }} />
                    </div>
                  </div>
                )}

                {error && (
                  <div style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", borderRadius:10, background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.18)" }}>
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#f87171" strokeWidth={2} style={{ flexShrink:0 }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p style={{ color:"#fca5a5", fontSize:13 }}>{error}</p>
                  </div>
                )}

                <button id="reset-submit-btn" type="submit" disabled={status === "loading"} className="rp-btn" style={{ marginTop:4 }}>
                  {status === "loading"
                    ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                        <div style={{ width:16, height:16, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin .6s linear infinite" }} />
                        Updating…
                      </span>
                    : "Update Password →"}
                </button>
              </form>

              <p style={{ textAlign:"center", fontSize:13, color:"#374151", marginTop:24 }}>
                <Link href="/auth/login" style={{ color:"#22d3ee", fontWeight:600, textDecoration:"none" }}>← Back to sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
