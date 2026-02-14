import React, { useState } from 'react';
import { MapPin, Globe, Calendar, ShieldCheck, CheckCircle, Star, Download, Play, ChevronLeft, Mail, Phone, X } from 'lucide-react';
import Button from '../components/UI/Button';
import { allCompanies } from '../data/mockData';
import { AuthPromptModal, ContactSupplierModal } from '../components/ContactModals';

interface SupplierProfilePageProps {
  id: number;
  onNavigate: (page: string, params?: any) => void;
  isLoggedIn?: boolean;
}

const SupplierProfilePage: React.FC<SupplierProfilePageProps> = ({ id, onNavigate, isLoggedIn = false }) => {
  // Find company
  const company = allCompanies.find(c => c.id === Number(id));

  // Modals state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'capabilities' | 'reviews'>('overview');
  const [lightbox, setLightbox] = useState<{isOpen: boolean, type: 'image' | 'video', src: string} | null>(null);

  if (!company) {
    return (
        <div className="min-h-screen pt-40 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-serif font-bold text-med-teal mb-4">Supplier not found</h2>
            <Button onClick={() => onNavigate('directory')}>Back to Directory</Button>
        </div>
    );
  }

  const handleContactClick = () => {
    if (isLoggedIn) {
        setShowContactModal(true);
    } else {
        setShowAuthModal(true);
    }
  };

  const handleSaveClick = () => {
      if (isLoggedIn) {
          alert("Added to Saved Suppliers");
      } else {
          setShowAuthModal(true);
      }
  };

  const handleLoginRedirect = () => {
    setShowAuthModal(false);
    onNavigate('login');
  };

  return (
    <div className="bg-bone min-h-screen pt-24 pb-20">
       <AuthPromptModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onLoginClick={handleLoginRedirect} 
      />
      <ContactSupplierModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
        supplierName={company.name} 
      />

      {/* LIGHTBOX OVERLAY */}
      {lightbox && lightbox.isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]">
            <button 
                onClick={() => setLightbox(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
                <X className="w-8 h-8" />
            </button>
            <div className="w-full max-w-5xl max-h-[80vh] flex items-center justify-center">
                {lightbox.type === 'image' ? (
                    <img src={lightbox.src} alt="Gallery Preview" className="max-w-full max-h-[80vh] rounded-lg shadow-2xl" />
                ) : (
                    <div className="w-full aspect-video bg-black rounded-lg flex items-center justify-center shadow-2xl border border-white/10">
                        <Play className="w-20 h-20 text-white opacity-50" />
                        {/* Placeholder for real video player */}
                    </div>
                )}
            </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
          <button onClick={() => onNavigate('directory')} className="flex items-center text-ink/50 hover:text-med-teal transition-colors font-tech text-sm font-bold uppercase tracking-wider">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back to Directory
          </button>
      </div>

      {/* Header Card */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
         <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-med-teal/10 relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-med-teal/5 to-retro-orange/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

             <div className="relative z-10 flex flex-col md:flex-row gap-8 md:items-start">
                 {/* Logo */}
                 <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl border border-med-teal/10 shadow-sm flex items-center justify-center p-4 shrink-0">
                     <img src={company.logoUrl} alt={company.name} className="w-full h-full object-contain" />
                 </div>

                 {/* Info */}
                 <div className="flex-1">
                     <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                         <div>
                             <h1 className="font-serif font-black text-4xl md:text-5xl text-med-teal mb-2">{company.name}</h1>
                             <p className="font-sans text-xl text-ink/60 font-medium italic">"{company.tagline}"</p>
                         </div>
                         <div className="flex gap-3">
                             {company.isVerified && (
                                <div className="flex flex-col items-end">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-retro-orange/10 text-retro-orange text-xs font-bold font-tech rounded-full border border-retro-orange/20 uppercase tracking-wide">
                                        <ShieldCheck className="w-4 h-4" /> Verified Supplier
                                    </span>
                                </div>
                             )}
                         </div>
                     </div>

                     <div className="flex flex-wrap gap-6 text-sm text-ink/60 font-sans mb-8">
                         <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-retro-orange" /> {company.location}</span>
                         <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-retro-orange" /> Founded {company.foundedYear}</span>
                         <a href={`https://${company.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-med-teal underline decoration-retro-orange/50 decoration-2 underline-offset-4">
                             <Globe className="w-4 h-4 text-retro-orange" /> {company.website || "Visit Website"}
                         </a>
                     </div>

                     <div className="flex flex-wrap gap-3">
                         <Button onClick={handleContactClick} className="shadow-lg">Contact Supplier</Button>
                         <Button variant="outline" onClick={handleSaveClick}>Save to List</Button>
                     </div>
                 </div>
             </div>
         </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Content Tabs) */}
          <div className="lg:col-span-2 space-y-8">
              
              {/* Tab Navigation */}
              <div className="flex border-b border-ink/10">
                  {['overview', 'capabilities', 'reviews'].map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-6 py-3 font-tech font-bold uppercase tracking-wider text-sm border-b-2 transition-colors ${activeTab === tab ? 'border-retro-orange text-med-teal' : 'border-transparent text-ink/40 hover:text-ink'}`}
                      >
                          {tab}
                      </button>
                  ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-2xl p-8 border border-med-teal/5 shadow-sm min-h-[400px]">
                  {activeTab === 'overview' && (
                      <div className="animate-[fadeIn_0.3s_ease-out]">
                          <h3 className="font-serif font-bold text-2xl text-med-teal mb-4">Company Overview</h3>
                          <p className="font-sans text-ink/70 leading-relaxed mb-8 text-lg">
                              {company.description}
                          </p>
                          
                          <h4 className="font-tech font-bold text-sm uppercase tracking-widest text-ink/50 mb-4">Media Gallery</h4>
                          <div className="grid grid-cols-2 gap-4 mb-8">
                              <div 
                                onClick={() => setLightbox({ isOpen: true, type: 'image', src: `https://picsum.photos/seed/${company.id}a/1200/800` })}
                                className="aspect-video bg-bone rounded-xl overflow-hidden relative group cursor-pointer"
                              >
                                  <img src={`https://picsum.photos/seed/${company.id}a/400/300`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Facility" />
                                  <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors"></div>
                              </div>
                              <div 
                                onClick={() => setLightbox({ isOpen: true, type: 'video', src: '#' })}
                                className="aspect-video bg-bone rounded-xl overflow-hidden relative group cursor-pointer"
                              >
                                  <img src={`https://picsum.photos/seed/${company.id}b/400/300`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Product" />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                                      <Play className="w-12 h-12 text-white opacity-80" />
                                  </div>
                              </div>
                          </div>

                          <h4 className="font-tech font-bold text-sm uppercase tracking-widest text-ink/50 mb-4">Downloads</h4>
                          <div className="space-y-3">
                              <a 
                                href="#" 
                                download 
                                onClick={(e) => e.preventDefault()}
                                className="flex items-center justify-between p-4 bg-bone/50 rounded-lg border border-med-teal/5 hover:border-retro-orange/30 transition-colors cursor-pointer group"
                              >
                                  <div className="flex items-center gap-3">
                                      <div className="p-2 bg-white rounded-lg text-retro-orange"><Download className="w-5 h-5"/></div>
                                      <span className="font-bold text-med-teal group-hover:text-retro-orange transition-colors">Corporate Brochure 2024</span>
                                  </div>
                                  <span className="text-xs text-ink/40">PDF • 2.4 MB</span>
                              </a>
                              <a 
                                href="#" 
                                download 
                                onClick={(e) => e.preventDefault()}
                                className="flex items-center justify-between p-4 bg-bone/50 rounded-lg border border-med-teal/5 hover:border-retro-orange/30 transition-colors cursor-pointer group"
                              >
                                  <div className="flex items-center gap-3">
                                      <div className="p-2 bg-white rounded-lg text-retro-orange"><Download className="w-5 h-5"/></div>
                                      <span className="font-bold text-med-teal group-hover:text-retro-orange transition-colors">ISO 13485 Certificate</span>
                                  </div>
                                  <span className="text-xs text-ink/40">PDF • 0.8 MB</span>
                              </a>
                          </div>
                      </div>
                  )}

                  {activeTab === 'capabilities' && (
                      <div className="animate-[fadeIn_0.3s_ease-out]">
                          <h3 className="font-serif font-bold text-2xl text-med-teal mb-6">Core Capabilities</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {company.categories.concat(['Rapid Prototyping', 'Cleanroom Assembly', 'Supply Chain Management', 'Quality Assurance']).map((cap, i) => (
                                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-bone transition-colors">
                                      <CheckCircle className="w-5 h-5 text-retro-orange shrink-0" />
                                      <span className="font-sans text-ink/80">{cap}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}

                  {activeTab === 'reviews' && (
                      <div className="animate-[fadeIn_0.3s_ease-out]">
                          <div className="flex items-center justify-between mb-8">
                             <h3 className="font-serif font-bold text-2xl text-med-teal">Client Reviews</h3>
                             <Button size="sm" variant="outline">Write a Review</Button>
                          </div>
                          <div className="space-y-6">
                              {[1, 2].map((i) => (
                                  <div key={i} className="pb-6 border-b border-ink/5 last:border-0">
                                      <div className="flex items-center gap-2 mb-2">
                                          <div className="flex text-retro-orange">
                                              {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                                          </div>
                                          <span className="text-xs font-bold font-tech text-ink/40">Oct {10-i}, 2024</span>
                                      </div>
                                      <h4 className="font-bold text-lg text-ink mb-2">Excellent partnership for our new product line</h4>
                                      <p className="text-ink/60 font-sans text-sm mb-3">
                                          "Precision BioPlastics delivered on time and within tolerance. Their engineering team provided valuable DFM feedback that saved us cost in the long run."
                                      </p>
                                      <p className="text-xs font-bold text-med-teal">– Director of R&D, CardioTech Inc.</p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
              </div>
          </div>

          {/* Right Column (Sidebar Info) */}
          <div className="space-y-6">
              
              {/* Contact Card */}
              <div className="bg-med-teal text-bone rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-retro-orange rounded-full blur-[60px] opacity-20"></div>
                  <h3 className="font-serif font-bold text-2xl mb-2 relative z-10">Get in Touch</h3>
                  <p className="text-sm text-bone/70 mb-6 relative z-10">
                      Reach out directly to the sales team at {company.name}.
                  </p>
                  <Button variant="secondary" className="w-full mb-4 justify-center relative z-10" onClick={handleContactClick}>
                      Send Message
                  </Button>
                  <div className="space-y-3 text-sm font-sans relative z-10">
                      <div className="flex items-center gap-3 opacity-80">
                          <Phone className="w-4 h-4" /> <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-3 opacity-80">
                          <Mail className="w-4 h-4" /> <span>sales@{company.name.toLowerCase().replace(/\s/g, '')}.com</span>
                      </div>
                  </div>
              </div>

              {/* Certifications Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-med-teal/10">
                  <h3 className="font-tech font-bold text-sm uppercase tracking-widest text-ink/50 mb-4">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                      {company.certifications.map(cert => (
                          <span key={cert} className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-100">
                              <ShieldCheck className="w-3 h-3" /> {cert}
                          </span>
                      ))}
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-bone text-ink/60 text-xs font-bold rounded-lg border border-ink/5">
                          DUNS: 12-345-6789
                      </span>
                  </div>
              </div>

              {/* Similar Companies */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-med-teal/10">
                  <h3 className="font-tech font-bold text-sm uppercase tracking-widest text-ink/50 mb-4">Similar Suppliers</h3>
                  <div className="space-y-4">
                      {allCompanies.filter(c => c.id !== company.id && c.categories.some(cat => company.categories.includes(cat))).slice(0, 3).map(sim => (
                          <div key={sim.id} className="flex items-center gap-3 group cursor-pointer" onClick={() => onNavigate('profile', { id: sim.id })}>
                              <div className="w-10 h-10 rounded bg-bone border border-med-teal/5 overflow-hidden">
                                  <img src={sim.logoUrl} className="w-full h-full object-contain p-1" alt={sim.name} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-sm text-med-teal group-hover:text-retro-orange transition-colors">{sim.name}</h4>
                                  <span className="text-xs text-ink/40">{sim.location}</span>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

          </div>

      </div>
    </div>
  );
};

export default SupplierProfilePage;
