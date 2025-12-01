"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { OWNER_NAME } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Profile", href: "#about" },
    { name: "Protocols", href: "#services" },
    { name: "Log", href: "#experience" },
    { name: "Work", href: "#projects" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-2 sm:pt-4 px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-500 ease-out ${
          scrolled
            ? "bg-dark/90 backdrop-blur-md border border-primary/20 shadow-[0_0_30px_rgba(0,240,255,0.1)] rounded-2xl py-3 px-4 sm:px-6 w-full max-w-5xl"
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
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:text-primary transition-colors backdrop-blur-sm bg-white/5 rounded-lg border border-white/10"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-4 p-2 md:hidden pointer-events-auto">
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
