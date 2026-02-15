import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="w-full container py-4 flex justify-between items-center z-10 glass-card mt-4 px-8 backdrop-blur-md">
      <Link href="/" className="text-xl font-bold tracking-tight">
        AllThings<span style={{ color: 'var(--primary)' }}>MedTech</span>
      </Link>
      <div className="flex gap-5 items-center">
        <Link href="/directory" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">Directory</Link>
        <Link href="/intelligence" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">Intelligence</Link>
        <Link href="/news" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">News</Link>
        <Link href="/for-engineers" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">For Engineers</Link>
        <Link href="/careers" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">Careers</Link>
        <Link href="/investors" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">Investors</Link>
      </div>
    </nav>
  );
}
