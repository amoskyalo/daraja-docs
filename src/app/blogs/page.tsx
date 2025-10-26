'use client';

import { useState } from 'react';
import { Box, Typography, Stack, CircularProgress, Grid, Link, Pagination, Tabs, Chip, Container } from '@mui/material';
import { useQuery } from '@apollo/client/react';
import { GET_BLOGS } from './graphql';
import { Response } from './types';
import { useResponsiveness } from '@/shared/hooks';
import Image from 'next/image';

const sections = [
    { label: 'All', value: 'ALL' },
    { label: 'Safaricom team', value: 'SAFARICOM' },
    { label: 'Dev.to', value: 'DEVTO' },
    { label: 'Hashnode', value: 'HASHNODE' },
];

const BlogsPage = () => {
    const [selectedSection, setSelectedSection] = useState<string>('ALL');
    const { isMobile } = useResponsiveness();

    const { data, loading } = useQuery<Response>(GET_BLOGS, {
        variables: {
            filters: {
                source: selectedSection,
            },
        },
    });

    const handleSectionChange = (section: string): void => {
        setSelectedSection(section);
    };

    return (
        <Container maxWidth="lg" sx={{ px: '0px !important', flex: 1 }}>
            <Box
                sx={{
                    pb: 3,
                    pt: { xs: 3, md: 3, lg: 6 },
                    px: { xs: 2, sm: 3, md: 1, lg: 0 },
                }}
            >
                <Box>
                    <Typography variant="h2" fontWeight={600} sx={{ textAlign: 'center' }}>
                        Daraja API Blogs
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ mt: 1, textAlign: 'center', maxWidth: { xs: '100%', md: '75%' }, mx: 'auto' }}
                    >
                        Explore content written by experienced developers sharing their implementation experiences, code
                        examples, and best practices. These resources provide valuable insights to help you build robust
                        payment solutions with Daraja API.
                    </Typography>
                </Box>

                <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
                    <Tabs
                        value={0}
                        variant="scrollable"
                        sx={{ border: 'none', minHeight: 34 }}
                        indicatorColor={'transparent' as any}
                    >
                        {sections.map((section) => (
                            <Chip
                                key={section.value}
                                label={section.label}
                                onClick={() => handleSectionChange(section.value)}
                                variant={selectedSection === section.value ? 'filled' : 'outlined'}
                                color={selectedSection === section.value ? 'primary' : 'default'}
                                sx={{ mr: 1 }}
                            />
                        ))}
                    </Tabs>
                </Stack>

                <Box sx={{ position: 'relative', mt: 3, maxWidth: { xs: '100%', md: '100%', lg: '75%' }, mx: 'auto' }}>
                    {loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 300,
                            }}
                        >
                            <CircularProgress size={40} />
                        </Box>
                    ) : (
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            {data?.response?.edges?.map((blog) => (
                                <Grid
                                    key={blog.node.id}
                                    size={{ xs: 12, sm: 6, md: 3 }}
                                    sx={{
                                        cursor: 'pointer',
                                        border: 1.5,
                                        borderColor: 'divider',
                                        borderRadius: 1.5,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Link
                                        underline="none"
                                        color="text.primary"
                                        href={blog.node.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Stack spacing={1}>
                                            <Image
                                                src={
                                                    blog?.node.coverImage?.url ??
                                                    blog?.node.bannerImage?.url ??
                                                    'https://repository-images.githubusercontent.com/238495337/29524700-6c7a-11eb-8061-fe8c40a59af3'
                                                }
                                                alt={blog?.node.title}
                                                width={500}
                                                height={300}
                                                style={{
                                                    width: '100%',
                                                    height: isMobile ? 150 : 120,
                                                }}
                                            />
                                            <Box sx={{ px: 1.5, pb: 1.5 }}>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontWeight: 700,
                                                        wordBreak: 'break-word',
                                                        overflowWrap: 'break-word',
                                                        whiteSpace: 'pre-wrap',
                                                        WebkitLineClamp: 2,
                                                        display: '-webkit-box',
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {blog?.node.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        wordBreak: 'break-word',
                                                        overflowWrap: 'break-word',
                                                        whiteSpace: 'pre-wrap',
                                                        WebkitLineClamp: 3,
                                                        display: '-webkit-box',
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {blog?.node.brief}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={10}
                        page={1}
                        //onChange={handlePageChange}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                        disabled={loading}
                    />
                </Box>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        Page {1} of {10}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default BlogsPage;
