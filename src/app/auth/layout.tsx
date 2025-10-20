'use client';

import { Grid, Box } from '@mui/material';
import { LoginCredentialsContextProvider } from '@/shared/context';
import Image from 'next/image';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
    return (
        <LoginCredentialsContextProvider>
            <Grid container sx={{ height: '100dvh', maxHeight: '100dvh', overflow: 'hidden', position: 'relative' }}>
                <Grid size={5}>{children}</Grid>

                <Grid size={7} sx={{ height: '100%', overflow: 'hidden' }}>
                    <Image
                        src="/images/dev.webp"
                        alt="auth"
                        width={500}
                        height={500}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Grid>

                <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
                    <Image
                        src="/images/saf-logo.svg"
                        alt="auth"
                        width={500}
                        height={500}
                        style={{ width: '150px', height: '50px', objectFit: 'contain' }}
                    />
                </Box>
            </Grid>
        </LoginCredentialsContextProvider>
    );
}
