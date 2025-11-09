'use client';

import { Stack, Box, LinearProgress } from '@mui/material';
import {
    AuthContextProvider,
    VersionManagerContextProvider,
    AppAIProvider,
    AppThemeProvider,
    ApolloClientProvider,
} from '../../shared/context';
import { SnackbarContainer } from '../../shared/components/ui/snackbar';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import ProgressBar from './ProgressBar';
import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith('/auth');

    return (
        <>
            <ProgressBar />
            <AppThemeProvider>
                <Suspense fallback={<LinearProgress />}>
                <ApolloClientProvider>
                    <AuthContextProvider>
                        <AppAIProvider>
                            <VersionManagerContextProvider>
                                <SnackbarContainer />
                                <Stack
                                    id="layout"
                                    direction="column"
                                    sx={{
                                        height: '100dvh',
                                        overflowY: 'auto',
                                        overflowX: 'hidden',
                                        position: 'relative',
                                    }}
                                >
                                    {!isAuthPage && <Header />}
                                    <Box sx={{ flex: 1 }}>{children}</Box>
                                </Stack>
                            </VersionManagerContextProvider>
                        </AppAIProvider>
                    </AuthContextProvider>
                </ApolloClientProvider>
            </Suspense>
            </AppThemeProvider>
        </>
    );
};

export default Layout;
