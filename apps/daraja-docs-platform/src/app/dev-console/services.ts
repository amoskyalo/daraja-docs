import { useMutation, useQuery } from '@apollo/client/react';
import { GET_APPS, DELETE_APP, CREATE_APP } from './graphql';
import { PRODUCTS } from '@/config/constants';
import { snackbarToast } from '@/shared/components';

type CreateAppPayload = {
    payload: {
        AppName: string;
        products: typeof PRODUCTS;
    };
    callback: () => void;
};

type DeleteAppPayload = {
    payload: {
        AppName: string;
    };
    callback: () => void;
};

export const useApps = () => {
    const { data, loading, error, refetch } = useQuery(GET_APPS);
    const [deleteApp, { loading: deleteLoading }] = useMutation(DELETE_APP);
    const [createApp, { loading: createLoading }] = useMutation(CREATE_APP);

    const handleDelete = ({ payload, callback }: DeleteAppPayload) => {
        deleteApp({
            variables: payload,
            onCompleted: () => {
                snackbarToast.success('App deleted successfully!');
                callback();
            },
            onError: () => {
                snackbarToast.error('Failed to delete app!');
            },
            refetchQueries: [GET_APPS],
        });
    };

    const handleCreate = ({ payload, callback }: CreateAppPayload) => {
        createApp({
            variables: { payload },
            onCompleted: () => {
                snackbarToast.success('App created successfully!');
                callback();
            },
            onError: () => {
                snackbarToast.error('Failed to create app!');
            },
            refetchQueries: [GET_APPS],
        });
    };

    return {
        get: {
            apps: (data as any)?.response?.apps ?? [],
            loading,
            error,
            refetch,
        },
        mutation: {
            handleDelete,
            handleCreate,
            loading: deleteLoading || createLoading,
        },
    };
};
