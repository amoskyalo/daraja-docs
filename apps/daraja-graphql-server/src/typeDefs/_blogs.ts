import gql from 'graphql-tag';

export const Blogs = gql`
    enum Source {
        ALL
        HASHNODE
        DEVTO
        SAFARICOM_TEAM
    }

    type CoverImage {
        url: String
    }

    type BannerImage {
        url: String
    }

    type Node {
        id: ID!
        title: String!
        brief: String!
        coverImage: CoverImage
        bannerImage: BannerImage
        url: String!
        source: Source
    }

    type Edge {
        node: Node
    }

    type Feed {
        edges: [Edge]
    }

    input Filters {
        source: Source
        page: Int
    }

    type Query {
        feed(filters: Filters): Feed
    }
`;
