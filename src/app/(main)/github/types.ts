export interface GitHubRepository {
    id: string;
    full_name: string;
    description: string;
    url: string;
    stargazers_count: number;
    owner: {
        avatar_url: string;
    };
}
export interface PaginatedResponse {
    items: GitHubRepository[];
    total_count: number;
}
export interface Response {
    repositories: PaginatedResponse;
}
