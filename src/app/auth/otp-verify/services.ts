import { useQueryPost } from '@/hooks/useQueryPost';
import { snackbarToast } from '@/components/snackbar';
import { useState } from 'react';
import { UserLoginResponse } from './types';
import { handleSetSession } from '@/functions/serverActions';
import { useRouter } from 'next/navigation';

export const userVerifyOTP = ({ loginCredentials }: { loginCredentials: { email: string; password: string } }) => {
    const { mutate } = useQueryPost();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onOtpSubmit = (values: { otp: string }) => {
        setLoading(true);
        mutate(
            {
                url: 'otpVerify',
                data: {
                    ...loginCredentials,
                    ...values,
                },
            },
            {
                onSuccess: async (response: UserLoginResponse) => {
                    setLoading(false);
                    snackbarToast.success('Login successful');
                    await handleSetSession({ token: response.access_token });
                    router.push('/dashboard/applications');
                },
                onError: (error: any) => {
                    snackbarToast.error(error?.response?.data?.message);
                    setLoading(false);
                },
            },
        );
    };

    return { onOtpSubmit, loading };
};
