import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "For Engineers - Video Series" };

const series = [
  {
    slug: "patent-vault",
    title: "The Patent Vault",
    tagline: "Bizarre & Brilliant Medical Device Patents",
    description: "Each week we crack open the most fascinating medical device patents ever filed. From electrical bone growth stimulators to brain-controlled prosthetics — the engineering breakdowns that textbooks skip.",
    episodes: 52,
    duration: "~5 min each",
    color: "from-cyan-500 to-blue-600",
    icon: "\u{1F50D}",
    quarters: [
      "Q1: Origins & Oddities",
      "Q2: The Body Electric",
      "Q3: Micro to Macro",
      "Q4: The Future Is Now",
    ],
  },
  {
    slug: "medtech-forensics",
    title: "MedTech Forensics",
    tagline: "When Medical Devices Fail",
    description: "Technical deep-dives into the most consequential medical device failures in history. What went wrong, what engineers missed, and the design lessons that changed the industry forever.",
    episodes: 52,
    duration: "~5 min each",
    color: "from-red-500 to-orange-500",
    icon: "\u{1F52C}",
    quarters: [
      "Q1: Design Sins",
      "Q2: Material Witness",
      "Q3: Digital Demons",
      "Q4: System Failures",
    ],
  },
  {
    slug: "the-prototype",
    title: "The Prototype",
    tagline: "Cutting-Edge Devices Changing Medicine",
    description: "Spotlighting the most revolutionary medical devices — past, present, and in development. From the first pacemaker to CRISPR-edited pig kidneys, these are the devices rewriting what is possible.",
    episodes: 52,
    duration: "~5 min each",
    color: "from-violet-500 to-purple-600",
    icon: "\u{1F9EC}",
    quarters: [
      "Q1: Foundations of the Future",
      "Q2: The Sensing Revolution",
      "Q3: Rebuilding the Body",
      "Q4: Tomorrow's Medicine",
    ],
  },
];

export default function ForEngineersPage() {
  return (
    <main className="container py-12 z-10 relative">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-[var(--primary)] uppercase border border-[var(--primary-glow)] rounded-full bg-[rgba(6,182,212,0.1)]">
          Weekly Video Content for Engineers
        </div>
        <h1 className="text-4xl font-bold mb-4">For Engineers</h1>
        <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
          Three weekly video series breaking down the patents, failures, and breakthroughs that shape medical technology. 156 episodes. One full year.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-[var(--primary)]">156</div>
          <div className="text-sm text-[var(--text-muted)]">Total Episodes</div>
        </div>
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-[var(--primary)]">3</div>
          <div className="text-sm text-[var(--text-muted)]">Weekly Series</div>
        </div>
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-[var(--primary)]">52</div>
          <div className="text-sm text-[var(--text-muted)]">Weeks of Content</div>
        </div>
      </div>

      <div className="space-y-8">
        {series.map((s) => (
          <div key={s.slug} className="glass-card rounded-xl overflow-hidden hover:border-[var(--primary-glow)] transition-all duration-300">
            <div className={`h-2 bg-gradient-to-r ${s.color}`}></div>
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="text-5xl">{s.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">{s.title}</h2>
                  <p className="text-[var(--primary)] text-sm font-medium mb-3">{s.tagline}</p>
                  <p className="text-[var(--text-muted)] mb-4">{s.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="font-mono text-[var(--text-muted)]">{s.episodes} episodes</span>
                    <span className="text-[var(--text-muted)]">&middot;</span>
                    <span className="font-mono text-[var(--text-muted)]">{s.duration}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    {s.quarters.map((q) => (
                      <div key={q} className="text-xs px-3 py-2 rounded-lg bg-white/5 text-[var(--text-muted)]">{q}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
