import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const seriesData: Record<string, {
  title: string;
  tagline: string;
  description: string;
  episodes: number;
  duration: string;
  color: string;
  icon: string;
  quarters: string[];
}> = {
  "patent-vault": {
    title: "The Patent Vault",
    tagline: "Bizarre & Brilliant Medical Device Patents",
    description: "Each week we crack open the most fascinating medical device patents ever filed. From electrical bone growth stimulators to brain-controlled prosthetics — the engineering breakdowns that textbooks skip.",
    episodes: 52,
    duration: "~5 min each",
    color: "from-cyan-500 to-blue-600",
    icon: "🔍",
    quarters: [
      "Q1: Origins & Oddities",
      "Q2: The Body Electric",
      "Q3: Micro to Macro",
      "Q4: The Future Is Now",
    ],
  },
  "medtech-forensics": {
    title: "MedTech Forensics",
    tagline: "When Medical Devices Fail",
    description: "Technical deep-dives into the most consequential medical device failures in history. What went wrong, what engineers missed, and the design lessons that changed the industry forever.",
    episodes: 52,
    duration: "~5 min each",
    color: "from-red-500 to-orange-500",
    icon: "🔬",
    quarters: [
      "Q1: Design Sins",
      "Q2: Material Witness",
      "Q3: Digital Demons",
      "Q4: System Failures",
    ],
  },
  "the-prototype": {
    title: "The Prototype",
    tagline: "Cutting-Edge Devices Changing Medicine",
    description: "Spotlighting the most revolutionary medical devices — past, present, and in development. From the first pacemaker to CRISPR-edited pig kidneys, these are the devices rewriting what is possible.",
    episodes: 52,
    duration: "~5 min each",
    color: "from-violet-500 to-purple-600",
    icon: "🧬",
    quarters: [
      "Q1: Foundations of the Future",
      "Q2: The Sensing Revolution",
      "Q3: Rebuilding the Body",
      "Q4: Tomorrow's Medicine",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(seriesData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = seriesData[slug];
  if (!series) return { title: "Series Not Found" };
  return {
    title: `${series.title} - Video Series`,
    description: series.description,
  };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = seriesData[slug];
  if (!series) notFound();

  return (
    <main className="container py-12 z-10 relative">
      <Link
        href="/for-engineers"
        className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-white transition-colors mb-8"
      >
        ← Back to All Series
      </Link>

      <div className={`h-2 rounded-full bg-gradient-to-r ${series.color} mb-8 max-w-xs`}></div>

      <div className="flex items-start gap-6 mb-8">
        <div className="text-6xl">{series.icon}</div>
        <div>
          <h1 className="text-4xl font-bold mb-2">{series.title}</h1>
          <p className="text-[var(--primary)] text-lg font-medium">{series.tagline}</p>
        </div>
      </div>

      <p className="text-[var(--text-muted)] text-lg max-w-3xl mb-12 leading-relaxed">
        {series.description}
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-[var(--primary)] font-mono">{series.episodes}</div>
          <div className="text-sm text-[var(--text-muted)] mt-1">Episodes</div>
        </div>
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-[var(--primary)]">{series.duration}</div>
          <div className="text-sm text-[var(--text-muted)] mt-1">Per Episode</div>
        </div>
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-[var(--primary)]">Weekly</div>
          <div className="text-sm text-[var(--text-muted)] mt-1">Release Schedule</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Season Breakdown</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {series.quarters.map((q, i) => (
          <div
            key={q}
            className="glass-card rounded-xl p-6 hover:border-[var(--primary-glow)] transition-all duration-300"
          >
            <div className="text-xs text-[var(--primary)] font-mono mb-2">
              QUARTER {i + 1} • WEEKS {i * 13 + 1}–{(i + 1) * 13}
            </div>
            <div className="text-lg font-semibold">{q.replace(/^Q\d:\s*/, "")}</div>
            <div className="text-sm text-[var(--text-muted)] mt-2">13 episodes</div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold mb-3">Coming Soon</h3>
        <p className="text-[var(--text-muted)] mb-6 max-w-lg mx-auto">
          Episodes are currently in production. Subscribe to get notified when new episodes drop.
        </p>
        <Link href="/join" className="btn-primary">
          Get Early Access
        </Link>
      </div>
    </main>
  );
}
