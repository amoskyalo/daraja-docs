import { Container, Stack, Typography, Button } from '@mui/material';
import { GridBackground } from '../client/GridBackground';

export const HeroSection = () => {
    return (
        <Container maxWidth="lg" sx={{ px: { md: '0px !important' } }}>
            <GridBackground>
                <Typography
                    variant="h1"
                    sx={{
                        textAlign: 'center',
                        fontSize: { xs: '2.5rem', md: '3.75rem' },
                        fontWeight: { xs: 600, md: 800 },
                        lineHeight: { xs: 1.2, md: 1.167 },
                    }}
                >
                    Safaricom Developers Portal -{' '}
                    <Typography
                        component="span"
                        variant="h1"
                        color="primary"
                        sx={{
                            fontSize: 'inherit',
                            fontWeight: 'inherit',
                            lineHeight: 'inherit',
                        }}
                    >
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
            </GridBackground>
        </Container>
    );
};
