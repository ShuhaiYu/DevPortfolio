import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Terminal } from "lucide-react";
import BlogCard from "./BlogCard";
import { client, urlFor } from "@/lib/sanity/client";
import { latestPostsQuery } from "@/lib/sanity/queries";
import type { BlogPost } from "@/lib/types";

async function getLatestPosts(): Promise<BlogPost[]> {
  return client.fetch(latestPostsQuery, { limit: 3 });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function LatestPosts() {
  const posts = await getLatestPosts();

  if (posts.length === 0) {
    return null;
  }

  const [featured, ...rest] = posts;

  return (
    <section className="py-20 sm:py-24 bg-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="font-mono text-xs text-slate-300 uppercase tracking-widest">
                Latest Updates
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white tracking-tighter">
              FROM THE <span className="text-slate-500">BLOG</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="mt-6 md:mt-0 inline-flex items-center text-white border-b border-white/30 pb-1 hover:border-primary hover:text-primary transition-all uppercase tracking-widest text-xs sm:text-sm"
          >
            View All Posts <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Editorial featured + stacked layout — breaks the 3-identical-card pattern */}
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
          {/* Featured: large, image-prominent */}
          <Link
            href={`/blog/${featured.slug.current}`}
            className="md:col-span-7 group block"
          >
            <article className="bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-colors">
              <div className="aspect-[16/10] relative overflow-hidden">
                {featured.coverImage ? (
                  <Image
                    src={urlFor(featured.coverImage).width(900).height(560).url()}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  {featured.category && (
                    <span
                      className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded"
                      style={{
                        backgroundColor: `${featured.category.color}20`,
                        color: featured.category.color,
                        borderColor: `${featured.category.color}40`,
                        borderWidth: 1,
                      }}
                    >
                      {featured.category.title}
                    </span>
                  )}
                  <span className="text-slate-500 text-xs font-mono">
                    {formatDate(featured.publishedAt)}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 group-hover:text-primary transition-colors tracking-tight leading-tight">
                  {featured.title}
                </h3>
                <p className="text-slate-400 leading-relaxed line-clamp-2">
                  {featured.excerpt}
                </p>
                {featured.readingTime && (
                  <div className="mt-5 flex items-center text-primary text-xs font-mono">
                    <Terminal className="w-3 h-3 mr-2" />
                    {featured.readingTime} MIN READ
                  </div>
                )}
              </div>
            </article>
          </Link>

          {/* Supporting: text-first compact entries (no image), stacked */}
          <div className="md:col-span-5 flex flex-col">
            {rest.length > 0 ? (
              rest.map((post, idx) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className={`group block py-6 ${
                    idx === 0 ? "border-b border-white/5" : ""
                  }`}
                >
                  <article>
                    <div className="flex items-center gap-3 mb-3">
                      {post.category && (
                        <span
                          className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded"
                          style={{
                            backgroundColor: `${post.category.color}20`,
                            color: post.category.color,
                            borderColor: `${post.category.color}40`,
                            borderWidth: 1,
                          }}
                        >
                          {post.category.title}
                        </span>
                      )}
                      <span className="text-slate-500 text-xs font-mono">
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors tracking-tight leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </article>
                </Link>
              ))
            ) : (
              // Fallback when there's only a featured post
              <div className="flex items-center justify-center h-full">
                <BlogCard post={featured} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
