import Link from "next/link";
import { companies, getRecentFDAActivity, getActiveTrials, getSectors } from "@/data/companies";
import FDATracker from "@/components/FDATracker";
import CompanyCard from "@/components/CompanyCard";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Market Intelligence" };

export default function IntelligencePage() {
  const publicCos = companies.filter((c) => c.ticker);
  const recentFunding = companies
    .filter((c) => c.fundingHistory.length > 0)
    .sort((a, b) => {
      const aDate = a.fundingHistory[a.fundingHistory.length - 1]?.date || "0";
      const bDate = b.fundingHistory[b.fundingHistory.length - 1]?.date || "0";
      return bDate.localeCompare(aDate);
    })
    .slice(0, 5);
  const activeTrials = getActiveTrials();
  const sectors = getSectors();

  return (
    <main className="container py-12 z-10 relative">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Market Intelligence</h1>
        <p className="text-[var(--text-muted)] text-lg">
          Real-time overview of the medtech ecosystem. FDA activity, funding rounds, clinical trials, and sector analysis.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {[
          { label: "Companies Tracked", value: companies.length },
          { label: "Public Companies", value: publicCos.length },
          { label: "Active Trials", value: activeTrials.length },
          { label: "FDA Devices", value: companies.reduce((sum, c) => sum + c.fdaDevices.length, 0) },
          { label: "Sectors", value: sectors.length },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-[var(--primary)]">{s.value}</div>
            <div className="text-xs text-[var(--text-muted)]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* FDA Tracker - Full */}
        <div>
          <FDATracker limit={15} />
        </div>

        {/* Recent Funding */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Funding Activity</h2>
          <div className="space-y-4">
            {recentFunding.map((c) => {
              const latest = c.fundingHistory[c.fundingHistory.length - 1];
              return (
                <Link key={c.id} href={`/company/${c.slug}`} className="block group">
                  <div className="py-3 border-b border-[var(--border-color)] last:border-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm group-hover:text-[var(--primary)] transition-colors">{c.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{latest.round} &middot; {latest.date}</p>
                      </div>
                      <span className="font-mono font-bold text-sm text-emerald-400">{latest.amount}</span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{latest.investors.slice(0, 3).join(", ")}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Active Clinical Trials */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Active Clinical Trials</h2>
          <div className="space-y-3">
            {activeTrials.slice(0, 10).map((t, i) => (
              <Link key={i} href={`/company/${t.companySlug}`} className="block group">
                <div className="py-2 border-b border-[var(--border-color)] last:border-0">
                  <p className="text-sm font-medium group-hover:text-[var(--primary)] transition-colors truncate">{t.name}</p>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span>{t.company}</span>
                    <span>&middot;</span>
                    <span>{t.phase}</span>
                    <span>&middot;</span>
                    <span className={t.status === "Recruiting" ? "text-[var(--primary)]" : "text-emerald-400"}>{t.status}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sector Breakdown */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Sector Breakdown</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sectors.map((sector) => {
            const count = companies.filter((c) => c.sector === sector).length;
            return (
              <Link key={sector} href={`/directory?q=${encodeURIComponent(sector)}`}>
                <div className="glass-card rounded-xl p-4 hover:border-[var(--primary-glow)] transition-all duration-300 group">
                  <div className="text-sm font-medium group-hover:text-[var(--primary)] transition-colors">{sector}</div>
                  <div className="text-xs text-[var(--text-muted)]">{count} {count === 1 ? "company" : "companies"}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
