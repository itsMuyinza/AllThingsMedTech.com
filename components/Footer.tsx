import React from 'react';
import { Linkedin, Twitter, Mail, Youtube } from 'lucide-react';

interface FooterProps {
    onNavigate?: (page: string, params?: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent, page: string, params?: any) => {
    e.preventDefault();
    if (onNavigate) onNavigate(page, params);
  };

  return (
    <footer className="bg-ink text-bone pt-20 pb-10 border-t-4 border-retro-orange relative overflow-hidden">
        {/* Big Background Text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-5">
        <span className="font-serif font-black text-[15vw] leading-none whitespace-nowrap text-bone">
          ALL THINGS MEDTECH
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10 mb-20">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex flex-col mb-6 cursor-pointer" onClick={(e) => handleLink(e, 'home')}>
            <span className="font-serif font-black text-xl tracking-tighter text-bone">ALL THINGS</span>
            <span className="font-tech font-bold text-lg tracking-widest text-retro-orange -mt-1">MEDTECH</span>
          </div>
          <p className="font-sans text-sm text-bone/60 leading-relaxed mb-6">
            Connecting medical device innovators with trusted industry partners. The future of health technology starts here.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 rounded-full border border-bone/20 flex items-center justify-center text-bone/60 hover:text-retro-orange hover:border-retro-orange transition-all">
                <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-bone/20 flex items-center justify-center text-bone/60 hover:text-retro-orange hover:border-retro-orange transition-all">
                <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-bone/20 flex items-center justify-center text-bone/60 hover:text-retro-orange hover:border-retro-orange transition-all">
                <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-bone/20 flex items-center justify-center text-bone/60 hover:text-retro-orange hover:border-retro-orange transition-all" title="Threads">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 24c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zm0-2c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm-3-11.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm6 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zM12 17c2.209 0 4-1.791 4-4h-8c0 2.209 1.791 4 4 4z"/>
                </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-tech font-bold text-retro-orange uppercase tracking-widest text-xs mb-6">Directory</h4>
          <ul className="space-y-3 font-sans text-sm text-bone/70">
            {[
                { label: 'Contract Manufacturing', cat: 'Contract Manufacturing' },
                { label: 'Design & Engineering', cat: 'Design & Engineering' },
                { label: 'Testing & Inspection', cat: 'Testing & Lab' },
                { label: 'Materials & Adhesives', cat: 'Supplies' },
                { label: 'Electronics', cat: 'Electronics' },
                { label: 'Packaging & Sterilization', cat: 'Packaging' }
            ].map(item => (
                <li key={item.label}>
                    <button onClick={(e) => handleLink(e, 'directory', { category: item.cat })} className="hover:text-white transition-colors text-left">
                        {item.label}
                    </button>
                </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-tech font-bold text-retro-orange uppercase tracking-widest text-xs mb-6">Resources</h4>
          <ul className="space-y-3 font-sans text-sm text-bone/70">
            {[
                { label: 'News & Analysis', view: 'news' },
                { label: 'White Papers', view: 'whitepapers' },
                { label: 'Events Calendar', view: 'events' },
                { label: 'Podcast Archive', view: 'podcasts' },
                { label: 'Regulatory Guides', view: 'whitepapers' },
                { label: 'Market Reports', view: 'whitepapers' }
            ].map(item => (
                <li key={item.label}>
                    <button onClick={(e) => handleLink(e, item.view)} className="hover:text-white transition-colors text-left">
                        {item.label}
                    </button>
                </li>
            ))}
          </ul>
        </div>

        <div>
           <h4 className="font-tech font-bold text-retro-orange uppercase tracking-widest text-xs mb-6">Contact</h4>
           <div className="flex items-start gap-3 mb-4 text-sm text-bone/70 font-sans">
              <Mail className="w-5 h-5 mt-0.5 text-med-teal-light" />
              <div className="flex flex-col gap-2">
                <a href="mailto:hello@allthingsmedtech.com" className="hover:text-retro-orange transition-colors">hello@allthingsmedtech.com</a>
                <a href="mailto:ads@allthingsmedtech.com" className="hover:text-retro-orange transition-colors">ads@allthingsmedtech.com</a>
              </div>
           </div>
           <button 
                onClick={(e) => handleLink(e, 'press-release')}
                className="w-full mt-4 border border-bone/20 py-2 rounded font-tech text-xs font-bold hover:bg-bone hover:text-ink transition-colors"
           >
              Submit a Press Release
           </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-bone/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-bone/40 font-tech">
         <p>&copy; {new Date().getFullYear()} All Things MedTech. All rights reserved.</p>
         <div className="flex gap-6 mt-4 md:mt-0">
            <button onClick={(e) => handleLink(e, 'about')} className="hover:text-white">Privacy Policy</button>
            <button onClick={(e) => handleLink(e, 'about')} className="hover:text-white">Terms of Service</button>
            <button onClick={(e) => handleLink(e, 'home')} className="hover:text-white">Sitemap</button>
         </div>
      </div>
    </footer>
  );
};

export default Footer;