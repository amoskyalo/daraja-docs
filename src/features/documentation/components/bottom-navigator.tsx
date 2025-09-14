'use client';

import { Stack, Box, Typography, Paper, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Frown, SmilePlus, Smile, Angry } from 'lucide-react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const DocsBottomNavigator = ({ prevDoc, nextDoc }: any) => {
    const router = useRouter();

    return (
        <Box sx={{ mt: 4 }} id="bottom-navigator">
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
                                key={index}
                                sx={{ cursor: 'pointer', opacity: 0.8, '&:hover': { opacity: 1 } }}
                                onClick={() => router.push(doc.segment)}
                            >
                                <Typography variant="body2">{index === 0 ? 'Previous' : 'Next'}</Typography>
                                <Stack sx={{ mt: 0.5 }} direction="row" alignItems="center" spacing={0.5}>
                                    {index === 0 && <ArrowBackIosIcon sx={{ fontSize: 14 }} />}
                                    <Typography variant="body1" fontWeight={600}>
                                        {doc?.title}
                                    </Typography>
                                    {index === 1 && <ArrowForwardIosIcon sx={{ fontSize: 14 }} />}
                                </Stack>
                            </Box>
                        )}
                    </Box>
                ))}
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="center">
                <Paper sx={{ border: 1, borderColor: 'divider', py: 1, borderRadius: 50, pl: 2, pr: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Typography variant="body2" fontWeight={500}>
                            Was this helpful?
                        </Typography>
                        <Stack direction="row" alignItems="center">
                            <IconButton>
                                <SmilePlus size={18} />
                            </IconButton>
                            <IconButton>
                                <Smile size={18} />
                            </IconButton>
                            <IconButton>
                                <Frown size={18} />
                            </IconButton>
                            <IconButton>
                                <Angry size={18} />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    );
};
