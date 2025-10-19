import React from 'react';
import { Container, Stack, Typography, Button } from '@mui/material';
import { useTheme } from '@/shared/context';

export const HeroSection = () => {
    const { isDark } = useTheme();

    return (
        <Container maxWidth="lg" sx={{ px: '0px !important' }}>
            <Stack
                direction="column"
                spacing={6}
                alignItems="center"
                justifyContent="center"
                sx={{
                    minHeight: '640px',
                    padding: '80px 0px',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `
                linear-gradient(to right, ${
                    isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                } 1px, transparent 1px),
                linear-gradient(to bottom, ${
                    isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                } 1px, transparent 1px)
            `,
                        backgroundSize: '80px 80px',
                        maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 70%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 70%, transparent 100%)',
                        pointerEvents: 'none',
                    },
                }}
            >
                <Typography variant="h1">
                    Safaricom Developers Portal -{' '}
                    <Typography component="span" variant="h1" color="primary">
                        Daraja
                    </Typography>
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        width: { xs: '100%', md: '65%' },
                        textAlign: 'center',
                        color: 'text.secondary',
                        fontWeight: 'medium',
                    }}
                >
                    Plug and Play into possibilities with Safaricom APIs. Unlock the full power of mobile payments with
                    Daraja APIs — secure, scalable, and designed to help your business grow faster.
                </Typography>

                <Stack direction="row" spacing={3}>
                    <Button variant="contained" size="large" sx={{ py: 1.3, px: 4 }}>
                        Get Started
                    </Button>
                    <Button variant="outlined" size="large" sx={{ border: 1, borderColor: 'divider', py: 1.3, px: 4 }}>
                        View Docs
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
};
