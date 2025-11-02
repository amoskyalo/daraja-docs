import { useMutation } from '@apollo/client/react';
import { LOGIN } from './graphql';
import { utils } from '../../../shared/utils';
import { handleSetSession } from '../../../functions/serverActions';
import { snackbarToast } from '../../../shared/components/ui/snackbar';

const initialValues = { email: '', password: '' };

const validationSchema = utils.getValidationSchema([
    {
        name: 'email',
        type: 'string',
        errorMessage: 'Please enter a valid email address or username',
    },
    {
        name: 'password',
        type: 'password',
        errorMessage: 'Please enter a valid password',
    },
]);

const useLogin = () => {
    const [loginMutation, { loading }] = useMutation(LOGIN);

    const handleLogin = (values: any) => {
        loginMutation({
            variables: {
                payload: values,
            },
            onCompleted: async (res: any) => {
                snackbarToast.success("Login successful");
                await handleSetSession({ token: res.login.token });
                window.location.replace("/dev-console")
            },
            onError: (error) => {
                snackbarToast.error("Login failed");
            },
        });
    };

    return {
        loading,
        handleLogin,
    };
};

export { useLogin, initialValues, validationSchema };
