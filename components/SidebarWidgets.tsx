import React, { useState } from 'react';
import { Vote, History, ArrowRight, Check, Mail, TrendingUp, Megaphone, ExternalLink, Calendar } from 'lucide-react';

export const JoinEventWidget: React.FC<{onNavigate?: (page: string) => void}> = ({ onNavigate }) => {
  return (
    <div className="bg-bone/50 rounded-2xl p-6 border border-med-teal/10 mb-10 group relative overflow-hidden">
      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-retro-orange/5 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-retro-orange" />
        <span className="font-tech font-bold text-xs uppercase text-med-teal tracking-widest">Live Events</span>
      </div>
      <h3 className="font-serif font-bold text-lg text-ink mb-2 leading-tight">Join the Community</h3>
      <p className="font-sans text-xs text-ink/60 mb-6">
        Register for our upcoming virtual summits and regional networking hubs.
      </p>
      <button 
        onClick={() => onNavigate && onNavigate('events')}
        className="w-full py-3 bg-med-teal text-white rounded-xl font-bold font-tech text-[10px] uppercase tracking-widest hover:bg-retro-orange transition-colors flex items-center justify-center gap-2"
      >
        View Calendar <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};

export const MostPopularWidget: React.FC = () => {
  const popular = [
    { id: 1, title: "Medtronic gets FDA clearance for smart insulin pen app" },
    { id: 2, title: "Inspire appoints Matt Osberg as CFO" },
    { id: 3, title: "Edwards calls off JenaValve buyout after court halts deal" },
    { id: 4, title: "Illumina names former NIH genomics director as chief medical officer" }
  ];

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4 border-t-2 border-med-teal/10 pt-2">
        <TrendingUp className="w-4 h-4 text-retro-orange" />
        <h3 className="font-tech font-bold text-xs uppercase tracking-widest text-ink">Most Popular Today</h3>
      </div>
      <div className="space-y-4">
        {popular.map((item, idx) => (
          <div key={item.id} className="flex gap-4 group cursor-pointer pb-4 border-b border-ink/5 last:border-0">
            <span className="text-2xl font-serif font-black text-med-teal/10 group-hover:text-retro-orange/20 transition-colors">
              {idx + 1}
            </span>
            <h4 className="font-serif font-bold text-sm text-ink leading-tight group-hover:text-retro-orange transition-colors">
              {item.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CompanyAnnouncementsWidget: React.FC = () => {
  const announcements = [
    { company: "Stryker", text: "New R&D facility opens in Ireland" },
    { company: "Baxter", text: "Quarterly dividend declared" },
    { company: "Zimmer", text: "Partners with Apple for recovery app" }
  ];

  return (
    <div className="bg-bone/50 rounded-2xl p-6 border border-med-teal/5 mb-10">
      <div className="flex items-center gap-2 mb-4">
        <Megaphone className="w-4 h-4 text-med-teal" />
        <span className="font-tech font-bold text-xs uppercase text-med-teal tracking-widest">Company Ticker</span>
      </div>
      <div className="space-y-4">
        {announcements.map((item, idx) => (
          <div key={idx} className="group cursor-pointer">
            <span className="text-[10px] font-bold text-retro-orange font-tech uppercase">{item.company}</span>
            <p className="font-sans text-xs text-ink/70 group-hover:text-ink transition-colors flex items-center justify-between">
              {item.text}
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PollWidget: React.FC = () => {
    const [voted, setVoted] = useState(false);
    const [selected, setSelected] = useState<number | null>(null);

    const options = [
        { id: 1, label: "Generative AI", votes: 45 },
        { id: 2, label: "Robotic Surgery", votes: 32 },
        { id: 3, label: "Remote Monitoring", votes: 23 }
    ];

    return (
        <div className="bg-white rounded-2xl p-6 border border-med-teal/5 shadow-sm overflow-hidden relative mb-10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-retro-orange/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
            <div className="flex items-center gap-2 mb-4">
                <Vote className="w-4 h-4 text-retro-orange" />
                <span className="font-tech font-bold text-xs uppercase text-med-teal tracking-widest">Industry Poll</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-ink mb-6">Which technology will have the biggest impact in 2025?</h3>
            
            <div className="space-y-3">
                {options.map((opt) => (
                    <button 
                        key={opt.id}
                        onClick={() => { setSelected(opt.id); setVoted(true); }}
                        disabled={voted}
                        className={`w-full text-left p-3 rounded-xl border font-sans text-sm transition-all relative overflow-hidden ${
                            voted 
                            ? selected === opt.id ? 'border-retro-orange bg-retro-orange/5' : 'border-ink/5 bg-bone/30'
                            : 'border-ink/5 hover:border-med-teal/30 hover:bg-bone/50'
                        }`}
                    >
                        <div className="relative z-10 flex justify-between items-center">
                            <span>{opt.label}</span>
                            {voted && <span className="font-bold text-med-teal">{opt.votes}%</span>}
                        </div>
                        {voted && (
                            <div 
                                className={`absolute inset-0 bg-med-teal/5 transition-all duration-1000 ease-out`}
                                style={{ width: `${opt.votes}%` }}
                            ></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const OnThisDayWidget: React.FC = () => {
    const historicalEvent = {
        date: "Oct 16, 1958",
        title: "The First Implantable Pacemaker",
        fact: "Rune Elmqvist developed the first implantable cardiac pacemaker at Karolinska Hospital in Stockholm. It was the size of a hockey puck.",
        impact: "Revolutionized cardiac care forever."
    };

    return (
        <div className="bg-med-teal text-bone rounded-2xl p-6 shadow-lg relative overflow-hidden group mb-10">
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-retro-orange/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="flex items-center gap-2 mb-4">
                <History className="w-4 h-4 text-retro-orange" />
                <span className="font-tech font-bold text-xs uppercase tracking-widest text-bone/60">On This Day</span>
            </div>
            <div className="mb-4">
                <span className="font-tech font-bold text-retro-orange text-lg">{historicalEvent.date}</span>
                <h3 className="font-serif font-bold text-xl leading-tight mt-1">{historicalEvent.title}</h3>
            </div>
            <p className="font-sans text-xs text-bone/70 leading-relaxed mb-6 italic">
                "{historicalEvent.fact}"
            </p>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-tech font-bold text-bone/40 uppercase">MedTech History</span>
                <ArrowRight className="w-4 h-4 text-retro-orange group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    );
};

export const NewsletterWidget: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-med-teal/5 shadow-sm relative overflow-hidden group mb-10">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-med-teal/5 rounded-full blur-2xl"></div>
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-4 h-4 text-med-teal" />
        <span className="font-tech font-bold text-xs uppercase text-med-teal tracking-widest">MedTech Brief</span>
      </div>
      <h3 className="font-serif font-bold text-lg text-ink mb-3 leading-tight">The industry's most essential 5-minute read.</h3>
      <form onSubmit={handleSubscribe} className="space-y-3">
        <input 
          type="email" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work Email"
          className="w-full bg-bone/30 border border-med-teal/10 rounded-xl px-4 py-3 text-sm text-ink placeholder-ink/40 focus:outline-none focus:border-retro-orange transition-colors"
        />
        <button 
          type="submit"
          className={`w-full py-3 rounded-xl font-bold font-tech text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            subscribed ? 'bg-green-500 text-white' : 'bg-ink text-white hover:bg-retro-orange'
          }`}
        >
          {subscribed ? <><Check className="w-4 h-4"/> Sent</> : 'Subscribe Free'}
        </button>
      </form>
    </div>
  );
};
