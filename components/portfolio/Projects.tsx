import Image from "next/image";
import { PROJECTS } from "@/lib/constants";
import { Github, ArrowUpRight } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-32 bg-dark relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 sm:mb-20">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-white mb-4 tracking-tighter">
              SELECTED <span className="text-slate-500">WORK</span>
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-slate-500 font-mono text-sm">
              // 03 FEATURED PROJECTS
              <br />
              // REACT & AI INTEGRATIONS
            </p>
          </div>
        </div>

        {/* Uniform 2-col grid — larger landscape cards. Each animates image-to-full + text overlay on hover. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className="group relative aspect-[3/2] rounded-2xl overflow-hidden bg-surface border border-white/5 hover:border-primary/40 transition-colors duration-500"
            >
              {/* Image layer — grows and colorizes on hover */}
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover filter grayscale-[0.6] brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-[filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />

              {/* Solid surface panel covering bottom 55% — fades out on hover to reveal full image */}
              <div className="absolute inset-x-0 bottom-0 h-[55%] bg-surface group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />

              {/* Hover gradient overlay — provides text contrast once panel is gone */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Number badge — always visible, top-left */}
              <span className="absolute top-4 left-4 z-20 font-mono text-[10px] sm:text-xs text-accent px-2 py-1 border border-accent/30 rounded-full bg-dark/60 backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Action buttons — appear on hover, top-right */}
              <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source on GitHub`}
                  className="inline-flex items-center justify-center w-10 h-10 bg-dark/70 backdrop-blur-sm rounded-full text-white hover:bg-primary hover:text-dark transition-colors"
                >
                  <Github size={16} />
                </a>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live demo`}
                  className="inline-flex items-center justify-center w-10 h-10 bg-dark/70 backdrop-blur-sm rounded-full text-white hover:bg-accent hover:text-dark transition-colors"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>

              {/* Content block — pinned to bottom. Title shifts up on hover, description color brightens, tags slide in. */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2 tracking-tight leading-tight transform group-hover:-translate-y-1 group-hover:text-primary transition-all duration-500 ease-out">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 group-hover:text-slate-200 transition-colors duration-500">
                  {project.description}
                </p>

                {/* Tags — stagger-reveal on hover */}
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
            </article>
          ))}
        </div>

        <div className="mt-12 text-center md:text-left">
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
