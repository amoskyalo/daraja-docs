'use client';

import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Paper, Stack, Typography, Tooltip } from '@mui/material';
import { useAIContext } from '@/shared/context';
import { useCopyToClipboard } from '@/shared/hooks';

export const CodeContainer = ({ children, title }: { children: React.ReactNode; title?: string }) => {
    const { setQuestion, handleAIRequest, setDrawerOpen } = useAIContext();
    const { copied, Copy } = useCopyToClipboard();

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

    function getCode() {
        let code = '';

        if (React.isValidElement(children)) {
            const preElement = children as any;
            const codeElement = preElement.props?.children;

            if (React.isValidElement(codeElement)) {
                const codeChildren = (codeElement.props as any)?.children;
                code = extractText(codeChildren);
            }
        }

        return code;
    }

    return (
        <Paper
            elevation={0}
            sx={{
                mt: 1,
                position: 'relative',
                borderRadius: 2,
                backgroundColor: 'action.hover',
                overflow: 'hidden',
            }}
        >
            <Stack sx={{ py: 1, px: 2 }} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                    {title ?? 'Response'}
                </Typography>

                <Stack direction="row" alignItems="center" gap={2}>
                    <Tooltip title="Explain with AI">
                        <AutoAwesomeIcon
                            sx={{ fontSize: 18, cursor: 'pointer', display: { md: 'block', sm: 'none', xs: 'none' } }}
                            onClick={() => {
                                const input = `Explain the code below in details \n\n\n${getCode()}`;
                                setQuestion(input);
                                handleAIRequest(input);
                                setDrawerOpen(true);
                            }}
                        />
                    </Tooltip>

                    <Tooltip title={copied ? 'Copied!' : 'Copy'} onClick={() => Copy(getCode())}>
                        <ContentCopyIcon sx={{ fontSize: 16, cursor: 'pointer' }} />
                    </Tooltip>
                </Stack>
            </Stack>

            {children}
        </Paper>
    );
};
