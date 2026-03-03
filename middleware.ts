import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Redirect authenticated users away from auth pages → /home
    const isAuthPage =
      pathname.startsWith("/auth/login") ||
      pathname.startsWith("/auth/signup") ||
      pathname.startsWith("/auth/forgot-password") ||
      pathname.startsWith("/auth/reset-password");

    if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/home", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;
        // /home requires authentication
        if (pathname.startsWith("/home")) return !!token;
        // Everything else is public
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/home/:path*", "/auth/:path*"],
};
