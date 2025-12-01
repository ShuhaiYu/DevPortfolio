import { Metadata } from "next";
import Navbar from "@/components/portfolio/Navbar";
import BlogHero from "@/components/blog/BlogHero";
import BlogCard from "@/components/blog/BlogCard";
import Contact from "@/components/portfolio/Contact";
import { client } from "@/lib/sanity/client";
import { postsQuery } from "@/lib/sanity/queries";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on web development, AI integration, and building the future of the internet.",
};

// Cache the blog list page
export const revalidate = 3600; // Revalidate every hour

async function getPosts(): Promise<BlogPost[]> {
  return client.fetch(postsQuery);
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-dark text-slate-200">
      <Navbar />
      <main>
        <BlogHero />

        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="font-mono text-xs text-slate-300 uppercase tracking-widest">
                    Initializing...
                  </span>
                </div>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">
                  No posts yet
                </h2>
                <p className="text-slate-400">
                  Blog posts will appear here once published in Sanity CMS.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Contact />
    </div>
  );
}
