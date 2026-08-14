import { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import { absoluteUrl } from "@/lib/seo";

interface SitemapDoc {
  slug: string;
  publishedAt?: string;
}

/**
 * Fetches slugs for a document type. A CMS outage must not fail the whole
 * sitemap, so a failed query degrades to the static routes only.
 */
async function fetchDocs(type: "post" | "project"): Promise<SitemapDoc[]> {
  return client
    .fetch<SitemapDoc[]>(
      `*[_type == $type && defined(slug.current)] | order(publishedAt desc) {
        "slug": slug.current,
        publishedAt
      }`,
      { type },
    )
    .catch(() => []);
}

/** Falls back to the crawl time when a document has no publish date. */
function lastModified(publishedAt: string | undefined, fallback: Date): Date {
  if (!publishedAt) return fallback;
  const parsed = new Date(publishedAt);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [posts, projects] = await Promise.all([
    fetchDocs("post"),
    fetchDocs("project"),
  ]);

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: lastModified(post.publishedAt, now),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: lastModified(project.publishedAt, now),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Only real, crawlable routes belong here. Fragment URLs (/#about) are
  // ignored by search engines and dilute the sitemap's quality signal.
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  return [...staticUrls, ...projectUrls, ...postUrls];
}
