"use client";
import Hero from '@/components/Hero';
import NewsSection from '@/components/NewsSection';
import DirectorySection from '@/components/DirectorySection';
import PodcastSection from '@/components/PodcastSection';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Editorial News Hub */}
      <NewsSection />

      <DirectorySection />
      <PodcastSection />

      {/* Knowledge Base Teaser Section */}
      <section className="py-24 bg-bone/50 border-t border-med-teal/5">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="font-serif font-bold text-4xl text-med-teal mb-6">Knowledge is Power</h2>
          <p className="font-sans text-xl text-ink/70 mb-10 max-w-xl mx-auto leading-relaxed">
            Access our library of expert white papers, technical webinars, and regulatory case studies to drive your next innovation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/whitepapers"
              className="px-10 py-4 bg-ink text-bone font-bold font-tech rounded-xl hover:bg-retro-orange transition-all shadow-lg active:scale-95"
            >
              Browse White Papers
            </Link>
            <Link
              href="/events?filter=Webinar"
              className="px-10 py-4 bg-white border border-ink/10 text-ink font-bold font-tech rounded-xl hover:bg-med-teal hover:text-white hover:border-transparent transition-all shadow-sm active:scale-95"
            >
              Upcoming Webinars
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
