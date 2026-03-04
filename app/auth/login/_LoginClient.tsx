"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FaGoogle } from "react-icons/fa";
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

export default function LoginClient() {
  const { status } = useSession();
  const router   = useRouter();
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [error, setError]               = useState("");
  const [isLoading, setIsLoading]       = useState(false);
  const [isGoogleLoading, setIsGoogle]  = useState(false);
  const [showPw, setShowPw]             = useState(false);

  useEffect(() => { if (status === "authenticated") router.push("/home"); }, [status, router]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setIsLoading(true);
    const r = await signIn("credentials", { email, password, redirect: false });
    setIsLoading(false);
    r?.error ? setError("Invalid email or password.") : router.push("/home");
  };

  if (status === "loading") return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#060c15" }}>
      <div style={{ width:32, height:32, border:"2px solid rgba(34,211,238,0.2)", borderTopColor:"#22d3ee", borderRadius:"50%", animation:"spin .7s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes aurora  { 0%,100%{transform:scale(1) translate(0,0);} 50%{transform:scale(1.4) translate(5%,5%);} }
        @keyframes aurora2 { 0%,100%{transform:scale(1.2) translate(0,0);} 50%{transform:scale(1) translate(-5%,-5%);} }
        @keyframes floatUp { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-7px);} }

        .lc-root     { display:flex; min-height:100vh; background:#060c15; font-family:'Inter',sans-serif; }
        .lc-hero     { display:none; flex:1; position:relative; overflow:hidden; background:#060c15; }
        .lc-sep      { display:none; width:1px; background:linear-gradient(180deg,transparent 0%,rgba(34,211,238,0.2) 25%,rgba(34,211,238,0.15) 75%,transparent 100%); flex-shrink:0; }
        .lc-form     { display:flex; flex-direction:column; justify-content:center; width:100%; padding:48px 32px; background:#0b1525; position:relative; overflow:hidden; }

        @media (min-width: 1024px) {
          .lc-hero  { display:flex; flex-direction:column; }
          .lc-sep   { display:block; }
          .lc-form  { width:500px; flex-shrink:0; padding:64px 52px; }
        }

        .lc-input {
          width:100%; padding:13px 16px; border-radius:12px; font-size:14px; color:#f1f5f9; font-family:'Inter',sans-serif;
          outline:none; transition:all .2s; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
        }
        .lc-input:focus  { background:rgba(34,211,238,0.05); border-color:rgba(34,211,238,0.4); box-shadow:0 0 0 3px rgba(34,211,238,0.08); }
        .lc-input::placeholder { color:rgba(100,116,139,0.6); }
        input:-webkit-autofill { -webkit-box-shadow:0 0 0 30px #0d1829 inset !important; -webkit-text-fill-color:#f1f5f9 !important; }

        .lc-google {
          width:100%; display:flex; align-items:center; justify-content:center; gap:12px;
          padding:13px 20px; border-radius:12px; font-weight:600; font-size:14px; cursor:pointer;
          transition:all .2s; background:rgba(255,255,255,0.96); color:#1e293b; border:none;
          box-shadow:0 2px 16px rgba(0,0,0,0.4); font-family:'Inter',sans-serif;
        }
        .lc-google:hover:not(:disabled) { background:#fff; transform:translateY(-1px); box-shadow:0 8px 28px rgba(0,0,0,0.5); }
        .lc-google:active { transform:scale(0.98); }
        .lc-google:disabled { opacity:0.6; cursor:not-allowed; }

        .lc-submit {
          width:100%; padding:14px; border-radius:12px; font-weight:700; font-size:15px; color:#fff; border:none;
          cursor:pointer; transition:all .25s; font-family:'Inter',sans-serif;
          background:linear-gradient(135deg,#06b6d4 0%,#3b82f6 55%,#6366f1 100%);
          box-shadow:0 4px 20px rgba(6,182,212,0.28);
        }
        .lc-submit:hover:not(:disabled) { box-shadow:0 8px 32px rgba(6,182,212,0.45); transform:translateY(-1px); }
        .lc-submit:active  { transform:scale(0.98); }
        .lc-submit:disabled { opacity:0.6; cursor:not-allowed; }

        .lc-pill {
          display:inline-flex; align-items:center; gap:8px; padding:8px 14px; border-radius:999px;
          background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
          color:rgba(203,213,225,0.75); font-size:12px; font-weight:500;
        }
        .lc-eye { background:none; border:none; cursor:pointer; color:#475569; padding:0; display:flex; transition:color .2s; }
        .lc-eye:hover { color:#94a3b8; }
      `}</style>

      <div className="lc-root">

        {/* ─── HERO PANEL ─────────────────────────────── */}
        <div className="lc-hero">
          <ParticleCanvas />

          {/* Aurora blobs */}
          <div style={{ position:"absolute", top:"-15%", left:"-10%", width:"55%", height:"55%", borderRadius:"50%", background:"radial-gradient(circle,rgba(6,182,212,0.13) 0%,transparent 70%)", animation:"aurora 14s ease-in-out infinite", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-15%", right:"-10%", width:"50%", height:"50%", borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.11) 0%,transparent 70%)", animation:"aurora2 17s ease-in-out infinite", pointerEvents:"none" }} />

          {/* Grid */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(34,211,238,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.025) 1px,transparent 1px)", backgroundSize:"64px 64px", pointerEvents:"none" }} />

          {/* Content */}
          <div style={{ position:"relative", zIndex:10, height:"100%", display:"flex", flexDirection:"column", padding:"48px 56px" }}>
            {/* Brand */}
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:12, background:"linear-gradient(135deg,#06b6d4,#2563eb)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#fff", fontSize:18, boxShadow:"0 0 24px rgba(6,182,212,0.35)" }}>Q</div>
              <span style={{ color:"#f1f5f9", fontWeight:600, fontSize:17, letterSpacing:"-0.3px" }}>Qii Services</span>
            </div>

            {/* Hero */}
            <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", maxWidth:460 }}>
              {/* Badge */}
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:999, background:"rgba(6,182,212,0.1)", border:"1px solid rgba(6,182,212,0.22)", color:"#22d3ee", fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:28, width:"fit-content" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#22d3ee", boxShadow:"0 0 8px #22d3ee", display:"inline-block" }} />
                Dev-Services CLI
              </div>

              <h2 style={{ fontSize:46, fontWeight:800, color:"#f8fafc", lineHeight:1.15, letterSpacing:"-1.5px", marginBottom:18 }}>
                Your dev tools,
                <span style={{ display:"block", background:"linear-gradient(90deg,#22d3ee,#818cf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>one command away</span>
              </h2>
              <p style={{ color:"rgba(148,163,184,0.75)", fontSize:15, lineHeight:1.85, marginBottom:36, maxWidth:400 }}>
                Activate Windows, reset IDM, and deploy instantly — all secured behind a single authenticated endpoint.
              </p>

              {/* CLI Terminal */}
              <div style={{ borderRadius:16, overflow:"hidden", border:"1px solid rgba(255,255,255,0.07)", background:"rgba(0,0,0,0.45)", backdropFilter:"blur(16px)", marginBottom:32, animation:"floatUp 5s ease-in-out infinite" }}>
                <div style={{ padding:"11px 16px", background:"rgba(255,255,255,0.03)", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", gap:8 }}>
                  {["#ef4444","#f59e0b","#22c55e"].map(c => <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c, opacity:0.85 }} />)}
                  <span style={{ color:"rgba(100,116,139,0.5)", fontSize:11, marginLeft:8, fontFamily:"monospace" }}>bash — qii-cli</span>
                </div>
                <div style={{ padding:"18px 22px", fontFamily:"'JetBrains Mono','Fira Code',monospace", fontSize:12.5, lineHeight:2.1 }}>
                  {[
                    ["$ ", "#64748b", "qii activate-windows", "#22d3ee"],
                    ["✓ ", "#22c55e", "Authenticated · Token valid 30d", "#475569"],
                    ["$ ", "#64748b", "qii reset-idm --silent", "#22d3ee"],
                    ["✓ ", "#22c55e", "IDM reset complete", "#475569"],
                    ["$ ", "#64748b", "qii deploy --env prod", "#22d3ee"],
                    ["▋ ", "#22d3ee", "", ""],
                  ].map(([prefix, pc, text, tc], i) => (
                    <div key={i} style={{ display:"flex" }}>
                      <span style={{ color:pc, marginRight:6 }}>{prefix}</span>
                      <span style={{ color:tc }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pills */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                {[["🔐","Google OAuth"],["⚡","Neon DB"],["🛡️","JWT Sessions"],["📧","Email Auth"]].map(([e, l]) => (
                  <div key={l} className="lc-pill"><span style={{ fontSize:14 }}>{e}</span>{l}</div>
                ))}
              </div>
            </div>

            <div style={{ color:"rgba(71,85,105,0.7)", fontSize:11 }}>© {new Date().getFullYear()} Qii Services · v2.10</div>
          </div>

          {/* Fade edge to separator */}
          <div style={{ position:"absolute", top:0, right:0, width:80, height:"100%", background:"linear-gradient(90deg,transparent,#0b1525)", pointerEvents:"none" }} />
        </div>

        {/* ─── SEPARATOR ──────────────────────────────── */}
        <div className="lc-sep" />

        {/* ─── FORM PANEL ─────────────────────────────── */}
        <div className="lc-form">
          <div style={{ position:"absolute", top:"-20%", right:"-20%", width:"60%", height:"60%", borderRadius:"50%", background:"radial-gradient(circle,rgba(6,182,212,0.04) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-20%", left:"-20%", width:"50%", height:"50%", borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.04) 0%,transparent 70%)", pointerEvents:"none" }} />

          <div style={{ position:"relative", zIndex:10, maxWidth:360, width:"100%", margin:"0 auto", animation:"fadeUp .5s cubic-bezier(.22,1,.36,1) both" }}>

            {/* Mobile brand */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:36 }} className="lc-mobile-brand">
              <style>{`.lc-mobile-brand{display:flex} @media(min-width:1024px){.lc-mobile-brand{display:none}}`}</style>
              <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#06b6d4,#2563eb)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#fff", fontSize:15, boxShadow:"0 0 16px rgba(6,182,212,0.3)" }}>Q</div>
              <span style={{ color:"#f1f5f9", fontWeight:600, fontSize:16 }}>Qii Services</span>
            </div>

            {/* Heading */}
            <div style={{ marginBottom:32 }}>
              <h1 style={{ fontSize:26, fontWeight:800, color:"#f8fafc", marginBottom:6, letterSpacing:"-0.7px" }}>Welcome back</h1>
              <p style={{ color:"#475569", fontSize:14 }}>Sign in to continue to Qii Services</p>
            </div>

            {/* Google Button */}
            <button id="google-signin-btn" className="lc-google" onClick={() => { setIsGoogle(true); signIn("google", { callbackUrl:"/home" }); }} disabled={isGoogleLoading}>
              {isGoogleLoading
                ? <div style={{ width:16, height:16, border:"2px solid #cbd5e1", borderTopColor:"#475569", borderRadius:"50%", animation:"spin .6s linear infinite" }} />
                : <FaGoogle style={{ color:"#EA4335", fontSize:16 }} />}
              <span>{isGoogleLoading ? "Redirecting…" : "Continue with Google"}</span>
            </button>

            {/* Divider */}
            <div style={{ display:"flex", alignItems:"center", gap:14, margin:"22px 0" }}>
              <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.06)" }} />
              <span style={{ color:"#334155", fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", whiteSpace:"nowrap" }}>or sign in with email</span>
              <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.06)" }} />
            </div>

            {/* Form */}
            <form onSubmit={login} style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div>
                <label style={{ display:"block", fontSize:12, fontWeight:500, color:"#64748b", marginBottom:8 }}>Email address</label>
                <input id="login-email" type="email" required autoComplete="email" className="lc-input"
                  value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>

              <div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <label style={{ fontSize:12, fontWeight:500, color:"#64748b" }}>Password</label>
                  <a href="/auth/forgot-password" style={{ fontSize:12, color:"#22d3ee", textDecoration:"none", fontWeight:500 }}>Forgot password?</a>
                </div>
                <div style={{ position:"relative" }}>
                  <input id="login-password" type={showPw ? "text" : "password"} required autoComplete="current-password" className="lc-input"
                    value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                    style={{ paddingRight:48 }} />
                  <button type="button" tabIndex={-1} className="lc-eye" onClick={() => setShowPw(!showPw)}
                    style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)" }}>
                    {showPw
                      ? <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      : <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                  </button>
                </div>
              </div>

              {error && (
                <div style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", borderRadius:10, background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.18)" }}>
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#f87171" strokeWidth={2} style={{ flexShrink:0 }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p style={{ color:"#fca5a5", fontSize:13 }}>{error}</p>
                </div>
              )}

              <button id="email-signin-btn" type="submit" disabled={isLoading} className="lc-submit" style={{ marginTop:4 }}>
                {isLoading
                  ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                      <div style={{ width:16, height:16, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin .6s linear infinite" }} />Signing in…
                    </span>
                  : "Sign In →"}
              </button>
            </form>

            <p style={{ textAlign:"center", fontSize:13, color:"#374151", marginTop:28 }}>
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" style={{ color:"#22d3ee", fontWeight:600, textDecoration:"none" }}>Create one →</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
