import { utils } from '@/utils';
import { useQueryPost } from '@/hooks/useQueryPost';
import { useState } from 'react';
import { snackbarToast } from '@/components/snackbar';

export const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '' as any,
};

export const validationSchema = utils.getValidationSchema([
    {
        name: 'first_name',
        type: 'string',
        errorMessage: 'Please enter your first name',
    },
    {
        name: 'last_name',
        type: 'string',
        errorMessage: 'Please enter your last name',
    },
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
    {
        name: 'phone_number',
        type: 'phoneNumber',
        errorMessage: 'Please enter your phone number',
    },
]);

export const userSignupService = () => {
    const { mutate } = useQueryPost();
    const [loading, setLoading] = useState(false);

    const onSubmit = ({phone_number, ...rest}: typeof initialValues) => {

        const payload = {
            ...rest,
            mobile_number: phone_number.phone + phone_number.value.replace(/\s/g, ''),
            country_code: phone_number.code,
        };

        setLoading(true);
        mutate(
            {
                url: 'register',
                data: payload,
            },
            {
                onSuccess: () => {
                    setLoading(false);
                    snackbarToast.success('User registered successfully');
                },
                onError: (error: any) => {
                    setLoading(false);
                    snackbarToast.error(error?.response?.data?.message);
                },
            },
        );
    };

    return {
        onSubmit,
        loading,
    };
};
