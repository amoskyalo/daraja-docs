import { Stack, ListItemButton, ListItemText, Link, Drawer, Typography, alpha, Box } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useResponsiveness } from '@/shared/hooks';
import { SIDENAVITEMS } from '@/config/constants/routes';
import VersionSwitcher from './VersionSwitcher';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const DRAWER_WIDTH = 275;

const LeftNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { isMobile, isMiniTablet, isTablet } = useResponsiveness();

    function matchPathname(path: any) {
        return path === pathname;
    }

    const isSmallScreen = isMobile || isMiniTablet || isTablet;

    const hideSidNav = !pathname.includes('docs');

    function renderNavList() {
        return (
            <Stack
                sx={{
                    width: DRAWER_WIDTH,
                    minWidth: DRAWER_WIDTH,
                    overflow: 'hidden',
                    pt: 2,
                    pl: { xs: 2, md: 2, lg: 0 },
                    position: { md: 'relative', lg: 'sticky' },
                    top: '66px',
                    height: { md: 'auto', lg: 'calc(100vh - 66px)' },
                    display: hideSidNav ? 'none' : 'flex',
                }}
                spacing={2}
            >
                <VersionSwitcher />
                <Stack
                    direction="column"
                    className="nav-links-container"
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                        pl: { xs: 2, md: 2, lg: 0 },
                    }}
                >
                    {SIDENAVITEMS?.map((item) => {
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
                                    {/* <KeyboardArrowRightIcon sx={{fontSize: 20}}/> */}
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
            </Stack>
        );
    }

    return isSmallScreen ? <Drawer open={false}>{renderNavList()}</Drawer> : renderNavList();
};

export default LeftNav;
