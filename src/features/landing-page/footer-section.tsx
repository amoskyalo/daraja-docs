import React from 'react';
import { Stack, Container, Grid, Typography, TextField, InputAdornment, Box, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export const FooterSection = () => {
    return (
        <Stack sx={{ paddingY: 4, borderTop: 1, borderColor: 'divider' }}>
            <Container maxWidth="lg" sx={{ px: { md: '0px !important' } }}>
                <Grid container spacing={{ xs: 2, sm: 4, md: 8 }}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                            Daraja
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                            Daraja is a web platform that offers access to Safaricom and M-PESA APIs that creates a
                            bridge for payment integration to web and mobile apps. By connecting to our APIs, you open a
                            world of possibilities to you and your clients. Together, we can transform lives.
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            Resources
                        </Typography>

                        <Stack>
                            {['Documentation', 'Blog', 'GitHub', 'Marketplace', 'Mini-Apps'].map((item) => (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 1,
                                        opacity: 0.7,
                                        transition: 'opacity 0.2s ease-in-out',
                                        '&:hover': { opacity: 1 },
                                        cursor: 'pointer',
                                    }}
                                    key={item}
                                >
                                    {item}
                                </Typography>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            Legal
                        </Typography>

                        <Stack>
                            {['Terms and Conditions', 'Privacy Policy'].map((item) => (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 1,
                                        opacity: 0.7,
                                        transition: 'opacity 0.2s ease-in-out',
                                        '&:hover': { opacity: 1 },
                                        cursor: 'pointer',
                                    }}
                                    key={item}
                                >
                                    {item}
                                </Typography>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            Subscribe to our newsletter
                        </Typography>

                        <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                            Subscribe to our newsletter for the latest updates delivered straight to your inbox.
                        </Typography>

                        <TextField
                            placeholder="Your email address"
                            variant="standard"
                            size="small"
                            fullWidth
                            slotProps={{
                                input: {
                                    style: {
                                        height: '34px',
                                        fontSize: '14px',
                                    },
                                    disableUnderline: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Box
                                                sx={{
                                                    backgroundColor: 'action.selected',
                                                    paddingX: 0.7,
                                                    borderRadius: 1,
                                                    opacity: 0.7,
                                                    cursor: 'pointer',
                                                    transition: 'opacity 0.2s ease-in-out',
                                                    '&:hover': { opacity: 1 },
                                                }}
                                            >
                                                <Typography variant="caption">Subscribe</Typography>
                                            </Box>
                                        </InputAdornment>
                                    ),
                                },
                                htmlInput: {
                                    style: {
                                        padding: 0,
                                    },
                                },
                            }}
                            sx={{
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 2,
                                paddingX: 1,
                                marginTop: 2,
                            }}
                        />
                    </Grid>
                </Grid>

                <Box>
                    <Typography variant="body2" sx={{ mt: 2, opacity: 0.7, fontWeight: 500, fontSize: 12 }}>
                        © {new Date().getFullYear()} Safaricom PLC
                    </Typography>

                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
                            <LinkedInIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
                            <XIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
                            <FacebookIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
                            <InstagramIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                </Box>
            </Container>
        </Stack>
    );
};
