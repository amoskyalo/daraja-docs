'use client';

import { useState, useEffect } from 'react';
import { Stack, TextField, InputAdornment, alpha } from '@mui/material';
import { useAIContext } from '../../../../../../shared/context';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export const AIQuestionInput = () => {
    const { drawerOpen, question, setQuestion, handleSendRequest, handleKeyPress } = useAIContext();
    const [hideTextField, setHideTextField] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setHideTextField(true);
                    } else {
                        setHideTextField(false);
                    }
                });
            },
            { rootMargin: '120px 0px 0px 0px' }
        );

        const element = document.getElementById('bottom-navigator');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                position: 'fixed',
                bottom: 10,
                left: 0,
                right: 0,
                opacity: !drawerOpen && !hideTextField ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                pointerEvents: !drawerOpen && !hideTextField ? 'auto' : 'none',
            }}
        >
            <TextField
                placeholder="Ask question"
                sx={{
                    width: 350,
                    '& .MuiOutlinedInput-root': {
                        height: 44,
                        cursor: 'pointer',
                        backgroundColor: 'background.paper',
                        borderRadius: '25px !important',
                    },
                }}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyPress}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    onClick={() => handleSendRequest()}
                                    sx={{
                                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.5),
                                        height: 28,
                                        width: 28,
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
        </Stack>
    );
};
