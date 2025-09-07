"use client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  FaGithub,
  FaGoogle,
  FaFacebook,
  FaLinkedin,
  FaGitlab,
} from "react-icons/fa";

const MicrosoftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="9" height="9" fill="#F35325" />
    <rect x="13" y="2" width="9" height="9" fill="#81BC06" />
    <rect x="2" y="13" width="9" height="9" fill="#05A6F0" />
    <rect x="13" y="13" width="9" height="9" fill="#FFBA08" />
  </svg>
);

type Provider = "github" | "google" | "facebook" | "microsoft" | "linkedin" | "gitlab";
const providers: { name: Provider; icon: JSX.Element; label: string; color: string }[] = [
  { name: "github", icon: <FaGithub />, label: "GitHub", color: "#181717" },
  { name: "google", icon: <FaGoogle />, label: "Google", color: "#EA4335" },
  { name: "facebook", icon: <FaFacebook />, label: "Facebook", color: "#1877F3" },
  { name: "microsoft", icon: <MicrosoftIcon />, label: "Microsoft", color: "#5E5E5E" },
  { name: "linkedin", icon: <FaLinkedin />, label: "LinkedIn", color: "#0077B5" },
  { name: "gitlab", icon: <FaGitlab />, label: "GitLab", color: "#FC6D26" },
];

export default function OAuthButtons() {
  const supabase = createClient();

  const handleOAuth = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  return (
    <div className="flex flex-col gap-2 my-4 items-center w-full">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex flex-row gap-2 justify-center w-full">
          {providers.slice(row * 2, row * 2 + 2).map((p) => (
            <Button
              key={p.name}
              type="button"
              className="flex items-center gap-2 justify-start bg-transparent text-gray-900 font-semibold border border-white hover:bg-transparent hover:text-white hover:scale-105 transition-transform px-4 py-2 w-40"
              style={{ minWidth: '10rem' }}
              onClick={() => handleOAuth(p.name)}
              title={`Continue with ${p.label}`}
            >
              <span style={{ color: p.color, display: 'flex', alignItems: 'center', fontSize: '1.5rem' }}>{p.icon}</span>
              <span className="ml-2" style={{ color: 'inherit' }}>{p.label}</span>
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
