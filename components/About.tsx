import React from 'react';
import { BIO, SKILLS } from '../constants';
import { User, Code } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'INTELLIGENCE', value: 98, color: 'bg-primary' },
    { label: 'AGILITY', value: 92, color: 'bg-accent' },
    { label: 'ENDURANCE', value: 88, color: 'bg-secondary' },
    { label: 'CREATIVITY', value: 95, color: 'bg-white' },
  ];

  return (
    <section id="about" className="py-20 sm:py-32 bg-dark relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute right-0 top-20 w-full sm:w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
      <div className="absolute left-4 sm:left-10 top-40 w-24 h-24 border border-white/5 rounded-full flex items-center justify-center animate-spin-slow opacity-20">
        <div className="w-16 h-16 border border-white/10 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left: Character Visual (Abstract) */}
          <div className="w-full max-w-md lg:w-5/12 relative group mx-auto lg:mx-0">
            <div className="aspect-[4/5] w-full relative rounded-sm overflow-hidden border border-primary/30 bg-surface">
              {/* Overlay UI */}
              <div className="absolute inset-0 z-20 p-4 sm:p-6 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                   <Code className="text-primary w-6 sm:w-8 h-6 sm:h-8 opacity-80" />
                   <span className="font-mono text-[10px] text-primary/60 tracking-widest">ID: 8492-AC</span>
                </div>
                <div>
                   <div className="h-[1px] w-full bg-primary/30 mb-2 sm:mb-4"></div>
                   <div className="flex justify-between font-mono text-[10px] sm:text-xs text-primary/80">
                      <span>STATUS: ONLINE</span>
                      <span>LOC: SERVER_01</span>
                   </div>
                </div>
              </div>

              {/* Profile Image / Glitch Effect */}
              <img 
                src="https://picsum.photos/800/1000?random=99" 
                alt="Felix Yu - Full Stack Developer" 
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-hard-light opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Decorative Backdrop */}
            <div className="absolute -top-4 -right-4 w-full h-full border border-dashed border-white/20 -z-10 hidden sm:block"></div>
          </div>

          {/* Right: Stats & Bio */}
          <div className="w-full lg:w-7/12">
            <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="p-2 bg-white/5 rounded border border-white/10">
                   <User className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
                  OPERATOR <span className="text-slate-600">PROFILE</span>
                </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 sm:mb-10 border-l-2 border-accent/50 pl-4 sm:pl-6">
              {BIO}
            </p>

            {/* Stats Bars */}
            <div className="space-y-5 sm:space-y-6 mb-10 sm:mb-12">
               {stats.map((stat) => (
                 <div key={stat.label}>
                    <div className="flex justify-between mb-2">
                       <span className="font-mono text-[10px] sm:text-xs tracking-widest text-slate-400">{stat.label}</span>
                       <span className="font-mono text-[10px] sm:text-xs text-primary">{stat.value}%</span>
                    </div>
                    <div className="h-1.5 sm:h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <div 
                         className={`h-full ${stat.color} shadow-[0_0_10px_currentColor]`} 
                         style={{ width: `${stat.value}%` }}
                       ></div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Mini Tech Grid */}
            <div>
              <h3 className="font-mono text-xs text-slate-500 mb-4 uppercase tracking-widest">// Equipped Modules</h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS.slice(0, 10).map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-surface border border-white/10 rounded text-[10px] sm:text-xs font-mono text-slate-300 hover:border-primary/50 hover:text-primary transition-colors cursor-crosshair">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;