import { useState } from 'react';
import { useTheme } from '@/shared/context';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

export default function ThemeSwitcher() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { toggleTheme , currentTheme} = useTheme();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Theme">
                <IconButton
                    size="small"
                    onClick={handleClick}
                    sx={{ mr: 1, border: 1, borderColor: 'divider', borderRadius: 2 }}
                >
                    <WbSunnyOutlinedIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="theme-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            width: 110,
                            overflow: 'visible',
                            border: 1,
                            borderColor: 'divider',
                            mt: 0.5,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {[
                    { label: 'Light', value: 'light' as const, icon: WbSunnyOutlinedIcon },
                    { label: 'System', value: 'system' as const, icon: LaptopOutlinedIcon },
                    { label: 'Dark', value: 'dark' as const, icon: DarkModeOutlinedIcon },
                ].map((item) => (
                    <Box sx={{ px: 1 }} key={item.value}>
                        <MenuItem
                            selected={item.value === currentTheme}
                            onClick={() => {
                                toggleTheme(item.value);
                                handleClose();
                            }}
                            sx={{ px: 1, borderRadius: 2, '&.Mui-selected': { backgroundColor: 'action.hover' } }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {
                                    <item.icon
                                        color="inherit"
                                        sx={{ fontSize: item.value === currentTheme ? 14 : 16, padding: 0, margin: 0 }}
                                    />
                                }
                                <Typography variant="body2" fontWeight={500}>
                                    {item.label}
                                </Typography>
                            </Box>
                        </MenuItem>
                    </Box>
                ))}
            </Menu>
        </>
    );
}
