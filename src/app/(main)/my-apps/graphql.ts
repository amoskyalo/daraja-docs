import { gql } from '@apollo/client';

export const GET_APPS = gql`
    mutation {
        getMyApps {
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
            }
        }
    }
`;
