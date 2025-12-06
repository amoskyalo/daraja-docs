'use client';

import { Box, DialogActions, Stack, Typography } from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const SearchFooter = () => {
    return (
        <DialogActions
            sx={{
                borderTop: 1,
                borderColor: 'divider',
                p: 2,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 2,
            }}
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 0.2 }}>
                        <ChevronDown size={16} />
                    </Box>
                    <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 0.2 }}>
                        <ChevronUp size={16} />
                    </Box>
                </Stack>
                <Typography variant="body2">To navigate</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                    variant="caption"
                    sx={{ border: 1, borderColor: 'divider', borderRadius: 1, pb: 0.2, px: 0.5, lineHeight: 1.5 }}
                >
                    esc
                </Typography>
                <Typography variant="body2">To close</Typography>
            </Stack>
        </DialogActions>
    );
};
