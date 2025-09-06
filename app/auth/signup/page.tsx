"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Vanta refs
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    const loadVanta = async () => {
      const VANTA = (await import("vanta/dist/vanta.topology.min")).default;
      const p5 = (await import("p5")).default;

      if (mounted && !vantaEffect.current && vantaRef.current) {
        vantaEffect.current = VANTA({
          el: vantaRef.current,
          p5,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xaac548,
        });
      }
    };

    loadVanta();

    return () => {
      mounted = false;
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL ||
            "https://qiiweb.netlify.app/auth/callback",
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });

      if (error) throw error;
      setSignupSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-svh flex items-center justify-center p-6 md:p-10">
      {/* Vanta background */}
      <div ref={vantaRef} className="absolute inset-0 -z-10" />

      <div className="w-full max-w-md relative z-10">
        <Card className="bg-transparent border border-white/30 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Create Account</CardTitle>
            <CardDescription className="text-gray-200">
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {signupSuccess ? (
              <div className="text-center space-y-4 text-white">
                <p>
                  Signup successful! Please check your email to confirm your
                  account.
                </p>
                <Button onClick={() => router.push("/auth/login")}>
                  Go to Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-transparent border-white/40 text-white placeholder-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="bg-transparent border-white/40 text-white placeholder-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-transparent border-white/40 text-white placeholder-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="bg-transparent border-white/40 text-white placeholder-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="bg-transparent border-white/40 text-white placeholder-gray-300"
                  />
                </div>

                {error && <p className="text-red-300">{error}</p>}

                <Button
                  type="submit"
                  className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/20"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>

                <div className="text-center text-sm text-gray-200">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="underline underline-offset-4 text-white hover:text-gray-300"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
