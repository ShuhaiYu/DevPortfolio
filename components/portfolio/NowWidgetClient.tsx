"use client";

import { useRef, useState } from "react";
import { X, Rocket, PenTool, BookOpen, GitCommit } from "lucide-react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";
import { useChatState } from "@/components/ui/ChatStateProvider";
import type { NowState } from "@/lib/now";

interface LatestCommit {
  message: string;
  repo: string;
  ago: string;
  url: string;
}

interface NowWidgetClientProps {
  now: NowState;
  latestCommit: LatestCommit | null;
}

export default function NowWidgetClient({ now, latestCommit }: NowWidgetClientProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { isChatOpen } = useChatState();
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: EASE.elastic,
          delay: 3,
        },
      );
    },
    { scope: ref },
  );

  // The chat panel covers this exact corner, so yield the space entirely while
  // it is open. The user's own collapse choice is preserved for when it closes.
  if (isChatOpen) return null;

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        aria-label="Expand Now widget"
        className="hidden lg:flex fixed bottom-24 right-6 z-30 w-10 h-10 items-center justify-center rounded-full bg-surface border border-primary/30 text-primary hover:bg-primary hover:text-dark transition-all"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
      </button>
    );
  }

  return (
    <div
      ref={ref}
      className="hidden lg:block fixed bottom-24 right-6 z-30 w-[300px] bg-surface/95 backdrop-blur-md border border-primary/20 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] opacity-0"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          Now · {now.updatedAt}
        </div>
        <button
          onClick={() => setCollapsed(true)}
          aria-label="Collapse Now widget"
          className="text-slate-500 hover:text-white transition-colors -m-2 p-2"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-4 space-y-3 font-mono text-xs">
        <Row icon={<Rocket className="w-3.5 h-3.5" />} label="Shipping" value={now.shipping} />
        <Row icon={<PenTool className="w-3.5 h-3.5" />} label="Writing" value={now.writing} />
        <Row icon={<BookOpen className="w-3.5 h-3.5" />} label="Reading" value={now.reading} />
      </div>

      {latestCommit && (
        <a
          href={latestCommit.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-4 py-3 border-t border-white/10 group hover:bg-primary/5 transition-colors"
        >
          <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase tracking-[0.25em] mb-1.5">
            <GitCommit className="w-3 h-3" />
            Last Commit · {latestCommit.ago}
          </div>
          <p className="text-slate-300 text-xs truncate group-hover:text-primary transition-colors">
            {latestCommit.message}
          </p>
          <p className="text-secondary/70 font-mono text-[10px] truncate mt-0.5">
            @ {latestCommit.repo}
          </p>
        </a>
      )}

      <div className="px-4 py-2 border-t border-white/5 text-slate-500 font-mono text-[10px] tracking-widest uppercase">
        {now.location}
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-primary/80">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="text-slate-500 text-[10px] uppercase tracking-[0.25em]">
          {label}
        </div>
        <div className="text-slate-200 leading-snug">{value}</div>
      </div>
    </div>
  );
}
