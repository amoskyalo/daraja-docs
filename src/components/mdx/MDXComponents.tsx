import React, { ReactNode, useState } from 'react';
import {
    Typography,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Alert,
    Chip,
    Link,
    Tab,
    Tabs,
    IconButton,
} from '@mui/material';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import theme from '@/theme/theme';
import { CodeContainer } from '@/components/containers/code-container';

type MDXElementProps = {
    children?: ReactNode;
    className?: string;
    href?: string;
    src?: string;
    alt?: string;
    [key: string]: any;
};

interface ApiEndpointProps {
    method: string;
    endpoint: string;
    description?: string;
}

interface ResponseExampleProps {
    children?: ReactNode;
}

interface CodeExampleProps {
    children?: ReactNode;
    title?: string;
}

interface ParametersProps {
    children?: ReactNode;
}

interface NoteProps {
    type?: 'error' | 'info' | 'success' | 'warning';
    children?: ReactNode;
}

interface TerminalProps {
    title?: string;
    children?: ReactNode;
}

export const MDXComponents = {
    h1: (props: MDXElementProps) => (
        <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                fontSize: '2rem',
            }}
            {...props}
        />
    ),

    h2: (props: MDXElementProps) => (
        <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
                fontWeight: 600,
                // my: 2,
                color: 'text.primary',
                fontSize: '1.4rem',
            }}
            {...props}
        />
    ),

    h3: (props: MDXElementProps) => (
        <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{
                fontWeight: 600,
                // my: 2,
                color: 'text.primary',
                // fontSize: '1.5rem',
            }}
            {...props}
        />
    ),

    h4: (props: MDXElementProps) => (
        <Typography
            variant="h6"
            component="h4"
            gutterBottom
            sx={{
                fontWeight: 600,
                fontSize: '1.1rem',
                // my: 2,
                color: 'text.primary',
            }}
            {...props}
        />
    ),

    p: (props: MDXElementProps) => (
        <Typography
            variant="body1"
            sx={{
                lineHeight: 1.7,
                mb: 2,
                '& .body2': {
                    border: '1px solid red',
                },
            }}
            {...props}
        />
    ),

    a: (props: MDXElementProps) => (
        <Link
            {...props}
            sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
            }}
        />
    ),

    img: (props: MDXElementProps) => <Box component="img" sx={{ maxWidth: '100%', borderRadius: 1 }} {...props} />,

    hr: () => (
        <Box
            component="hr"
            sx={{
                border: 0,
                height: '1px',
                backgroundColor: 'divider',
                mb: 4,
            }}
        />
    ),

    strong: (props: MDXElementProps) => (
        <Box component="strong" sx={{ fontWeight: 'bold', color: 'text.primary' }} {...props} />
    ),

    em: (props: MDXElementProps) => <Box component="em" sx={{ fontStyle: 'italic', fontWeight: 'bold' }} {...props} />,

    Highlight: (props: MDXElementProps) => (
        <Typography
            component="span"
            variant="body1"
            sx={{
                fontWeight: 'bold',
                color: 'primary.main',
            }}
            {...props}
        />
    ),

    code: (props: MDXElementProps) => (
        <Box
            component="code"
            sx={{
                backgroundColor: 'action.hover',
                borderRadius: 1,
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                paddingY: 0.3,
                paddingX: 0.5,
                maxHeight: 400,
                ...(props.className?.includes('language-') && {
                    display: 'block',
                    backgroundColor: '#1e1e1e',
                    color: '#d4d4d4',
                    paddingX: 2,
                    borderRadius: 2,
                    overflow: 'auto',
                }),
            }}
            {...props}
        />
    ),

    pre: (props: MDXElementProps) => (
        <Paper
            component="pre"
            sx={{
                borderRadius: 1,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                overflow: 'auto',
                padding: '0px !important',
                '& code': {
                    backgroundColor: 'transparent !important',
                    padding: '16px !important',
                    display: 'block',
                },
            }}
            {...props}
        />
    ),

    table: (props: MDXElementProps) => (
        <TableContainer
            component={Paper}
            sx={{ mb: 3, mt: 2, width: 'max-content', maxWidth: '100%', borderRadius: 2 }}
        >
            <Table {...props} />
        </TableContainer>
    ),

    thead: (props: MDXElementProps) => <TableHead {...props} />,
    tbody: (props: MDXElementProps) => <TableBody {...props} />,
    tr: (props: MDXElementProps) => <TableRow {...props} />,
    td: (props: MDXElementProps) => <TableCell {...props} sx={{ border: 1, borderColor: 'divider' }} />,
    th: (props: MDXElementProps) => (
        <TableCell
            component="th"
            sx={{
                fontWeight: 'bold',
                backgroundColor: 'action.hover',
                border: 1,
                borderColor: 'divider',
            }}
            {...props}
        />
    ),

    blockquote: (props: MDXElementProps) => (
        <Alert severity="info" sx={{ mb: 2, mt: 2 }}>
            {props.children}
        </Alert>
    ),

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
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        </Paper>
    ),

    ResponseExample: ({ children }: ResponseExampleProps) => (
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body1" sx={{ mr: 2 }}>
                    Response Sample
                </Typography>
            </Box>
            {children}
        </Box>
    ),

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

    Parameters: ({ children }: ParametersProps) => (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Parameters
            </Typography>
            {children}
        </Box>
    ),

    NoteInfo: (props: MDXElementProps) => <Typography variant="body2" {...props} />,

    Note: ({ type = 'info', children }: NoteProps) => {
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
            alert: {
                icon: ReportGmailerrorredIcon,
                title: 'Caution',
                color: 'error' as const,
            },
            tip: {
                icon: LightbulbOutlinedIcon,
                title: 'Tip',
                color: 'success' as const,
            },
        };

        const config = noteConfig[type as keyof typeof noteConfig] || noteConfig.info;

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
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {<config.icon color={config.color} fontSize="small" sx={{ mr: 1 }} />}
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            color: config.color,
                            fontSize: '14px',
                        }}
                    >
                        {config.title}
                    </Typography>
                </Box>

                {children}
            </Box>
        );
    },

    Terminal: ({ title, children }: TerminalProps) => {
        const [copied, setCopied] = useState(false);

        const handleCopy = async () => {
            const textContent = extractTextFromChildren(children);
            if (textContent) {
                try {
                    await navigator.clipboard.writeText(textContent);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
            }
        };

        const extractTextFromChildren = (children: ReactNode): string => {
            if (typeof children === 'string') return children;
            if (Array.isArray(children)) {
                return children.map(extractTextFromChildren).join('');
            }
            return '';
        };

        const highlightTerminalContent = (content: string) => {
            const lines = content.split('\n');
            return lines.map((line, index) => {
                const trimmedLine = line.trim();

                if (trimmedLine.startsWith('#')) {
                    return (
                        <Box key={index} sx={{ color: '#6a9955' }}>
                            {line}
                        </Box>
                    );
                }

                if (line.includes('npm install')) {
                    const parts = line.split(/(\s+)/);
                    return (
                        <Box key={index}>
                            {parts.map((part, partIndex) => {
                                if (part === 'npm' || part === 'install') {
                                    return (
                                        <span key={partIndex} style={{ color: '#f97316' }}>
                                            {part}
                                        </span>
                                    );
                                } else if (part === '-g') {
                                    return (
                                        <span key={partIndex} style={{ color: '#569cd6' }}>
                                            {part}
                                        </span>
                                    );
                                }
                                return <span key={partIndex}>{part}</span>;
                            })}
                        </Box>
                    );
                }

                if (trimmedLine.includes('ngrok') || trimmedLine.includes('lt ')) {
                    const parts = line.split(/(\s+)/);
                    return (
                        <Box key={index}>
                            {parts.map((part, partIndex) => {
                                if (part === 'ngrok' || part === 'lt' || part === 'http' || part.startsWith('--')) {
                                    return (
                                        <span key={partIndex} style={{ color: '#f97316' }}>
                                            {part}
                                        </span>
                                    );
                                } else if (!isNaN(Number(part))) {
                                    return (
                                        <span key={partIndex} style={{ color: '#b5cea8' }}>
                                            {part}
                                        </span>
                                    );
                                }
                                return <span key={partIndex}>{part}</span>;
                            })}
                        </Box>
                    );
                }

                if (line.includes('npx ')) {
                    const parts = line.split(/(\s+)/);
                    return (
                        <Box key={index}>
                            {parts.map((part, partIndex) => {
                                if (part === 'npx') {
                                    return (
                                        <span key={partIndex} style={{ color: '#9cdcfe' }}>
                                            {part}
                                        </span>
                                    );
                                } else if (part.includes('create-next-app')) {
                                    return (
                                        <span key={partIndex} style={{ color: '#4ec9b0' }}>
                                            {part}
                                        </span>
                                    );
                                }
                                return <span key={partIndex}>{part}</span>;
                            })}
                        </Box>
                    );
                }

                return <Box key={index}>{line}</Box>;
            });
        };

        const content = extractTextFromChildren(children);

        return (
            <Box sx={{ mb: 3, mt: 2 }}>
                {title && (
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            color: 'text.primary',
                        }}
                    >
                        {title}
                    </Typography>
                )}
                <Paper
                    sx={{
                        backgroundColor: '#1a1a1a',
                        color: '#ffffff',
                        borderRadius: 2,
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            pl: 2,
                            pr: 1,
                            py: 1,
                            backgroundColor: '#2a2a2a',
                            borderBottom: '1px solid #404040',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#cccccc',
                                    fontSize: '0.875rem',
                                    fontFamily: 'monospace',
                                }}
                            >
                                &gt;_ Terminal
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={handleCopy}
                            sx={{
                                color: copied ? '#4caf50' : '#cccccc',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            <ContentCopyIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            p: 2,
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                            lineHeight: 1.6,
                        }}
                    >
                        <Box component="pre" sx={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                            {highlightTerminalContent(content)}
                        </Box>
                    </Box>
                </Paper>
            </Box>
        );
    },
};
