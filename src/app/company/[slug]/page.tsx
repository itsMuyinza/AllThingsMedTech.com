import { notFound } from "next/navigation";
import Link from "next/link";
import { companies, getCompanyBySlug } from "@/data/companies";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) return { title: "Company Not Found" };
  return { title: `${company.name} - Company Profile` };
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const statusColor: Record<string, string> = {
    Cleared: "text-emerald-400 border-emerald-400/30",
    Approved: "text-emerald-400 border-emerald-400/30",
    Pending: "text-amber-400 border-amber-400/30",
    Breakthrough: "text-[var(--primary)] border-[var(--primary-glow)]",
  };

  return (
    <main className="container py-12 z-10 relative">
      {/* Header */}
      <div className="glass-card rounded-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{company.name}</h1>
              {company.ticker && (
                <span className="text-sm font-mono px-2 py-0.5 rounded bg-white/10 text-[var(--text-muted)]">
                  {company.ticker}
                </span>
              )}
            </div>
            <p className="text-[var(--text-muted)] text-lg max-w-3xl mb-4">{company.description}</p>
            <div className="flex flex-wrap gap-2">
              {company.badges.map((b) => (
                <span key={b} className="text-xs font-bold px-3 py-1 rounded-full border border-[var(--primary-glow)] text-[var(--primary)] bg-[rgba(6,182,212,0.1)]">
                  {b}
                </span>
              ))}
            </div>
          </div>
          {company.stockPrice && (
            <div className="text-right glass-card rounded-xl p-4 min-w-[140px]">
              <div className="text-2xl font-mono font-bold">${company.stockPrice.toFixed(2)}</div>
              <div className={`text-sm font-mono ${(company.stockChange ?? 0) >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {(company.stockChange ?? 0) >= 0 ? "+" : ""}{company.stockChange?.toFixed(1)}%
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1">Market Data</div>
            </div>
          )}
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Headquarters", value: company.hq },
          { label: "CEO", value: company.ceo },
          { label: "Founded", value: String(company.founded) },
          { label: "Employees", value: company.employees },
          { label: "Sector", value: company.sector },
          { label: "Therapeutic Area", value: company.therapeuticArea },
          { label: "Stage", value: company.stage },
          { label: "Total Funding", value: company.totalFunding },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-4">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">{stat.label}</div>
            <div className="text-sm font-medium">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* FDA Devices */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Regulatory Pipeline
          </h2>
          {company.fdaDevices.length > 0 ? (
            <div className="space-y-3">
              {company.fdaDevices.map((d, i) => (
                <div key={i} className="flex items-start justify-between py-3 border-b border-[var(--border-color)] last:border-0">
                  <div>
                    <p className="font-medium text-sm">{d.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {d.code} &middot; Class {d.class} &middot; {new Date(d.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded border ${statusColor[d.status] || "text-gray-400 border-gray-600"}`}>
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--text-muted)]">No FDA device listings yet.</p>
          )}
        </div>

        {/* Funding History */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Funding History</h2>
          {company.fundingHistory.length > 0 ? (
            <div className="space-y-3">
              {company.fundingHistory.map((f, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--border-color)] last:border-0">
                  <div>
                    <p className="font-medium text-sm">{f.round}</p>
                    <p className="text-xs text-[var(--text-muted)]">{f.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-sm">{f.amount}</p>
                    <p className="text-xs text-[var(--text-muted)]">{f.investors.slice(0, 2).join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--text-muted)]">No public funding data.</p>
          )}
        </div>

        {/* Clinical Trials */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Clinical Trials</h2>
          {company.clinicalTrials.length > 0 ? (
            <div className="space-y-3">
              {company.clinicalTrials.map((t, i) => (
                <div key={i} className="py-3 border-b border-[var(--border-color)] last:border-0">
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-sm">{t.name}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${t.status === "Recruiting" ? "text-[var(--primary)] bg-[rgba(6,182,212,0.1)]" : t.status === "Completed" ? "text-emerald-400 bg-emerald-400/10" : "text-[var(--text-muted)] bg-white/5"}`}>
                      {t.status}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{t.phase} &middot; {t.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--text-muted)]">No active clinical trials.</p>
          )}
        </div>

        {/* Open Positions */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Open Positions</h2>
          {company.jobs.length > 0 ? (
            <div className="space-y-3">
              {company.jobs.map((j, i) => (
                <div key={i} className="py-3 border-b border-[var(--border-color)] last:border-0">
                  <p className="font-medium text-sm">{j.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{j.department} &middot; {j.location}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs font-mono text-emerald-400">{j.salary}</span>
                    {j.equity !== "None" && (
                      <span className="text-xs text-[var(--text-muted)]">+ {j.equity}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {j.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[var(--text-muted)]">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--text-muted)]">No open positions listed.</p>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/directory" className="text-sm text-[var(--primary)] hover:underline">&larr; Back to Directory</Link>
      </div>
    </main>
  );
}
