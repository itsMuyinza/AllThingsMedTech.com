"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";
import NeuralBackground from "@/components/NeuralBackground";

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
      // Magic link style — verify the email exists in GHL
      // In production this would send a Supabase magic link or OTP
      const res = await fetch("/api/ghl/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "login_attempt",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send magic link");
      }

      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bone relative flex items-center justify-center px-6 py-24">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <NeuralBackground />
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-retro-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-med-teal/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="w-12 h-12 group-hover:rotate-90 transition-transform duration-700" />
            <div className="flex flex-col leading-none">
              <span className="font-serif font-black text-xl tracking-tighter text-med-teal group-hover:text-retro-orange transition-colors">
                ALL THINGS
              </span>
              <span className="font-tech font-bold text-lg tracking-widest text-retro-orange -mt-1 group-hover:text-med-teal transition-colors">
                MEDTECH
              </span>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/60 backdrop-blur-xl border border-med-teal/10 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header stripe */}
          <div className="h-1 bg-gradient-to-r from-med-teal via-retro-orange to-med-teal" />

          <div className="p-8 md:p-10">
            {!sent ? (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 text-retro-orange font-tech font-bold uppercase tracking-widest text-xs mb-3">
                    <Sparkles className="w-4 h-4" />
                    <span>Welcome Back</span>
                  </div>
                  <h1 className="font-serif font-bold text-3xl text-ink mb-2">
                    Sign In
                  </h1>
                  <p className="font-sans text-ink/50 text-sm">
                    Access your AllThingsMedTech dashboard
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-xs font-tech font-bold text-med-teal uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-med-teal/40" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full bg-bone/50 border border-med-teal/10 rounded-xl pl-11 pr-4 py-3.5 text-sm font-sans text-ink outline-none focus:border-retro-orange focus:ring-2 focus:ring-retro-orange/20 transition-all placeholder:text-ink/30"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 font-sans">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-med-teal text-bone font-tech font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(214,90,49,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Magic Link
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-ink/40 font-sans">
                    No password needed. We&apos;ll send a secure login link to your email.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-med-teal/10 flex items-center justify-center mx-auto mb-5">
                  <Mail className="w-8 h-8 text-med-teal" />
                </div>
                <h2 className="font-serif font-bold text-2xl text-ink mb-2">
                  Check Your Email
                </h2>
                <p className="font-sans text-sm text-ink/60 mb-6">
                  We sent a login link to{" "}
                  <span className="text-retro-orange font-bold">{email}</span>
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm text-med-teal font-tech font-bold hover:text-retro-orange transition-colors"
                >
                  ← Use a different email
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom link */}
        <div className="text-center mt-6">
          <p className="text-sm font-sans text-ink/50">
            Don&apos;t have an account?{" "}
            <Link
              href="/join"
              className="text-retro-orange font-bold hover:text-med-teal transition-colors"
            >
              Join AllThingsMedTech
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
