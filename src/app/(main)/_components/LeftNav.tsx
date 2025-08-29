import { Stack, Typography, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import NAVIGATION from '@/constants/routes';

const drawerWidth = 275;

const LeftNav = () => {
    return (
        <Stack
            direction="column"
            sx={{
                width: drawerWidth,
                minWidth: drawerWidth,
                overflow: 'auto',
                pt: 1,
                position: 'sticky',
                top: '66px',
                height: 'calc(100vh - 66px)',
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
                    <ListItemButton
                        selected={index === 2}
                        key={item.title}
                        sx={{
                            '&.Mui-selected': {
                                color: 'primary.main',
                                '& .MuiListItemIcon-root': {
                                    color: 'primary.main',
                                },
                            },
                        }}
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
                );
            })}
        </Stack>
    );
};

export default LeftNav;
