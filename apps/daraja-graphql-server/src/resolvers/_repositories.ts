export const repositoriesResolvers = {
    queries: {
        repositories: async (__: any, { params }: any, { dataSources }: any) => {
            const { language, ...rest } = params ?? {};
            const full_query = language ? `daraja language:${language.toLowerCase()}` : 'daraja';
            
            try {
                const repositories = await dataSources.githubService.queryDataSource({
                    api: '/search/repositories',
                    params: { q: full_query, sort: 'stars', order: 'desc', ...rest },
                });

                return repositories;
            } catch (error) {
                console.error('Error fetching repositories:', error);
                throw new Error('Failed to fetch repositories');
            }
        },
    },
};
