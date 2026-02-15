"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/directory?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSearch} className={`w-full ${large ? "max-w-2xl" : "max-w-lg"} relative group`}>
      {large && (
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
      )}
      <div className="relative glass-card p-2 flex items-center gap-4 rounded-xl">
        <div className="pl-4 text-[var(--text-muted)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search '510(k) cardiac' or 'Series A robotics'..."
          className="flex-1 bg-transparent border-none outline-none text-[var(--text-main)] placeholder-[var(--text-muted)] h-12 text-lg font-light"
        />
        <button type="submit" className="btn-primary">Search</button>
      </div>
    </form>
  );
}
