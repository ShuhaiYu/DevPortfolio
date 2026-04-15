"use client";

import { useRef } from "react";
import Image from "next/image";
import { User, Code } from "lucide-react";
import { BIO, SKILLS, EXPERIENCES, PROJECTS } from "@/lib/constants";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";
import ParallaxImage from "@/components/effects/ParallaxImage";

export default function About() {
  const rootRef = useRef<HTMLElement | null>(null);

  const facts = [
    { label: "Based", value: "Melbourne, AU" },
    { label: "Stack depth", value: `${SKILLS.length} technologies` },
    { label: "Shipped", value: `${PROJECTS.length}+ featured projects` },
    { label: "Experience", value: `${EXPERIENCES.length} roles, 6+ years` },
  ];

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const header = root.querySelector<HTMLElement>("[data-about-header]");
      const bio = root.querySelector<HTMLElement>("[data-about-bio]");
      const factItems = root.querySelectorAll<HTMLElement>("[data-about-fact]");
      const chips = root.querySelectorAll<HTMLElement>("[data-about-chip]");

      if (prefersReducedMotion()) {
        gsap.set([header, bio, ...Array.from(factItems), ...Array.from(chips)], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.fromTo(
        [header, bio],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: EASE.out,
          scrollTrigger: { trigger: root, start: "top 70%" },
        },
      );

      gsap.fromTo(
        factItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: EASE.out,
          scrollTrigger: { trigger: root, start: "top 55%" },
        },
      );

      gsap.fromTo(
        chips,
        { opacity: 0, y: 10, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.03,
          ease: EASE.out,
          scrollTrigger: { trigger: root, start: "top 50%" },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="about"
      className="py-20 sm:py-32 bg-dark relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute right-0 top-20 w-full sm:w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
      <div className="absolute left-4 sm:left-10 top-40 w-24 h-24 border border-white/5 rounded-full flex items-center justify-center animate-spin-slow opacity-20">
        <div className="w-16 h-16 border border-white/10 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left: Character Visual */}
          <div className="w-full max-w-md lg:w-5/12 relative group mx-auto lg:mx-0">
            <ParallaxImage
              offset={50}
              className="aspect-[4/5] w-full relative rounded-sm border border-primary/30 bg-surface"
            >
              {/* Overlay UI */}
              <div className="absolute inset-0 z-20 p-4 sm:p-6 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <Code className="text-primary w-6 sm:w-8 h-6 sm:h-8 opacity-80" />
                  <span className="font-mono text-[10px] text-primary/60 tracking-widest">
                    ID: 8492-AC
                  </span>
                </div>
                <div>
                  <div className="h-[1px] w-full bg-primary/30 mb-2 sm:mb-4"></div>
                  <div className="flex justify-between font-mono text-[10px] sm:text-xs text-primary/80">
                    <span>STATUS: ONLINE</span>
                    <span>LOC: MEL_01</span>
                  </div>
                </div>
              </div>

              <div className="relative w-full h-full">
                <Image
                  src="/images/felixyu.png"
                  alt="Felix Yu — Operator profile visual"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </ParallaxImage>

            {/* Decorative Backdrop */}
            <div className="absolute -top-4 -right-4 w-full h-full border border-dashed border-white/20 -z-10 hidden sm:block"></div>
          </div>

          {/* Right: Bio & Facts */}
          <div className="w-full lg:w-7/12">
            <div
              data-about-header
              className="flex items-center gap-4 mb-6 sm:mb-8 opacity-0"
            >
              <div className="p-2 bg-white/5 rounded border border-white/10">
                <User className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
                OPERATOR <span className="text-slate-500">PROFILE</span>
              </h2>
            </div>

            <p
              data-about-bio
              className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10 sm:mb-12 max-w-[65ch] opacity-0"
            >
              {BIO}
            </p>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 mb-10 sm:mb-12 max-w-xl border-t border-white/5 pt-8">
              {facts.map((fact) => (
                <div key={fact.label} data-about-fact className="opacity-0">
                  <dt className="font-mono text-[10px] sm:text-xs tracking-widest text-slate-500 uppercase mb-1">
                    {fact.label}
                  </dt>
                  <dd className="text-white text-base sm:text-lg font-heading tracking-tight">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div>
              <h3 className="font-mono text-xs text-slate-500 mb-4 uppercase tracking-widest">
                // Equipped Modules
              </h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS.slice(0, 10).map((skill) => (
                  <span
                    key={skill}
                    data-about-chip
                    className="opacity-0 px-3 py-1 bg-surface border border-white/10 rounded text-[10px] sm:text-xs font-mono text-slate-300 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
