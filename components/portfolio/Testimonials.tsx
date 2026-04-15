"use client";

import { useRef } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { MessageSquare } from "lucide-react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";

export default function Testimonials() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [featured, ...supporting] = TESTIMONIALS;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const header = root.querySelector<HTMLElement>("[data-tm-header]");
      const feat = root.querySelector<HTMLElement>("[data-tm-featured]");
      const quote = root.querySelector<HTMLElement>("[data-tm-mark]");
      const items = root.querySelectorAll<HTMLElement>("[data-tm-item]");

      if (prefersReducedMotion()) {
        gsap.set([header, feat, quote, ...Array.from(items)], {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
        });
        return;
      }

      gsap.fromTo(
        header,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: EASE.out,
          scrollTrigger: { trigger: root, start: "top 80%" },
        },
      );

      if (quote) {
        gsap.fromTo(
          quote,
          { opacity: 0, scale: 0.6, rotate: -25 },
          {
            opacity: 0.3,
            scale: 1,
            rotate: 0,
            duration: 1,
            ease: EASE.expo,
            scrollTrigger: { trigger: feat, start: "top 75%" },
          },
        );
      }

      gsap.fromTo(
        feat,
        { opacity: 0, scale: 1.05, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: EASE.out,
          scrollTrigger: { trigger: feat, start: "top 70%" },
        },
      );

      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: EASE.out,
          scrollTrigger: { trigger: root, start: "top 55%" },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="py-24 sm:py-32 bg-dark border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-tm-header
          className="flex items-end justify-between mb-16 sm:mb-20 gap-8 opacity-0"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white flex items-center gap-4 tracking-tight">
            <MessageSquare className="text-secondary w-6 h-6" />
            Incoming <span className="text-slate-500">Transmissions</span>
          </h2>
          <div className="hidden md:block font-mono text-xs text-slate-500 uppercase tracking-widest pb-2">
            // {TESTIMONIALS.length} Records
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <figure data-tm-featured className="md:col-span-7 relative opacity-0">
            <div
              data-tm-mark
              className="absolute -top-6 -left-2 font-heading text-7xl sm:text-8xl text-primary leading-none select-none opacity-0"
            >
              &ldquo;
            </div>
            <blockquote className="relative pt-6">
              <p className="font-heading text-2xl sm:text-3xl md:text-4xl text-white leading-[1.25] tracking-tight">
                {featured.text}
              </p>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <div className="w-10 h-10 bg-surface border border-white/10 rounded-full flex items-center justify-center text-xs font-bold text-white">
                {featured.name.charAt(0)}
              </div>
              <div>
                <div className="text-white font-bold text-sm">{featured.name}</div>
                <div className="text-xs font-mono text-primary">
                  {featured.role} @ {featured.company}
                </div>
              </div>
            </figcaption>
          </figure>

          <div className="md:col-span-5 flex flex-col gap-8 md:border-l md:border-white/5 md:pl-10">
            {supporting.map((t) => (
              <figure key={t.id} data-tm-item className="group opacity-0">
                <blockquote>
                  <p className="text-slate-300 text-base leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-8 h-8 bg-surface border border-white/10 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs">{t.name}</div>
                    <div className="text-[10px] font-mono text-slate-500">
                      {t.role} @ {t.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
