import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import Contact from "@/components/portfolio/Contact";
import JsonLd from "@/components/seo/JsonLd";
import { client, urlFor } from "@/lib/sanity/client";
import { projectsSummaryQuery } from "@/lib/sanity/queries";
import { OWNER_NAME } from "@/lib/constants";
import {
  SITE_URL,
  buildGraph,
  breadcrumbSchema,
  absoluteUrl,
} from "@/lib/seo";
import type { ProjectSummary } from "@/lib/types";

const TITLE = `Projects & Case Studies`;

const DESCRIPTION = `Selected work by ${OWNER_NAME} — case studies covering student analytics dashboards, bilingual corporate platforms, and community products built with Next.js, TypeScript, and React.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    title: `${TITLE} | ${OWNER_NAME}`,
    description: DESCRIPTION,
    url: absoluteUrl("/projects"),
  },
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects: ProjectSummary[] = await client
    .fetch(projectsSummaryQuery)
    .catch(() => []);

  const collectionSchema = {
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/projects#collection`,
    url: absoluteUrl("/projects"),
    name: `${TITLE} — ${OWNER_NAME}`,
    description: DESCRIPTION,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: absoluteUrl(`/projects/${project.slug.current}`),
      })),
    },
  };

  return (
    <div className="min-h-screen bg-dark text-slate-200">
      <Navbar />
      <JsonLd
        schema={buildGraph([
          collectionSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ])}
      />

      <main id="main" className="pt-28 sm:pt-32 pb-16">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[linear-gradient(rgba(240,196,69,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(240,196,69,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
          <span className="inline-block px-3 py-1 mb-6 bg-primary/10 border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest rounded-full">
            {"// SELECTED_WORK"}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tighter">
            Projects by {OWNER_NAME}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            {DESCRIPTION}
          </p>
        </header>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {projects.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug.current}`}
                  className="group block rounded-xl border border-white/10 bg-surface overflow-hidden hover:border-primary/50 transition-colors"
                >
                  {project.heroImage && (
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <Image
                        src={urlFor(project.heroImage).width(800).height(500).url()}
                        alt={`${project.title} — case study by ${OWNER_NAME}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-heading font-bold text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {project.tagline}
                    </p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-slate-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-primary">
                      Read case study
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">
              Case studies are being published. Check back shortly.
            </p>
          )}
        </section>
      </main>

      <Contact />
    </div>
  );
}
