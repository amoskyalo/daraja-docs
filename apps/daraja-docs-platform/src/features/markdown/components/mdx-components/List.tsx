'use client';

import { Alert, Box, Typography } from '@mui/material';
import { MDXElementProps } from '../../types';

export const ListComponents = {
    ul: (props: MDXElementProps) => (
        <Box
            component="ul"
            sx={{
                mb: 2,
                pl: 3,
                listStyleType: 'disc',
            }}
            {...props}
        />
    ),

    ol: (props: MDXElementProps) => (
        <Box
            component="ol"
            sx={{
                mb: 2,
                pl: 3,
                listStyleType: 'decimal',
            }}
            {...props}
        />
    ),

    li: (props: MDXElementProps) => (
        <Typography
            component="li"
            variant="body1"
            sx={{
                mb: 0.5,
                display: 'list-item',
            }}
            {...props}
        />
    ),

    blockquote: (props: MDXElementProps) => (
        <Alert severity="info" sx={{ mb: 2, mt: 2 }}>
            {props.children}
        </Alert>
    ),
};
