"use client";

import { useRef, type ReactNode, type HTMLAttributes } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  max?: number;
}

export default function TiltCard({
  children,
  max = 6,
  className,
  style,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !contextSafe) return;

      const quickRX = gsap.quickTo(el, "rotationX", {
        duration: 0.5,
        ease: "power3.out",
      });
      const quickRY = gsap.quickTo(el, "rotationY", {
        duration: 0.5,
        ease: "power3.out",
      });

      const onMove = contextSafe((e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        quickRX(-ny * max * 2);
        quickRY(nx * max * 2);
      });

      const onLeave = contextSafe(() => {
        quickRX(0);
        quickRY(0);
      });

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d", ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
