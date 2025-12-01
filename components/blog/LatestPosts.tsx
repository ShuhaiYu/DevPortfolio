import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "./BlogCard";
import { client } from "@/lib/sanity/client";
import { latestPostsQuery } from "@/lib/sanity/queries";
import type { BlogPost } from "@/lib/types";

async function getLatestPosts(): Promise<BlogPost[]> {
  return client.fetch(latestPostsQuery, { limit: 3 });
}

export default async function LatestPosts() {
  const posts = await getLatestPosts();

  if (posts.length === 0) {
    return null;
  }

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
              FROM THE <span className="text-slate-700">BLOG</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="mt-6 md:mt-0 inline-flex items-center text-white border-b border-white/30 pb-1 hover:border-primary hover:text-primary transition-all uppercase tracking-widest text-xs sm:text-sm"
          >
            View All Posts <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
