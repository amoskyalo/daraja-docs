import { Stack, ListItemButton, ListItemText, Link, Drawer } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useResponsiveness } from '@/hooks/useResponsiveness';
import { NAVTABS } from '@/constants/routes';

const DRAWER_WIDTH = 300;

const LeftNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { isMobile, isMiniTablet, isTablet } = useResponsiveness();

    function matchPathname(path: any) {
        return path === pathname;
    }

    const isSmallScreen = isMobile || isMiniTablet || isTablet;

    const NAVITEMS = NAVTABS.find((item) => item.parent === pathname.split('/')[1])?.items;

    function renderNavList() {
        return (
            <Stack
                direction="column"
                sx={{
                    width: DRAWER_WIDTH,
                    minWidth: DRAWER_WIDTH,
                    overflow: 'auto',
                    pt: 1,
                    pl: { xs: 2, md: 2, lg: 0 },
                    position: { md: 'relative', lg: 'sticky' },
                    top: '66px',
                    height: { md: 'auto', lg: 'calc(100vh - 66px)' },
                    display: NAVITEMS ? 'flex' : 'none',
                }}
            >
                {NAVITEMS?.map((item) => {
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
                                        fontSize: '15px',
                                        fontWeight: 'medium',
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
        );
    }

    return isSmallScreen ? <Drawer open={false}>{renderNavList()}</Drawer> : renderNavList();
};

export default LeftNav;
