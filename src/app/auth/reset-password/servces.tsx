import { useQueryPost } from '@/hooks/useQueryPost';
import { snackbarToast } from '@/components/snackbar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginCredentials } from '@/context/auth-context';

export const resetPasswordService = () => {
    const { mutate } = useQueryPost();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { loginCredentials } = useLoginCredentials();

    const resetPassword = (values: { otp: string, new_password: string }) => {
        setLoading(true);
        mutate(
            {
                url: 'resetPassword',
                data: {
                    email: loginCredentials?.email,
                    ...values,
                },
            },
            {
                onSuccess: (response) => {
                    setLoading(false);
                    snackbarToast.success('Password reset successful');
                    router.push('/auth/login');
                },
                onError: (error: any) => {
                    snackbarToast.error(error?.response?.data?.message);
                    setLoading(false);
                },
            },
        );
    };

    return { resetPassword, loading };
};
