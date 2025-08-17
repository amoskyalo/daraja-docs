'use client';

import { Grid } from '@mui/material';

import { useResponsiveness } from '@/hooks/useResponsiveness';

export default function DocsContainer({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Grid
            id="docs-container"
            container
            sx={{ height: '100%', overflowY: 'auto', position: 'relative', overflowX: 'hidden' }}
        >
            {children}
        </Grid>
    );
}

export const MainPanel = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const { isMobile } = useResponsiveness();

    return (
        <Grid size={isMobile ? 12 : 9} sx={{ pl: 4, py: 2, pr: 16 }}>
            {children}
        </Grid>
    );
};

export const SidebarPanel = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const { isMobile } = useResponsiveness();

    return (
        <Grid
            size={isMobile ? 0 : 3}
            sx={{
                p: 2,
                height: '100%',
                overflowY: 'auto',
                position: 'sticky',
                top: 0,
                display: isMobile ? 'none' : 'block',
            }}
        >
            {children}
        </Grid>
    );
};
