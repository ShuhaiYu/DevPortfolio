import Link from "next/link";
import Image from "next/image";
import { Terminal } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";
import type { BlogPost } from "@/lib/types";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug.current}`}>
      <article className="blog-card group bg-surface border border-white/5 rounded-xl overflow-hidden">
        {/* Image */}
        <div className="aspect-video relative overflow-hidden">
          {post.coverImage ? (
            <Image
              src={urlFor(post.coverImage).width(600).height(340).url()}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
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

          <h2 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>

          <p className="text-slate-400 text-sm line-clamp-2">{post.excerpt}</p>

          {post.readingTime && (
            <div className="mt-4 flex items-center text-primary text-xs font-mono">
              <Terminal className="w-3 h-3 mr-2" />
              {post.readingTime} MIN READ
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
