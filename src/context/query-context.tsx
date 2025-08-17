'use client';

import { QueryClientProvider as QueryClientProviderWrapper } from '@tanstack/react-query';
import { queryClient } from '@/api/axios-instance';

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
    return <QueryClientProviderWrapper client={queryClient}>{children}</QueryClientProviderWrapper>;
};

export default QueryClientProvider;
