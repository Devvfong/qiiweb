"use client";
export const dynamic = "force-dynamic";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
    }));
    let id: number;
    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > c.width) n.vx *= -1;
        if (n.y < 0 || n.y > c.height) n.vy *= -1;
      });
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(34,211,238,${0.28 * (1 - d / 130)})`;
            ctx.lineWidth = 0.9; ctx.stroke();
          }
        });
        ctx.beginPath(); ctx.arc(a.x, a.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34,211,238,0.65)"; ctx.fill();
      });
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  @keyframes spin    { to { transform:rotate(360deg); } }
  @keyframes fadeUp  { from { opacity:0;transform:translateY(16px); } to { opacity:1;transform:translateY(0); } }
  @keyframes aurora  { 0%,100%{transform:scale(1) translate(0,0);} 50%{transform:scale(1.4) translate(5%,5%);} }
  @keyframes aurora2 { 0%,100%{transform:scale(1.2) translate(0,0);} 50%{transform:scale(1) translate(-5%,-5%);} }
  @keyframes floatUp { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-7px);} }
  @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(34,211,238,0.4);} 70%{box-shadow:0 0 0 10px rgba(34,211,238,0);} }

  .fp-root  { display:flex; min-height:100vh; background:#060c15; font-family:'Inter',sans-serif; }
  .fp-hero  { display:none; flex:1; position:relative; overflow:hidden; background:#060c15; }
  .fp-sep   { display:none; width:1px; background:linear-gradient(180deg,transparent 0%,rgba(34,211,238,0.2) 25%,rgba(34,211,238,0.15) 75%,transparent 100%); flex-shrink:0; }
  .fp-panel { display:flex; flex-direction:column; justify-content:center; width:100%; padding:48px 32px; background:#0b1525; position:relative; overflow:hidden; }

  @media (min-width: 1024px) {
    .fp-hero  { display:flex; flex-direction:column; }
    .fp-sep   { display:block; }
    .fp-panel { width:500px; flex-shrink:0; padding:64px 52px; }
  }

  .fp-input { width:100%; padding:13px 16px; border-radius:12px; font-size:14px; color:#f1f5f9; font-family:'Inter',sans-serif; outline:none; transition:all .2s; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); }
  .fp-input:focus { background:rgba(34,211,238,0.05); border-color:rgba(34,211,238,0.4); box-shadow:0 0 0 3px rgba(34,211,238,0.08); }
  .fp-input::placeholder { color:rgba(100,116,139,0.5); }
  input:-webkit-autofill { -webkit-box-shadow:0 0 0 30px #0d1829 inset !important; -webkit-text-fill-color:#f1f5f9 !important; }

  .fp-btn { width:100%; padding:14px; border-radius:12px; font-weight:700; font-size:15px; color:#fff; border:none; cursor:pointer; transition:all .25s; font-family:'Inter',sans-serif; background:linear-gradient(135deg,#06b6d4 0%,#3b82f6 55%,#6366f1 100%); box-shadow:0 4px 20px rgba(6,182,212,0.28); }
  .fp-btn:hover:not(:disabled) { box-shadow:0 8px 32px rgba(6,182,212,0.45); transform:translateY(-1px); }
  .fp-btn:active  { transform:scale(0.98); }
  .fp-btn:disabled { opacity:0.6; cursor:not-allowed; }

  .fp-mobile-brand { display:flex; } @media(min-width:1024px){ .fp-mobile-brand { display:none; } }
`;

