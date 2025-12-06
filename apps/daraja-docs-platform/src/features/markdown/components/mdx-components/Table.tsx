'use client';

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { MDXElementProps } from '../../types';

export const TableComponents = {
    table: (props: MDXElementProps) => (
        <TableContainer
            component={Box}
            sx={{
                mb: 3,
                mt: 2,
                width: 'max-content',
                maxWidth: '100%',
                '& .MuiTable-root': {
                    borderCollapse: 'separate',
                    borderSpacing: 0,
                },
            }}
        >
            <Table {...props} />
        </TableContainer>
    ),

    thead: (props: MDXElementProps) => <TableHead {...props} />,

    tbody: (props: MDXElementProps) => <TableBody {...props} />,

    tr: (props: MDXElementProps) => <TableRow {...props} />,

    td: (props: MDXElementProps) => (
        <TableCell
            {...props}
            sx={{
                border: 'none',
                borderBottom: 1,
                borderColor: 'divider',
                color: 'text.primary',
                backgroundColor: 'transparent',
                padding: '12px 16px',
                textAlign: 'left',
                verticalAlign: 'top',
                'tr:last-child &': {
                    borderBottom: 'none',
                },
            }}
        />
    ),

    th: (props: MDXElementProps) => (
        <TableCell
            component="th"
            sx={{
                fontWeight: 'bold',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: 1,
                borderColor: 'divider',
                color: 'text.primary',
                padding: '12px 16px',
                textAlign: 'left',
                verticalAlign: 'top',
            }}
            {...props}
        />
    ),
};
