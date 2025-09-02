'use client';

import { Box, Typography, Tabs, Tab } from '@mui/material';
import { useApps } from './services';
import { gridConstructor } from '@/ui-models/datagrid-constructor';

const MyAppsPage = () => {
    const { apps, loading, error, refetch } = useApps();

    const { render } = new gridConstructor({
        grid: {
            columns: [
                { field: 'app', headerName: 'App' },
                { field: 'ConsumerKey', headerName: 'Consumer Key' },
                { field: 'ConsumerSecret', headerName: 'Consumer Secret' },
                { field: 'ShortCode', headerName: 'Short Code' },
            ],
            rows: [],
        },
    }).grid();

    return (
        <Box sx={{ py: 2, width: '100%', overflow: 'hidden' }}>
            <Typography variant="h5" sx={{ fontWeight: '600' }}>
                My Apps
            </Typography>
            <Typography sx={{ maxWidth: '75%', mt: 0.5 }}>
                All your apps appear here. Sandbox apps are marked grey, production apps are marked green while revoked
                apps are marked red.
            </Typography>

            <Tabs value={0} sx={{ mt: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Tab label="Sandbox" />
                <Tab label="Production" />
                <Tab label="Revoked" />
            </Tabs>
            {render()}
        </Box>
    );
};

export default MyAppsPage;
