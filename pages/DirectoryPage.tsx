import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, MapPin, CheckCircle, SlidersHorizontal, ShieldCheck, Building2, Loader2 } from 'lucide-react';
import Button from '../components/UI/Button';
import ConstellationBackground from '../components/ConstellationBackground';
import { AuthPromptModal, ContactSupplierModal } from '../components/ContactModals';
import { allCompanies } from '../data/mockData';

interface DirectoryPageProps {
  onNavigate?: (page: string, params?: any) => void;
  isLoggedIn?: boolean;
  initialCategory?: string;
}

const INITIAL_BATCH = 9;
const LOAD_MORE_BATCH = 6;

const DirectoryPage: React.FC<DirectoryPageProps> = ({ onNavigate, isLoggedIn = false, initialCategory }) => {
  
  // State for Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('Relevance');

  // Pagination State
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // State for Modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [contactModalData, setContactModalData] = useState<{isOpen: boolean, name: string}>({ isOpen: false, name: '' });

  // Refs
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load initial filter if provided
  useEffect(() => {
    if (initialCategory) {
        setSelectedCategories([initialCategory]);
    }
  }, [initialCategory]);

  // Reset pagination when search or filters change
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH);
  }, [searchQuery, selectedCategories, selectedCerts, selectedLocation, sortBy]);

  // Filter Lists
  const categories = [
    "Contract Manufacturing", "Design & Engineering", "Molding", "R&D", 
    "Regulatory", "Consulting", "Sterilization", "Packaging", "Components", "Electronics", 
    "Manufacturing", "Testing & Lab", "Logistics", "Services", "Supplies"
  ];
  
  const certifications = [
    "ISO 13485", "ISO 9001", "FDA Registered", "ISO 11135", "ISO 11607"
  ];

  const locations = ["All", "USA", "Europe", "Asia", "South America", "Central America", "Canada"];

  // Filtering & Sorting Logic
  const filteredCompanies = useMemo(() => {
    let result = allCompanies.filter(company => {
      // Search Text
      const matchesSearch = 
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.categories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category Filter (OR logic)
      const matchesCategory = selectedCategories.length === 0 || 
        company.categories.some(cat => selectedCategories.includes(cat));

      // Cert Filter (AND logic)
      const matchesCerts = selectedCerts.length === 0 ||
        selectedCerts.every(cert => company.certifications.includes(cert));

      // Location Filter
      const matchesLocation = selectedLocation === 'All' || 
        company.location.includes(selectedLocation === "Europe" ? "Germany" : selectedLocation === "Europe" ? "Ireland" : selectedLocation === "USA" ? "USA" : selectedLocation);

      return matchesSearch && matchesCategory && matchesCerts && matchesLocation;
    });

    // Apply Sorting
    if (sortBy === 'Verified First') {
        result.sort((a, b) => (a.isVerified === b.isVerified ? 0 : a.isVerified ? -1 : 1));
    } else if (sortBy === 'Newest') {
        result.sort((a, b) => (b.foundedYear || 0) - (a.foundedYear || 0));
    }

    return result;
  }, [searchQuery, selectedCategories, selectedCerts, selectedLocation, sortBy]);

  // Sliced results for pagination
  const displayedCompanies = useMemo(() => {
    return filteredCompanies.slice(0, visibleCount);
  }, [filteredCompanies, visibleCount]);

  // Handlers
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate 800ms network request
    setTimeout(() => {
        setVisibleCount(prev => prev + LOAD_MORE_BATCH);
        setIsLoadingMore(false);
    }, 800);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleCert = (cert: string) => {
    setSelectedCerts(prev => 
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const handleContactClick = (companyName: string) => {
    if (isLoggedIn) {
        setContactModalData({ isOpen: true, name: companyName });
    } else {
        setShowAuthModal(true);
    }
  };

  const handleLoginRedirect = () => {
    setShowAuthModal(false);
    if (onNavigate) onNavigate('login');
  };

  const handleSearchClick = () => {
      if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  };

  return (
    <div className="bg-bone min-h-screen pt-24 pb-20">
      
      {/* Modals */}
      <AuthPromptModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onLoginClick={handleLoginRedirect} 
      />
      <ContactSupplierModal 
        isOpen={contactModalData.isOpen} 
        onClose={() => setContactModalData({ ...contactModalData, isOpen: false })} 
        supplierName={contactModalData.name} 
      />

      {/* --- HERO: DYNAMIC CONSTELLATION --- */}
      <div className="relative bg-white border-b border-med-teal/10 overflow-hidden">
        <ConstellationBackground speedFactor={1.5} particleCount={90} />
        
        <div className="relative z-10 py-24 px-6 max-w-7xl mx-auto text-center pointer-events-none">
          <div className="pointer-events-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-med-teal/5 text-med-teal text-xs font-bold font-tech uppercase tracking-widest mb-4 opacity-0 animate-[fadeInUp_1s_ease-out_forwards]">
              The Verified Network
            </span>
            <h1 className="font-serif font-black text-5xl md:text-7xl text-med-teal mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
              Directory
            </h1>
            <p className="font-sans text-lg md:text-xl text-ink/80 font-medium max-w-3xl mx-auto mb-10 leading-relaxed opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
              Find qualified <span className="text-med-teal font-bold">Medical Device Contractors</span> and <span className="text-med-teal font-bold">Service Providers</span>. Search our vetted directory of 7,000+ companies.
            </p>

            <div className="max-w-3xl mx-auto relative group mt-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
              <div className="absolute -inset-1 bg-gradient-to-r from-med-teal/30 to-retro-orange/30 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition duration-500"></div>
              
              <div className="relative flex items-center bg-white/60 backdrop-blur-md rounded-xl shadow-2xl border border-white/50 p-2 transition-all duration-300 hover:bg-white/80">
                <Search className="ml-4 w-6 h-6 text-med-teal/60" />
                <input 
                  type="text"
                  placeholder="Search 'Injection Molding', 'ISO 13485'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-4 text-lg outline-none text-ink placeholder-ink/40 bg-transparent font-sans"
                />
                <Button className="hidden md:flex shadow-none hover:shadow-md" onClick={handleSearchClick}>Search Directory</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT LAYOUT --- */}
      <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8" ref={resultsRef}>
        
        {/* --- LEFT SIDEBAR: FILTERS --- */}
        <div className="hidden lg:block lg:col-span-1 space-y-8 sticky top-32 h-fit">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-med-teal/5">
             <h3 className="font-serif font-bold text-lg text-med-teal mb-4 flex items-center gap-2">
               <MapPin className="w-4 h-4" /> Location
             </h3>
             <select 
                className="w-full p-2 bg-bone border border-med-teal/10 rounded-lg outline-none focus:border-retro-orange transition-colors text-sm"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
             >
                {locations.map(l => <option key={l} value={l}>{l === 'All' ? 'Worldwide' : l}</option>)}
             </select>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-med-teal/5">
             <h3 className="font-serif font-bold text-lg text-med-teal mb-4 flex items-center gap-2">
               <SlidersHorizontal className="w-4 h-4" /> Capabilities
             </h3>
             <div className="space-y-2 h-[300px] overflow-y-auto no-scrollbar">
               {categories.map(cat => (
                 <label key={cat} className="flex items-center gap-3 cursor-pointer group mb-2">
                   <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-med-teal border-med-teal' : 'border-ink/20 bg-bone group-hover:border-retro-orange'}`}>
                     {selectedCategories.includes(cat) && <CheckCircle className="w-3 h-3 text-white" />}
                   </div>
                   <span className={`text-sm ${selectedCategories.includes(cat) ? 'text-med-teal font-bold' : 'text-ink/70'}`}>{cat}</span>
                   <input type="checkbox" className="hidden" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                 </label>
               ))}
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-med-teal/5">
             <h3 className="font-serif font-bold text-lg text-med-teal mb-4 flex items-center gap-2">
               <ShieldCheck className="w-4 h-4" /> Certifications
             </h3>
             <div className="space-y-2">
               {certifications.map(cert => (
                 <label key={cert} className="flex items-center gap-3 cursor-pointer group">
                   <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCerts.includes(cert) ? 'bg-retro-orange border-retro-orange' : 'border-ink/20 bg-bone group-hover:border-med-teal'}`}>
                     {selectedCerts.includes(cert) && <CheckCircle className="w-3 h-3 text-white" />}
                   </div>
                   <span className={`text-sm ${selectedCerts.includes(cert) ? 'text-med-teal font-bold' : 'text-ink/70'}`}>{cert}</span>
                   <input type="checkbox" className="hidden" checked={selectedCerts.includes(cert)} onChange={() => toggleCert(cert)} />
                 </label>
               ))}
             </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: RESULTS GRID --- */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <p className="text-ink/50 text-sm font-sans">
              Showing <span className="font-bold text-med-teal">{filteredCompanies.length}</span> qualified partners
            </p>
            <div className="flex items-center gap-2">
               <span className="text-sm font-bold text-ink/50">Sort by:</span>
               <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm font-bold text-med-teal outline-none cursor-pointer border-none focus:ring-0"
               >
                  <option value="Relevance">Relevance</option>
                  <option value="Newest">Newest</option>
                  <option value="Verified First">Verified First</option>
               </select>
            </div>
          </div>

          {/* COMPANIES GRID */}
          <div className="grid grid-cols-1 gap-6 mb-12">
            {displayedCompanies.map(company => (
              <div 
                key={company.id} 
                className={`rounded-xl p-6 border transition-all duration-300 group flex flex-col md:flex-row gap-6 relative overflow-hidden ${
                    company.isVerified 
                    ? 'bg-white border-med-teal/30 shadow-md hover:shadow-xl hover:border-retro-orange/50' 
                    : 'bg-white border-med-teal/10 hover:shadow-lg hover:border-med-teal/30'
                }`}
              >
                {company.isVerified && (
                   <>
                    <div className="absolute top-0 left-0 w-1 h-full bg-retro-orange"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-bone/30 pointer-events-none"></div>
                   </>
                )}

                <div className="w-full md:w-48 shrink-0 flex flex-col items-center md:items-start gap-4 relative z-10">
                   <div className="w-24 h-24 rounded-lg bg-white border border-med-teal/5 flex items-center justify-center p-2 group-hover:scale-105 transition-transform shadow-sm">
                      <img src={company.logoUrl} alt={company.name} className="w-full h-full object-contain opacity-80" />
                   </div>
                   {company.isVerified && (
                     <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-retro-orange bg-retro-orange/10 px-2 py-1 rounded-full border border-retro-orange/20">
                        <ShieldCheck className="w-3 h-3" /> Verified
                     </span>
                   )}
                </div>

                <div className="flex-1 relative z-10">
                   <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-serif font-bold text-2xl text-med-teal group-hover:text-retro-orange transition-colors">
                           {company.name}
                        </h3>
                        <p className="font-tech text-xs text-ink/50 uppercase tracking-wide mb-3 flex items-center gap-1">
                           <MapPin className="w-3 h-3" /> {company.location} • Est. {company.foundedYear}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap justify-end">
                         {company.certifications.slice(0, 2).map(cert => (
                            <span key={cert} className="text-[10px] font-bold border border-med-teal/20 text-med-teal px-2 py-1 rounded bg-med-teal/5">
                               {cert}
                            </span>
                         ))}
                      </div>
                   </div>

                   <p className="text-sm font-sans font-medium text-ink/80 mb-2 italic">"{company.tagline}"</p>
                   <p className="text-sm font-sans text-ink/60 leading-relaxed mb-6 max-w-2xl line-clamp-2">
                      {company.description}
                   </p>

                   <div className="flex flex-col md:flex-row items-center justify-between border-t border-ink/5 pt-4 mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                         {company.categories.map(cat => (
                            <span key={cat} className="text-xs text-ink/60 bg-bone px-2 py-1 rounded hover:bg-med-teal hover:text-white transition-colors cursor-pointer">
                               {cat}
                            </span>
                         ))}
                      </div>
                      <div className="flex gap-3 w-full md:w-auto">
                         <button 
                            onClick={() => onNavigate && onNavigate('profile', { id: company.id })}
                            className="flex-1 md:flex-none px-4 py-2 text-sm font-bold text-med-teal border border-med-teal/20 rounded-lg hover:bg-bone transition-colors"
                        >
                            View Profile
                         </button>
                         <button 
                            onClick={() => handleContactClick(company.name)}
                            className="flex-1 md:flex-none px-4 py-2 text-sm font-bold text-white bg-med-teal rounded-lg hover:bg-retro-orange transition-colors shadow-md"
                        >
                            Contact
                         </button>
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* SMART LOAD MORE INTERFACE */}
          {filteredCompanies.length > visibleCount ? (
            <div className="flex justify-center mb-20 animate-[fadeInUp_0.6s_ease-out]">
                <button 
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="px-8 py-3 border border-gray-300 rounded-full text-sm font-semibold tracking-wide text-ink hover:border-[#007acc] hover:text-[#007acc] transition-all duration-300 flex items-center gap-3 disabled:opacity-50"
                >
                    {isLoadingMore ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Loading...</span>
                        </>
                    ) : (
                        <span>Load More Partners</span>
                    )}
                </button>
            </div>
          ) : filteredCompanies.length > 0 && (
            <div className="text-center text-gray-400 text-sm mt-8 mb-12 italic">
                End of results. Try adjusting filters or Browse Categories.
            </div>
          )}

          {/* LIST YOUR COMPANY BANNER */}
          <div className="mb-8 bg-gradient-to-r from-med-teal to-med-teal-light rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-retro-orange rounded-full mix-blend-multiply filter blur-[80px] opacity-30 pointer-events-none"></div>
            <div className="relative z-10 mb-6 md:mb-0">
               <h3 className="font-serif font-bold text-2xl mb-2">Are you a Supplier or Service Provider?</h3>
               <p className="text-white/80 text-sm max-w-lg">
                 Join 7,000+ companies reaching decision-makers. Get verified and boost your visibility today.
               </p>
            </div>
            <Button variant="secondary" className="relative z-10 shrink-0 shadow-xl" onClick={() => onNavigate && onNavigate('join')}>List Your Company</Button>
          </div>

          {/* Empty State */}
          {filteredCompanies.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-ink/20">
               <div className="w-16 h-16 bg-bone rounded-full flex items-center justify-center mx-auto mb-4 text-ink/30">
                  <Search className="w-8 h-8" />
               </div>
               <h3 className="font-serif font-bold text-xl text-ink mb-2">No partners found</h3>
               <p className="text-ink/50 max-w-xs mx-auto mb-6">
                  Adjust your search or filter criteria.
               </p>
               <Button variant="outline" onClick={() => {setSearchQuery(''); setSelectedCategories([]); setSelectedCerts([]);}}>
                  Clear Filters
               </Button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default DirectoryPage;