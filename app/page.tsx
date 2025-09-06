import VantaBackground from "@/components/VantaBackground";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      <VantaBackground />

      <div className="w-full max-w-md relative z-1">
        <Card className="bg-transparent border border-white/30 shadow-xl rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-white">Welcome</CardTitle>
            <CardDescription className="text-gray-200">
              Get started by creating an account or signing in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/20">
              <Link href="/auth/signup">Create Account</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full bg-transparent border border-white/20 text-white hover:bg-white/10"
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
