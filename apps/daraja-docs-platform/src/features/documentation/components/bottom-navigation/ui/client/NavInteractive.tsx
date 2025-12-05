'use client';

import { Stack, Box, Typography, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface NavDoc {
    title: string;
    segment: string;
}

interface NavInteractiveProps {
    prevDoc?: NavDoc;
    nextDoc?: NavDoc;
}

export const NavInteractive = ({ prevDoc, nextDoc }: NavInteractiveProps) => {
    const router = useRouter();

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
            sx={{
                mt: 1.5,
                borderTop: 1,
                borderColor: 'divider',
                py: 4,
            }}
        >
            {[prevDoc, nextDoc].map((doc, index) => (
                <Box key={index}>
                    {doc && (
                        <Box
                            sx={{ cursor: 'pointer', opacity: 0.8, '&:hover': { opacity: 1 } }}
                            onClick={() => router.push(doc.segment)}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    fontWeight: 400,
                                    lineHeight: { xs: 1.66, md: 1.43 },
                                }}
                            >
                                {index === 0 ? 'Previous' : 'Next'}
                            </Typography>
                            <Stack sx={{ mt: 0.5 }} direction="row" alignItems="center" spacing={0.5}>
                                {index === 0 && <ArrowBackIosIcon sx={{ fontSize: 14 }} />}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                        fontWeight: 600,
                                        lineHeight: { xs: 1.43, md: 1.5 },
                                    }}
                                >
                                    {doc?.title}
                                </Typography>
                                {index === 1 && <ArrowForwardIosIcon sx={{ fontSize: 14 }} />}
                            </Stack>
                        </Box>
                    )}
                </Box>
            ))}
        </Stack>
    );
};
