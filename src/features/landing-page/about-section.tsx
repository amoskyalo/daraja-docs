import React from 'react';
import { Container, Stack, Typography, Grid } from '@mui/material';
import { useResponsiveness } from '@/shared/hooks';

const cards = [
    {
        title: 'Drive Innovation',
        description: 'Create a sandbox app and test it by simulating the app on any external API Client.',
        icon: 'https://daraja.safaricom.co.ke/icons/earn-icon.svg',
    },
    {
        title: 'Streamline Processes',
        description: 'Simulate or test apps that you have already created by selecting them your Daraja Library.',
        icon: 'https://daraja.safaricom.co.ke/icons/use-icon.svg',
    },
    {
        title: 'Comprehensive APIs',
        description: 'Register and create an account as either a company or individual and login to get started.',
        icon: 'https://daraja.safaricom.co.ke/icons/setting.svg',
    },
];

export const AboutSection = () => {
    const { isMobile } = useResponsiveness();

    return (
        <Container maxWidth="lg" sx={{ px: { md: '0px !important' }, py: '80px' }}>
            <Stack direction="column" spacing={isMobile ? 2 : 4} alignItems="center" justifyContent="center">
                <Typography variant={isMobile ? 'h3' : 'h2'} sx={{ textAlign: 'center' }}>
                    What is Daraja?{' '}
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        component="span"
                        sx={{ fontWeight: 500, display: { xs: 'none', md: 'inline' } }}
                    >
                        Everything you need to know about Daraja
                    </Typography>
                </Typography>
                <Typography
                    variant={isMobile ? 'body2' : 'body1'}
                    sx={{ width: { xs: '100%', md: '65%' }, textAlign: 'center', lineHeight: 1.7, fontWeight: 500 }}
                >
                    Daraja is a web platform that offers access to Safaricom and M-PESA APIs that creates a bridge for
                    payment integration to web and mobile apps. By connecting to our APIs, you open a world of
                    possibilities to you and your clients. Together, we can transform lives.
                </Typography>
            </Stack>

            <Grid container spacing={isMobile ? 2 : 3} sx={{ mt: isMobile ? 4 : 6, width: { xs: '100%', md: '80%' }, mx: 'auto' }}>
                {cards.map((card, index) => (
                    <Grid
                        key={index}
                        size={{ xs: 12, sm: 6, md: 4 }}
                        sx={{ border: 1, borderColor: 'divider', borderRadius: 3, p: 3 }}
                    >
                        <Stack spacing={1}>
                            {/* <Image src={card.icon} alt={card.title} width={50} height={50} /> */}
                            <Typography variant="h6" fontWeight={600}>
                                {card.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {card.description}
                            </Typography>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
