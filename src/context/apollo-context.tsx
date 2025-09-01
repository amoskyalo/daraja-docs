'use client';

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

let apolloClient: ApolloClient | null = null;

function getApolloClient() {
    apolloClient ??= new ApolloClient({
        link: new HttpLink({ uri: 'http://localhost:4000/' }),
        cache: new InMemoryCache(),
    });
    return apolloClient;
}

const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
    const client = getApolloClient();

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
