import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ShieldCheck, Mail, CheckCircle, 
  Loader2, Calendar, MapPin, Ticket, Award, Star, 
  Lock, Check
} from 'lucide-react';
import Button from '../components/UI/Button';
import { allEvents, Event } from '../data/mockData';

interface EventRegistrationPageProps {
  id: number;
  onNavigate: (page: string, params?: any) => void;
  isLoggedIn?: boolean;
}

const EventRegistrationPage: React.FC<EventRegistrationPageProps> = ({ id, onNavigate, isLoggedIn = false }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketType, setTicketType] = useState<'free' | 'vip'>('free');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: isLoggedIn ? 'demo@medtech.com' : '',
    jobTitle: '',
    company: ''
  });

  useEffect(() => {
    const found = allEvents.find(e => e.id === Number(id));
    if (found) setEvent(found);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulation of network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (!event) return (
    <div className="min-h-screen flex items-center justify-center bg-bone pt-24">
      <Loader2 className="w-8 h-8 animate-spin text-med-teal" />
    </div>
  );

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-bone pt-40 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center animate-[fadeInUp_0.8s_ease-out]">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/20">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="font-serif font-black text-4xl md:text-5xl text-med-teal mb-4">You're In!</h1>
          <p className="font-sans text-xl text-ink/60 mb-12">
            Success! Your ticket for <strong>{event.name}</strong> has been sent to <span className="text-med-teal font-bold">{formData.email}</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" className="shadow-lg">Add to Calendar</Button>
            <Button variant="outline" onClick={() => onNavigate('events')}>Back to Events</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => onNavigate('events')}
          className="flex items-center text-ink/40 hover:text-med-teal transition-colors font-tech text-xs font-bold uppercase tracking-widest mb-12 group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Calendar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT COLUMN: ORDER SUMMARY */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-med-teal/5 animate-[fadeInUp_0.6s_ease-out]">
                <div className="h-48 relative overflow-hidden">
                    <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-med-teal/10"></div>
                </div>
                <div className="p-8">
                  <span className="text-[10px] font-bold font-tech text-retro-orange uppercase tracking-[0.2em] mb-3 block">{event.type}</span>
                  <h2 className="font-serif font-bold text-2xl text-med-teal mb-6 leading-tight">{event.name}</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 text-ink/60">
                      <Calendar className="w-5 h-5 text-retro-orange" />
                      <span className="font-sans text-sm font-medium">{event.date} • 09:00 AM</span>
                    </div>
                    <div className="flex items-center gap-4 text-ink/60">
                      <MapPin className="w-5 h-5 text-retro-orange" />
                      <span className="font-sans text-sm font-medium">{event.location}</span>
                    </div>
                  </div>

                  <div className="border-t border-ink/5 pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-ink/50">Registration Type</span>
                      <span className="text-sm font-bold text-ink uppercase tracking-wider">{ticketType === 'free' ? 'General Admission' : 'VIP Access'}</span>
                    </div>
                    <div className="flex justify-between items-center text-2xl font-bold">
                      <span className="font-serif text-med-teal">Total Cost</span>
                      <span className="font-tech text-retro-orange">{ticketType === 'free' ? '$0.00' : `$${event.price || 899}.00`}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/50 p-4 rounded-2xl border border-white flex items-center gap-3 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-[10px] font-bold font-tech uppercase text-ink/50 leading-tight">Secure SSL<br/>Encryption</span>
                    </div>
                    <div className="bg-white/50 p-4 rounded-2xl border border-white flex items-center gap-3 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-retro-orange/5 flex items-center justify-center">
                            <Award className="w-5 h-5 text-retro-orange" />
                        </div>
                        <span className="text-[10px] font-bold font-tech uppercase text-ink/50 leading-tight">Satisfaction<br/>Guaranteed</span>
                    </div>
                </div>
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-2xl border border-white/50 text-center">
                    <p className="text-[10px] text-ink/40 font-medium">Need help with registration? Contact <a href="mailto:events@allthingsmedtech.com" className="text-med-teal font-bold hover:underline">events@allthingsmedtech.com</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: REGISTRATION FORM */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-white relative overflow-hidden animate-[fadeInUp_0.8s_ease-out]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-med-teal/[0.02] rounded-full blur-3xl -mr-32 -mt-32"></div>
              
              <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                {/* Step 1: Contact Info */}
                <section>
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-ink/5">
                    <div className="w-10 h-10 bg-med-teal text-white rounded-full flex items-center justify-center font-serif font-bold">1</div>
                    <h3 className="font-serif font-bold text-2xl text-med-teal">Attendee Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold font-tech text-ink/40 uppercase tracking-widest">First Name</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.firstName}
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                        className="w-full bg-bone/50 border border-ink/5 rounded-xl px-5 py-4 text-sm focus:border-retro-orange focus:bg-white outline-none transition-all" 
                        placeholder="e.g. Sarah" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold font-tech text-ink/40 uppercase tracking-widest">Last Name</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.lastName}
                        onChange={e => setFormData({...formData, lastName: e.target.value})}
                        className="w-full bg-bone/50 border border-ink/5 rounded-xl px-5 py-4 text-sm focus:border-retro-orange focus:bg-white outline-none transition-all" 
                        placeholder="e.g. Jenkins" 
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-[10px] font-bold font-tech text-ink/40 uppercase tracking-widest">Work Email</label>
                      <div className="relative">
                        <input 
                          required 
                          type="email" 
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-bone/50 border border-ink/5 rounded-xl px-5 py-4 pl-12 text-sm focus:border-retro-orange focus:bg-white outline-none transition-all" 
                          placeholder="sarah@company.com" 
                        />
                        <Mail className="absolute left-4 top-4 w-5 h-5 text-ink/20" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold font-tech text-ink/40 uppercase tracking-widest">Job Title</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.jobTitle}
                        onChange={e => setFormData({...formData, jobTitle: e.target.value})}
                        className="w-full bg-bone/50 border border-ink/5 rounded-xl px-5 py-4 text-sm focus:border-retro-orange focus:bg-white outline-none transition-all" 
                        placeholder="e.g. VP of R&D" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold font-tech text-ink/40 uppercase tracking-widest">Company</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.company}
                        onChange={e => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-bone/50 border border-ink/5 rounded-xl px-5 py-4 text-sm focus:border-retro-orange focus:bg-white outline-none transition-all" 
                        placeholder="e.g. NeuroFlow Design" 
                      />
                    </div>
                  </div>
                </section>

                {/* Step 2: Ticket Selection */}
                <section>
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-ink/5">
                    <div className="w-10 h-10 bg-med-teal text-white rounded-full flex items-center justify-center font-serif font-bold">2</div>
                    <h3 className="font-serif font-bold text-2xl text-med-teal">Ticket Selection</h3>
                  </div>

                  <div className="space-y-4">
                    <label 
                      className={`block relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${ticketType === 'free' ? 'border-med-teal bg-med-teal/5' : 'border-ink/5 hover:border-med-teal/20'}`}
                      onClick={() => setTicketType('free')}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 shrink-0 ${ticketType === 'free' ? 'border-med-teal bg-med-teal' : 'border-ink/10'}`}>
                            {ticketType === 'free' && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <div>
                            <p className="font-serif font-bold text-lg text-med-teal">General Admission</p>
                            <p className="text-xs text-ink/50 mt-1 leading-relaxed">Full access to the main floor, expo booths, and breakout networking sessions.</p>
                          </div>
                        </div>
                        <span className="font-tech font-bold text-med-teal">FREE</span>
                      </div>
                    </label>

                    <label 
                      className={`block relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${ticketType === 'vip' ? 'border-retro-orange bg-retro-orange/5' : 'border-ink/5 hover:border-retro-orange/20'}`}
                      onClick={() => setTicketType('vip')}
                    >
                      <div className="absolute -top-3 right-6 bg-[#FF5500] text-white text-[9px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-current" /> RECOMMENDED
                      </div>
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 shrink-0 ${ticketType === 'vip' ? 'border-retro-orange bg-retro-orange' : 'border-ink/10'}`}>
                            {ticketType === 'vip' && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <div>
                            <p className="font-serif font-bold text-lg text-retro-orange">VIP Delegate</p>
                            <p className="text-xs text-ink/50 mt-1 leading-relaxed">Includes curated technical workshops, access to the VIP Executive Lounge, and private luncheon.</p>
                          </div>
                        </div>
                        <span className="font-tech font-bold text-retro-orange">${event.price || 899}.00</span>
                      </div>
                    </label>
                  </div>
                </section>

                {/* Step 3: submit */}
                <div className="pt-8 space-y-4">
                  <div className="flex items-center gap-2 text-ink/40 text-[10px] font-tech font-bold uppercase tracking-widest justify-center mb-2">
                    <Lock className="w-3 h-3" /> Secure checkout process
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full py-5 text-lg shadow-2xl !bg-[#FF5500] hover:!bg-[#E64A00] !text-white !border-none transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Processing Your Registration...
                      </span>
                    ) : (
                      'Complete Registration'
                    )}
                  </Button>
                  <p className="text-center text-[10px] text-ink/30 mt-4 leading-relaxed">
                    By clicking "Complete Registration", you agree to All Things MedTech's <span className="underline cursor-pointer hover:text-ink">Event Terms</span>, <span className="underline cursor-pointer hover:text-ink">Cancellation Policy</span>, and <span className="underline cursor-pointer hover:text-ink">Privacy Policy</span>.
                  </p>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventRegistrationPage;
