import React, { useEffect, useRef } from 'react';

const AudioWaveformBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    let animationFrameId: number;
    let time = 0;
    
    // Mouse interaction
    let mouseX = -1000;
    
    // Configuration
    const barWidth = 4;
    const gap = 8;
    const baseColor = 'rgba(242, 240, 233, 0.15)'; // Low opacity bone/white
    const activeColor = 'rgba(0, 204, 160, 0.3)'; // Teal accent

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const totalBars = Math.floor(width / (barWidth + gap));
      const centerY = height / 2;

      for (let i = 0; i < totalBars; i++) {
        const x = i * (barWidth + gap);
        
        // Calculate distance from mouse for reactivity
        const dist = Math.abs(x - mouseX);
        const mouseFactor = Math.max(0, 1 - dist / 300); // 0 to 1 based on proximity
        
        // Wave math: Base wave + faster secondary wave + mouse interaction
        const wave1 = Math.sin(time * 0.02 + i * 0.05);
        const wave2 = Math.sin(time * 0.05 + i * 0.1);
        
        // Height calculation
        let barHeight = 40 + (wave1 * 30) + (wave2 * 15);
        
        // Amplify with mouse
        barHeight += mouseFactor * 80 * Math.sin(time * 0.2 + i * 0.5);

        // Color blending
        ctx.fillStyle = mouseFactor > 0.1 ? activeColor : baseColor;
        
        // Draw rounded pill shape
        roundedRect(ctx, x, centerY - barHeight / 2, barWidth, barHeight, barWidth / 2);
      }

      time += 1; // Animation speed
      animationFrameId = requestAnimationFrame(render);
    };

    const roundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.fill();
    };

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />;
};

export default AudioWaveformBackground;