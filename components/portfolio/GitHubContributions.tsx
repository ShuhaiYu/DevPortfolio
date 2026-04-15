import { Github, Activity } from "lucide-react";
import fs from "node:fs";
import path from "node:path";

const GITHUB_USERNAME = "ShuhaiYu";
const SVG_PATH = "/github-3d/night.svg";

function svgExists(): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "github-3d", "night.svg"));
  } catch {
    return false;
  }
}

export default function GitHubContributions() {
  const hasSvg = svgExists();

  return (
    <section
      id="github"
      className="py-20 sm:py-24 bg-dark relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-surface rounded-xl border border-white/10">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-secondary/80 mb-2">
                Signal / Uptime
              </p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
                Commit Skyline
              </h2>
            </div>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="font-mono">@{GITHUB_USERNAME} · 3D contribution city</span>
          </a>
        </div>

        <div className="relative bg-surface/60 border border-white/10 rounded-xl p-4 sm:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(240,196,69,0.08),transparent_60%)] pointer-events-none" />
          {hasSvg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={SVG_PATH}
              alt={`${GITHUB_USERNAME} GitHub contributions in 3D`}
              className="relative w-full h-auto mx-auto max-w-4xl"
              loading="lazy"
            />
          ) : (
            <div className="relative py-16 text-center font-mono text-sm text-slate-400">
              <p className="text-primary mb-2">// AWAITING FIRST BUILD</p>
              <p>
                Run the <span className="text-white">GitHub 3D Contributions</span>{" "}
                workflow once to generate the skyline.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
