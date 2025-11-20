import React from 'react';
import { Project, Experience, Service, Testimonial } from './types';
import { Github, Linkedin, Twitter, Mail, Layout, Server, Zap, Brain, Globe, Shield } from 'lucide-react';

export const OWNER_NAME = "Alex Chen";
export const OWNER_TITLE = "Senior Full Stack Developer";
export const BIO = "I build accessible, pixel-perfect, and performant web experiences. With over 6 years of experience in the React ecosystem, I specialize in bridging the gap between design and engineering.";

export const SKILLS = [
  "React", "TypeScript", "Next.js", "Node.js", 
  "Tailwind CSS", "GraphQL", "AWS", "PostgreSQL", 
  "Docker", "Figma", "Gemini API", "Three.js"
];

// New Services Data
export const SERVICES: Service[] = [
  {
    title: "Frontend Architecture",
    description: "Crafting scalable, component-driven UI systems using React & Next.js. Obsessed with pixel-perfection and micro-interactions.",
    icon: <Layout size={32} />
  },
  {
    title: "Full Stack Systems",
    description: "Building robust backend infrastructures with Node.js and PostgreSQL. Secure, scalable, and ready for high traffic.",
    icon: <Server size={32} />
  },
  {
    title: "Performance Ops",
    description: "Auditing and boosting web vitals. I turn slow, bloat-heavy sites into lightning-fast experiences.",
    icon: <Zap size={32} />
  },
  {
    title: "AI Integration",
    description: "Embedding LLMs and neural networks into web apps. Chatbots, semantic search, and automated workflows.",
    icon: <Brain size={32} />
  }
];

// New Testimonials Data
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CTO",
    company: "Nexus Corp",
    text: "Alex's code is cleaner than a T-800's CPU. The best engineer I've worked with regarding system architecture and delivery speed."
  },
  {
    id: 2,
    name: "David Arasaka",
    role: "Product Lead",
    company: "Night City Tech",
    text: "Transformed our legacy platform into a modern masterpiece. The attention to detail on the UI animations was incredible."
  },
  {
    id: 3,
    name: "Elena Fisher",
    role: "Founder",
    company: "Uncharted AI",
    text: "A rare developer who understands both deep backend logic and beautiful frontend design. Highly recommended."
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Nebula Dashboard",
    description: "A high-performance analytics dashboard for SaaS metrics using Next.js and Recharts. Features real-time data visualization via WebSockets.",
    technologies: ["React", "TypeScript", "D3.js", "Supabase"],
    imageUrl: "https://picsum.photos/600/400?random=1",
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: 2,
    title: "Echo Chat",
    description: "An AI-powered messaging platform featuring real-time translation and sentiment analysis using Google Gemini API.",
    technologies: ["Node.js", "Socket.io", "Gemini API", "Redis"],
    imageUrl: "https://picsum.photos/600/400?random=2",
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: 3,
    title: "Vantage E-com",
    description: "Headless e-commerce storefront built for speed and SEO. Integrated with Shopify Storefront API.",
    technologies: ["Next.js", "Tailwind", "Shopify API"],
    imageUrl: "https://picsum.photos/600/400?random=3",
    demoUrl: "#",
    repoUrl: "#"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    company: "TechFlow Systems",
    role: "Senior Frontend Engineer",
    period: "2021 - Present",
    description: "Leading a team of 5 developers in migrating legacy Angular codebase to React. Improved site performance by 40%."
  },
  {
    id: 2,
    company: "Creative Solutions Inc.",
    role: "Full Stack Developer",
    period: "2018 - 2021",
    description: "Developed and maintained multiple client-facing web applications. Implemented CI/CD pipelines to streamline deployment."
  },
  {
    id: 3,
    company: "StartUp Alpha",
    role: "Junior Developer",
    period: "2017 - 2018",
    description: "Collaborated with designers to implement responsive UI components. Assisted in backend API development using Express."
  }
];

export const SOCIAL_LINKS = [
  { platform: "GitHub", url: "https://github.com", icon: <Github size={20} /> },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: <Linkedin size={20} /> },
  { platform: "Twitter", url: "https://twitter.com", icon: <Twitter size={20} /> },
  { platform: "Email", url: "mailto:hello@example.com", icon: <Mail size={20} /> },
];

export const SYSTEM_INSTRUCTION = `
You are an AI assistant for ${OWNER_NAME}'s personal portfolio website.
Your goal is to answer visitor questions about Alex's professional background, skills, and projects in a friendly, professional, and concise manner.

Here is Alex's Resume Context:
- Name: ${OWNER_NAME}
- Title: ${OWNER_TITLE}
- Bio: ${BIO}
- Skills: ${SKILLS.join(", ")}
- Services: ${SERVICES.map(s => s.title).join(", ")}
- Projects: ${PROJECTS.map(p => `${p.title} (${p.description})`).join("; ")}
- Experience: ${EXPERIENCES.map(e => `${e.role} at ${e.company} (${e.period}): ${e.description}`).join("; ")}

If asked about contact info, refer them to the contact section or the email hello@example.com.
Keep answers short (under 3 sentences) unless asked for details. 
If you don't know something, say "I don't have that information in my current context, but feel free to email Alex!"
`;