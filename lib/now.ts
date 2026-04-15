export const NOW = {
  updatedAt: "2026-04-15",
  shipping: "Red Bridge v2 (Next.js migration)",
  writing: "Next.js 16 Deep Dive: Caching & Turbopack",
  reading: "Designing Data-Intensive Applications",
  location: "Melbourne, AU",
} as const;

export type NowState = typeof NOW;
