'use client';

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { SetContextLink } from '@apollo/client/link/context';
import { handleGetSession } from '@/functions/serverActions';

const uri = "https://1769047e59fe.ngrok-free.app/";
let apolloClient: ApolloClient | null = null;

const asyncAuthLink = new SetContextLink(async (prevContext, operation) => {
    const token = await handleGetSession();

    return {
        headers: {
            ...prevContext.headers,
            Authorization: token,
        },
    };
});

const getApolloClient = () => {
    apolloClient ??= new ApolloClient({
        link: asyncAuthLink.concat(new HttpLink({ uri })),
        cache: new InMemoryCache(),
    });
    return apolloClient;
};

export const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
    const client = getApolloClient();

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
