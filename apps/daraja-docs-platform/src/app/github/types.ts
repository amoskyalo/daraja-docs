export interface GitHubRepository {
    id: string;
    name: string;
    html_url: string;
    description: string;
    url: string;
    stargazers_count: number;
    owner: {
        avatar_url: string;
        login: string;
    };
}
export interface PaginatedResponse {
    items: GitHubRepository[];
    total_count: number;
}
export interface Response {
    repositories: PaginatedResponse;
}
