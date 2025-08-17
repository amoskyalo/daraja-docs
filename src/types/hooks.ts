import { urls } from '@/api/urls';
import { UseQueryOptions } from '@tanstack/react-query';

export type APIResponse<TData> = {
    status: boolean;
    message: string;
    data: TData;
};

export type MutationParams<TData, TParams> = {
    data?: TData;
    params?: TParams;
    url: keyof typeof urls;
    id?: string | number | null;
};

export type GetParams<TData, TParams> = {
    url: keyof typeof urls;
    params?: TParams;
    options?: Omit<UseQueryOptions<APIResponse<TData>>, 'queryKey' | 'queryFn'>;
    id?: string | number | null;
};
