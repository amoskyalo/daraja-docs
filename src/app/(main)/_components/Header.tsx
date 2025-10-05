import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Stack, Link, Box } from '@mui/material';
import { useResponsiveness } from '@/shared/hooks/useResponsiveness';
import { SearchModal } from '@/shared/components';
import { HEADERTABS } from '@/config/constants/routes';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import AccountMenu from './AccountMenu';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
    const { isMobile } = useResponsiveness();
    const [searchModalOpen, setSearchModalOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

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

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-dracula.min.css';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    const matchPathname = (path: string) => {
        return path.split('/')[1] === pathname.split('/')[1];
    };

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    boxShadow: 'none',
                    borderBottom: 1,
                    borderColor: 'divider',
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(8px)',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Container maxWidth="lg" sx={{ px: '0px !important' }}>
                    <Toolbar sx={{ px: '0px !important' }}>
                        <Stack direction="row" alignItems="center" spacing={8} sx={{ width: '100%' }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Image src="/images/boat.png" alt="logo" width={40} height={30} priority />
                                <Box>
                                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: '700' }}>
                                        Daraja
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="primary.main"
                                        sx={{ fontWeight: 'medium', fontSize: 10, opacity: 0.5, ml: 1, mt: -0.5 }}
                                    >
                                        by Safaricom
                                    </Typography>
                                </Box>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={3} sx={{ flex: 1 }}>
                                {HEADERTABS.map((route) => (
                                    <Link
                                        href={route.href}
                                        sx={{ textDecoration: 'none' }}
                                        color="inherit"
                                        key={route.label}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.push(route.href);
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: matchPathname(route.href.toLowerCase()) ? '600' : 'medium',
                                                color: matchPathname(route.href.toLowerCase())
                                                    ? 'primary.main'
                                                    : 'text.primary',
                                                opacity: matchPathname(route.href.toLowerCase()) ? 1 : 0.7,
                                                '&:hover': { opacity: 1 },
                                            }}
                                        >
                                            {route.label}
                                        </Typography>
                                    </Link>
                                ))}
                            </Stack>

                            <Stack direction="row" alignItems="center">
                                {!isMobile && (
                                    <Stack
                                        onClick={() => setSearchModalOpen(true)}
                                        direction="row"
                                        alignItems="center"
                                        sx={{
                                            marginRight: 1,
                                            width: 220,
                                            borderRadius: 2,
                                            border: 1,
                                            borderColor: 'divider',
                                            height: 32,
                                            cursor: 'pointer',
                                            paddingX: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{ flex: 1, color: 'text.secondary', fontSize: 13 }}
                                        >
                                            Search documentation
                                        </Typography>
                                        <Stack direction="row" spacing={0.5}>
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
                                                CtrlK
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                )}

                                <ThemeSwitcher />

                                <Box sx={{ mr: 1.5, ml: 0.5, height: 20, borderLeft: 2, borderColor: 'divider' }} />

                                <AccountMenu />
                            </Stack>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            <SearchModal open={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
        </>
    );
};

export default Header;
