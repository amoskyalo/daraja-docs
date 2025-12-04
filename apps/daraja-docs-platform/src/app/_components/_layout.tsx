'use client';

import { Stack, Box } from '@mui/material';
import { AppThemeProvider } from '../../shared/context';
import { SnackbarContainer } from '../../shared/components/ui/snackbar';
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
            </AppThemeProvider>
        </>
    );
};

export default Layout;
