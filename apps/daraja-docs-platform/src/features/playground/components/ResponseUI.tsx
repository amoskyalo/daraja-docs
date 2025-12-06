import React, { useEffect, useState } from 'react';
import { Box, Stack, Tooltip, Typography, Menu, MenuItem } from '@mui/material';
import { MarkdownComponents } from '../../markdown';
import { useAIContext } from '../../../shared/context';
import { useCopyToClipboard } from '../../../shared/hooks';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckIcon from '@mui/icons-material/Check';

type Language = {
    label: string;
    key: string;
    variant: string;
};

type ResponseUIProps = {
    requests: Record<string, string>;
    languages: Language[];
};

const ResponseUI = ({ requests, languages }: ResponseUIProps) => {
    const { copied, Copy } = useCopyToClipboard();
    const { setQuestion, handleAIRequest, setDrawerOpen } = useAIContext();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setSelectedLanguage(languages[0]);
    }, [languages]);

    return (
        <>
            <Stack spacing={4} sx={{ height: '100%' }}>
                {!requests && (
                    <Box sx={{ width: '100%', mt: '64px !important' }}>
                        <DotLottieReact
                            src="https://lottie.host/27274b1c-1e28-4800-8d5c-913883762401/GLDocWXrK1.lottie"
                            loop
                            autoplay
                        />
                        <Typography variant="body2" sx={{ textAlign: 'center' }}>
                            Click simulate to see some magic!
                        </Typography>
                    </Box>
                )}

                {requests && (
                    <>
                        <Box
                            sx={{
                                borderRadius: 4.3,
                                backgroundColor: 'action.hover',
                                p: 0.3,
                                border: 1,
                                borderColor: 'divider',
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ padding: 1, px: 1.5 }}
                            >
                                <Typography variant="body2" fontWeight={500} fontSize={13} color="text.secondary">
                                    Request
                                </Typography>

                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    sx={{ flex: 1 }}
                                    gap={1}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        gap={0.5}
                                        onClick={handleClick}
                                        sx={{
                                            cursor: 'pointer',
                                            borderRadius: 1,
                                            paddingX: 0.5,
                                            paddingY: 0.25,
                                            '&:hover': { backgroundColor: 'action.selected', color: 'primary.main' },
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ fontSize: 13 }} color="text.secondary">
                                            {selectedLanguage?.label}
                                        </Typography>
                                        <Stack direction="column" alignItems="center" color="text.secondary">
                                            <KeyboardArrowUpIcon sx={{ fontSize: 13, mt: 0 }} />
                                            <KeyboardArrowDownIcon sx={{ fontSize: 13, mt: -0.8 }} />
                                        </Stack>
                                    </Stack>
                                    <Tooltip title="Explain with AI">
                                        <AutoAwesomeIcon
                                            sx={{ fontSize: 14, cursor: 'pointer', mr: 1, color: 'text.secondary' }}
                                            onClick={() => {
                                                const code = `\`\`\`${selectedLanguage.key === 'nodejs' ? 'javascript' : selectedLanguage.key}\n${requests[selectedLanguage.variant]}\n\`\`\``;
                                                const input = `Explain the code below in details \n\n\n${code}`;
                                                setQuestion(input);
                                                handleAIRequest(input);
                                                setDrawerOpen(true);
                                            }}
                                        />
                                    </Tooltip>
                                    <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                                        <ContentCopyIcon
                                            sx={{ fontSize: 13, cursor: 'pointer', color: 'text.secondary' }}
                                            onClick={() => Copy(requests[selectedLanguage.variant])}
                                        />
                                    </Tooltip>
                                </Stack>
                            </Stack>

                            {selectedLanguage && (
                                <MarkdownComponents
                                    message={`\`\`\`${selectedLanguage.key === 'nodejs' ? 'javascript' : selectedLanguage.key}\n${requests[selectedLanguage.variant]}\n\`\`\``}
                                    maxHeight="100%"
                                    borderRadius="16px !important"
                                />
                            )}
                        </Box>

                        <Box
                            sx={{
                                borderRadius: 4.3,
                                backgroundColor: 'action.hover',
                                p: 0.3,
                                border: 1,
                                borderColor: 'divider',
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ padding: 1 }}
                            >
                                <Typography variant="body2" fontWeight={500} fontSize={13} color="text.secondary">
                                    Response
                                </Typography>

                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    sx={{ flex: 1 }}
                                    gap={1}
                                >
                                    <Tooltip title="Explain with AI">
                                        <AutoAwesomeIcon sx={{ fontSize: 14, cursor: 'pointer', mr: 1, color: 'text.secondary' }} />
                                    </Tooltip>

                                    <Tooltip title="Copy">
                                        <ContentCopyIcon
                                            sx={{ fontSize: 13, cursor: 'pointer', color: 'text.secondary' }}
                                            // onClick={() => navigator.clipboard.writeText(requests[selectedLanguage])}
                                        />
                                    </Tooltip>
                                </Stack>
                            </Stack>
                            <MarkdownComponents message={'```json\n{"status": "200", "message": "Success"}\n```'} />
                        </Box>
                    </>
                )}
            </Stack>

            <Menu
                anchorEl={anchorEl}
                id="theme-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            maxHeight: 250,
                            border: 1,
                            borderColor: 'divider',
                            mt: 0.5,
                            elevation: '0 !important',
                            boxShadow: 'none !important',
                            borderRadius: 4
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {languages?.map((item, index) => (
                    <Box sx={{ px: 1 }} key={index}>
                        <MenuItem
                            selected={selectedLanguage?.label === item?.label}
                            sx={{
                                px: 1,
                                borderRadius: 2,
                                '&.Mui-selected': { color: 'primary.main', backgroundColor: 'transparent' },
                            }}
                            onClick={() => setSelectedLanguage(item)}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                gap={1}
                                sx={{ width: '100%' }}
                            >
                                <Typography variant="body2" fontWeight={500} fontSize={13}>
                                    {item?.label}
                                </Typography>
                                {selectedLanguage?.label === item?.label && <CheckIcon sx={{ fontSize: 18 }} />}
                            </Stack>
                        </MenuItem>
                    </Box>
                ))}
            </Menu>
        </>
    );
};

export default ResponseUI;
