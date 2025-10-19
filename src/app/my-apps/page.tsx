'use client';

import { Box, Typography, Tabs, Tab, Stack, Button } from '@mui/material';
import { useApps } from './services';
import { gridConstructor } from '@/features/datagrid';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import AddIcon from '@mui/icons-material/Add';

const MyAppsPage = () => {
    const { apps, loading } = useApps();

    const { render } = new gridConstructor({
        grid: {
            columns: [
                { field: 'app', headerName: 'App', width: 200 },
                {
                    field: 'CreatedAt',
                    headerName: 'Created On',
                    width: 150,
                    valueGetter: (__, row) =>
                        new Date(parseInt(row.CreatedAt)).toLocaleString('en-GB', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                        }),
                },
                { field: 'domain', headerName: 'Domain' },
                { field: 'expired', headerName: 'Expired', type: 'boolean' },
                { field: 'status', headerName: 'Status' },
                {
                    field: 'products',
                    headerName: 'Total products',
                    valueGetter: (__, row) => row.products.length,
                    headerAlign: 'center',
                    align: 'center',
                },
                { field: 'ShortCode', headerName: 'Short Code' },
            ],
            rows: apps ?? [],
            loading,
            actions: ['options'],
            options: [
                {
                    name: 'Secrets',
                    onClick: () => {},
                    icon: <RemoveRedEyeOutlinedIcon fontSize="small" />,
                },
                {
                    name: 'Products',
                    onClick: () => {},
                    icon: <LabelOutlinedIcon fontSize="small" />,
                },
                {
                    name: 'Delete',
                    onClick: () => {},
                    icon: <DeleteOutlineOutlinedIcon fontSize="small" color="error" />,
                },
            ],
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

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 2, borderBottom: 1, borderColor: 'divider' }}
            >
                <Tabs value={0}>
                    <Tab label="Sandbox" />
                    <Tab label="Production" />
                    <Tab label="Revoked" />
                </Tabs>

                <Button
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        borderRadius: 1.5,
                        py: 0.5,
                        pl: 0.5,
                        pr: 1,
                        height: 'max-content !important',
                        gap: 0.5,
                    }}
                    variant="outlined"
                >
                    <AddIcon sx={{ fontSize: 18 }} />
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        New app
                    </Typography>
                </Button>
            </Stack>
            {render()}
        </Box>
    );
};

export default MyAppsPage;
