import { useQuery } from '@tanstack/react-query';

interface DevToArticle {
    title: string;
    url: string;
    description: string;
    published_at: string;
    cover_image: string;
    social_image?: string;
    user: {
        name: string;
    };
}

export interface BlogPost {
    title: string;
    url: string;
    description: string;
    publishedAt: string;
    source: 'dev.to' | 'medium';
    author: string;
    coverImage?: string;
}

const DEV_TO_SEARCH_TAGS = ['daraja', 'mpesa', 'safaricom'] as const;
const DARAJA_KEYWORDS = ['daraja', 'm-pesa'] as const;

const isDarajaRelated = (title: string, description: string): boolean => {
    const searchText = `${title} ${description}`.toLowerCase();
    return DARAJA_KEYWORDS.some((keyword) => searchText.includes(keyword));
};

async function fetchDevToDarajaBlogs(): Promise<DevToArticle[]> {
    const allArticles: DevToArticle[] = [];

    try {
        const requests = DEV_TO_SEARCH_TAGS.map(async (tag) => {
            const response = await fetch(`https://dev.to/api/articles?tag=${tag}&per_page=30`);

            if (!response.ok) {
                throw new Error(`Dev.to API error: ${response.statusText}`);
            }

            return response.json() as Promise<DevToArticle[]>;
        });

        const results = await Promise.allSettled(requests);

        results.forEach((result) => {
            if (result.status === 'fulfilled') {
                const filteredArticles = result.value.filter((article) =>
                    isDarajaRelated(article.title, article.description),
                );
                allArticles.push(...filteredArticles);
            } else {
                console.warn('Failed to fetch from Dev.to:', result.reason);
            }
        });
    } catch (error) {
        console.error('Error fetching Dev.to articles:', error);
        throw error;
    }

    return allArticles;
}

export async function fetchAllDarajaBlogs(): Promise<BlogPost[]> {
    try {
        const [devtoBlogs] = await Promise.allSettled([fetchDevToDarajaBlogs()]);

        const allBlogs: BlogPost[] = [];

        if (devtoBlogs.status === 'fulfilled') {
            const devtoPosts = devtoBlogs.value.map(
                (article): BlogPost => ({
                    title: article.title,
                    url: article.url,
                    description: article.description,
                    publishedAt: article.published_at,
                    source: 'dev.to',
                    author: article.user.name,
                    coverImage: article.social_image,
                }),
            );
            allBlogs.push(...devtoPosts);
        }

        const uniqueBlogs = allBlogs.filter((blog, index, self) => index === self.findIndex((b) => b.url === blog.url));

        return uniqueBlogs.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } catch (error) {
        console.error('Error fetching all Daraja blogs:', error);
        throw new Error('Failed to fetch Daraja blogs');
    }
}

export const useQueryPosts = () => {
    return useQuery<BlogPost[], Error>({
        queryKey: ['daraja-posts'],
        queryFn: fetchAllDarajaBlogs,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 2,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });
};
