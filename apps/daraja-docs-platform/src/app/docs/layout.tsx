'use client';

import { Container, Stack, Box } from '@mui/material';
import { VersionManagerContextProvider, AppAIProvider } from '../../shared/context';
import LeftNav from '../_components/LeftNav';
import { AIDrawer } from './AIDrawer';

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <VersionManagerContextProvider>
            <AppAIProvider>
                <Container maxWidth="lg" sx={{ px: '0px !important', flex: 1 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }}>
                        <LeftNav />
                        <Box sx={{ flex: 1, overflow: 'hidden' }}>{children}</Box>
                    </Stack>

                    <AIDrawer />
                </Container>
            </AppAIProvider>
        </VersionManagerContextProvider>
    );
};

export default DocsLayout;
