"use client";
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-tech font-bold transition-all duration-300 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";

  const variants = {
    primary: "bg-med-teal text-bone border border-transparent hover:shadow-[0_0_20px_rgba(214,90,49,0.4)]",
    secondary: "bg-retro-orange text-white hover:bg-ink border border-transparent shadow-md hover:shadow-lg",
    outline: "bg-transparent border-2 border-med-teal text-med-teal hover:text-white hover:border-retro-orange",
    ghost: "bg-transparent text-med-teal hover:text-retro-orange hover:bg-med-teal/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-lg uppercase tracking-wide",
    md: "px-6 py-3 text-sm rounded-xl uppercase tracking-wide",
    lg: "px-10 py-4 text-base rounded-xl uppercase tracking-widest",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Animated Glowing Bottom Border for Primary/Outline */}
      {(variant === 'primary' || variant === 'outline') && (
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-retro-orange to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out"></span>
      )}

      {/* Background Fill Animation for Outline */}
      {variant === 'outline' && (
        <span className="absolute inset-0 bg-med-teal transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom z-0"></span>
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default Button;
