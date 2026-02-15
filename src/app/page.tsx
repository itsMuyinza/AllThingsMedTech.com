import Link from "next/link";
import { NewsService } from "@/services/newsService";
import NewsCard from "@/components/NewsCard";
import SearchBar from "@/components/SearchBar";
import FDATracker from "@/components/FDATracker";
import { companies } from "@/data/companies";

export default async function Home() {
  const latestNews = await NewsService.getLatestNews(3);
  const publicCompanies = companies.filter((c) => c.ticker);

  return (
    <main className="flex flex-col items-center pb-20">
      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center text-center mt-32 z-10">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-[var(--primary)] uppercase border border-[var(--primary-glow)] rounded-full bg-[rgba(6,182,212,0.1)]">
          The #1 Database for Medical Hardware
        </div>

        <h1 className="max-w-4xl mb-6">
          Connecting Engineers to the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
            Supply Chain of the Future
          </span>
        </h1>

        <p className="max-w-2xl text-lg text-[var(--text-muted)] mb-10 leading-relaxed font-light">
          Access 7,000+ verified suppliers, contract manufacturers, and component providers. From Nitinol stents to injection molding—find exactly what you need to build life-saving tech.
        </p>

        <SearchBar large />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-12 mt-20 border-t border-[var(--border-color)] pt-10">
          <div>
            <div className="text-3xl font-bold">{companies.length * 360}+</div>
            <div className="text-sm text-[var(--text-muted)] mt-1">Verified Suppliers</div>
          </div>
          <div>
            <div className="text-3xl font-bold">120k+</div>
            <div className="text-sm text-[var(--text-muted)] mt-1">Monthly Engineers</div>
          </div>
          <div>
            <div className="text-3xl font-bold">Daily</div>
            <div className="text-sm text-[var(--text-muted)] mt-1">Industry Briefings</div>
          </div>
        </div>
      </section>

      {/* Market Ticker */}
      <section className="w-full overflow-hidden mt-20 border-y border-[var(--border-color)] py-3 z-10">
        <div className="flex gap-10 animate-[scroll_30s_linear_infinite] whitespace-nowrap">
          {[...publicCompanies, ...publicCompanies].map((c, i) => (
            <span key={i} className="flex items-center gap-2 text-sm font-mono">
              <span className="font-bold text-[var(--text-main)]">{c.ticker}</span>
              <span className="text-[var(--text-muted)]">${c.stockPrice?.toFixed(2)}</span>
              <span className={(c.stockChange ?? 0) >= 0 ? "text-emerald-400" : "text-red-400"}>
                {(c.stockChange ?? 0) >= 0 ? "+" : ""}{c.stockChange?.toFixed(1)}%
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* Two-Column: News + FDA Tracker */}
      <section className="container mt-20 z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* News Column */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Daily MedTech News</h2>
                <p className="text-[var(--text-muted)]">Curated briefings on FDA approvals, M&A activity, and supply chain shifts.</p>
              </div>
              <Link href="/news" className="text-sm text-[var(--primary)] hover:underline flex items-center gap-2">
                View All <span>&rarr;</span>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {latestNews.length > 0 ? (
                latestNews.map((news) => <NewsCard key={news.id} news={news} />)
              ) : (
                <div className="col-span-2 text-center py-20 glass-card rounded-xl">
                  <p className="text-[var(--text-muted)]">No updates available at the moment.</p>
                </div>
              )}
            </div>
          </div>

          {/* FDA Tracker Sidebar */}
          <div>
            <FDATracker limit={8} />

            {/* Quick Links */}
            <div className="glass-card rounded-xl p-6 mt-6">
              <h3 className="text-lg font-bold mb-4">Explore</h3>
              <div className="space-y-2">
                <Link href="/directory" className="block py-2 px-3 text-sm rounded-lg hover:bg-white/5 transition-colors">
                  Supplier Directory &rarr;
                </Link>
                <Link href="/for-engineers" className="block py-2 px-3 text-sm rounded-lg hover:bg-white/5 transition-colors">
                  Video Series &rarr;
                </Link>
                <Link href="/intelligence" className="block py-2 px-3 text-sm rounded-lg hover:bg-white/5 transition-colors">
                  Market Intelligence &rarr;
                </Link>
                <Link href="/careers" className="block py-2 px-3 text-sm rounded-lg hover:bg-white/5 transition-colors">
                  MedTech Jobs &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
