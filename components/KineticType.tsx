import React from 'react';

const KineticType: React.FC = () => {
  const words = ["REACT", "THREE.JS", "WEBGL", "NEXT.JS", "AI", "DESIGN", "PERFORMANCE"];
  const words2 = ["FUTURE", "SYSTEMS", "ARCHITECT", "CYBER", "INTERFACE", "DIGITAL", "FLOW"];

  return (
    <section className="relative py-32 bg-dark overflow-hidden flex flex-col justify-center items-center gap-8 select-none">
      
      {/* Gradient overlay to fade edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark z-20 pointer-events-none"></div>

      {/* Row 1 - Left */}
      <div className="relative w-full transform -rotate-3 bg-primary/5 border-y border-primary/20 py-6 z-10 backdrop-blur-sm">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4">
              {words.map((word) => (
                <span 
                  key={word} 
                  className="text-6xl md:text-8xl font-heading font-black text-transparent bg-clip-text bg-white/5 stroke-text hover:text-primary transition-colors duration-300 cursor-default"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Right */}
      <div className="relative w-full transform rotate-2 bg-secondary/5 border-y border-secondary/20 py-6 z-10">
         <div className="flex whitespace-nowrap animate-[marquee-reverse_25s_linear_infinite] hover:[animation-play-state:paused]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4">
              {words2.map((word) => (
                <span 
                  key={word} 
                  className="text-6xl md:text-8xl font-heading font-black text-transparent stroke-text hover:text-secondary transition-colors duration-300 cursor-default"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Background decorative element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-[120px] z-0"></div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-reverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </section>
  );
};

export default KineticType;