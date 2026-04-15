"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";

const codeSnippets = [
  "const deploy = async () => await vercel.deploy()",
  "import { AI } from '@anthropic/sdk'",
  "npm run build --production",
  "git push origin main --force",
  "docker compose up -d",
  "SELECT * FROM users WHERE active = true",
  "export default function App() {}",
  "const [state, setState] = useState()",
  "useEffect(() => { fetch('/api') }, [])",
  "tailwind.config.ts",
];

export default function CodeStream() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!rootRef.current) return;
      if (prefersReducedMotion()) {
        gsap.set(rootRef.current, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: EASE.out,
          scrollTrigger: { trigger: rootRef.current, start: "top 85%" },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="py-8 bg-dark overflow-hidden border-y border-white/5 opacity-0"
    >
      <div className="relative">
        {/* Top Row - Moving Right */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...codeSnippets, ...codeSnippets].map((snippet, index) => (
            <span
              key={`top-${index}`}
              className="mx-8 text-slate-600 font-mono text-sm"
            >
              <span className="text-primary">&gt;</span> {snippet}
            </span>
          ))}
        </div>

        {/* Bottom Row - Moving Left */}
        <div className="flex animate-marquee-reverse whitespace-nowrap mt-4">
          {[...codeSnippets, ...codeSnippets].map((snippet, index) => (
            <span
              key={`bottom-${index}`}
              className="mx-8 text-slate-700 font-mono text-xs"
            >
              <span className="text-secondary">//</span> {snippet}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
        .animate-marquee:hover,
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
