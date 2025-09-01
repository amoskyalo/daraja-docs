'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { User, UserAuthType } from './types';
import { usePathname } from 'next/navigation';

const LoginCredentialsContext = createContext<any>(null);
const AuthContext = createContext<UserAuthType | null>(null);

export const LoginCredentialsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [loginCredentials, setLoginCredentials] = useState<null | { email: string; password: string }>(null);

    const values = useMemo(() => ({ loginCredentials, setLoginCredentials }), [loginCredentials, setLoginCredentials]);
    return <LoginCredentialsContext.Provider value={values}>{children}</LoginCredentialsContext.Provider>;
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    // const { data: user, isLoading } = useQueryGet<User, any>({
    //     url: 'profile',
    //     options: { refetchOnWindowFocus: false, enabled: !pathname.includes('/docs') },
    // });

    // const values = useMemo(() => ({ user: user?.data, isLoading }), [user, isLoading]);

    const values = null;

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useLoginCredentials = () => {
    const context = useContext(LoginCredentialsContext);
    if (!context) {
        throw new Error('useLoginCredentials must be used within a LoginCredentialsContextProvider');
    }
    return context;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
};
