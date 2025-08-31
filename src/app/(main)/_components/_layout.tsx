'use client';

import { Suspense } from 'react';
import { Container, LinearProgress, Stack } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Header from './Header';
import LeftNav from './LeftNav';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <Suspense fallback={<LinearProgress />}>
                <Stack
                    id="layout"
                    direction="column"
                    sx={{ height: 'calc(100vh - 1px)', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}
                >
                    <Header />
                    <Container maxWidth="lg" sx={{ px: '0px !important', flex: 1 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{ width: '100%', height: '100%', position: 'relative' }}
                        >
                            <LeftNav />

                            {children}
                        </Stack>
                    </Container>
                </Stack>
            </Suspense>
        </AppRouterCacheProvider>
    );
};

export default DashboardLayout;
