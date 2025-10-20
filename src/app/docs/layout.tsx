'use client';

import { Container, Stack, Box } from '@mui/material';
import LeftNav from '../_components/LeftNav';

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container maxWidth="lg" sx={{ px: '0px !important', flex: 1 }}>
            <Stack direction="row">
                <LeftNav />
                <Box sx={{ flex: 1, overflow: 'hidden' }}>{children}</Box>
            </Stack>
        </Container>
    );
};

export default DocsLayout;
