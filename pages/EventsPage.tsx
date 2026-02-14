import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Search, X, 
  ChevronRight, Users, Clock, Share2, Star, CheckCircle, 
  Loader2
} from 'lucide-react';
import Button from '../components/UI/Button';
import NeuralBackground from '../components/NeuralBackground';
import { allEvents, Event } from '../data/mockData';

const FILTERS = ['All', 'Conference', 'Webinar', 'Expo', 'Networking'];

const EventsPage: React.FC<{ onNavigate: (page: string, params?: any) => void, initialFilter?: string }> = ({ onNavigate, initialFilter = 'All' }) => {
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination State
  const [visibleEvents, setVisibleEvents] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); 
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  const filteredEvents = allEvents.filter(event => {
    const matchesFilter = activeFilter === 'All' || event.type === activeFilter;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const displayedEvents = filteredEvents.slice(0, visibleEvents);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // 800ms simulated delay
    setTimeout(() => {
      setVisibleEvents(prev => prev + 3);
      setIsLoadingMore(false);
    }, 800);
  };

  return (
    <div 
      className="min-h-screen bg-bone pt-24 pb-20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div 
        className="fixed inset-0 pointer-events-none -z-10 transition-transform duration-100 ease-out"
        style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }}
      >
         <NeuralBackground />
         <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-med-teal/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-retro-orange/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="text-center mb-12">
            <h1 className="font-serif font-black text-6xl md:text-7xl text-med-teal mb-6 animate-[fadeInUp_0.8s_ease-out]">
                Events Calendar
            </h1>
            <p className="font-sans text-xl text-ink/60 max-w-2xl mx-auto animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] opacity-0">
                Connect with the community. Discover conferences, webinars, and networking opportunities.
            </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16 relative group animate-[fadeInUp_0.8s_ease-out_0.4s_forwards] opacity-0 z-20">
            <div className={`absolute -inset-1 bg-gradient-to-r from-med-teal/20 to-retro-orange/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <div className="relative flex items-center bg-white/60 backdrop-blur-xl border border-white/50 rounded-full shadow-xl transition-all duration-300 focus-within:bg-white/90 focus-within:ring-2 focus-within:ring-med-teal/20">
                <Search className="w-5 h-5 text-med-teal/50 ml-6" />
                <input 
                    type="text"
                    placeholder="Search events, topics, or locations..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setVisibleEvents(6); }}
                    className="w-full py-4 px-4 bg-transparent outline-none font-sans text-ink placeholder-ink/40"
                />
            </div>
        </div>

        <div className="flex justify-center gap-3 flex-wrap mb-12 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] opacity-0">
            {FILTERS.map(filter => (
                <button
                    key={filter}
                    onClick={() => { setActiveFilter(filter); setVisibleEvents(6); }}
                    className={`px-6 py-2.5 rounded-full font-tech font-bold text-sm tracking-wide transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] border ${
                        activeFilter === filter
                        ? 'bg-med-teal text-white border-med-teal shadow-[0_0_20px_rgba(43,76,89,0.3)] transform scale-105'
                        : 'bg-white/40 text-ink/60 border-white/40 hover:bg-med-teal/10 hover:border-med-teal/30 hover:text-med-teal'
                    }`}
                >
                    {filter}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards] opacity-0 min-h-[400px]">
            {displayedEvents.map((event) => (
                <div 
                    key={event.id}
                    className="group relative bg-white/60 backdrop-blur-md border border-white/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(43,76,89,0.2)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] flex flex-col"
                >
                    <div 
                        className="h-56 relative overflow-hidden cursor-pointer"
                        onClick={() => setSelectedEvent(event)}
                    >
                        <img 
                            src={event.image} 
                            alt={event.name} 
                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-110 grayscale group-hover:grayscale-0" 
                        />
                        <div className="absolute top-4 right-4">
                             <span className={`px-4 py-1.5 rounded-full text-xs font-bold font-tech uppercase tracking-wider shadow-lg backdrop-blur-md border border-white/20 text-white ${
                                 event.type === 'Conference' ? 'bg-med-teal/90' :
                                 event.type === 'Webinar' ? 'bg-retro-orange/90' : 'bg-ink/80'
                             }`}>
                                 {event.type}
                             </span>
                        </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col relative">
                        <div className="flex items-center gap-6 mb-6">
                            <div className="flex items-center gap-2 text-med-teal font-bold font-tech text-sm">
                                <Calendar className="w-4 h-4" />
                                <span>{event.date}</span>
                            </div>

                            <div className="flex items-center gap-2 text-ink/50 font-medium text-sm">
                                <MapPin className="w-4 h-4" />
                                <span className="group-hover:underline underline-offset-4">{event.location}</span>
                            </div>
                        </div>

                        <h3 
                            className="font-serif font-bold text-2xl text-ink mb-3 group-hover:text-med-teal transition-colors cursor-pointer"
                            onClick={() => setSelectedEvent(event)}
                        >
                            {event.name}
                        </h3>
                        <p className="font-sans text-sm text-ink/60 mb-8 line-clamp-2 leading-relaxed">
                            {event.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between border-t border-med-teal/5 pt-6">
                            <div className="flex items-center group/stack">
                                <div className="flex -space-x-3 transition-all duration-300 group-hover/stack:-space-x-1">
                                    {[...Array(4)].map((_, i) => (
                                        <div 
                                          key={i} 
                                          className="w-9 h-9 rounded-full ring-2 ring-white bg-bone overflow-hidden flex items-center justify-center shadow-sm relative transition-transform duration-300"
                                          title="Medtronic, J&J, and more"
                                        >
                                            <img src={`https://picsum.photos/seed/user${i + (event.id * 10)}/100/100`} alt="attendee" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    <div className="w-9 h-9 rounded-full ring-2 ring-white bg-gray-800 text-white flex items-center justify-center text-[10px] font-bold shadow-sm transition-transform duration-300">
                                        +{event.attendees > 100 ? 100 : event.attendees}
                                    </div>
                                </div>
                                <span className="ml-4 text-[10px] font-bold font-tech text-ink/30 uppercase opacity-0 group-hover/stack:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    Join Leaders from J&J, Medtronic...
                                </span>
                            </div>
                            
                            <Button 
                                onClick={() => onNavigate('event-register', { id: event.id })}
                                variant="outline" 
                                size="sm" 
                                className="!bg-white !text-ink !border-ink/20 hover:!bg-[#FF5500] hover:!text-white hover:!border-[#FF5500] transition-colors duration-300 ease-in-out shadow-sm"
                            >
                                Register Now
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        {/* LOAD MORE BUTTON CENTERED BETWEEN GRID AND NEWSLETTER */}
        {filteredEvents.length > visibleEvents && (
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
                            <span>Load More Events</span>
                        </>
                    )}
                </button>
            </div>
        )}

        <div className="relative bg-ink rounded-3xl p-8 md:p-16 overflow-hidden shadow-2xl group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-med-teal rounded-full mix-blend-screen filter blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-1000"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-retro-orange rounded-full mix-blend-screen filter blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-1000"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                 <div className="text-left max-w-lg">
                     <span className="text-retro-orange font-tech font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Don't Miss Out</span>
                     <h2 className="font-serif font-black text-3xl md:text-4xl text-bone mb-4 leading-tight">
                         Get the weekly event digest.
                     </h2>
                     <p className="font-sans text-bone/60 text-lg">
                         Curated list of networking opportunities and VIP invites delivered every Monday.
                     </p>
                 </div>
                 <div className="w-full md:w-auto flex-1 max-w-md">
                     <div className="flex gap-2">
                         <input 
                             type="email" 
                             placeholder="work@email.com" 
                             className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-bone placeholder-bone/30 outline-none focus:border-retro-orange focus:bg-white/20 transition-colors"
                         />
                         <button className="px-6 py-3 bg-retro-orange text-white rounded-xl font-bold font-tech uppercase tracking-wide hover:bg-white hover:text-retro-orange transition-all shadow-lg">
                             Notify Me
                         </button>
                     </div>
                     <p className="text-xs text-bone/30 mt-3 text-center md:text-left flex items-center gap-1">
                         <CheckCircle className="w-3 h-3" /> No spam, just connections.
                     </p>
                 </div>
             </div>
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div 
                className="absolute inset-0 bg-med-teal/40 backdrop-blur-sm transition-opacity opacity-100 animate-[fadeIn_0.3s_ease-out]"
                onClick={() => setSelectedEvent(null)}
            ></div>
            
            <div className="relative w-full max-w-xl h-full bg-white/95 backdrop-blur-xl shadow-2xl border-l border-white/50 overflow-y-auto animate-[slideLeft_0.4s_cubic-bezier(0.16,1,0.3,1)]">
                <button 
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-bone hover:bg-med-teal hover:text-white transition-colors z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="h-64 relative">
                    <img src={selectedEvent.image} alt={selectedEvent.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-6 left-8 right-8">
                        <div className="flex gap-2 mb-3">
                             {selectedEvent.tags.map(tag => (
                                 <span key={tag} className="text-[10px] font-bold font-tech uppercase bg-white/20 backdrop-blur-md text-white px-2 py-1 rounded border border-white/10">
                                     {tag}
                                 </span>
                             ))}
                        </div>
                        <h2 className="font-serif font-black text-3xl text-white leading-tight mb-2">{selectedEvent.name}</h2>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    <div className="flex gap-4">
                        <Button 
                            className="flex-1 justify-center !bg-med-teal !text-white hover:!bg-[#FF5500] hover:!border-[#FF5500] transition-colors duration-300"
                            onClick={() => onNavigate('event-register', { id: selectedEvent.id })}
                        >
                            Register Now
                        </Button>
                        <button className="p-3 border border-med-teal/10 rounded-xl hover:bg-bone text-ink/60 transition-colors" title="Share">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-3 border border-med-teal/10 rounded-xl hover:bg-bone text-ink/60 transition-colors" title="Save">
                            <Star className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-bone/30 rounded-2xl p-6 border border-med-teal/5">
                        <div>
                             <div className="flex items-center gap-2 text-retro-orange font-bold font-tech text-xs uppercase mb-1">
                                 <Calendar className="w-3 h-3" /> Date
                             </div>
                             <p className="font-sans text-sm font-medium">{selectedEvent.date}</p>
                        </div>
                        <div>
                             <div className="flex items-center gap-2 text-retro-orange font-bold font-tech text-xs uppercase mb-1">
                                 <Clock className="w-3 h-3" /> Time
                             </div>
                             <p className="font-sans text-sm font-medium">09:00 AM - 05:00 PM</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-serif font-bold text-xl text-med-teal mb-4">Agenda Highlight</h3>
                        <div className="bg-med-teal/5 border-l-4 border-retro-orange p-4 rounded-r-xl">
                            <p className="font-sans font-bold text-ink">{selectedEvent.agendaHighlight}</p>
                            <p className="text-xs text-ink/50 mt-1">Main Stage • 10:00 AM</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-serif font-bold text-xl text-med-teal mb-4">About This Event</h3>
                        <p className="font-sans text-ink/70 leading-relaxed text-sm">
                            {selectedEvent.description}
                            <br/><br/>
                            Join industry leaders for a day of networking, innovation showcases, and panel discussions designed to accelerate your growth in the medtech sector.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default EventsPage;