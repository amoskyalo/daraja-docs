'use client';

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { SetContextLink } from '@apollo/client/link/context';
import { handleGetSession } from '@/functions/serverActions';

let apolloClient: ApolloClient | null = null;

const asyncAuthLink = new SetContextLink(async (prevContext, operation) => {
    const token = await handleGetSession();

    return {
        headers: {
            ...prevContext.headers,
            Authorization: `Bearer ${token}`,
        },
    };
});

function getApolloClient() {
    apolloClient ??= new ApolloClient({
        link: asyncAuthLink.concat(new HttpLink({ uri: 'http://localhost:4000/' })),
        cache: new InMemoryCache(),
    });
    return apolloClient;
}

const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
    const client = getApolloClient();

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
