import React, { useState, useEffect } from 'react';
import { Play, Pause, X, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface Episode {
  id: number;
  title: string;
  guest: string;
  image: string;
}

interface PersistentPlayerProps {
  episode: Episode | null;
  onClose: () => void;
}

const PersistentPlayer: React.FC<PersistentPlayerProps> = ({ episode, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (episode) {
      setIsPlaying(true);
      setProgress(0);
    }
  }, [episode]);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 0.1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!episode) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-ink text-bone border-t border-med-teal/20 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] animate-[slideUp_0.4s_ease-out]">
      {/* Progress Bar Container */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 cursor-pointer group">
        <div 
          className="h-full bg-retro-orange relative transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-retro-orange rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <img src={episode.image} alt="cover" className="w-12 h-12 rounded-lg object-cover border border-white/10 hidden sm:block" />
          <div className="min-w-0">
             <h4 className="font-serif font-bold text-sm md:text-base truncate text-med-teal">{episode.title}</h4>
             <p className="font-sans text-xs text-bone/50 truncate">Guest: {episode.guest}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 md:gap-8 shrink-0">
           <button className="text-bone/40 hover:text-white transition-colors hidden md:block">
              <SkipBack className="w-5 h-5" />
           </button>
           
           <button 
             onClick={() => setIsPlaying(!isPlaying)}
             className="w-10 h-10 md:w-12 md:h-12 bg-bone text-ink rounded-full flex items-center justify-center hover:bg-retro-orange hover:text-white transition-all shadow-lg hover:scale-105"
           >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-1 fill-current" />}
           </button>

           <button className="text-bone/40 hover:text-white transition-colors hidden md:block">
              <SkipForward className="w-5 h-5" />
           </button>
        </div>

        {/* Volume & Close */}
        <div className="flex items-center gap-6 flex-1 justify-end min-w-0">
           <div className="hidden md:flex items-center gap-2 group">
              <Volume2 className="w-4 h-4 text-bone/40" />
              <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                 <div className="w-2/3 h-full bg-med-teal group-hover:bg-retro-orange transition-colors"></div>
              </div>
           </div>
           
           <button 
             onClick={onClose}
             className="p-2 hover:bg-white/10 rounded-full transition-colors text-bone/50 hover:text-retro-orange"
           >
             <X className="w-5 h-5" />
           </button>
        </div>

      </div>
    </div>
  );
};

export default PersistentPlayer;