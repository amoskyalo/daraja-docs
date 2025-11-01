import gql from 'graphql-tag';

export const Auth = gql`
    input LoginPayload {
        email: String!
        password: String!
    }

    type AuthResponse {
        token: String
    }

    type Mutation {
        login(payload: LoginPayload): AuthResponse
    }
`;
