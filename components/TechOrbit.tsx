import React, { useEffect, useRef } from 'react';
import { SKILLS } from '../constants';

const TechOrbit: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let animationFrameId: number;

    // 3D Configuration
    const tags = [...SKILLS, "UI/UX", "WebGL", "Git", "Agile", "Clean Code"];
    const sphereRadius = Math.min(width, height) * 0.35; // Radius relative to screen size
    let rotationAxis = { x: 0.002, y: 0.002 }; // Auto rotation speed
    let mouse = { x: 0, y: 0 };
    let isHovering = false;

    // Points generation
    interface Point {
      x: number;
      y: number;
      z: number;
      text: string;
      opacity: number;
      scale: number;
    }

    const points: Point[] = [];
    
    // Distribute points on a sphere (Fibonacci Sphere algorithm)
    const goldenRatio = (1 + 5 ** 0.5) / 2;
    for (let i = 0; i < tags.length; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / tags.length);
      
      points.push({
        x: sphereRadius * Math.sin(phi) * Math.cos(theta),
        y: sphereRadius * Math.sin(phi) * Math.sin(theta),
        z: sphereRadius * Math.cos(phi),
        text: tags[i],
        opacity: 1,
        scale: 1
      });
    }

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate mouse position relative to center
      mouse.x = (e.clientX - rect.left - centerX) * 0.0001;
      mouse.y = (e.clientY - rect.top - centerY) * 0.0001;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    const rotatePoint = (p: Point, rotationX: number, rotationY: number) => {
      // Rotate around Y axis
      let y = p.y;
      let z = p.z * Math.cos(rotationX) - p.x * Math.sin(rotationX);
      let x = p.z * Math.sin(rotationX) + p.x * Math.cos(rotationX);
      p.x = x;
      p.z = z;

      // Rotate around X axis
      let newY = y * Math.cos(rotationY) - z * Math.sin(rotationY);
      let newZ = y * Math.sin(rotationY) + z * Math.cos(rotationY);
      p.y = newY;
      p.z = newZ;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;

      // Determine rotation speed
      const targetRotX = isHovering ? mouse.x : 0.002;
      const targetRotY = isHovering ? mouse.y : 0.002;

      points.forEach(point => {
        rotatePoint(point, targetRotX, targetRotY);

        // Perspective projection
        const fov = 300;
        const scale = fov / (fov - point.z);
        point.scale = scale;
        
        // Only draw if points are not too close to camera (clipping)
        if (scale > 0) {
          const alpha = (point.z + sphereRadius) / (2 * sphereRadius); // Depth based opacity
          point.opacity = Math.max(0.1, Math.min(1, alpha));
        }
      });

      // Sort points by Z depth so points in front cover points in back
      points.sort((a, b) => a.z - b.z);

      points.forEach(point => {
        if (point.scale <= 0) return;

        ctx.save();
        ctx.translate(centerX + point.x, centerY + point.y);
        ctx.scale(point.scale, point.scale);
        
        // Text Style
        ctx.font = `bold 14px 'JetBrains Mono'`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Glow effect
        if (point.opacity > 0.8) {
           ctx.shadowBlur = 15;
           ctx.shadowColor = '#00f0ff';
           ctx.fillStyle = '#ffffff';
        } else {
           ctx.shadowBlur = 0;
           ctx.fillStyle = '#7000df';
        }

        ctx.globalAlpha = point.opacity;
        ctx.fillText(point.text, 0, 0);
        
        // Draw a small connecting dot
        /*
        ctx.beginPath();
        ctx.arc(0, 20, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#00f0ff';
        ctx.fill();
        */

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full h-[500px] bg-dark flex items-center justify-center overflow-hidden">
      {/* Aesthetic borders */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      {/* Background Grid (Static) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(112,0,223,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(112,0,223,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl h-full" ref={containerRef}>
         <canvas ref={canvasRef} className="w-full h-full cursor-move" />
      </div>

      {/* UI Overlay */}
      <div className="absolute top-4 left-8 hidden md:block pointer-events-none">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-xs font-mono text-green-500 tracking-widest">KERNEL_ACTIVE</span>
          </div>
          <div className="text-[10px] font-mono text-slate-600 mt-1">CPU_USAGE: 12%</div>
      </div>

       <div className="absolute bottom-4 right-8 hidden md:block pointer-events-none text-right">
          <div className="text-xs font-mono text-primary tracking-widest">VISUAL_MODULE.JS</div>
          <div className="text-[10px] font-mono text-slate-600 mt-1">RENDER_MODE: CANVAS_2D</div>
      </div>
    </section>
  );
};

export default TechOrbit;