"use client";

import { useEffect, useRef } from "react";

// @ts-ignore
import NET from "vanta/dist/vanta.net.min";
// @ts-ignore
import * as THREE from "three";

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = NET({
        el: vantaRef.current,
        THREE: THREE,
        color: 0xff3f81, // line color
        backgroundColor: 0x23153c, // background color
        points: 10, // number of nodes
        maxDistance: 20, // max connection distance
        spacing: 15, // spacing between points
        showDots: true, // must be true for color to apply to lines
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
    <div ref={vantaRef} className="absolute inset-0 w-full h-screen -z-10" />
  );
}
