"use client";
import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button';

      setIsHovering(!!isClickable);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference transition-transform duration-300 ease-out"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${position.x - 12}px, ${position.y - 12}px, 0) scale(${isHovering ? 1.5 : 1})`,
          width: '24px',
          height: '24px'
        }}
      >
        <div className={`w-full h-full rounded-full border border-white/80 bg-white/10 backdrop-blur-[1px] shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-colors duration-300 ${isHovering ? 'bg-white/30' : 'bg-white/10'}`}></div>
      </div>

      <div
        className="fixed pointer-events-none z-[9999] w-2 h-2 bg-retro-orange rounded-full mix-blend-normal transition-all duration-100 ease-out"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
          opacity: isHovering ? 0 : 1
        }}
      ></div>
    </>
  );
};

export default CustomCursor;
