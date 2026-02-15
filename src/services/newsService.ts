import { supabase } from '@/lib/supabase';

export interface NewsItem {
    id: string;
    title: string;
    summary: string;
    content?: string;
    date: string;
    image: string;
    author: string;
    category: string;
    slug?: string;
    featured?: boolean;
}

export type ContentType = 'news' | 'podcast' | 'event' | 'resource';

export const NewsService = {
    async getLatestNews(limit: number = 20, type: ContentType = 'news'): Promise<NewsItem[]> {
        try {
            // 1. Try fetching from the unified 'content_posts' table (CMS)
            const { data, error } = await supabase
                .from('content_posts')
                .select('*')
                .eq('type', type)
                .eq('published_status', true)
                .order('published_at', { ascending: false })
                .limit(limit);

            if (!error && data && data.length > 0) {
                return data.map((row: any) => ({
                    id: row.id,
                    slug: row.slug,
                    title: row.title,
                    content: row.body || row.content,
                    summary: row.summary,
                    date: new Date(row.published_at || row.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    image: row.image_url || `https://picsum.photos/seed/${row.id}/800/600`,
                    author: row.author || 'Editorial Team',
                    category: row.meta_data?.category || (type === 'news' ? 'Industry' : type.toUpperCase()),
                    featured: row.featured,
                }));
            }

            console.log('Falling back to medtech_news table...');

            // 2. Fallback to 'medtech_news' if CMS is empty
            if (type === 'news') {
                const { data: legacyData, error: legacyError } = await supabase
                    .from('medtech_news')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(limit);

                if (legacyError) {
                    console.error('Error fetching from medtech_news:', legacyError);
                    return [];
                }

                return (legacyData || []).map((row: any, index: number) => ({
                    id: row.id,
                    title: row.title || 'Untitled',
                    content: row.content || '',
                    summary: row.meta_desc || row.content?.substring(0, 160) + '...',
                    date: new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    image: row.image_url || `https://picsum.photos/seed/${row.id}/800/600`,
                    author: row.author || 'MedTech Analyst',
                    category: index % 2 === 0 ? 'FDA' : 'Market',  // Basic mock category
                    featured: index === 0,
                }));
            }

            return [];
        } catch (err) {
            console.error('Unexpected error in getLatestNews:', err);
            return [];
        }
    }
};