export default function ForgotPasswordPage() {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"sent"|"error">("idle");
  const [error, setError]   = useState("");

  const handle = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus("loading"); setError("");
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }),
    });
    res.ok ? setStatus("sent") : (setError((await res.json()).error || "Something went wrong."), setStatus("error"));
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="fp-root">

        {/* ─── HERO PANEL ─────────────────────────────── */}
        <div className="fp-hero">
          <ParticleCanvas />
          <div style={{ position:"absolute", top:"-15%", left:"-10%", width:"55%", height:"55%", borderRadius:"50%", background:"radial-gradient(circle,rgba(6,182,212,0.13) 0%,transparent 70%)", animation:"aurora 14s ease-in-out infinite", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-15%", right:"-10%", width:"50%", height:"50%", borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.11) 0%,transparent 70%)", animation:"aurora2 17s ease-in-out infinite", pointerEvents:"none" }} />
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(34,211,238,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.025) 1px,transparent 1px)", backgroundSize:"64px 64px", pointerEvents:"none" }} />

          <div style={{ position:"relative", zIndex:10, height:"100%", display:"flex", flexDirection:"column", padding:"48px 56px" }}>
            {/* Brand */}
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:12, background:"linear-gradient(135deg,#06b6d4,#2563eb)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#fff", fontSize:18, boxShadow:"0 0 24px rgba(6,182,212,0.35)" }}>Q</div>
              <span style={{ color:"#f1f5f9", fontWeight:600, fontSize:17, letterSpacing:"-0.3px" }}>Qii Services</span>
            </div>

            {/* Hero content */}
            <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", maxWidth:460 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:999, background:"rgba(6,182,212,0.1)", border:"1px solid rgba(6,182,212,0.22)", color:"#22d3ee", fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:28, width:"fit-content" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#22d3ee", boxShadow:"0 0 8px #22d3ee", display:"inline-block" }} />
                Account Recovery
              </div>

              <h2 style={{ fontSize:46, fontWeight:800, color:"#f8fafc", lineHeight:1.15, letterSpacing:"-1.5px", marginBottom:18 }}>
                Locked out?
                <span style={{ display:"block", background:"linear-gradient(90deg,#22d3ee,#818cf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>We&apos;ve got you.</span>
              </h2>
              <p style={{ color:"rgba(148,163,184,0.75)", fontSize:15, lineHeight:1.85, marginBottom:36, maxWidth:400 }}>
                Enter your email and we&apos;ll send a secure reset link straight to your inbox. Takes less than 30 seconds.
              </p>

              {/* Steps card */}
              <div style={{ borderRadius:16, overflow:"hidden", border:"1px solid rgba(255,255,255,0.07)", background:"rgba(0,0,0,0.4)", backdropFilter:"blur(16px)", marginBottom:32, animation:"floatUp 5s ease-in-out infinite" }}>
                <div style={{ padding:"11px 16px", background:"rgba(255,255,255,0.03)", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", gap:8 }}>
                  {["#ef4444","#f59e0b","#22c55e"].map(c => <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c, opacity:0.85 }} />)}
                  <span style={{ color:"rgba(100,116,139,0.5)", fontSize:11, marginLeft:8, fontFamily:"monospace" }}>recovery — steps</span>
                </div>
                <div style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:14 }}>
                  {[
                    ["01", "#22d3ee", "Enter your account email address"],
                    ["02", "#818cf8", "Check inbox for the secure link"],
                    ["03", "#22c55e", "Set your new password & sign in"],
                  ].map(([n, color, text]) => (
                    <div key={n} style={{ display:"flex", alignItems:"center", gap:14 }}>
                      <div style={{ width:28, height:28, borderRadius:8, background:`${color}18`, border:`1px solid ${color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color, flexShrink:0 }}>{n}</div>
                      <span style={{ color:"rgba(203,213,225,0.75)", fontSize:13 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature pills */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                {[["🔐","Secure token"],["⏱️","Expires in 1 hour"],["🛡️","One-time use"],["📧","Sent instantly"]].map(([e, l]) => (
                  <div key={l} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"8px 14px", borderRadius:999, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"rgba(203,213,225,0.75)", fontSize:12, fontWeight:500 }}>
                    <span style={{ fontSize:14 }}>{e}</span>{l}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ color:"rgba(71,85,105,0.7)", fontSize:11 }}>© {new Date().getFullYear()} Qii Services · v2.10</div>
          </div>

          <div style={{ position:"absolute", top:0, right:0, width:80, height:"100%", background:"linear-gradient(90deg,transparent,#0b1525)", pointerEvents:"none" }} />
        </div>

        {/* ─── SEPARATOR ──────────────────────────────── */}
        <div className="fp-sep" />

        {/* ─── FORM PANEL ─────────────────────────────── */}
        <div className="fp-panel">
          <div style={{ position:"absolute", top:"-20%", right:"-20%", width:"60%", height:"60%", borderRadius:"50%", background:"radial-gradient(circle,rgba(6,182,212,0.04) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-20%", left:"-20%", width:"50%", height:"50%", borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.04) 0%,transparent 70%)", pointerEvents:"none" }} />

          <div style={{ position:"relative", zIndex:10, maxWidth:360, width:"100%", margin:"0 auto", animation:"fadeUp .5s cubic-bezier(.22,1,.36,1) both" }}>

            {/* Mobile brand */}
            <div className="fp-mobile-brand" style={{ alignItems:"center", gap:10, marginBottom:36 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#06b6d4,#2563eb)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#fff", fontSize:15, boxShadow:"0 0 16px rgba(6,182,212,0.3)" }}>Q</div>
              <span style={{ color:"#f1f5f9", fontWeight:600, fontSize:16 }}>Qii Services</span>
            </div>

            {status === "sent" ? (
              /* ── Success ── */
              <div style={{ textAlign:"center", paddingTop:16 }}>
                <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(34,211,238,0.1)", border:"1px solid rgba(34,211,238,0.25)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", animation:"pulse 2s ease-in-out infinite" }}>
                  <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="#22d3ee" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 style={{ fontSize:24, fontWeight:800, color:"#f8fafc", marginBottom:8, letterSpacing:"-0.7px" }}>Check your inbox</h1>
                <p style={{ color:"#475569", fontSize:14, marginBottom:6, lineHeight:1.6 }}>We sent a secure reset link to</p>
                <p style={{ color:"#22d3ee", fontSize:15, fontWeight:600, marginBottom:6 }}>{email}</p>
                <p style={{ color:"#334155", fontSize:12, marginBottom:32 }}>Link expires in 1 hour · Check spam if not found</p>
                <Link href="/auth/login" style={{ display:"inline-flex", alignItems:"center", gap:8, color:"#22d3ee", textDecoration:"none", fontSize:14, fontWeight:600 }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Back to sign in
                </Link>
              </div>
            ) : (
              <>
                <div style={{ marginBottom:32 }}>
                  <h1 style={{ fontSize:26, fontWeight:800, color:"#f8fafc", marginBottom:6, letterSpacing:"-0.7px" }}>Forgot password?</h1>
                  <p style={{ color:"#475569", fontSize:14, lineHeight:1.6 }}>Enter your email and we&apos;ll send you a reset link.</p>
                </div>

                <form onSubmit={handle} style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  <div>
                    <label style={{ display:"block", fontSize:12, fontWeight:500, color:"#64748b", marginBottom:8 }}>Email address</label>
                    <input id="forgot-email" type="email" required className="fp-input"
                      value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
                  </div>

                  {status === "error" && (
                    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", borderRadius:10, background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.18)" }}>
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#f87171" strokeWidth={2} style={{ flexShrink:0 }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <p style={{ color:"#fca5a5", fontSize:13 }}>{error}</p>
                    </div>
                  )}

                  <button id="forgot-submit-btn" type="submit" disabled={status === "loading"} className="fp-btn" style={{ marginTop:4 }}>
                    {status === "loading"
                      ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                          <div style={{ width:16, height:16, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin .6s linear infinite" }} />
                          Sending…
                        </span>
                      : "Send Reset Link →"}
                  </button>
                </form>

                <p style={{ textAlign:"center", fontSize:13, color:"#374151", marginTop:28 }}>
                  Remember your password?{" "}
                  <Link href="/auth/login" style={{ color:"#22d3ee", fontWeight:600, textDecoration:"none" }}>Sign in</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
