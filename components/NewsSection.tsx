import React from 'react';
import { ArrowUpRight, Clock, Info, ExternalLink } from 'lucide-react';
import Button from './UI/Button';
import { 
  MostPopularWidget, 
  CompanyAnnouncementsWidget, 
  PollWidget, 
  OnThisDayWidget, 
  NewsletterWidget 
} from './SidebarWidgets';

interface NewsSectionProps {
    onNavigate?: (page: string) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ onNavigate }) => {
  const articles = [
    {
      id: 1,
      category: 'Regulatory',
      title: 'FDA Updates Guidance on AI-Enabled Medical Devices',
      summary: 'New framework aims to streamline the approval process for machine learning algorithms in software as a medical device (SaMD). The industry is bracing for more rigorous validation requirements while welcoming the potential for faster breakthrough designations.',
      date: 'Oct 14',
      image: 'https://picsum.photos/seed/medtech1/800/600',
      featured: true
    },
    {
      id: 2,
      category: 'Innovation',
      title: 'Robotics Startup "SurgiBot" Raises Series B',
      summary: 'The funding will accelerate the development of their haptic feedback surgical system.',
      date: 'Oct 12',
      image: 'https://picsum.photos/seed/medtech2/400/300',
      featured: false
    },
    {
      id: 3,
      category: 'Supply Chain',
      title: 'Solving the Titanium Shortage in Orthopedics',
      summary: 'Manufacturers are turning to additive manufacturing to reduce waste and cost.',
      date: 'Oct 10',
      image: 'https://picsum.photos/seed/medtech3/400/300',
      featured: false
    },
    {
      id: 4,
      category: 'M&A',
      title: 'Boston Scientific Acquires Relievant Medsystems',
      summary: 'A strategic move to expand their chronic pain management portfolio.',
      date: 'Oct 09',
      image: 'https://picsum.photos/seed/medtech4/400/300',
      featured: false
    },
    {
      id: 5,
      category: 'Digital Health',
      title: 'Wearable Biosensors Market Projected to Hit $50B',
      summary: 'Consumer demand for continuous health monitoring is driving massive growth.',
      date: 'Oct 08',
      image: 'https://picsum.photos/seed/medtech5/400/300',
      featured: false
    }
  ];

  const latestFeed = [
    {
      id: 10,
      category: 'Deep Dive',
      title: '4 medtech topics to watch in 2026',
      summary: 'From insurance coverage questions to M&A and tariffs, here are the top storylines to watch in the medical device space.',
      image: 'https://picsum.photos/seed/medlatest1/800/500',
      date: 'Oct 15'
    },
    {
      id: 11,
      category: 'Innovation',
      title: 'Intuitive Surgical procedures jump 20% in latest quarter',
      summary: 'The robotic surgery giant continues its dominance with strong placement of its latest generation platforms.',
      image: 'https://picsum.photos/seed/medlatest2/800/500',
      date: 'Oct 14'
    },
    {
      id: 12,
      category: 'Cardiovascular',
      title: 'Abbott expands heart valve portfolio with CE Mark',
      summary: 'New minimally invasive options are becoming available for patients with tricuspid regurgitation.',
      image: 'https://picsum.photos/seed/medlatest3/800/500',
      date: 'Oct 13'
    },
    {
      id: 13,
      category: 'FDA',
      title: 'Baxter gets 510(k) for new infusion pump platform',
      summary: 'The updated system focuses on cybersecurity enhancements and nursing workflow optimization.',
      image: 'https://picsum.photos/seed/medlatest4/800/500',
      date: 'Oct 12'
    },
    {
      id: 14,
      category: 'Earnings',
      title: 'Stryker raises full-year guidance on strong ortho demand',
      summary: 'Recovery in elective procedure volumes drives record revenue for the medical technology leader.',
      image: 'https://picsum.photos/seed/medlatest5/800/500',
      date: 'Oct 11'
    }
  ];

  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 5);

  return (
    <div className="space-y-20">
      {/* 1. PULSE HERO SECTION - FULL CONTAINER WIDTH */}
      <section className="py-16 px-6 max-w-7xl mx-auto relative z-20 bg-bone/50 backdrop-blur-sm rounded-3xl shadow-sm border border-white/50">
        <div className="flex items-end justify-between mb-12 border-b-2 border-ink/10 pb-4">
          <div>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-med-teal mb-2">The Pulse</h2>
            <p className="font-tech text-retro-orange text-sm uppercase tracking-widest font-bold">Industry Pulse & Spotlight</p>
          </div>
          <button 
              onClick={() => onNavigate && onNavigate('news')}
              className="hidden md:flex items-center gap-2 font-tech font-bold text-sm text-ink hover:text-retro-orange transition-colors group"
          >
            All News <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8">
          {/* Hero Left: Large Image */}
          <div className="lg:col-span-8 group cursor-pointer" onClick={() => onNavigate && onNavigate('news')}>
            <div className="relative overflow-hidden rounded-2xl border border-ink/5 shadow-lg h-[460px]">
              <div className="absolute inset-0 bg-med-teal/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-multiply"></div>
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out filter grayscale hover:grayscale-0"
              />
              <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold font-tech text-med-teal rounded-full border border-med-teal/10 shadow-sm">
                {featuredArticle.category}
              </div>
            </div>
          </div>

          {/* Hero Right: 4 Top Stories List */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            {sideArticles.map((article, idx) => (
              <div 
                key={article.id} 
                className={`flex gap-5 group cursor-pointer items-center py-2 ${idx !== sideArticles.length - 1 ? 'border-b border-ink/5' : ''}`} 
                onClick={() => onNavigate && onNavigate('news')}
              >
                <div className="w-24 h-20 shrink-0 overflow-hidden rounded-xl border border-ink/10 relative">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 filter grayscale hover:grayscale-0"
                  />
                </div>
                <div className="flex flex-col flex-1">
                   <span className="text-[10px] font-bold text-retro-orange font-tech mb-1 uppercase tracking-wider">{article.category}</span>
                   <h3 className="font-serif font-bold text-lg text-med-teal leading-tight group-hover:text-retro-orange transition-colors line-clamp-2">
                     {article.title}
                   </h3>
                   <span className="text-[10px] text-ink/40 font-tech flex items-center gap-1 mt-1">
                      <Clock className="w-2.5 h-2.5" /> {article.date}
                   </span>
                </div>
              </div>
            ))}
          </div>

          {/* Hero Bottom: Extended Headline Summary */}
          <div className="lg:col-span-12 group cursor-pointer mt-4" onClick={() => onNavigate && onNavigate('news')}>
            <div className="border-l-4 border-retro-orange pl-8 py-2">
              <div className="flex items-center gap-3 text-xs text-ink/50 font-tech mb-3">
                <Clock className="w-3 h-3" /> {featuredArticle.date} • Featured Headlines
              </div>
              <h3 className="font-serif font-black text-4xl md:text-5xl text-ink mb-4 group-hover:text-retro-orange transition-colors leading-tight tracking-tight">
                {featuredArticle.title}
              </h3>
              <p className="font-sans text-ink/70 leading-relaxed text-xl max-w-5xl">
                {featuredArticle.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LATEST NEWS FEED & BUMPERS SECTION */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Column: 5 stories + Sponsored button */}
        <div className="lg:col-span-9 space-y-16">
          <div className="border-t-4 border-med-teal pt-2 mb-10">
            <h3 className="font-tech font-bold text-xs uppercase tracking-[0.2em] text-ink">The Latest</h3>
          </div>

          <div className="space-y-12">
            {latestFeed.map((story, idx) => (
              <React.Fragment key={story.id}>
                {/* News Card */}
                <div className="flex flex-col md:flex-row gap-8 group cursor-pointer" onClick={() => onNavigate && onNavigate('news')}>
                  <div className="w-full md:w-64 h-44 overflow-hidden rounded-lg shrink-0 border border-ink/5">
                    <img 
                      src={story.image} 
                      alt={story.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-med-teal/50 font-tech uppercase tracking-widest block mb-2">{story.category}</span>
                    <h3 className="font-serif font-bold text-2xl text-ink mb-3 group-hover:text-retro-orange transition-colors leading-tight">{story.title}</h3>
                    <p className="font-sans text-sm text-ink/60 leading-relaxed mb-4">{story.summary}</p>
                    <div className="flex items-center gap-2 text-[10px] font-tech text-ink/30 uppercase">
                      <Clock className="w-3 h-3" /> {story.date} • 3 min read
                    </div>
                  </div>
                </div>

                {/* Native Sponsored Integration (After 2nd story) */}
                {idx === 1 && (
                  <div className="bg-bone/40 border border-med-teal/5 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center shadow-sm relative group cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-tech font-bold text-ink/30 uppercase tracking-widest">Sponsored by MedScout</span>
                        <Info className="w-3 h-3 text-ink/20" />
                      </div>
                      <h4 className="font-serif font-bold text-2xl text-med-teal mb-4 leading-tight group-hover:text-retro-orange transition-colors">How Med Device Commercial Teams are Hitting Quota in 2024</h4>
                      <p className="font-sans text-sm text-ink/60 mb-6 leading-relaxed">
                        Know who to target and how to get their attention. MedScout gives you the data intelligence needed to thrive in a crowded market.
                      </p>
                      <button className="px-6 py-2 bg-med-teal text-white rounded font-tech text-xs font-bold hover:bg-retro-orange transition-all shadow-lg flex items-center gap-2">
                        Download Report <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="w-full md:w-48 h-32 bg-white rounded-xl border border-med-teal/10 flex items-center justify-center p-6 grayscale group-hover:grayscale-0 transition-all">
                      <div className="text-2xl font-black font-tech text-med-teal/20 italic">MEDSCOUT</div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Button variant="outline" size="lg" onClick={() => onNavigate && onNavigate('news')}>View All Stories</Button>
          </div>
        </div>

        {/* Sidebar Column: Bumpers */}
        <div className="lg:col-span-3 lg:pl-10 space-y-10">
          <MostPopularWidget />
          <CompanyAnnouncementsWidget />
          <PollWidget />
          <OnThisDayWidget />
          <NewsletterWidget />
        </div>
      </section>
    </div>
  );
};

export default NewsSection;
