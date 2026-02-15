import Link from "next/link";
import { getRecentFDAActivity } from "@/data/companies";

export default function FDATracker({ limit = 8 }: { limit?: number }) {
  const activity = getRecentFDAActivity().slice(0, limit);

  const statusColor: Record<string, string> = {
    Cleared: "text-emerald-400",
    Approved: "text-emerald-400",
    Pending: "text-amber-400",
    Breakthrough: "text-[var(--primary)]",
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        FDA Tracker
      </h3>
      <div className="space-y-3">
        {activity.map((item, i) => (
          <Link key={i} href={`/company/${item.companySlug}`} className="block group">
            <div className="flex items-start gap-3 py-2 border-b border-[var(--border-color)] last:border-0 hover:bg-white/5 rounded px-2 -mx-2 transition-colors">
              <span className="text-xs text-[var(--text-muted)] whitespace-nowrap mt-0.5 font-mono">
                {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-[var(--primary)] transition-colors">{item.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{item.company}</p>
              </div>
              <span className={`text-xs font-bold whitespace-nowrap ${statusColor[item.status] || "text-gray-400"}`}>
                {item.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
