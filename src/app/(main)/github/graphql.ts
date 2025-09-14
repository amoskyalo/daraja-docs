import { gql } from '@apollo/client';

const GET_REPOSITORIES = gql`
    query Feed($params: Params) {
        repositories(params: $params) {
            items {
                id
                name
                html_url
                description
                url
                stargazers_count
                owner {
                    avatar_url
                    login
                }
            }
            total_count
        }
    }
`;

export { GET_REPOSITORIES };
