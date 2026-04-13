"use client";

import dynamic from "next/dynamic";
import { ArrowRight, Terminal } from "lucide-react";
import { OWNER_NAME, OWNER_TITLE } from "@/lib/constants";

// Dynamic import for Three.js component to avoid SSR issues
const FloatingLines = dynamic(() => import("@/components/effects/FloatingLines"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-dark" />,
});

export default function Hero() {
  return (
    <section
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

      {/* Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-secondary/30 rounded-full filter blur-[80px] sm:blur-[120px] animate-blob opacity-40 z-[2]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-primary/20 rounded-full filter blur-[80px] sm:blur-[120px] animate-blob animation-delay-2000 opacity-40 z-[2]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center text-center">
        {/* Status Pill */}
        <div
          className="mb-6 sm:mb-8 inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 animate-slide-up backdrop-blur-sm"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-primary font-mono text-[10px] sm:text-xs tracking-widest uppercase">
            System Online
          </span>
        </div>

        {/* Main Title with Glitch Effect */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-white mb-6 relative z-10 leading-[0.9] w-full max-w-[95vw]">
          <span
            className="block animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            DIGITAL
          </span>
          <span
            className="block text-primary animate-slide-up glitch-text"
            data-text="ARCHITECT"
            style={{ animationDelay: "0.4s" }}
          >
            ARCHITECT
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-4 sm:mt-6 max-w-2xl text-slate-400 text-base sm:text-xl font-light animate-slide-up px-4"
          style={{ animationDelay: "0.6s" }}
        >
          I&apos;m <strong className="text-white">{OWNER_NAME}</strong>.{" "}
          {OWNER_TITLE}. <br className="hidden sm:block" />
          Building high-performance interfaces for the{" "}
          <span className="text-accent font-mono">next web</span>.
        </p>

        {/* Action Buttons */}
        <div
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 animate-slide-up"
          style={{ animationDelay: "0.8s" }}
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-primary text-dark font-bold text-base sm:text-lg rounded-sm overflow-hidden hover:shadow-[0_0_20px_rgba(240,196,69,0.5)] transition-all duration-300 text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Projects{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </a>

          <a
            href="#contact"
            className="group px-8 py-4 border border-white/20 text-white font-mono text-sm sm:text-base rounded-sm hover:bg-white/5 hover:border-primary/50 transition-all flex items-center justify-center gap-2 text-center"
          >
            <Terminal className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
            Initialize_Contact
          </a>
        </div>
      </div>
    </section>
  );
}
