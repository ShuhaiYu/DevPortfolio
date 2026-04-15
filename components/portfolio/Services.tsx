"use client";

import { useRef } from "react";
import { SERVICES } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";

export default function Services() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const header = root.querySelector<HTMLElement>("[data-services-header]");
      const rows = root.querySelectorAll<HTMLElement>("[data-service-row]");
      const numbers = root.querySelectorAll<HTMLElement>("[data-service-number]");

      if (prefersReducedMotion()) {
        gsap.set([header, ...Array.from(rows)], { opacity: 1, x: 0 });
        numbers.forEach((n, i) => {
          n.textContent = String(i + 1).padStart(2, "0");
        });
        return;
      }

      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: EASE.out,
          scrollTrigger: { trigger: root, start: "top 75%" },
        },
      );

      rows.forEach((row, idx) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: EASE.out,
            scrollTrigger: { trigger: row, start: "top 85%" },
          },
        );

        const numberEl = numbers[idx];
        if (numberEl) {
          const target = idx + 1;
          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 1.2,
            ease: EASE.out,
            snap: { val: 1 },
            onUpdate: () => {
              numberEl.textContent = String(Math.round(counter.val)).padStart(2, "0");
            },
            scrollTrigger: { trigger: row, start: "top 80%" },
          });
        }
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="services"
      className="py-28 sm:py-36 bg-dark relative"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header
          data-services-header
          className="grid md:grid-cols-12 gap-6 mb-16 sm:mb-20 items-end opacity-0"
        >
          <div className="md:col-span-8">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="font-mono text-xs text-slate-300 uppercase tracking-widest">
                System Capabilities
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tighter leading-[0.95]">
              Active <span className="text-primary">Protocols</span>
            </h2>
          </div>
          <p className="md:col-span-4 text-slate-400 max-w-sm md:text-right md:pb-3">
            Deploying high-end digital solutions with surgical precision.
          </p>
        </header>

        <div className="border-t border-white/5">
          {SERVICES.map((service, index) => (
            <article
              key={index}
              data-service-row
              className="group grid md:grid-cols-12 gap-4 md:gap-8 py-8 sm:py-10 border-b border-white/5 items-start hover:bg-primary/[0.02] transition-colors opacity-0"
            >
              <div className="md:col-span-1 flex items-baseline">
                <span
                  data-service-number
                  className="font-mono text-xs text-primary/70 tracking-widest"
                >
                  00
                </span>
              </div>

              <div className="md:col-span-4">
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white group-hover:text-primary transition-colors tracking-tight leading-tight">
                  {service.title}
                </h3>
              </div>

              <div className="md:col-span-6">
                <p className="text-slate-400 text-base leading-relaxed max-w-prose">
                  {service.description}
                </p>
              </div>

              <div className="md:col-span-1 hidden md:flex justify-end pt-1 opacity-40 group-hover:opacity-100 transition-opacity">
                <Icon
                  name={service.iconName}
                  size={20}
                  className="text-slate-500 group-hover:text-primary transition-colors"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
