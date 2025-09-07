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
    useTheme,
    Stack,
    Tooltip,
} from '@mui/material';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { CodeContainer } from '@/components/containers/code-container';
import { Playground } from '../containers/playground';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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

interface LinkProps {
    href: string;
    method: string;
}

interface NoteProps {
    type?: 'error' | 'info' | 'success' | 'warning' | 'alert' | 'tip';
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
                opacity: 0.9,
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
                my: 2,
                color: 'text.primary',
                fontSize: '1.5rem',
                opacity: 0.9,
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
                my: 2,
                color: 'text.primary',
                opacity: 0.9,
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
                my: 2,
                color: 'text.primary',
                opacity: 0.9,
            }}
            {...props}
        />
    ),

    p: (props: MDXElementProps) => (
        <Typography
            variant="body1"
            sx={{
                lineHeight: '1.85rem',
                fontSize: '1rem',
                my: 2,
                color: 'text.primary',
                opacity: 0.8,
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
                fontWeight: 500,
                '&:hover': {
                    textDecoration: 'underline',
                    color: 'primary.dark',
                },
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
                my: 4,
            }}
        />
    ),

    strong: (props: MDXElementProps) => (
        <Box component="strong" sx={{ fontWeight: 'bold', color: 'text.primary' }} {...props} />
    ),

    em: (props: MDXElementProps) => (
        <Box component="em" sx={{ fontStyle: 'italic', fontWeight: 'bold', color: 'text.primary' }} {...props} />
    ),

    Highlight: (props: MDXElementProps) => (
        <Typography
            component="span"
            variant="body1"
            sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                opacity: 0.8,
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
                color: 'text.primary',
                ...(props.className?.includes('language-') && {
                    display: 'block',
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
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
                backgroundColor: 'background.paper',
                '& code': {
                    backgroundColor: 'transparent !important',
                    padding: '16px !important',
                    display: 'block',
                    color: 'text.primary',
                },
            }}
            {...props}
        />
    ),

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

    Link: (props: LinkProps) => {
        return (
            <Stack
                direction="row"
                alignItems="center"
                sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    mb: 2,
                    width: 'max-content',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    flexWrap: 'nowrap',
                }}
            >
                <Typography variant="body2" color="primary.main" sx={{ mr: 1, fontWeight: 'bold', fontSize: 14 }}>
                    {props.method} :
                </Typography>
                <Link
                    sx={{
                        fontSize: 14,
                        flex: 1,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                    }}
                    underline="none"
                    href={props.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="text.primary"
                >
                    {props.href}
                </Link>
                <Tooltip title="Copy">
                    <ContentCopyIcon sx={{ fontSize: 14, ml: 1, cursor: 'pointer' }} />
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

    Playground: ({ children, ...props }: any) => <Playground {...props}>{children}</Playground>,

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
};
