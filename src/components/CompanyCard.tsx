import Link from "next/link";
import { Company } from "@/data/companies";

export default function CompanyCard({ company }: { company: Company }) {
  const priceColor = (company.stockChange ?? 0) >= 0 ? "text-emerald-400" : "text-red-400";

  return (
    <Link href={`/company/${company.slug}`}>
      <div className="glass-card rounded-xl p-6 hover:border-[var(--primary-glow)] transition-all duration-300 group h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold group-hover:text-[var(--primary)] transition-colors">
              {company.name}
            </h3>
            {company.ticker && (
              <span className="text-xs font-mono text-[var(--text-muted)]">{company.ticker}</span>
            )}
          </div>
          {company.stockPrice && (
            <div className="text-right">
              <div className="text-sm font-mono font-bold">${company.stockPrice.toFixed(2)}</div>
              <div className={`text-xs font-mono ${priceColor}`}>
                {(company.stockChange ?? 0) >= 0 ? "+" : ""}
                {company.stockChange?.toFixed(1)}%
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {company.badges.slice(0, 3).map((badge) => (
            <span key={badge} className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[var(--primary-glow)] text-[var(--primary)] bg-[rgba(6,182,212,0.1)]">
              {badge}
            </span>
          ))}
        </div>

        <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-4 flex-1">{company.description}</p>

        <div className="grid grid-cols-2 gap-3 text-xs border-t border-[var(--border-color)] pt-3">
          <div>
            <span className="text-[var(--text-muted)]">Sector</span>
            <p className="font-medium truncate">{company.sector}</p>
          </div>
          <div>
            <span className="text-[var(--text-muted)]">Stage</span>
            <p className="font-medium">{company.stage}</p>
          </div>
          <div>
            <span className="text-[var(--text-muted)]">HQ</span>
            <p className="font-medium truncate">{company.hq}</p>
          </div>
          <div>
            <span className="text-[var(--text-muted)]">Employees</span>
            <p className="font-medium">{company.employees}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
