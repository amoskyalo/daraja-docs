import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client/react';
import { GET_APPS } from './graphql';

export const useApps = () => {
    const [apps, setApps] = useState([]);

    const [getApps, { loading, error }] = useMutation(GET_APPS, {
        onCompleted: (res: any) => {
            setApps(res?.response?.apps);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    useEffect(() => {
        getApps();
    }, []);

    return { apps, loading, error, refetch: getApps };
};
