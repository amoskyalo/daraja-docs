'use client';

import React, { useState } from 'react';
import { Box, Chip, Dialog, Paper, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Image from 'next/image';
import { ApiEndpointProps, LinkProps, MDXElementProps, NoteProps, ResponseExampleProps } from '../../types';
import { useCopyToClipboard } from '../../../../shared/hooks';
import { Playground } from '../../../playground';

export const SpecialComponents = {
    Image: ({ src, alt }: MDXElementProps) => {
        const [open, setOpen] = useState(false);

        return (
            <>
                <Box
                    sx={{
                        maxHeight: 'max-content',
                        width: { xs: '100%', sm: '100%', md: '85%' },
                        mx: 'auto',
                        backgroundColor: 'action.hover',
                        padding: 1.5,
                        borderRadius: 6,
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundImage: (theme) => `
                linear-gradient(to right, ${
                    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                } 1px, transparent 1px),
                linear-gradient(to bottom, ${
                    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                } 1px, transparent 1px)
            `,
                        backgroundSize: '10px 10px',
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: 4,
                            maxHeight: { xs: 200, sm: 300 },
                            minHeight: { xs: 200, sm: 300 },
                            height: { xs: 200, sm: 300 },
                            overflow: 'hidden',
                            cursor: 'zoom-in',
                        }}
                        onClick={() => setOpen(true)}
                    >
                        <Image
                            src={src!}
                            alt={alt!}
                            height={2640}
                            width={2640}
                            priority
                            style={{
                                height: '100%',
                                width: '100%',
                                borderRadius: '16px',
                                objectFit: 'cover',
                            }}
                        />
                    </Box>
                </Box>

                <Dialog
                    maxWidth="xl"
                    open={open}
                    sx={{
                        backdropFilter: 'blur(10px)',
                        '& .MuiPaper-root': {
                            boxShadow: 'none',
                            backgroundImage: 'none',
                            backgroundColor: 'transparent !important',
                        },
                    }}
                    onClose={() => setOpen(false)}
                >
                    <Box
                        sx={{
                            cursor: 'zoom-out',
                        }}
                        onClick={() => setOpen(false)}
                    >
                        <Image
                            src={src!}
                            alt={alt!}
                            height={1440}
                            width={1440}
                            priority
                            style={{
                                height: 600,
                                width: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                </Dialog>
            </>
        );
    },

    Link: (props: LinkProps) => {
        const { copied, Copy } = useCopyToClipboard();

        return (
            <Stack
                direction="row"
                alignItems="center"
                spacing={{ md: 2 }}
                sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1.5,
                    px: 1,
                    py: 0.5,
                    mb: 2,
                    width: 'max-content',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    flexWrap: 'nowrap',
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ width: '100%', overflow: 'hidden', flexWrap: 'nowrap' }}
                >
                    <Typography variant="body2" color="primary.main" sx={{ mr: 1, fontWeight: 'bold', fontSize: 14 }}>
                        {props.method} :
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 14,
                            flex: 1,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {props.href}
                    </Typography>
                </Stack>
                <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                    <ContentCopyIcon sx={{ fontSize: 14, ml: 1, cursor: 'pointer' }} onClick={() => Copy(props.href)} />
                </Tooltip>
            </Stack>
        );
    },

    ApiEndpoint: ({ method, endpoint, description }: ApiEndpointProps) => (
        <Paper elevation={0}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Chip
                    label={method}
                    size="small"
                    sx={{
                        backgroundColor:
                            method === 'POST'
                                ? 'success.main'
                                : method === 'GET'
                                ? 'primary.main'
                                : method === 'PUT'
                                ? 'warning.main'
                                : method === 'DELETE'
                                ? 'error.main'
                                : 'grey.500',
                        color: 'white',
                        fontWeight: 'bold',
                        mr: 2,
                        minWidth: 60,
                    }}
                />
                <Typography
                    variant="body2"
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        color: 'text.primary',
                    }}
                >
                    {endpoint}
                </Typography>
            </Box>
            {description && (
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            )}
        </Paper>
    ),

    ResponseExample: ({ children }: ResponseExampleProps) => (
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body1" sx={{ mr: 2, color: 'text.primary' }}>
                    Response Sample
                </Typography>
            </Box>
            {children}
        </Box>
    ),

    NoteInfo: (props: MDXElementProps) => (
        <Typography
            variant="body2"
            sx={{
                color: 'text.secondary',
            }}
            {...props}
        />
    ),

    Note: ({ type = 'info', children }: NoteProps) => {
        const theme = useTheme();

        const noteConfig = {
            info: {
                icon: InfoOutlineIcon,
                title: 'Note',
                color: 'info' as const,
            },
            warning: {
                icon: WarningAmberIcon,
                title: 'Warning',
                color: 'warning' as const,
            },
            error: {
                icon: ReportGmailerrorredIcon,
                title: 'Error',
                color: 'error' as const,
            },
            alert: {
                icon: ReportGmailerrorredIcon,
                title: 'Caution',
                color: 'error' as const,
            },
            success: {
                icon: LightbulbOutlinedIcon,
                title: 'Success',
                color: 'success' as const,
            },
            tip: {
                icon: LightbulbOutlinedIcon,
                title: 'Tip',
                color: 'success' as const,
            },
        };

        const config = noteConfig[type] || noteConfig.info;

        return (
            <Box
                sx={{
                    mb: 2,
                    mt: 2,
                    borderLeft: `4px solid ${theme.palette[config.color].main}`,
                    borderRadius: 1,
                    paddingX: 2,
                    paddingY: 0.5,
                    maxWidth: '100%',
                    backgroundColor: `${theme.palette[config.color].main}08`,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', pt: 2 }}>
                    <config.icon color={config.color} fontSize="small" sx={{ mr: 1 }} />
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 600,
                            color: `${config.color}.main`,
                            fontSize: '16px',
                        }}
                    >
                        {config.title}
                    </Typography>
                </Box>

                {children}
            </Box>
        );
    },

    Playground: ({ children, ...props }: any) => <Playground {...props}>{children}</Playground>,
};
