import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/portfolio/Navbar";
import Contact from "@/components/portfolio/Contact";
import { client, urlFor } from "@/lib/sanity/client";
import { postBySlugQuery, postSlugsQuery } from "@/lib/sanity/queries";
import type { BlogPost } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post: BlogPost | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage
        ? [urlFor(post.coverImage).width(1200).height(630).url()]
        : [],
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Portable Text components for rendering blog content
const components = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-4xl font-heading font-bold text-white mt-12 mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-heading font-bold text-white mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-heading font-bold text-white mt-8 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-slate-300 leading-relaxed mb-6">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-10 text-xl text-white/75 italic leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href: string };
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary border-b border-primary/30 hover:border-primary transition-colors"
      >
        {children}
      </a>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-surface px-2 py-1 rounded text-primary font-mono text-sm">
        {children}
      </code>
    ),
  },
  types: {
    code: ({
      value,
    }: {
      value: { code: string; language?: string };
    }) => (
      <pre className="bg-surface border border-primary/20 rounded-lg p-6 my-8 overflow-x-auto">
        <code className="text-slate-300 font-mono text-sm">{value.code}</code>
      </pre>
    ),
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post: BlogPost | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-dark text-slate-200">
      <Navbar />

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: post.coverImage
              ? urlFor(post.coverImage).url()
              : undefined,
            datePublished: post.publishedAt,
            author: {
              "@type": "Person",
              name: "Felix Yu",
              url: "https://www.felixyu.net",
            },
          }),
        }}
      />

      <main id="main" className="pt-24 pb-16">
        {/* Back Link */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-slate-400 hover:text-primary transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          {post.category && (
            <span
              className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider rounded mb-6"
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

          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6 tracking-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-slate-400 text-sm font-mono">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </div>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="aspect-video relative rounded-xl overflow-hidden border border-white/10">
              <Image
                src={urlFor(post.coverImage).width(1200).height(675).url()}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose-cyber">
          {post.body && <PortableText value={post.body} components={components} />}
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-surface border border-white/10 rounded text-xs font-mono text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>

      <Contact />
    </div>
  );
}
