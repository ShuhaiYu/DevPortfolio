"use client";

import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Search,
  Home,
  User,
  Briefcase,
  Terminal as TerminalIcon,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  Twitter,
  FolderOpen,
  FileText,
  Copy,
  ExternalLink,
} from "lucide-react";
import type { ProjectSummary, BlogPost } from "@/lib/types";
import { SOCIAL_LINKS } from "@/lib/constants";

interface CommandPaletteProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  projects: ProjectSummary[];
  posts: BlogPost[];
}

const NAV_ITEMS = [
  { label: "Home (Top)", icon: Home, href: "/#hero" },
  { label: "About", icon: User, href: "/#about" },
  { label: "Services", icon: Briefcase, href: "/#services" },
  { label: "Experience", icon: TerminalIcon, href: "/#experience" },
  { label: "Work", icon: FolderOpen, href: "/#projects" },
  { label: "Blog", icon: BookOpen, href: "/blog" },
  { label: "Contact", icon: Mail, href: "/#contact" },
];

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
};

export default function CommandPalette({
  open,
  setOpen,
  projects,
  posts,
}: CommandPaletteProps) {
  const router = useRouter();

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      if (window.location.pathname !== "/") {
        router.push(href);
      } else {
        const id = href.slice(2);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(href);
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("info@felixyu.net");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh] px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden
      />
      <Command
        label="Global command palette"
        className="relative w-full max-w-xl bg-surface border border-primary/20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <Search className="w-4 h-4 text-primary flex-shrink-0" />
          <Command.Input
            placeholder="Jump to section, project, post…"
            className="flex-1 bg-transparent text-white placeholder-slate-500 font-mono text-sm focus:outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-dark/60 border border-white/10 rounded text-[10px] font-mono text-slate-500">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto py-2">
          <Command.Empty className="px-5 py-8 text-slate-500 font-mono text-sm text-center">
            // no match found
          </Command.Empty>

          <Command.Group heading="Navigate" className="[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.25em] [&_[cmdk-group-heading]]:text-slate-500 [&_[cmdk-group-heading]]:px-5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Command.Item
                  key={item.href}
                  value={`nav ${item.label}`}
                  onSelect={() => go(item.href)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-200 cursor-pointer transition-colors data-[selected=true]:bg-primary/10 data-[selected=true]:text-white data-[selected=true]:shadow-[inset_2px_0_0_#f0c445] hover:bg-primary/5"
                >
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span>{item.label}</span>
                </Command.Item>
              );
            })}
          </Command.Group>

          {projects.length > 0 && (
            <Command.Group heading="Case Studies" className="[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.25em] [&_[cmdk-group-heading]]:text-slate-500 [&_[cmdk-group-heading]]:px-5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5">
              {projects.map((p) => (
                <Command.Item
                  key={p._id}
                  value={`project ${p.title} ${p.tagline}`}
                  onSelect={() => go(`/projects/${p.slug.current}`)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-200 cursor-pointer transition-colors data-[selected=true]:bg-primary/10 data-[selected=true]:text-white data-[selected=true]:shadow-[inset_2px_0_0_#f0c445] hover:bg-primary/5"
                >
                  <FolderOpen className="w-4 h-4 text-primary" />
                  <span className="flex-1 truncate">{p.title}</span>
                  <span className="text-[10px] font-mono text-slate-500 truncate max-w-[180px]">
                    {p.tagline}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>
          )}

          {posts.length > 0 && (
            <Command.Group heading="Recent Posts" className="[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.25em] [&_[cmdk-group-heading]]:text-slate-500 [&_[cmdk-group-heading]]:px-5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5">
              {posts.map((p) => (
                <Command.Item
                  key={p._id}
                  value={`post ${p.title}`}
                  onSelect={() => go(`/blog/${p.slug.current}`)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-200 cursor-pointer transition-colors data-[selected=true]:bg-primary/10 data-[selected=true]:text-white data-[selected=true]:shadow-[inset_2px_0_0_#f0c445] hover:bg-primary/5"
                >
                  <FileText className="w-4 h-4 text-accent" />
                  <span className="flex-1 truncate">{p.title}</span>
                </Command.Item>
              ))}
            </Command.Group>
          )}

          <Command.Group heading="Actions" className="[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.25em] [&_[cmdk-group-heading]]:text-slate-500 [&_[cmdk-group-heading]]:px-5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5">
            <Command.Item
              value="copy email"
              onSelect={copyEmail}
              className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-200 cursor-pointer transition-colors data-[selected=true]:bg-primary/10 data-[selected=true]:text-white data-[selected=true]:shadow-[inset_2px_0_0_#f0c445] hover:bg-primary/5"
            >
              <Copy className="w-4 h-4 text-slate-500" />
              <span>Copy email (info@felixyu.net)</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="External" className="[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.25em] [&_[cmdk-group-heading]]:text-slate-500 [&_[cmdk-group-heading]]:px-5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5">
            {SOCIAL_LINKS.map((link) => {
              const Icon = ICONS[link.iconName] ?? ExternalLink;
              return (
                <Command.Item
                  key={link.platform}
                  value={`external ${link.platform}`}
                  onSelect={() => {
                    window.open(link.url, "_blank", "noopener,noreferrer");
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-200 cursor-pointer transition-colors data-[selected=true]:bg-primary/10 data-[selected=true]:text-white data-[selected=true]:shadow-[inset_2px_0_0_#f0c445] hover:bg-primary/5"
                >
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span className="flex-1">{link.platform}</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </Command.Item>
              );
            })}
          </Command.Group>
        </Command.List>

        <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span className="tracking-widest uppercase">Command Palette</span>
          <div className="flex items-center gap-3">
            <kbd className="px-1.5 py-0.5 bg-dark/60 border border-white/10 rounded">↑↓</kbd>
            <kbd className="px-1.5 py-0.5 bg-dark/60 border border-white/10 rounded">↵</kbd>
          </div>
        </div>
      </Command>
    </div>
  );
}
