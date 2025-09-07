"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/styles/nprogress-custom.css";

NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.15 });

// Global transition state for best UX in app directory
let transitionCount = 0;
const startProgress = () => {
  if (transitionCount === 0) NProgress.start();
  transitionCount++;
};
const stopProgress = () => {
  transitionCount = Math.max(transitionCount - 1, 0);
  if (transitionCount === 0) NProgress.done();
};

export default function ProgressBar() {
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startProgress();
    // Complete the bar as soon as the new page is rendered
    stopProgress();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  return null;
}
