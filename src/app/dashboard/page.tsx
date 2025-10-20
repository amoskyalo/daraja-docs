'use client';

import { Box, Typography, Stack, Container, alpha, Chip } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import VpnLockOutlinedIcon from '@mui/icons-material/VpnLockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useState } from 'react';
import { useApps } from './services';
import { gridConstructor } from '@/features/datagrid';

const dashboardTabs = [
    {
        label: 'Apps',
        value: 0,
        description: 'View, edit, delete, and manage all your developer apps',
        icon: <AppsOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
        label: 'Test Credentials',
        value: 1,
        description:
            'Encrypt your initiator password. Sandbox passwords are pre-set; production passwords are created on the M-PESA portal.',
        icon: <LockOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
        label: 'Go Live',
        value: 2,
        description: "Tested the APIs in sandbox? You're ready for production!",
        icon: <RocketLaunchOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
        label: 'URL Management',
        value: 3,
        description:
            'Register, update, or delete your C2B URLs used by Daraja to send transaction callbacks and notifications.',
        icon: <LinkOutlinedIcon fontSize="small" />,
    },
    {
        label: 'Incident Management',
        value: 4,
        description: 'All tickets appear here',
        icon: <ErrorOutlineOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
        label: 'VPN/MPLS Connection',
        value: 5,
        description: 'My Requests',
        icon: <VpnLockOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
        label: 'Profile',
        value: 6,
        description: 'Keep your profile up to date with your latest email, username, and account details.',
        icon: <PersonOutlineOutlinedIcon fontSize="small" />,
    },
];

const DashboardPage = () => {
    const { apps, loading } = useApps();
    const [activeTab, setActiveTab] = useState(0);
    const currentTabData = dashboardTabs[activeTab];

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
                    headerName: 'Total Products',
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
                    icon: <RemoveRedEyeOutlinedIcon fontSize="small" />,
                    onClick: () => {},
                },
                {
                    name: 'Products',
                    icon: <LabelOutlinedIcon fontSize="small" />,
                    onClick: () => {},
                },
                {
                    name: 'Delete',
                    icon: <DeleteOutlineOutlinedIcon fontSize="small" color="error" />,
                    onClick: () => {},
                },
            ],
        },
    }).grid();

    return (
        <Container maxWidth="lg" sx={{ px: { xs: 1, md: 0 } }}>
            <Box
                sx={{
                    position: 'relative',
                    height: 130,
                    borderRadius: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    backgroundImage: 'url(/images/green-background.svg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={(theme) => ({
                        position: 'absolute',
                        inset: 0,
                        px: 4,
                        pt: 2,
                        borderRadius: 3,
                        borderTopLeftRadius: 3,
                        borderTopRightRadius: 3,
                        backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.85 : 0.5),
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    })}
                >
                    <Box>
                        <Typography variant="h6" fontWeight={600} color="white">
                            {currentTabData.label}
                        </Typography>
                        <Typography variant="body2" color="white" sx={{ opacity: 0.9 }}>
                            {currentTabData.description}
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={0.5}>
                        {dashboardTabs.map((tab) => {
                            const active = tab.value === activeTab;
                            return (
                                <Chip
                                    key={tab.value}
                                    icon={tab.icon}
                                    label={tab.label}
                                    onClick={() => setActiveTab(tab.value)}
                                    variant={active ? 'filled' : 'outlined'}
                                    sx={(theme) => ({
                                        borderRadius: '8px 8px 0 0',
                                        fontWeight: 500,
                                        border: 'none',
                                        // backgroundColor: (theme) =>
                                        //     active
                                        //         ? theme.palette.mode === 'dark'
                                        //             ? 'action.selected'
                                        //             : 'background.default'
                                        //         : 'transparent',
                                        backgroundColor: (theme) => (active ? 'background.default' : 'transparent'),
                                        color: active ? theme.palette.text.primary : 'white',
                                        pl: 1,
                                        pr: 0.5,
                                        // boxShadow: (theme) => (theme.palette.mode === 'dark' && active ? 4 : 0),
                                        '& .MuiChip-icon': {
                                            color: active ? theme.palette.text.secondary : alpha('#fff', 0.8),
                                        },
                                    })}
                                />
                            );
                        })}
                    </Stack>
                </Box>
            </Box>

            <Box sx={{ py: 2, width: '100%', overflow: 'hidden' }}>{render()}</Box>
        </Container>
    );
};

export default DashboardPage;
