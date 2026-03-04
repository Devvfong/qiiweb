import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ProgressBar from "@/components/ProgressBar";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Qii Services",
  description: "Dev-Services CLI — Activate Windows, Reset IDM, and grab deployment tools in one line.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          <ProgressBar />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
