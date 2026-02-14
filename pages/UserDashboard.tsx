import React, { useState, useEffect } from 'react';
// Added ArrowRight to the imports
import { Settings, LogOut, Bell, MessageSquare, Heart, TrendingUp, Search, User, ChevronRight, ArrowLeft, Send, Check, Sparkles, Building2, Briefcase, X, Loader2, MapPin, Globe, ShieldCheck, Zap, AlertCircle, ArrowRight, LayoutList, LayoutGrid, Filter, ExternalLink } from 'lucide-react';
import Button from '../components/UI/Button';
import NeuralBackground from '../components/NeuralBackground';
import { ContactSupplierModal } from '../components/ContactModals';

interface UserDashboardProps {
    onNavigate: (page: string, params?: any) => void;
    initialData?: any;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onNavigate, initialData }) => {
    // Navigation & Data State
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
    const [contactModalData, setContactModalData] = useState<{isOpen: boolean, name: string}>({ isOpen: false, name: '' });
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [upgradeReason, setUpgradeReason] = useState('');
    
    // View States for Saved Suppliers
    const [suppliersViewMode, setSuppliersViewMode] = useState<'list' | 'grid'>('list');
    const [expandedSupplierId, setExpandedSupplierId] = useState<number | null>(null);

    // Message Filter State
    const [showOnlySavedMessages, setShowOnlySavedMessages] = useState(false);

    // Onboarding / "Day 0" State
    const [showWelcome, setShowWelcome] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    
    // User Plan State
    const [userPlan, setUserPlan] = useState<string>(initialData?.user?.tier || 'Explorer');

    // Verification Logic
    const [verificationStatus, setVerificationStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
    const [verificationTimer, setVerificationTimer] = useState(0);

    // Profile Progress Logic
    const [profileProgress, setProfileProgress] = useState(30); 
    const [isProfileDismissed, setIsProfileDismissed] = useState(false);

    // Smart Recommendations Interaction
    const [quickViewPartner, setQuickViewPartner] = useState<any | null>(null);

    useEffect(() => {
        if (initialData?.isNewUser) {
            setIsNewUser(true);
            setShowWelcome(true);
            const timer = setTimeout(() => {
                setShowWelcome(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [initialData]);

    useEffect(() => {
        let interval: any;
        if (verificationTimer > 0) {
            interval = setInterval(() => setVerificationTimer(t => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [verificationTimer]);

    const handleFeatureClick = (featureName: string, requiredTier: 'Catalyst' | 'Titan') => {
        const isRestricted = (userPlan === 'Explorer') || (userPlan === 'Catalyst' && requiredTier === 'Titan');
        
        if (isRestricted) {
            setUpgradeReason(featureName);
            setShowUpgradeModal(true);
        } else {
            // Proceed with feature logic
            console.log(`Accessing ${featureName}`);
        }
    };

    const handleResendVerification = () => {
        setVerificationStatus('sending');
        setTimeout(() => {
            setVerificationStatus('sent');
            setVerificationTimer(60);
        }, 1500);
    };

    const handleDismissProfile = () => {
        setIsProfileDismissed(true);
    };

    const mockRecommendations = [
        { name: "PolyMed Inc.", type: "Contract Manufacturing", match: "98%", loc: "Ireland", desc: "Specialists in catheter manufacturing and cleanroom assembly." },
        { name: "Advant Medical", type: "Packaging", match: "95%", loc: "USA", desc: "Sterile barrier packaging solutions." },
        { name: "TechMold", type: "Molding", match: "88%", loc: "Germany", desc: "High precision micro-molding for surgical components." }
    ];

    const savedSuppliers = [
        { id: 1, name: "Precision BioPlastics", loc: "Minnesota, USA", cat: "Molding", desc: "Full-service contract manufacturer specializing in high-tolerance micro-molding for surgical and diagnostic devices.", certs: ["ISO 13485", "FDA Registered"] },
        { id: 5, name: "Titan Medical Components", loc: "Massachusetts, USA", cat: "Machining", desc: "High-volume manufacturing of titanium and stainless steel implants and surgical instrument components.", certs: ["ISO 13485"] },
        { id: 2, name: "NeuroFlow Design Labs", loc: "California, USA", cat: "R&D", desc: "Engineering consultancy focused on active implantables and neurostimulation devices.", certs: ["ISO 13485", "ISO 9001"] }
    ];

    const messages = [
        { 
            id: 1,
            from: "Precision BioPlastics", 
            subject: "RE: Quote Request for Prototype", 
            time: "2 hrs ago", 
            unread: true,
            thread: [
                { sender: "Precision BioPlastics", text: "Hi John, thanks for the inquiry. We can certainly help with the micro-molding for your prototype. Do you have the CAD files ready?", date: "Today 10:30 AM" },
                { sender: "You", text: "Hello, I am looking for a quote on a small run (500 units) of a PEEK implantable component.", date: "Yesterday 4:00 PM" }
            ]
        },
        { 
            id: 2,
            from: "SterileGuard Solutions", 
            subject: "Sterilization Validation Protocol", 
            time: "1 day ago", 
            unread: false,
            thread: [
                { sender: "SterileGuard Solutions", text: "The protocol draft is attached. Please review at your convenience.", date: "Oct 24 9:00 AM" }
            ]
        }
    ];

    const unreadCount = messages.filter(m => m.unread).length;
    const activeMessage = messages.find(m => m.id === selectedMessageId);

    const renderProgressRing = (radius: number, stroke: number, progress: number) => {
        const normalizedRadius = radius - stroke * 2;
        const circumference = normalizedRadius * 2 * Math.PI;
        const strokeDashoffset = circumference - (progress / 100) * circumference;
        
        return (
            <div className="relative flex items-center justify-center">
                <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
                    <circle
                        stroke="#E2E8F0"
                        strokeWidth={stroke}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke="#2B4C59"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                <div className="absolute text-med-teal font-tech font-bold text-sm">
                    {progress}%
                </div>
            </div>
        );
    };

    const renderContent = () => {
        if (isNewUser && activeTab === 'overview') {
            return (
                <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-med-teal/5 relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-24 h-24 bg-retro-orange/5 rounded-full -mr-8 -mt-8 pointer-events-none"></div>
                             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-retro-orange border border-retro-orange/10">
                                 {verificationStatus === 'sent' ? <Check className="w-6 h-6" /> : <Sparkles className="w-6 h-6 animate-pulse" />}
                             </div>
                             <h3 className="font-serif font-bold text-lg text-med-teal mb-2">Verify Your Identity</h3>
                             <p className="font-sans text-sm text-ink/60 mb-6">
                                 We've sent a secure link to <span className="font-bold">{initialData?.user?.email}</span>. Verify to unlock messaging.
                             </p>
                             <button 
                                onClick={handleResendVerification}
                                disabled={verificationStatus !== 'idle'}
                                className="text-xs font-bold font-tech text-retro-orange hover:underline uppercase tracking-wide disabled:opacity-50 disabled:no-underline flex items-center gap-2"
                             >
                                 {verificationStatus === 'idle' && "Resend Verification Link"}
                                 {verificationStatus === 'sending' && <><Loader2 className="w-3 h-3 animate-spin"/> Sending...</>}
                                 {verificationStatus === 'sent' && `Sent! Retry in ${verificationTimer}s`}
                             </button>
                        </div>

                        {!isProfileDismissed && (
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-med-teal/5 group relative animate-[fadeIn_0.3s]">
                                <button onClick={handleDismissProfile} className="absolute top-4 right-4 text-ink/20 hover:text-ink/60 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="flex justify-between items-start mb-4">
                                    {renderProgressRing(28, 4, profileProgress)}
                                    <div className="text-right flex-1 pl-4">
                                        <h3 className="font-serif font-bold text-lg text-ink">Company Profile</h3>
                                        <p className="text-[10px] text-ink/40 uppercase font-bold">Visibility: Low</p>
                                    </div>
                                </div>
                                <p className="font-sans text-sm text-ink/60 mb-6">
                                    {profileProgress < 30 ? "Add your logo and description to start appearing in search." : "Great start! Add certifications to appear in filtered searches."}
                                </p>
                                <Button size="sm" className="w-full" onClick={() => onNavigate('certifications')}>
                                    {profileProgress < 30 ? "Upload Logo" : "Add Certifications"}
                                </Button>
                            </div>
                        )}

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-med-teal/5">
                            <div className="w-12 h-12 bg-med-teal/5 rounded-full flex items-center justify-center text-med-teal mb-4">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif font-bold text-lg text-ink mb-2">Suggested Partners</h3>
                            <div className="space-y-3 mb-6">
                                {mockRecommendations.slice(0, 2).map((p,i) => (
                                    <div 
                                        key={i} 
                                        onClick={() => setQuickViewPartner(p)}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-bone/50 transition-colors cursor-pointer group/item"
                                    >
                                        <div className="w-8 h-8 rounded bg-bone border border-med-teal/10 flex items-center justify-center text-[10px] font-bold text-med-teal">
                                            {p.name[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm text-ink truncate">{p.name}</p>
                                            <div className="flex justify-between items-center">
                                                <p className="text-[10px] text-ink/50 truncate">{p.type}</p>
                                                <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1 rounded">{p.match} match</span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-ink/20 group-hover/item:text-retro-orange transition-colors" />
                                    </div>
                                ))}
                            </div>
                             <button 
                                onClick={() => onNavigate('directory', { category: 'Contract Manufacturing' })} 
                                className="text-xs font-bold font-tech text-med-teal hover:text-retro-orange transition-colors uppercase tracking-wide"
                             >
                                 View All Recommendations
                             </button>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-med-teal to-med-teal-light rounded-2xl p-8 text-bone relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                        <div className="relative z-10 max-w-lg">
                            <h2 className="font-serif font-bold text-2xl mb-2">Your Mission Control is Ready</h2>
                            <p className="text-bone/70">
                                Start by exploring the directory to find verified partners. Your activity and saved lists will appear here.
                            </p>
                        </div>
                        <Button 
                            variant="secondary" 
                            className="relative z-10 whitespace-nowrap"
                            onClick={() => onNavigate('directory')}
                        >
                            Browse Directory <Search className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            );
        }

        switch (activeTab) {
            case 'messages':
                if (selectedMessageId && activeMessage) {
                    return (
                        <div className="bg-white rounded-2xl shadow-sm border border-med-teal/5 overflow-hidden animate-[fadeIn_0.3s_ease-out]">
                            <div className="p-4 border-b border-med-teal/5 flex items-center gap-4 bg-bone/30">
                                <button onClick={() => setSelectedMessageId(null)} className="p-2 hover:bg-med-teal/10 rounded-full transition-colors text-med-teal">
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <div>
                                    <h3 className="font-bold text-ink">{activeMessage.from}</h3>
                                    <p className="text-xs text-ink/50">{activeMessage.subject}</p>
                                </div>
                            </div>
                            <div className="h-[400px] overflow-y-auto p-6 space-y-6 bg-bone/20">
                                {activeMessage.thread.map((msg, i) => (
                                    <div key={i} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[80%] p-4 rounded-xl text-sm ${msg.sender === 'You' ? 'bg-med-teal text-white rounded-tr-none' : 'bg-white border border-med-teal/10 text-ink rounded-tl-none shadow-sm'}`}>
                                            {msg.text}
                                        </div>
                                        <span className="text-[10px] text-ink/30 mt-1 px-1">{msg.date}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-med-teal/5 bg-white">
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Type a reply..." className="flex-1 bg-bone/50 border border-med-teal/10 rounded-lg px-4 py-3 text-sm focus:border-retro-orange outline-none" />
                                    <button className="bg-retro-orange text-white p-3 rounded-lg hover:bg-ink transition-colors"><Send className="w-5 h-5" /></button>
                                </div>
                            </div>
                        </div>
                    );
                }
                
                const filteredMessages = messages.filter(msg => 
                    !showOnlySavedMessages || savedSuppliers.some(s => s.name === msg.from)
                );

                return (
                    <div className="bg-white rounded-2xl shadow-sm border border-med-teal/5 overflow-hidden animate-[fadeIn_0.3s_ease-out]">
                        <div className="p-6 border-b border-med-teal/5 flex justify-between items-center bg-bone/30">
                            <h3 className="font-serif font-bold text-xl text-med-teal">Inbox</h3>
                            <button 
                                onClick={() => setShowOnlySavedMessages(!showOnlySavedMessages)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full font-tech font-bold text-xs uppercase tracking-wider transition-all border ${
                                    showOnlySavedMessages 
                                    ? 'bg-med-teal text-white border-med-teal' 
                                    : 'bg-white text-ink/50 border-med-teal/10 hover:border-med-teal/30'
                                }`}
                            >
                                <Filter className={`w-3 h-3 ${showOnlySavedMessages ? 'text-retro-orange' : ''}`} />
                                {showOnlySavedMessages ? 'Only Saved Suppliers' : 'Filter by Saved'}
                            </button>
                        </div>
                        <div>
                            {filteredMessages.length > 0 ? filteredMessages.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    onClick={() => {
                                        if (userPlan === 'Explorer' && msg.unread) {
                                            handleFeatureClick('Priority Messaging', 'Catalyst');
                                        } else {
                                            setSelectedMessageId(msg.id);
                                        }
                                    }}
                                    className={`p-6 border-b border-med-teal/5 last:border-0 hover:bg-bone/30 transition-colors cursor-pointer flex items-center justify-between group ${msg.unread ? 'bg-retro-orange/5' : ''}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${msg.unread ? 'bg-retro-orange' : 'bg-transparent'}`}></div>
                                        <div className="w-10 h-10 rounded-full bg-med-teal/10 text-med-teal flex items-center justify-center font-bold">
                                            {msg.from[0]}
                                        </div>
                                        <div>
                                            <h4 className={`font-sans text-sm ${msg.unread ? 'font-bold text-med-teal' : 'text-ink'}`}>{msg.from}</h4>
                                            <p className="text-sm text-ink/60 group-hover:text-med-teal transition-colors">{msg.subject}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-tech text-ink/40">{msg.time}</span>
                                        <ChevronRight className="w-4 h-4 text-ink/20 group-hover:text-retro-orange" />
                                    </div>
                                </div>
                            )) : (
                                <div className="p-20 text-center flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-bone flex items-center justify-center mb-4 text-ink/20">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <p className="text-ink/40 text-sm">No messages found matching your filter.</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'saved suppliers':
                return (
                    <div className="animate-[fadeIn_0.3s_ease-out] flex flex-col h-full">
                        {/* VIEW HEADER */}
                        <div className="flex justify-between items-center mb-8 px-2">
                            <div>
                                <h3 className="font-serif font-bold text-2xl text-med-teal">Saved Suppliers</h3>
                                <p className="text-xs text-ink/40 mt-1 uppercase font-bold tracking-widest">{savedSuppliers.length} Verified Partners</p>
                            </div>
                            <div className="flex bg-white rounded-xl border border-med-teal/10 p-1 shadow-sm">
                                <button 
                                    onClick={() => setSuppliersViewMode('list')}
                                    className={`p-2 rounded-lg transition-all ${suppliersViewMode === 'list' ? 'bg-med-teal text-white shadow-md' : 'text-ink/40 hover:text-med-teal'}`}
                                >
                                    <LayoutList className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => setSuppliersViewMode('grid')}
                                    className={`p-2 rounded-lg transition-all ${suppliersViewMode === 'grid' ? 'bg-med-teal text-white shadow-md' : 'text-ink/40 hover:text-med-teal'}`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* SUPPLIER LIST/GRID */}
                        <div className={`${suppliersViewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
                            {savedSuppliers.map((sup) => (
                                <div 
                                    key={sup.id} 
                                    className={`bg-white rounded-2xl border border-med-teal/5 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${suppliersViewMode === 'list' ? 'flex flex-col' : ''}`}
                                >
                                    <div 
                                        onClick={() => setExpandedSupplierId(expandedSupplierId === sup.id ? null : sup.id)}
                                        className={`p-6 cursor-pointer flex items-center gap-4 transition-colors ${expandedSupplierId === sup.id ? 'bg-bone/30' : 'hover:bg-bone/10'}`}
                                    >
                                        <div className="w-14 h-14 bg-bone rounded-xl shrink-0 flex items-center justify-center font-serif font-bold text-xl text-med-teal border border-med-teal/5 group-hover:scale-105 transition-transform">
                                            {sup.name[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-serif font-bold text-lg text-ink truncate group-hover:text-retro-orange transition-colors">{sup.name}</h4>
                                            <div className="flex items-center gap-3 text-xs text-ink/40 mt-0.5">
                                                <span className="flex items-center gap-1 font-tech font-bold uppercase tracking-wider text-[10px] text-med-teal/60"><MapPin className="w-3 h-3" /> {sup.loc}</span>
                                                <span className="w-1 h-1 rounded-full bg-ink/20"></span>
                                                <span className="font-bold text-retro-orange uppercase text-[10px] tracking-widest">{sup.cat}</span>
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 text-ink/20 transition-transform duration-300 ${expandedSupplierId === sup.id ? 'rotate-90 text-retro-orange' : 'group-hover:translate-x-1'}`} />
                                    </div>

                                    {/* EXPANDED CONTENT */}
                                    <div className={`transition-all duration-500 ease-in-out overflow-hidden border-t border-med-teal/5 ${expandedSupplierId === sup.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="p-6 bg-white flex flex-col h-full">
                                            <p className="font-sans text-sm text-ink/70 leading-relaxed mb-6 italic border-l-2 border-retro-orange/30 pl-4">
                                                {sup.desc}
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {sup.certs.map(cert => (
                                                    <span key={cert} className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-lg border border-green-100">
                                                        <ShieldCheck className="w-3 h-3" /> {cert}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex gap-3 mt-auto">
                                                <Button 
                                                    size="sm" 
                                                    className="flex-1"
                                                    onClick={() => onNavigate('profile', { id: sup.id })}
                                                >
                                                    View Profile <ExternalLink className="w-3 h-3 ml-1.5" />
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="flex-1"
                                                    onClick={(e) => { e.stopPropagation(); setContactModalData({ isOpen: true, name: sup.name }); }}
                                                >
                                                    Contact Team
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                             
                             <div 
                                className="border-2 border-dashed border-med-teal/10 rounded-2xl flex flex-col items-center justify-center p-8 hover:bg-white hover:shadow-md transition-all cursor-pointer text-ink/30 hover:text-med-teal hover:border-med-teal/30 group" 
                                onClick={() => onNavigate('directory')}
                            >
                                <div className="w-10 h-10 rounded-full bg-bone flex items-center justify-center mb-3 group-hover:bg-med-teal/5 group-hover:text-retro-orange transition-colors">
                                    <Search className="w-5 h-5" />
                                </div>
                                <span className="font-bold font-tech text-xs uppercase tracking-widest">Find More Partners</span>
                            </div>
                        </div>
                    </div>
                );

            case 'settings':
                return (
                    <div className="bg-white rounded-2xl shadow-sm border border-med-teal/5 p-8 max-w-2xl animate-[fadeIn_0.3s_ease-out]">
                        <h3 className="font-serif font-bold text-2xl text-med-teal mb-6">Account Settings</h3>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold font-tech text-med-teal uppercase mb-2">First Name</label>
                                    <input type="text" defaultValue={isNewUser ? initialData?.user?.firstName : "John"} className="w-full bg-bone/30 border border-med-teal/10 rounded-lg p-3 text-sm focus:border-retro-orange outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold font-tech text-med-teal uppercase mb-2">Last Name</label>
                                    <input type="text" defaultValue={isNewUser ? initialData?.user?.lastName : "Doe"} className="w-full bg-bone/30 border border-med-teal/10 rounded-lg p-3 text-sm focus:border-retro-orange outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold font-tech text-med-teal uppercase mb-2">Email Address</label>
                                <input type="email" defaultValue={isNewUser ? initialData?.user?.email : "john.doe@medtech.com"} className="w-full bg-bone/30 border border-med-teal/10 rounded-lg p-3 text-sm focus:border-retro-orange outline-none" />
                            </div>
                            <div className="pt-6 border-t border-med-teal/5">
                                <h4 className="font-bold text-ink mb-4">Notifications</h4>
                                <label className="flex items-center gap-3 mb-3 cursor-pointer">
                                    <div className="w-5 h-5 bg-retro-orange rounded flex items-center justify-center text-white"><Check className="w-3 h-3"/></div>
                                    <span className="text-sm text-ink/70">Email me about new messages</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <div className="w-5 h-5 border border-ink/20 rounded"></div>
                                    <span className="text-sm text-ink/70">Weekly newsletter</span>
                                </label>
                            </div>
                            <div className="pt-4">
                                <Button>Save Changes</Button>
                            </div>
                        </div>
                    </div>
                );

            case 'overview':
            default:
                return (
                    <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-med-teal/5 hover:border-retro-orange/30 transition-colors cursor-pointer" onClick={() => setActiveTab('messages')}>
                                <div className="flex items-center gap-3 text-med-teal mb-2">
                                    <MessageSquare className="w-5 h-5" />
                                    <span className="font-tech font-bold text-xs uppercase">Active Inquiries</span>
                                </div>
                                <span className="font-serif font-black text-4xl text-ink">4</span>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-med-teal/5 hover:border-retro-orange/30 transition-colors cursor-pointer" onClick={() => setActiveTab('saved suppliers')}>
                                <div className="flex items-center gap-3 text-med-teal mb-2">
                                    <Heart className="w-5 h-5" />
                                    <span className="font-tech font-bold text-xs uppercase">Saved Suppliers</span>
                                </div>
                                <span className="font-serif font-black text-4xl text-ink">{savedSuppliers.length}</span>
                            </div>
                            
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-med-teal/5 hover:border-retro-orange/30 transition-colors relative group cursor-pointer" onClick={() => handleFeatureClick('Advanced Analytics', 'Catalyst')}>
                                <div className="flex items-center gap-3 text-med-teal mb-2">
                                    <TrendingUp className="w-5 h-5" />
                                    <span className="font-tech font-bold text-xs uppercase">Profile Views</span>
                                </div>
                                <span className="font-serif font-black text-4xl text-ink">128</span>
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-med-teal text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none transform translate-y-2 group-hover:translate-y-0 duration-300">
                                    +12% this week
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-med-teal/5 overflow-hidden">
                            <div className="p-6 border-b border-med-teal/5 flex justify-between items-center bg-bone/30">
                                <h3 className="font-serif font-bold text-xl text-med-teal">Recent Messages</h3>
                                <button onClick={() => setActiveTab('messages')} className="text-xs font-bold font-tech text-retro-orange hover:underline">View All</button>
                            </div>
                            <div>
                                {messages.map((msg, i) => (
                                    <div 
                                        key={i} 
                                        onClick={() => { setActiveTab('messages'); setSelectedMessageId(msg.id); }}
                                        className={`p-6 border-b border-med-teal/5 last:border-0 hover:bg-bone/30 transition-colors cursor-pointer flex items-center justify-between group ${msg.unread ? 'bg-retro-orange/5' : ''}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-2 rounded-full ${msg.unread ? 'bg-retro-orange' : 'bg-transparent'}`}></div>
                                            <div>
                                                <h4 className={`font-sans text-sm ${msg.unread ? 'font-bold text-med-teal' : 'text-ink'}`}>{msg.from}</h4>
                                                <p className="text-sm text-ink/60 group-hover:text-med-teal transition-colors">{msg.subject}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-tech text-ink/40">{msg.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Restricted Feature Preview */}
                        <div className="bg-bone/40 border-2 border-dashed border-med-teal/10 rounded-3xl p-8 flex flex-col items-center text-center">
                             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                 <BarChart className="w-6 h-6 text-med-teal/30" />
                             </div>
                             <h4 className="font-serif font-bold text-xl text-med-teal mb-2">Market Insights & Trends</h4>
                             <p className="text-sm text-ink/40 max-w-md mb-6">
                                 Unlock real-time data on industry sourcing trends and competitor benchmarking. Available for Catalyst and Titan plans.
                             </p>
                             <Button variant="outline" size="sm" onClick={() => handleFeatureClick('Market Insights', 'Catalyst')}>
                                 <Zap className="w-4 h-4 mr-2" /> Unlock Insights
                             </Button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-bone relative overflow-hidden">
            <ContactSupplierModal 
                isOpen={contactModalData.isOpen} 
                onClose={() => setContactModalData({ ...contactModalData, isOpen: false })} 
                supplierName={contactModalData.name} 
            />

            {/* UPGRADE MODAL */}
            {showUpgradeModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]">
                    <div className="absolute inset-0 bg-med-teal/60 backdrop-blur-sm" onClick={() => setShowUpgradeModal(false)}></div>
                    <div className="relative bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-[slideUp_0.4s_ease-out] overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-retro-orange/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <button onClick={() => setShowUpgradeModal(false)} className="absolute top-6 right-6 text-ink/20 hover:text-ink transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                        
                        <div className="text-center mb-8 relative z-10">
                            <div className="w-16 h-16 bg-retro-orange/10 text-retro-orange rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="font-serif font-bold text-2xl text-med-teal mb-2">Upgrade Your Account</h3>
                            <p className="text-sm text-ink/60">
                                <span className="font-bold text-ink">"{upgradeReason}"</span> is a premium feature. Unlock it by upgrading to a professional plan.
                            </p>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <div className="p-4 bg-bone/50 rounded-2xl border border-med-teal/5 flex justify-between items-center group cursor-pointer hover:border-med-teal/30 transition-all" onClick={() => onNavigate('join')}>
                                <div>
                                    <h4 className="font-bold text-med-teal">Catalyst Plan</h4>
                                    <p className="text-[10px] text-ink/40 uppercase font-bold">Best for growing firms</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-tech font-bold text-med-teal">$499/yr</p>
                                    <ArrowRight className="w-4 h-4 ml-auto text-retro-orange group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                            <div className="p-4 bg-ink text-white rounded-2xl border border-white/5 flex justify-between items-center group cursor-pointer hover:shadow-lg transition-all" onClick={() => onNavigate('join')}>
                                <div>
                                    <h4 className="font-bold">Titan Plan</h4>
                                    <p className="text-[10px] text-white/40 uppercase font-bold">Ultimate visibility & AI tools</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-tech font-bold text-retro-orange">$2,499/yr</p>
                                    <ArrowRight className="w-4 h-4 ml-auto text-white/40 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-[10px] text-ink/30 mt-6">
                            Secure checkout powered by Stripe. Cancel anytime.
                        </p>
                    </div>
                </div>
            )}

            {/* WELCOME OVERLAY FOR NEW USERS */}
            {showWelcome && (
                <div className="fixed inset-0 z-[100] bg-med-teal flex items-center justify-center animate-[fadeOut_0.5s_ease-out_2s_forwards] pointer-events-none">
                     <div className="text-center animate-[slideUp_0.8s_ease-out]">
                         <h1 className="font-serif font-black text-5xl md:text-7xl text-bone mb-4">
                             Welcome to the Hub, {initialData?.user?.firstName || 'Innovator'}.
                         </h1>
                         <p className="font-sans text-xl text-bone/60">Your mission control center is ready.</p>
                     </div>
                </div>
            )}

            {/* Subtle background */}
            <div className="absolute top-0 left-0 w-full h-[50vh] opacity-30 pointer-events-none">
                 <NeuralBackground />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-med-teal/10 pb-6 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                             <div className="w-12 h-12 rounded-full bg-med-teal text-bone flex items-center justify-center font-serif font-bold text-xl border-2 border-retro-orange">
                                 {isNewUser ? initialData?.user?.firstName?.[0] : "JD"}
                             </div>
                             <div>
                                <h1 className="font-serif font-bold text-3xl text-med-teal">
                                    {isNewUser ? `Hello, ${initialData?.user?.firstName}` : "Welcome back, John"}
                                </h1>
                                <p className="font-sans text-sm text-ink/50">
                                    {userPlan} Plan • {isNewUser ? "Explorer Plan • Setup In Progress" : "Member since 2023 • Premium Plan"}
                                </p>
                             </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="p-3 rounded-full bg-white border border-med-teal/10 text-med-teal hover:text-retro-orange hover:shadow-md transition-all relative">
                            <Bell className="w-5 h-5" />
                            {(!isNewUser || unreadCount > 0) && <span className="absolute top-2 right-2 w-2 h-2 bg-retro-orange rounded-full"></span>}
                        </button>
                        <button 
                            onClick={() => setActiveTab('settings')}
                            className="p-3 rounded-full bg-white border border-med-teal/10 text-med-teal hover:text-retro-orange hover:shadow-md transition-all"
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                        <Button variant="outline" size="sm" onClick={() => onNavigate('logout')}>
                            <LogOut className="w-4 h-4 mr-2" /> Log Out
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1 space-y-2 h-fit sticky top-32">
                        {['Overview', 'Messages', 'Saved Suppliers', 'Settings'].map((item) => (
                            <button 
                                key={item}
                                onClick={() => { setActiveTab(item.toLowerCase()); setSelectedMessageId(null); }}
                                className={`w-full text-left px-6 py-4 rounded-xl font-tech font-bold text-sm transition-all duration-300 flex items-center justify-between group ${
                                    activeTab === item.toLowerCase() 
                                    ? 'bg-med-teal text-bone shadow-lg' 
                                    : 'bg-white hover:bg-white/80 text-ink/60 hover:text-retro-orange border border-transparent hover:border-med-teal/5'
                                }`}
                            >
                                <span>{item}</span>
                                <div className="flex items-center gap-2">
                                    {item === 'Messages' && unreadCount > 0 && (
                                        <span className="bg-retro-orange text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{unreadCount}</span>
                                    )}
                                    {activeTab === item.toLowerCase() && <div className="w-2 h-2 bg-retro-orange rounded-full animate-pulse"></div>}
                                </div>
                            </button>
                        ))}
                        
                        {isNewUser && isProfileDismissed && profileProgress < 100 && (
                            <div className="mt-8 p-4 bg-white rounded-2xl border border-med-teal/10 shadow-sm animate-[fadeIn_0.5s]">
                                <h4 className="font-tech font-bold text-xs uppercase text-med-teal mb-2">Setup Progress</h4>
                                <div className="w-full h-1.5 bg-bone rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-retro-orange rounded-full transition-all duration-1000" style={{ width: `${profileProgress}%` }}></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-ink/40">
                                    <span>{profileProgress}% Complete</span>
                                    <button className="text-retro-orange hover:underline" onClick={() => setIsProfileDismissed(false)}>Resume</button>
                                </div>
                            </div>
                        )}

                        {userPlan === 'Explorer' && (
                            <div className="mt-8 p-6 bg-gradient-to-br from-retro-orange to-retro-orange-light rounded-2xl text-white shadow-lg relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full mix-blend-overlay opacity-20 transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform"></div>
                                <h3 className="font-serif font-bold text-lg mb-2 relative z-10">Upgrade Plan</h3>
                                <p className="font-sans text-xs opacity-90 mb-4 relative z-10">Get unlimited RFQs and market reports.</p>
                                <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold font-tech backdrop-blur-sm transition-colors relative z-10" onClick={() => handleFeatureClick('Pro Dashboard', 'Catalyst')}>
                                    View Pricing
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-3 min-h-[500px]">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

const BarChart = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
    </svg>
);

export default UserDashboard;