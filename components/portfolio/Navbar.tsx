"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { OWNER_NAME } from "@/lib/constants";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";
import { usePalette } from "@/components/palette/PaletteProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggle: togglePalette } = usePalette();
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current) return;
      if (prefersReducedMotion()) {
        gsap.set(rootRef.current, { y: 0, opacity: 1 });
        return;
      }
      gsap.fromTo(
        rootRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: EASE.expo, delay: 1.8 },
      );
    },
    { scope: rootRef },
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus management + ESC close for mobile menu
  useEffect(() => {
    if (!isOpen) return;

    // Focus first link when menu opens
    const firstLink = menuPanelRef.current?.querySelector<HTMLElement>(
      "a[href]"
    );
    firstLink?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        menuToggleRef.current?.focus();
        return;
      }
      // Simple focus trap: cycle between first and last focusable link
      if (e.key === "Tab" && menuPanelRef.current) {
        const focusables = menuPanelRef.current.querySelectorAll<HTMLElement>(
          "a[href]"
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const navLinks = [
    { name: "Profile", href: "#about" },
    { name: "Protocols", href: "#services" },
    { name: "Log", href: "#experience" },
    { name: "Work", href: "#projects" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <div
      ref={rootRef}
      className="fixed top-0 left-0 w-full z-50 flex justify-center pt-2 sm:pt-4 px-4 pointer-events-none"
    >
      <nav
        className={`pointer-events-auto transition-all duration-500 ease-out ${
          scrolled
            ? "bg-dark/90 backdrop-blur-md border border-primary/20 shadow-[0_0_30px_rgba(240,196,69,0.1)] rounded-2xl py-3 px-4 sm:px-6 w-full max-w-5xl"
            : "bg-transparent w-full max-w-7xl py-4"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center cursor-pointer group"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="relative">
              <Zap
                className={`relative h-6 w-6 ${
                  scrolled ? "text-primary" : "text-white"
                } transition-colors group-hover:text-accent`}
              />
            </div>
            {!scrolled && (
              <span className="ml-2 font-heading font-bold text-lg sm:text-xl tracking-tighter text-white group-hover:text-primary transition-colors">
                {OWNER_NAME}
              </span>
            )}
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                  scrolled
                    ? "text-slate-400 hover:text-white hover:bg-white/10"
                    : "text-slate-300 hover:text-primary hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              type="button"
              onClick={togglePalette}
              className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest border border-white/10 text-slate-400 hover:border-primary/40 hover:text-primary transition-all"
              aria-label="Open command palette"
            >
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px]">
                ⌘K
              </kbd>
            </button>
            <Link
              href="#contact"
              className={`ml-2 px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest font-bold transition-all duration-300 ${
                scrolled
                  ? "bg-primary text-dark hover:bg-white hover:scale-105"
                  : "border border-white/20 text-white hover:border-primary hover:text-primary"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden pointer-events-auto">
            <button
              ref={menuToggleRef}
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:text-primary transition-colors backdrop-blur-sm bg-white/5 rounded-lg border border-white/10"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div
            id="mobile-menu"
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute top-full left-0 w-full mt-4 p-2 md:hidden pointer-events-auto"
          >
            <div className="glass-panel bg-black/95 backdrop-blur-2xl rounded-2xl p-6 flex flex-col space-y-4 animate-fade-in border border-primary/20 shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
              {[...navLinks, { name: "Contact", href: "#contact" }].map(
                (link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-center text-slate-300 hover:text-dark hover:bg-primary block px-4 py-3 rounded-xl text-lg font-heading font-bold transition-all active:scale-95 border border-white/5 hover:border-primary"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
