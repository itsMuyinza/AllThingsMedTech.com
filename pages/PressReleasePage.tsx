import React, { useState } from 'react';
import { Send, CheckCircle, Rocket, BarChart, Users, FileText } from 'lucide-react';
import Button from '../components/UI/Button';
import ConstellationBackground from '../components/ConstellationBackground';

interface PressReleasePageProps {
    onNavigate: (page: string) => void;
}

const PressReleasePage: React.FC<PressReleasePageProps> = ({ onNavigate }) => {
    const [submitted, setSubmitted] = useState(false);

    const benefits = [
        { icon: <Rocket className="w-6 h-6 text-retro-orange" />, title: "Market Visibility", desc: "Reach 50,000+ monthly active medtech decision makers." },
        { icon: <BarChart className="w-6 h-6 text-med-teal" />, title: "SEO Authority", desc: "Permanent, high-authority backlink to your corporate site." },
        { icon: <Users className="w-6 h-6 text-retro-orange" />, title: "Lead Generation", desc: "Connect with potential OEM partners and investors." }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-bone pt-24 pb-20 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[50vh] opacity-30 pointer-events-none">
                 <ConstellationBackground speedFactor={0.5} particleCount={40} />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left: Content */}
                    <div>
                        <span className="inline-block py-1 px-3 rounded-full bg-med-teal/5 text-med-teal text-xs font-bold font-tech uppercase tracking-widest mb-6 border border-med-teal/10">
                            PR Distribution
                        </span>
                        <h1 className="font-serif font-black text-5xl md:text-7xl text-ink mb-6 leading-[0.9]">
                            Share Your <br/><span className="text-retro-orange">Breakthroughs.</span>
                        </h1>
                        <p className="font-sans text-xl text-ink/60 mb-12 leading-relaxed">
                            Get your news in front of the people who matter. From product launches to regulatory approvals, we ensure your message resonates across the medtech ecosystem.
                        </p>

                        <div className="space-y-8">
                            {benefits.map((b, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-med-teal/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        {b.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-serif font-bold text-lg text-ink">{b.title}</h3>
                                        <p className="font-sans text-sm text-ink/50">{b.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form Card */}
                    <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-med-teal/20 to-retro-orange/20 rounded-[40px] blur-xl opacity-50"></div>
                        <div className="relative bg-white/70 backdrop-blur-xl rounded-[32px] border border-white p-8 md:p-10 shadow-2xl">
                            {!submitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h2 className="font-serif font-bold text-2xl text-med-teal mb-4 flex items-center gap-2">
                                        <FileText className="w-6 h-6 text-retro-orange" /> Submit Release
                                    </h2>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold font-tech text-med-teal/50 uppercase mb-2">First Name</label>
                                            <input required type="text" className="w-full bg-bone/30 border border-med-teal/10 rounded-xl px-4 py-3 outline-none focus:border-retro-orange" placeholder="Jane" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold font-tech text-med-teal/50 uppercase mb-2">Last Name</label>
                                            <input required type="text" className="w-full bg-bone/30 border border-med-teal/10 rounded-xl px-4 py-3 outline-none focus:border-retro-orange" placeholder="Smith" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold font-tech text-med-teal/50 uppercase mb-2">Company Name</label>
                                        <input required type="text" className="w-full bg-bone/30 border border-med-teal/10 rounded-xl px-4 py-3 outline-none focus:border-retro-orange" placeholder="MedTech Innovators Inc." />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold font-tech text-med-teal/50 uppercase mb-2">PR Content (URL or Text)</label>
                                        <textarea required rows={4} className="w-full bg-bone/30 border border-med-teal/10 rounded-xl px-4 py-3 outline-none focus:border-retro-orange resize-none" placeholder="Paste your release or a link to it here..."></textarea>
                                    </div>

                                    <Button className="w-full py-4 shadow-xl" variant="primary" type="submit">
                                        Submit News <Send className="w-4 h-4 ml-2" />
                                    </Button>

                                    <p className="text-center text-[10px] text-ink/40">
                                        Our editorial team will review your submission within 24 hours.
                                    </p>
                                </form>
                            ) : (
                                <div className="text-center py-12 animate-[fadeInUp_0.5s_ease-out]">
                                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/20">
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h2 className="font-serif font-black text-3xl text-med-teal mb-4">News Received!</h2>
                                    <p className="font-sans text-ink/60 mb-8 leading-relaxed">
                                        Your press release has been submitted for editorial review. We will contact you at your work email shortly.
                                    </p>
                                    <Button variant="outline" onClick={() => onNavigate('home')}>Back to Home</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PressReleasePage;