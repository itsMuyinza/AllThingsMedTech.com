import React, { useState } from 'react';
import { Play, Mic, Calendar, Clock, Headphones, ChevronDown, ChevronUp, FileText, List, Link as LinkIcon, User, Loader2 } from 'lucide-react';
import Button from '../components/UI/Button';
import AudioWaveformBackground from '../components/AudioWaveformBackground';
import PersistentPlayer from '../components/PersistentPlayer';

const PodcastsPage: React.FC = () => {
  const [activeEpisode, setActiveEpisode] = useState<{id: number, title: string, guest: string, image: string} | null>(null);
  const [expandedNotes, setExpandedNotes] = useState<number | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const initialEpisodes = [
    {
      id: 42,
      title: "The Future of Surgical Robotics",
      guest: "Dr. Elena Rostova",
      role: "Chief Surgeon, NeoMed",
      date: "Oct 15, 2023",
      duration: "45 min",
      image: "https://picsum.photos/seed/podcast/200/200",
      description: "Discussing the shift towards autonomous assistance in microsurgery and what it means for the next decade of OR innovation.",
      showNotes: {
        takeaways: [
          "The integration of haptic feedback in micro-robotic instruments.",
          "Autonomous vs. semi-autonomous surgical workflows.",
          "How smaller hospitals can afford robotic platforms through subscription models."
        ],
        resources: [
          { name: "NeoMed 2024 Whitepaper", link: "#" },
          { name: "OR Safety Standards Report", link: "#" }
        ],
        bio: "Dr. Elena Rostova is a pioneer in microsurgical robotics with over 200 successful robotic-assisted cardiac procedures."
      }
    },
    {
      id: 41,
      title: "Navigating FDA SaMD Guidelines",
      guest: "Marcus Thorne",
      role: "Regulatory Affairs Director",
      date: "Oct 08, 2023",
      duration: "38 min",
      image: "https://picsum.photos/seed/podcast2/200/200",
      description: "A deep dive into the new AI/ML frameworks released by the FDA and how startups can prepare.",
      showNotes: {
        takeaways: [
          "Understanding the 'Pre-market Assurance' shift.",
          "Managing algorithmic drift in post-market surveillance.",
          "The role of real-world evidence in clinical validation."
        ],
        resources: [
          { name: "FDA 2023 AI/ML Guide", link: "#" },
          { name: "Software as a Medical Device (SaMD) Framework", link: "#" }
        ],
        bio: "Marcus Thorne has spent 15 years navigating the FDA for some of the world's largest medical software companies."
      }
    },
    {
      id: 40,
      title: "Sustainable Packaging in MedTech",
      guest: "Sarah Jenkins",
      role: "Head of Sustainability, PackCorp",
      date: "Oct 01, 2023",
      duration: "32 min",
      image: "https://picsum.photos/seed/podcast3/200/200",
      description: "Reducing sterile barrier waste without compromising safety. New materials and recycling streams.",
      showNotes: {
        takeaways: [
          "Biodegradable polymers for non-sterile packaging.",
          "Reducing carbon footprint in global medical distribution.",
          "Regulatory hurdles for recycled materials in class III devices."
        ],
        resources: [
          { name: "PackCorp Green Initiative", link: "#" },
          { name: "EU Packaging Waste Directive", link: "#" }
        ],
        bio: "Sarah Jenkins leads sustainability efforts for PackCorp, focusing on circular economy models for medtech manufacturers."
      }
    }
  ];

  const [episodes, setEpisodes] = useState(initialEpisodes);

  const handlePlay = (ep: any) => {
    setActiveEpisode(ep);
  };

  const toggleShowNotes = (id: number) => {
    setExpandedNotes(expandedNotes === id ? null : id);
  };

  const handleLoadMore = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const olderEpisodes = [
      {
        id: 39,
        title: "AI in Clinical Trial Recruitment",
        guest: "Dr. Robert Chen",
        role: "Director of Clinical Strategy, TrialPoint",
        date: "Sep 24, 2023",
        duration: "40 min",
        image: "https://picsum.photos/seed/podcast4/200/200",
        description: "How machine learning is reducing trial timelines by 30% through intelligent patient identification and synthetic control arms.",
        showNotes: {
          takeaways: [
            "Leveraging EMR data for screening.",
            "Synthetic data sets in early phase studies.",
            "Addressing bias in AI-driven recruitment."
          ],
          resources: [
            { name: "Clinical AI Report 2023", link: "#" }
          ],
          bio: "Dr. Robert Chen has overseen the transition of over 50 large-scale clinical trials into AI-assisted workflows."
        }
      },
      {
        id: 38,
        title: "The Biocompatibility Checklist",
        guest: "Lila Vance",
        role: "Chief Toxicologist, BioLabs",
        date: "Sep 17, 2023",
        duration: "28 min",
        image: "https://picsum.photos/seed/podcast5/200/200",
        description: "Everything you need to know about ISO 10993 updates and why your material strategy needs to start on day one of R&D.",
        showNotes: {
          takeaways: [
            "Extractable and Leachable (E&L) testing nuances.",
            "Chemical characterization vs animal testing.",
            "Material selection for multi-use components."
          ],
          resources: [
            { name: "ISO 10993-1 Summary", link: "#" }
          ],
          bio: "Lila Vance is an industry-renowned expert in biological evaluation of medical devices with two decades of experience."
        }
      }
    ];

    setEpisodes(prev => [...prev, ...olderEpisodes]);
    setIsLoadingMore(false);
  };

  return (
    <div className={`bg-bone min-h-screen ${activeEpisode ? 'pb-20' : ''}`}>
      {/* Persistent Player */}
      <PersistentPlayer episode={activeEpisode} onClose={() => setActiveEpisode(null)} />
      
      {/* Hero Section */}
      <div className="bg-med-teal pt-40 pb-20 px-6 relative overflow-hidden text-bone min-h-[50vh] flex flex-col justify-center">
        <AudioWaveformBackground />
        
        <div className="max-w-7xl mx-auto relative z-10 w-full pointer-events-none">
          <div className="pointer-events-auto">
             <div className="inline-flex items-center gap-2 text-retro-orange uppercase tracking-widest text-sm font-bold font-tech mb-4 border border-retro-orange/30 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
                <Headphones className="w-4 h-4" /> The All Things MedTech Podcast
             </div>
             <h1 className="font-serif font-black text-6xl md:text-8xl mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
                Listen to the <br/><span className="text-retro-orange">Future.</span>
             </h1>
             <p className="font-sans text-xl text-bone/80 max-w-2xl leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
                Daily coverage of the most critical news, trends, and breakthroughs shaping the MedTech industry today.
             </p>
          </div>
        </div>
      </div>

      {/* Episode List */}
      <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
        <div className="space-y-12">
          {episodes.map((ep, index) => (
            <div 
              key={ep.id} 
              className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
                <div className="bg-white rounded-2xl shadow-sm border border-med-teal/5 flex flex-col hover:shadow-[0_10px_40px_-10px_rgba(43,76,89,0.15)] transition-all duration-300 group overflow-hidden">
                  
                  {/* Card Main Info */}
                  <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-med-teal/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    {/* Thumbnail */}
                    <div className="relative shrink-0 w-full md:w-48 h-48 rounded-xl overflow-hidden shadow-inner bg-bone border border-ink/5">
                      <img 
                        src={ep.image} 
                        alt="cover" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-med-teal/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
                          <button 
                              onClick={() => handlePlay(ep)}
                              className="w-14 h-14 bg-retro-orange rounded-full text-white flex items-center justify-center shadow-[0_0_20px_rgba(214,90,49,0.5)] transform scale-90 group-hover:scale-100 transition-transform hover:bg-white hover:text-retro-orange"
                          >
                              <Play className="w-6 h-6 ml-1 fill-current" />
                          </button>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col justify-center relative z-10">
                      <div className="flex items-center gap-4 text-xs font-tech text-ink/40 mb-3">
                        <span className="flex items-center gap-1 font-bold uppercase tracking-widest"><Calendar className="w-3 h-3"/> {ep.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {ep.duration}</span>
                        <span className="text-retro-orange font-bold uppercase border border-retro-orange/20 px-2 py-0.5 rounded text-[10px]">Episode {ep.id}</span>
                      </div>
                      
                      <h3 
                        className="font-serif font-bold text-3xl text-med-teal mb-3 group-hover:text-retro-orange transition-colors cursor-pointer leading-tight" 
                        onClick={() => handlePlay(ep)}
                      >
                          {ep.title}
                      </h3>
                      
                      <p className="font-sans text-sm text-ink/50 mb-4 flex items-center gap-2">
                          <span className="font-bold text-ink/70">{ep.guest}</span> — {ep.role}
                      </p>
                      
                      <p className="font-sans text-ink/70 mb-8 leading-relaxed line-clamp-2">
                          {ep.description}
                      </p>

                      <div className="flex items-center gap-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handlePlay(ep)}
                            className="bg-bone shadow-sm"
                          >
                            Play Episode
                          </Button>
                          <button 
                            onClick={() => toggleShowNotes(ep.id)}
                            className="text-sm font-tech font-bold text-ink/50 hover:text-retro-orange transition-all flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-bone"
                          >
                            {expandedNotes === ep.id ? (
                              <><ChevronUp className="w-4 h-4" /> Close Notes</>
                            ) : (
                              <><ChevronDown className="w-4 h-4" /> Show Notes</>
                            )}
                          </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Show Notes Section */}
                  <div 
                    className={`bg-bone/40 border-t border-med-teal/5 transition-all duration-500 ease-in-out overflow-hidden ${
                      expandedNotes === ep.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                      {/* Takeaways */}
                      <div>
                        <div className="flex items-center gap-2 mb-4 text-med-teal">
                          <List className="w-4 h-4" />
                          <h4 className="font-tech font-bold text-xs uppercase tracking-widest">Key Takeaways</h4>
                        </div>
                        <ul className="space-y-3">
                          {ep.showNotes.takeaways.map((item, i) => (
                            <li key={i} className="font-sans text-sm text-ink/70 flex gap-3">
                              <span className="w-1.5 h-1.5 bg-retro-orange rounded-full mt-1.5 shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Resources & Story */}
                      <div className="space-y-8">
                        <div>
                          <div className="flex items-center gap-2 mb-4 text-med-teal">
                            <LinkIcon className="w-4 h-4" />
                            <h4 className="font-tech font-bold text-xs uppercase tracking-widest">Resources</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {ep.showNotes.resources.map((res, i) => (
                              <a 
                                key={i} 
                                href={res.link} 
                                className="px-3 py-1.5 bg-white border border-med-teal/10 rounded-lg text-xs font-bold text-med-teal hover:border-retro-orange hover:text-retro-orange transition-colors flex items-center gap-2"
                              >
                                {res.name}
                              </a>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-4 text-med-teal">
                            <FileText className="w-4 h-4" />
                            <h4 className="font-tech font-bold text-xs uppercase tracking-widest">Main Story</h4>
                          </div>
                          <p className="font-sans text-sm text-ink/60 leading-relaxed italic">
                            "{ep.showNotes.bio}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
           <Button 
              variant="ghost" 
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="min-w-[200px]"
           >
              {isLoadingMore ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Searching Archive...</>
              ) : (
                'Load Older Episodes'
              )}
           </Button>
        </div>
      </div>
    </div>
  );
};

export default PodcastsPage;