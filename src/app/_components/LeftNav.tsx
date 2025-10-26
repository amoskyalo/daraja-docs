import { Stack, ListItemButton, ListItemText, Link, Drawer, Typography } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useResponsiveness } from '@/shared/hooks';
import { useVersionManager } from '@/shared/context';
import { SIDENAVITEMS } from '@/config/constants/routes';
import { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VersionSwitcher from './VersionSwitcher';

const DRAWER_WIDTH = 275;

const LeftNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { isSmallScreen } = useResponsiveness();
    const { version } = useVersionManager();

    const [openOnMobile, setOpenOnMobile] = useState(false);

    function matchPathname(path: any) {
        return path === pathname;
    }

    const filteredSidenavItems = SIDENAVITEMS.filter((item) => {
        if (!item.segment) {
            return true;
        }

        return item.versions.includes(version);
    });

    function renderNavList() {
        return (
            <Stack
                sx={{
                    width: { xs: '100%', md: DRAWER_WIDTH },
                    minWidth: { xs: '100%', md: DRAWER_WIDTH },
                    overflow: 'auto',
                    pl: { xs: 0, md: 2, lg: 0 },
                    pr: 0,
                    position: 'sticky',
                    top: { xs: '56px', sm: '64px', md: '64px' },
                    height: { xs: openOnMobile ? 'calc(100vh - 56px)' : 'max-content', md: 'calc(100vh - 64px)' },
                    backgroundColor: 'background.paper',
                    zIndex: 1,
                }}
                spacing={2}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        padding: 2,
                        pl: 1,
                        display: { xs: 'flex', md: 'none' },
                    }}
                    onClick={() => setOpenOnMobile(!openOnMobile)}
                    spacing={1}
                >
                    <ChevronRightIcon
                        sx={{
                            transform: openOnMobile ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease-in-out',
                        }}
                    />
                    <Typography fontWeight="medium">Menu</Typography>
                </Stack>
                {(openOnMobile && isSmallScreen) || !isSmallScreen ? (
                    <>
                        <VersionSwitcher />
                        <Stack
                            direction="column"
                            className="nav-links-container"
                            sx={{
                                flex: 1,
                                overflow: 'auto',
                                pl: { xs: 2, md: 2, lg: 0 },
                                pb: 2,
                            }}
                        >
                            {filteredSidenavItems?.map((item) => {
                                if (!item.segment) {
                                    return (
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            key={item.title}
                                            sx={{ my: 1 }}
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: 'medium' }} key={item.title}>
                                                {item.title}
                                            </Typography>
                                        </Stack>
                                    );
                                }

                                return (
                                    <Link
                                        href={item.segment}
                                        underline="none"
                                        color="text.primary"
                                        key={item.title}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.push(item.segment);
                                            if (openOnMobile) {
                                                setOpenOnMobile(false);
                                            }
                                        }}
                                        sx={{
                                            ml: 1,
                                        }}
                                    >
                                        <ListItemButton
                                            selected={matchPathname(item.segment)}
                                            sx={{
                                                '&.Mui-selected': {
                                                    color: 'primary.main',
                                                    '& .MuiListItemIcon-root': {
                                                        color: 'primary.main',
                                                    },
                                                },
                                                '& .MuiListItemText-root .MuiTypography-root': {
                                                    fontSize: '14px',
                                                },
                                            }}
                                            disableRipple
                                        >
                                            <ListItemText primary={item.title} />
                                        </ListItemButton>
                                    </Link>
                                );
                            })}
                        </Stack>
                    </>
                ) : null}
            </Stack>
        );
    }

    return renderNavList();
};

export default LeftNav;
