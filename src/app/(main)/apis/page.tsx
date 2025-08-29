'use client';

import React from 'react';
import { Stack, Typography, Box, Grid, Chip } from '@mui/material';
import { apiList } from '@/constants/api-list';
import { useRouter } from 'next/navigation';

const sections = ['All', 'Security', 'Payments', 'Disbursement', 'Experience'];

const APIs = () => {
    const router = useRouter();
    const [selectedSection, setSelectedSection] = React.useState<string>(sections[0]);

    const handleSectionChange = (section: string) => {
        setSelectedSection(section);
    };
    return (
        <Stack spacing={1} sx={{ pl: 3, pr: 6, pb: 3, pt: 1 }}>
            <Box sx={{ py: 2, position: 'sticky', top: 0, backdropFilter: 'blur(10px)', zIndex: 1 }}>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {sections.map((section) => (
                        <Chip
                            key={section}
                            label={section}
                            onClick={() => handleSectionChange(section)}
                            variant={selectedSection === section ? 'filled' : 'outlined'}
                            color={selectedSection === section ? 'primary' : 'default'}
                            sx={{ paddingX: 1 }}
                        />
                    ))}
                </Stack>
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

                            <Chip
                                variant="outlined"
                                sx={{ mt: 2, textTransform: 'none', borderRadius: 25, paddingRight: 0.5 }}
                                onClick={() => router.push(`/apis/documentation/${api.slug}`)}
                                label="Explore"
                                color='primary'
                            />
                          
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default APIs;
