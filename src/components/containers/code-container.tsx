import { Paper, Stack, Typography, IconButton, Tooltip, Box } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React, { useEffect, useState } from 'react';

export const CodeContainer = ({ children, title }: { children: React.ReactNode; title?: string }) => {
    const [copied, setCopied] = useState(false);
    const extractText = (node: React.ReactNode): string => {
        if (typeof node === 'string' || typeof node === 'number') {
            return String(node);
        }
        if (Array.isArray(node)) {
            return node.map(extractText).join('');
        }
        if (React.isValidElement(node)) {
            return extractText((node.props as any).children);
        }
        return '';
    };

    const handleCopy = () => {
        let codeToCopy = '';

        if (React.isValidElement(children)) {
            const preElement = children as any;
            const codeElement = preElement.props?.children;

            if (React.isValidElement(codeElement)) {
                const codeChildren = (codeElement.props as any)?.children;
                codeToCopy = extractText(codeChildren);
            }
        }

        if (!codeToCopy.trim()) {
            console.warn('No code text found to copy');
            return;
        }

        navigator.clipboard
            .writeText(codeToCopy)
            .then(() => console.log('Code copied'))
            .catch((err) => console.error('Failed to copy:', err))
            .finally(() => setCopied(true));
    };

    useEffect(() => {
        if (copied) {
            setTimeout(() => setCopied(false), 2000);
        }
    }, [copied]);
    return (
        <Paper
            elevation={0}
            sx={{
                mt: 1,
                position: 'relative',
                borderRadius: 1,
                backgroundColor: 'action.hover',
            }}
        >
            <Stack sx={{ pt: 1, pl: 2, pr: 1 }} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                    {title ?? 'Response'}
                </Typography>

                <Box sx={{ position: 'relative' }}>
                    <Tooltip title="Copy">
                        <IconButton size="small" sx={{ p: 0.8, borderRadius: 2 }} onClick={handleCopy}>
                            <ContentCopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    {copied && (
                        <Paper
                            elevation={0}
                            sx={{
                                position: 'absolute',
                                left: -65,
                                top: 2,
                                px: 1,
                                pb: 0.3,
                                backgroundColor: 'success.main',
                            }}
                        >
                            <Typography variant="caption">Copied!</Typography>
                        </Paper>
                    )}
                </Box>
            </Stack>

            {children}
        </Paper>
    );
};
