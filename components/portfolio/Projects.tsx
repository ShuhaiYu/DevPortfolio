"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, EASE, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { urlFor } from "@/lib/sanity/client";
import type { ProjectSummary, Project } from "@/lib/types";

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageSrc: string;
  slug?: string;
  demoUrl?: string;
  repoUrl?: string;
}

function normalizeFromSanity(p: ProjectSummary): ProjectCard {
  return {
    id: p._id,
    title: p.title,
    description: p.tagline,
    technologies: p.technologies ?? [],
    imageSrc: p.heroImage
      ? urlFor(p.heroImage).width(1200).height(750).url()
      : "",
    slug: p.slug.current,
    demoUrl: p.liveUrl,
    repoUrl: p.repoUrl,
  };
}

function normalizeFromConstants(p: Project): ProjectCard {
  return {
    id: String(p.id),
    title: p.title,
    description: p.description,
    technologies: p.technologies,
    imageSrc: p.imageUrl,
    demoUrl: p.demoUrl,
    repoUrl: p.repoUrl,
  };
}

interface ProjectsProps {
  sanityProjects?: ProjectSummary[];
  fallback: Project[];
}

export default function Projects({ sanityProjects, fallback }: ProjectsProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const cards: ProjectCard[] =
    sanityProjects && sanityProjects.length > 0
      ? sanityProjects.map(normalizeFromSanity)
      : fallback.map(normalizeFromConstants);

  useGSAP(
    () => {
      const section = rootRef.current;
      const track = trackRef.current;
      const pin = pinRef.current;
      if (!section || !track || !pin) return;

      const counter = section.querySelector<HTMLElement>("[data-project-counter]");
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (prefersReducedMotion()) {
          gsap.set(track, { x: 0 });
          return;
        }

        const getScrollAmount = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const total = cards.length;
              const idx = Math.min(
                total,
                Math.max(1, Math.round(self.progress * (total - 1)) + 1),
              );
              setActiveIndex(idx);
              if (counter) counter.textContent = String(idx).padStart(2, "0");
            },
          },
        });

        const cardEls = track.querySelectorAll<HTMLElement>("[data-project-card]");
        gsap.fromTo(
          cardEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: EASE.out,
            scrollTrigger: { trigger: section, start: "top 60%" },
          },
        );
      });

      mm.add("(max-width: 767px)", () => {
        if (prefersReducedMotion()) return;
        const cardEls = track.querySelectorAll<HTMLElement>("[data-project-card]");
        cardEls.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: EASE.out,
              scrollTrigger: { trigger: card, start: "top 85%" },
            },
          );
        });
      });

      ScrollTrigger.refresh();
    },
    { scope: rootRef, dependencies: [cards.length] },
  );

  return (
    <section ref={rootRef} id="projects" className="bg-dark relative z-10">
      <div
        ref={pinRef}
        className="md:h-screen md:flex md:flex-col md:justify-center py-20 md:py-0 md:overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-white mb-4 tracking-tighter">
                SELECTED <span className="text-slate-500">WORK</span>
              </h2>
            </div>
            <div className="hidden md:block text-right font-mono text-sm text-slate-500">
              <span className="text-primary" data-project-counter>
                01
              </span>
              <span className="text-slate-600">
                {" "}/ {String(cards.length).padStart(2, "0")}
              </span>
              <br />
              <span>// CLICK TO OPEN CASE STUDY</span>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="md:flex md:flex-nowrap md:gap-8 md:pl-8 md:pr-[20vw] md:will-change-transform grid grid-cols-1 md:grid-cols-none gap-6 px-4 md:px-0"
        >
          {cards.map((project, index) => {
            const cardInner = (
              <>
                {project.imageSrc && (
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 65vw"
                    className="object-cover filter grayscale-[0.6] brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-[filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                )}

                <div className="absolute inset-x-0 bottom-0 h-[55%] bg-surface group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <span className="absolute top-4 left-4 z-20 font-mono text-[10px] sm:text-xs text-accent px-2 py-1 border border-accent/30 rounded-full bg-dark/60 backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div
                  className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source on GitHub`}
                      className="inline-flex items-center justify-center w-10 h-10 bg-dark/70 backdrop-blur-sm rounded-full text-white hover:bg-primary hover:text-dark transition-colors"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} live demo`}
                      className="inline-flex items-center justify-center w-10 h-10 bg-dark/70 backdrop-blur-sm rounded-full text-white hover:bg-accent hover:text-dark transition-colors"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white mb-2 tracking-tight leading-tight transform group-hover:-translate-y-1 group-hover:text-primary transition-all duration-500 ease-out">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 group-hover:text-slate-200 transition-colors duration-500">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 ease-out">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono bg-white/10 backdrop-blur-sm text-slate-200 px-2 py-1 rounded"
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            );

            const className = `group relative md:w-[65vw] md:max-w-[780px] md:flex-shrink-0 aspect-[3/2] md:aspect-[16/10] rounded-2xl overflow-hidden bg-surface border border-white/5 hover:border-primary/40 transition-all duration-500 block ${
              index + 1 === activeIndex ? "md:scale-100" : "md:scale-[0.96] md:opacity-80"
            }`;

            if (project.slug) {
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  data-project-card
                  className={className}
                  aria-label={`Open ${project.title} case study`}
                >
                  {cardInner}
                </Link>
              );
            }
            return (
              <article key={project.id} data-project-card className={className}>
                {cardInner}
              </article>
            );
          })}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 md:mt-8">
          <a
            href="https://github.com/ShuhaiYu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-white border-b border-white/30 pb-1 hover:border-accent hover:text-accent transition-all uppercase tracking-widest text-xs sm:text-sm"
          >
            View Github Archive <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
