import React from 'react';
import { EXPERIENCES, SKILLS } from '../constants';
import { Terminal, Cpu } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 sm:py-24 bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Experience Grid */}
          <div>
            <div className="flex items-center gap-4 mb-8 sm:mb-12">
                <div className="p-3 bg-surface rounded-xl border border-white/10">
                   <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">Career Log</h2>
            </div>
            
            <div className="space-y-8 pl-4 sm:pl-2">
              {EXPERIENCES.map((job) => (
                <div key={job.id} className="group relative pl-8 sm:pl-8 border-l border-white/10 hover:border-accent transition-colors duration-300">
                  <div className="absolute -left-[5px] top-1 w-[9px] h-[9px] rounded-full bg-slate-700 group-hover:bg-accent transition-colors"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-accent transition-colors">{job.role}</h3>
                    <span className="text-xs font-mono text-slate-500 bg-surface px-2 py-1 rounded border border-white/5 w-fit mt-1 sm:mt-0">{job.period}</span>
                  </div>
                  
                  <div className="text-secondary font-medium mb-3 text-sm sm:text-base">{job.company}</div>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Visualizer */}
          <div className="relative mt-8 lg:mt-0">
             <div className="lg:sticky lg:top-24">
                <div className="flex items-center gap-4 mb-8 sm:mb-12">
                    <div className="p-3 bg-surface rounded-xl border border-white/10">
                    <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">Stack</h2>
                </div>

                <div className="bg-surface border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                    {/* Decoration */}
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                    </div>

                    <p className="font-mono text-xs text-slate-500 mb-6 block">const currentStack = [</p>
                    
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                        {SKILLS.map((skill, idx) => (
                        <div 
                            key={skill} 
                            className="group relative px-3 sm:px-4 py-2 bg-dark/50 rounded-lg border border-white/5 text-slate-300 hover:text-dark hover:bg-primary hover:border-primary transition-all cursor-default overflow-hidden"
                        >
                            <span className="relative z-10 text-xs sm:text-sm font-medium">{skill}</span>
                        </div>
                        ))}
                    </div>

                    <p className="font-mono text-xs text-slate-500 block">];</p>
                    
                    <div className="mt-8 pt-8 border-t border-white/5">
                        <p className="text-sm text-slate-400 leading-relaxed">
                            "Currently obsessed with making the web feel more organic through <span className="text-accent">WebGL</span> and intelligent via <span className="text-primary">Generative AI</span>."
                        </p>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;