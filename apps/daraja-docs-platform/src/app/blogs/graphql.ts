import { gql } from '@apollo/client';

const GET_BLOGS = gql`
    query Feed($filters: Filters) {
        response: feed(filters: $filters) {
            edges {
                node {
                    id
                    title
                    brief
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

export { GET_BLOGS };
