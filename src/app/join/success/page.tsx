"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const tier = searchParams.get("tier") || "explorer";

  return (
    <main className="container py-20 z-10 relative">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Welcome to AllThingsMedTech!</h1>
          <p className="text-[var(--text-muted)] text-lg">
            Your <span className="text-[var(--primary)] font-semibold capitalize">{tier}</span> account
            has been created successfully.
          </p>
        </div>

        <div className="glass-card rounded-xl p-8 mb-8">
          <h2 className="text-lg font-bold mb-4">What happens next?</h2>
          <ul className="space-y-3 text-left text-sm">
            <li className="flex items-start gap-3">
              <span className="text-[var(--primary)] font-mono font-bold">01</span>
              <span>Complete your company profile with capabilities, certifications, and contact info</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--primary)] font-mono font-bold">02</span>
              <span>Your listing goes live in the directory for engineers to discover</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--primary)] font-mono font-bold">03</span>
              <span>Start receiving contact requests from procurement teams and engineers</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="btn-primary px-8 py-3 text-center">
            Go to Dashboard
          </Link>
          <Link
            href="/directory"
            className="px-8 py-3 rounded-lg border border-[var(--border-color)] hover:border-[var(--primary)] transition-colors text-center"
          >
            Browse Directory
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="container py-20 z-10 relative">
        <div className="text-center">
          <p className="text-[var(--text-muted)]">Loading...</p>
        </div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
