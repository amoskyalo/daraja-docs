'use client';

import { Container } from '@mui/material';
import { LoginCredentialsContextProvider } from '@/context/auth-context';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
    return (
        <LoginCredentialsContextProvider>
            <Container
                maxWidth="xl"
                sx={{
                    height: '100vh',
                    display: 'flex',
                    position: 'relative',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {children}
            </Container>
        </LoginCredentialsContextProvider>
    );
}
