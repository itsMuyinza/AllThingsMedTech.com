import React, { useState } from 'react';
import { Play, SkipBack, SkipForward, Mic } from 'lucide-react';
import PodcastPlatformModal from './PodcastPlatformModal';

interface PodcastSectionProps {
  onNavigate?: (page: string) => void;
}

const PodcastSection: React.FC<PodcastSectionProps> = ({ onNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="bg-med-teal py-24 px-6 relative overflow-hidden text-bone">
      <PodcastPlatformModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      
      {/* Decorative Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div>
          <div className="inline-flex items-center gap-2 text-retro-orange font-tech font-bold uppercase tracking-widest text-sm mb-4">
            <Mic className="w-4 h-4" />
            <span>All Things MedTech Podcast</span>
          </div>
          <h2 className="font-serif font-bold text-5xl mb-6 leading-tight">
            Ep. 42: The Future of Surgical Robotics
          </h2>
          <p className="font-sans text-lg text-bone/70 mb-8 leading-relaxed">
            Dr. Elena Rostova discusses the shift towards autonomous assistance in microsurgery and what it means for the next decade of OR innovation.
          </p>
          <div className="flex gap-4">
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-bone text-med-teal px-6 py-3 rounded-xl font-bold font-tech hover:bg-retro-orange hover:text-white transition-colors"
            >
              Listen Now
            </button>
            <button 
                onClick={() => onNavigate && onNavigate('podcasts')}
                className="px-6 py-3 rounded-xl font-bold font-tech border border-bone/20 hover:border-retro-orange hover:text-retro-orange transition-colors"
            >
              All Episodes
            </button>
          </div>
        </div>

        {/* Player Visual */}
        <div className="relative">
          <div className="bg-ink/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl relative">
            
            {/* Album Art */}
            <div className="flex gap-6 mb-8">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-retro-orange shrink-0">
                <img src="https://picsum.photos/seed/podcast/200/200" alt="Cover" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                 <h3 className="font-serif font-bold text-xl mb-1">The Future of Surgical Robotics</h3>
                 <p className="font-sans text-sm text-bone/50">Guest: Dr. Elena Rostova</p>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-retro-orange"></div>
              </div>
              <div className="flex justify-between text-xs font-mono text-bone/40">
                <span>12:45</span>
                <span>45:30</span>
              </div>

              {/* Buttons */}
              <div className="flex justify-center items-center gap-8">
                <button className="text-bone/60 hover:text-white transition-colors"><SkipBack className="w-6 h-6" /></button>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-16 h-16 rounded-full bg-retro-orange text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  <Play className="w-8 h-8 ml-1" />
                </button>
                <button className="text-bone/60 hover:text-white transition-colors"><SkipForward className="w-6 h-6" /></button>
              </div>
            </div>

          </div>

          {/* Abstract blobs behind */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-retro-orange rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

      </div>
    </section>
  );
};

export default PodcastSection;