'use client';

import React, { useState } from 'react';
import { Box, Paper, Tab, Tabs, Typography, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { MDXElementProps, CodeExampleProps } from '../../types';
import { useCopyToClipboard } from '../../../../shared/hooks';
import { CodeContainer } from '../CodeContainer';

export const CodeComponents = {
    code: (props: MDXElementProps) => (
        <Box
            component="code"
            id='code'
            sx={{
                backgroundColor: 'action.hover',
                borderRadius: 1,
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                paddingY: 0.3,
                paddingX: 0.5,
                maxHeight: 400,
                color: 'text.primary',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowY: 'auto',
                ...(props.className?.includes('language-') && {
                    display: 'block',
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    paddingX: 2,
                    borderRadius: 2,
                    // overflow: 'hidden',
                }),
            }}
            {...props}
        />
    ),

    pre: (props: MDXElementProps) => (
        <Paper
            component="pre"
            sx={{
                overflow: 'hidden !important',
                padding: '0px !important',
                backgroundColor: '#15191a !important',
                borderRadius: '16px !important',
                margin: '0px !important',
                border: 'none !important',
                '& code': {
                    backgroundColor: 'transparent !important',
                    padding: '16px !important',
                    display: 'block',
                    fontSize: 14,
                    overflowX: 'hidden !important',
                    whiteSpace: 'pre-wrap !important',
                    wordBreak: 'break-word !important',
                },
            }}
            {...props}
        />
    ),

    Terminal: ({ title, children }: { title: string; children: React.ReactNode }) => {
        const { copied, handleCopyCode } = useCopyToClipboard();

        const highlightTerminalContent = (content: any) => {
            return content
                .replaceAll(/^(#.*$)/gm, '<span style="color: #6272a4;">$1</span>')
                .replaceAll(
                    /\b(npm|ngrok|lt|install|http|--port|-g|sdk|npx|mpesa)\b/g,
                    '<span style="color: #50fa7b;">$1</span>',
                )
                .replaceAll(/\b(\d+)\b/g, '<span style="color: #bd93f9;">$1</span>')
                .replaceAll(/(--\w+|-\w+)/g, '<span style="color: #f1fa8c;">$1</span>');
        };

        return (
            <Box
                sx={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    mb: 3,
                    fontFamily: 'monospace',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#2a2a2a',
                        borderBottom: '1px solid #333',
                        px: 2,
                        py: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 0.5, mr: 2 }}>
                            <Box
                                sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: '#ff5f56',
                                }}
                            />
                            <Box
                                sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: '#ffbd2e',
                                }}
                            />
                            <Box
                                sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: '#27ca3f',
                                }}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    color: '#ccc',
                                    fontWeight: 400,
                                }}
                            >
                                {title || 'Terminal'}
                            </Typography>
                        </Box>
                    </Box>

                    <Tooltip title={copied ? 'Copied' : 'Copy'}>
                        <ContentCopyIcon sx={{ fontSize: '16px' }} onClick={() => handleCopyCode(children)} />
                    </Tooltip>
                </Box>

                <Box
                    sx={{
                        backgroundColor: '#1a1a1a',
                        color: '#e6e6e6',
                        px: 2,
                        pb: 2,
                        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                        fontSize: '14px',
                        lineHeight: '1.4',
                        overflow: 'auto',
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {typeof children === 'string' ? (
                        <Typography
                            component="pre"
                            sx={{
                                fontFamily: 'inherit',
                                fontSize: 'inherit',
                                lineHeight: 'inherit',
                                color: 'inherit',
                                margin: 0,
                                whiteSpace: 'pre-wrap',
                            }}
                            dangerouslySetInnerHTML={{
                                __html: highlightTerminalContent(children),
                            }}
                        />
                    ) : (
                        children
                    )}
                </Box>
            </Box>
        );
    },

    CodeExample: ({ children, title }: CodeExampleProps) => {
        const [activeTab, setActiveTab] = useState(0);

        const codeBlocks = React.Children.toArray(children)
            .filter((child: any) => {
                return child?.props?.children?.props?.className?.includes('language-');
            })
            .map((child: any) => {
                const className = child.props.children.props.className || '';
                const language = className.replace('language-', '');
                const code = child.props.children.props.children;

                const languageMap: { [key: string]: string } = {
                    'py code-highlight': 'Python',
                    'js code-highlight': 'Node.js',
                    'java code-highlight': 'Java',
                    'php code-highlight': 'PHP',
                };

                return {
                    language: languageMap[language] || language.toUpperCase(),
                    code: typeof code === 'string' ? code : '',
                    originalChild: child,
                };
            });

        const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
            setActiveTab(newValue);
        };

        if (codeBlocks.length === 1) {
            return (
                <Box sx={{ mb: 3 }}>
                    <CodeContainer title={title}>{children}</CodeContainer>
                </Box>
            );
        }

        return (
            <Box sx={{ mb: 3 }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        '& .MuiTab-root': {
                            color: 'text.secondary',
                            '&.Mui-selected': {
                                color: 'primary.main',
                            },
                        },
                    }}
                >
                    {codeBlocks.map((block, index) => (
                        <Tab
                            key={index}
                            label={block.language}
                            sx={{
                                textTransform: 'none',
                                maxWidth: 'max-content !important',
                                minWidth: 'max-content !important',
                                paddingX: 1,
                            }}
                        />
                    ))}
                </Tabs>

                <CodeContainer title={title}>{codeBlocks[activeTab]?.originalChild}</CodeContainer>
            </Box>
        );
    },
};
