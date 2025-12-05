'use client';

import { Stack, StackProps } from '@mui/material';

export const GridBackground = (props: StackProps) => (
    <Stack
        direction="column"
        spacing={6}
        alignItems="center"
        justifyContent="center"
        sx={{
            minHeight: '640px',
            padding: '80px 0px',
            position: 'relative',
            '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                backgroundImage: (theme) => `
                                linear-gradient(to right, ${
                                    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                                } 1px, transparent 1px),
                                linear-gradient(to bottom, ${
                                    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                                } 1px, transparent 1px)
                            `,
                backgroundSize: '80px 80px',
                maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 70%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 70%, transparent 100%)',
                pointerEvents: 'none',
            },
        }}
        {...props}
    />
);
