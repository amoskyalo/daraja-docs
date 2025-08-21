'use client';

import React, { useState } from 'react';
import { Box, Grid, Stack, Typography, Link, Avatar, Pagination, CircularProgress, Chip } from '@mui/material';
import { getCommunityProjects } from './services';
import StarIcon from '@mui/icons-material/Star';
import { GitHubRepository } from './types';

const CommunityProjectsPage: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
    const perPage: number = 30;
    const { data, isLoading, error, isFetching } = getCommunityProjects(page, perPage, selectedLanguage);

    const languages = [
        { label: 'All', value: 'all' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Python', value: 'python' },
        { label: 'PHP', value: 'php' },
        { label: 'Kotlin', value: 'kotlin' },
        { label: 'Java', value: 'java' },
        { label: 'Dart', value: 'dart' },
        { label: 'Go', value: 'go' }
    ];

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number): void => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLanguageChange = (language: string): void => {
        setSelectedLanguage(language);
        setPage(1);
    };

    const totalPages: number = data?.total_count ? Math.ceil(data.total_count / perPage) : 0;

    if (isLoading) {
        return (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" color="error">
                    Error loading projects: {error.message}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
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

            <Box sx={{ mt: 4, mb: 2 }}>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {languages.map((language) => (
                        <Chip
                            key={language.value}
                            label={language.label}
                            onClick={() => handleLanguageChange(language.value)}
                            variant={selectedLanguage === language.value ? 'filled' : 'outlined'}
                            color={selectedLanguage === language.value ? 'primary' : 'default'}
                        />
                    ))}
                </Stack>
            </Box>

            <Box sx={{ position: 'relative', mt: 2 }}>
                {isFetching && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1,
                            borderRadius: 2,
                        }}
                    >
                        <CircularProgress size={40} />
                    </Box>
                )}

                <Grid container spacing={3} sx={{ mt: 1 }}>
                    {data?.items?.map((project: GitHubRepository) => (
                        <Grid
                            key={project.id}
                            size={{ xs: 12, sm: 6, md: 4 }}
                            sx={{ border: 2, borderColor: 'divider', borderRadius: 3, p: 2 }}
                        >
                            <Stack spacing={1} direction="row" alignItems="center">
                                <Avatar src={project.owner.avatar_url} sx={{ height: 22, width: 22 }} />
                                <Typography variant="h6">
                                    <Link
                                        href={project.html_url}
                                        target="_blank"
                                        sx={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            fontSize: 16,
                                        }}
                                    >
                                        {project.owner.login}/{project.name}
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
                        disabled={isFetching}
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