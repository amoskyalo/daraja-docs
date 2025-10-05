import { useState } from 'react';
import { Stack, alpha, Typography, MenuItem, Menu, Box } from '@mui/material';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export default function VersionSwitcher() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedVersion, setSelectedVersion] = useState('2.0');
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                onClick={handleClick}
                sx={{
                    cursor: 'pointer',
                    p: 1,
                    borderRadius: 1.5,
                    '&:hover': { backgroundColor: 'action.hover' },
                }}
            >
                <Stack
                    sx={{
                        p: 0.7,
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                        border: 1,
                        borderColor: 'primary.main',
                        borderRadius: 1.5,
                    }}
                >
                    <LocalOfferOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between" sx={{ flex: 1 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            Version
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 'regular', fontSize: '12px', color: 'text.secondary' }}
                        >
                            Daraja {selectedVersion}
                        </Typography>
                    </Box>

                    <Stack direction="column" alignItems="center">
                        <KeyboardArrowUpOutlinedIcon sx={{ fontSize: 16 }} />
                        <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 16, mt: -1 }} />
                    </Stack>
                </Stack>
            </Stack>

            <Menu
                anchorEl={anchorEl}
                id="version-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            minWidth: 270,
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
                    { label: 'Daraja 3.0', value: '3.0' },
                    { label: 'Daraja 2.0', value: '2.0' },
                    { label: 'Daraja 1.0', value: '1.0' },
                ].map((version) => (
                    <Box sx={{ px: 1 }} key={version.value}>
                        <MenuItem
                            onClick={() => {
                                handleClose();
                                setSelectedVersion(version.value);
                            }}
                            sx={{ px: 1, borderRadius: 2 }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ width: '100%' }}>
                                <Stack
                                    sx={{
                                        p: 0.7,
                                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                                        borderRadius: 1.5,
                                    }}
                                >
                                    <LocalOfferOutlinedIcon
                                        fontSize="small"
                                        sx={{ color: 'primary.main', fontSize: 16 }}
                                    />
                                </Stack>
                                <Stack direction="row" alignItems="flex-start" sx={{ flex: 1 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" fontWeight={500} sx={{ fontSize: '12px' }}>
                                            {version.label}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontSize: '11px', color: 'text.secondary' }}>
                                            v{version.value}
                                        </Typography>
                                    </Box>
                                    {version.value === selectedVersion && (
                                        <CheckOutlinedIcon fontSize="small" color="primary" />
                                    )}
                                </Stack>
                            </Stack>
                        </MenuItem>
                    </Box>
                ))}
            </Menu>
        </>
    );
}
