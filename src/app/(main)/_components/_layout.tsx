'use client';

import { useMemo, useState, Suspense, useEffect } from 'react';
import { Session } from '@toolpad/core/AppProvider';
import { DashboardLayout as MUIDashboardLayout } from '@toolpad/core/DashboardLayout';
import NAVIGATION from '@/constants/routes';
import { Stack, Box, TextField, InputAdornment, Typography, CircularProgress, IconButton } from '@mui/material';
import { ProfileDialog } from '@/components/dialogs/profile-dialog';
import { NextAppProvider } from '@toolpad/core/nextjs';
import LinearProgress from '@mui/material/LinearProgress';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import branding from '@/constants/branding';
import { Account } from '@toolpad/core/Account';
import { createTheme } from '@mui/material/styles';
import { colors } from '@/theme/theme';
import SearchModal from '@/components/modals/algolia-search';
import { useResponsiveness } from '@/hooks/useResponsiveness';
import { useAuth } from '@/context/auth-context';
import { usePathname } from 'next/navigation';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [searchModalOpen, setSearchModalOpen] = useState(false);

    const { user, isLoading: loadingProfile } = useAuth();
    const [session, setSession] = useState<Session | null>({
        user: {
            name: user?.first_name + ' ' + user?.last_name,
            email: user?.email,
            image: '',
        },
    });

    useEffect(() => {
        setSession({
            user: {
                name: user?.first_name + ' ' + user?.last_name,
                email: user?.email,
                image: '',
            },
        });
    }, [user]);

    const authentication = useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: user?.first_name + ' ' + user?.last_name,
                        email: user?.email,
                        image: '',
                    },
                });
            },
            signOut: () => {
                setSession(null);
            },
        };
    }, [user]);

    const theme = createTheme({
        cssVariables: {
            colorSchemeSelector: 'data-toolpad-color-scheme',
        },
        colorSchemes: {
            light: {
                palette: {
                    background: {
                        default: '#F9F9FE',
                        paper: '#EEEEF9',
                    },
                },
            },
            dark: {
                palette: {
                    mode: 'dark',
                    primary: colors.primary,
                    secondary: colors.secondary,
                    background: {
                        default: '#121212',
                        paper: '#121212',
                        paperChannel: '#121212',
                    },
                    text: {
                        primary: '#F1F5F9',
                        secondary: '#94A3B8',
                    },
                    divider: 'rgba(255, 255, 255, 0.05)',
                },
            },
        },
    });

    const { isMobile } = useResponsiveness();

    const appBranding = branding.component({ isMobile });
    const pathname = usePathname();

    const canShowLoadingSpinner = pathname === '/dashboard/applications';

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (searchModalOpen) return;

            const { ctrlKey, key } = e;

            if (ctrlKey && key === 'k') {
                e.preventDefault();
                setSearchModalOpen(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [searchModalOpen]);

    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <Suspense fallback={<LinearProgress />}>
                {canShowLoadingSpinner && loadingProfile && (
                    <Box
                        sx={{
                            flex: 1,
                            overflowX: 'hidden',
                            backgroundColor: '#121212',
                            height: '100dvh',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}

                {!loadingProfile && (
                    <NextAppProvider
                        navigation={NAVIGATION}
                        session={session}
                        authentication={authentication}
                        branding={appBranding}
                        theme={theme}
                    >
                        <MUIDashboardLayout
                            slots={{
                                toolbarActions: () => (
                                    <Stack direction="row" alignItems="center">
                                        {!isMobile && (
                                            <TextField
                                                placeholder="Search documentation"
                                                onClick={() => setSearchModalOpen(true)}
                                                sx={{
                                                    marginRight: 1,
                                                    width: 220,
                                                    borderRadius: 2,
                                                    border: 1,
                                                    borderColor: 'divider',
                                                    cursor: 'pointer',
                                                    '& .MuiOutlinedInput-root': {
                                                        height: 34,
                                                        fontSize: 14,
                                                        paddingRight: 1,
                                                        cursor: 'pointer',
                                                        '& fieldset': {
                                                            border: 'none',
                                                        },
                                                        '&:hover fieldset': {
                                                            border: 'none',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            border: 'none',
                                                        },
                                                    },
                                                }}
                                                slotProps={{
                                                    input: {
                                                        endAdornment: (
                                                            <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                                                                <Stack direction="row" spacing={0.5}>
                                                                    <Typography
                                                                        sx={{
                                                                            lineHeight: 0,
                                                                            fontSize: 10,
                                                                            paddingY: 1.1,
                                                                            paddingX: 0.5,
                                                                            backgroundColor: 'rgba(0, 0, 0,1)',
                                                                            borderRadius: 0.7,
                                                                        }}
                                                                    >
                                                                        CtrlK
                                                                    </Typography>
                                                                </Stack>
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                            />
                                        )}

                                        <IconButton size="small" sx={{ mr: 1, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                                            <AutoAwesomeOutlinedIcon />
                                        </IconButton>

                                        <Account
                                            slots={{
                                                popoverContent: ProfileDialog,
                                            }}
                                            slotProps={{
                                                preview: {
                                                    slotProps: {
                                                        avatar: {
                                                            sx: {
                                                                borderRadius: 2,
                                                            },
                                                        },
                                                        avatarIconButton: {
                                                            sx: {
                                                                border: 1,
                                                                borderColor: 'divider',
                                                                borderRadius: 2,
                                                                height: 32,
                                                                width: 32,
                                                                padding: 1,
                                                                overflow: 'hidden',
                                                            },
                                                        },
                                                    },
                                                },
                                            }}
                                        />
                                    </Stack>
                                ),
                            }}
                            disableCollapsibleSidebar
                        >
                            <Box sx={{ flex: 1, overflowX: 'hidden', backgroundColor: '#121212' }}>{children}</Box>
                        </MUIDashboardLayout>

                        <SearchModal open={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
                    </NextAppProvider>
                )}
            </Suspense>
        </AppRouterCacheProvider>
    );
};

export default DashboardLayout;
