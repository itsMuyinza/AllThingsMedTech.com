"use client";

import { useState, useMemo } from "react";
import { companies, getSectors } from "@/data/companies";
import { searchCompanies, generateInsight } from "@/utils/searchLogic";
import CompanyCard from "@/components/CompanyCard";

export default function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const sectors = getSectors();
  const stages = ["Public", "Series A", "Series B", "Series C", "Series D", "Series F", "Acquired"];

  // Read initial query from URL on client
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const initialQ = searchParams?.get("q") || "";
  if (initialQ && !query) {
    // Defer to avoid render loop
    setTimeout(() => setQuery(initialQ), 0);
  }

  const results = useMemo(() => {
    if (query.trim()) {
      return searchCompanies(query).map((r) => r.company);
    }
    let filtered = [...companies];
    if (sectorFilter) filtered = filtered.filter((c) => c.sector === sectorFilter);
    if (stageFilter) filtered = filtered.filter((c) => c.stage === stageFilter);
    return filtered;
  }, [query, sectorFilter, stageFilter]);

  const insight = query.trim() ? generateInsight(searchCompanies(query), query) : "";

  return (
    <main className="container py-12 z-10 relative">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Company Directory</h1>
        <p className="text-[var(--text-muted)] text-lg">
          Search {companies.length} medical technology companies by regulatory status, therapeutic area, or funding stage.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try '510(k) cardiac startup' or 'Series A robotics'..."
              className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 text-[var(--text-main)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--primary)] transition-colors"
            />
          </div>
          <select
            value={sectorFilter}
            onChange={(e) => { setSectorFilter(e.target.value); setQuery(""); }}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg px-4 py-3 text-sm text-[var(--text-main)] outline-none"
          >
            <option value="">All Sectors</option>
            {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={stageFilter}
            onChange={(e) => { setStageFilter(e.target.value); setQuery(""); }}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg px-4 py-3 text-sm text-[var(--text-main)] outline-none"
          >
            <option value="">All Stages</option>
            {stages.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        {insight && (
          <div className="mt-4 px-4 py-3 rounded-lg bg-[rgba(6,182,212,0.1)] border border-[var(--primary-glow)] text-sm text-[var(--primary)]">
            {insight}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="text-sm text-[var(--text-muted)] mb-4">{results.length} companies found</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </main>
  );
}
