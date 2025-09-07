import { gql } from '@apollo/client';

const GET_REPOSITORIES = gql`
    query Feed($params: Params) {
        repositories(params: $params) {
            items {
                id
                full_name
                description
                url
                stargazers_count
                owner {
                    avatar_url
                }
            }
            total_count
        }
    }
`;

export { GET_REPOSITORIES };
