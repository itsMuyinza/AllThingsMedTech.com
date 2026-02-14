import React from 'react';
import Button from '../components/UI/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-serif font-black text-6xl text-med-teal mb-8 text-center">Our Mission</h1>
        <p className="font-sans text-2xl text-ink/70 text-center leading-relaxed mb-20">
            To accelerate medical innovation by connecting the visionaries who dream it with the partners who can build it.
        </p>
        
        <div className="prose prose-lg mx-auto font-sans text-ink/80">
            <h3 className="font-serif text-3xl text-med-teal font-bold mb-4">Why We Exist</h3>
            <p className="mb-8">
                The medical device industry is fragmented. finding a qualified injection molder, a regulatory consultant specialized in 510(k) submissions, or the latest news on biocompatible materials shouldn't take weeks of searching. All Things MedTech was born from the need to unify this ecosystem into a single, elegant nexus.
            </p>

            <h3 className="font-serif text-3xl text-med-teal font-bold mb-4">For Innovators</h3>
            <p className="mb-8">
                Whether you are a startup founder in a garage or an R&D director at a Fortune 500 company, we provide the intelligence and connections you need to navigate the complex path from concept to commercialization.
            </p>

            <h3 className="font-serif text-3xl text-med-teal font-bold mb-4">For Suppliers</h3>
            <p className="mb-12">
                We showcase the capabilities of the best service providers in the industry, helping them connect with high-intent buyers who value quality and compliance above all else.
            </p>
        </div>

        <div className="bg-med-teal text-bone rounded-3xl p-12 text-center mt-20 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="relative z-10">
                <h3 className="font-serif font-bold text-4xl mb-6">Join the Community</h3>
                <p className="mb-8 max-w-lg mx-auto opacity-80">
                    Be part of the fastest growing network of medical device professionals.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        className="px-8 py-3 bg-retro-orange text-white font-bold font-tech rounded-xl uppercase tracking-wide hover:bg-white hover:text-retro-orange transition-colors duration-300 shadow-lg"
                    >
                        List Your Company
                    </button>
                    <button 
                        className="px-8 py-3 bg-transparent border border-white/40 text-white font-bold font-tech rounded-xl uppercase tracking-wide hover:bg-white hover:text-med-teal hover:border-white transition-colors duration-300"
                    >
                        Contact Us
                    </button>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;