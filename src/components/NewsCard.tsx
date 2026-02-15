import Link from 'next/link';
import { NewsItem } from '@/services/newsService';

export default function NewsCard({ news }: { news: NewsItem }) {
  const slug = news.slug || news.id;
  return (
    <Link href={`/news/${slug}`}>
      <article className="group glass-card rounded-xl overflow-hidden hover:border-[var(--primary-glow)] transition-all duration-300 h-full flex flex-col">
        <div className="aspect-video relative overflow-hidden bg-gray-800">
          <img
            src={news.image}
            alt={news.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="text-xs font-bold px-3 py-1 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm rounded-full text-white border border-[rgba(255,255,255,0.1)]">
              {news.category}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mb-3">
            <span>{news.date}</span>
            <span>&bull;</span>
            <span>{news.author}</span>
          </div>
          <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
            {news.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] line-clamp-3 mb-4 flex-1">
            {news.summary}
          </p>
          <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider flex items-center gap-2">
            Read Briefing <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </span>
        </div>
      </article>
    </Link>
  );
}
