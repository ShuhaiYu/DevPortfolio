"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  stagger?: number;
  delay?: number;
  duration?: number;
  start?: string;
  selector?: string;
  once?: boolean;
}

export default function Reveal({
  children,
  as: Tag = "div",
  className,
  y = 40,
  stagger = 0,
  delay = 0,
  duration = 0.9,
  start = "top 85%",
  selector,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const targets = selector
        ? ref.current.querySelectorAll<HTMLElement>(selector)
        : [ref.current];
      if (targets.length === 0) return;

      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: EASE.out,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
