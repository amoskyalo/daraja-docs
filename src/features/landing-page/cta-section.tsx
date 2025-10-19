import React from 'react';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';

export const CtaSection = () => {
    return (
        <Box sx={{ pb: '100px', pt: '50px' }}>
            <Container
                maxWidth="lg"
                sx={{ backgroundColor: 'primary.main', paddingY: 8, paddingX: '40px !important', borderRadius: 2 }}
            >
                <Grid container>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={3}>
                            <Typography variant="h4" sx={{ color: 'white' }}>
                                Seamless Integration for Impactful Innovative Solutions
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'white' }}>
                                Daraja enables smooth integration with our diverse services, fostering the creation of
                                impactful and innovative solutions.
                            </Typography>

                            <Button
                                variant="contained"
                                size="large"
                                sx={{ backgroundColor: 'white', color: 'primary.main', width: 'max-content' }}
                            >
                                Sign Up
                            </Button>
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }} sx={{ position: 'relative' }}>
                        <Image
                            src="/images/console.png"
                            alt="CTA"
                            width={500}
                            height={500}
                            style={{
                                position: 'absolute',
                                top: -85,
                                right: -10,
                                width: 570,
                                height: 340,
                                objectFit: 'contain',
                                borderRadius: '8px',
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
