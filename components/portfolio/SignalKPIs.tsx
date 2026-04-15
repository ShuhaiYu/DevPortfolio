"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";

interface KPI {
  label: string;
  value: number;
}

interface SignalKPIsProps {
  kpis: KPI[];
}

export default function SignalKPIs({ kpis }: SignalKPIsProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const nums = root.querySelectorAll<HTMLElement>("[data-kpi-value]");

      if (prefersReducedMotion()) {
        nums.forEach((el) => {
          const target = Number(el.dataset.kpiValue ?? "0");
          el.textContent = target.toLocaleString();
        });
        return;
      }

      nums.forEach((el) => {
        const target = Number(el.dataset.kpiValue ?? "0");
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: Math.min(1.8, 0.6 + target / 150),
          ease: EASE.out,
          snap: { val: 1 },
          onUpdate: () => {
            el.textContent = Math.round(counter.val).toLocaleString();
          },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="grid grid-cols-3 md:grid-cols-1 gap-px bg-white/10 rounded-xl overflow-hidden md:w-56"
    >
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-dark p-5 sm:p-6 flex flex-col justify-center"
        >
          <div
            data-kpi-value={kpi.value}
            className="text-3xl sm:text-4xl font-heading font-bold text-primary tracking-tight tabular-nums"
          >
            0
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">
            {kpi.label}
          </div>
        </div>
      ))}
    </div>
  );
}
