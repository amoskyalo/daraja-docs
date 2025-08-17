import { useState } from 'react';
import { useQueryPost } from '@/hooks/useQueryPost';
import { snackbarToast } from '@/components/snackbar';

export const initialValues = {
    name: '',
    environment: 'SANDBOX',
    scope_id: '',
    account_number: '600980',
    callback_url: '',
    otp: '',
};

export const applicationsService = () => {
    const [loading, setLoading] = useState(false);
    const { mutate } = useQueryPost();

    const createApplication = async ({
        values,
        successCallback,
    }: {
        values: typeof initialValues;
        successCallback?: () => void;
    }) => {
        setLoading(true);
        const { otp, ...rest } = values;

        const payload = {
            ...rest,
            ...otp && { otp },
        };

        mutate(
            {
                url: otp ? 'applicationsVerify' : 'applications',
                data: payload,
            },
            {
                onSuccess: () => {
                    setLoading(false);
                    successCallback?.();
                    if (!otp) {
                        snackbarToast.success('Application created successfully');
                    }
                },
                onError: (error: any) => {
                    setLoading(false);
                    snackbarToast.error(error?.response?.data?.message);
                },
            },
        );
    };

    return {
        createApplication,
        loading,
    };
};
