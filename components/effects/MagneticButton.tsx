"use client";

import { useRef, type ReactNode, type HTMLAttributes } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface MagneticButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  strength?: number;
}

export default function MagneticButton({
  children,
  strength = 0.35,
  className,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !contextSafe) return;

      const quickX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const quickY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

      const onMove = contextSafe((e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        quickX(relX * strength);
        quickY(relY * strength);
      });

      const onLeave = contextSafe(() => {
        quickX(0);
        quickY(0);
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
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
