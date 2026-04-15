"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, EASE, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export default function PageCurtain({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const top = ref.current?.querySelector<HTMLElement>("[data-curtain-top]");
      const bottom = ref.current?.querySelector<HTMLElement>("[data-curtain-bottom]");
      const brand = ref.current?.querySelector<HTMLElement>("[data-curtain-brand]");
      if (!top || !bottom || !brand) return;

      if (prefersReducedMotion()) {
        gsap.set([top, bottom], { yPercent: (i) => (i === 0 ? -100 : 100) });
        gsap.set(brand, { opacity: 0 });
        ScrollTrigger.refresh();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => ScrollTrigger.refresh(),
      });

      tl.set([top, bottom], { yPercent: 0 })
        .to(brand, { opacity: 1, duration: 0.25, ease: EASE.out }, 0)
        .to(brand, { opacity: 0, duration: 0.25, ease: EASE.out }, 0.6)
        .to(
          top,
          { yPercent: -100, duration: 0.9, ease: EASE.expo },
          0.35,
        )
        .to(
          bottom,
          { yPercent: 100, duration: 0.9, ease: EASE.expo },
          0.35,
        );
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <div
        aria-hidden
        className="fixed inset-0 z-[100] pointer-events-none"
      >
        <div
          data-curtain-top
          className="absolute inset-x-0 top-0 h-[51%] bg-dark border-b border-primary/10"
        />
        <div
          data-curtain-bottom
          className="absolute inset-x-0 bottom-0 h-[51%] bg-dark border-t border-primary/10"
        />
        <div
          data-curtain-brand
          className="absolute inset-0 flex items-center justify-center opacity-0"
        >
          <span className="font-mono text-primary text-xs tracking-[0.5em] uppercase">
            Felix_Yu · Loading
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
