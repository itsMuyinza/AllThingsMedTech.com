import React, { useState } from 'react';
import { Search, ArrowRight, Filter, X, Check } from 'lucide-react';
import NeuralBackground from './NeuralBackground';

interface HeroProps {
  onNavigate?: (page: string, params?: any) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filterOptions = ['Contract Manufacturing', 'Design & R&D', 'Regulatory', 'Sterilization', 'Packaging'];

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (onNavigate) onNavigate('directory', { query: searchQuery });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-32 pb-20 overflow-hidden">
      
      {/* 1. Neural Particle Background (Interactive) */}
      <NeuralBackground />

      {/* 2. Abstract Background Shapes (Static Layer) */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none select-none">
        <svg viewBox="0 0 400 400" className="w-full h-full text-med-teal fill-current">
          <path d="M41.5,138.2C89.9,152.1,137.7,143.9,173.7,118.8C209.7,93.7,233.9,51.8,245.8,17.4C257.7,-16.9,257.3,-43.8,242.3,-66.6C227.3,-89.4,197.7,-108.1,164.5,-122.9C131.3,-137.7,94.5,-148.6,56.6,-147.2C18.7,-145.8,-20.3,-132.1,-55.8,-115.8C-91.3,-99.5,-123.3,-80.7,-142.3,-52.8C-161.3,-24.9,-167.3,12.1,-154.5,43.2C-141.7,74.3,-110.1,99.5,-78.9,118.9C-47.7,138.3,-16.9,151.9,12.3,151.9C41.5,151.9,83,151.9,124.5,151.9" transform="translate(200 200) scale(1.2)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10 px-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-med-teal/20 bg-white/30 backdrop-blur-md mb-8 animate-fadeInUp shadow-sm hover:shadow-lg hover:border-retro-orange/50 transition-all duration-300">
          <span className="w-2 h-2 rounded-full bg-retro-orange animate-pulse"></span>
          <span className="text-xs font-tech tracking-[0.2em] uppercase text-med-teal font-bold">The Global MedTech Directory</span>
        </div>

        {/* Title with Clamp Typography */}
        <h1 className="flex flex-col items-center justify-center leading-[0.9] mb-8 relative">
          <span 
            className="font-serif font-black text-med-teal tracking-tighter drop-shadow-sm opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]"
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
          >
            ALL THINGS
          </span>
          <span 
            className="font-serif italic font-light text-retro-orange mix-blend-multiply opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)', marginTop: 'clamp(-0.5rem, -2vw, -2rem)' }}
          >
            MEDTECH
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-lg md:text-2xl text-ink/70 max-w-2xl mx-auto mb-16 font-light leading-relaxed opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
          Discover qualified partners, explore cutting-edge innovation, and stay ahead in the medical device industry.
        </p>

        {/* Search Interface with Glassmorphism */}
        <div className={`relative max-w-2xl mx-auto z-40 transition-all duration-500 ease-out ${isFocused ? 'scale-105' : 'scale-100'} opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]`}>
          <form onSubmit={handleSearch} className="relative group">
            {/* Animated Glow Behind */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-med-teal via-retro-orange to-med-teal rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse ${isFocused || showFilters ? 'opacity-70' : ''}`}></div>
            
            <div className="relative bg-white/80 backdrop-blur-xl rounded-xl border border-white/40 shadow-xl flex items-center p-2">
              
              <div className="pl-4 text-med-teal/60">
                <Search className="w-6 h-6" />
              </div>

              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find suppliers, products, or services..."
                className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-lg font-sans text-ink placeholder-ink/40"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              />

              <div className="hidden md:flex border-l border-med-teal/10 pl-2">
                 <button 
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2 text-sm font-tech font-bold flex items-center gap-1 transition-colors ${showFilters ? 'text-retro-orange' : 'text-med-teal/70 hover:text-med-teal'}`}
                 >
                    {showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />} Filters
                 </button>
              </div>

              <button type="submit" className="bg-med-teal hover:bg-retro-orange text-bone p-3.5 rounded-lg ml-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
          
          {/* Quick Suggestions & Filters Overlay */}
          {(isFocused || showFilters) && (
             <div className="absolute top-full left-0 w-full mt-3 bg-white rounded-2xl shadow-2xl border border-med-teal/5 p-4 z-50 animate-[slideDown_0.2s_ease-out] text-left">
                {showFilters ? (
                    <div>
                        <div className="px-3 py-2 text-xs font-bold text-med-teal font-tech uppercase tracking-wider mb-2">Category Filters</div>
                        <div className="flex flex-wrap gap-2">
                            {filterOptions.map(opt => (
                                <button 
                                    key={opt}
                                    onClick={() => onNavigate && onNavigate('directory', { category: opt })}
                                    className="px-4 py-2 bg-bone hover:bg-med-teal hover:text-white rounded-full text-sm font-tech font-bold transition-all border border-med-teal/5"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="px-3 py-2 text-xs font-bold text-med-teal/50 font-tech uppercase tracking-wider">Popular Searches</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {['Injection Molding', 'ISO 13485 Consultants', 'Sterilization Services', 'Medical Electronics'].map(term => (
                            <button 
                                key={term} 
                                onClick={() => {
                                    setSearchQuery(term);
                                    if (onNavigate) onNavigate('directory', { query: term });
                                }}
                                className="px-3 py-2 text-sm text-ink/80 hover:bg-med-teal/10 hover:text-retro-orange rounded-lg text-left transition-colors font-sans font-medium flex items-center justify-between group"
                            >
                              {term}
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          ))}
                        </div>
                    </>
                )}
             </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4 opacity-0 animate-[fadeInUp_1s_ease-out_1.2s_forwards] relative z-30">
          <span className="text-sm font-serif italic text-ink/60">Are you a supplier or service provider?</span>
          <button 
            onClick={() => onNavigate && onNavigate('join')}
            className="group relative px-6 py-2 text-sm font-bold font-tech text-retro-orange transition-colors"
          >
            List your company
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-retro-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;