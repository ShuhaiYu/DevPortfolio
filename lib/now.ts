/**
 * Hand-curated "what I'm doing now" snapshot. `updatedAt` is the date this
 * content was last revised — bump it whenever the fields below change, since a
 * stale date next to fresh claims is worse than no date at all.
 */
export const NOW = {
  updatedAt: "2026-08-14",
  shipping: "Red Bridge v2 (Next.js migration)",
  writing: "Next.js 16 Deep Dive: Caching & Turbopack",
  reading: "Designing Data-Intensive Applications",
  location: "Melbourne, AU",
} as const;

export type NowState = typeof NOW;
