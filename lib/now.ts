/**
 * Hand-curated "what I'm doing now" snapshot. `updatedAt` is the date this
 * content was last revised — bump it whenever the fields below change, since a
 * stale date next to fresh claims is worse than no date at all.
 */
export interface NowState {
  updatedAt: string;
  /** Omit while nothing is actively in flight; the row hides itself. */
  shipping?: string;
  writing?: string;
  reading?: string;
  location: string;
}

export const NOW: NowState = {
  updatedAt: "2026-08-14",
  writing: "Next.js 16 Deep Dive: Caching & Turbopack",
  reading: "Designing Data-Intensive Applications",
  location: "Melbourne, AU",
};
