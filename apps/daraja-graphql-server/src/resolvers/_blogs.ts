const queryTagId = `
query GetTagId($slug: String!) {
    tag(slug: $slug) {
        id
    }
}
`;

const queryPosts = `
query GetPostsByTag($count: Int!, $tags: [ObjectId!]) {
    feed(first: $count, filter: {tags: $tags}) {
        edges {
            node {
                id
                title
                brief
                publishedAt
                url
                coverImage {
                    url
                }
                bannerImage {
                    url
                }
            }
        }
    }
}
`;

export const blogsResolvers = {
    queries: {
        feed: async (parent: any, args: any, { dataSources }: any) => {
            try {
                const tagsResponse = await dataSources.hashnodeService.postDataSource({
                    api: '',
                    body: {
                        query: queryTagId,
                        variables: { slug: 'mpesa' },
                    },
                });

                const tagId = tagsResponse.data.tag.id;

                const [hashnodeResponse, devToResponse] = await Promise.allSettled([
                    dataSources.hashnodeService.postDataSource({
                        api: '',
                        body: {
                            query: queryPosts,
                            variables: { tags: [tagId], count: 50 },
                        },
                    }),
                    dataSources.devToService.queryDataSource({
                        api: 'articles/',
                        params: { tag: 'mpesa', per_page: 50 },
                    }),
                ]);

                let allEdges = [];

                if (hashnodeResponse.status === 'fulfilled' && hashnodeResponse.value?.data?.feed?.edges) {
                    const mappedHashnode = hashnodeResponse.value.data.feed.edges.map((edge: any) => ({
                        node: { ...edge.node, source: 'HASHNODE' },
                    }));

                    allEdges.push(...mappedHashnode);
                }

                if (devToResponse.status === 'fulfilled' && devToResponse.value) {
                    const darajaKeywords = ['daraja', 'm-pesa', 'mpesa', 'safaricom'];

                    const filteredDevTo = devToResponse.value.filter((post: any) => {
                        const searchText = `${post.title} ${post.description}`.toLowerCase();
                        return darajaKeywords.some((keyword) => searchText.includes(keyword));
                    });

                    const mappedDevTo = filteredDevTo.map((post: any) => ({
                        node: {
                            id: post.id.toString(),
                            title: post.title,
                            brief: post.description,
                            coverImage: {
                                url: post.cover_image || post.social_image,
                            },
                            bannerImage: {
                                url: post.cover_image || post.social_image,
                            },
                            url: post.url,
                            publishedAt: post.published_at,
                            author: {
                                name: post.user.name,
                            },
                            source: 'DEVTO',
                        },
                    }));

                    allEdges.push(...mappedDevTo);
                }

                const source = args?.filters?.source ?? 'ALL';

                allEdges.sort((a, b) => {
                    const dateA = new Date(a.node.publishedAt || 0);
                    const dateB = new Date(b.node.publishedAt || 0);
                    return dateB.getTime() - dateA.getTime();
                });

                if (source !== 'ALL') {
                    return {
                        edges: allEdges.filter((edge: any) => edge.node.source === source),
                    };
                }

                return {
                    edges: allEdges,
                };
            } catch (error) {
                console.error('Error fetching blog feed:', error);
                throw new Error('Failed to fetch blog feed');
            }
        },
    },
};
