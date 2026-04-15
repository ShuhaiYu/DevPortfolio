"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Terminal } from "lucide-react";
import { OWNER_NAME, OWNER_TITLE } from "@/lib/constants";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";
import AmbientBlobs from "@/components/effects/AmbientBlobs";
import MagneticButton from "@/components/effects/MagneticButton";

const FloatingLines = dynamic(() => import("@/components/effects/FloatingLines"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-dark" />,
});

const HEADLINE_LINES: string[][] = [
  ["DIGITAL"],
  ["ARCHITECT"],
];

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const pill = root.querySelector<HTMLElement>("[data-hero-pill]");
      const words = root.querySelectorAll<HTMLElement>("[data-hero-word]");
      const subtitle = root.querySelector<HTMLElement>("[data-hero-subtitle]");
      const ctas = root.querySelectorAll<HTMLElement>("[data-hero-cta]");

      const targets = [pill, ...Array.from(words), subtitle, ...Array.from(ctas)].filter(
        Boolean,
      );
      if (targets.length === 0) return;

      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, y: 0, rotateX: 0, scale: 1 });
        return;
      }

      gsap.set(targets, { opacity: 0 });

      const tl = gsap.timeline({ delay: 1.2 });
      tl.fromTo(
        pill,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: EASE.out },
      )
        .fromTo(
          words,
          { opacity: 0, y: 80, rotateX: -60 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: EASE.expo,
          },
          "-=0.2",
        )
        .fromTo(
          subtitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: EASE.out },
          "-=0.3",
        )
        .fromTo(
          ctas,
          { opacity: 0, y: 16, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: EASE.elastic,
          },
          "-=0.3",
        );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-20 pb-10 overflow-hidden bg-dark"
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 w-full h-full perspective-[1000px] overflow-hidden z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(240,196,69,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(240,196,69,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [transform:rotateX(60deg)_translateY(-20%)_scale(2)] opacity-20 animate-pulse-fast origin-top"></div>
      </div>

      {/* Floating Lines Background */}
      <div className="absolute inset-0 w-full h-full z-[1] opacity-40">
        <FloatingLines
          linesGradient={["#f0c445", "#c08030", "#744010"]}
          enabledWaves={["middle", "bottom"]}
          lineCount={[10, 12]}
          lineDistance={[7, 5]}
          bendRadius={5.0}
          bendStrength={-0.3}
          interactive={true}
          parallax={true}
          mixBlendMode="screen"
        />
      </div>

      {/* GSAP-driven ambient blobs */}
      <div className="absolute inset-0 z-[2]">
        <AmbientBlobs />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center text-center">
        {/* Status Pill */}
        <div
          data-hero-pill
          className="mb-6 sm:mb-8 inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm opacity-0"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-primary font-mono text-[10px] sm:text-xs tracking-widest uppercase">
            System Online
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-white mb-6 relative z-10 leading-[0.9] w-full max-w-[95vw]">
          {HEADLINE_LINES.map((line, lineIdx) =>
            line.map((word) => (
              <span
                key={`${lineIdx}-${word}`}
                className={`block overflow-hidden ${
                  word === "ARCHITECT" ? "text-primary glitch-text" : ""
                }`}
                data-text={word === "ARCHITECT" ? "ARCHITECT" : undefined}
              >
                <span
                  data-hero-word
                  className="inline-block opacity-0"
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {word}
                </span>
              </span>
            )),
          )}
        </h1>

        {/* Subtitle */}
        <p
          data-hero-subtitle
          className="mt-4 sm:mt-6 max-w-2xl text-slate-400 text-base sm:text-xl font-light px-4 opacity-0"
        >
          I&apos;m <strong className="text-white">{OWNER_NAME}</strong>.{" "}
          {OWNER_TITLE}. <br className="hidden sm:block" />
          Building high-performance interfaces for the{" "}
          <span className="text-accent font-mono">next web</span>.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4">
          <MagneticButton data-hero-cta className="opacity-0">
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-primary text-dark font-bold text-base sm:text-lg rounded-sm overflow-hidden hover:shadow-[0_0_20px_rgba(240,196,69,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View Projects{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </a>
          </MagneticButton>

          <MagneticButton data-hero-cta className="opacity-0">
            <a
              href="#contact"
              className="group px-8 py-4 border border-white/20 text-white font-mono text-sm sm:text-base rounded-sm hover:bg-white/5 hover:border-primary/50 transition-all flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
              Initialize_Contact
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
