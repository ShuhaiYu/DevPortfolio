import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: "1efjjikg",
  dataset: "production",
  apiVersion: "2024-01-01",
  // Next.js already caches these fetches via each route's `revalidate`.
  // Reading through Sanity's CDN as well adds a second cache with its own
  // expiry, which meant published edits could stay invisible even after a
  // fresh deploy. One controlled cache layer is enough.
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
