import React from 'react';
import { Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { utils } from '@/shared/utils';
import { CircleDashed, CircleAlert, CloudCheck } from 'lucide-react';

const WARNINGS = new Set(['processing', 'pending']);
const ERRORS = new Set(['failed', 'rejected', 'unprocessed']);
const SUCCESS = new Set(['success', 'approved', 'processed']);

export const StatusButton = ({ status }: { status: string }) => {
    const { lowerCaseString } = utils.formatters();
    const theme = useTheme();

    function getProps(): { color: 'primary' | 'warning' | 'error' | 'success'; icon: any } {
        const sts = status.toLowerCase();

        if (WARNINGS.has(sts))
            return {
                color: 'warning',
                icon: CircleDashed,
            };

        if (ERRORS.has(sts))
            return {
                color: 'error',
                icon: CircleAlert,
            };

        if (SUCCESS.has(sts))
            return {
                color: 'success',
                icon: CloudCheck,
            };

        return {
            color: 'primary',
            icon: CloudCheck,
        };
    }

    const color = getProps().color;
    const Icon = getProps().icon;

    return (
        <Stack justifyContent="center" sx={{ height: '100%' }}>
            <Typography
                variant="caption"
                color={color}
                sx={{
                    backgroundColor: alpha(theme.palette[color].main, 0.08),
                    width: 'max-content',
                    borderRadius: 2,
                    px: 1,
                    py: 0.5,
                    fontWeight: 500,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 0.5,
                }}
            >
                {<Icon color={theme.palette[color].main} size={16} />}
                {lowerCaseString(status)}
            </Typography>
        </Stack>
    );
};
