import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation ($payload: LoginPayload) {
        login(payload: $payload) {
            token
        }
    }
`;
