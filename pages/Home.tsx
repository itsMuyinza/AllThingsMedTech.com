import React from 'react';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import DirectorySection from '../components/DirectorySection';
import PodcastSection from '../components/PodcastSection';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      
      {/* Redesigned Editorial News Hub: Hero Pulse + Split Feed/Bumpers */}
      <NewsSection onNavigate={onNavigate} />

      <DirectorySection onNavigate={onNavigate} />
      <PodcastSection onNavigate={onNavigate} />
      
      {/* Knowledge Base Teaser Section */}
      <section className="py-24 bg-bone/50 border-t border-med-teal/5">
          <div className="max-w-4xl mx-auto text-center px-6">
              <h2 className="font-serif font-bold text-4xl text-med-teal mb-6">Knowledge is Power</h2>
              <p className="font-sans text-xl text-ink/70 mb-10 max-w-xl mx-auto leading-relaxed">
                  Access our library of expert white papers, technical webinars, and regulatory case studies to drive your next innovation.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                      onClick={() => onNavigate('whitepapers')}
                      className="px-10 py-4 bg-ink text-bone font-bold font-tech rounded-xl hover:bg-retro-orange transition-all shadow-lg active:scale-95"
                  >
                      Browse White Papers
                  </button>
                  <button 
                    onClick={() => onNavigate('events', { filter: 'Webinar' })}
                    className="px-10 py-4 bg-white border border-ink/10 text-ink font-bold font-tech rounded-xl hover:bg-med-teal hover:text-white hover:border-transparent transition-all shadow-sm active:scale-95"
                  >
                      Upcoming Webinars
                  </button>
              </div>
          </div>
      </section>
    </>
  );
};

export default Home;
