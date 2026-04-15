import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import CodeStream from "@/components/portfolio/CodeStream";
import Services from "@/components/portfolio/Services";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import GitHubContributions from "@/components/portfolio/GitHubContributions";
import LatestPosts from "@/components/blog/LatestPosts";
import Testimonials from "@/components/portfolio/Testimonials";
import Contact from "@/components/portfolio/Contact";
import AIChat from "@/components/chat/AIChat";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark text-slate-200 overflow-x-hidden">
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <CodeStream />
        <Services />
        <Experience />
        <GitHubContributions />
        <Projects />
        <LatestPosts />
        <Testimonials />
      </main>
      <Contact />
      <AIChat />
    </div>
  );
}
