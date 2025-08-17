import { useState } from 'react';
import { useQueryPost } from '@/hooks/useQueryPost';
import { snackbarToast } from '@/components/snackbar';
import { useRouter } from 'next/navigation';
import { useLoginCredentials } from '@/context/auth-context';

export const forgetPasswordService = () => {
    const [loading, setLoading] = useState(false);
    const { mutate } = useQueryPost();
    const router = useRouter();
    const { setLoginCredentials } = useLoginCredentials();

    const requestPasswordReset = (values: { email: string }) => {
        setLoading(true);
        mutate(
            {
                url: 'requestPasswordReset',
                data: values,
            },
            {
                onSuccess: (response) => {
                    snackbarToast.success('OTP sent successfully');
                    router.push('/auth/reset-password');
                    setLoginCredentials(values);
                    setLoading(false);
                },
                onError: (error: any) => {
                    snackbarToast.error(error?.response?.data?.message);
                    setLoading(false);
                },
            },
        );
    };

    return { requestPasswordReset, loading };
};
