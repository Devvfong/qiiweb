import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// ─── In-memory rate limiter (per IP) ─────────────────────────────────────────
const rateMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS  = 15 * 60 * 1000; // 15-minute window
const MAX_SIGNUP = 5;               // max 5 signups per IP per window

function checkRateLimit(ip: string): boolean {
  const now  = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true; // allowed
  }
  if (entry.count >= MAX_SIGNUP) return false; // blocked
  entry.count++;
  return true;
}

// ─── Email format check ───────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    // 1. Origin / Referer guard — reject requests not from our own front-end
    const origin  = req.headers.get("origin")  ?? "";
    const referer = req.headers.get("referer") ?? "";
    const appUrl  = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

    const originOk  = !origin  || origin.startsWith(appUrl);
    const refererOk = !referer || referer.startsWith(appUrl);

    if (!originOk || !refererOk) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    // 2. IP-based rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim()
            ?? req.headers.get("x-real-ip")
            ?? "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many sign-up attempts. Please wait 15 minutes and try again." },
        { status: 429 }
      );
    }

    // 3. Parse + validate body
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Name
    const trimmedName = String(name).trim();
    if (trimmedName.length < 2 || trimmedName.length > 64) {
      return NextResponse.json({ error: "Name must be between 2 and 64 characters." }, { status: 400 });
    }

    // Email
    const trimmedEmail = String(email).trim().toLowerCase();
    if (!EMAIL_RE.test(trimmedEmail)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (trimmedEmail.length > 254) {
      return NextResponse.json({ error: "Email address is too long." }, { status: 400 });
    }

    // Password strength
    const pw = String(password);
    if (pw.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }
    if (pw.length > 128) {
      return NextResponse.json({ error: "Password is too long." }, { status: 400 });
    }

    // 4. Check for existing account
    const existing = await prisma.user.findUnique({ where: { email: trimmedEmail } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    // 5. Hash + create
    const hashed = await bcrypt.hash(pw, 12);
    await prisma.user.create({
      data: { name: trimmedName, email: trimmedEmail, password: hashed },
    });

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (err) {
    console.error("[signup]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
