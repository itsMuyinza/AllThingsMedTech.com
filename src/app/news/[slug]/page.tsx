import { notFound } from "next/navigation";
import Link from "next/link";
import { NewsService } from "@/services/newsService";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return { title: "News Article" };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allNews = await NewsService.getLatestNews(50);
  const article = allNews.find((n) => (n.slug || n.id) === slug);

  if (!article) {
    return (
      <main className="container py-12 z-10 relative text-center">
        <div className="glass-card rounded-xl p-12 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-[var(--text-muted)] mb-6">This article may have been removed or the link is incorrect.</p>
          <Link href="/news" className="btn-primary">Back to News</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-12 z-10 relative">
      <article className="max-w-3xl mx-auto">
        <Link href="/news" className="text-sm text-[var(--primary)] hover:underline mb-6 inline-block">&larr; Back to News</Link>

        <div className="mb-6">
          <span className="text-xs font-bold px-3 py-1 bg-[rgba(6,182,212,0.1)] border border-[var(--primary-glow)] rounded-full text-[var(--primary)]">
            {article.category}
          </span>
        </div>

        <h1 className="text-4xl font-bold mb-4 leading-tight">{article.title}</h1>

        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] mb-8">
          <span>{article.author}</span>
          <span>&middot;</span>
          <span>{article.date}</span>
        </div>

        {article.image && (
          <div className="aspect-video rounded-xl overflow-hidden mb-8 bg-gray-800">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="glass-card rounded-xl p-8">
          <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-6">{article.summary}</p>
          {article.content && (
            <div className="prose prose-invert max-w-none text-[var(--text-main)] leading-relaxed">
              {article.content}
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
