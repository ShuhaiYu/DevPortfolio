import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import CodeStream from './components/CodeStream';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark text-slate-200 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        
        <About />
        
        {/* Visual Break: Code Stream as a transition decoration */}
        <CodeStream />
        
        <Services />
        <Experience />
        <Projects />
        <Testimonials />
      </main>
      <Contact />
      <AIChat />
    </div>
  );
};

export default App;