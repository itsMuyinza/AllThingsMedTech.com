
import React, { useState, useEffect, useMemo } from 'react';
// Added X and ChevronRight to the imports
import { 
    ChevronLeft, Play, FileText, Download, Share2, 
    Bookmark, MessageSquare, Linkedin, ExternalLink, 
    Lock, Clock, Layers, Star, Check, ChevronDown, 
    ChevronUp, Info, ListChecks, PlayCircle, FolderPlus,
    UserPlus, ShieldAlert, BarChart3, X, ChevronRight
} from 'lucide-react';
import Button from '../components/UI/Button';
import { knowledgeResources, Resource } from '../data/mockData';
import { AuthPromptModal } from '../components/ContactModals';

interface ResourceDetailPageProps {
    id: string;
    onNavigate: (page: string, params?: any) => void;
    isLoggedIn?: boolean;
}

const ResourceDetailPage: React.FC<ResourceDetailPageProps> = ({ id, onNavigate, isLoggedIn = false }) => {
    const resource = knowledgeResources.find(r => r.id === id);
    const [activeTab, setActiveTab] = useState<'Summary' | 'Transcript' | 'Downloads' | 'Discussion'>('Summary');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isKeyTakeawaysOpen, setIsKeyTakeawaysOpen] = useState(true);
    const [isSavedMenuOpen, setIsSavedMenuOpen] = useState(false);
    const [videoTime, setVideoTime] = useState(0);
    const [resumePoint, setResumePoint] = useState(isLoggedIn ? 124 : 0); // Mocked resume point in seconds
    const [showResumeToast, setShowResumeToast] = useState(isLoggedIn);

    // Mock Transcript Data
    const transcript = [
      { time: 0, text: "Welcome to today's deep dive into medical device innovation and safety standards." },
      { time: 15, text: "We're joined by leading experts to discuss the shift from legacy systems to semi-autonomous OR platforms." },
      { time: 45, text: "The primary challenge remains data integrity across distributed hospital networks." },
      { time: 120, text: "When we look at Section 4 of the new FDA guidance, the emphasis on SaMD validation is clearer than ever." },
      { time: 180, text: "Implementing these haptic feedback loops requires specific micro-robotic tolerances." }
    ];

    useEffect(() => {
      if (showResumeToast) {
        const timer = setTimeout(() => setShowResumeToast(false), 5000);
        return () => clearTimeout(timer);
      }
    }, [showResumeToast]);

    // Dynamic Related Intelligence (Sharing same topic)
    const relatedResources = useMemo(() => {
      if (!resource) return [];
      return knowledgeResources
        .filter(r => r.topic === resource.topic && r.id !== resource.id)
        .slice(0, 2);
    }, [resource]);

    if (!resource) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bone">
                <div className="text-center">
                    <h2 className="font-serif font-bold text-2xl mb-4">Intel Fragment Missing</h2>
                    <Button onClick={() => onNavigate('whitepapers')}>Return to Hub</Button>
                </div>
            </div>
        );
    }

    const handleDownload = (name: string) => {
        if (!isLoggedIn) {
            setShowAuthModal(true);
        } else {
            alert(`Initiating secure download: ${name}`);
        }
    };

    const seekTo = (time: number) => {
      setVideoTime(time);
      // In a real implementation: videoRef.current.currentTime = time;
    };

    const getContextualCTA = () => {
      switch(resource.topic) {
        case 'Regulatory':
          return { label: 'Book a Compliance Audit', icon: <ShieldAlert className="w-4 h-4" /> };
        case 'Marketing':
          return { label: 'Download Media Kit', icon: <BarChart3 className="w-4 h-4" /> };
        case 'AI':
          return { label: 'Request AI Strategy Session', icon: <PlayCircle className="w-4 h-4" /> };
        default:
          return { label: 'Contact Industry Expert', icon: <MessageSquare className="w-4 h-4" /> };
      }
    };

    const contextualCTA = getContextualCTA();

    return (
        <div className="min-h-screen bg-bone pt-24 pb-20 relative">
            <AuthPromptModal 
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onLoginClick={() => onNavigate('login')}
                title="Unlock Technical Insights"
                description="High-resolution technical assets and slide decks are restricted to verified MedTech Hub members."
            />

            {/* Resume Reading Toast */}
            {showResumeToast && (
              <div className="fixed bottom-8 left-8 z-[100] bg-ink/90 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-[slideInLeft_0.5s_ease-out]">
                <div className="w-10 h-10 bg-retro-orange rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-current" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold font-tech uppercase tracking-widest">Resume where you left off?</p>
                  <p className="text-white/50 text-[10px]">Last viewed 2 days ago • 02:04</p>
                </div>
                <button onClick={() => { seekTo(resumePoint); setShowResumeToast(false); }} className="px-4 py-2 bg-white rounded-lg text-ink text-[10px] font-bold uppercase hover:bg-retro-orange hover:text-white transition-colors">Resume</button>
                <button onClick={() => setShowResumeToast(false)} className="text-white/30 hover:text-white"><X className="w-4 h-4" /></button>
              </div>
            )}

            <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-center">
                <button 
                    onClick={() => onNavigate('whitepapers')}
                    className="flex items-center text-ink/40 hover:text-med-teal transition-colors font-tech text-xs font-bold uppercase tracking-widest group"
                >
                    <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Intelligence Hub
                </button>
                <div className="flex gap-4">
                  <span className="text-[10px] font-bold font-tech text-ink/30 uppercase flex items-center gap-1">
                    <Info className="w-3 h-3" /> Intel ID: {resource.id}
                  </span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* LEFT COLUMN: VIEWER & CONTEXT */}
                <div className="lg:col-span-8 space-y-10">
                    
                    {/* KEY TAKEAWAYS (Quick Scan) */}
                    <div className="bg-white/50 backdrop-blur-sm border border-med-teal/10 rounded-2xl overflow-hidden shadow-sm">
                      <button 
                        onClick={() => setIsKeyTakeawaysOpen(!isKeyTakeawaysOpen)}
                        className="w-full flex items-center justify-between p-4 px-6 hover:bg-white transition-colors"
                      >
                        <div className="flex items-center gap-2 text-med-teal">
                          <ListChecks className="w-5 h-5" />
                          <span className="font-tech font-bold text-xs uppercase tracking-widest">Executive Summary & Key Takeaways</span>
                        </div>
                        {isKeyTakeawaysOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isKeyTakeawaysOpen ? 'max-h-60' : 'max-h-0'}`}>
                        <div className="p-6 pt-2 px-8">
                          <ul className="space-y-3">
                            <li className="flex gap-3 text-sm text-ink/70">
                              <span className="w-1.5 h-1.5 bg-retro-orange rounded-full mt-1.5 shrink-0"></span>
                              The move to autonomous assistance in microsurgery is projected to increase precision by 40%.
                            </li>
                            <li className="flex gap-3 text-sm text-ink/70">
                              <span className="w-1.5 h-1.5 bg-retro-orange rounded-full mt-1.5 shrink-0"></span>
                              Legacy compliance frameworks are being superseded by unified international standards.
                            </li>
                            <li className="flex gap-3 text-sm text-ink/70">
                              <span className="w-1.5 h-1.5 bg-retro-orange rounded-full mt-1.5 shrink-0"></span>
                              Haptic feedback integration remains the single biggest cost-driver in next-gen robotic systems.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* MEDIA VIEWER TERMINAL */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-med-teal/20 to-retro-orange/20 rounded-[32px] blur opacity-40 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative aspect-video bg-ink rounded-[28px] overflow-hidden shadow-2xl border border-white/20">
                            
                            {/* GATED LOGIC */}
                            {!isLoggedIn ? (
                              <div className="w-full h-full relative overflow-hidden">
                                {/* Teaser Content with Blur */}
                                <div className="p-12 opacity-40 select-none">
                                  <h2 className="text-white font-serif font-bold text-4xl mb-8">{resource.title}</h2>
                                  <div className="space-y-6">
                                    <p className="text-white/60 text-lg leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <p className="text-white/60 text-lg leading-relaxed">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                  </div>
                                </div>
                                {/* Blur Overlay & Hook */}
                                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent flex items-center justify-center p-8 text-center">
                                  <div className="bg-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl max-w-lg animate-[fadeInUp_0.8s_ease-out]">
                                    <Lock className="w-12 h-12 text-retro-orange mx-auto mb-6" />
                                    <h3 className="text-white font-serif font-bold text-2xl mb-4">Join 7,000+ MedTech Professionals</h3>
                                    <p className="text-white/70 text-sm mb-8 leading-relaxed">
                                      Unlock the full intelligence Hub including high-res PDF viewers, technical datasets, and semantic transcripts.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                      <Button variant="secondary" onClick={() => onNavigate('join')}>Create Free Account</Button>
                                      <Button variant="outline" className="!text-white !border-white/30 hover:!bg-white/10" onClick={() => onNavigate('login')}>Sign In</Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* FULL READER FOR LOGGED IN USERS */
                              <div className="w-full h-full">
                                {resource.format === 'White Paper' ? (
                                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-12 bg-gradient-to-br from-med-teal to-med-teal-light animate-[fadeIn_0.5s_ease-out]">
                                      <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                                          <FileText className="w-12 h-12 text-white" />
                                      </div>
                                      <h2 className="text-white font-serif font-bold text-3xl mb-4 max-w-md">{resource.title}</h2>
                                      <p className="text-white/60 font-tech uppercase text-xs tracking-widest mb-8 italic">Rendering Interactive PDF Reader...</p>
                                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden max-w-xs mb-4">
                                        <div className="h-full bg-retro-orange w-full animate-[progress_3s_ease-in-out]"></div>
                                      </div>
                                      <Button variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">Expand To Fullscreen</Button>
                                  </div>
                                ) : (
                                  <div className="w-full h-full relative animate-[fadeIn_0.5s_ease-out]">
                                      <img src={resource.image} className="w-full h-full object-cover opacity-60" alt="Preview" />
                                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                                          <div className="w-20 h-20 bg-retro-orange rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(214,90,49,0.5)] mb-6 hover:scale-110 transition-transform cursor-pointer">
                                              <Play className="w-8 h-8 text-white ml-1 fill-current" />
                                          </div>
                                          <h2 className="text-white font-serif font-bold text-3xl mb-2">{resource.title}</h2>
                                          <p className="text-retro-orange font-tech uppercase text-xs tracking-widest font-bold">4K VIDEO STREAM • LIVE AT {videoTime}s</p>
                                      </div>
                                      {/* Chapters Mock */}
                                      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 flex gap-1">
                                          <div className="h-full bg-retro-orange" style={{ width: '25%' }}></div>
                                          <div className="h-full bg-white/20 w-[33%]"></div>
                                          <div className="h-full bg-white/20 w-[42%]"></div>
                                      </div>
                                  </div>
                                )}
                              </div>
                            )}
                        </div>
                    </div>

                    {/* ACTION BAR */}
                    <div className="flex items-center justify-between py-4 border-b border-ink/5">
                        <div className="flex gap-8 relative">
                            <button className="flex items-center gap-2 text-ink/50 hover:text-med-teal transition-colors font-tech text-xs font-bold uppercase">
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                            
                            {/* Save to Project Workflow */}
                            <div className="relative">
                              <button 
                                onClick={() => setIsSavedMenuOpen(!isSavedMenuOpen)}
                                className={`flex items-center gap-2 font-tech text-xs font-bold uppercase transition-colors ${isSavedMenuOpen ? 'text-retro-orange' : 'text-ink/50 hover:text-med-teal'}`}
                              >
                                  <Bookmark className={`w-4 h-4 ${isSavedMenuOpen ? 'fill-current' : ''}`} /> Save To Project
                              </button>
                              
                              {isSavedMenuOpen && (
                                <div className="absolute top-full left-0 mt-4 w-56 bg-white border border-med-teal/10 shadow-2xl rounded-xl p-3 z-50 animate-[slideDown_0.2s_ease-out]">
                                  <div className="space-y-1">
                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-bone transition-colors text-xs font-bold flex items-center gap-2">
                                      <ListChecks className="w-4 h-4 text-med-teal" /> My Reading List
                                    </button>
                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-bone transition-colors text-xs font-bold flex items-center gap-2">
                                      <FolderPlus className="w-4 h-4 text-med-teal" /> Q4 Research Folder
                                    </button>
                                    <div className="h-px bg-ink/5 my-2"></div>
                                    <button className="w-full text-left px-3 py-2 rounded-lg text-retro-orange hover:bg-retro-orange/5 transition-colors text-xs font-bold flex items-center gap-2">
                                      <UserPlus className="w-4 h-4" /> Share with Team
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                        </div>

                        {/* Granular Ratings */}
                        <div className="flex items-center gap-6">
                            <div className="hidden md:flex gap-4">
                              <div className="flex flex-col items-end">
                                <span className="text-[8px] font-bold text-ink/30 uppercase">Depth</span>
                                <div className="w-12 h-1 bg-ink/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-med-teal w-[90%]"></div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-[8px] font-bold text-ink/30 uppercase">Clarity</span>
                                <div className="w-12 h-1 bg-ink/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-med-teal w-[85%]"></div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 bg-mustard/10 px-3 py-1.5 rounded-full border border-mustard/20">
                                <Star className="w-3.5 h-3.5 text-mustard fill-current" />
                                <span className="text-xs font-black text-med-teal">4.9</span>
                            </div>
                        </div>
                    </div>

                    {/* AUTHOR PROFILE */}
                    <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-sm flex flex-col md:flex-row items-center gap-8 group">
                        <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-med-teal/10 shadow-lg group-hover:border-retro-orange transition-colors duration-500">
                            <img src={`https://picsum.photos/seed/${resource.author}/200/200`} className="w-full h-full object-cover" alt={resource.author} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <p className="text-retro-orange font-tech text-[10px] font-bold uppercase tracking-widest mb-1">Subject Matter Expert</p>
                            <h3 className="font-serif font-bold text-2xl text-med-teal mb-1">{resource.author}</h3>
                            <p className="font-sans text-ink/50 text-sm mb-4">Lead Strategist at <span className="font-bold">{resource.company}</span> with 15+ years in {resource.topic} compliance.</p>
                            <button className="inline-flex items-center gap-2 px-4 py-2 bg-med-teal/5 text-med-teal rounded-lg text-xs font-bold font-tech hover:bg-med-teal hover:text-white transition-all">
                                <Linkedin className="w-4 h-4" /> Connect on LinkedIn <ExternalLink className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {/* DISCUSSION PREVIEW */}
                    <div className="bg-bone border border-med-teal/10 rounded-3xl p-8">
                         <div className="flex items-center justify-between mb-8">
                            <h3 className="font-serif font-bold text-xl text-med-teal">Community Discussion</h3>
                            <span className="text-xs font-tech font-bold text-ink/30 uppercase">12 Comments</span>
                         </div>
                         <div className="flex gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-med-teal/10 border border-med-teal/20 flex items-center justify-center font-serif font-black text-med-teal text-sm">JD</div>
                            <div className="flex-1">
                                <input type="text" placeholder="Add your perspective..." className="w-full bg-white border border-med-teal/5 rounded-xl px-4 py-3 text-sm focus:border-retro-orange outline-none shadow-sm" />
                            </div>
                         </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: ACTIONABLE SIDEBAR (SINGLE STICKY UNIT) */}
                <div className="lg:col-span-4 relative">
                  <div className="sticky top-24 space-y-8">
                    
                    {/* TABS TERMINAL */}
                    <div className="bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-xl overflow-hidden">
                        <div className="flex border-b border-ink/5">
                            {(['Summary', 'Transcript', 'Downloads'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-4 text-[10px] font-bold font-tech uppercase tracking-widest transition-all ${
                                        activeTab === tab 
                                        ? 'bg-med-teal text-white' 
                                        : 'text-ink/40 hover:text-ink/70 hover:bg-bone'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="p-8 min-h-[360px]">
                            {activeTab === 'Summary' && (
                                <div className="animate-[fadeIn_0.3s_ease-out] space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-ink/30">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-xs font-bold font-tech uppercase tracking-wider">Published {resource.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-ink/30">
                                            <Layers className="w-4 h-4" />
                                            <span className="text-xs font-bold font-tech uppercase tracking-wider">{resource.topic} Strategy</span>
                                        </div>
                                    </div>
                                    <p className="font-sans text-sm text-ink/70 leading-relaxed italic border-l-2 border-retro-orange pl-4">
                                        {resource.excerpt}
                                    </p>
                                    <p className="font-sans text-sm text-ink/60 leading-relaxed">
                                        This technical briefing covers the critical inflection points facing the {resource.topic} sector in late 2024. Professionals should pay close attention to Section 3 regarding the implementation of the new unified standards.
                                    </p>
                                </div>
                            )}

                            {activeTab === 'Transcript' && (
                                <div className="animate-[fadeIn_0.3s_ease-out] space-y-4">
                                    {!isLoggedIn ? (
                                      <>
                                        <div className="flex items-center gap-2 p-2 bg-retro-orange/5 rounded-lg border border-retro-orange/10 mb-4">
                                            <Lock className="w-3.5 h-3.5 text-retro-orange" />
                                            <span className="text-[10px] font-bold text-retro-orange uppercase">Full Transcript Locked</span>
                                        </div>
                                        <div className="space-y-4 opacity-50 select-none">
                                            <p className="text-sm font-sans"><strong>00:05</strong> - Welcome everyone to today's deep dive into {resource.topic}.</p>
                                            <p className="text-sm font-sans"><strong>01:45</strong> - We are starting with the foundational frameworks...</p>
                                        </div>
                                        <Button size="sm" className="w-full mt-4" onClick={() => onNavigate('join')}>Unlock Full Transcript</Button>
                                      </>
                                    ) : (
                                      <div className="space-y-3">
                                        <p className="text-[10px] font-bold text-med-teal uppercase mb-4 flex items-center gap-2">
                                          <PlayCircle className="w-4 h-4" /> Click a timestamp to seek
                                        </p>
                                        {transcript.map((line, i) => (
                                          <button 
                                            key={i}
                                            onClick={() => seekTo(line.time)}
                                            className={`text-left p-3 rounded-xl transition-all w-full group ${videoTime >= line.time && videoTime < (transcript[i+1]?.time || 999) ? 'bg-retro-orange/10 border-l-4 border-retro-orange' : 'hover:bg-bone'}`}
                                          >
                                            <span className="text-[10px] font-bold font-mono text-ink/30 block mb-1 group-hover:text-retro-orange">00:{line.time < 10 ? `0${line.time}` : line.time}</span>
                                            <p className="text-xs text-ink/70 leading-relaxed">{line.text}</p>
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'Downloads' && (
                                <div className="animate-[fadeIn_0.3s_ease-out] space-y-4">
                                    {[
                                        { name: 'Technical Brief PDF', size: '2.4 MB', type: 'doc' },
                                        { name: 'Slide Deck (PowerPoint)', size: '15.8 MB', type: 'slide' },
                                        { name: 'Framework Checklist', size: '400 KB', type: 'check' },
                                    ].map((file, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => handleDownload(file.name)}
                                            className="w-full flex items-center justify-between p-4 bg-bone/50 rounded-xl border border-med-teal/5 hover:border-retro-orange transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Download className="w-4 h-4 text-med-teal group-hover:text-retro-orange" />
                                                <div className="text-left">
                                                    <p className="text-xs font-bold text-med-teal group-hover:text-retro-orange transition-colors">{file.name}</p>
                                                    <p className="text-[9px] text-ink/30 uppercase font-tech">{file.size}</p>
                                                </div>
                                            </div>
                                            {!isLoggedIn && <Lock className="w-3.5 h-3.5 text-ink/20" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* CONTEXTUAL CTA (Topic Based) */}
                        <div className="p-6 bg-retro-orange text-white border-t border-white/10 group cursor-pointer hover:bg-ink transition-colors duration-500">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                                {contextualCTA.icon}
                              </div>
                              <span className="font-tech font-bold text-xs uppercase tracking-[0.2em]">{contextualCTA.label}</span>
                            </div>
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                    </div>

                    {/* DYNAMIC RELATED INTELLIGENCE (Topic Matched) */}
                    <div className="space-y-4">
                         <h4 className="font-tech font-bold text-[10px] uppercase text-ink/30 tracking-[0.2em] px-2 flex items-center gap-2">
                           <Layers className="w-3 h-3" /> Related {resource.topic} Intel
                         </h4>
                         {relatedResources.map(r => (
                             <div 
                                key={r.id} 
                                onClick={() => onNavigate('resource-detail', { id: r.id })}
                                className="group flex gap-4 p-4 bg-white/50 rounded-2xl border border-white/60 hover:bg-white hover:shadow-lg transition-all cursor-pointer"
                            >
                                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-bone border border-ink/5">
                                    <img src={r.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Related" />
                                </div>
                                <div className="min-w-0 flex flex-col justify-center">
                                    <h5 className="font-serif font-bold text-sm text-ink group-hover:text-retro-orange transition-colors truncate leading-tight mb-1">{r.title}</h5>
                                    <p className="text-[10px] text-ink/40 uppercase font-tech font-bold flex items-center gap-1">
                                      {r.format === 'White Paper' ? <FileText className="w-2.5 h-2.5" /> : <PlayCircle className="w-2.5 h-2.5" />}
                                      {r.format}
                                    </p>
                                </div>
                             </div>
                         ))}
                    </div>

                    {/* Member Perk Card */}
                    <div className="bg-gradient-to-br from-med-teal to-ink p-6 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-retro-orange rounded-full blur-[60px] opacity-20 transition-transform duration-1000 group-hover:scale-150"></div>
                      <h4 className="font-serif font-bold text-xl mb-2 relative z-10">Quarterly Market Report</h4>
                      <p className="text-white/60 text-xs mb-6 relative z-10">Members get exclusive access to our 2024 {resource.topic} Trend Dashboard.</p>
                      <Button variant="outline" className="w-full !border-white/30 !text-white hover:!bg-white/10" size="sm" onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'join')}>
                        {isLoggedIn ? 'Access Member Hub' : 'Join Member Network'}
                      </Button>
                    </div>

                  </div>
                </div>

            </div>
        </div>
    );
};

export default ResourceDetailPage;
