import { useQueryPost } from '@/hooks/useQueryPost';
import { snackbarToast } from '@/components/snackbar';
import { useRouter } from 'next/navigation';
import { useLoginCredentials } from '@/context/auth-context';
import { useState } from 'react';
import { utils } from '@/utils';

export const initialValues = {
    email: '',
    password: '',
};

export const validationSchema = utils.getValidationSchema([
    {
        name: 'email',
        type: 'email',
        errorMessage: 'Please enter a valid email address',
    },
    {
        name: 'password',
        type: 'password',
        errorMessage: 'Please enter your password',
    },
]);

export const userLoginService = () => {
    const { mutate } = useQueryPost();
    const router = useRouter();
    const { setLoginCredentials } = useLoginCredentials();

    const [loading, setLoading] = useState(false);

    const onLoginSubmit = (values: typeof initialValues) => {
        setLoading(true);
        mutate(
            {
                url: 'login',
                data: values,
            },
            {
                onSuccess: (response) => {
                    snackbarToast.success('OTP sent successfully');
                    router.push('/auth/otp-verify');
                    setLoginCredentials(values);
                },
                onError: (error: any) => {
                    snackbarToast.error(error?.response?.data?.message);
                    setLoading(false);
                },
            },
        );
    };

    return {
        onLoginSubmit,
        loading,
    };
};
