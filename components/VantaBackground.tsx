"use client";

import { useEffect, useRef } from "react";
// @ts-ignore
import CLOUDS from "vanta/dist/vanta.clouds.min";
// @ts-ignore
import * as THREE from "three";

interface VantaBackgroundProps {
  className?: string;
}

export default function VantaBackground({
  className = "",
}: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      const isMobile = window.innerWidth < 768;
      if (isMobile) return;

      vantaEffect.current = CLOUDS({
        el: vantaRef.current,
        THREE,
        mouseControls: false, // disables mouse controls for less CPU
        touchControls: false, // disables touch controls for less CPU
        // gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 0.45, // lower scale for smoother perf
        scaleMobile: 0.3,
        skyColor: 0x202040,
        cloudColor: 0xffffff,
        cloudShadowColor: 0x000000,
        sunColor: 0xff9900,
        sunGlareColor: 0xffdd33,
        sunlightColor: 0xffffff,
        // You can try adding: cloudShadow: false, if supported
      });
    }
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className={`absolute inset-0 w-full h-full -z-10 will-change-transform bg-[#202040] ${className}`}
      style={{
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
      }}
    />
  );
}
