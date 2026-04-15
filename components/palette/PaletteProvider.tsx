"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import CommandPalette from "./CommandPalette";
import type { ProjectSummary, BlogPost } from "@/lib/types";

interface PaletteContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
}

const PaletteContext = createContext<PaletteContextValue>({
  open: false,
  setOpen: () => {},
  toggle: () => {},
});

export function usePalette() {
  return useContext(PaletteContext);
}

interface PaletteProviderProps {
  children: ReactNode;
  projects: ProjectSummary[];
  posts: BlogPost[];
}

export default function PaletteProvider({
  children,
  projects,
  posts,
}: PaletteProviderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isInput =
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement ||
        (document.activeElement instanceof HTMLElement &&
          document.activeElement.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "/" && !isInput && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <PaletteContext.Provider
      value={{ open, setOpen, toggle: () => setOpen((v) => !v) }}
    >
      {children}
      <CommandPalette
        open={open}
        setOpen={setOpen}
        projects={projects}
        posts={posts}
      />
    </PaletteContext.Provider>
  );
}
