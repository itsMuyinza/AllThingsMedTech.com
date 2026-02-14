import React, { useState, useEffect } from 'react';
import { Search, Clock, ArrowRight, TrendingUp, Mail, Filter, ChevronLeft, Share2, Bookmark, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import Button from '../components/UI/Button';
import NeuralBackground from '../components/NeuralBackground';
import { 
  MostPopularWidget, 
  CompanyAnnouncementsWidget, 
  PollWidget, 
  OnThisDayWidget, 
  NewsletterWidget,
  JoinEventWidget
} from '../components/SidebarWidgets';

interface NewsPageProps {
  onNavigate?: (page: string, params?: any) => void;
  initialArticleId?: number;
}

const NewsPage: React.FC<NewsPageProps> = ({ onNavigate, initialArticleId }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const categories = [
    'All', 'FDA', 'M&A', 'Recalls', 'Earnings', 'Cybersecurity', 'AI', 'Cardiac', 'Diabetes', 'Diagnostics', 'Marketing'
  ];

  const articles = [
    {
      id: 1,
      category: 'AI',
      title: 'Beyond the Algorithm: How AI is Giving Doctors More Time with Patients',
      summary: 'New adaptive diagnostic tools aren\'t just faster—they are restoring the human connection in the exam room by handling the data drudgery. The shift toward semi-autonomous workflows is allowing physicians to focus on the nuanced, emotional side of healthcare.',
      date: 'Oct 14',
      image: 'https://picsum.photos/seed/medtech_ai/1200/800',
      author: 'Sarah Jenkins',
      featured: true,
      content: `
        <p>In the bustling corridors of modern hospitals, a quiet revolution is taking place. For decades, the narrative surrounding Artificial Intelligence in healthcare was one of replacement—algorithms doing the work of human radiologists, diagnostic engines outpacing seasoned clinicians. However, the emerging reality is far more collaborative and, surprisingly, more human.</p>
        <p>Dr. Elena Rodriguez, a cardiologist at Mount Sinai, describes the change as "liberating." Previously, her days were consumed by the meticulous transcription of data from wearable cardiac monitors. "I was a data entry clerk who happened to have a medical degree," she says. Today, an AI-enabled adaptive platform handles the first pass of data triage, flagging only the abnormalities that truly require her clinical judgment.</p>
        <h3>The Restoration of Care</h3>
        <p>The primary benefit of these new diagnostic tools isn't just speed; it's the restoration of the patient-doctor relationship. When the "data drudgery" is offloaded to software as a medical device (SaMD), doctors find themselves with an extra 15 to 20 minutes per patient. That's time for eye contact, time for listening, and time for explaining complex treatments.</p>
        <p>Industry leaders are bracing for a future where the stethoscope is supplemented by a screen that predicts outcomes in real-time. But as Sarah Jenkins reports, the most successful implementations are those that keep the "human in the loop," ensuring that AI remains a tool for empathy, not just efficiency.</p>
      `
    },
    {
      id: 2,
      category: 'Cardiac',
      title: 'A Heartbeat Away: One Patient’s Journey with the Newest Pacemaker Tech',
      summary: 'Meet the first recipient of the leadless dual-chamber system and see how it changed his daily life.',
      date: 'Oct 12',
      image: 'https://picsum.photos/seed/medtech_heart/800/600',
      author: 'Mike Ross',
      featured: false
    },
    {
      id: 3,
      category: 'Diabetes',
      title: 'Freedom to Live: The Emotional Impact of Automated Insulin Delivery',
      summary: 'Parents of children with Type 1 diabetes share how closed-loop systems are finally allowing them to sleep through the night.',
      date: 'Oct 10',
      image: 'https://picsum.photos/seed/medtech_diabetes/800/600',
      author: 'Davina Claire',
      featured: false
    },
    {
      id: 4,
      category: 'Marketing',
      title: 'Storytelling in MedTech: Moving From Features to Feelings',
      summary: 'Why the most successful device launches of 2024 focused on patient outcomes and emotional resonance rather than technical specs.',
      date: 'Oct 09',
      image: 'https://picsum.photos/seed/medtech_market/800/600',
      author: 'CMO Insights',
      featured: false
    },
    {
      id: 5,
      category: 'FDA',
      title: 'FDA Exempts More Wearables: What This Means for Consumer Health Access',
      summary: 'Regulatory shifts are blurring the line between wellness trackers and medical devices, putting more power in patients\' hands.',
      date: 'Oct 08',
      image: 'https://picsum.photos/seed/medtech_fda/800/600',
      author: 'Dr. A. Smith',
      featured: false
    }
  ];

  useEffect(() => {
    if (initialArticleId) {
      const art = articles.find(a => a.id === initialArticleId);
      if (art) setSelectedArticle(art);
    }
  }, [initialArticleId]);

  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  const featuredArticle = articles[0]; // Always use the main one for hero
  const topStories = articles.slice(1, 5); 
  const feedArticles = filteredArticles;

  const handleArticleClick = (article: any) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // STORY DETAIL VIEW
  if (selectedArticle) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative min-h-screen animate-[fadeIn_0.5s_ease-out]">
        {/* Detail Header */}
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="flex items-center text-ink/50 hover:text-retro-orange transition-colors font-tech text-sm font-bold uppercase tracking-wider group"
          >
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to News
          </button>
          <div className="flex gap-4">
             <button className="p-2 rounded-full border border-ink/10 hover:bg-bone transition-colors text-ink/40 hover:text-med-teal"><Share2 className="w-4 h-4" /></button>
             <button className="p-2 rounded-full border border-ink/10 hover:bg-bone transition-colors text-ink/40 hover:text-med-teal"><Bookmark className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <span className="text-xs font-bold font-tech text-retro-orange uppercase tracking-[0.2em] block mb-4">
              {selectedArticle.category} • {selectedArticle.date}
            </span>
            <h1 className="font-serif font-black text-4xl md:text-6xl text-med-teal mb-8 leading-[1.1]">
              {selectedArticle.title}
            </h1>

            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-ink/5">
               <div className="w-12 h-12 rounded-full bg-bone border border-med-teal/10 flex items-center justify-center font-serif font-bold text-med-teal">
                  {selectedArticle.author[0]}
               </div>
               <div>
                  <p className="text-sm font-bold text-ink">{selectedArticle.author}</p>
                  <p className="text-xs text-ink/50 font-tech uppercase tracking-wider">Senior Industry Analyst</p>
               </div>
               <div className="ml-auto flex gap-3">
                  <button className="text-med-teal/40 hover:text-med-teal transition-colors"><Linkedin className="w-4 h-4" /></button>
                  <button className="text-med-teal/40 hover:text-med-teal transition-colors"><Twitter className="w-4 h-4" /></button>
               </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl mb-12 shadow-2xl h-[500px]">
               <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>

            <article className="prose prose-xl prose-medtech max-w-none font-sans text-ink/80 leading-relaxed">
               {/* Use dangerouslySetInnerHTML for mock content if provided, otherwise generic text */}
               {selectedArticle.content ? (
                 <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
               ) : (
                 <>
                   <p className="text-xl font-medium text-ink mb-8 leading-relaxed italic border-l-4 border-retro-orange pl-8">
                     {selectedArticle.summary}
                   </p>
                   <p>This is a detailed industry report covering the latest shifts in medical technology. Professionals across the globe are monitoring these developments as regulatory landscapes evolve and new capital continues to flow into the space.</p>
                   <p>Stay tuned for our exclusive interview with the leaders of this movement next Tuesday in the All Things MedTech podcast.</p>
                 </>
               )}
            </article>

            {/* Engagement */}
            <div className="mt-20 pt-10 border-t border-ink/10 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-ink/50 hover:text-retro-orange transition-colors font-tech text-xs font-bold">
                     <MessageSquare className="w-4 h-4" /> 12 COMMENTS
                  </button>
               </div>
               <div className="flex gap-4">
                  <span className="text-xs font-tech font-bold text-ink/30 uppercase mr-2">Share this story</span>
                  <button className="p-2 rounded-full bg-ink text-white hover:bg-retro-orange transition-colors"><Linkedin className="w-4 h-4" /></button>
                  <button className="p-2 rounded-full bg-ink text-white hover:bg-retro-orange transition-colors"><Twitter className="w-4 h-4" /></button>
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12">
             <NewsletterWidget />
             <MostPopularWidget />
             <JoinEventWidget onNavigate={onNavigate} />
          </div>
        </div>

        {/* Recommended Stories */}
        <div className="mt-32 pt-16 border-t border-ink/10">
           <h3 className="font-serif font-bold text-3xl text-med-teal mb-12">Recommended Stories</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.filter(a => a.id !== selectedArticle.id).slice(0, 3).map(a => (
                <div key={a.id} className="group cursor-pointer" onClick={() => handleArticleClick(a)}>
                   <div className="h-48 overflow-hidden rounded-xl mb-4 border border-ink/5 shadow-sm">
                      <img src={a.image} alt={a.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                   <h4 className="font-serif font-bold text-xl text-med-teal group-hover:text-retro-orange transition-colors leading-tight">
                      {a.title}
                   </h4>
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative min-h-screen">
      
      {/* Background Motion */}
      <div className="absolute top-0 left-0 w-full h-[80vh] overflow-hidden opacity-30 pointer-events-none -z-10">
         <NeuralBackground />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bone"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-16 opacity-0 animate-[fadeInUp_1s_ease-out_forwards]">
        <h1 className="font-serif font-black text-6xl text-med-teal mb-4 tracking-tight">The Pulse</h1>
        <p className="font-sans text-xl text-ink/60 max-w-2xl mx-auto font-light">
          Stories of innovation through the lens of patient care and human impact.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="mb-16 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-med-teal/10 pb-6">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full font-tech text-xs font-bold uppercase tracking-wide transition-all duration-300 border ${
                  activeCategory === cat 
                    ? 'bg-med-teal text-bone border-med-teal shadow-md transform scale-105' 
                    : 'bg-white/50 text-ink/60 border-ink/5 hover:border-retro-orange hover:text-retro-orange hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64 shrink-0">
            <input 
              type="text" 
              placeholder="Search news..." 
              className="w-full bg-white/50 border border-ink/10 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:border-retro-orange focus:bg-white transition-colors"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-ink/30" />
          </div>
        </div>
      </div>

      {/* HERO SECTION: Image + Sidebar Grid on top, Headline/Summary below */}
      <div className="mb-32 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
          
          {/* Top-Left: Large Image */}
          <div className="lg:col-span-8 group cursor-pointer" onClick={() => handleArticleClick(featuredArticle)}>
             <div className="relative overflow-hidden rounded-3xl shadow-2xl h-[540px]">
               <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
               <img 
                 src={featuredArticle.image} 
                 alt={featuredArticle.title} 
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale hover:grayscale-0"
               />
               <div className="absolute top-6 left-6 z-20">
                  <div className="bg-white/95 backdrop-blur-md px-4 py-1.5 text-xs font-bold font-tech text-med-teal rounded-full uppercase tracking-wider shadow-sm border border-med-teal/10">
                    {featuredArticle.category}
                  </div>
               </div>
             </div>
          </div>

          {/* Top-Right: Top Stories Sidebar */}
          <div className="lg:col-span-4 flex flex-col h-full bg-bone/30 rounded-3xl p-8 border border-med-teal/5">
             <div className="flex items-center gap-2 mb-8 border-b-2 border-retro-orange pb-4">
               <TrendingUp className="w-4 h-4 text-retro-orange" />
               <h3 className="font-tech font-bold text-xs uppercase tracking-widest text-ink">Top Stories</h3>
             </div>
             
             <div className="flex flex-col gap-8">
               {topStories.map((story, idx) => (
                 <div key={story.id} className="flex gap-4 group cursor-pointer items-start" onClick={() => handleArticleClick(story)}>
                    <span className="text-3xl font-serif font-black text-med-teal/5 group-hover:text-retro-orange/20 transition-colors -mt-1 w-6 text-right shrink-0">
                        {idx + 1}
                    </span>
                    <div className="flex-1 border-b border-ink/5 pb-4 group-last:border-0">
                       <span className="text-[10px] font-bold text-med-teal/50 font-tech uppercase block mb-1 tracking-wider">{story.category}</span>
                       <h4 className="font-serif font-bold text-base text-ink leading-tight group-hover:text-retro-orange transition-colors line-clamp-2">
                         {story.title}
                       </h4>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* HERO BOTTOM: Headline & Beginner Text spanning the whole width */}
        <div className="group cursor-pointer max-w-5xl" onClick={() => handleArticleClick(featuredArticle)}>
           <div className="flex items-center gap-3 text-xs text-ink/50 font-tech mb-4">
             <Clock className="w-3 h-3" /> {featuredArticle.date} • {featuredArticle.author}
           </div>
           <h2 className="font-serif font-black text-4xl md:text-6xl text-ink mb-6 group-hover:text-retro-orange transition-colors leading-[1.05] tracking-tight">
             {featuredArticle.title}
           </h2>
           <p className="font-sans text-xl md:text-2xl text-ink/70 leading-relaxed border-l-8 border-retro-orange pl-8 py-2">
             {featuredArticle.summary}
           </p>
           <button className="mt-8 text-retro-orange font-bold font-tech flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest text-xs">
              Read Full Report <ArrowRight className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* LOWER FEED SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-med-teal/10 pt-20">
        
        {/* Left Column: Feed */}
        <div className="lg:col-span-8">
           <h3 className="font-tech font-bold text-xs uppercase tracking-[0.3em] mb-12 flex items-center gap-4 text-ink/30">
              <span className="w-12 h-1 bg-med-teal/20 rounded-full"></span>
              The Latest Feed
           </h3>
           <div className="flex flex-col gap-16">
              {filteredArticles.map(article => (
                <div key={article.id} className="group cursor-pointer flex flex-col md:flex-row gap-8 items-start" onClick={() => handleArticleClick(article)}>
                  <div className="relative w-full md:w-72 h-48 shrink-0 overflow-hidden rounded-2xl bg-bone border border-ink/5 shadow-md">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold font-tech text-ink/30 uppercase mb-3">
                       <span className="text-retro-orange">{article.category}</span>
                       <span>•</span>
                       <span>{article.date}</span>
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-med-teal mb-4 group-hover:text-retro-orange transition-colors leading-tight">
                      {article.title}
                    </h3>
                    <p className="font-sans text-sm text-ink/60 mb-6 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                    <span className="text-[10px] font-black font-tech text-ink uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                      Open Story <ArrowRight className="w-3 h-3 text-retro-orange" />
                    </span>
                  </div>
                </div>
              ))}
           </div>
           <div className="mt-20 flex justify-center">
             <Button variant="outline" size="lg">Explore Archive</Button>
           </div>
        </div>

        {/* Right Column: Widgets Stack */}
        <div className="lg:col-span-4 lg:pl-10 space-y-12">
           <CompanyAnnouncementsWidget />
           <OnThisDayWidget />
           <JoinEventWidget onNavigate={onNavigate} />
           <PollWidget />
           <NewsletterWidget />
        </div>
      </div>

    </div>
  );
};

export default NewsPage;
