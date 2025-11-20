import React from 'react';

const CodeStream: React.FC = () => {
  const snippets = [
    "git push origin production",
    "npm install @future/ui",
    "while(alive) { code(); }",
    "if (err) throw new Error('Café needed');",
    "const efficiency = 100%;",
    "import { Success } from 'life';",
    "<Component />",
    "docker-compose up -d",
    "await sleep(8 hours);",
    "sudo rm -rf /legacy-code",
    "console.log('Hello World');"
  ];

  return (
    <section className="relative py-16 bg-dark overflow-hidden border-y border-white/5">
      
      {/* Ambient Glow */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-dark to-transparent z-20"></div>
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-dark to-transparent z-20"></div>

      {/* Stream 1: Left to Right */}
      <div className="relative flex overflow-x-hidden mb-4 opacity-60 hover:opacity-100 transition-opacity duration-500">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          {[...snippets, ...snippets, ...snippets].map((text, i) => (
            <div key={i} className="flex items-center gap-4">
               <span className="text-primary font-mono text-sm md:text-base">{'>'}</span>
               <span className="font-mono text-sm md:text-base text-slate-400 hover:text-white transition-colors cursor-default">
                  {text}
               </span>
            </div>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-12 items-center">
          {[...snippets, ...snippets, ...snippets].map((text, i) => (
            <div key={i} className="flex items-center gap-4">
               <span className="text-primary font-mono text-sm md:text-base">{'>'}</span>
               <span className="font-mono text-sm md:text-base text-slate-400 hover:text-white transition-colors cursor-default">
                  {text}
               </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stream 2: Right to Left (Slower, Different Color) */}
      <div className="relative flex overflow-x-hidden opacity-40 hover:opacity-80 transition-opacity duration-500">
        <div className="animate-marquee-reverse whitespace-nowrap flex gap-12 items-center">
           {[...snippets.reverse(), ...snippets, ...snippets].map((text, i) => (
            <div key={i} className="flex items-center gap-4">
               <span className="text-secondary font-mono text-xs md:text-sm">{'//'}</span>
               <span className="font-mono text-xs md:text-sm text-slate-500 hover:text-secondary transition-colors cursor-default">
                  {text}
               </span>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          @keyframes marquee2 {
            0% { transform: translateX(100%); }
            100% { transform: translateX(0%); }
          }
          @keyframes marquee-reverse {
             0% { transform: translateX(-100%); }
             100% { transform: translateX(0%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .animate-marquee2 {
            animation: marquee2 40s linear infinite;
          }
          .animate-marquee-reverse {
             animation: marquee-reverse 50s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default CodeStream;