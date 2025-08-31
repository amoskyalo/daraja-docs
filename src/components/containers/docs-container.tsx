'use client';

import { Grid, Breadcrumbs, Link as MUILink, Typography, Box } from '@mui/material';
import { useResponsiveness } from '@/hooks/useResponsiveness';
import { useRouter } from 'next/navigation';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { apiList } from '@/constants/api-list';

export default function DocsContainer({ children }: Readonly<{ children: React.ReactNode }>) {
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
}

export const MainPanel = ({ children, slug }: Readonly<{ children: React.ReactNode; slug?: string }>) => {
    const { isMobile } = useResponsiveness();
    const router = useRouter();
    const doc = apiList.find((item: any) => item.slug === slug);
    const breadcrumbs = [
        <MUILink
            underline="hover"
            key="1"
            color="inherit"
            href="/apis"
            onClick={(e) => {
                e.preventDefault();
                router.push('/apis');
            }}
        >
            APIs
        </MUILink>,
        <Typography key="2" sx={{ color: 'text.primary', textTransform: 'capitalize' }}>
            {doc?.title}
        </Typography>,
    ];

    return (
        <Grid size={isMobile ? 12 : 9} sx={{ pb: 4, pl: { xs: 1, md: 1, lg: 0 }, pr: { xs: 2, md: 2, lg: 10 } }}>
            {slug && (
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{ pt: 2, pb: 2 }}
                >
                    {breadcrumbs}
                </Breadcrumbs>
            )}
            <Box sx={{ mt: slug ? 0 : 2 }}>{children}</Box>
        </Grid>
    );
};

export const SidebarPanel = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const { isMobile } = useResponsiveness();

    return (
        <Grid
            size={isMobile ? 0 : 3}
            sx={{
                py: 2,
                px: 2,
                overflowY: 'auto',
                position: 'sticky',
                top: '66px',
                display: isMobile ? 'none' : 'block',
                height: 'calc(100vh - 66px)',
            }}
        >
            {children}
        </Grid>
    );
};
