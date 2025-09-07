import { gql } from '@apollo/client';

const GET_BLOGS = gql`
    query Feed($first: Int) {
        response: feed(first: $first) {
            edges {
                node {
                    id
                    title
                    brief
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
