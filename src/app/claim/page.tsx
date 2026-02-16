"use client";

import { useState, useMemo } from "react";
import { companies } from "@/data/companies";
import { searchCompanies } from "@/utils/searchLogic";
import { Building2, CheckCircle, Search } from "lucide-react";
import type { Metadata } from "next";

type Step = "search" | "verify" | "success";

export default function ClaimPage() {
  const [step, setStep] = useState<Step>("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchCompanies(searchQuery).slice(0, 8).map((r) => r.company);
  }, [searchQuery]);

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompany) return;
    setLoading(true);
    setError("");

    const company = companies.find((c) => c.id === selectedCompany);

    try {
      const res = await fetch("/api/ghl/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          companyName: company?.name,
          website: company?.website,
          tier: "explorer",
          source: "claim_page",
        }),
      });

      if (!res.ok) throw new Error("Failed to submit claim");

      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-12 z-10 relative">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-[var(--primary)] uppercase border border-[var(--primary-glow)] rounded-full bg-[rgba(6,182,212,0.1)]">
            Claim Your Profile
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Is Your Company Already Listed?
          </h1>
          <p className="text-[var(--text-muted)] text-lg">
            Search our database to find and claim your company profile. Unlock
            editing, analytics, and premium features.
          </p>
        </div>

        {step === "search" && (
          <div className="glass-card rounded-xl p-8">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for your company..."
                className="w-full bg-transparent border border-[var(--border-color)] rounded-lg pl-12 pr-4 py-3 text-[var(--text-main)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-2">
                {searchResults.map((company) => (
                  <button
                    key={company.id}
                    onClick={() => {
                      setSelectedCompany(company.id);
                      setStep("verify");
                    }}
                    className="w-full text-left flex items-center gap-4 p-4 rounded-lg border border-[var(--border-color)] hover:border-[var(--primary)] transition-all group"
                  >
                    <Building2 className="w-8 h-8 text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors" />
                    <div>
                      <div className="font-semibold group-hover:text-[var(--primary)] transition-colors">
                        {company.name}
                      </div>
                      <div className="text-sm text-[var(--text-muted)]">
                        {company.sector} &middot; {company.stage}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {searchQuery.trim() && searchResults.length === 0 && (
              <div className="text-center py-8">
                <p className="text-[var(--text-muted)] mb-4">
                  No matching companies found.
                </p>
                <a
                  href="/join"
                  className="text-[var(--primary)] hover:underline"
                >
                  List your company instead →
                </a>
              </div>
            )}
          </div>
        )}

        {step === "verify" && (
          <div className="glass-card rounded-xl p-8">
            <button
              onClick={() => {
                setStep("search");
                setSelectedCompany(null);
              }}
              className="text-sm text-[var(--text-muted)] hover:text-white mb-6 transition-colors"
            >
              ← Back to search
            </button>

            <h2 className="text-xl font-bold mb-2">Verify Your Identity</h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Please use your company email to verify ownership of{" "}
              <span className="text-[var(--primary)]">
                {companies.find((c) => c.id === selectedCompany)?.name}
              </span>
            </p>

            <form onSubmit={handleClaim} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                  Company Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@company.com"
                  className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                  Job Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>

              {error && (
                <div className="text-sm text-red-400 bg-red-400/10 rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-center disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Claim Request"}
              </button>
            </form>
          </div>
        )}

        {step === "success" && (
          <div className="glass-card rounded-xl p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Claim Request Submitted!</h2>
            <p className="text-[var(--text-muted)] mb-6">
              We will verify your identity and activate your profile within 24
              hours. You will receive a confirmation email once approved.
            </p>
            <a href="/directory" className="btn-primary px-8 py-3 inline-block">
              Browse Directory
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
