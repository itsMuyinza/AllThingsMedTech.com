import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Video, Users, ChevronRight, Play, Download, Loader2, Plus } from 'lucide-react';
import Button from '../components/UI/Button';
import NeuralBackground from '../components/NeuralBackground';
import { AuthPromptModal } from '../components/ContactModals';
import { knowledgeResources, Resource } from '../data/mockData';

interface WhitePapersPageProps {
    isLoggedIn?: boolean;
    onNavigate: (page: string, params?: any) => void;
}

const TOPICS = ['All', 'Regulatory', 'Digital Health', 'Robotics', 'Startups', 'Marketing', 'AI'];
const FORMATS = ['All Formats', 'White Paper', 'Webinar', 'Workshop'];
const INITIAL_ITEMS = 9;

const WhitePapersPage: React.FC<WhitePapersPageProps> = ({ isLoggedIn = false, onNavigate }) => {
    const [activeTopic, setActiveTopic] = useState('All');
    const [activeFormat, setActiveFormat] = useState('All Formats');
    const [searchQuery, setSearchQuery] = useState('');
    const [showAuthModal, setShowAuthModal] = useState(false);
    
    // Pagination State
    const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const filteredResources = useMemo(() => {
        return knowledgeResources.filter(res => {
            const matchesTopic = activeTopic === 'All' || res.topic === activeTopic;
            const matchesFormat = activeFormat === 'All Formats' || res.format === activeFormat;
            const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                res.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTopic && matchesFormat && matchesSearch;
        });
    }, [activeTopic, activeFormat, searchQuery]);

    const displayedResources = useMemo(() => {
        return filteredResources.slice(0, visibleCount);
    }, [filteredResources, visibleCount]);

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        // 800ms simulated delay as requested
        setTimeout(() => {
            setVisibleCount(prev => prev + 6);
            setIsLoadingMore(false);
        }, 800);
    };

    const handleResourceClick = (res: Resource) => {
        onNavigate('resource-detail', { id: res.id });
    };

    return (
        <div className="bg-bone min-h-screen pt-24 pb-20 overflow-x-hidden">
            <AuthPromptModal 
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onLoginClick={() => onNavigate('login')}
                title="Unlock Technical Insights"
                description="Technical white papers and regulatory case studies are available exclusively to our verified member community. Join for free to access our full knowledge base."
            />

            {/* HERO SECTION */}
            <div className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <NeuralBackground />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bone/50 to-bone"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl opacity-0 animate-[fadeInUp_1s_ease-out_forwards]">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-med-teal/20 bg-white/30 backdrop-blur-md mb-8 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-retro-orange animate-pulse"></span>
                        <span className="text-xs font-tech tracking-[0.2em] uppercase text-med-teal font-bold">The Intelligence Hub</span>
                    </div>
                    <h1 className="font-serif font-black text-6xl md:text-8xl text-med-teal mb-6 leading-tight">
                        Knowledge Base
                    </h1>
                    <p className="font-sans text-xl md:text-2xl text-ink/60 mb-10 leading-relaxed font-light">
                        Technical Insights, White Papers, Syndicated Webinars & Workshops from industry experts.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button size="lg" className="shadow-xl group relative overflow-hidden">
                            <span className="relative z-10">Subscribe for Updates</span>
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-[2s] ease-in-out"></div>
                        </Button>
                    </div>
                </div>
            </div>

            {/* FLOATING FILTER BAR */}
            <div className="sticky top-20 z-40 px-6 py-4 transition-all duration-300">
                <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {TOPICS.map(topic => (
                            <button
                                key={topic}
                                onClick={() => { setActiveTopic(topic); setVisibleCount(INITIAL_ITEMS); }}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold font-tech uppercase tracking-widest transition-all ${
                                    activeTopic === topic 
                                    ? 'bg-med-teal text-white shadow-lg' 
                                    : 'bg-bone text-ink/50 hover:bg-med-teal/10 hover:text-med-teal'
                                }`}
                            >
                                {topic}
                            </button>
                        ))}
                    </div>
                    
                    <div className="h-8 w-px bg-ink/10 hidden md:block"></div>

                    <div className="flex items-center gap-2">
                        <div className="flex bg-bone rounded-lg p-1 border border-ink/5">
                            {FORMATS.map(f => (
                                <button
                                    key={f}
                                    onClick={() => { setActiveFormat(f); setVisibleCount(INITIAL_ITEMS); }}
                                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold font-tech uppercase tracking-widest transition-all ${
                                        activeFormat === f 
                                        ? 'bg-white text-retro-orange shadow-sm' 
                                        : 'text-ink/40 hover:text-ink/70'
                                    }`}
                                >
                                    {f === 'All Formats' ? 'All' : f}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(INITIAL_ITEMS); }}
                                placeholder="Search Intel..."
                                className="bg-bone/50 border border-ink/10 rounded-lg px-8 py-2 text-sm outline-none focus:border-retro-orange focus:bg-white transition-all w-48"
                            />
                            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-ink/20" />
                        </div>
                    </div>
                </div>
            </div>

            {/* MASONRY GRID FEED */}
            <div className="max-w-7xl mx-auto px-6 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedResources.map((res) => (
                        <div 
                            key={res.id}
                            onClick={() => handleResourceClick(res)}
                            className="group relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col"
                        >
                            {/* Cinematic Image Container */}
                            <div className="aspect-video relative overflow-hidden">
                                <img 
                                    src={res.image} 
                                    alt={res.title} 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                                
                                {/* Status Badges */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="px-2 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[9px] font-bold font-tech uppercase tracking-widest rounded">
                                        {res.topic}
                                    </span>
                                    {res.format !== 'White Paper' && (
                                        <span className="px-2 py-1 bg-retro-orange/80 backdrop-blur-md text-white text-[9px] font-bold font-tech uppercase tracking-widest rounded flex items-center gap-1">
                                            <Video className="w-3 h-3" /> {res.duration}
                                        </span>
                                    )}
                                </div>

                                {/* Hover Play Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-16 h-16 bg-retro-orange rounded-full flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-500">
                                        {res.format === 'White Paper' ? <BookOpen className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1 fill-current" />}
                                    </div>
                                </div>

                                {/* Quick View Bottom Bar */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                        Open Resource Terminal <ChevronRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-6 flex-1 flex flex-col">
                                <span className="text-[10px] font-bold font-tech text-retro-orange uppercase tracking-widest mb-2">
                                    {res.format}
                                </span>
                                <h3 className="font-serif font-bold text-2xl text-ink mb-3 group-hover:text-med-teal transition-colors leading-tight">
                                    {res.title}
                                </h3>
                                <div className="flex items-center gap-2 mb-4 text-xs font-tech text-ink/40 uppercase">
                                    <Users className="w-3.5 h-3.5" /> {res.company}
                                </div>
                                <p className="font-sans text-sm text-ink/60 line-clamp-2 leading-relaxed mb-6">
                                    {res.excerpt}
                                </p>
                                
                                <div className="mt-auto pt-4 border-t border-ink/5 flex items-center justify-between">
                                    <span className="text-[10px] text-ink/30 font-tech font-bold uppercase">{res.date}</span>
                                    <button 
                                        className="text-retro-orange hover:text-med-teal transition-colors"
                                        onClick={(e) => { e.stopPropagation(); if(!isLoggedIn) setShowAuthModal(true); }}
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* LOAD MORE BUTTON CENTERED BETWEEN GRID AND NEWSLETTER */}
                {filteredResources.length > visibleCount && (
                    <div className="flex justify-center mt-12 mb-20 animate-[fadeInUp_0.6s_ease-out_1s_forwards] opacity-0">
                        <button 
                            onClick={handleLoadMore}
                            disabled={isLoadingMore}
                            className="px-8 py-3 border border-gray-300 rounded-full text-sm font-semibold tracking-wide text-ink/60 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-3 disabled:opacity-50"
                        >
                            {isLoadingMore ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Loading...</span>
                                </>
                            ) : (
                                <>
                                    <span>Load More Resources</span>
                                </>
                            )}
                        </button>
                    </div>
                )}

                {filteredResources.length === 0 && (
                    <div className="py-32 text-center">
                        <div className="w-20 h-20 bg-bone rounded-full flex items-center justify-center mx-auto mb-6 text-ink/10">
                            <Search className="w-10 h-10" />
                        </div>
                        <h2 className="font-serif font-bold text-2xl text-med-teal mb-2">No matching intelligence found</h2>
                        <p className="text-ink/40 font-sans">Try adjusting your filters or search terms.</p>
                        <Button variant="outline" className="mt-8" onClick={() => { setActiveTopic('All'); setActiveFormat('All Formats'); setSearchQuery(''); }}>
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WhitePapersPage;