"use client";
import React, { useRef } from 'react';
import { Microscope, Activity, Box, PenTool, Truck, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const DirectorySection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const current = scrollRef.current;
      const scrollAmount = 300;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const categories = [
    { name: 'R&D Services', icon: <PenTool className="w-6 h-6" />, count: 120, filterName: 'R&D' },
    { name: 'Manufacturing', icon: <Box className="w-6 h-6" />, count: 340, filterName: 'Manufacturing' },
    { name: 'Testing & Lab', icon: <Microscope className="w-6 h-6" />, count: 85, filterName: 'Testing & Lab' },
    { name: 'Logistics', icon: <Truck className="w-6 h-6" />, count: 45, filterName: 'Logistics' },
    { name: 'Regulatory', icon: <ShieldCheck className="w-6 h-6" />, count: 60, filterName: 'Regulatory' },
    { name: 'Components', icon: <Activity className="w-6 h-6" />, count: 210, filterName: 'Components' },
  ];

  const featuredCompanies = [
    { name: 'NanoPrecise', type: 'Micro-Molding', color: 'bg-indigo-900', id: 1 },
    { name: 'SterilePro', type: 'Sterilization', color: 'bg-emerald-800', id: 3 },
    { name: 'BioLogics', type: 'Biomaterials', color: 'bg-blue-900', id: 2 },
    { name: 'RapidForm', type: 'Prototyping', color: 'bg-orange-800', id: 8 },
    { name: 'MedPack', type: 'Packaging', color: 'bg-slate-800', id: 4 },
  ];

  return (
    <section id="directory" className="py-20 bg-white relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2B4C59 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-4xl text-med-teal mb-4">Sourcing Directory</h2>
          <p className="font-sans text-ink/60 max-w-2xl mx-auto">
            Browse our curated list of {categories.reduce((acc, curr) => acc + curr.count, 0)}+ verified suppliers and service providers.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {categories.map((cat) => (
            <Link
                key={cat.name}
                href={`/directory?category=${encodeURIComponent(cat.filterName)}`}
                className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-bone border border-med-teal/5 hover:border-retro-orange/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-med-teal/5 text-med-teal flex items-center justify-center mb-4 group-hover:bg-retro-orange group-hover:text-white transition-colors">
                {cat.icon}
              </div>
              <h3 className="font-tech font-bold text-sm text-center text-ink group-hover:text-retro-orange transition-colors">{cat.name}</h3>
              <span className="text-xs text-ink/40 mt-1">{cat.count} Suppliers</span>
            </Link>
          ))}
        </div>

        {/* Featured Carousel */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif font-bold text-2xl text-ink flex items-center gap-2">
              <span className="w-2 h-8 bg-retro-orange rounded-full"></span>
              Featured Partners
            </h3>
            <div className="flex gap-2">
              <button onClick={() => scroll('left')} className="p-2 rounded-full border border-ink/10 hover:bg-med-teal hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll('right')} className="p-2 rounded-full border border-ink/10 hover:bg-med-teal hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredCompanies.map((company, idx) => (
              <div key={idx} className="snap-start min-w-[280px] h-[360px] bg-bone rounded-2xl p-6 border border-med-teal/10 flex flex-col justify-between group hover:border-retro-orange/50 transition-colors shadow-sm relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 ${company.color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-700`}></div>

                <div className="z-10">
                    <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 font-serif font-bold text-2xl text-med-teal border border-med-teal/5">
                        {company.name[0]}
                    </div>
                    <span className="inline-block px-3 py-1 bg-med-teal/5 text-med-teal text-xs font-bold font-tech rounded-full mb-3">
                        {company.type}
                    </span>
                    <h4 className="font-serif font-bold text-2xl text-ink mb-2">{company.name}</h4>
                    <p className="font-sans text-sm text-ink/60 line-clamp-3">
                        Leading provider of {company.type.toLowerCase()} solutions for medical device OEMs. ISO 13485 certified facility.
                    </p>
                </div>

                <div className="z-10">
                    <Link
                        href={`/directory/${company.id}`}
                        className="block w-full py-3 rounded-lg border border-ink/10 font-tech text-sm font-bold text-ink hover:bg-med-teal hover:text-white hover:border-med-teal transition-all text-center"
                    >
                        View Profile
                    </Link>
                </div>
              </div>
            ))}
             {/* CTA Card in Carousel */}
             <div className="snap-start min-w-[280px] h-[360px] bg-med-teal rounded-2xl p-6 flex flex-col justify-center items-center text-center text-bone">
                <h4 className="font-serif font-bold text-2xl mb-4">Want to be listed here?</h4>
                <p className="font-sans text-sm text-bone/70 mb-6">Reach 50,000+ medtech professionals monthly.</p>
                <Link
                    href="/join"
                    className="bg-retro-orange hover:bg-white hover:text-retro-orange text-white px-6 py-3 rounded-lg font-bold font-tech transition-colors"
                >
                    Join Directory
                </Link>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorySection;
