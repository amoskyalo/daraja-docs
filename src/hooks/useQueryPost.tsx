import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/api/axios-instance';
import { MutationParams } from '@/types/hooks';
import { urls } from '@/api/urls';

export const useQueryPost = <TData, TParams>() => {
    return useMutation({
        mutationFn: async ({ data, params, url, id }: MutationParams<TData, TParams>) => {
            const endpoint = id ? `${urls[url]}${id}/` : urls[url];

            const response = await axiosInstance.post(endpoint, data, { params });
            return response.data;
        },
    });
};
