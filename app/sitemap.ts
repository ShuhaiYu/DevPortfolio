import { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all blog post slugs
  const posts = await client.fetch<{ slug: string; publishedAt: string }[]>(`
    *[_type == "post"] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt
    }
  `);

  // Generate blog URLs
  const blogUrls = posts.map((post) => ({
    url: `https://www.felixyu.net/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://www.felixyu.net",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: "https://www.felixyu.net/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.felixyu.net/#about",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.felixyu.net/#projects",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.felixyu.net/#experience",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.felixyu.net/#contact",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...blogUrls,
  ];
}
