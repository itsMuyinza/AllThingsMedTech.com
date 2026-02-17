"use client";
import React from 'react';
import { X, Headphones, ExternalLink, Cast } from 'lucide-react';

interface PodcastPlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PodcastPlatformModal: React.FC<PodcastPlatformModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const platforms = [
    { name: 'Apple Podcasts', url: '#', bg: 'bg-gradient-to-br from-gray-900 to-black', text: 'text-white' },
    { name: 'Spotify', url: '#', bg: 'bg-[#1DB954]', text: 'text-white' },
    { name: 'Google Podcasts', url: '#', bg: 'bg-gradient-to-r from-blue-500 to-red-500', text: 'text-white' },
    { name: 'Amazon Music', url: '#', bg: 'bg-gradient-to-br from-cyan-400 to-blue-600', text: 'text-white' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]">
      <div
        className="absolute inset-0 bg-med-teal/60 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] p-8 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-retro-orange/30 rounded-full blur-[60px] -mr-10 -mt-10 pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-med-teal/40 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none"></div>

        <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all z-20 group"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="text-center mb-10 relative z-10 pt-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <Headphones className="w-8 h-8 text-retro-orange drop-shadow-[0_0_10px_rgba(214,90,49,0.5)]" />
            </div>
            <h3 className="font-serif font-bold text-4xl text-white mb-2 tracking-tight">Listen Now</h3>
            <p className="font-sans text-sm text-white/60 font-medium tracking-wide uppercase">Select your platform</p>
        </div>

        <div className="space-y-3 relative z-10">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between w-full py-4 px-6 rounded-2xl ${p.bg} ${p.text} font-bold font-tech text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-white/5 group`}
            >
              <div className="flex items-center gap-3">
                  <Cast className="w-4 h-4 opacity-70" />
                  <span>{p.name}</span>
              </div>
              <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          ))}
           <a
              href="#"
              className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl border border-white/10 bg-white/5 text-white/80 font-bold font-tech text-sm hover:bg-white/10 hover:text-white transition-all hover:border-white/20 mt-6"
            >
              <span>RSS Feed</span>
            </a>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlatformModal;
