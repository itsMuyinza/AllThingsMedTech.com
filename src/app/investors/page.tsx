import Link from "next/link";
import { companies } from "@/data/companies";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Investor Hub - Deal Flow" };

export default function InvestorsPage() {
  const publicCos = companies.filter((c) => c.ticker && c.stockPrice);
  const acquired = companies.filter((c) => c.stage === "Acquired");
  const funded = companies
    .filter((c) => c.stage !== "Public" && c.stage !== "Acquired" && c.fundingHistory.length > 0)
    .sort((a, b) => {
      const aLast = a.fundingHistory[a.fundingHistory.length - 1];
      const bLast = b.fundingHistory[b.fundingHistory.length - 1];
      return (bLast?.date || "").localeCompare(aLast?.date || "");
    });

  return (
    <main className="container py-12 z-10 relative">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Investor Hub</h1>
        <p className="text-[var(--text-muted)] text-lg">
          Track medtech deal flow, recent funding rounds, IPOs, and acquisitions.
        </p>
      </div>

      {/* Public Companies Watchlist */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Public Companies</h2>
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-6 py-3 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider border-b border-[var(--border-color)]">
            <span>Company</span>
            <span>Ticker</span>
            <span>Sector</span>
            <span className="text-right">Price</span>
            <span className="text-right">Change</span>
          </div>
          {publicCos.map((c) => (
            <Link key={c.id} href={`/company/${c.slug}`}>
              <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-[var(--border-color)] hover:bg-white/5 transition-colors">
                <span className="font-medium text-sm">{c.name}</span>
                <span className="font-mono text-sm text-[var(--text-muted)]">{c.ticker}</span>
                <span className="text-sm text-[var(--text-muted)] truncate">{c.sector}</span>
                <span className="font-mono text-sm text-right">${c.stockPrice?.toFixed(2)}</span>
                <span className={`font-mono text-sm text-right ${(c.stockChange ?? 0) >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {(c.stockChange ?? 0) >= 0 ? "+" : ""}{c.stockChange?.toFixed(1)}%
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Rounds */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Trending Rounds</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {funded.map((c) => {
            const latest = c.fundingHistory[c.fundingHistory.length - 1];
            return (
              <Link key={c.id} href={`/company/${c.slug}`}>
                <div className="glass-card rounded-xl p-6 hover:border-[var(--primary-glow)] transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold group-hover:text-[var(--primary)] transition-colors">{c.name}</h3>
                      <p className="text-xs text-[var(--text-muted)]">{c.sector}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-emerald-400">{latest.amount}</div>
                      <div className="text-xs text-[var(--text-muted)]">{latest.round}</div>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-3">{c.description}</p>
                  <div className="text-xs text-[var(--text-muted)]">
                    Investors: {latest.investors.join(", ")}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Exits */}
      {acquired.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Exits & Acquisitions</h2>
          <div className="space-y-4">
            {acquired.map((c) => {
              const acqRound = c.fundingHistory.find((f) => f.round === "Acquisition");
              return (
                <Link key={c.id} href={`/company/${c.slug}`}>
                  <div className="glass-card rounded-xl p-6 hover:border-[var(--primary-glow)] transition-all duration-300 group">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold group-hover:text-[var(--primary)] transition-colors">{c.name}</h3>
                        <p className="text-sm text-[var(--text-muted)]">{c.sector}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-xl text-[var(--primary)]">{acqRound?.amount || c.totalFunding}</div>
                        <div className="text-xs text-[var(--text-muted)]">Acquired by {acqRound?.investors.join(", ")}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
