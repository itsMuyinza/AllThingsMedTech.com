"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // For now, magic link style — just verify the email exists
      // In production this would send a Supabase magic link or OTP
      const res = await fetch("/api/ghl/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "login_attempt",
        }),
      });

      setSent(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-20 z-10 relative">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Sign In</h1>
          <p className="text-[var(--text-muted)]">
            Access your AllThingsMedTech dashboard
          </p>
        </div>

        <div className="glass-card rounded-xl p-8">
          {!sent ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 outline-none focus:border-[var(--primary)] transition-colors"
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
                {loading ? "Sending..." : "Send Magic Link"}
              </button>

              <p className="text-xs text-center text-[var(--text-muted)]">
                No password needed. We will send a login link to your email.
              </p>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="text-4xl mb-4">📧</div>
              <h2 className="text-lg font-bold mb-2">Check Your Email</h2>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                We sent a login link to{" "}
                <span className="text-[var(--primary)]">{email}</span>
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-sm text-[var(--text-muted)] hover:text-white transition-colors"
              >
                Use a different email
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-[var(--text-muted)]">
            Don&apos;t have an account?{" "}
            <Link href="/join" className="text-[var(--primary)] hover:underline">
              Join AllThingsMedTech
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
