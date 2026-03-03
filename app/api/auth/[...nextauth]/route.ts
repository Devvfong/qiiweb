import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  // ─── JWT strategy (required for CredentialsProvider) ────────────────────────
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 }, // 30 days

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true, // merge Google + email accounts
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // No user or Google-only account (no password)
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  // ─── Custom pages ────────────────────────────────────────────────────────────
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  // ─── Callbacks ───────────────────────────────────────────────────────────────
  callbacks: {
    // Persist user id + profile into the JWT on every sign-in
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id    = user.id;
        token.name  = user.name;
        token.email = user.email;
        token.image = (user as any).image ?? null;
      }
      // Handle client-side session updates (e.g. profile changes)
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },

    // Expose id + full profile from JWT → client session
    async session({ session, token }) {
      if (session.user) {
        session.user.id    = token.id as string;
        session.user.name  = token.name as string;
        session.user.email = token.email as string;
        (session.user as any).image = token.image as string | null;
      }
      return session;
    },
  },

  // ─── Security ─────────────────────────────────────────────────────────────
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
