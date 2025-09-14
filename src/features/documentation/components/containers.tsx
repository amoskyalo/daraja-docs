'use client';

import { Grid, Box } from '@mui/material';
import { useResponsiveness } from '@/shared/hooks/useResponsiveness';

export const DocsContainer = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <Grid
            id="docs-container"
            container
            sx={{
                height: '100%',
                position: 'relative',
                flex: 1,
            }}
        >
            {children}
        </Grid>
    );
};

export const MainPanel = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const { isMobile } = useResponsiveness();

    return (
        <Grid size={isMobile ? 12 : 8} sx={{ pb: 4, pl: { xs: 1, md: 1, lg: 0 }, pr: 2 }}>
            <Box sx={{ mt: 2 }}>{children}</Box>
        </Grid>
    );
};

export const SidebarPanel = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const { isMobile } = useResponsiveness();

    return (
        <Grid
            size={isMobile ? 0 : 4}
            sx={{
                py: 2,
                px: 2,
                overflowY: 'auto',
                position: 'sticky',
                top: '66px',
                display: isMobile ? 'none' : 'block',
                height: 'calc(100vh - 66px)',
                // border: '1px solid red',
            }}
        >
            {children}
        </Grid>
    );
};
