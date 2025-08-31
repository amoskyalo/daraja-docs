import { Stack, Typography, ListItemButton, ListItemText, ListItemIcon, Link, Drawer } from '@mui/material';
import NAVIGATION from '@/constants/routes';
import { useRouter, usePathname } from 'next/navigation';
import { useResponsiveness } from '@/hooks/useResponsiveness';

const DRAWER_WIDTH = 275;

const LeftNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { isMobile, isMiniTablet, isTablet } = useResponsiveness();

    function matchPathname(path: any) {
        return path === pathname;
    }

    const isSmallScreen = isMobile || isMiniTablet || isTablet;

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
                }}
            >
                {NAVIGATION.map((item, index) => {
                    if (item.kind === 'divider') {
                        return;
                    }

                    if (item.kind === 'header') {
                        return (
                            <Typography
                                sx={{ mt: index === 0 ? 1 : 2, fontWeight: 600, mb: 1 }}
                                color="text.secondary"
                                variant="caption"
                                key={item.title}
                            >
                                {item.title}
                            </Typography>
                        );
                    }

                    return (
                        <Link
                            href={item.segment as string}
                            underline="none"
                            color="text.primary"
                            key={item.title}
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(item.segment as string);
                            }}
                        >
                            <ListItemButton
                                selected={matchPathname(item.segment as string)}
                                sx={{
                                    '&.Mui-selected': {
                                        color: 'primary.main',
                                        '& .MuiListItemIcon-root': {
                                            color: 'primary.main',
                                        },
                                    },
                                }}
                                disableRipple
                            >
                                {item.icon && (
                                    <ListItemIcon
                                        sx={{
                                            width: 'max-content !important',
                                            minWidth: 'max-content !important',
                                            maxWidth: 'max-content !important',
                                            mr: 2,
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                )}

                                <ListItemText>{item.title}</ListItemText>
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
