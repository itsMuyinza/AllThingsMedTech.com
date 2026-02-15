"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllJobs } from "@/data/companies";

const DEPARTMENTS = ["All", "AI/ML", "R&D", "Engineering", "Clinical", "Surgical Robotics", "Quality", "Hardware", "Diabetes Care", "Cardiology", "AI", "Digital Health", "Surgical", "Manufacturing"];
const TAG_FILTERS = ["Robotics", "AI/ML", "Biocompatibility", "FDA", "CRISPR", "Embedded", "Computer Vision", "Implantable"];

export default function CareersPage() {
  const allJobs = getAllJobs();
  const [deptFilter, setDeptFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let jobs = [...allJobs];
    if (deptFilter !== "All") jobs = jobs.filter((j) => j.department === deptFilter);
    if (tagFilter.length > 0) jobs = jobs.filter((j) => j.tags.some((t) => tagFilter.includes(t)));
    return jobs;
  }, [allJobs, deptFilter, tagFilter]);

  function toggleTag(tag: string) {
    setTagFilter((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  }

  return (
    <main className="container py-12 z-10 relative">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">MedTech Careers</h1>
        <p className="text-[var(--text-muted)] text-lg">
          {allJobs.length} open positions across {new Set(allJobs.map((j) => j.company)).size} companies. Salary transparency on every listing.
        </p>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="mb-4">
          <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 block">Department</label>
          <div className="flex flex-wrap gap-2">
            {["All", ...new Set(allJobs.map((j) => j.department))].map((dept) => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${deptFilter === dept ? "bg-[var(--primary)] text-black border-[var(--primary)]" : "border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--primary)]"}`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 block">Tech Stack</label>
          <div className="flex flex-wrap gap-2">
            {TAG_FILTERS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${tagFilter.includes(tag) ? "bg-[var(--secondary)] text-white border-[var(--secondary)]" : "border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--secondary)]"}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-sm text-[var(--text-muted)] mb-4">{filtered.length} positions</div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filtered.map((job, i) => (
          <Link key={i} href={`/company/${job.companySlug}`}>
            <div className="glass-card rounded-xl p-6 hover:border-[var(--primary-glow)] transition-all duration-300 group">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold group-hover:text-[var(--primary)] transition-colors">{job.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{job.company} &middot; {job.department} &middot; {job.location}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-mono font-bold text-emerald-400">{job.salary}</div>
                    {job.equity !== "None" && (
                      <div className="text-xs text-[var(--text-muted)]">+ {job.equity}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {job.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[var(--text-muted)]">{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
