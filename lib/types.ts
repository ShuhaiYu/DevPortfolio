import type { PortableTextBlock } from "@portabletext/types";

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Service {
  title: string;
  description: string;
  iconName: string; // Icon name instead of JSX for server components
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  text: string;
  timestamp: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: string; // Icon name instead of JSX for server components
}

// Blog types for Sanity
export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage?: {
    asset: {
      _ref: string;
    };
  };
  category?: {
    title: string;
    slug: { current: string };
    color: string;
  };
  tags?: string[];
  publishedAt: string;
  readingTime?: number;
  body?: PortableTextBlock[];
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  color: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface SanityImageRef {
  asset: {
    _ref: string;
  };
}

export interface ProjectDoc {
  _id: string;
  title: string;
  tagline: string;
  slug: { current: string };
  role?: string;
  period?: string;
  featured?: boolean;
  order?: number;
  heroImage?: SanityImageRef;
  liveUrl?: string;
  repoUrl?: string;
  technologies?: string[];
  problem?: string;
  approach?: string;
  metrics?: ProjectMetric[];
  body?: PortableTextBlock[];
  gallery?: SanityImageRef[];
  publishedAt?: string;
}

export interface ProjectSummary {
  _id: string;
  title: string;
  tagline: string;
  slug: { current: string };
  heroImage?: SanityImageRef;
  technologies?: string[];
  liveUrl?: string;
  repoUrl?: string;
  order?: number;
}
