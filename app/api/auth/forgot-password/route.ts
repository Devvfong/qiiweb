import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });

    // Silently succeed if user not found or Google-only (security: don't reveal existence)
    if (!user || !user.password) {
      return NextResponse.json({ success: true });
    }

    // Delete any existing tokens for this email
    await prisma.passwordResetToken.deleteMany({ where: { email } });

    // Generate secure token (expires in 1 hour)
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60);

    await prisma.passwordResetToken.create({
      data: { email, token, expires },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

    if (process.env.NODE_ENV === "development" && !process.env.RESEND_API_KEY) {
      // Dev fallback — print to terminal if Resend not configured
      console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🔗 PASSWORD RESET LINK (dev mode):");
      console.log(resetUrl);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
      return NextResponse.json({ success: true });
    }

    await resend.emails.send({
      from: "Qii Services <noreply@devqii.me>",
      to: email,
      subject: "Reset your Qii Services password",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0f172a;color:#e2e8f0;border-radius:12px;overflow:hidden;">
          <div style="height:3px;background:linear-gradient(90deg,#38bdf8,#818cf8);"></div>
          <div style="padding:40px 32px;">
            <h2 style="margin:0 0 8px;font-size:22px;color:#f8fafc;">Reset your password</h2>
            <p style="color:#94a3b8;margin:0 0 24px;">
              Click the button below to set a new password.<br/>
              This link expires in <strong style="color:#e2e8f0;">1 hour</strong>.
            </p>
            <a href="${resetUrl}"
              style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#0ea5e9,#0284c7);color:#fff;text-decoration:none;border-radius:10px;font-weight:600;font-size:15px;">
              Reset Password
            </a>
            <p style="margin:24px 0 0;font-size:13px;color:#475569;">
              If you didn't request this, you can safely ignore this email.
            </p>
            <hr style="border:none;border-top:1px solid #1e293b;margin:24px 0;">
            <p style="margin:0;font-size:12px;color:#334155;">Qii Services · Dev-Services CLI</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[forgot-password]", err);
    return NextResponse.json({ error: "Failed to send reset email." }, { status: 500 });
  }
}
