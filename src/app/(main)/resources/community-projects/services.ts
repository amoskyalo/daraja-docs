import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { GitHubRepository, GitHubSearchResponse } from './types';

const githubApi = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
});

interface PaginatedResponse {
    items: GitHubRepository[];
    total_count: number;
    has_next_page: boolean;
    current_page: number;
}

export const getCommunityProjects = (
    page: number = 1,
    perPage: number = 30,
    language: string = 'all',
): UseQueryResult<PaginatedResponse, Error> => {
    return useQuery({
        queryKey: ['github-repositories', page, perPage, language],
        queryFn: async (): Promise<PaginatedResponse> => {
            let query = 'daraja';
            if (language !== 'all') {
                query += ` language:${language}`;
            }

            const response = await githubApi.get<GitHubSearchResponse>('/search/repositories', {
                params: {
                    q: query,
                    per_page: perPage,
                    page: page,
                    sort: 'stars',
                    order: 'desc',
                },
            });

            return {
                items: response.data.items,
                total_count: response.data.total_count,
                has_next_page: response.data.items.length === perPage,
                current_page: page,
            };
        },
        staleTime: 5 * 60 * 1000,
    });
};
