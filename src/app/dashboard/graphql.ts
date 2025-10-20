import { gql } from '@apollo/client';

export const GET_APPS = gql`
    mutation {
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
