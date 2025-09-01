'use client';

import React, { useState } from 'react';
import { Box, Grid, Stack, Typography, Link, Avatar, Pagination, CircularProgress, Chip, Tabs } from '@mui/material';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from './graphql';
import StarIcon from '@mui/icons-material/Star';
import { Response } from './types';

const languages = [
    { label: 'All', value: 'all' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Python', value: 'python' },
    { label: 'PHP', value: 'php' },
    { label: 'Kotlin', value: 'kotlin' },
    { label: 'Java', value: 'java' },
    { label: 'Dart', value: 'dart' },
    { label: 'Go', value: 'go' },
];

const CommunityProjectsPage: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
    const perPage: number = 30;

    const { data, loading } = useQuery<Response>(GET_REPOSITORIES, {
        variables: {
            params: {
                per_page: perPage,
                page,
            },
        },
    });

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number): void => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLanguageChange = (language: string): void => {
        setSelectedLanguage(language);
        setPage(1);
    };

    const totalPages: number = data?.repositories?.total_count ? Math.ceil(data.repositories.total_count / perPage) : 0;

    return (
        <Box
            sx={{
                p: { xs: 1, md: 1, lg: 3 },
                pr: { xs: 1, md: 1, lg: 6 },
                width: '100%',
                overflowX: 'hidden',
            }}
        >
            <Box>
                <Typography variant="h5" fontWeight={600}>
                    Community Projects
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    Daraja has fostered a vibrant developer community that continues to build innovative solutions using
                    M-Pesa APIs. Explore open-source projects, libraries, and tools created by fellow developers to
                    accelerate your own M-Pesa integrations. From payment gateways and mobile apps to utility libraries
                    and SDKs, discover how the community is leveraging Daraja API to solve real-world problems.
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    These projects showcase best practices, provide ready-to-use solutions, and serve as learning
                    resources for developers at all levels. Contribute to existing projects or get inspired to build
                    your own M-Pesa powered application.
                </Typography>
            </Box>

            <Box sx={{ mt: 2, py: 2, position: 'sticky', top: 0, backdropFilter: 'blur(10px)', zIndex: 1 }}>
                <Tabs
                    value={0}
                    variant="scrollable"
                    sx={{ border: 'none', minHeight: 34 }}
                    indicatorColor={'transparent' as any}
                >
                    {languages.map((language) => (
                        <Chip
                            key={language.value}
                            label={language.label}
                            onClick={() => handleLanguageChange(language.value)}
                            variant={selectedLanguage === language.value ? 'filled' : 'outlined'}
                            color={selectedLanguage === language.value ? 'primary' : 'default'}
                            sx={{ mr: 1 }}
                        />
                    ))}
                </Tabs>
            </Box>

            <Box sx={{ position: 'relative' }}>
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
                    <Grid container spacing={3}>
                        {data?.repositories?.items?.map((project) => (
                            <Grid
                                key={project.id}
                                size={{ xs: 12, sm: 6, md: 4 }}
                                sx={{ border: 1, borderColor: 'divider', borderRadius: 3, p: 2 }}
                            >
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <Avatar src={project.owner.avatar_url} sx={{ height: 22, width: 22 }} />
                                    <Typography variant="h6">
                                        <Link
                                            href={project.url}
                                            target="_blank"
                                            sx={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                fontSize: 16,
                                                wordBreak: 'break-word',
                                                overflowWrap: 'break-word',
                                                whiteSpace: 'pre-wrap',
                                            }}
                                        >
                                            {project.full_name}
                                        </Link>
                                    </Typography>
                                </Stack>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 1,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {project.description}
                                </Typography>
                                <Stack sx={{ mt: 2 }} direction="row" spacing={0.5} alignItems="center">
                                    <StarIcon color="action" fontSize="inherit" />
                                    <Typography variant="caption" color="text.secondary">
                                        {project.stargazers_count} GitHub stars
                                    </Typography>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                        disabled={loading}
                    />
                </Box>
            )}

            {totalPages > 1 && (
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        Page {page} of {totalPages}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default CommunityProjectsPage;
