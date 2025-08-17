'use client';

import { useSearchParams as useSearchParamsHook, useRouter } from 'next/navigation';
import { utils } from '@/utils';

export const useSearchParams = () => {
    const searchParams = useSearchParamsHook();
    const router = useRouter();
    const { isDefaultPagination } = utils;

    const setParams = (params: Record<string, string | null | undefined | number>) => {
        const p = new URLSearchParams(searchParams);

        Object.entries(params).forEach(([key, value]) => {
            if (value && !isDefaultPagination(key, value)) {
                p.set(key, String(value));
            } else {
                p.delete(key);
            }
        });

        router.push(`?${p.toString()}`);
    };

    const getSearchParams = (params: string[]) => {
        const searchParams = useSearchParamsHook();
        return params.reduce(
            (acc, param) => ({
                ...acc,
                [param]: searchParams.get(param),
            }),
            {}
        );
    };

    const getParam = (key: string) => useSearchParamsHook().get(key);

    return { setParams, getParam, getSearchParams };
};
