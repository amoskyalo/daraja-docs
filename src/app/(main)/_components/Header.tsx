import { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Stack,
    TextField,
    InputAdornment,
    IconButton,
    Avatar,
    Link,
    Tooltip,
    Drawer,
    Box,
} from '@mui/material';
import { useResponsiveness } from '@/hooks/useResponsiveness';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { ProfileDialog } from '@/components/dialogs/profile-dialog';
import { Account } from '@toolpad/core/Account';
import Image from 'next/image';
import SearchModal from '@/components/modals/algolia-search';
import { HEADERTABS } from '@/constants/routes';
import CloseIcon from '@mui/icons-material/Close';
import { usePathname, useRouter } from 'next/navigation';
import SendIcon from '@mui/icons-material/Send';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';

interface Conversation {
    type: 'user' | 'assistant';
    message: string;
}

const Header = () => {
    const { isMobile } = useResponsiveness();
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [aiModalOpen, setAIModalOpen] = useState(false);
    const [conversation, setConversation] = useState<Conversation[]>([]);
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (searchModalOpen) return;

            const { ctrlKey, key } = e;

            if (ctrlKey && key === 'k') {
                e.preventDefault();
                setSearchModalOpen(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [searchModalOpen]);

    // Load Prism CSS for syntax highlighting
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-dracula.min.css';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    const matchPathname = (path: string) => {
        return path === pathname.split('/')[1];
    };

    const handleAIRequest = async () => {
        if (!question.trim() || loading) return;

        setConversation((prev) => [...prev, { type: 'user', message: question }]);
        const currentQuestion = question;
        setQuestion('');
        setLoading(true);

        try {
            const res = await fetch('/api/ask-docs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: currentQuestion }),
            });

            const data = await res.json();
            setConversation((prev) => [...prev, { type: 'assistant', message: data.answer }]);
        } catch (error) {
            console.error('Error:', error);
            setConversation((prev) => [
                ...prev,
                { type: 'assistant', message: 'Sorry, there was an error processing your question.' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAIRequest();
        }
    };

    const formatMessage = (message: string, type: 'user' | 'assistant') => {
        if (type === 'user') {
            return <Typography variant="body2">{message}</Typography>;
        }

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
                                            '"Fira Code", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace'
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
                        return (
                            <Box
                                component="pre"
                                className="language-javascript" // Force a language class
                                sx={{
                                    borderRadius: 1,
                                    width: '90%',
                                    overflow: 'auto',
                                    fontSize: '12px !important',
                                    mb: 1,
                                    backgroundColor: '#282a36',
                                    padding: 2,
                                    '& code': {
                                        fontFamily:
                                            '"Fira Code", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace',
                                        backgroundColor: 'transparent !important',
                                    },
                                }}
                            >
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
                        <Link href={href} target="_blank" rel="noopener noreferrer">
                            {children}
                        </Link>
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

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    boxShadow: 'none',
                    borderBottom: 1,
                    borderColor: 'divider',
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(16px)',
                }}
            >
                <Container maxWidth="lg" sx={{ px: '0px !important' }}>
                    <Toolbar sx={{ px: '0px !important' }}>
                        <Stack direction="row" alignItems="center" spacing={4} sx={{ width: '100%' }}>
                            <Stack direction="row" alignItems="center" sx={{ height: '100%', paddingTop: 0.5 }}>
                                <Image src="/images/logo.png" alt="logo" width={140} height={40} priority />
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={3} sx={{ flex: 1 }}>
                                {HEADERTABS.map((route) => (
                                    <Link
                                        href={route.href}
                                        sx={{ textDecoration: 'none' }}
                                        color="inherit"
                                        key={route.label}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.push(route.href);
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.primary"
                                            sx={{
                                                fontWeight: matchPathname(route.label.toLowerCase())
                                                    ? 'regular'
                                                    : 'medium',
                                                color: matchPathname(route.label.toLowerCase())
                                                    ? 'primary.main'
                                                    : 'text.primary',
                                                opacity: matchPathname(route.label.toLowerCase()) ? 1 : 0.7,
                                                '&:hover': { opacity: 1 },
                                            }}
                                        >
                                            {route.label}
                                        </Typography>
                                    </Link>
                                ))}
                            </Stack>

                            <Stack direction="row" alignItems="center">
                                {!isMobile && (
                                    <TextField
                                        placeholder="Search documentation"
                                        onClick={() => setSearchModalOpen(true)}
                                        sx={{
                                            marginRight: 1,
                                            width: 220,
                                            borderRadius: 2,
                                            border: 1,
                                            borderColor: 'divider',
                                            cursor: 'pointer',
                                            '& .MuiOutlinedInput-root': {
                                                height: 34,
                                                fontSize: 14,
                                                paddingRight: 1,
                                                cursor: 'pointer',
                                                '& fieldset': {
                                                    border: 'none',
                                                },
                                                '&:hover fieldset': {
                                                    border: 'none',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    border: 'none',
                                                },
                                            },
                                        }}
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                                                        <Stack direction="row" spacing={0.5}>
                                                            <Typography
                                                                sx={{
                                                                    lineHeight: 0,
                                                                    fontSize: 10,
                                                                    paddingY: 1.1,
                                                                    paddingX: 0.5,
                                                                    backgroundColor: 'action.selected',
                                                                    borderRadius: 0.7,
                                                                }}
                                                            >
                                                                CtrlK
                                                            </Typography>
                                                        </Stack>
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                    />
                                )}

                                <Tooltip title="Ask Zuri">
                                    <IconButton
                                        size="small"
                                        sx={{ mr: 1, border: 1, borderColor: 'divider', borderRadius: 2 }}
                                        onClick={() => setAIModalOpen(!aiModalOpen)}
                                    >
                                        <AutoAwesomeOutlinedIcon />
                                    </IconButton>
                                </Tooltip>

                                <Account
                                    slots={{
                                        popoverContent: ProfileDialog,
                                    }}
                                    slotProps={{
                                        preview: {
                                            slotProps: {
                                                avatar: {
                                                    sx: {
                                                        borderRadius: 2,
                                                    },
                                                },
                                                avatarIconButton: {},
                                            },
                                        },
                                    }}
                                />

                                <IconButton
                                    size="small"
                                    sx={{
                                        mr: 1,
                                        border: 1,
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        height: 34,
                                        width: 34,
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            height: 34,
                                            width: 34,
                                            borderRadius: 2,
                                        }}
                                    />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Toolbar>
                </Container>

                <SearchModal open={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
            </AppBar>

            <Drawer
                open={aiModalOpen}
                anchor="right"
                onClose={() => setAIModalOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 700,
                        overflow: 'hidden',
                    },
                }}
            >
                <Stack sx={{ height: '100%', overflow: 'hidden' }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ borderBottom: 1, borderColor: 'divider', paddingY: 1.5, pl: 2, pr: 1 }}
                    >
                        <Typography variant="body1" fontWeight="600">
                            ASK ZURI
                        </Typography>
                        <IconButton size="small" onClick={() => setAIModalOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>

                    <Stack spacing={3} sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                        {conversation.length === 0 ? (
                            <Stack direction="row" alignItems="start" spacing={2} sx={{ maxWidth: '90%' }}>
                                <Avatar
                                    src="https://newsroom.safaricom.co.ke/wp-content/uploads/2022/10/Newsroom-story-1400x788px-2-11-1.jpg"
                                    alt="Zuri Logo"
                                />

                                <Box sx={{ p: 2, backgroundColor: 'action.selected', borderRadius: 2 }}>
                                    <Typography variant="body1">Welcome to Zuri Claude Console Assistant!</Typography>
                                    <Typography variant="body2">
                                        Ask questions about Claude Console and Claude API here.
                                    </Typography>
                                </Box>
                            </Stack>
                        ) : (
                            conversation.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        maxWidth: '91.5%',
                                        alignSelf: item.type === 'assistant' ? 'flex-start' : 'flex-end',
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="start"
                                        sx={{
                                            flexDirection: item.type === 'assistant' ? 'row' : 'row-reverse',
                                        }}
                                    >
                                        <Avatar
                                            src={
                                                item.type === 'assistant'
                                                    ? 'https://newsroom.safaricom.co.ke/wp-content/uploads/2022/10/Newsroom-story-1400x788px-2-11-1.jpg'
                                                    : ''
                                            }
                                            alt="Zuri Logo"
                                            sx={{
                                                ml: item.type === 'user' ? 2 : 0,
                                                mr: item.type === 'assistant' ? 2 : 0,
                                            }}
                                        />

                                        <Box
                                            sx={{
                                                p: item.type === 'user' ? 1 : 0,
                                                backgroundColor:
                                                    item.type === 'user' ? 'action.selected' : 'transparent',
                                                borderRadius: 2,
                                                width: item.type === 'assistant' ? '100%' : 'auto',
                                            }}
                                        >
                                            {formatMessage(item.message, item.type)}
                                        </Box>
                                    </Stack>
                                </Box>
                            ))
                        )}

                        {loading && (
                            <Stack direction="row" alignItems="start" spacing={2} sx={{ maxWidth: '90%' }}>
                                <Avatar
                                    src="https://newsroom.safaricom.co.ke/wp-content/uploads/2022/10/Newsroom-story-1400x788px-2-11-1.jpg"
                                    alt="Zuri Logo"
                                />
                                <Box sx={{ p: 1, backgroundColor: 'action.selected', borderRadius: 2 }}>
                                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                        Thinking...
                                    </Typography>
                                </Box>
                            </Stack>
                        )}
                    </Stack>

                    <Box>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                            sx={{ border: 1, borderColor: 'divider', p: 1.5 }}
                        >
                            <AutoAwesomeOutlinedIcon fontSize="small" />
                            <TextField
                                variant="standard"
                                sx={{ flex: 1 }}
                                slotProps={{
                                    input: {
                                        placeholder: 'Ask a Question',
                                        disableUnderline: true,
                                    },
                                }}
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={handleKeyPress}
                                disabled={loading}
                            />
                            <IconButton size="small" onClick={handleAIRequest} disabled={!question.trim() || loading}>
                                <SendIcon />
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>
            </Drawer>
        </>
    );
};

export default Header;
