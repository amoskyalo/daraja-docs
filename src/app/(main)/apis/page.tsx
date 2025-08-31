'use client';

import React from 'react';
import { Stack, Typography, Box, Grid, Chip, Tabs } from '@mui/material';
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
        <Stack
            spacing={1}
            sx={{
                px: { xs: 1, md: 0 },
                pb: 3,
                pt: 1,
                width: '100%',
                overflow: 'hidden',
            }}
        >
            <Box sx={{ py: 1, position: 'sticky', top: 0, backdropFilter: 'blur(10px)', zIndex: 1 }}>
                <Tabs
                    value={0}
                    variant="scrollable"
                    sx={{ border: 'none', minHeight: 34 }}
                    indicatorColor={'transparent' as any}
                >
                    {sections.map((section) => (
                        <Chip
                            key={section}
                            label={section}
                            onClick={() => handleSectionChange(section)}
                            variant={selectedSection === section ? 'filled' : 'outlined'}
                            color={selectedSection === section ? 'primary' : 'default'}
                            sx={{ paddingX: 1, marginRight: { xs: 1, md: 1, lg: 1.5 } }}
                        />
                    ))}
                </Tabs>
            </Box>

            <Grid container spacing={2}>
                {apiList.map((api) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={api.title}>
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
                                color="primary"
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default APIs;
