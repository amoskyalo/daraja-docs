import React from 'react';
import { Stack, Container, Typography, Grid, Box, Button } from '@mui/material';
import { useResponsiveness } from '@/shared/hooks';
import EastIcon from '@mui/icons-material/East';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ForumIcon from '@mui/icons-material/Forum';

const help = [
    {
        title: 'Contact Support',
        description: 'If you need to get immediate help, please contact our support directly.',
        icon: SupportAgentIcon,
        cta: 'Get help',
    },
    {
        title: 'View Docs',
        description: 'Daraja offers you getting started information and detailed guides.',
        icon: MenuBookIcon,
        cta: 'View guides',
    },
    {
        title: 'Developer Marketplace',
        description: 'Ask questions and find answers from the community',
        icon: ForumIcon,
        cta: 'View marketplace',
    },
];

export const HaveQuestionsSection = () => {
    const { isMobile } = useResponsiveness();

    return (
        <Stack
            direction="column"
            spacing={6}
            alignItems="center"
            justifyContent="center"
            mt={10}
            sx={{
                backgroundColor: 'action.hover',
                paddingY: '100px',
            }}
        >
            <Container maxWidth="lg" sx={{ px: { md: '0px !important' } }}>
                <Typography variant={isMobile ? 'h3' : 'h2'} sx={{ textAlign: 'center' }}>
                    Have a question?{' '}
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        component="span"
                        sx={{ fontWeight: 500, display: { xs: 'none', md: 'inline' } }}
                    >
                        We&apos;re here to help you work with Daraja
                    </Typography>
                </Typography>

                <Grid
                    container
                    spacing={4}
                    sx={{ width: { xs: '100%', md: '70%' }, mx: 'auto', mt: { xs: 5, md: 10 } }}
                >
                    {help.map((card, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }} sx={{px: {xs: 2, md: 0}} }>
                            <Stack spacing={2} direction="column" alignItems="flex-start">
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        backgroundColor: 'background.default',
                                        borderRadius: 8,
                                        border: 1,
                                        borderColor: 'divider',
                                    }}
                                >
                                    <card.icon sx={{ color: 'text.secondary' }} />
                                </Stack>

                                <Box>
                                    <Typography variant="h6" fontWeight={600} sx={{ opacity: 1, fontSize: 18, mb: 1 }}>
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.description}
                                    </Typography>
                                </Box>

                                <Button
                                    variant="text"
                                    color="primary"
                                    sx={{
                                        px: 0,
                                        ':hover': {
                                            backgroundColor: 'transparent',
                                        },
                                        color: 'primary',
                                    }}
                                    endIcon={<EastIcon />}
                                    disableFocusRipple
                                    disableRipple
                                    disableTouchRipple
                                >
                                    {card.cta}
                                </Button>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Stack>
    );
};
