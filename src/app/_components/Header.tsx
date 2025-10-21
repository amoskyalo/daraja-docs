import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Stack, Link, Box, useTheme, Tooltip, IconButton } from '@mui/material';
import { useResponsiveness } from '@/shared/hooks/useResponsiveness';
import { SearchModal } from '@/shared/components';
import { HEADERTABS } from '@/config/constants/routes';
import { usePathname, useRouter } from 'next/navigation';
import { Github } from 'lucide-react';
import Image from 'next/image';
import AccountMenu from './AccountMenu';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
    const { isMobile } = useResponsiveness();
    const theme = useTheme();
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
                        <Stack direction="row" alignItems="center" spacing={6} sx={{ width: '100%' }}>
                            <Link
                                href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/');
                                }}
                            >
                                <Stack direction="column" alignItems="center" sx={{ cursor: 'pointer' }}>
                                    <Image src="/images/saf-logo.svg" alt="logo" width={140} height={30} priority />
                                </Stack>
                            </Link>

                            <Stack direction="row" alignItems="center" spacing={3} sx={{ flex: 1 }}>
                                {HEADERTABS.map((route) => {
                                    const isActive = matchPathname(route.href.toLowerCase());
                                    const activeColor = theme.palette.primary.main;
                                    const inactiveColor = theme.palette.text.primary;

                                    return (
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
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                spacing={1}
                                                sx={{ opacity: isActive ? 1 : 0.7, '&:hover': { opacity: 1 } }}
                                            >
                                                {/* {<route.icon size={16} color={isActive ? activeColor : inactiveColor} />} */}
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: isActive ? '600' : '300',
                                                        color: isActive ? 'primary.main' : 'text.primary',
                                                    }}
                                                >
                                                    {route.label}
                                                </Typography>
                                            </Stack>
                                        </Link>
                                    );
                                })}
                            </Stack>

                            <Stack direction="row" alignItems="center">
                                {!isMobile && (
                                    <Stack
                                        onClick={() => setSearchModalOpen(true)}
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
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{ flex: 1, color: 'text.secondary', fontSize: 13 }}
                                        >
                                            Search...
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
                                                Ctrl+K
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                )}

                                <ThemeSwitcher />

                                <Tooltip title="Github">
                                    <IconButton
                                        size="small"
                                        // onClick={handleClick}
                                        sx={{ mr: 1, border: 1, borderColor: 'divider', borderRadius: 2 }}
                                    >
                                        <Github size={19} />
                                    </IconButton>
                                </Tooltip>

                                <Box sx={{ mr: 2, ml: 0.5, height: 20, borderLeft: 2, borderColor: 'divider' }} />

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
