import { gql } from '@apollo/client';

export const GET_APPS = gql`
    query {
        response: getMyApps {
            apps {
                no
                app
                ConsumerKey
                ConsumerSecret
                ShortCode
                products {
                    apiproduct
                    status
                }
                CreatedAt
                domain
                expired
                status
            }
        }
    }
`;

export const DELETE_APP = gql`
    mutation DeleteApp($AppName: String!) {
        response: deleteApp(AppName: $AppName) {
            title
            content
        }
    }
`;

export const CREATE_APP = gql`
    mutation CreateApp($payload: Payload!) {
        response: createApp(payload: $payload) {
            app
        }
    }
`;
