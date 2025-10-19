import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleRemoveSession } from '@/shared/functions';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await handleRemoveSession();
        router.push('/auth/login');
    };

    return (
        <>
            <Tooltip title="My profile">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{
                        mr: 1,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 2,
                        height: 32,
                        width: 32,
                    }}
                >
                    <Avatar
                        sx={{
                            height: 32,
                            width: 32,
                            borderRadius: 2,
                        }}
                        src="https://avatars.githubusercontent.com/u/91586973?s=400&u=1d8f7eb2b3502861f5e9f7abb123951301602fa5&v=4"
                    />
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            minWidth: 200,
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
                <Box sx={{ px: 2, borderBottom: 1, borderColor: 'divider', pb: 1, mb: 1 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            fontSize: '14px',
                            color: 'text.primary',
                            lineHeight: 1.2,
                        }}
                    >
                        Amos Kyalo
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '12px',
                            color: 'text.secondary',
                            lineHeight: 1.2,
                            mt: 0.5,
                        }}
                    >
                        amoskyalo@gmail.com
                    </Typography>
                </Box>

                {[
                    { name: 'Account Settings', onClick: () => router.push('/settings') },
                    { name: 'Support', onClick: () => {} },
                ].map((item) => (
                    <Box sx={{ px: 1 }} key={item.name}>
                        <MenuItem
                            onClick={() => {
                                handleClose();
                                item.onClick();
                            }}
                            sx={{ px: 1, borderRadius: 2 }}
                        >
                            <Typography variant="body2" fontWeight={500}>
                                {item.name}
                            </Typography>
                        </MenuItem>
                    </Box>
                ))}

                <Divider sx={{ my: 1 }} />

                <Box sx={{ px: 1 }}>
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            handleLogout();
                        }}
                        sx={{ px: 1, borderRadius: 2 }}
                    >
                        <LogoutOutlinedIcon sx={{ fontSize: 16, mr: 1 }} color="error" />
                        <Typography variant="body2" color="error" fontWeight={500}>
                            Log out
                        </Typography>
                    </MenuItem>
                </Box>
            </Menu>
        </>
    );
}
