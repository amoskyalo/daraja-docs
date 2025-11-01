import gql from 'graphql-tag';

export const Apps = gql`
    type product {
        apiproduct: String!
        status: String!
    }

    type App {
        no: Int!
        app: String!
        ConsumerKey: String!
        ConsumerSecret: String!
        ShortCode: String
        products: [product]
        CreatedAt: String!
        domain: String!
        expired: Boolean!
        status: String!
    }

    type AppsResponse {
        apps: [App]
    }

    type DeleteResponse {
        title: String!
        content: String!
    }

    input PayloadProduct {
        name: String!
        alias: String!
        description: String!
    }

    input Payload {
        AppName: String!
        products: [PayloadProduct]
    }

    type Mutation {
        getMyApps: AppsResponse
        createApp(payload: Payload): App
        deleteApp(AppName: String!): DeleteResponse
    }
`;
