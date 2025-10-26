import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { AppBar, Toolbar, Typography, Container, Stack, Link, Box, Tooltip, IconButton, Drawer } from '@mui/material';
import { SearchModal } from '@/shared/components';
import { HEADERTABS } from '@/config/constants/routes';
import { usePathname, useRouter } from 'next/navigation';
import { Github } from 'lucide-react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import AccountMenu from './AccountMenu';
import ThemeSwitcher from './ThemeSwitcher';

const NavigationLink = memo(
    ({
        route,
        isActive,
        onNavigate,
        variant = 'body2',
    }: {
        route: { href: string; label: string };
        isActive: boolean;
        onNavigate: (href: string) => void;
        variant?: 'body1' | 'body2';
    }) => (
        <Link
            href={route.href}
            sx={{ textDecoration: 'none' }}
            color="inherit"
            onClick={(e) => {
                e.preventDefault();
                onNavigate(route.href);
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ opacity: isActive ? 1 : 0.7, '&:hover': { opacity: 1 } }}
            >
                <Typography
                    variant={variant}
                    sx={{
                        fontWeight: isActive ? '600' : '500',
                        color: isActive ? 'primary.main' : 'text.primary',
                    }}
                >
                    {route.label}
                </Typography>
            </Stack>
        </Link>
    )
);

NavigationLink.displayName = 'NavigationLink';

const Header = () => {
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    const matchPathname = useCallback(
        (path: string) => {
            return path.split('/')[1] === pathname.split('/')[1];
        },
        [pathname]
    );

    const handleNavigate = useCallback(
        (href: string) => {
            router.push(href);
        },
        [router]
    );

    const handleDrawerNavigate = useCallback(
        (href: string) => {
            router.push(href);
            setDrawerOpen(false);
        },
        [router]
    );

    const toggleDrawer = useCallback(() => {
        setDrawerOpen((prev) => !prev);
    }, []);

    const closeDrawer = useCallback(() => {
        setDrawerOpen(false);
    }, []);

    const openSearchModal = useCallback(() => {
        setSearchModalOpen(true);
    }, []);

    const closeSearchModal = useCallback(() => {
        setSearchModalOpen(false);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (searchModalOpen || !(e.ctrlKey && e.key === 'k')) return;

            e.preventDefault();
            setSearchModalOpen(true);
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [searchModalOpen]);

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-dracula.min.css';
        document.head.appendChild(link);

        return () => {
            if (document.head.contains(link)) {
                document.head.removeChild(link);
            }
        };
    }, []);

    const Logo = useMemo(
        () => (
            <Link
                href="/"
                onClick={(e) => {
                    e.preventDefault();
                    router.push('/');
                }}
            >
                <Stack direction="column" alignItems="flex-start" sx={{ cursor: 'pointer' }}>
                    <Image src="/images/saf-logo.svg" alt="logo" width={140} height={30} priority />
                </Stack>
            </Link>
        ),
        [router]
    );

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    boxShadow: 'none',
                    borderBottom: 1,
                    borderColor: 'divider',
                    backgroundColor: { xs: 'background.default', sm: 'transparent' },
                    backdropFilter: { xs: 'none', sm: 'blur(8px)' },
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Container maxWidth="lg" sx={{ px: { md: '0px !important' } }}>
                    <Toolbar sx={{ px: '0px !important' }}>
                        <Stack direction="row" alignItems="center" spacing={{ xs: 0, md: 6 }} sx={{ width: '100%' }}>
                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>{Logo}</Box>

                            <IconButton
                                sx={{
                                    display: { xs: 'flex', md: 'none' },
                                    border: 1,
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    height: 32,
                                    width: 32,
                                }}
                                onClick={toggleDrawer}
                                aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
                            >
                                {drawerOpen ? <CloseIcon color="action" /> : <MenuIcon color="action" />}
                            </IconButton>

                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={3}
                                sx={{ flex: 1, display: { xs: 'none', md: 'flex' } }}
                            >
                                {HEADERTABS.map((route) => (
                                    <NavigationLink
                                        key={route.label}
                                        route={route}
                                        isActive={matchPathname(route.href.toLowerCase())}
                                        onNavigate={handleNavigate}
                                    />
                                ))}
                            </Stack>

                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-end"
                                sx={{ flex: { xs: 1, md: 0 } }}
                            >
                                <Stack
                                    onClick={openSearchModal}
                                    direction="row"
                                    alignItems="center"
                                    sx={{
                                        marginRight: 1,
                                        width: 150,
                                        borderRadius: 2,
                                        border: 1,
                                        borderColor: 'divider',
                                        height: 32,
                                        cursor: 'pointer',
                                        paddingX: 1,
                                        display: { xs: 'none', sm: 'flex' },
                                    }}
                                >
                                    <Typography variant="body2" sx={{ flex: 1, color: 'text.secondary', fontSize: 13 }}>
                                        Search...
                                    </Typography>
                                    <Typography
                                        sx={{
                                            lineHeight: 0,
                                            fontSize: 10,
                                            paddingY: 1.1,
                                            paddingX: 0.5,
                                            backgroundColor: 'action.selected',
                                            borderRadius: 0.7,
                                            color: 'text.primary',
                                        }}
                                    >
                                        Ctrl+K
                                    </Typography>
                                </Stack>

                                <ThemeSwitcher />

                                <Tooltip title="Github">
                                    <IconButton
                                        size="small"
                                        sx={{ mr: 1, border: 1, borderColor: 'divider', borderRadius: 2 }}
                                        aria-label="View Github repository"
                                    >
                                        <Github size={19} />
                                    </IconButton>
                                </Tooltip>

                                <Box sx={{ mr: 2, ml: 0.5, height: 20, borderLeft: 2, borderColor: 'divider' }} />

                                <AccountMenu />
                            </Stack>
                        </Stack>
                    </Toolbar>

                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={closeDrawer}
                        sx={{
                            '& .MuiDrawer-paper': {
                                width: '75%',
                                boxSizing: 'border-box',
                            },
                        }}
                    >
                        <Stack
                            direction="column"
                            sx={{
                                p: 2,
                                backgroundColor: 'background.paper',
                                height: '100%',
                                overflow: 'hidden',
                            }}
                        >
                            <Toolbar />
                            {Logo}
                            <Stack direction="column" spacing={2} sx={{ mt: 3 }}>
                                {HEADERTABS.map((route) => (
                                    <NavigationLink
                                        key={route.label}
                                        route={route}
                                        isActive={matchPathname(route.href.toLowerCase())}
                                        onNavigate={handleDrawerNavigate}
                                        variant="body1"
                                    />
                                ))}
                            </Stack>
                        </Stack>
                    </Drawer>
                </Container>
            </AppBar>

            <SearchModal open={searchModalOpen} onClose={closeSearchModal} />
        </>
    );
};

export default memo(Header);
