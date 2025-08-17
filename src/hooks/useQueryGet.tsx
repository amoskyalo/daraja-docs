import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/api/axios-instance';
import { snackbarToast } from '@/components/snackbar';
import { urls } from '@/api/urls';
import { GetParams, APIResponse } from '@/types/hooks';

export const useQueryGet = <TData, TParams>(args: GetParams<TData, TParams>) => {
    const { url, params, options, id } = args;

    const endpoint = id ? `${urls[url]}${id}/` : urls[url];

    return useQuery<APIResponse<TData>>({
        queryKey: [url, JSON.stringify(params)],
        queryFn: async () => {
            try {
                const response = await axiosInstance.get(endpoint, { params });
                return response.data;
            } catch (error: any) {
                if (error?.message === 'Network Error') {
                    snackbarToast.error('No internet connection.');
                }

                if (error.status === 401) {
                    snackbarToast.error('Unauthorized');
                    window.location.replace('/auth/login');
                }
            }
        },
        ...options,
    });
};
