import {
    Drawer,
    IconButton,
    Stack,
    Typography,
    Box,
    TextField,
    Tooltip,
    InputAdornment,
    alpha,
    Toolbar,
} from '@mui/material';
import { MarkdownComponents } from '@/features/markdown';
import { useCopyToClipboard } from '@/shared/hooks';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface Conversation {
    type: 'user' | 'assistant';
    message: string;
}

interface PromptDialogProps {
    setDrawerOpen: (open: boolean) => void;
    conversation: Conversation[];
    question: string;
    setQuestion: (question: string) => void;
    loading: boolean;
    handleKeyPress: (e: React.KeyboardEvent) => void;
}

export const PromptDialog = ({
    setDrawerOpen,
    conversation,
    question,
    setQuestion,
    loading,
    handleKeyPress,
}: PromptDialogProps) => {
    const { copied, Copy } = useCopyToClipboard();

    const formatMessage = (message: string, type: 'user' | 'assistant') => {
        if (type === 'user') {
            return <Typography variant="body2">{message}</Typography>;
        }
        return <MarkdownComponents message={message} />;
    };

    return (
        <Drawer
            open={true}
            anchor="right"
            variant="permanent"
            onClose={() => setDrawerOpen(false)}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 400,
                    overflow: 'hidden',
                },
            }}
        >
            <Toolbar />
            <Stack sx={{ height: '100%', overflow: 'hidden' }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        paddingY: 1,
                        pl: 2,
                        pr: 1,
                        backgroundColor: 'background.paper',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AutoAwesomeOutlinedIcon fontSize="small" color="primary" />
                        <Typography variant="body2" fontWeight="600">
                            Zuri Assistant
                        </Typography>
                    </Stack>
                    <IconButton size="small" onClick={() => setDrawerOpen(false)}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Stack>

                <Stack spacing={3} sx={{ flex: 1, overflowY: 'auto', p: 2 }} id="conversation">
                    {conversation.map((item, index) => (
                        <Stack
                            key={index}
                            direction="row"
                            alignItems="start"
                            sx={{
                                flexDirection: item.type === 'assistant' ? 'row' : 'row-reverse',
                                alignSelf: item.type === 'assistant' ? 'flex-start' : 'flex-end',
                                maxWidth: item.type === 'assistant' ? '100%' : '95%',
                            }}
                        >
                            <Box
                                sx={{
                                    paddingX: item.type === 'user' ? 1 : 0,
                                    paddingY: item.type === 'user' ? 0.5 : 0,
                                    backgroundColor: item.type === 'user' ? 'action.selected' : 'transparent',
                                    borderRadius: 2,
                                    width: item.type === 'assistant' ? '100%' : 'auto',
                                    maxWidth: '100%',
                                    
                                }}
                            >
                                {formatMessage(item.message, item.type)}
                                <Stack direction="column" alignItems="flex-start">
                                    {item.type === 'assistant' && (
                                        <Stack direction="row" alignItems="center" spacing={0.7}>
                                            {[
                                                {
                                                    icon: ThumbUpOutlinedIcon,
                                                    tooltipTitle: 'Give positive feedback',
                                                    onClick: () => {},
                                                },
                                                {
                                                    icon: ThumbDownAltOutlinedIcon,
                                                    tooltipTitle: 'Give negative feedback',
                                                    onClick: () => {},
                                                },
                                                {
                                                    icon: ContentCopyOutlinedIcon,
                                                    tooltipTitle: copied ? 'Copied!' : 'Copy response',
                                                    onClick: () => Copy(item.message),
                                                },
                                            ].map((item, index) => (
                                                <Tooltip key={index} title={item.tooltipTitle}>
                                                    <IconButton
                                                        sx={{
                                                            borderRadius: 1.5,
                                                            height: 24,
                                                            width: 24,
                                                            ':hover': {
                                                                backgroundColor: 'action.selected',
                                                            },
                                                        }}
                                                        size="small"
                                                    >
                                                        {<item.icon sx={{ fontSize: 14 }} />}
                                                    </IconButton>
                                                </Tooltip>
                                            ))}
                                        </Stack>
                                    )}
                                </Stack>
                            </Box>
                        </Stack>
                    ))}

                    {loading && <Typography variant="body2">Thinking...</Typography>}
                </Stack>

                <Box sx={{ px: 2, py: 1 }}>
                    <TextField
                        placeholder="Ask question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={handleKeyPress}
                        disabled={loading}
                        multiline
                        sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                height: 40,
                                fontSize: 14,
                                paddingRight: 1,
                                cursor: 'pointer',
                                backgroundColor: 'background.paper',
                                borderRadius: '25px !important',
                            },
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="center"
                                            sx={{
                                                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.5),
                                                height: 26,
                                                width: 26,
                                                borderRadius: '50%',
                                            }}
                                        >
                                            <ArrowUpwardIcon fontSize="small" sx={{ color: 'white' }} />
                                        </Stack>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>
            </Stack>
        </Drawer>
    );
};
