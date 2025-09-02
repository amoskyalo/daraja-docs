import { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Stack,
    TextField,
    InputAdornment,
    IconButton,
    Avatar,
} from '@mui/material';
import { useResponsiveness } from '@/hooks/useResponsiveness';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { ProfileDialog } from '@/components/dialogs/profile-dialog';
import { Account } from '@toolpad/core/Account';
import Image from 'next/image';
import SearchModal from '@/components/modals/algolia-search';

const Header = () => {
    const { isMobile } = useResponsiveness();
    const [searchModalOpen, setSearchModalOpen] = useState(false);

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

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{ boxShadow: 'none', borderBottom: 1, borderColor: 'divider', backgroundColor: 'background.default' }}
        >
            <Container maxWidth="lg" sx={{ px: '0px !important' }}>
                <Toolbar sx={{ px: '0px !important' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
                        <Stack direction="row" alignItems="center" sx={{ height: '100%', paddingTop: 0.5 }}>
                            <Image
                                src="/images/logo.png"
                                alt="logo"
                                width={isMobile ? 150 : 170}
                                height={40}
                                priority
                            />
                        </Stack>

                        <Stack direction="row" alignItems="center">
                            {!isMobile && (
                                <TextField
                                    placeholder="Search documentation"
                                    onClick={() => setSearchModalOpen(true)}
                                    sx={{
                                        marginRight: 1,
                                        width: 220,
                                        borderRadius: 2,
                                        border: 1,
                                        borderColor: 'divider',
                                        cursor: 'pointer',
                                        '& .MuiOutlinedInput-root': {
                                            height: 34,
                                            fontSize: 14,
                                            paddingRight: 1,
                                            cursor: 'pointer',
                                            '& fieldset': {
                                                border: 'none',
                                            },
                                            '&:hover fieldset': {
                                                border: 'none',
                                            },
                                            '&.Mui-focused fieldset': {
                                                border: 'none',
                                            },
                                        },
                                    }}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                                                    <Stack direction="row" spacing={0.5}>
                                                        <Typography
                                                            sx={{
                                                                lineHeight: 0,
                                                                fontSize: 10,
                                                                paddingY: 1.1,
                                                                paddingX: 0.5,
                                                                backgroundColor: 'rgba(0, 0, 0,1)',
                                                                borderRadius: 0.7,
                                                            }}
                                                        >
                                                            CtrlK
                                                        </Typography>
                                                    </Stack>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            )}

                            <IconButton size="small" sx={{ mr: 1, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                                <AutoAwesomeOutlinedIcon />
                            </IconButton>

                            <Account
                                slots={{
                                    popoverContent: ProfileDialog,
                                }}
                                slotProps={{
                                    preview: {
                                        slotProps: {
                                            avatar: {
                                                sx: {
                                                    borderRadius: 2,
                                                },
                                            },
                                            avatarIconButton: {},
                                        },
                                    },
                                }}
                            />

                            <IconButton
                                size="small"
                                sx={{
                                    mr: 1,
                                    border: 1,
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    height: 34,
                                    width: 34,
                                }}
                            >
                                <Avatar
                                    sx={{
                                        height: 34,
                                        width: 34,
                                        borderRadius: 2,
                                    }}
                                />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Toolbar>
            </Container>

            <SearchModal open={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
        </AppBar>
    );
};

export default Header;
