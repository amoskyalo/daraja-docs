'use client';

import { Box, Link } from '@mui/material';
import { MDXElementProps } from '../../types';

export const BasicComponents = {
    a: (props: MDXElementProps) => (
        <Link
            {...props}
            target="_parent"
            sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                    textDecoration: 'underline',
                    color: 'primary.dark',
                },
            }}
        />
    ),

    hr: () => (
        <Box
            component="hr"
            sx={{
                border: 0,
                height: '1px',
                backgroundColor: 'divider',
                my: 4,
            }}
        />
    ),
};
