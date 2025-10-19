import React from 'react';
import { Container, Stack, Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import EastIcon from '@mui/icons-material/East';

export const MiniProgramSection = () => {
    return (
        <Container maxWidth="lg" sx={{ px: '0px !important', py: '80px' }}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <Box sx={{ width: { xs: '100%', md: '50%' }, mx: 'auto' }}>
                    <Typography variant="h2">Explore The Mini Program</Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 500, mt: 3 }}>
                        The Mini Program technology is the answer to rapid mobile app development. Mini Programs are
                        sub-applications that run inside the mobile app. You can access various services and features on
                        Mini Programs without the need to install additional applications. Discover guides, tutorials
                        and references to quickly get started.
                    </Typography>
                    <Button variant="contained" size="large" sx={{ py: 1.3, px: 4, mt: 6 }} endIcon={<EastIcon />}>
                        Learn More
                    </Button>
                </Box>

                <Image
                    src="https://daraja.safaricom.co.ke/icons/miniapp-phone.svg"
                    alt="Mini Program"
                    width={500}
                    height={500}
                />
            </Stack>
        </Container>
    );
};
