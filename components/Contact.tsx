import React from 'react';
import { SOCIAL_LINKS, OWNER_NAME } from '../constants';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-dark pt-32 pb-12 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-[12vw] md:text-[8vw] leading-none font-heading font-black text-white mb-8 tracking-tighter opacity-20 select-none">
          GET IN TOUCH
        </h2>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-8">Interested in collaboration?</h3>
            
            <a 
            href="mailto:hello@example.com"
            className="inline-flex items-center px-10 py-5 bg-white text-dark font-bold rounded-full text-lg hover:scale-105 hover:bg-accent transition-all duration-300 shadow-xl shadow-white/10"
            >
            Say Hello <ArrowRight className="ml-2 w-5 h-5" />
            </a>
        </div>
      </div>

      <div className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8">
        <div className="text-slate-500 text-sm font-mono">
          © {new Date().getFullYear()} {OWNER_NAME}
        </div>

        <div className="flex space-x-8">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-accent transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
        
        <div className="text-slate-500 text-sm font-mono">
            DESIGNED + CODED
        </div>
      </div>
    </footer>
  );
};

export default Contact;