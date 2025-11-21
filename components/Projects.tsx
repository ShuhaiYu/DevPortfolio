import React from 'react';
import { PROJECTS } from '../constants';
import { Github, ArrowUpRight } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 sm:py-32 bg-dark relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 sm:mb-20">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-white mb-4 tracking-tighter">
              SELECTED <span className="text-slate-700">WORK</span>
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-slate-500 font-mono text-sm">
              // 03 FEATURED PROJECTS<br />
              // REACT & AI INTEGRATIONS
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {PROJECTS.map((project, index) => {
            // Layout Configuration
            const isFirst = index === 0; // Span 8
            const isSecond = index === 1; // Span 4 (Compact)
            const isThird = index === 2; // Span 12 (Full)

            const colSpan = isFirst ? 'md:col-span-8' : isSecond ? 'md:col-span-4' : 'md:col-span-12';
            
            // CRITICAL FIX: 
            // The second item (index 1) is narrow. If we force 'md:flex-row', the image gets crushed.
            // We must keep index 1 as 'flex-col' (Vertical stack) even on desktop.
            // Others can use 'md:flex-row' (Side by side).
            const containerDirection = isSecond ? 'flex-col' : 'flex-col md:flex-row';
            
            // Image Sizing logic
            // For the compact card (isSecond), we want a fixed height image.
            // For others, on desktop, we want 50% width.
            const imageContainerClass = isSecond 
                ? 'w-full h-56 sm:h-64' // Fixed height for compact card
                : 'w-full h-56 sm:h-72 md:h-auto md:w-1/2'; // Responsive for others

            // Reordering for the 3rd item (Image on right)
            const imageOrder = isThird ? 'md:order-2' : 'order-1';
            const contentOrder = isThird ? 'md:order-1' : 'order-2';
            const contentWidth = isSecond ? 'w-full' : 'md:w-1/2';

            return (
              <div 
                key={project.id} 
                className={`${colSpan} group relative bg-surface border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-primary/30 transition-colors duration-500 flex ${containerDirection}`}
              >
                {/* Hover Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition duration-500 pointer-events-none"></div>

                {/* Image Section */}
                <div className={`${imageContainerClass} ${imageOrder} overflow-hidden relative flex-shrink-0`}>
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content Section */}
                <div className={`p-6 sm:p-8 flex flex-col justify-between ${contentWidth} ${contentOrder} flex-1`}>
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-mono text-[10px] sm:text-xs text-accent px-2 py-1 border border-accent/30 rounded-full">
                         0{index + 1}
                      </span>
                      <div className="flex gap-3 relative z-20">
                         <a href={project.repoUrl} className="p-2 bg-white/5 rounded-full hover:bg-white/20 text-white transition-colors">
                           <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
                         </a>
                         <a href={project.demoUrl} className="p-2 bg-white/5 rounded-full hover:bg-accent hover:text-dark text-white transition-colors">
                           <ArrowUpRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                         </a>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-[10px] sm:text-xs font-medium text-slate-300 font-mono bg-white/5 px-2 py-1 rounded">
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center md:text-left">
           <a href="https://github.com/ShuhaiYu" className="inline-flex items-center text-white border-b border-white/30 pb-1 hover:border-accent hover:text-accent transition-all uppercase tracking-widest text-xs sm:text-sm">
              View Github Archive <ArrowUpRight className="ml-2 w-4 h-4" />
           </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;