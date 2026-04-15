"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export default function AmbientBlobs() {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      const blobs = ref.current.querySelectorAll<HTMLElement>(".ambient-blob");
      blobs.forEach((blob, i) => {
        const driftX = gsap.utils.random(-80, 80);
        const driftY = gsap.utils.random(-60, 60);
        const scale = gsap.utils.random(0.9, 1.2);
        const duration = gsap.utils.random(10, 16);

        gsap.to(blob, {
          x: driftX,
          y: driftY,
          scale,
          duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.8,
        });
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <div className="ambient-blob absolute top-[12%] left-[8%] w-72 sm:w-96 h-72 sm:h-96 bg-primary/20 rounded-full filter blur-3xl opacity-40 mix-blend-screen" />
      <div className="ambient-blob absolute top-[30%] right-[10%] w-80 sm:w-[28rem] h-80 sm:h-[28rem] bg-secondary/20 rounded-full filter blur-3xl opacity-30 mix-blend-screen" />
      <div className="ambient-blob absolute bottom-[10%] left-[35%] w-72 sm:w-[26rem] h-72 sm:h-[26rem] bg-accent/10 rounded-full filter blur-3xl opacity-35 mix-blend-screen" />
    </div>
  );
}
