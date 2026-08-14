import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, Calendar } from "lucide-react";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/portfolio/Navbar";
import Contact from "@/components/portfolio/Contact";
import JsonLd from "@/components/seo/JsonLd";
import { client, urlFor } from "@/lib/sanity/client";
import { projectBySlugQuery, projectSlugsQuery } from "@/lib/sanity/queries";
import { OWNER_NAME } from "@/lib/constants";
import {
  SITE_URL,
  buildGraph,
  breadcrumbSchema,
  absoluteUrl,
} from "@/lib/seo";
import type { ProjectDoc } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(projectSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project: ProjectDoc | null = await client.fetch(projectBySlugQuery, { slug });
  if (!project) return { title: "Project Not Found", robots: { index: false } };

  const description =
    project.tagline ?? `${project.title}, a project built by ${OWNER_NAME}.`;

  return {
    title: `${project.title} — Case Study`,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.title} — Case Study | ${OWNER_NAME}`,
      description,
      type: "article",
      url: absoluteUrl(`/projects/${slug}`),
      images: project.heroImage
        ? [urlFor(project.heroImage).width(1200).height(630).url()]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study | ${OWNER_NAME}`,
      description,
    },
  };
}

const components = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-heading font-bold text-white mt-14 mb-4 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-heading font-bold text-white mt-10 mb-3 tracking-tight">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-slate-300 leading-relaxed mb-6">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-8 pl-6 border-l-2 border-primary text-white/80 italic leading-relaxed">
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
    code: ({ value }: { value: { code: string; language?: string } }) => (
      <pre className="bg-surface border border-primary/20 rounded-lg p-6 my-8 overflow-x-auto">
        <code className="text-slate-300 font-mono text-sm">{value.code}</code>
      </pre>
    ),
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string } }) => (
      <div className="my-10 rounded-xl overflow-hidden border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ""}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
    ),
  },
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project: ProjectDoc | null = await client.fetch(projectBySlugQuery, { slug });

  if (!project) notFound();

  // CreativeWork rather than Article: a case study describes a shipped product,
  // and `creator` is what ties that product back to the site owner's entity.
  const projectSchema = {
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/projects/${slug}#project`,
    url: absoluteUrl(`/projects/${slug}`),
    name: project.title,
    headline: project.title,
    description: project.tagline,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    creator: { "@id": `${SITE_URL}/#person` },
    author: { "@id": `${SITE_URL}/#person` },
    ...(project.heroImage
      ? { image: urlFor(project.heroImage).width(1200).height(630).url() }
      : {}),
    ...(project.publishedAt ? { datePublished: project.publishedAt } : {}),
    ...(project.technologies?.length ? { keywords: project.technologies } : {}),
  };

  return (
    <div className="min-h-screen bg-dark text-slate-200">
      <Navbar />
      <JsonLd
        schema={buildGraph([
          projectSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${slug}` },
          ]),
        ])}
      />

      <main id="main" className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-slate-400 hover:text-primary transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Work
          </Link>
        </div>

        <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary/70 mb-6">
            {project.role && project.period
              ? `${project.role} · ${project.period}`
              : project.role || project.period || "Case Study"}
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tighter leading-[0.95]">
            {project.title}
          </h1>
          <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl leading-relaxed">
            {project.tagline}
          </p>

          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-10 flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-dark font-bold text-sm rounded-full hover:shadow-[0_0_20px_rgba(240,196,69,0.5)] transition-all"
                >
                  Visit Live <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-mono text-sm rounded-full hover:border-primary/60 hover:text-primary transition-all"
                >
                  <Github className="w-4 h-4" /> Source
                </a>
              )}
            </div>
          )}
        </header>

        {project.heroImage && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="aspect-[16/9] relative rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={urlFor(project.heroImage).width(1400).height(788).url()}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {project.metrics && project.metrics.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-xl overflow-hidden">
              {project.metrics.slice(0, 4).map((m, i) => (
                <div key={i} className="bg-dark p-6 sm:p-8">
                  <div className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-2 tracking-tight">
                    {m.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {(project.problem || project.approach) && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              {project.problem && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
                    // Problem
                  </h3>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}
              {project.approach && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
                    // Approach
                  </h3>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {project.approach}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500 mb-4">
              // Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-surface border border-white/10 rounded text-xs font-mono text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {project.body && project.body.length > 0 && (
          <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <PortableText value={project.body} components={components} />
          </article>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500 mb-6">
              // Gallery
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] relative rounded-xl overflow-hidden border border-white/10"
                >
                  <Image
                    src={urlFor(img).width(1000).height(750).url()}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {project.publishedAt && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 font-mono text-xs text-slate-500 flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            Published {new Date(project.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </div>
        )}
      </main>

      <Contact />
    </div>
  );
}
