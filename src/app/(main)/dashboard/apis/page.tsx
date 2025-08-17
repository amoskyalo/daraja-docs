'use client';

import React from 'react';
import { Stack, Typography, Box, Grid, Button } from '@mui/material';
import { ChevronRight } from 'lucide-react';
import { apiList } from '@/constants/api-list';

const APIs = () => {
    return (
        <Stack spacing={3} sx={{ p: 2 }}>
            <Box>
                <Typography variant="h6" fontWeight={600}>
                    SasaPay APIs
                </Typography>
                <Typography variant="body2" sx={{ maxWidth: '100ch', mt: 1 }}>
                    SasaPay API provides a whole host of products that can facilitate you to improve your business
                    processes and gain a better competitive edge. We expose endpoints for C2B, B2C, B2B, Utilities and
                    Wallet as a Service(WAAS).
                </Typography>
            </Box>

            <Grid container spacing={2}>
                {apiList.map((api) => (
                    <Grid size={{ xs: 12, md: 4 }} key={api.title}>
                        <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 2, cursor: 'pointer' }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                                {api.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {api.description}
                            </Typography>

                            <Button
                                disableElevation
                                variant="outlined"
                                size="small"
                                sx={{ mt: 2, textTransform: 'none', borderRadius: 25, paddingRight: 0.5 }}
                            >
                                Explore
                                <ChevronRight size={16} />
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default APIs;
