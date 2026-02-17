"use client";
import React, { useState, useRef } from 'react';
import { Search, Check, Building2, ArrowRight, ShieldCheck, Zap, Globe, Loader2, Eye, EyeOff, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/UI/Button';
import NeuralBackground from '@/components/NeuralBackground';
import { allCompanies } from '@/data/mockData';

type TierKey = 'explorer' | 'catalyst' | 'titan';

interface TierConfig {
  name: string;
  key: TierKey;
  price: string;
  period: string;
  description: string;
  color: string;
  popular?: boolean;
  btnVariant: 'primary' | 'secondary' | 'outline';
  features: string[];
}

export default function JoinPage() {
  const router = useRouter();
  const [step, setStep] = useState<0 | 1 | 2>(0); // 0: Search, 1: Pricing, 2: Form
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<{name: string, isNew: boolean} | null>(null);
  const [selectedTier, setSelectedTier] = useState<TierConfig | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', jobTitle: '', password: '', companyName: '', website: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isExiting, setIsExiting] = useState(false);

  // Search Logic
  const filteredCompanies = searchQuery.length > 1
    ? allCompanies.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleCompanySelect = (name: string, isNew: boolean) => {
    setSelectedCompany({ name, isNew });
    setFormData(prev => ({ ...prev, companyName: name }));
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Real GHL + Stripe integration
  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) return;
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      // 1. Create contact in GHL
      const contactRes = await fetch('/api/ghl/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          companyName: selectedCompany?.name || formData.companyName,
          tier: selectedTier.key,
          source: 'join_page',
        }),
      });

      if (!contactRes.ok) {
        throw new Error('Failed to create account. Please try again.');
      }

      // 2. If paid tier, redirect to Stripe Checkout
      if (selectedTier.key !== 'explorer') {
        const checkoutRes = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tier: selectedTier.key,
            email: formData.email,
            companyName: selectedCompany?.name || formData.companyName,
          }),
        });

        const { url, error } = await checkoutRes.json();
        if (url) {
          setFormStatus('success');
          setTimeout(() => { window.location.href = url; }, 600);
          return;
        }
        if (error) throw new Error(error);
      }

      // 3. Free tier → redirect to success
      setFormStatus('success');
      setIsExiting(true);
      setTimeout(() => {
        router.push('/join/success?tier=explorer');
      }, 800);
    } catch (err) {
      setFormStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const tiers: TierConfig[] = [
    {
      name: "Explorer", key: "explorer", price: "Free", period: "Forever",
      description: "Essential visibility for startups and solo consultants.",
      color: "border-slate-300", btnVariant: "outline",
      features: ["Basic Directory Listing", "1 Lead Contact / Month", "Verified 'New Member' Badge", "Standard Search Placement"]
    },
    {
      name: "Catalyst", key: "catalyst", price: "$499", period: "/ year",
      description: "High-growth tools for firms scaling their operations.",
      color: "border-med-teal shadow-[0_0_30px_rgba(43,76,89,0.2)]", popular: true, btnVariant: "primary",
      features: ["Priority Search Ranking", "Video Header in Profile", "Add Photo and Video Media", "Unlimited Lead Contacts", "1 Featured Press Release / Mo"]
    },
    {
      name: "Titan", key: "titan", price: "$2,499", period: "/ year",
      description: "Dominant authority for global industry leaders.",
      color: "border-retro-orange shadow-[0_0_40px_rgba(214,90,49,0.3)]", btnVariant: "secondary",
      features: ["Verified 'Gold' Status", "Homepage Spotlight Feature", "Dedicated Account Manager", "1 Complimentary Marketing and AI Audit Session and Report", "Unlimited Press Releases", "Custom Lead Filtering"]
    }
  ];

  return (
    <div className="min-h-screen bg-bone pt-24 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <NeuralBackground />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* STEP 0: SEARCH / CLAIM */}
        {step === 0 && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center animate-[fadeInUp_0.8s_ease-out]">
            <span className="inline-block py-1 px-3 rounded-full bg-med-teal/5 text-med-teal text-xs font-bold font-tech uppercase tracking-widest mb-6 border border-med-teal/10">
              Partner Network
            </span>
            <h1 className="font-serif font-black text-5xl md:text-7xl text-med-teal mb-6 text-center">
              Claim Your Profile
            </h1>
            <p className="font-sans text-xl text-ink/60 max-w-2xl mx-auto text-center mb-12">
              Join 7,000+ verified companies. Search below to see if your company is already listed, or create a new profile.
            </p>

            <div className="w-full max-w-2xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-med-teal/20 via-retro-orange/20 to-med-teal/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white rounded-xl shadow-2xl p-2 flex items-center border border-med-teal/10">
                <Search className="ml-4 w-6 h-6 text-med-teal/50" />
                <input
                  type="text"
                  className="w-full p-4 text-lg outline-none font-sans text-ink placeholder-ink/30 bg-transparent"
                  placeholder="Search your company name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>

              {searchQuery.length > 1 && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-white/90 backdrop-blur-xl rounded-xl border border-med-teal/10 shadow-2xl overflow-hidden animate-[slideDown_0.2s_ease-out]">
                  {filteredCompanies.length > 0 && (
                    <div className="p-2">
                      <div className="px-4 py-2 text-xs font-bold font-tech text-med-teal uppercase opacity-50">Found Matches</div>
                      {filteredCompanies.map(c => (
                        <button
                          key={c.id}
                          onClick={() => handleCompanySelect(c.name, false)}
                          className="w-full text-left px-4 py-3 hover:bg-med-teal/5 rounded-lg flex items-center justify-between group/item transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-bone flex items-center justify-center border border-med-teal/10">
                              <Building2 className="w-4 h-4 text-med-teal" />
                            </div>
                            <span className="font-bold text-ink group-hover/item:text-med-teal">{c.name}</span>
                          </div>
                          <span className="text-xs font-bold text-retro-orange flex items-center gap-1">
                            Claim Profile <ArrowRight className="w-3 h-3" />
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="p-2 border-t border-med-teal/5 bg-med-teal/5">
                    <button
                      onClick={() => handleCompanySelect(searchQuery, true)}
                      className="w-full text-left px-4 py-3 hover:bg-white rounded-lg flex items-center justify-between group/new transition-colors border border-transparent hover:border-med-teal/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-retro-orange/10 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-retro-orange" />
                        </div>
                        <div>
                          <span className="font-bold text-ink block">Create &ldquo;{searchQuery}&rdquo;</span>
                          <span className="text-xs text-ink/50">Don&apos;t see your company? Add it now.</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-retro-orange opacity-0 group-hover/new:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 1: PRICING TIERS */}
        {step === 1 && (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="text-center mb-16">
              <button onClick={() => setStep(0)} className="text-sm font-bold font-tech text-ink/40 hover:text-retro-orange mb-4 transition-colors">
                &larr; Back to Search
              </button>
              <h2 className="font-serif font-black text-5xl text-med-teal mb-4">Select Your Plan</h2>
              <p className="font-sans text-xl text-ink/60">
                Claiming <span className="font-bold text-ink">{selectedCompany?.name}</span>. Choose your growth level.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {tiers.map((tier, idx) => (
                <PricingCard
                  key={tier.name}
                  tier={tier}
                  delay={idx * 100}
                  onSelect={() => { setSelectedTier(tier); setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                />
              ))}
            </div>

            <div className="mt-16 text-center max-w-3xl mx-auto bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-med-teal/5">
              <div className="flex items-center justify-center gap-2 mb-2 text-med-teal font-bold font-tech text-sm uppercase">
                <ShieldCheck className="w-4 h-4" /> Trusted by Industry Leaders
              </div>
              <div className="flex justify-center gap-8 opacity-50 grayscale">
                <span className="font-serif font-black text-xl">Stryker</span>
                <span className="font-serif font-black text-xl">Medtronic</span>
                <span className="font-serif font-black text-xl">Boston Scientific</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: REGISTRATION FORM (with real GHL + Stripe) */}
        {step === 2 && (
          <div className="max-w-xl mx-auto animate-[fadeIn_0.5s_ease-out]">
            <button onClick={() => setStep(1)} className="text-sm font-bold font-tech text-ink/40 hover:text-retro-orange mb-8 transition-colors">
              &larr; Back to Plans
            </button>

            <div
              className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12 relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
                isExiting ? 'scale-95 opacity-0 translate-x-[200px] -translate-y-[200px]' : 'scale-100 opacity-100'
              }`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-med-teal/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-serif font-bold text-3xl text-med-teal">Finalize Profile</h2>
                    <p className="text-ink/60 text-sm mt-1">Setup your <strong>{selectedTier?.name}</strong> account.</p>
                  </div>
                  <div className="w-12 h-12 bg-med-teal/5 rounded-full flex items-center justify-center text-med-teal font-serif font-bold text-xl">
                    {selectedCompany?.name[0]}
                  </div>
                </div>

                <form className="space-y-6" onSubmit={handleCompleteRegistration}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold font-tech text-med-teal/50 uppercase mb-2">First Name</label>
                      <input type="text" required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full bg-bone/50 border border-med-teal/10 rounded-xl px-4 py-3 outline-none focus:border-retro-orange transition-colors text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold font-tech text-med-teal/50 uppercase mb-2">Last Name</label>
                      <input type="text" required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full bg-bone/50 border border-med-teal/10 rounded-xl px-4 py-3 outline-none focus:border-retro-orange transition-colors text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold font-tech text-med-teal/50 uppercase mb-2">Work Email</label>
                    <div className="relative">
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-bone/50 border border-med-teal/10 rounded-xl px-4 py-3 outline-none focus:border-retro-orange transition-colors text-sm" placeholder="name@company.com" />
                      {selectedCompany && !selectedCompany.isNew && (
                        <div className="absolute right-3 top-3 text-green-600" title="Instant Verification">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-ink/40 mt-2 flex items-center gap-1">
                      <Globe className="w-3 h-3" /> Must match domain for instant verification.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold font-tech text-med-teal/50 uppercase mb-2">Create Password</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-bone/50 border border-med-teal/10 rounded-xl px-4 py-3 outline-none focus:border-retro-orange transition-colors text-sm" placeholder="8+ characters" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-ink/30 hover:text-ink">
                        {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                      </button>
                    </div>
                  </div>

                  {selectedTier && selectedTier.key !== 'explorer' && (
                    <div className="p-4 bg-med-teal/5 rounded-2xl flex gap-3 items-start">
                      <Info className="w-4 h-4 text-med-teal mt-0.5 shrink-0" />
                      <p className="text-[10px] text-med-teal/70 leading-relaxed">
                        You&apos;ll be redirected to our secure payment partner (Stripe) to complete your <strong>{selectedTier.price}/yr</strong> subscription. Cancel anytime from your dashboard.
                      </p>
                    </div>
                  )}

                  {formStatus === 'error' && errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-2">
                    <Button
                      className={`w-full py-4 shadow-xl transition-all duration-300 ${formStatus === 'success' ? '!bg-[#00cca0] !border-[#00cca0] text-white' : ''}`}
                      variant="primary"
                      type="submit"
                      disabled={formStatus === 'submitting' || formStatus === 'success'}
                    >
                      {formStatus === 'idle' && (
                        <>{selectedTier?.key === 'explorer' ? 'Complete Registration' : 'Proceed to Payment'} <ArrowRight className="w-4 h-4 ml-2" /></>
                      )}
                      {formStatus === 'submitting' && <Loader2 className="w-5 h-5 animate-spin mx-auto" />}
                      {formStatus === 'success' && <Check className="w-6 h-6 mx-auto animate-[bounce_0.5s_ease-out]" />}
                      {formStatus === 'error' && <>Try Again <ArrowRight className="w-4 h-4 ml-2" /></>}
                    </Button>
                    <p className="text-center text-[10px] text-ink/30 mt-3">
                      By registering, you agree to our Terms & Privacy Policy.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Interactive Pricing Card with mouse-tracking glow
function PricingCard({ tier, delay, onSelect }: { tier: TierConfig; delay: number; onSelect: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onSelect}
      className={`group relative bg-white/60 backdrop-blur-xl rounded-[32px] p-8 border border-white/40 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden ${tier.color} animate-[fadeInUp_0.8s_ease-out_forwards]`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="absolute bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-[300px] h-[300px] rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 z-0"
        style={{ left: 'var(--mouse-x)', top: 'var(--mouse-y)' }}
      />
      <div className="relative z-10 flex flex-col h-full">
        {tier.popular && (
          <div className="absolute -top-4 -right-4 bg-med-teal text-white text-[10px] font-bold font-tech px-3 py-1 rounded-bl-xl rounded-tr-xl shadow-lg">
            MOST POPULAR
          </div>
        )}
        <h3 className="font-serif font-bold text-3xl text-ink mb-2">{tier.name}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="font-tech font-bold text-4xl text-med-teal group-hover:text-retro-orange transition-colors duration-500">
            {tier.price}
          </span>
          <span className="text-sm text-ink/50">{tier.period}</span>
        </div>
        <p className="text-sm text-ink/70 font-sans mb-8 min-h-[40px] leading-relaxed">
          {tier.description}
        </p>
        <div className="space-y-4 mb-8 flex-1">
          {tier.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${tier.name === 'Titan' ? 'bg-retro-orange/10 text-retro-orange' : 'bg-med-teal/5 text-med-teal'}`}>
                <Check className="w-3 h-3" />
              </div>
              <span className="text-sm font-sans text-ink/80">{feat}</span>
            </div>
          ))}
        </div>
        <Button variant={tier.btnVariant} className="w-full justify-center group-hover:shadow-lg">
          Select Plan
        </Button>
      </div>
    </div>
  );
}
