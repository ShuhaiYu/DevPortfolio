import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import Contact from "@/components/portfolio/Contact";
import JsonLd from "@/components/seo/JsonLd";
import {
  OWNER_NAME,
  OWNER_TITLE,
  BIO,
  SKILLS,
  EXPERIENCES,
  SOCIAL_LINKS,
} from "@/lib/constants";
import {
  SITE_URL,
  OWNER_ALTERNATE_NAME,
  OWNER_LOCALITY,
  OWNER_IMAGE,
  personSchema,
  buildGraph,
  breadcrumbSchema,
  absoluteUrl,
} from "@/lib/seo";

const TITLE = `About ${OWNER_NAME} — ${OWNER_TITLE} in ${OWNER_LOCALITY}`;

const DESCRIPTION = `${OWNER_NAME} (${OWNER_ALTERNATE_NAME}) is a ${OWNER_TITLE.toLowerCase()} based in ${OWNER_LOCALITY}, Australia. Six years building React, Next.js, and TypeScript products, from student dashboards to bilingual corporate platforms.`;

export const metadata: Metadata = {
  // `absolute` avoids the "About Felix Yu | Felix Yu" stutter the site-wide
  // title template would otherwise produce on a page already named for him.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/about"),
    images: [{ url: OWNER_IMAGE, alt: `${OWNER_NAME} — ${OWNER_TITLE}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OWNER_IMAGE],
  },
};

const profilePageSchema = {
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/about#profilepage`,
  url: absoluteUrl("/about"),
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: "en",
  mainEntity: { "@id": `${SITE_URL}/#person` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

const FACTS: readonly { label: string; value: string }[] = [
  { label: "Full name", value: OWNER_NAME },
  { label: "Also known as", value: OWNER_ALTERNATE_NAME },
  { label: "Role", value: OWNER_TITLE },
  { label: "Based in", value: `${OWNER_LOCALITY}, Australia` },
  { label: "Experience", value: `${EXPERIENCES.length} roles, 6+ years` },
  { label: "Core stack", value: "React · Next.js · TypeScript · Node.js" },
];

export default function AboutPage() {
  const profileLinks = SOCIAL_LINKS.filter(
    (link) => !link.url.startsWith("mailto:"),
  );

  return (
    <div className="min-h-screen bg-dark text-slate-200">
      <Navbar />
      <JsonLd
        schema={buildGraph([
          personSchema,
          profilePageSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: `About ${OWNER_NAME}`, path: "/about" },
          ]),
        ])}
      />

      <main id="main" className="pt-28 sm:pt-32 pb-16">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(rgba(240,196,69,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(240,196,69,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
          <span className="inline-block px-3 py-1 mb-6 bg-primary/10 border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest rounded-full">
            {"// OPERATOR_DOSSIER"}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tighter">
            About {OWNER_NAME}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            {OWNER_NAME} is a {OWNER_TITLE.toLowerCase()} based in{" "}
            {OWNER_LOCALITY}, Australia. He also publishes under his legal name,{" "}
            {OWNER_ALTERNATE_NAME}, on GitHub and LinkedIn.
          </p>
        </header>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-20">
          <div className="grid lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
            <div className="relative aspect-[4/5] w-full max-w-xs mx-auto lg:mx-0 rounded-sm border border-primary/30 bg-surface overflow-hidden">
              <Image
                src="/images/felixyu.png"
                alt={`${OWNER_NAME}, ${OWNER_TITLE.toLowerCase()} based in ${OWNER_LOCALITY}, Australia`}
                fill
                sizes="(max-width: 1024px) 80vw, 320px"
                className="object-cover"
                priority
              />
            </div>

            <div>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-[65ch]">
                {BIO}
              </p>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10 max-w-[65ch]">
                His work spans student analytics dashboards, bilingual corporate
                platforms, and community products — usually somewhere in the
                overlap between interface craft and backend reliability. Recent
                projects lean heavily on Next.js, TypeScript, and increasingly
                on LLM integrations for search and workflow automation.
              </p>

              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6 border-t border-white/5 pt-8">
                {FACTS.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-mono text-[10px] sm:text-xs tracking-widest text-slate-500 uppercase mb-1">
                      {fact.label}
                    </dt>
                    <dd className="text-white text-base sm:text-lg font-heading tracking-tight">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-20">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-8 tracking-tight">
            Career log
          </h2>
          <ol className="space-y-8 border-l border-white/10 pl-6 sm:pl-8">
            {EXPERIENCES.map((experience) => (
              <li key={experience.id} className="relative">
                <span className="absolute -left-[31px] sm:-left-[39px] top-2 w-2 h-2 rounded-full bg-primary" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                  {experience.period}
                </p>
                <h3 className="text-xl font-heading font-bold text-white mb-1 tracking-tight">
                  {experience.role} · {experience.company}
                </h3>
                <p className="text-slate-400 leading-relaxed max-w-[65ch]">
                  {experience.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-20">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-8 tracking-tight">
            Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-surface border border-white/10 rounded text-xs font-mono text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-8 tracking-tight">
            Elsewhere
          </h2>
          <div className="flex flex-wrap gap-3 mb-10">
            {profileLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="me noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/15 rounded-full font-mono text-xs uppercase tracking-widest text-slate-300 hover:border-primary/60 hover:text-primary transition-colors"
              >
                {link.platform}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-dark font-bold text-sm rounded-full hover:shadow-[0_0_20px_rgba(240,196,69,0.5)] transition-all"
            >
              View case studies <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-mono text-sm rounded-full hover:border-primary/60 hover:text-primary transition-all"
            >
              Read the blog
            </Link>
          </div>
        </section>
      </main>

      <Contact />
    </div>
  );
}
