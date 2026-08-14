import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import CodeStream from "@/components/portfolio/CodeStream";
import Services from "@/components/portfolio/Services";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Signal from "@/components/portfolio/Signal";
import LatestPosts from "@/components/blog/LatestPosts";
import Testimonials from "@/components/portfolio/Testimonials";
import Contact from "@/components/portfolio/Contact";
import { client } from "@/lib/sanity/client";
import { projectsSummaryQuery } from "@/lib/sanity/queries";
import { PROJECTS } from "@/lib/constants";
import type { ProjectSummary } from "@/lib/types";

export const revalidate = 300;

export default async function Home() {
  const sanityProjects: ProjectSummary[] = await client
    .fetch(projectsSummaryQuery)
    .catch(() => []);

  return (
    <div className="min-h-screen bg-dark text-slate-200 overflow-x-hidden">
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <CodeStream />
        <Services />
        <Experience />
        <Signal />
        <Projects sanityProjects={sanityProjects} fallback={PROJECTS} />
        <LatestPosts />
        <Testimonials />
      </main>
      <Contact />
    </div>
  );
}
