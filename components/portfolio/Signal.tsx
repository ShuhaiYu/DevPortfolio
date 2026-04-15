import { Github, Activity, GitCommit } from "lucide-react";
import { fetchGitHubStats, relativeTime } from "@/lib/services/githubService";
import Reveal from "@/components/effects/Reveal";
import SignalKPIs from "./SignalKPIs";

const GITHUB_USERNAME = "ShuhaiYu";

export default async function Signal() {
  const stats = await fetchGitHubStats();

  const kpis = [
    { label: "Repos", value: stats.publicRepos },
    { label: "Commits · 1y", value: stats.totalCommits },
    { label: "Pull Requests · 1y", value: stats.totalPRs },
  ];

  return (
    <section
      id="signal"
      className="py-20 sm:py-24 bg-dark relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-surface rounded-xl border border-white/10">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-secondary/80 mb-2">
                Signal / Uptime
              </p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
                Live From GitHub
              </h2>
            </div>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="font-mono">@{GITHUB_USERNAME}</span>
          </a>
        </Reveal>

        <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
          <SignalKPIs kpis={kpis} />

          <Reveal
            as="div"
            className="bg-surface/60 border border-white/10 rounded-xl p-5 sm:p-6"
          >
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-5">
              <GitCommit className="w-3 h-3" />
              Recent Commit Stream
            </div>
            {stats.recentCommits.length === 0 ? (
              <p className="text-slate-500 font-mono text-sm py-6">
                // no recent public commits in window
              </p>
            ) : (
              <ul className="space-y-4">
                {stats.recentCommits.map((c) => (
                  <li key={c.sha} className="group">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid grid-cols-[auto_1fr_auto] items-baseline gap-3 sm:gap-5 py-1"
                    >
                      <span className="font-mono text-[10px] text-slate-500 group-hover:text-primary transition-colors tabular-nums">
                        {relativeTime(c.date)}
                      </span>
                      <span className="text-sm text-slate-300 group-hover:text-white transition-colors truncate">
                        {c.message}
                      </span>
                      <span className="font-mono text-[10px] text-secondary/70 truncate max-w-[160px] hidden sm:block">
                        {c.repo}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
