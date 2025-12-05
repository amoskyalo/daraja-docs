'use client';

import { Typography, Box } from '@mui/material';
import { MDXElementProps } from '../../types';

export const TypographyComponents = {
    h1: (props: MDXElementProps) => (
        <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                fontSize: '2rem',
                opacity: 0.9,
            }}
            {...props}
        />
    ),

    h2: (props: MDXElementProps) => (
        <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
                fontWeight: 600,
                my: 2,
                color: 'text.primary',
                fontSize: '1.5rem',
                opacity: 0.9,
            }}
            {...props}
        />
    ),

    h3: (props: MDXElementProps) => (
        <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{
                fontWeight: 600,
                my: 2,
                color: 'text.primary',
                opacity: 0.9,
                fontSize: '1.2rem',
            }}
            {...props}
        />
    ),

    h4: (props: MDXElementProps) => (
        <Typography
            variant="h6"
            component="h4"
            gutterBottom
            sx={{
                fontWeight: 600,
                fontSize: '1rem',
                my: 2,
                color: 'text.primary',
                opacity: 0.9,
            }}
            {...props}
        />
    ),

    p: (props: MDXElementProps) => (
        <Typography
            variant="body1"
            sx={{
                lineHeight: '1.85rem',
                fontSize: '1rem',
                my: 2,
                color: 'text.primary',
                opacity: 0.8,
            }}
            {...props}
        />
    ),

    strong: (props: MDXElementProps) => (
        <Box component="strong" sx={{ fontWeight: 'bold', color: 'text.primary' }} {...props} />
    ),

    em: (props: MDXElementProps) => (
        <Box component="em" sx={{ fontStyle: 'italic', fontWeight: 'bold', color: 'text.primary' }} {...props} />
    ),

    Highlight: (props: MDXElementProps) => (
        <Typography
            component="span"
            variant="body1"
            sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                opacity: 0.8,
            }}
            {...props}
        />
    ),
};
