"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface ParallaxImageProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export default function ParallaxImage({
  children,
  offset = 60,
  className,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const inner = el.querySelector<HTMLElement>("[data-parallax-inner]");
      if (!inner) return;

      gsap.fromTo(
        inner,
        { y: -offset },
        {
          y: offset,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div
        data-parallax-inner
        style={{
          willChange: "transform",
          position: "absolute",
          inset: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
