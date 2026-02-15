import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full mt-auto py-12 border-t border-[var(--border-color)] bg-[var(--bg-dark)] z-10">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="text-xl font-bold tracking-tight mb-4">
              AllThings<span style={{ color: 'var(--primary)' }}>MedTech</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              The #1 database connecting engineers to the medical device supply chain of the future.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[var(--primary)]">Platform</h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li><Link href="/directory" className="hover:text-white transition-colors">Supplier Directory</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">Daily News</Link></li>
              <li><Link href="/for-engineers" className="hover:text-white transition-colors">For Engineers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[var(--primary)]">Video Series</h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li><Link href="/series/patent-vault" className="hover:text-white transition-colors">The Patent Vault</Link></li>
              <li><Link href="/series/medtech-forensics" className="hover:text-white transition-colors">MedTech Forensics</Link></li>
              <li><Link href="/series/the-prototype" className="hover:text-white transition-colors">The Prototype</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[var(--primary)]">Company</h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li><span className="hover:text-white transition-colors cursor-default">About</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Contact</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Privacy Policy</span></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[var(--border-color)] text-center text-sm text-[var(--text-muted)]">
          <p>&copy; 2026 AllThingsMedTech. Built for the engineers building life-saving technology.</p>
        </div>
      </div>
    </footer>
  );
}
