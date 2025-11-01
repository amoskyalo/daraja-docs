import gql from 'graphql-tag';

export const Respositories = gql`
    type Owner {
        avatar_url: String!
        login: String!
    }

    type Respository {
        id: ID!
        name: String!
        html_url: String!
        description: String
        url: String!
        stargazers_count: Int!
        owner: Owner!
    }

    type Response {
        items: [Respository]
        total_count: Int!
    }

    input Params {
        per_page: Int
        page: Int
        language: String
    }

    type Query {
        repositories(params: Params): Response
    }
`;
