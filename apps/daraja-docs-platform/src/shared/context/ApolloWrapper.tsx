'use client';

import { ApolloClientProvider } from './ApolloContext';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
    return <ApolloClientProvider>{children}</ApolloClientProvider>;
}
