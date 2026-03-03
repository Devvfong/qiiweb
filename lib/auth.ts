// Re-export authOptions for use in Server Components / API routes
// without importing from the Next.js API route file directly.
export { authOptions } from "@/app/api/auth/[...nextauth]/route";
