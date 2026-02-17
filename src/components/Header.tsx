"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, Search, X, ChevronDown, User } from 'lucide-react';
import Button from './UI/Button';
import Logo from './Logo';

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Wire to real auth state from GHL/session
  const isLoggedIn = false;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      router.push(`/directory?query=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const currentView = pathname.split('/')[1] || 'home';

  const navLinks = [
    { name: 'Directory', href: '/directory', hasMega: true },
    { name: 'News', href: '/news', hasMega: false },
    { name: 'Podcasts', href: '/podcasts', hasMega: false },
    { name: 'Resources', href: '/whitepapers', hasMega: false },
    { name: 'Events', href: '/events', hasMega: false },
    { name: 'About', href: '/about', hasMega: false },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-bone/70 backdrop-blur-xl border-med-teal/5 py-2 shadow-sm'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 select-none group">
          <Logo className="w-10 h-10 md:w-12 md:h-12 group-hover:rotate-90 transition-transform duration-700 ease-in-out" />
          <div className="flex flex-col leading-none">
            <span className="font-serif font-black text-xl tracking-tighter text-med-teal group-hover:text-retro-orange transition-colors duration-300">
              ALL THINGS
            </span>
            <span className="font-tech font-bold text-lg tracking-widest text-retro-orange -mt-1 group-hover:text-med-teal transition-colors duration-300">
              MEDTECH
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => link.hasMega && setActiveMegaMenu(link.name)}
              onMouseLeave={() => link.hasMega && setActiveMegaMenu(null)}
            >
              <Link
                href={link.href}
                className={`flex items-center text-sm font-tech font-bold transition-all duration-300 uppercase tracking-wide relative overflow-hidden group-hover:text-retro-orange ${
                  currentView === link.name.toLowerCase()
                    ? 'text-retro-orange'
                    : 'text-ink/70'
                }`}
              >
                {link.name}
                {link.hasMega && <ChevronDown className="w-4 h-4 ml-1 opacity-50" />}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-retro-orange transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </Link>

              {/* Mega Menu for Directory */}
              {link.hasMega && activeMegaMenu === link.name && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[600px] opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]">
                  <div className="bg-bone/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-med-teal/10 p-6 grid grid-cols-3 gap-6 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-med-teal via-retro-orange to-med-teal animate-pulse"></div>

                    <div className="space-y-3">
                      <h4 className="font-serif font-bold text-med-teal text-lg">Supplies</h4>
                      <ul className="space-y-2 text-sm text-ink/70">
                        {['Adhesives', 'Cleanroom', 'Components', 'Materials', 'Packaging'].map(i => (
                          <li key={i}>
                            <Link href={`/directory?category=${encodeURIComponent(i)}`} className="hover:text-retro-orange transition-colors block py-1 hover:translate-x-1 duration-200">
                              {i}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-serif font-bold text-med-teal text-lg">Services</h4>
                      <ul className="space-y-2 text-sm text-ink/70">
                        {['Consulting', 'Contract Mfg', 'Design & R&D', 'Legal', 'Testing'].map(i => (
                          <li key={i}>
                            <Link href={`/directory?category=${encodeURIComponent(i)}`} className="hover:text-retro-orange transition-colors block py-1 hover:translate-x-1 duration-200">
                              {i}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-span-1 bg-gradient-to-br from-med-teal/5 to-retro-orange/5 rounded-xl p-4 flex flex-col justify-center text-center border border-med-teal/10 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-retro-orange/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl"></div>
                      <p className="font-tech text-xs text-retro-orange font-bold mb-2 relative z-10">FEATURED</p>
                      <p className="font-serif italic text-ink mb-3 relative z-10">Innovation in 3D Printing</p>
                      <span className="text-xs text-ink/50 underline cursor-pointer relative z-10 hover:text-med-teal">View Guide</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full border transition-all hover:scale-110 ${isSearchOpen ? 'bg-retro-orange text-white border-retro-orange' : 'border-med-teal/20 text-med-teal hover:border-retro-orange hover:text-retro-orange'}`}
            >
              {isSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>
            {isSearchOpen && (
              <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-med-teal/10 p-3 animate-[slideDown_0.2s_ease-out]">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                  placeholder="Search & Press Enter..."
                  className="w-full bg-bone border border-med-teal/5 rounded-lg px-3 py-2 text-sm outline-none focus:border-retro-orange placeholder:text-ink/30"
                />
              </div>
            )}
          </div>

          <div className="hidden md:block h-6 w-px bg-med-teal/20"></div>

          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button variant="primary" size="sm" className="hidden md:inline-flex shadow-retro-orange/20">
                <User className="w-4 h-4 mr-1" /> Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="hidden md:inline-flex px-3" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/join">
                <Button variant="primary" size="sm" className="hidden md:inline-flex shadow-retro-orange/20">
                  Join
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-ink"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-bone/95 backdrop-blur-xl border-b border-med-teal/10 shadow-xl p-6 md:hidden flex flex-col space-y-4 animate-[slideDown_0.3s_ease-out]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-serif text-med-teal font-bold text-left hover:text-retro-orange transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-med-teal/10 flex flex-col gap-3">
            <Link href={isLoggedIn ? '/dashboard' : '/login'} onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">{isLoggedIn ? 'Dashboard' : 'Log In'}</Button>
            </Link>
            {!isLoggedIn && (
              <Link href="/join" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">Sign Up Free</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
