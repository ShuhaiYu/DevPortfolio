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
    name: "Edgar Tang",
    role: "CEO",
    company: "Pixdyne",
    text: "Felix took our product from an idea to a shipped platform. He owns the whole stack — architecture, interface, deployment — and moves faster than teams several times his size.",
  },
  {
    id: 2,
    name: "Sarah Jiang",
    role: "Founder",
    company: "Kirin Finance",
    text: "Felix rebuilt our web presence end to end. Clear communication, sensible technical decisions, and a finished site that loads instantly and looks genuinely professional.",
  },
  {
    id: 3,
    name: "Sophie Wang",
    role: "Owner",
    company: "Local business, Melbourne",
    text: "I needed a site that actually brings in customers, not just something that looks nice. Felix understood the goal, handled everything technical, and made the whole process painless.",
  },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Austin Education",
    description:
      "A high-performance student dashboard for VCE Education using Next.js and Recharts. Features real-time exam data visualization via WebSockets.",
    technologies: ["Next.js", "TypeScript", "Socket.io", "MySQL"],
    imageUrl: "/images/austin.png",
    demoUrl: "https://www.austineducation.com.au/en",
    repoUrl: "https://github.com/ShuhaiYu/austin-student-dashboard",
  },
  {
    id: 3,
    title: "Open Mat",
    description:
      "A content and community platform for Open Mat, delivering martial-arts media, event information, and membership tooling with a fast, mobile-first UI.",
    technologies: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    imageUrl: "/images/open-mat.png",
    demoUrl: "https://www.openmat.com.cn/",
  },
  {
    id: 4,
    title: "PixCode",
    description:
      "An OpenAI-compatible API gateway connecting 100+ LLMs with one key. Access GPT-5, Claude 4.6, Gemini 3, DeepSeek, and more through a unified endpoint.",
    technologies: ["Next.js", "TypeScript", "OpenAI API", "Tailwind"],
    imageUrl: "/images/pixcode.png",
    demoUrl: "https://www.onlypixai.com/",
    repoUrl: "https://github.com/ShuhaiYu/botai",
  },
  {
    id: 5,
    title: "Goodmood Studio",
    description:
      "A fully bilingual (EN/中) marketing site for a Melbourne agency working the China–Australia bridge, with server-side image optimisation for image-heavy editorial.",
    technologies: ["Next.js", "TypeScript", "Bilingual (EN/中)", "Tailwind"],
    imageUrl: "/images/good-mood-studio.webp",
    demoUrl: "https://www.goodmoodstudio.com.au/en",
  },
  {
    id: 6,
    title: "Insight Idea",
    description:
      "A bilingual marketing site for an Australian immigration consultancy, surfacing MARN and QEAC credentials in the page chrome and carrying social proof through video-led client narratives.",
    technologies: ["Next.js", "TypeScript", "Bilingual (EN/中)", "Tailwind"],
    imageUrl: "/images/insight-idea.webp",
    demoUrl: "https://www.insightidea.com.au/en",
  },
  {
    id: 7,
    title: "Pet Daddy",
    description:
      "A Shopify storefront for a Surrey Hills pet boutique, with grooming bookings running inside the same back office as retail across roughly fifteen product categories.",
    technologies: ["Shopify", "Liquid", "Grooming booking"],
    imageUrl: "/images/pet-daddy.webp",
    demoUrl: "https://www.petdaddy.com.au/",
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
