import { NewsService } from "@/services/newsService";
import NewsCard from "@/components/NewsCard";
import FDATracker from "@/components/FDATracker";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Daily MedTech News" };

export default async function NewsPage() {
  const news = await NewsService.getLatestNews(20);

  return (
    <main className="container py-12 z-10 relative">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Daily MedTech News</h1>
        <p className="text-[var(--text-muted)] text-lg">
          Curated briefings on FDA approvals, M&A activity, clinical trials, and supply chain shifts.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {news.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass-card rounded-xl">
              <p className="text-4xl mb-4">&#x1F4E1;</p>
              <h2 className="text-xl font-bold mb-2">News Pipeline Loading</h2>
              <p className="text-[var(--text-muted)] max-w-md mx-auto">
                Our automated news agents are scanning FDA feeds, MedTechDive, and MassDevice. Content will appear here once the pipeline is connected.
              </p>
            </div>
          )}
        </div>
        <div className="space-y-6">
          <FDATracker limit={12} />
        </div>
      </div>
    </main>
  );
}
