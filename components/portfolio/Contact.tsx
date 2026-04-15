"use client";

import { useRef } from "react";
import { SOCIAL_LINKS, OWNER_NAME } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";
import MagneticButton from "@/components/effects/MagneticButton";

export default function Contact() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const bg = root.querySelector<HTMLElement>("[data-contact-bg]");
      const title = root.querySelector<HTMLElement>("[data-contact-title]");
      const cta = root.querySelector<HTMLElement>("[data-contact-cta]");
      const socials = root.querySelectorAll<HTMLElement>("[data-contact-social]");

      if (prefersReducedMotion()) {
        gsap.set([bg, title, cta, ...Array.from(socials)], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap.fromTo(
        bg,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 0.2,
          scale: 1,
          duration: 1.2,
          ease: EASE.out,
          scrollTrigger: { trigger: root, start: "top 85%" },
        },
      );

      gsap.fromTo(
        title,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 0.25,
          y: 0,
          scale: 1,
          duration: 1,
          ease: EASE.out,
          scrollTrigger: { trigger: root, start: "top 70%" },
        },
      );

      gsap.fromTo(
        cta,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: EASE.elastic,
          scrollTrigger: { trigger: root, start: "top 65%" },
        },
      );

      gsap.fromTo(
        socials,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: EASE.out,
          scrollTrigger: { trigger: root, start: "top 55%" },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <footer
      ref={rootRef}
      id="contact"
      className="bg-dark pt-32 pb-12 relative overflow-hidden"
    >
      <div
        data-contact-bg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none opacity-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2
          data-contact-title
          className="text-[12vw] md:text-[8vw] leading-none font-heading font-black text-primary mb-8 tracking-tighter opacity-0 select-none"
        >
          GET IN TOUCH
        </h2>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-8">
            Interested in collaboration?
          </h3>

          <MagneticButton data-contact-cta className="inline-block opacity-0">
            <a
              href="mailto:info@felixyu.net"
              className="inline-flex items-center px-10 py-5 bg-white text-dark font-bold rounded-full text-lg hover:bg-accent transition-colors duration-300 shadow-xl shadow-white/10"
            >
              Say Hello <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </MagneticButton>
        </div>
      </div>

      <div className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8">
        <div
          data-contact-social
          className="text-slate-500 text-sm font-mono opacity-0"
        >
          © {new Date().getFullYear()} {OWNER_NAME}
        </div>

        <div className="flex space-x-8">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.platform}
              data-contact-social
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${link.platform} profile`}
              className="opacity-0 inline-flex items-center justify-center w-11 h-11 -m-2 text-slate-400 hover:text-accent transition-colors"
            >
              <Icon name={link.iconName} size={20} />
            </a>
          ))}
        </div>

        <div
          data-contact-social
          className="text-slate-500 text-sm font-mono opacity-0"
        >
          DESIGNED + CODED
        </div>
      </div>
    </footer>
  );
}
