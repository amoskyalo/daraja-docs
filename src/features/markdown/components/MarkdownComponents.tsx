import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Link from 'next/link';
import { Typography, Box, Link as MuiLink, IconButton, Tooltip } from '@mui/material';
import { useCopyToClipboard } from '@/shared/hooks';

export const MarkdownComponents = ({
    message,
    maxHeight,
    borderRadius,
}: {
    message: string;
    maxHeight?: string;
    borderRadius?: string;
}) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug, [rehypePrism, { ignoreMissing: true, aliases: { mdx: 'markdown' } }]]}
            components={{
                h1: ({ children }) => (
                    <Typography variant="h6" fontWeight="600" sx={{ mb: 1, mt: 2 }}>
                        {children}
                    </Typography>
                ),
                h2: ({ children }) => (
                    <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1, mt: 1.5 }}>
                        {children}
                    </Typography>
                ),
                h3: ({ children }) => (
                    <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 0.5, mt: 1 }}>
                        {children}
                    </Typography>
                ),
                p: ({ children }) => (
                    <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
                        {children}
                    </Typography>
                ),
                strong: ({ children }) => (
                    <Typography component="span" fontWeight="600">
                        {children}
                    </Typography>
                ),
                code: ({ children, className }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const language = match ? match[1] : '';

                    if (!match) {
                        return (
                            <Box
                                component="code"
                                sx={{
                                    backgroundColor: 'rgba(175, 184, 193, 0.2)',
                                    color: 'text.primary',
                                    px: 0.5,
                                    py: 0.25,
                                    borderRadius: 0.5,
                                    fontFamily:
                                        '"Fira Code", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace',
                                }}
                            >
                                {children}
                            </Box>
                        );
                    }

                    return (
                        <Box
                            component="code"
                            className={className || `language-${language || 'javascript'}`}
                            sx={{
                                fontFamily:
                                    '"Fira Code", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace',
                            }}
                        >
                            {children}
                        </Box>
                    );
                },
                pre: ({ children }) => {
                    const { copied, handleCopyCode } = useCopyToClipboard();

                    return (
                        <Box
                            component="pre"
                            className="language-javascript"
                            sx={{
                                overflow: 'auto',
                                fontSize: '12px !important',
                                margin: '0px !important',
                                backgroundColor: '#282a36',
                                maxHeight: maxHeight ?? '400px',
                                borderRadius: borderRadius ?? '8px !important',
                                position: 'relative',
                                '& code': {
                                    fontFamily:
                                        '"Fira Code", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace',
                                    backgroundColor: 'transparent !important',
                                },
                            }}
                        >
                            {/* <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                                <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                                    <IconButton
                                        sx={{
                                            borderRadius: 1.5,
                                            height: 24,
                                            width: 24,
                                            // ':hover': {
                                            //     backgroundColor: 'action.selected',
                                            // },
                                        }}
                                        size="small"
                                        onClick={() => handleCopyCode(children)}
                                    >
                                        <ContentCopyOutlinedIcon sx={{ fontSize: 14, color: 'white' }} />
                                    </IconButton>
                                </Tooltip>
                            </Box> */}
                            {children}
                        </Box>
                    );
                },
                ul: ({ children }) => (
                    <Box component="ul" sx={{ pl: 2, mb: 1 }}>
                        {children}
                    </Box>
                ),
                ol: ({ children }) => (
                    <Box component="ol" sx={{ pl: 2, mb: 1 }}>
                        {children}
                    </Box>
                ),
                li: ({ children }) => (
                    <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                        {children}
                    </Typography>
                ),
                a: ({ children, href }) => (
                    <MuiLink component={Link} href={href as any} style={{ textDecoration: 'none' }}>
                        {children}
                    </MuiLink>
                ),
                blockquote: ({ children }) => (
                    <Box
                        sx={{
                            borderLeft: 3,
                            borderColor: 'primary.main',
                            pl: 2,
                            ml: 1,
                            backgroundColor: 'action.hover',
                            py: 1,
                            borderRadius: '0 4px 4px 0',
                            mb: 1,
                        }}
                    >
                        {children}
                    </Box>
                ),
            }}
        >
            {message}
        </ReactMarkdown>
    );
};
