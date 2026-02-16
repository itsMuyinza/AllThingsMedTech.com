"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

type Tier = "explorer" | "catalyst" | "titan";

const tiers = [
  {
    key: "explorer" as Tier,
    name: "Explorer",
    price: "Free",
    period: "",
    description: "Get started with basic directory access",
    features: [
      "Basic company listing",
      "Search the supplier database",
      "View public company profiles",
      "Community forum access",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    key: "catalyst" as Tier,
    name: "Catalyst",
    price: "$499",
    period: "/year",
    description: "Enhanced visibility and analytics for growing companies",
    features: [
      "Everything in Explorer",
      "Enhanced company profile",
      "Priority search placement",
      "Direct contact access",
      "Profile analytics dashboard",
      "Certification badge display",
      "Monthly industry reports",
    ],
    cta: "Start Catalyst",
    highlight: true,
  },
  {
    key: "titan" as Tier,
    name: "Titan",
    price: "$2,499",
    period: "/year",
    description: "Maximum exposure and lead generation for industry leaders",
    features: [
      "Everything in Catalyst",
      "Featured homepage placement",
      "Lead generation tools",
      "Full analytics suite",
      "Dedicated account manager",
      "Custom landing page",
      "Sponsored content slots",
      "API access for integrations",
    ],
    cta: "Go Titan",
    highlight: false,
  },
];

export default function JoinPage() {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) return;
    setLoading(true);
    setError("");

    try {
      // Create contact in GHL
      const contactRes = await fetch("/api/ghl/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tier: selectedTier,
          source: "join_page",
        }),
      });

      if (!contactRes.ok) {
        throw new Error("Failed to create account");
      }

      // If paid tier, redirect to Stripe checkout
      if (selectedTier !== "explorer") {
        const checkoutRes = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tier: selectedTier,
            email: formData.email,
            companyName: formData.companyName,
          }),
        });

        const { url } = await checkoutRes.json();
        if (url) {
          window.location.href = url;
          return;
        }
      }

      // Free tier — redirect to success
      window.location.href = "/join/success?tier=explorer";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-12 z-10 relative">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-[var(--primary)] uppercase border border-[var(--primary-glow)] rounded-full bg-[rgba(6,182,212,0.1)]">
          Join AllThingsMedTech
        </div>
        <h1 className="text-4xl font-bold mb-4">
          List Your Company in the MedTech Supply Chain
        </h1>
        <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
          Get discovered by engineers and procurement teams building the next
          generation of medical devices.
        </p>
      </div>

      {!selectedTier ? (
        /* ─── Tier Selection ─── */
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.key}
              className={`glass-card rounded-xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                tier.highlight
                  ? "border-[var(--primary)] ring-1 ring-[var(--primary-glow)]"
                  : ""
              }`}
            >
              {tier.highlight && (
                <div className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-[var(--text-muted)] text-sm">
                  {tier.period}
                </span>
              </div>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                {tier.description}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedTier(tier.key)}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  tier.highlight
                    ? "btn-primary"
                    : "border border-[var(--border-color)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* ─── Registration Form ─── */
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => setSelectedTier(null)}
            className="text-sm text-[var(--text-muted)] hover:text-white mb-6 transition-colors"
          >
            ← Back to plans
          </button>

          <div className="glass-card rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Create Your Account</h2>
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[rgba(6,182,212,0.1)] text-[var(--primary)] border border-[var(--primary-glow)]">
                {selectedTier.toUpperCase()}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
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

              <div>
                <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                  Website
                </label>
                <input
                  type="url"
                  placeholder="https://"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
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
                {loading
                  ? "Processing..."
                  : selectedTier === "explorer"
                  ? "Create Free Account"
                  : "Continue to Payment"}
              </button>

              <p className="text-xs text-center text-[var(--text-muted)]">
                By signing up you agree to our{" "}
                <Link href="#" className="text-[var(--primary)]">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[var(--primary)]">
                  Privacy Policy
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
