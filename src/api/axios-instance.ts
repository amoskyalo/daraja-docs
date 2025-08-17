import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
import { handleGetSession } from '@/functions/serverActions';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({ baseURL });

export const setAuthToken = async () => {
    const token = await handleGetSession();
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};

axiosInstance.interceptors.request.use(async (config) => {
    const { url } = config;

    if (url !== 'auth/login/' && url !== 'auth/login/otp/') {
        if (!config.headers.Authorization) {
            const token = await handleGetSession();
            if (token) {
                config.headers.set('Authorization', `Bearer ${token}`);
            }
        }
    }

    return config;
});

export const queryClient = new QueryClient();
