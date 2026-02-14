import React, { useEffect, useRef } from 'react';

interface ConstellationProps {
  speedFactor?: number;
  particleCount?: number;
}

const ConstellationBackground: React.FC<ConstellationProps> = ({ 
  speedFactor = 1, 
  particleCount = 70 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    
    // Configuration
    const connectionDistance = 140;
    const mouseConnectionDistance = 200;
    
    let mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.15 * speedFactor; // Adjusted by speedFactor
        this.vy = (Math.random() - 0.5) * 0.15 * speedFactor;
        this.size = Math.random() * 1.5 + 1; 
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#2B4C59'; // Med Teal
        ctx.fill();
      }
    }

    const init = () => {
      // Use parent container dimensions if possible, else window
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((a, index) => {
         a.update();
         
         // Draw particle
         ctx.beginPath();
         ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
         ctx.fillStyle = 'rgba(43, 76, 89, 0.4)'; // Med Teal nodes
         ctx.fill();

         // Inter-particle connections
         for (let j = index + 1; j < particles.length; j++) {
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(43, 76, 89, ${(1 - dist/connectionDistance) * 0.15})`; // Very faint lines
                ctx.lineWidth = 0.5;
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
         }

         // Mouse connections
         const mDx = mouse.x - a.x;
         const mDy = mouse.y - a.y;
         const mDist = Math.sqrt(mDx*mDx + mDy*mDy);
         if (mDist < mouseConnectionDistance) {
             ctx.beginPath();
             ctx.strokeStyle = `rgba(43, 76, 89, ${(1 - mDist/mouseConnectionDistance) * 0.2})`; 
             ctx.lineWidth = 0.5;
             ctx.moveTo(a.x, a.y);
             ctx.lineTo(mouse.x, mouse.y);
             ctx.stroke();
             
             // Gentle attraction
             const force = (mouseConnectionDistance - mDist) / mouseConnectionDistance;
             a.vx += (mDx / mDist) * force * 0.005;
             a.vy += (mDy / mDist) * force * 0.005;
         }
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });
    
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', () => {});
    };
  }, [speedFactor, particleCount]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />;
};

export default ConstellationBackground;