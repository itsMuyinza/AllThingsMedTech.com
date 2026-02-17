"use client";
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" stroke="#2B4C59" strokeWidth="1" className="opacity-50" />
      <circle cx="50" cy="50" r="35" stroke="#2B4C59" strokeWidth="1" strokeDasharray="10 5" className="animate-[spin_10s_linear_infinite]" />
      <circle cx="50" cy="50" r="28" stroke="#D65A31" strokeWidth="2" strokeLinecap="round" strokeDasharray="20 40" className="animate-[spin_8s_linear_infinite_reverse]" />
      <circle cx="50" cy="5" r="3" fill="#D65A31" />
      <circle cx="95" cy="50" r="3" fill="#2B4C59" />
      <circle cx="5" cy="50" r="3" fill="#2B4C59" />
      <path d="M50 25 V75 M25 50 H75" stroke="url(#grad1)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 28 V45" stroke="rgba(255,255,255,0.4)" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 55 V72" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round" />
      <defs>
        <linearGradient id="grad1" x1="25" y1="25" x2="75" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2B4C59" />
          <stop offset="100%" stopColor="#3E6B7D" />
        </linearGradient>
      </defs>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); transform-origin: 50px 50px; } to { transform: rotate(360deg); transform-origin: 50px 50px; } }
      `}</style>
    </svg>
  );
};

export default Logo;
