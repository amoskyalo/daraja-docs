'use client';

import { ApolloClientProvider } from '../../shared/context';

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
    return <ApolloClientProvider>{children}</ApolloClientProvider>;
}
