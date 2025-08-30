'use client';

import { useQueryPosts } from './services';
import { Box, Typography, Stack, CircularProgress, Grid, Link, Pagination } from '@mui/material';
import Image from 'next/image';

const BlogsPage = () => {
    const { data, isLoading, isFetching } = useQueryPosts();

    return (
        <Box sx={{ p: 3 }}>
            <Box>
                <Typography variant="h5" fontWeight={600}>
                    Daraja API Blogs & Tutorials
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    We&apos;ve collected the latest articles, tutorials, and insights about Daraja API and M-Pesa
                    integration from across the developer community. These blogs are sourced from platforms like Dev.to,
                    Medium, and other developer-focused publications.
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Explore content written by experienced developers sharing their implementation experiences, code
                    examples, and best practices. These external resources provide valuable insights to help you build
                    robust payment solutions with Daraja API.
                </Typography>
            </Box>

            <Box sx={{ position: 'relative', mt: 3 }}>
                {isLoading || isFetching ? (
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
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        {!isFetching &&
                            !isLoading &&
                            data?.map((blog) => (
                                <Grid key={blog.url} size={{ xs: 12, sm: 6, md: 3 }} sx={{ cursor: 'pointer' }}>
                                    <Link
                                        underline="none"
                                        color="text.primary"
                                        href={blog.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Stack spacing={1}>
                                            <Image
                                                src={blog.coverImage ?? ''}
                                                alt={blog.title}
                                                width={500}
                                                height={300}
                                                style={{ borderRadius: 2, width: '100%', height: 120 }}
                                            />
                                            <Typography variant="body1" sx={{ fontWeight: 700, fontSize: 18 }}>
                                                {blog.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    wordBreak: 'break-word',
                                                    overflowWrap: 'break-word',
                                                    whiteSpace: 'pre-wrap',
                                                }}
                                            >
                                                {blog.description}
                                            </Typography>
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
                        // onChange={handlePageChange}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                        disabled={isFetching}
                    />
                </Box>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        Page {1} of {10}
                    </Typography>
                </Box>
        </Box>
    );
};

export default BlogsPage;
