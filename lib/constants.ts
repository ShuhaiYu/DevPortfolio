import { Project, Experience, Service, Testimonial, SocialLink } from "./types";

export const OWNER_NAME = "Felix Yu";
export const OWNER_TITLE = "Full Stack Developer";
export const BIO =
  "I build accessible, pixel-perfect, and performant web experiences. With over 6 years of experience in the React ecosystem, I specialize in bridging the gap between design and engineering.";

export const SKILLS = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "GraphQL",
  "AWS",
  "PostgreSQL",
  "Docker",
  "Figma",
  "Gemini API",
  "Three.js",
];

export const SERVICES: Service[] = [
  {
    title: "Frontend Architecture",
    description:
      "Crafting scalable, component-driven UI systems using React & Next.js. Obsessed with pixel-perfection and micro-interactions.",
    iconName: "Layout",
  },
  {
    title: "Full Stack Systems",
    description:
      "Building robust backend infrastructures with Node.js and PostgreSQL. Secure, scalable, and ready for high traffic.",
    iconName: "Server",
  },
  {
    title: "Performance Ops",
    description:
      "Auditing and boosting web vitals. I turn slow, bloat-heavy sites into lightning-fast experiences.",
    iconName: "Zap",
  },
  {
    title: "AI Integration",
    description:
      "Embedding LLMs and neural networks into web apps. Chatbots, semantic search, and automated workflows.",
    iconName: "Brain",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CTO",
    company: "Nexus Corp",
    text: "Felix's code is cleaner than a T-800's CPU. The best engineer I've worked with regarding system architecture and delivery speed.",
  },
  {
    id: 2,
    name: "David Arasaka",
    role: "Product Lead",
    company: "Night City Tech",
    text: "Transformed our legacy platform into a modern masterpiece. The attention to detail on the UI animations was incredible.",
  },
  {
    id: 3,
    name: "Elena Fisher",
    role: "Founder",
    company: "Uncharted AI",
    text: "A rare developer who understands both deep backend logic and beautiful frontend design. Highly recommended.",
  },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Austin Dashboard",
    description:
      "A high-performance student dashboard for VCE Education using Next.js and Recharts. Features real-time exam data visualization via WebSockets.",
    technologies: ["Next.js", "TypeScript", "Socket.io", "MySQL"],
    imageUrl: "/images/austin.png",
    demoUrl: "https://myaustin.com.au/dashboard",
    repoUrl: "https://github.com/ShuhaiYu/austin-student-dashboard",
  },
  {
    id: 2,
    title: "Onlypix AI Chat",
    description:
      "An AI-powered chat application integrated with Novita's image generation API. Built with Next.js and Data Streaming for real-time interactions.",
    technologies: ["Next.js", "i18n", "Novita API", "Supabase"],
    imageUrl: "/images/onlypixai.png",
    demoUrl: "https://www.onlypixai.com/",
    repoUrl: "https://github.com/ShuhaiYu/botai",
  },
  {
    id: 3,
    title: "Auction Platform",
    description:
      "E-commerce platform built for speed and SEO. Starting from scratch with Ably, Neon, and Stripe integration.",
    technologies: ["Next.js", "Tailwind", "Stripe", "PostgreSQL"],
    imageUrl: "/images/whiskytrade.png",
    demoUrl: "https://whiskytrade-2.vercel.app/",
    repoUrl: "https://github.com/ShuhaiYu/whiskytrade-2",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    company: "Austin",
    role: "Full Stack Developer",
    period: "2024 - Present",
    description:
      "Leading a team of 3 developers in migrating legacy HTML codebase to Next.js. Improved site performance by 40%.",
  },
  {
    id: 2,
    company: "PIXDYNE",
    role: "Founder & Lead Developer",
    period: "2023 - Present",
    description:
      "Developed and maintained multiple client-facing web applications. Implemented CI/CD pipelines to streamline deployment.",
  },
  {
    id: 3,
    company: "StartUp Alpha",
    role: "Junior Developer",
    period: "2021 - 2023",
    description:
      "Collaborated with designers to implement responsive UI components. Assisted in backend API development using Express.",
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/ShuhaiYu", iconName: "Github" },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/shuhaiyu",
    iconName: "Linkedin",
  },
  { platform: "Twitter", url: "https://x.com/FelixYuDev", iconName: "Twitter" },
  { platform: "Email", url: "mailto:info@felixyu.net", iconName: "Mail" },
];

export const SYSTEM_INSTRUCTION = `
You are an AI assistant for ${OWNER_NAME}'s personal portfolio website.
Your goal is to answer visitor questions about Felix's professional background, skills, and projects in a friendly, professional, and concise manner.

Here is Felix's Resume Context:
- Name: ${OWNER_NAME}
- Title: ${OWNER_TITLE}
- Bio: ${BIO}
- Skills: ${SKILLS.join(", ")}
- Services: ${SERVICES.map((s) => s.title).join(", ")}
- Projects: ${PROJECTS.map((p) => `${p.title} (${p.description})`).join("; ")}
- Experience: ${EXPERIENCES.map((e) => `${e.role} at ${e.company} (${e.period}): ${e.description}`).join("; ")}

If asked about contact info, refer them to the contact section or the email info@felixyu.net.
Keep answers short (under 3 sentences) unless asked for details.
If you don't know something, say "I don't have that information in my current context, but feel free to email Felix!"
`;
