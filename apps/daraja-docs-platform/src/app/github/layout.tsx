'use client';

import { ApolloClientProvider } from '../../shared/context';

export default function GithubLayout({ children }: { children: React.ReactNode }) {
    return <ApolloClientProvider>{children}</ApolloClientProvider>;
}
