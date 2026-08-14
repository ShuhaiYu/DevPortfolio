import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The embedded Sanity Studio and the chat endpoint hold no content worth
      // indexing, and crawling them only wastes crawl budget.
      disallow: ["/studio", "/studio/", "/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
